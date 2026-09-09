'use strict';
const $=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=value=>value?new Date(value+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}):'Not specified';
const days=(date,asOf)=>date?Math.round((Date.parse(date)-Date.parse(asOf))/86400000):null;
const slug=value=>String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-');
const safeLink=value=>{try{return new URL(value).protocol==='https:'?esc(value):'#';}catch{return '#';}};
const order={Open:0,Upcoming:1,Watch:2,Closed:3};
let data,expanded=new Set();
const formIds=['search','status-filter','sponsor-filter','sort'];
function family(record){return record.sponsor.split(' ')[0];}
function visibleRecords(){
 const query=$('search').value.trim().toLowerCase(),status=$('status-filter').value,sponsor=$('sponsor-filter').value,sort=$('sort').value;
 return data.records.filter(r=>(status==='All'||(status==='Active'?['Open','Upcoming'].includes(r.status):r.status===status))&&(sponsor==='All'||family(r)===sponsor)&&[r.title,r.id,r.sponsor,r.officialTitle,r.concept,r.conditions].join(' ').toLowerCase().includes(query)).sort((a,b)=>sort==='date'?(a.nextDate||'9999').localeCompare(b.nextDate||'9999')||b.score-a.score:sort==='score'?b.score-a.score:(order[a.status]??4)-(order[b.status]??4)||(a.rank??999)-(b.rank??999)||b.score-a.score);
}
function renderRows(){
 const records=visibleRecords();
 $('result-count').textContent=`${records.length} of ${data.records.length} shown`;
 $('empty').hidden=records.length>0;
 document.querySelector('.table-wrap').hidden=records.length===0;
 $('funding-rows').innerHTML=records.map(r=>{
  const open=expanded.has(r.id),key=slug(r.id);
  return `<tr class="op-row" id="op-${key}"><td>${r.rank!==null?`<span class="rank-badge" aria-label="Rank ${r.rank} within ${esc(r.status)}">${r.rank}</span>`:'<span class="unranked" aria-label="Unranked">—</span>'}</td><td><button class="op-title" data-id="${esc(r.id)}" id="toggle-${key}" aria-expanded="${open}" aria-controls="detail-${key}">${esc(r.title)}</button><div class="op-meta">${esc(r.sponsor)} · ${esc(r.id)}</div><p class="concept-preview">${esc(r.concept)}</p></td><td><span class="status status-${slug(r.status)}">${esc(r.status)}</span></td><td><div class="next-date">${r.nextDate?fmt(r.nextDate):'No confirmed date'}</div><div class="date-type">${esc(r.dateType||'Watch for announcement')}</div></td><td><div class="score">${r.score}<span> / 100</span></div></td><td><span class="change-label change-${slug(r.change)}">${esc(r.change||'Unchanged')}</span>${r.rankChange?`<span class="rank-move">${r.rankChange>0?'Up':'Down'} ${Math.abs(r.rankChange)} rank${Math.abs(r.rankChange)!==1?'s':''}</span>`:''}</td></tr><tr class="detail-row" id="detail-${key}" ${open?'':'hidden'}><td colspan="6">${renderDetail(r)}</td></tr>`;
 }).join('');
}
function renderDetail(r){
 const money=r.amount===null?'See sponsor budget guidance':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(r.amount);
 return `<div class="detail-content" role="region" aria-labelledby="toggle-${slug(r.id)}"><div class="detail-heading"><h3>${esc(r.officialTitle)}</h3><a href="${safeLink(r.source)}" target="_blank" rel="noopener noreferrer">Read official call <svg class="external-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div><div class="detail-grid"><div><h4>Suggested PennCIL project · assessment</h4><p>${esc(r.concept)}</p></div><div><h4>Eligibility · ${esc(r.eligibility)}</h4><p>${esc(r.conditions)}</p></div><div><h4>What to do next</h4><p>${esc(r.action)}</p></div><div><h4>Budget & duration</h4><p><strong>${money}${r.maxYears?` · up to ${r.maxYears} years`:''}</strong><br>${esc(r.budgetBasis)}</p></div><div><h4>Existing award overlap · assessment</h4><p>${esc(r.overlap)}</p></div><div><h4>Dates & submission requirements</h4><div class="detail-dates">${[['Opens',r.opens],['LOI',r.loi],['Full application',r.fullDeadline],['NOFO expires',r.expires]].filter(x=>x[1]).map(([label,date])=>`<span>${label}<strong>${fmt(date)}</strong></span>`).join('')}</div><p>${esc(r.timing)}</p></div><div><h4>Score breakdown · factors out of 5</h4><p>Research ${r.factors.research} · Methods ${r.factors.methods} · Distinctness ${r.factors.distinctness} · Runway ${r.factors.runway}</p></div><div><h4>Evidence & verification limits</h4><p>${esc(r.evidence)}${r.additionalSource?` <a href="${safeLink(r.additionalSource)}" target="_blank" rel="noopener noreferrer">Additional official source <svg class="external-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`:''}</p></div></div><div class="detail-footer"><span>Verified ${fmt(r.verified)} · Research fit reflects the ${fmt(data.asOf)} review.</span><button class="quiet-button" data-close="${esc(r.id)}">Close details</button></div></div>`;
}
function openRecord(id,{scroll=true,focus=false}={}){
 const record=data.records.find(r=>r.id===id);if(!record)return;
 $('status-filter').value='All';$('sponsor-filter').value='All';$('search').value='';expanded.add(id);renderRows();
 const row=$('op-'+slug(id));if(scroll)row.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 if(focus)$('toggle-'+slug(id)).focus({preventScroll:true});
}
function reset(){ $('search').value='';$('status-filter').value='Active';$('sponsor-filter').value='All';$('sort').value='rank';renderRows(); }
function changes(){
 const latest=data.changes.filter(c=>c.date===data.asOf),counts={New:0,Changed:0,Closed:0};
 for(const type of Object.keys(counts))counts[type]=data.records.filter(r=>r.change===type).length;
 const rankChanges=data.records.filter(r=>r.rankChange).length;
 $('change-date').textContent=fmt(data.asOf);
 $('changes-summary').textContent=data.baseline?'Initial snapshot. Comparisons will appear after the next funding review.':'Field-level differences from the preceding successful review.';
 $('change-counts').innerHTML=[['New',counts.New],['Changed',counts.Changed],['Closed',counts.Closed],['Rank movements',rankChanges]].map(([label,n])=>`<span><strong>${n}</strong>${label}</span>`).join('');
 $('change-list').innerHTML=data.baseline?`<div class="baseline"><strong>Baseline established · ${data.records.length} opportunities tracked</strong>The first review sets the comparison point. These calls are not being reported as newly announced. Future updates will show new calls, changed deadlines or conditions, closures, and ranking movements.</div>`:latest.filter(c=>c.type!=='Baseline').map(c=>{const type=c.field==='status'&&c.after==='Closed'?'Closed':c.type;return `<div class="change-entry"><div><span class="change-label change-${slug(type)}">${esc(type)}</span><br>${esc(c.id)}</div><div><strong>${esc(c.field)}</strong><p>Previous: ${esc(c.before||'Not recorded')}</p><p>Current: ${esc(c.after||'Not recorded')}</p>${c.source?`<a href="${safeLink(c.source)}" target="_blank" rel="noopener noreferrer">Verify at source <svg class="external-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`:''}</div></div>`;}).join('')||'<div class="baseline"><strong>No material changes in this review.</strong>The verified dates and research rankings reflect the latest completed check.</div>';
}
async function load(){
 $('load-state').hidden=false;$('app-content').hidden=true;
 try{
  const response=await fetch('data/funding.json',{cache:'no-cache'});
  if(!response.ok)throw Error(`Dataset request returned ${response.status}`);
  data=await response.json();
  if(data.schemaVersion!==1||!Array.isArray(data.records)||!data.records.length)throw Error('The dataset is incomplete');
  $('review-date').textContent=fmt(data.asOf);
  const near=data.records.filter(r=>r.status==='Open'&&days(r.nextDate,data.asOf)!==null&&days(r.nextDate,data.asOf)>=0&&days(r.nextDate,data.asOf)<=14).sort((a,b)=>a.nextDate.localeCompare(b.nextDate));
  $('count-open').textContent=data.records.filter(r=>r.status==='Open').length;
  $('count-upcoming').textContent=data.records.filter(r=>r.status==='Upcoming').length;
  $('count-near').textContent=near.length;$('count-all').textContent=data.records.length;
  // Show all near dates; group calls sharing the same prerequisite date.
  const groups=new Map();for(const r of near){const key=r.nextDate+'|'+r.dateType;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r);}
  $('attention-list').innerHTML=[...groups.values()].map(rs=>`<div class="attention-item"><strong>${fmt(rs[0].nextDate)} · ${esc(rs[0].dateType)}</strong>${rs.map(r=>`<a href="#op-${slug(r.id)}" data-jump="${esc(r.id)}">${esc(r.title)}</a>`).join(' · ')}<small>${/rolling/i.test(rs[0].dateType)?'Target date; submissions also accepted on a rolling basis.':'Check the cutoff and prerequisite in the official call.'}</small></div>`).join('');
  $('attention').hidden=!near.length;
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const age=days(today,data.asOf);
  if(age>14){$('stale-notice').hidden=false;$('stale-notice').textContent=`This snapshot is ${age} days old. A scheduled review is due; verify current availability with the official sponsor before planning a submission.`;}
  $('sponsor-filter').innerHTML='<option value="All">All funders</option>'+[...new Set(data.records.map(family))].sort().map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('');
  $('weights').innerHTML=data.weights.map(w=>`<div><dt>${esc(w.factor)}<small>${esc(w.description)}</small></dt><dd>${w.weight}%</dd></div>`).join('');
  renderRows();changes();$('load-state').hidden=true;$('app-content').hidden=false;
  const match=data.records.find(r=>'#op-'+slug(r.id)===location.hash);if(match)openRecord(match.id);
 }catch(error){$('load-state').innerHTML='The funding data could not be loaded. Check your connection and try again. <button id="retry" type="button">Try again</button>';$('review-date').textContent='Not available';$('retry').addEventListener('click',load);console.error(error);}
}
formIds.forEach(id=>$(id).addEventListener(id==='search'?'input':'change',()=>{if(data)renderRows();}));
$('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
$('funding-rows').addEventListener('click',event=>{
 const toggle=event.target.closest('[data-id]'),close=event.target.closest('[data-close]');
 if(toggle){const id=toggle.dataset.id;if(expanded.has(id))expanded.delete(id);else expanded.add(id);renderRows();$('toggle-'+slug(id)).focus({preventScroll:true});if(expanded.has(id))history.replaceState(null,'','#op-'+slug(id));}
 if(close){const id=close.dataset.close;expanded.delete(id);renderRows();$('toggle-'+slug(id)).focus();}
});
$('attention-list').addEventListener('click',event=>{const link=event.target.closest('[data-jump]');if(link){event.preventDefault();openRecord(link.dataset.jump,{focus:true});history.replaceState(null,'','#op-'+slug(link.dataset.jump));}});
window.addEventListener('hashchange',()=>{if(data){const r=data.records.find(r=>'#op-'+slug(r.id)===location.hash);if(r)openRecord(r.id);}});
load();
