const version=document.querySelector("#version");
const release=document.querySelector("#release");
const guides=document.querySelector("#guides");
const message=document.querySelector("#message");
const search=document.querySelector("#search");
const faction=document.querySelector("#faction");
let allGuides=[];

function pretty(name){
  return name.replaceAll("_"," ").replaceAll("-"," · ");
}
function group(path){
  const n=path.toLowerCase();
  if(n.includes("alliance")) return "alliance";
  if(n.includes("horde")) return "horde";
  return "other";
}
function render(){
  const q=search.value.trim().toLowerCase();
  const f=faction.value;
  const filtered=allGuides.filter(g=>{
    const hay=(g.name+" "+g.path).toLowerCase();
    return (!q||hay.includes(q)) && (f==="all"||group(g.path)===f);
  });
  guides.innerHTML="";
  if(!filtered.length){
    guides.innerHTML='<div class="empty">Ingen guider matchar din sökning.</div>';
  } else filtered.forEach(g=>{
    const row=document.createElement("div");
    row.className="guide";
    row.innerHTML='<div><strong></strong><small></small></div><a target="_blank" rel="noopener">Öppna</a>';
    row.querySelector("strong").textContent=pretty(g.name);
    row.querySelector("small").textContent=g.path;
    row.querySelector("a").href=g.url;
    guides.appendChild(row);
  });
  message.textContent=filtered.length+" av "+allGuides.length+" Forever-guider visas.";
}
async function load(){
  try{
    const r=await fetch("/api/generate");
    const data=await r.json();
    if(!r.ok) throw new Error(data.error);
    version.textContent=data.latestVersion||"okänd";
    if(data.releaseUrl){release.href=data.releaseUrl;release.hidden=false;}
    allGuides=data.guides||[];
    render();
  }catch(e){
    message.textContent="Kunde inte hämta senaste RestedXP Forever-guiderna.";
  }
}
search.addEventListener("input",render);
faction.addEventListener("change",render);
load();