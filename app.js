const tagInput=document.querySelector("#battletag");
const generate=document.querySelector("#generate");
const message=document.querySelector("#message");
const version=document.querySelector("#version");
const result=document.querySelector("#result");
const code=document.querySelector("#code");
const copy=document.querySelector("#copy");
const exportHelp=document.querySelector("#exportHelp");

function validBattleTag(value){return /^[^#\s#]{3,24}#[0-9]{4,8}$/.test(value.trim())}

async function loadVersion(){
  try{
    const r=await fetch("/api/version");
    if(!r.ok) throw new Error();
    const data=await r.json();
    version.textContent=data.version||"okänd";
  }catch{version.textContent="kunde inte hämtas"}
}

generate.addEventListener("click",async()=>{
  const tag=tagInput.value.trim();
  message.textContent="";
  result.classList.add("hidden");
  if(!validBattleTag(tag)){message.textContent="Ange en giltig BattleTag, t.ex. Player#1234.";return}
  message.textContent="Kontrollerar BattleTag och senaste version…";
  try{
    const response=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({battleTag:tag})});
    const data=await response.json().catch(()=>({}));
    if(data.latestVersion) version.textContent=data.latestVersion;
    if(data.requiresAccount){
      exportHelp.textContent=data.message;
      result.classList.remove("hidden");
      message.textContent="Nästa steg visas nedan.";
      return;
    }
    if(!response.ok) throw new Error(data.error||"Generatorfel");
    if(!data.importCode) throw new Error("Ingen importkod");
    code.value=data.importCode;
    result.classList.remove("hidden");
    message.textContent="Importkod skapad.";
  }catch{
    message.textContent="Kunde inte kontrollera RestedXP just nu.";
  }
});
copy.addEventListener("click",async()=>{
  if(!code.value) return;
  await navigator.clipboard.writeText(code.value);
  copy.textContent="Kopierad!";
  setTimeout(()=>copy.textContent="Kopiera",1200);
});
loadVersion();
