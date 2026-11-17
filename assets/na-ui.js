(function(){
var P=window.NA_PAGE||{};
var LANGFIXED=false;
function langUI(){
  var li=document.querySelector('li.wpml-ls-item'); if(!li)return;
  var ul=li.querySelector('ul.sub-menu'); if(!ul)return;
  var isZh=/wpml-ls-item-zh-hans/.test(li.className);
  if(!ul.querySelector('.na-lang-opt')){
    var opt=document.createElement('li'); opt.className='menu-item na-lang-opt-li';
    var a=document.createElement('a'); a.className='na-lang-opt'; a.href=P.switchTo||(isZh?'en.html':'zh.html');
    var img=document.createElement('img'); img.src=isZh?'assets/flag-en.svg':'assets/flag-zh.svg'; img.alt='';
    var box=document.createElement('span');
    var n1=document.createElement('span'); n1.className='na-native'; n1.textContent=isZh?'English':'简体中文';
    var n2=document.createElement('span'); n2.className='na-disp'; n2.textContent=isZh?'(英语)':'(中文)';
    box.appendChild(n1); box.appendChild(n2); a.appendChild(img); a.appendChild(box); opt.appendChild(a); ul.appendChild(opt);
  } else { var ex=ul.querySelector('.na-lang-opt'); if(ex&&P.switchTo) ex.href=P.switchTo; }
  var top=li.querySelector(':scope > a');
  if(top&&!top.dataset.naWired){top.dataset.naWired='1';top.addEventListener('click',function(ev){ if(top.getAttribute('href')&&top.getAttribute('href').indexOf('wpml')<0){return;} ev.preventDefault(); ev.stopPropagation(); li.classList.toggle('na-open'); },false);}
}
function megaUI(){
  var wraps=document.querySelectorAll('.na-mega-wrapper');
  if(!wraps.length)return;
  var wrap=null;
  for(var i=0;i<wraps.length;i++){ if(wraps[i].closest('.na-header-wrap')){wrap=wraps[i];break;} }
  if(!wrap)wrap=wraps[0];
  if(wrap.dataset.naReady)return;
  var host=wrap.closest('.na-header-wrap')||document.querySelector('header');
  if(host&&host.style){host.style.setProperty('z-index','9999999','important');}
  wrap.dataset.naReady='1';
  wrap.style.setProperty('display','none','important');
  function show(){wrap.style.setProperty('display','block','important');wrap.style.setProperty('opacity','1','important');wrap.style.setProperty('visibility','visible','important');wrap.style.setProperty('transform','none','important');}
  function hide(){wrap.style.setProperty('display','none','important');}
  var lis=document.querySelectorAll('header li.na-has-mega-menu');
  for(var j=0;j<lis.length;j++){(function(li){
    li.addEventListener('mouseenter',show,false);
    li.addEventListener('mouseleave',function(){setTimeout(function(){if(!wrap.matches(':hover'))hide();},180);},false);
  })(lis[j]);}
  wrap.addEventListener('mouseenter',show,false);
  wrap.addEventListener('mouseleave',hide,false);
}
var shadow=null, loading=false;
function ensurePopup(){
  if(shadow)return Promise.resolve(shadow);
  if(loading)return Promise.resolve(null);
  loading=true;
  return Promise.all([fetch('assets/popup.html').then(function(r){return r.text();}),fetch('assets/popup.css').then(function(r){return r.text();})]).then(function(res){
    var w=document.getElementById('na-popup-wrap');
    if(!w){w=document.createElement('div');w.id='na-popup-wrap';document.body.appendChild(w);}
    shadow=w.attachShadow({mode:'open'});
    shadow.innerHTML='<style>'+res[1]+'</style>'+res[0];
    loading=false;
    return shadow;
  }).catch(function(){loading=false;return null;});
}
function openPopup(){ensurePopup().then(function(){var w=document.getElementById('na-popup-wrap');if(!w)return;w.classList.add('na-show');document.documentElement.style.overflow='hidden';});}
function closePopup(){var w=document.getElementById('na-popup-wrap');if(!w)return;w.classList.remove('na-show');document.documentElement.style.overflow='';}
function wirePopup(){
  var as=document.querySelectorAll('a[href*="elementor-action"]');
  for(var i=0;i<as.length;i++){var a=as[i];if(a.dataset.naPopup)continue;a.dataset.naPopup='1';a.style.cursor='pointer';a.dataset.naHref=a.getAttribute('href')||'';a.setAttribute('href','javascript:void(0)');a.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();openPopup();},false);}
}
document.addEventListener('click',function(e){
  var p=e.composedPath?e.composedPath():[e.target];
  var t=p[0]||e.target; if(!t)return;
  if(t.closest&&t.closest('.dialog-close-button')){e.preventDefault();closePopup();return;}
  if(t.classList&&t.classList.contains('dialog-widget')){closePopup();return;}
  if(t.id==='na-popup-wrap'){closePopup();}
},false);
document.addEventListener('keydown',function(e){if(e.key==='Escape')closePopup();});
function mobileUI(){
  if(document.getElementById('na-burger'))return;
  var zh=(P.lang==='zh');
  var links=[],seen={};
  var as=document.querySelectorAll('header li.menu-item > a');
  for(var i=0;i<as.length;i++){var a=as[i];
    if(a.closest('li.wpml-ls-item'))continue;
    var raw=a.getAttribute('data-na-href')||a.getAttribute('href')||'';
    if(/elementor-action|javascript:/i.test(raw))continue;
    var href=a.getAttribute('href'); var txt=(a.textContent||'').replace(/\s+/g,' ').trim();
    if(!txt||!href||href==='#')continue;
    if(/^(#|tel:|mailto:)/i.test(href))continue;
    var key=txt+'|'+href; if(seen[key])continue; seen[key]=1; links.push({t:txt,h:href});
  }
  var subs=[],ss={};
  var cards=document.querySelectorAll('.na-mega-wrapper a.na-mega-card');
  for(var j=0;j<cards.length;j++){var c=cards[j];
    var t=(c.querySelector('.na-mega-country')||c).textContent.replace(/\s+/g,' ').trim();
    var h=c.getAttribute('href'); if(!h||h==='#')continue;
    var k=t+'|'+h; if(ss[k])continue; ss[k]=1; subs.push({t:t,h:h});
  }
  var burger=document.createElement('div');
  burger.id='na-burger'; burger.setAttribute('role','button'); burger.setAttribute('aria-label','Menu');
  burger.innerHTML='<span></span><span></span><span></span>';
  document.body.appendChild(burger);

  var ov=document.createElement('div'); ov.id='na-mmenu';
  var close=document.createElement('div'); close.className='na-mm-close'; close.innerHTML='&times;'; ov.appendChild(close);
  var inner=document.createElement('div'); inner.className='na-mm-inner'; ov.appendChild(inner);
  var ul=document.createElement('ul'); inner.appendChild(ul);

  for(var m=0;m<links.length;m++){(function(l){
    var li=document.createElement('li');
    var isProg=(l.t==='移民项目'||/^Programs$/i.test(l.t))&&subs.length>0;
    var row=document.createElement('div'); row.className='na-mm-row';
    var a=document.createElement('a'); a.href=l.h; a.textContent=l.t; row.appendChild(a);
    if(isProg){
      var ar=document.createElement('span'); ar.className='na-mm-arrow'; ar.innerHTML='&rsaquo;'; row.appendChild(ar);
      var subUl=document.createElement('ul'); subUl.className='na-mm-sub';
      for(var s=0;s<subs.length;s++){var sl=document.createElement('li');var sa=document.createElement('a');sa.href=subs[s].h;sa.textContent=subs[s].t;sl.appendChild(sa);subUl.appendChild(sl);}
      li.appendChild(row); li.appendChild(subUl);
      ar.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();li.classList.toggle('na-mm-subopen');},false);
    } else { li.appendChild(row); }
    ul.appendChild(li);
  })(links[m]);}

  var cta=document.createElement('div'); cta.className='na-mm-cta';
  var ctaA=document.createElement('a'); ctaA.href='javascript:void(0)'; ctaA.textContent=zh?'免费咨询':'Free Consultation';
  ctaA.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();closeMenu();openPopup();},false);
  cta.appendChild(ctaA); inner.appendChild(cta);

  var langWrap=document.createElement('div'); langWrap.className='na-mm-langwrap';
  var langRow=document.createElement('div'); langRow.className='na-mm-lang';
  var fi=document.createElement('img'); fi.src=zh?'assets/flag-zh.svg':'assets/flag-en.svg'; fi.alt='';
  var lt=document.createElement('span'); lt.textContent=zh?'简体中文':'English';
  var ar2=document.createElement('span'); ar2.className='na-mm-lang-arrow'; ar2.innerHTML='&darr;';
  langRow.appendChild(fi); langRow.appendChild(lt); langRow.appendChild(ar2);
  var list=document.createElement('div'); list.className='na-mm-langlist';
  var oa=document.createElement('a'); oa.href=P.switchTo||(zh?'en.html':'zh.html');
  var oi=document.createElement('img'); oi.src=zh?'assets/flag-en.svg':'assets/flag-zh.svg'; oi.alt='';
  var ot=document.createElement('span'); ot.textContent=zh?'English':'简体中文';
  var od=document.createElement('span'); od.className='na-disp'; od.textContent=zh?'(英语)':'(中文)';
  oa.appendChild(oi); oa.appendChild(ot); oa.appendChild(od);
  list.appendChild(oa);
  langRow.addEventListener('click',function(ev){ev.stopPropagation();langWrap.classList.toggle('na-open');},false);
  langWrap.appendChild(langRow); langWrap.appendChild(list); inner.appendChild(langWrap);

  document.body.appendChild(ov);

  function openMenu(){ov.classList.add('na-open');document.documentElement.style.overflow='hidden';}
  function closeMenu(){ov.classList.remove('na-open');document.documentElement.style.overflow='';}
  burger.addEventListener('click',function(ev){ev.stopPropagation();if(ov.classList.contains('na-open'))closeMenu();else openMenu();},false);
  close.addEventListener('click',closeMenu,false);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});
  ul.addEventListener('click',function(e){var t=e.target;if(t.tagName==='A')closeMenu();},false);
  ov.addEventListener('click',function(e){if(e.target===ov)closeMenu();},false);
  window.addEventListener('resize',function(){if(window.innerWidth>1024)closeMenu();});
}
function boot(){langUI();megaUI();wirePopup();mobileUI();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,800); setTimeout(boot,2000);
})();
