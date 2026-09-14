(()=>{
 const section=document.querySelector('.hero-scroll');if(!section)return;
 const screen=section.querySelector('.hero-screen'),copy=section.querySelector('.hero-editorial'),glyph=section.querySelector('.hero-glyph'),orbits=section.querySelector('.hero-orbits'),bottom=section.querySelector('.hero-bottomline'),counter=section.querySelector('.hero-percentage'),process=section.querySelector('.hero-process');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fracture=section.querySelector('.hero-fracture');
 let scheduled=0,pointerX=0,pointerY=0;
 const clamp=n=>Math.max(0,Math.min(1,n));
 function render(){
  scheduled=0;
  if(reduced.matches){[copy,glyph,orbits,bottom,process].filter(Boolean).forEach(el=>{el.style.transform='';el.style.opacity=''});section.style.setProperty('--scroll',0);counter.textContent='00';return;}
  const height=screen.clientHeight,scroll=-section.getBoundingClientRect().top;
  const p=Math.max(0,scroll/(height*.95));
  if(fracture){
   const opening=Math.max(0,p-.035),width=opening*110,depth=opening*185;
   const points=[[50-width,100],[50-width*.7,100-depth*.24],[50-width*.5,100-depth*.43],[50-width*.26,100-depth*.53],[50-width*.32,100-depth*.64],[50,100-depth],[50+width*.13,100-depth*.7],[50+width*.3,100-depth*.57],[50+width*.28,100-depth*.48],[50+width*.65,100-depth*.25],[50+width,100]];
   fracture.style.clipPath=opening>=1.35?'inset(0)':`polygon(${points.map(([x,y])=>`${x.toFixed(2)}% ${y.toFixed(2)}%`).join(',')})`;
  }
  section.style.setProperty('--scroll',clamp(p).toFixed(4));counter.textContent=String(Math.round(clamp(p)*100)).padStart(2,'0');
  const fade=1-clamp((p-.12)/.62);
  copy.style.transform=`translate3d(${-p*35}px,${-p*height*.2}px,0) scale(${1-p*.07})`;
  copy.style.opacity=fade;
  glyph.style.transform=`translate3d(${p*230+pointerX*9}px,${-p*height*.48+pointerY*9}px,0) rotate(${-p*62}deg) scale(${1+p*.22})`;
  glyph.style.opacity=1-clamp((p-.55)/.8);
  orbits.style.transform=`rotate(${p*62}deg) scale(${1+p*.25})`;
  orbits.style.opacity=.55*(1-clamp((p-.35)/.95));
  if(process){process.style.transform=`translate3d(${p*65}px,${-p*height*.32}px,0)`;process.style.opacity=1-clamp((p-.15)/.8);}
  bottom.style.opacity=1-clamp(p*4);
  bottom.style.transform=`translateY(${-p*50}px)`;
 }
 function schedule(){if(!scheduled)scheduled=requestAnimationFrame(render)}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});addEventListener('pageshow',schedule);reduced.addEventListener('change',schedule);
 screen.addEventListener('pointermove',event=>{if(reduced.matches||event.pointerType==='touch')return;const r=screen.getBoundingClientRect();pointerX=(event.clientX-r.left)/r.width-.5;pointerY=(event.clientY-r.top)/r.height-.5;schedule()},{passive:true});
 screen.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;schedule()});
 render();
})();
