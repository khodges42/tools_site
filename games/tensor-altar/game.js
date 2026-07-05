(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const c = $('field'), x = c.getContext('2d');
  const start = $('start'), panel = $('panel'), mode = $('mode'), sliceEl = $('slice'), unfoldEl = $('unfold'), scoreEl = $('score'), msg = $('msg');
  const W = 900, H = 680, TAU = Math.PI * 2;
  let run = false, t0 = 0, last = performance.now(), score = 0, found = new Set();
  let slice = 0, unfold = 0, autoUnfold = 0, pointer = null, pinch = null;
  let rot = {xy:.25,xz:-.55,yz:.18,xw:.62,yw:-.34,zw:.42};
  let gyro = {seen:false, baseB:null, baseG:null, x:0, y:0};
  let target = {cell: 0, tone: 'find the warm room'};
  const signs = [-1,1], verts = [], edges = [];
  for (const a of signs) for (const b of signs) for (const d of signs) for (const e of signs) verts.push([a,b,d,e]);
  for (let i=0;i<verts.length;i++) for (let j=i+1;j<verts.length;j++) {
    let diff = 0; for (let k=0;k<4;k++) if (verts[i][k] !== verts[j][k]) diff++;
    if (diff === 1) edges.push([i,j]);
  }
  const rooms = verts.map((v,i)=>({i,v, name:`${v.map(n=>n>0?'+':'-').join('')}`, lit:false}));
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),hypot=Math.hypot;
  const fmt=n=>String(n).padStart(2,'0');
  function randomTarget(){
    const unseen = rooms.filter(r=>!found.has(r.i));
    const r = unseen.length ? unseen[Math.floor(Math.random()*unseen.length)] : rooms[Math.floor(Math.random()*rooms.length)];
    target.cell = r.i;
    target.tone = `find room ${r.name}`;
    msg.textContent = target.tone + ' // pinch or drag to unfold the tensor';
  }
  function rot2(p,a,b,ang){const ca=Math.cos(ang),sa=Math.sin(ang),pa=p[a],pb=p[b];p[a]=pa*ca-pb*sa;p[b]=pa*sa+pb*ca;return p}
  function transform(v){
    let p = v.slice();
    const gscale = gyro.seen ? .55 : 0;
    rot2(p,0,1,rot.xy + gyro.x*gscale); rot2(p,0,2,rot.xz + gyro.y*gscale);
    rot2(p,1,2,rot.yz); rot2(p,0,3,rot.xw); rot2(p,1,3,rot.yw + unfold*.7); rot2(p,2,3,rot.zw);
    const wDist = 3.2, f4 = wDist/(wDist-p[3]);
    p = [p[0]*f4,p[1]*f4,p[2]*f4,p[3]];
    const zDist = 4.1, f3 = zDist/(zDist-p[2]);
    const netPush = unfold * 155 * v[3];
    return {x:W/2 + p[0]*210*f3 + netPush, y:H/2 + p[1]*210*f3 + unfold*55*v[2], z:p[2], w:v[3], near:1-Math.min(1,Math.abs(v[3]-slice)/2)};
  }
  function draw(){
    x.clearRect(0,0,W,H);
    const grad=x.createRadialGradient(W/2,H/2,20,W/2,H/2,520); grad.addColorStop(0,'#16202d'); grad.addColorStop(1,'#05060b'); x.fillStyle=grad; x.fillRect(0,0,W,H);
    x.strokeStyle='rgba(111,242,255,.08)'; x.lineWidth=1; for(let i=0;i<W;i+=45){x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke()} for(let j=0;j<H;j+=45){x.beginPath();x.moveTo(0,j);x.lineTo(W,j);x.stroke()}
    const pts = verts.map(transform);
    edges.sort((a,b)=>((pts[a[0]].z+pts[a[1]].z)-(pts[b[0]].z+pts[b[1]].z))).forEach(([a,b])=>{
      const A=pts[a],B=pts[b], hot=(a===target.cell||b===target.cell), alpha=.18+.45*((A.near+B.near)/2);
      x.strokeStyle=hot?`rgba(255,198,87,${alpha+.25})`:`rgba(118,255,184,${alpha})`;
      x.lineWidth=hot?4:2; x.beginPath(); x.moveTo(A.x,A.y); x.lineTo(B.x,B.y); x.stroke();
    });
    pts.forEach((p,i)=>{
      const isTarget=i===target.cell, seen=found.has(i), r=isTarget?14:seen?9:7;
      x.beginPath(); x.arc(p.x,p.y,r*(.75+p.near*.35),0,TAU);
      x.fillStyle=isTarget?'#ffc657':seen?'#7cffb8':`rgba(230,241,255,${.32+p.near*.35})`; x.fill();
      if(Math.abs(verts[i][3]-slice)<.28){x.strokeStyle='#ff5ba8';x.lineWidth=2;x.stroke()}
    });
    x.fillStyle='rgba(255,91,168,.16)'; x.fillRect(0,H*(1-(slice+1)/2),W,2);
    x.fillStyle='#eaf6ff'; x.font='14px ui-monospace, monospace'; x.fillText(`w-slice ${slice.toFixed(2)} // unfold ${unfold.toFixed(2)} // ${gyro.seen?'gyro engaged':'touch/mouse mode'}`,18,H-20);
  }
  function step(now){
    const dt=Math.min(.033,(now-last)/1000); last=now;
    if(run){rot.xw += dt*(.18+gyro.x*.2); rot.yw += dt*(.11+gyro.y*.2); rot.zw += dt*.07; if(autoUnfold) unfold=clamp(unfold+autoUnfold*dt,0,1)}
    slice = clamp(slice + gyro.y*.008, -1, 1);
    sliceEl.textContent=slice.toFixed(2); unfoldEl.textContent=unfold.toFixed(2); scoreEl.textContent=`${score}/16`;
    draw(); requestAnimationFrame(step);
  }
  async function requestMotion(){try{ if(window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') await DeviceOrientationEvent.requestPermission(); }catch(_){}}
  window.addEventListener('deviceorientation',e=>{
    if(e.beta==null||e.gamma==null)return;
    if(gyro.baseB==null){gyro.baseB=e.beta; gyro.baseG=e.gamma; gyro.seen=true; mode.textContent='gyro + touch'; return}
    gyro.seen=true; gyro.x=clamp((e.gamma-gyro.baseG)/22,-1,1); gyro.y=clamp((e.beta-gyro.baseB)/22,-1,1); mode.textContent='gyro + touch';
  });
  function pos(e){const r=c.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*W,y:(e.clientY-r.top)/r.height*H}}
  c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId); pointer={id:e.pointerId,...pos(e)}});
  c.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;const p=pos(e),dx=p.x-pointer.x,dy=p.y-pointer.y;rot.xy+=dx*.006;rot.xz+=dy*.006;slice=clamp(slice-dy*.002,-1,1);pointer=p});
  c.addEventListener('pointerup',()=>pointer=null); c.addEventListener('pointercancel',()=>pointer=null);
  c.addEventListener('wheel',e=>{e.preventDefault();unfold=clamp(unfold-e.deltaY*.001,0,1)},{passive:false});
  let touches=[];
  c.addEventListener('touchstart',e=>{touches=[...e.touches].map(t=>({x:t.clientX,y:t.clientY})); if(touches.length===2) pinch=Math.hypot(touches[0].x-touches[1].x,touches[0].y-touches[1].y)}, {passive:false});
  c.addEventListener('touchmove',e=>{e.preventDefault();const ts=[...e.touches].map(t=>({x:t.clientX,y:t.clientY})); if(ts.length===2&&pinch){const d=Math.hypot(ts[0].x-ts[1].x,ts[0].y-ts[1].y);unfold=clamp(unfold+(d-pinch)*.003,0,1);pinch=d}}, {passive:false});
  c.addEventListener('touchend',()=>{pinch=null},{passive:true});
  c.addEventListener('click',e=>{
    if(!run)return; const p=pos(e), pts=verts.map(transform); let best=-1,bd=999;
    pts.forEach((q,i)=>{const d=hypot(q.x-p.x,q.y-p.y); if(d<bd){bd=d;best=i}});
    if(best===target.cell && bd<38){found.add(best);score=found.size; msg.textContent=`room ${rooms[best].name} unfolded. ${16-score} impossible rooms remain.`; randomTarget()}
  });
  $('fold').addEventListener('click',()=>{autoUnfold=autoUnfold?0:1;$('fold').textContent=autoUnfold?'stop unfolding':'auto-unfold'});
  $('recal').addEventListener('click',()=>{gyro.baseB=null;gyro.baseG=null;gyro.x=gyro.y=0;msg.textContent='floor forgotten; hold phone neutral'});
  start.addEventListener('click',async()=>{await requestMotion();run=true;t0=performance.now();panel.classList.add('hidden');randomTarget()});
  randomTarget(); requestAnimationFrame(step);
})();
