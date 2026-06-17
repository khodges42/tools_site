let DATA, throws = [], mode = "auto", activeTab = "traditional", currentReading = null;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

fetch("./hexagrams.json").then(r=>r.json()).then(d=>{ DATA=d; initBg(); });

function show(id){ ["method","casting","result"].forEach(x=>$("#"+x).classList.add("hidden")); $("#"+id).classList.remove("hidden"); }
$("#autoStart").onclick = () => { mode="auto"; throws=[]; renderStack(); show("casting"); $("#throwBtn").classList.remove("hidden"); };
$("#manualStart").onclick = () => { mode="manual"; throws=[]; renderStack(); show("method"); };
$("#restart").onclick = () => location.reload();

$("#throwBtn").onclick = async () => {
  if (throws.length >= 6) return;
  const coins = $("#coins");
  coins.classList.add("rolling");
  $("#castStatus").textContent = "Coins crossing the noise floor...";
  await wait(850);
  const vals = [coin(), coin(), coin()];
  coins.classList.remove("rolling");
  $("#coins").innerHTML = vals.map(v => `<span>${v===3 ? "●" : "○"}</span>`).join("");
  addThrow(vals.reduce((a,b)=>a+b,0));
};

$("#manualButtons").onclick = e => {
  const b = e.target.closest("button[data-value]");
  if (!b) return;
  addThrow(Number(b.dataset.value));
};

function coin(){ return Math.random() < .5 ? 2 : 3; }
function wait(ms){ return new Promise(r=>setTimeout(r,ms)); }

function addThrow(v){
  throws.push(v);
  $("#castStatus").textContent = `Line ${throws.length}: ${lineName(v)}.`;
  renderStack();
  if (throws.length === 6) finishReading();
}

function lineName(v){
  return ({6:"Old Yin — broken, moving",7:"Young Yang — solid",8:"Young Yin — broken",9:"Old Yang — solid, moving"})[v];
}
function isYang(v){ return v===7 || v===9; }
function isMoving(v){ return v===6 || v===9; }
function lineHTML(v){
  return `<div class="hex-line ${isYang(v) ? "yang":"yin"} ${isMoving(v) ? "moving":""}" title="${lineName(v)}"></div>`;
}
function renderStack(){
  const stack = $("#hexStack");
  stack.innerHTML = throws.map(lineHTML).join("");
}

function bitsFromThrows(t){ return t.map(v=>isYang(v)?"1":"0").join(""); }
function changedBits(t){ return t.map(v => v===6?"1":v===9?"0":isYang(v)?"1":"0").join(""); }
function hexByBits(bits){ return DATA.hexagrams.find(h => h.number === DATA.kingWen[bits]); }
function trigram(bits){ return DATA.trigrams[bits]; }

function finishReading(){
  const primary = hexByBits(bitsFromThrows(throws));
  const changed = hexByBits(changedBits(throws));
  currentReading = { primary, changed, throws, date: new Date() };
  showResult();
  show("result");
  window.scrollTo({top: $("#result").offsetTop - 20, behavior:"smooth"});
}

function showResult(){
  const {primary, changed, throws, date} = currentReading;
  $("#stamp").textContent = date.toLocaleString();
  $("#primaryGlyph").textContent = primary.unicode;
  $("#primaryTitle").textContent = `${primary.number}. ${primary.name} ${primary.chinese}`;
  $("#primaryMeta").textContent = `${primary.tag} · ${primary.upper} over ${primary.lower}`;
  $("#changedGlyph").textContent = changed.unicode;
  $("#changedTitle").textContent = `${changed.number}. ${changed.name} ${changed.chinese}`;
  $("#changedMeta").textContent = changed.number===primary.number ? "No moving lines. The pattern holds." : `${changed.tag} · ${changed.upper} over ${changed.lower}`;
  $("#changedCard").style.opacity = changed.number===primary.number ? .75 : 1;
  const bits = primary.binary;
  const low = trigram(bits.slice(0,3)), up = trigram(bits.slice(3));
  $("#trigramView").innerHTML = [ ["Upper",up], ["Lower",low] ].map(([label,t]) => `
    <div class="trigram"><p class="label">${label}</p><b>${t.unicode}</b> ${t.chinese} · ${t.name}<p>${t.quality}. Image: ${t.image}.</p></div>
  `).join("");
  renderReading();
}

