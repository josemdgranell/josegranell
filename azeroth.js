(()=>{
 let dialog,opener;
 const mascot=document.querySelector('.lofi-art');if(!mascot)return;
 function openQuest(){
  if(dialog?.open)return;opener=document.activeElement;
  if(!dialog){
   dialog=document.createElement('dialog');dialog.className='azeroth-quest';dialog.setAttribute('aria-labelledby','quest-title');
   dialog.innerHTML='<button class="quest-close" type="button" aria-label="Close secret quest">×</button><span class="quest-eyebrow">HIDDEN QUEST / LEVEL ??</span><div class="quest-gnome"><img src="assets/gnome-priest.webp" alt="A cheerful gnome priest in orange robes waving hello" width="640" height="640"><span class="gnome-hello">Hello!</span></div><h2 id="quest-title">You found the<br>WoW nerd.</h2><p class="quest-story">World of Warcraft is one of my favourite ways to spend my free time.<br>A little adventure, a little magic. And yes, plenty of loot.</p><div class="quest-objective"><span>Loot the lost pixels</span><output aria-live="polite">0 / 5</output></div><div class="quest-loot" aria-label="Five lost pixels to collect"></div><div class="quest-reward" hidden><span class="quest-eyebrow">ACHIEVEMENT UNLOCKED</span><h3>Portfolio raider.</h3><p>+500 imaginary XP. A new piece of José lore.<br>Thanks for exploring this little corner of Azeroth.</p><button class="quest-return" type="button">Back to the main quest ↗</button></div><span class="quest-flavour">No repair bill. No raid invite required.</span>';
   document.body.append(dialog);dialog.querySelector('.quest-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.quest-return').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>opener?.focus());
  }
  let collected=0;dialog.classList.remove('quest-complete');dialog.querySelector('.quest-reward').hidden=true;dialog.querySelector('output').textContent='0 / 5';const loot=dialog.querySelector('.quest-loot');loot.hidden=false;loot.replaceChildren();
  ['Strength','Agility','Intellect','Stamina','Spirit'].forEach((stat,i)=>{const coin=document.createElement('button');coin.type='button';coin.className='quest-pixel';coin.style.setProperty('--slot',i);coin.innerHTML='<span aria-hidden="true">✦</span>';coin.setAttribute('aria-label','Loot '+stat+' pixel');coin.addEventListener('click',()=>{coin.disabled=true;coin.classList.add('is-looted');collected++;dialog.querySelector('output').textContent=collected+' / 5';if(collected===5){loot.hidden=true;dialog.classList.add('quest-complete');dialog.querySelector('.quest-reward').hidden=false;dialog.querySelector('.quest-return').focus()}else{const next=[...loot.querySelectorAll('button')].find(b=>!b.disabled);next?.focus()}});loot.append(coin)});
  dialog.showModal();dialog.querySelector('.quest-close').focus();
 }

 const bubble=document.createElement('div');bubble.id='lofi-dialogue';bubble.className='lofi-dialogue';bubble.hidden=true;bubble.setAttribute('role','group');bubble.setAttribute('aria-labelledby','lofi-dialogue-title');bubble.innerHTML='<span class="dialogue-speaker">A FRIENDLY TRAVELLER</span><p id="lofi-dialogue-title">Looking for a little hidden lore about me?</p><div class="dialogue-choices"><button type="button" class="dialogue-yes">Yes, tell me ↗</button><button type="button" class="dialogue-later">Another time</button></div>';mascot.closest('.lofi-player').append(bubble);
 function hideBubble(restore=false){bubble.hidden=true;mascot.setAttribute('aria-expanded','false');if(restore)mascot.focus()}
 mascot.addEventListener('click',()=>{if(!bubble.hidden){hideBubble();return}bubble.hidden=false;mascot.setAttribute('aria-expanded','true');bubble.querySelector('.dialogue-yes').focus()});
 bubble.querySelector('.dialogue-later').addEventListener('click',()=>hideBubble(true));
 bubble.querySelector('.dialogue-yes').addEventListener('click',()=>{hideBubble(true);openQuest()});
 document.addEventListener('click',event=>{if(!bubble.hidden&&!bubble.contains(event.target)&&!mascot.contains(event.target))hideBubble()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!bubble.hidden){event.preventDefault();hideBubble(true)}});
})();
