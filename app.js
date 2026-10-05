const tagInput=document.querySelector("#battletag");
const generate=document.querySelector("#generate");
const message=document.querySelector("#message");
const version=document.querySelector("#version");
const result=document.querySelector("#result");
const code=document.querySelector("#code");
const copy=document.querySelector("#copy");

function validBattleTag(value){return /^[^#\\s#]{3,24}#[0-9]{4,8}$/.test(value.trim())}

async function loadVersion(){
  try{
    const r=await fetch("https://api.github.com/repos/RestedXP/RXPGuides/releases/latest",{headers:{"Accept":"application/vnd.github+json"}});
    if(!r.ok) throw new Error();
    const data=await r.json();
    version.textContent=data.tag_name||data.name||"okänd";
  }catch{version.textContent="kunde inte hämtas"}
}
generate.addEventListener("click",()=>{
  const tag=tagInput.value.trim();
  message.textContent="";
  result.classList.add("hidden");
  if(!validBattleTag(tag)){message.textContent="Ange en giltig BattleTag, t.ex. Player#1234.";return}
  message.textContent="BattleTag godkänd. Den riktiga server-side generatorn behöver kopplas in för att skapa importkoden.";
});
copy.addEventListener("click",async()=>{
  await navigator.clipboard.writeText(code.value);
  copy.textContent="Kopierad!";
  setTimeout(()=>copy.textContent="Kopiera",1200);
});
loadVersion();
