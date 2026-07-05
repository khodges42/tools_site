(() => {
  'use strict';
  const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
  const startPanel=document.getElementById('startPanel'),startBtn=document.getElementById('startBtn'),resetBtn=document.getElementById('resetBtn'),soundBtn=document.getElementById('soundBtn');
  const sealsEl=document.getElementById('seals'),chargeEl=document.getElementById('charge'),timeEl=document.getElementById('time'),bestEl=document.getElementById('best'),inputModeEl=document.getElementById('inputMode'),messageEl=document.getElementById('message');
  const W=720,TAU=Math.PI*2,storageKey='tilt-reliquary-best-ms';
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),hypot=Math.hypot;
  const fmt=ms=>{if(!Number.isFinite(ms))return'--:--';const s=Math.floor(ms/1000);return`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`};
  const rings=[86,150,215,281];
  const gates=[[.10,.24],[.58,.71],[.31,.43],[.80,.91],[.03,.15],[.50,.62],[.23,.36],[.68,.78]];
  const spokes=[{a:0,from:88,to:292,gap:[142,198]},{a:.25,from:88,to:292,gap:[218,260]},{a:.5,from:88,to:292,gap:[118,166]},{a:.75,from:88,to:292,gap:[204,248]},{a:.125,from:154,to:292,gap:[232,270]},{a:.625,from:154,to:292,gap:[104,138]}];
  const sealStarts=[[360,118],[536,200],[578,416],[424,575],[198,536],[119,318],[274,234]];
  const bellStarts=[[463,146],[604,304],[509,520],[258,585],[129,410],[194,165]];
  let audio=null,soundOn=false,running=false,won=false,last=performance.now(),startedAt=0,drift=0,pointer=null;
  const keys=new Set();
  let motion={x:0,y:0,seen:false,baseBeta:null,baseGamma:null,calibrating:true};
  let player,seals,bells;

  function resetWorld(){player={x:360,y:650,vx:0,vy:0,r:12,charge:100,seals:0};seals=sealStarts.map(([x,y],i)=>({x,y,r:12,got:false,phase:i*.9}));bells=bellStarts.map(([x,y],i)=>({x,y,r:18,phase:i*1.7,cooldown:0}));drift=0;won=false;startedAt=performance.now();message('collect seven seals; center opens last')}
  function setupBest(){bestEl.textContent=fmt(Number(localStorage.getItem(storageKey))||Infinity)}
  function message(t){messageEl.textContent=t}
  function ensureAudio(){if(audio)return;const C=window.AudioContext||window.webkitAudioContext;if(C)audio=new C()}
  function beep(freq,dur=.06,type='sine',gain=.035){if(!soundOn||!audio)return;const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(gain,audio.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+dur);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+dur)}

  async function start(){ensureAudio();if(audio&&audio.state==='suspended')audio.resume();motion.x=0;motion.y=0;motion.baseBeta=null;motion.baseGamma=null;motion.calibrating=true;await requestMotionPermission();resetWorld();running=true;startPanel.classList.add('hidden');inputModeEl.textContent=motion.seen?'tilt':'mouse / keys';bestEffortPortraitLock()}
  async function requestMotionPermission(){try{if(window.DeviceOrientationEvent&&typeof DeviceOrientationEvent.requestPermission==='function'){const result=await DeviceOrientationEvent.requestPermission();if(result!=='granted')message('motion denied; mouse, drag, WASD, or arrows still work')}}catch(_){message('motion unavailable here; mouse, drag, WASD, or arrows still work')}}
  async function bestEffortPortraitLock(){try{if(screen.orientation&&screen.orientation.lock)await screen.orientation.lock('portrait')}catch(_){/* iPhone Safari does not expose a reliable orientation lock for ordinary tabs. */}}

  window.addEventListener('deviceorientation',ev=>{if(ev.beta==null||ev.gamma==null)return;if(motion.baseBeta==null||motion.calibrating){motion.baseBeta=ev.beta;motion.baseGamma=ev.gamma;motion.x=0;motion.y=0;motion.calibrating=false;motion.seen=true;inputModeEl.textContent='tilt';return}motion.seen=true;let dx=ev.gamma-motion.baseGamma,dy=ev.beta-motion.baseBeta;if(dx>90)dx-=180;if(dx<-90)dx+=180;motion.x=clamp(dx/14,-1,1);motion.y=clamp(dy/14,-1,1);inputModeEl.textContent='tilt'});
  window.addEventListener('orientationchange',()=>{motion.x=0;motion.y=0;motion.baseBeta=null;motion.baseGamma=null;motion.calibrating=true;message('orientation changed; floor recalibrated')});
  canvas.addEventListener('pointerdown',ev=>{pointer=pointerVector(ev);canvas.setPointerCapture(ev.pointerId)});
  canvas.addEventListener('pointermove',ev=>{if(ev.buttons)pointer=pointerVector(ev)});canvas.addEventListener('pointerup',()=>pointer=null);canvas.addEventListener('pointercancel',()=>pointer=null);
  window.addEventListener('keydown',ev=>{keys.add(ev.key.toLowerCase());if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(ev.key.toLowerCase()))ev.preventDefault()});window.addEventListener('keyup',ev=>keys.delete(ev.key.toLowerCase()));
  function pointerVector(ev){const r=canvas.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width*W,y=(ev.clientY-r.top)/r.height*W;inputModeEl.textContent='mouse wand';return{x:clamp((x-player.x)/110,-1,1),y:clamp((y-player.y)/110,-1,1)}}
  function inputVector(){let x=motion.x,y=motion.y;if(pointer){x+=pointer.x*1.5;y+=pointer.y*1.5}if(keys.has('arrowleft')||keys.has('a'))x--;if(keys.has('arrowright')||keys.has('d'))x++;if(keys.has('arrowup')||keys.has('w'))y--;if(keys.has('arrowdown')||keys.has('s'))y++;const m=Math.max(1,hypot(x,y));return{x:x/m,y:y/m}}
  function inArc(a,s,e){a=(a+TAU)%TAU;s=(s+TAU)%TAU;e=(e+TAU)%TAU;return s<e?a>=s&&a<=e:a>=s||a<=e}
  function wallPush(x,y){const dx=x-W/2,dy=y-W/2,d=hypot(dx,dy)||1,a=(Math.atan2(dy,dx)+TAU)%TAU;let px=0,py=0;for(let i=0;i<rings.length;i++){const r=rings[i],gap=gates[i*2+((Math.floor(performance.now()/4200)+i)%2)],open=inArc(a,gap[0]*TAU+drift,gap[1]*TAU+drift),delta=d-r;if(!open&&Math.abs(delta)<player.r+5){const f=(player.r+5-Math.abs(delta))*Math.sign(delta||1)*.055;px+=dx/d*f;py+=dy/d*f}}for(const s of spokes){const a=s.a*TAU+drift*.6,nx=Math.cos(a),ny=Math.sin(a),along=dx*nx+dy*ny,side=dx*-ny+dy*nx;if(along>s.from&&along<s.to&&!(along>s.gap[0]&&along<s.gap[1])&&Math.abs(side)<player.r+4){const f=(player.r+4-Math.abs(side))*Math.sign(side||1)*.07;px+=-ny*f;py+=nx*f}}return{x:px,y:py}}

  function step(dt){if(!running||won)return;drift+=dt*.08;const v=inputVector(),push=wallPush(player.x,player.y);player.vx+=(v.x*540+push.x*900)*dt;player.vy+=(v.y*540+push.y*900)*dt;player.vx*=Math.pow(.16,dt);player.vy*=Math.pow(.16,dt);player.x+=player.vx*dt;player.y+=player.vy*dt;const edge=player.r+8;if(player.x<edge||player.x>W-edge){player.x=clamp(player.x,edge,W-edge);player.vx*=-.35}if(player.y<edge||player.y>W-edge){player.y=clamp(player.y,edge,W-edge);player.vy*=-.35}
    for(const s of seals)if(!s.got&&hypot(player.x-s.x,player.y-s.y)<player.r+s.r+4){s.got=true;player.seals++;player.charge=Math.min(100,player.charge+8);beep(360+player.seals*70,.08,'triangle');message(player.seals===7?'all seals awake; enter the aperture':`seal ${player.seals}/7 awake`)}
    const speed=hypot(player.vx,player.vy);for(const b of bells){b.cooldown=Math.max(0,b.cooldown-dt);const pulse=b.r+10+Math.sin(performance.now()/260+b.phase)*8+player.seals*1.6;if(hypot(player.x-b.x,player.y-b.y)<player.r+pulse&&b.cooldown<=0){player.charge-=speed>80?13:5;b.cooldown=.7;beep(90,.14,'sawtooth',.05);message(speed>80?'red bell heard you sprinting':'red bell tasted your charge')}}
    if(player.charge<=0){player.charge=0;running=false;startPanel.classList.remove('hidden');startPanel.querySelector('h2').textContent='The witness went dark.';startBtn.textContent='try another calibration';message('run failed; the reliquary keeps the fingerprints');beep(55,.4,'sawtooth',.06)}
    if(player.seals>=7&&hypot(player.x-W/2,player.y-W/2)<42){won=true;running=false;const elapsed=performance.now()-startedAt,best=Number(localStorage.getItem(storageKey))||Infinity;if(elapsed<best)localStorage.setItem(storageKey,String(Math.floor(elapsed)));setupBest();message(`aperture opened in ${fmt(elapsed)}; best is ${bestEl.textContent}`);startPanel.classList.remove('hidden');startPanel.querySelector('h2').textContent='The aperture accepts the witness.';startBtn.textContent='open it again';beep(660,.08,'triangle');setTimeout(()=>beep(990,.12,'triangle'),90)}}

  function draw(){ctx.clearRect(0,0,W,W);ctx.fillStyle='#05070b';ctx.fillRect(0,0,W,W);ctx.save();ctx.translate(W/2,W/2);drawGrid();drawMaze();drawAperture();ctx.restore();drawSeals();drawBells();drawPlayer();drawNoise()}
  function drawGrid(){ctx.strokeStyle='rgba(102,230,255,.07)';ctx.lineWidth=1;for(let i=-360;i<=360;i+=36){ctx.beginPath();ctx.moveTo(i,-360);ctx.lineTo(i,360);ctx.stroke();ctx.beginPath();ctx.moveTo(-360,i);ctx.lineTo(360,i);ctx.stroke()}}
  function drawMaze(){ctx.lineCap='round';ctx.lineWidth=8;ctx.strokeStyle='rgba(128,255,184,.72)';ctx.shadowColor='rgba(128,255,184,.4)';ctx.shadowBlur=10;for(let i=0;i<rings.length;i++){const r=rings[i],gap=gates[i*2+((Math.floor(performance.now()/4200)+i)%2)];arcExcept(r,gap[0]*TAU+drift,gap[1]*TAU+drift)}for(const s of spokes){const a=s.a*TAU+drift*.6,nx=Math.cos(a),ny=Math.sin(a);lineSeg(nx,ny,s.from,s.gap[0]);lineSeg(nx,ny,s.gap[1],s.to)}ctx.shadowBlur=0}
  function arcExcept(r,a1,a2){ctx.beginPath();ctx.arc(0,0,r,a2,a1+TAU);ctx.stroke()}function lineSeg(nx,ny,a,b){ctx.beginPath();ctx.moveTo(nx*a,ny*a);ctx.lineTo(nx*b,ny*b);ctx.stroke()}
  function drawAperture(){const open=player.seals>=7;ctx.beginPath();ctx.arc(0,0,43,0,TAU);ctx.fillStyle=open?'rgba(241,207,117,.25)':'rgba(255,77,100,.12)';ctx.fill();ctx.strokeStyle=open?'rgba(241,207,117,.9)':'rgba(255,77,100,.35)';ctx.lineWidth=3;ctx.stroke()}
  function drawSeals(){for(const s of seals){if(s.got)continue;const p=1+Math.sin(performance.now()/300+s.phase)*.18;ctx.beginPath();ctx.arc(s.x,s.y,s.r*p,0,TAU);ctx.fillStyle='rgba(102,230,255,.9)';ctx.fill();ctx.strokeStyle='rgba(243,240,223,.8)';ctx.lineWidth=2;ctx.stroke()}}
  function drawBells(){for(const b of bells){const p=b.r+10+Math.sin(performance.now()/260+b.phase)*8+player.seals*1.6;ctx.beginPath();ctx.arc(b.x,b.y,p,0,TAU);ctx.strokeStyle=b.cooldown>0?'rgba(255,77,100,.85)':'rgba(255,77,100,.28)';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,TAU);ctx.fillStyle='#2a0b12';ctx.fill();ctx.strokeStyle='rgba(255,77,100,.9)';ctx.stroke()}}
  function drawPlayer(){ctx.beginPath();ctx.arc(player.x,player.y,player.r,0,TAU);ctx.fillStyle='#f3f0df';ctx.fill();ctx.strokeStyle=player.charge<25?'#ff4d64':'#f1cf75';ctx.lineWidth=4;ctx.stroke()}
  function drawNoise(){ctx.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<18;i++)ctx.fillRect(Math.random()*W,Math.random()*W,Math.random()*2+1,1)}
  function updateHud(){sealsEl.textContent=`${player.seals} / 7`;chargeEl.textContent=`${Math.ceil(player.charge)}`;if(running)timeEl.textContent=fmt(performance.now()-startedAt)}
  function loop(now){const dt=Math.min(.033,(now-last)/1000);last=now;step(dt);draw();updateHud();requestAnimationFrame(loop)}
  startBtn.addEventListener('click',start);resetBtn.addEventListener('click',()=>{motion.x=0;motion.y=0;motion.baseBeta=null;motion.baseGamma=null;motion.calibrating=true;resetWorld();running=true;startPanel.classList.add('hidden')});soundBtn.addEventListener('click',()=>{ensureAudio();if(audio&&audio.state==='suspended')audio.resume();soundOn=!soundOn;soundBtn.textContent=soundOn?'sound on':'sound off';beep(440,.06,'square')});
  setupBest();resetWorld();running=false;requestAnimationFrame(loop);
})();
