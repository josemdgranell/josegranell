(()=>{
 const $=s=>document.querySelector(s),sources=[...document.querySelectorAll('[name="context-source"]')],directions=[...document.querySelectorAll('[name="context-direction"]')];
 const results=$('#context-results'),empty=$('#context-empty'),save=$('#context-save'),history=$('#context-history'),status=$('#context-status');
 const evidence={interviews:['01 / Customer interviews','“I wanted to start, but I did not know which exercise to choose.”'],support:['02 / Support notes','Repeated questions concern the first exercise, repetitions and rest time.'],brief:['03 / Product brief','Keep a route to the full exercise library for people who want more flexibility.']};
 function selected(){return sources.filter(s=>s.checked)}
 function clearDraft(){results.hidden=true;empty.hidden=false;history.hidden=true;directions.forEach(r=>r.checked=false);save.disabled=true}
 function update(){clearDraft();const n=selected().length;$('#context-hint').textContent=n?`${n} source${n===1?'':'s'} selected`:'Select at least one source to continue.';$('#context-compare').disabled=!n;status.textContent='Context changed. Compare again to review an updated draft.'}
 sources.forEach(s=>s.addEventListener('change',update));
 $('#context-compare').addEventListener('click',()=>{
  const chosen=selected();if(!chosen.length)return;clearDraft();empty.hidden=true;results.hidden=false;
  $('#context-basis').textContent=chosen.some(s=>s.value==='interviews')?'The interview example suggests reducing uncertainty at the first step. Compare the trade-offs before choosing.':'The selected sources provide context, but no direct interview evidence. Treat both directions as hypotheses to validate.';
  const holder=$('#context-evidence');holder.replaceChildren();chosen.forEach(s=>{const d=document.createElement('details'),summary=document.createElement('summary'),p=document.createElement('p');summary.textContent=evidence[s.value][0];p.textContent=evidence[s.value][1]+' (Fictional demo data.)';d.append(summary,p);holder.append(d)});
  status.textContent='Two sample directions ready. Inspect the sources, then choose one.';directions[0].focus();
 });
 directions.forEach(r=>r.addEventListener('change',()=>{history.hidden=true;save.disabled=false;status.textContent='Direction selected. Review its trade-off before saving.'}));
 save.addEventListener('click',()=>{const choice=directions.find(r=>r.checked);if(!choice)return;const label=choice.value==='guided'?'Guided start':'Explore freely';$('#context-saved').textContent=label+' — saved for review in this demo.';history.hidden=false;save.disabled=true;status.textContent='Decision saved. You can undo it below.';$('#context-undo').focus()});
 $('#context-undo').addEventListener('click',()=>{history.hidden=true;save.disabled=false;status.textContent='Decision undone. The proposal is a draft again.';save.focus()});
 $('#context-reset').addEventListener('click',()=>{sources.forEach(s=>s.checked=true);update();status.textContent='Demo reset. Choose your sources to start again.';sources[0].focus()});
})();
