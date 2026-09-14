(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(!('IntersectionObserver' in window)||!Element.prototype.animate)return;
 const selector='.section-heading,.project,.about-title,.portrait-column,.about-story>p,.about-story>.button,.audio-block,.experience-heading,.experience-row,.tools>div,.footer-top,.footer-links,.contact-form,.signature,.case-heading,.case-gallery,.case-story-label,.case-challenge,.case-decisions>article,.case-takeaway,.case-detail>h2,.case-detail>img,.case-next';
 const elements=[...document.querySelectorAll(selector)],seen=new WeakSet(),running=new Set();let observer;
 function setup(){
  observer?.disconnect();
  if(reduced.matches){running.forEach(a=>a.cancel());running.clear();elements.forEach(el=>el.classList.remove('motion-wait'));return;}
  observer=new IntersectionObserver(entries=>{
   let stagger=0;
   entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top).forEach(({target})=>{
    observer.unobserve(target);target.classList.remove('motion-wait');if(seen.has(target))return;seen.add(target);
    if(target.contains(document.activeElement))return;
    const animation=target.animate([{opacity:0,transform:'translateY(42px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,delay:Math.min(stagger++*100,200),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
    running.add(animation);animation.finished.then(()=>running.delete(animation),()=>running.delete(animation));
   });
  },{threshold:0,rootMargin:`0px 0px -${Math.round(innerHeight*.2)}px 0px`});
  elements.forEach(el=>{if(!seen.has(el)){el.classList.add('motion-wait');observer.observe(el)}});
 }
 // Already-visible content stays still, including direct links into a section.
 elements.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.8&&r.bottom>0)seen.add(el)});
 document.addEventListener('focusin',event=>{const el=event.target.closest('.motion-wait');if(el){el.classList.remove('motion-wait');seen.add(el);observer?.unobserve(el)}});
 reduced.addEventListener('change',setup);setup();
})();
