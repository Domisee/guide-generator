export default async function handler(req,res){
  if(req.method!=="GET") return res.status(405).json({error:"Method not allowed"});
  try{
    const r=await fetch("https://api.github.com/repos/RestedXP/RXPGuides/releases/latest",{
      headers:{Accept:"application/vnd.github+json","User-Agent":"Guide-generator"}
    });
    if(!r.ok) throw new Error();
    const data=await r.json();
    res.setHeader("Cache-Control","s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({version:data.tag_name||data.name||null,releasedAt:data.published_at||null,url:data.html_url||null});
  }catch{
    return res.status(502).json({error:"Kunde inte hämta RestedXP-versionen"});
  }
}
