import{i as f,a as $,S as q}from"./assets/vendor-89feecc5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const E="36166907-2dc6449c4338604cccc5458ef",M="https://pixabay.com/api/";let a=1,d="",h=0,p=0;const m=document.querySelector(".js_form"),y=document.querySelector(".js_list"),l=document.querySelector(".loader"),P=document.querySelector("input"),u=document.querySelector("#load_more_btn");m.addEventListener("submit",k);u.addEventListener("click",v);async function k(e){e.preventDefault();const r=P.value.trim();if(r){d=r,a=1,S(l);try{const{images:i,total:n}=await w(d,a);h=n,L(i),await g(i.length)}catch(i){_(i)}finally{b(l),m.reset()}}}async function v(){S(l),a+=1;try{const{images:e,total:r}=await w(d,a);h=r,L(e,!0),await g(e.length)}catch(e){_(e)}finally{b(l)}}async function g(e){a*40>=h?(u.style.display="none",e>0&&await f.info({title:"info",message:"We're sorry, but you've reached the end of search results."})):u.style.display="block"}async function w(e,r){const n=`${M}?key=${E}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${40}`;try{const t=await $.get(n);if(t.status!==200)throw new Error("Network response was not ok!");const{hits:o,totalHits:s}=t.data;if(o.length>0&&a===1){const c=document.querySelector(".description_img");c&&(p=c.getBoundingClientRect().height,window.scrollBy({top:p*2,behavior:"smooth"}))}return{images:o,total:s}}catch(t){throw t}}function L(e,r=!1){if(r||(y.innerHTML=""),e.length===0&&a===1){f.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),u.style.display="none";return}const i=H(e);y.innerHTML+=i,new q(".js_list a",{captionSelector:"img",captionsData:"alt",captionDelay:250}).refresh()}function H(e){return e.map(({webformatURL:r,largeImageURL:i,tags:n,likes:t,views:o,comments:s,downloads:c})=>`
    <li class="description_img">
  <a href="${i}">
    <img src="${r}" alt="${n}" width="350" height="250">
  </a>
  <ul class="description_list">
    <li class="description_item">
      <h2>Likes</h2>
      <p>${t}</p>
    </li>
    <li class="description_item">
      <h2>Views</h2>
      <p>${o}</p>
    </li>
    <li class="description_item">
      <h2>Comments</h2>
      <p>${s}</p>
    </li>
    <li class="description_item">
      <h2>Downloads</h2>
      <p>${c}</p>
    </li>
  </ul>
</li>`).join("")}function _(e){console.error("Error fetch images",e);const r=e.response&&e.response.status===404?"Sorry, there are no images matching your search query. Please try again!":"An error occurred while fetching images. Please try again later.";f.error({title:"Error",message:r})}function S(e){e.style.display="block"}function b(e){e.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
