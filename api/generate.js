export default async function handler(req,res){
  if(req.method!=="GET") return res.status(405).json({error:"Method not allowed"});
  try{
    const release=await fetch("https://api.github.com/repos/RestedXP/RXPGuides/releases/latest",{
      headers:{Accept:"application/vnd.github+json","User-Agent":"Guide-generator"}
    });
    if(!release.ok) throw new Error("release");
    const data=await release.json();
    const version=data.tag_name||data.name||null;
    const tag=encodeURIComponent(version);
    const xmlUrl=`https://raw.githubusercontent.com/RestedXP/RXPGuides/${tag}/Guides/GuideList-forever.xml`;
    const xmlResponse=await fetch(xmlUrl);
    if(!xmlResponse.ok) throw new Error("guidelist");
    const xml=await xmlResponse.text();
    const guides=[...xml.matchAll(/<Script file="([^"]+\.lua)"\s*\/>/g)]
      .map(m=>m[1])
      .filter(p=>p.startsWith("Guides/forever/"))
      .map(path=>({path,name:path.replace("Guides/forever/","").replace(/\.lua$/,""),url:`https://github.com/RestedXP/RXPGuides/blob/${tag}/${path.split("/").map(encodeURIComponent).join("/")}`}));
    return res.status(200).setHeader("Cache-Control","s-maxage=300, stale-while-revalidate=3600").json({
      game:"World of Warcraft Classic Forever",
      latestVersion:version,
      releasedAt:data.published_at||null,
      releaseUrl:data.html_url||null,
      guides
    });
  }catch{
    return res.status(502).json({error:"Kunde inte hämta senaste RestedXP Forever-guiderna"});
  }
}