$$(".tab").forEach(b => b.onclick = () => {
  $$(".tab").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  activeTab = b.dataset.tab;
  renderReading();
});

function renderReading(){
  if (!currentReading) return;
  const h = currentReading.primary;
  const moving = currentReading.throws.map((v,i)=>isMoving(v)?i:null).filter(x=>x!==null);
  let html = "";
  if (activeTab === "traditional") {
    html = `<p><b>Judgment.</b> ${h.traditional.judgment}</p><p><b>Image.</b> ${h.traditional.image}</p><p>This public-domain-friendly frame avoids pretending to be a fixed prophecy. It gives you symbols, structure, and pressure points for interpretation.</p>`;
  } else if (activeTab === "modern") {
    html = `<p>${h.modern}</p><p>Read this like a diagnostic trace from the present moment: not fate, not commandment, but a structured interruption.</p>`;
  } else if (activeTab === "lines") {
    html = moving.length ? moving.map(i=>`<p><b>Moving line ${i+1}.</b> ${h.lines[i]}</p>`).join("") : "<p>No moving lines. Sit with the primary hexagram as a stable condition rather than a transition.</p>";
  } else {
    html = h.prompts.map(p=>`<p>▸ ${p}</p>`).join("");
  }
  $("#readingText").innerHTML = html;
}

$("#savePng").onclick = async () => {
  // SVG foreignObject export. Fully client-side, no dependency.
  const card = $("#exportCard");
  const rect = card.getBoundingClientRect();
  const clone = card.cloneNode(true);
  clone.style.width = rect.width + "px";
  clone.style.background = "#08090d";
  const xhtml = new XMLSerializer().serializeToString(clone);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(rect.width)}" height="${Math.ceil(rect.height)}"><foreignObject width="100%" height="100%">${xhtml}</foreignObject></svg>`;
  const blob = new Blob([svg], {type:"image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = img.width * 2; c.height = img.height * 2;
    const ctx = c.getContext("2d");
    ctx.scale(2,2); ctx.drawImage(img,0,0);
    URL.revokeObjectURL(url);
    const a = document.createElement("a");
    a.download = `i-ching-${new Date().toISOString().slice(0,10)}.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  };
  img.src = url;
};

function initBg(){
  const c = $("#bg"), ctx = c.getContext("2d");
  let w,h,parts=[];
  function resize(){ w=c.width=innerWidth; h=c.height=innerHeight; parts=Array.from({length:70},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+0.5,s:Math.random()*0.35+0.05,a:Math.random()*0.5+0.1})); }
  addEventListener("resize", resize); resize();
  function tick(){
    ctx.clearRect(0,0,w,h);
    const g=ctx.createRadialGradient(w*.5,h*.45,0,w*.5,h*.45,Math.max(w,h)*.7);
    g.addColorStop(0,"rgba(143,38,52,.16)"); g.addColorStop(.45,"rgba(20,38,56,.11)"); g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    ctx.font="18px serif";
    parts.forEach((p,i)=>{
      p.y-=p.s; p.x+=Math.sin(Date.now()/3000+i)*.08;
      if(p.y<-20){p.y=h+20; p.x=Math.random()*w}
      ctx.globalAlpha=p.a;
      ctx.fillStyle=i%9===0?"#d5a84f":"#f7edd2";
      ctx.fillText(i%9===0?["☰","☷","☵","☲","䷀","䷁"][i%6]:"·",p.x,p.y);
    });
    ctx.globalAlpha=1;
    requestAnimationFrame(tick);
  }
  tick();
}
