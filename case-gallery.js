document.querySelectorAll('.case-thumbs button').forEach((button,index,buttons)=>{
 button.addEventListener('click',()=>{
  const image=document.querySelector('#case-image');
  image.src=button.dataset.image;
  document.querySelector('#case-full').href=button.dataset.image;
  image.alt=button.dataset.name+': '+button.dataset.caption;
  document.querySelector('#case-caption').textContent=button.dataset.caption;
  document.querySelector('#case-count').textContent=(index+1)+' / '+buttons.length;
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 });
 button.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
  buttons[next].focus();buttons[next].click();
 });
});
