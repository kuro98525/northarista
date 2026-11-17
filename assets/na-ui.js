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
function boot(){langUI();megaUI();wirePopup();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setTimeout(boot,800); setTimeout(boot,2000);
})();
