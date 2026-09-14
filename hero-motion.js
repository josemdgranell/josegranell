const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
const intro=document.querySelector('.brand-intro');
const finish=()=>intro?.remove();
if(reduced.matches)finish();else setTimeout(finish,2100);
const ring=document.createElement('div');ring.className='cursor-accent';ring.setAttribute('aria-hidden','true');document.body.append(ring);
let x=0,y=0,tx=0,ty=0,frame=0,visible=false;
function tick(){updateContrast();x+=(tx-x)*.16;y+=(ty-y)*.16;ring.style.transform=`translate3d(${x}px,${y}px,0)`;frame=visible&&Math.abs(tx-x)+Math.abs(ty-y)>.1?requestAnimationFrame(tick):0;}
function hide(){visible=false;ring.classList.remove('visible');cancelAnimationFrame(frame);frame=0;}
document.addEventListener('pointermove',e=>{if(reduced.matches||!fine.matches||e.pointerType==='touch')return;tx=e.clientX;ty=e.clientY;if(!visible){x=tx;y=ty;visible=true;ring.classList.add('visible');}ring.classList.toggle('link',!!e.target.closest('a,button,summary'));ring.classList.toggle('input',!!e.target.closest('input,textarea,audio'));if(!frame)frame=requestAnimationFrame(tick);},{passive:true});
document.documentElement.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});reduced.addEventListener('change',()=>{hide();if(reduced.matches)finish()});fine.addEventListener('change',hide);
// Match contrast to the painted section beneath the trailing ring.
function updateContrast(){
 const el=document.elementFromPoint(x,y);
 let orange=false,dark=false;
 for(let node=el;node&&node!==document.documentElement;node=node.parentElement){
  const c=getComputedStyle(node).backgroundColor.match(/[\d.]+/g);
  if(c&&c.length>=3&&(c.length<4||+c[3]>.8)){
   const [r,g,b]=c.map(Number);orange=r>190&&g<150&&b<120;dark=r*.2126+g*.7152+b*.0722<65;break;
  }
 }
 ring.classList.toggle('contrast',orange);ring.classList.toggle('light',dark);
}
const field=document.querySelector('.brand-stage');
field?.addEventListener('pointermove',e=>{if(reduced.matches||!fine.matches)return;const r=field.getBoundingClientRect();field.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*2);field.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*2);},{passive:true});
field?.addEventListener('pointerleave',()=>{field.style.setProperty('--mx',0);field.style.setProperty('--my',0)});
window.addEventListener('scroll',()=>{if(visible)updateContrast()},{passive:true});
