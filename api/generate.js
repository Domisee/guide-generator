export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const {battleTag}=req.body||{};
  if(typeof battleTag!=="string" || !/^[^#\s#]{3,24}#[0-9]{4,8}$/.test(battleTag.trim())){
    return res.status(400).json({error:"Ogiltig BattleTag"});
  }

  const release=await fetch("https://api.github.com/repos/RestedXP/RXPGuides/releases/latest",{
    headers:{Accept:"application/vnd.github+json","User-Agent":"Guide-generator"}
  });
  if(!release.ok) return res.status(502).json({error:"Kunde inte hämta senaste RestedXP-versionen"});
  const data=await release.json();

  return res.status(200).json({
    requiresAccount:true,
    latestVersion:data.tag_name||data.name||null,
    message:"RestedXP binder guider till ditt konto och Battle.net-ID. Logga in på ditt RestedXP-konto, exportera din guide och klistra in exportsträngen här. Den här tjänsten hanterar inte ditt lösenord och försöker inte kringgå RestedXPs kontoskydd."
  });
}
