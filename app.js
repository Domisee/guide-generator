const version=document.querySelector("#version");
const guides=document.querySelector("#guides");
const message=document.querySelector("#message");

function label(name){
  return name.replaceAll("_"," ").replaceAll("-"," · ");
}
async function load(){
  try{
    const r=await fetch("/api/generate");
    const data=await r.json();
    if(!r.ok) throw new Error(data.error);
    version.textContent=data.latestVersion||"okänd";
    guides.innerHTML="";
    data.guides.forEach(g=>{
      const row=document.createElement("div");
      row.className="guide";
      row.innerHTML=`<div><strong>${label(g.name)}</strong><small>${g.path}</small></div><a href="${g.url}" target="_blank" rel="noopener">Visa</a>`;
      guides.appendChild(row);
    });
    message.textContent=data.guides.length+" Forever-guider hämtade från senaste RestedXP-versionen.";
  }catch(e){
    message.textContent="Kunde inte hämta senaste RestedXP Forever-guiderna.";
  }
}
load();