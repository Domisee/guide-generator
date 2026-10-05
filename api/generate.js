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

  // Intentionally does not generate or forge account-bound RestedXP keys/imports.
  return res.status(403).json({
    error:"Riktig RestedXP-import kräver en legitim generator/auktorisering.",
    latestVersion:data.tag_name||data.name||null
  });
}
