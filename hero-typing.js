(()=>{
 const text=document.querySelector('.typing-text'),hero=document.querySelector('.hero-screen');if(!text||!hero)return;
 const phrases=['Making complex feel simple.','Research first. People always.','From first sketch to final detail.'];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let index=0,length=phrases[0].length,deleting=true,timer,visible=true;
 function stop(){clearTimeout(timer)}
 function tick(){if(reduced.matches||document.hidden||!visible)return;length+=deleting?-1:1;text.textContent=phrases[index].slice(0,length);let delay=deleting?35:65;
  if(length===0){index=(index+1)%phrases.length;deleting=false;delay=350}else if(length===phrases[index].length&&!deleting){deleting=true;delay=2200}timer=setTimeout(tick,delay);
 }
 function resume(){stop();if(reduced.matches){text.textContent=phrases[0];index=0;length=phrases[0].length;deleting=true;return}if(visible&&!document.hidden)timer=setTimeout(tick,2200)}
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;resume()},{threshold:0}).observe(hero);
 reduced.addEventListener('change',resume);document.addEventListener('visibilitychange',resume);resume();
})();
