function l(r,i,e,t){const n=(o,k,s)=>`<circle cx="${o+s*.38}" cy="${k-s*.42}" r="${s*.36}" fill="#fff"/>`;let a=`<g transform="translate(${r},${i}) scale(${e})">`;return a+=`<g class="ex" data-e="idle">
    <g class="eyes" style="transform-origin:0px 0px">
      <circle cx="${-t}" cy="0" r="6.4" fill="var(--ink)"/>${n(-t,0,6.4)}
      <circle cx="${t}" cy="0" r="7.2" fill="var(--ink)"/>${n(t,0,7.2)}
    </g>
    <path d="M-5 12 q5.5 5 11 0" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
  </g>`,a+=`<g class="ex" data-e="walk">
    <ellipse cx="${-t}" cy="0" rx="6.2" ry="5.4" fill="var(--ink)"/>${n(-t,-.6,6.2)}
    <ellipse cx="${t}" cy="0" rx="6.8" ry="5.8" fill="var(--ink)"/>${n(t,-.6,6.8)}
    <path d="M-6 11 q6 7 12 0 z" fill="var(--ink)"/>
  </g>`,a+=`<g class="ex" data-e="think">
    <path d="M${-t-8} -14 q8 -6 15 0" stroke="var(--ink)" stroke-width="3.2"
          fill="none" stroke-linecap="round"/>
    <path d="M${t+8} -10 l-14 3" stroke="var(--ink)" stroke-width="3.2"
          stroke-linecap="round"/>
    <circle cx="${-t}" cy="-1" r="6.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${-t-1.6}" cy="-3.4" r="3.4" fill="var(--ink)"/>
    <circle cx="${t}" cy="-1" r="6.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${t-1.6}" cy="-3.4" r="3.4" fill="var(--ink)"/>
    <path d="M-2 12 q5 -3 9 1" stroke="var(--ink)" stroke-width="3.2"
          fill="none" stroke-linecap="round"/>
    <circle cx="14" cy="-16" r="2.2" fill="var(--ink)" opacity=".55"/>
    <circle cx="19" cy="-22" r="3" fill="var(--ink)" opacity=".35"/>
  </g>`,a+=`<g class="ex" data-e="win">
    <path d="M${-t-9} -12 q9 -6 17 -1 M${t+9} -12 q-9 -6 -17 -1"
          stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M${-t-7} 1 q7 -9 14 0 M${t-7} 1 q7 -9 14 0"
          stroke="var(--ink)" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M-11 10 a11 10 0 0 0 22 0 z" fill="var(--ink)"/>
    <path d="M-5 17 a5 4 0 0 0 10 0 z" fill="var(--berry)"/>
  </g>`,a+=`<g class="ex" data-e="sulk">
    <path d="M${-t-11} -8 q6 -9 15 -6" stroke="var(--ink)" stroke-width="3.6"
          fill="none" stroke-linecap="round"/>
    <path d="M${t+11} -8 q-6 -9 -15 -6" stroke="var(--ink)" stroke-width="3.6"
          fill="none" stroke-linecap="round"/>

    <circle cx="${-t}" cy="1" r="7.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${-t}" cy="2" r="5.6" fill="var(--ink)"/>
    <circle cx="${-t+2.4}" cy="-1.2" r="2.5" fill="#fff"/>
    <circle cx="${-t-2.6}" cy="3.6" r="1.4" fill="#fff" opacity=".9"/>
    <path class="water" d="M${-t-5} 6 q5 3.4 10 0" stroke="#fff" stroke-width="2"
          fill="none" opacity=".8" stroke-linecap="round"/>

    <circle cx="${t}" cy="1" r="7.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${t}" cy="2" r="5.6" fill="var(--ink)"/>
    <circle cx="${t-2.4}" cy="-1.2" r="2.5" fill="#fff"/>
    <circle cx="${t+2.6}" cy="3.6" r="1.4" fill="#fff" opacity=".9"/>
    <path class="water" d="M${t-5} 6 q5 3.4 10 0" stroke="#fff" stroke-width="2"
          fill="none" opacity=".8" stroke-linecap="round"/>

    <path d="M-9 16 q5 -4 9 -1 t7 -3" stroke="var(--ink)" stroke-width="3.4"
          fill="none" stroke-linecap="round"/>
    <path d="M13 11 q8 -1 13 -6" stroke="var(--ink)" stroke-width="2.8" fill="none"
          stroke-linecap="round" opacity=".5" stroke-dasharray="2.5 4"/>
  </g>`,a+"</g>"}function d(r,i){return`
  <g transform="translate(7,-15)">
    <g class="hipB j">
      <rect x="-4.5" y="0" width="9" height="18" rx="4.5" fill="${i}"/>
      <g transform="translate(0,18)">
        <g class="ankB j"><ellipse cx="3" cy="0" rx="8.5" ry="4" fill="${i}"/></g>
      </g>
    </g>
  </g>
  <g transform="translate(-7,-15)">
    <g class="hipA j">
      <rect x="-4.5" y="0" width="9" height="18" rx="4.5" fill="${r}"/>
      <g transform="translate(0,18)">
        <g class="ankA j"><ellipse cx="3" cy="0" rx="8.5" ry="4" fill="${r}"/></g>
      </g>
    </g>
  </g>`}function f(r,i,e,t,n){return`
  <g transform="translate(${r},${i})">
    <g class="arm${t} j">
      <rect x="-4" y="0" width="8" height="17" rx="4" fill="${e}"
            ${n?'stroke="var(--ink)" stroke-width="2"':""}/>
    </g>
  </g>`}function v({guide:r=!1}={}){return`<g class="rig">
    ${d("#221B4E","#1A1438")}
    ${f(21,-44,"#E09400","B",!1)}
    ${r?`
      <path d="M-30 -30 q-9 12 -5 24 10 -1 17 -9 z" fill="#C97B2E"
            stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-27 -32 q14 -9 27 -2" stroke="#8A5620" stroke-width="4"
            fill="none" stroke-linecap="round"/>`:""}
    <g transform="translate(-19,-58)"><g class="earL">
      <path d="M0 0 q-11 -30 3 -33 9 -1 11 22 z" fill="#FFB627"
            stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M2 -4 q-6 -19 2 -22" stroke="#E09400" stroke-width="4"
            fill="none" stroke-linecap="round"/>
    </g></g>
    <g transform="translate(19,-60)"><g class="earR">
      <path d="M0 0 q11 -25 21 -17 5 6 -7 20 z" fill="#FFB627"
            stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M3 -3 q7 -14 13 -11" stroke="#E09400" stroke-width="4"
            fill="none" stroke-linecap="round"/>
    </g></g>
    <circle cx="0" cy="-33" r="26" fill="#FFB627" stroke="var(--ink)" stroke-width="3.4"/>
    <path d="M-4 -58 q4 -15 14 -11" stroke="var(--ink)" stroke-width="3.2"
          fill="none" stroke-linecap="round"/>
    <circle cx="-19" cy="-24" r="4.8" fill="var(--blush)" opacity=".45"/>
    <circle cx="20" cy="-24" r="4.8" fill="var(--blush)" opacity=".45"/>
    ${l(0,-36,1,10)}
    ${f(-21,-44,"#FFB627","A",!0)}
  </g>`}function $(){return`<g class="rig">
    ${d("#4A8A60","#3B7050")}
    <g transform="translate(16,-26)"><g class="tail">
      <path d="M0 0 q20 2 24 -18 3 -16 -11 -18" stroke="#4A8A60" stroke-width="7"
            fill="none" stroke-linecap="round"/>
      <path d="M29 -36 q-9 -2 -9 -9 0 -6 7 -6 8 0 9 8 1 9 -7 7 z" fill="#5FA777"
            stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    </g></g>
    <ellipse cx="0" cy="-22" rx="17" ry="14" fill="#5FA777" stroke="var(--ink)" stroke-width="3.2"/>
    <path d="M-22 -44 q-15 0 -18 9 10 5 20 -1 z M22 -46 q15 -2 19 7 -10 6 -21 0 z"
          fill="#4A8A60" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="0" cy="-44" r="24" fill="#5FA777" stroke="var(--ink)" stroke-width="3.4"/>
    <path d="M-5 -66 q4 -12 13 -8" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    <circle cx="-17" cy="-36" r="4.6" fill="var(--blush)" opacity=".45"/>
    <circle cx="18" cy="-36" r="4.6" fill="var(--blush)" opacity=".45"/>
    ${l(0,-46,.98,10)}
  </g>`}function x(){return`<g class="rig">
    ${d("#CA709F","#AB5484")}
    <path d="M-22 -29 Q-43 -30 -34 -15 Q-28 -10 -21 -17 M22 -29 Q43 -30 34 -15 Q28 -10 21 -17"
          fill="#DF89B4" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M-9 -65 Q-22 -85 -10 -86 Q1 -82 0 -65 M2 -65 Q5 -84 16 -79 Q21 -69 11 -62"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M0 -71 C-17 -71 -20 -55 -24 -44 C-29 -31 -37 -17 -25 -10 C-14 -3 14 -3 25 -10 C37 -17 29 -31 24 -44 C20 -55 17 -71 0 -71 Z"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.4" stroke-linejoin="round"/>
    ${l(0,-45,1.08,10)}
  </g>`}function m(){return`<g class="rig">
    ${d("#C93A57","#A82C46")}
    <circle cx="-24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    <circle cx="24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    ${f(-39,-23,"#E24E6B","A",!0)}
    ${f(39,-23,"#C93A57","B",!0)}
    <path d="M-31 -10 Q-37 -41 -23 -53 Q0 -65 23 -53 Q37 -41 31 -10 Z" fill="#E24E6B"
          stroke="var(--ink)" stroke-width="3.6" stroke-linejoin="round"/>
    ${l(0,-34,1,11)}
  </g>`}function A(){return`<g class="rig">
    <g transform="translate(-18,-40)"><g class="wing">
      <path d="M0 0 q-24 -8 -29 13 16 8 29 -3 z" fill="#5B8FD9"
            stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    </g></g>
    <path d="M18 -40 q24 -8 29 13 -16 8 -29 -3 z" fill="#7BA7F0"
          stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-34" rx="22" ry="23" fill="#7BA7F0" stroke="var(--ink)" stroke-width="3.4"/>
    <path d="M-4 -60 q1 -16 10 -13 7 3 0 13 z M5 -61 q5 -13 13 -8 4 4 -4 10 z"
          fill="#5B8FD9" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    ${l(1,-38,.94,10)}
  </g>`}function M(){return`<g class="rig">
    <g transform="translate(-14,-13)"><g class="hipA j">
      <rect x="-4" y="0" width="8" height="15" rx="4" fill="var(--ink)"/>
      <g transform="translate(0,15)"><g class="ankA j">
        <ellipse cx="2.6" cy="0" rx="7.4" ry="3.6" fill="var(--ink)"/>
      </g></g>
    </g></g>
    <g transform="translate(15,-13)"><g class="hipB j">
      <rect x="-4" y="0" width="8" height="15" rx="4" fill="#1A1438"/>
      <g transform="translate(0,15)"><g class="ankB j">
        <ellipse cx="2.6" cy="0" rx="7.4" ry="3.6" fill="#1A1438"/>
      </g></g>
    </g></g>
    <circle cx="16" cy="-33" r="18" fill="#E2724A" stroke="var(--ink)" stroke-width="3.2"/>
    <path d="M9 -49 q13 -12 20 -3" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    ${l(16,-34,.72,7)}
    <circle cx="-16" cy="-35" r="20" fill="#FF8A5B" stroke="var(--ink)" stroke-width="3.2"/>
    <path d="M-16 -55 q-3 -14 6 -14 6 1 1 12" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    ${l(-16,-36,.8,8)}
  </g>`}function E(){return`<g class="rig">
    ${d("#6B4BB8","#553A96")}
    <path d="M-40 -12 q0 -14 10 -19 8 -4 12 3 6 -14 16 -14 t14 14 q5 -6 12 -1 8 6 8 17 z"
          fill="#7A5BC8" stroke="var(--ink)" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M-30 -14 q2 -16 12 -19 9 -3 12 5" fill="#8B6BD9"
          stroke="var(--ink)" stroke-width="2.8"/>
    <path d="M-6 -18 q3 -16 13 -16 t13 16" fill="#9B7FE0"
          stroke="var(--ink)" stroke-width="2.8"/>
    <path d="M13 -47 l7 6 -8 4 z" fill="#7A5BC8"/>
    <circle cx="30" cy="-30" r="17" fill="#9B7FE0" stroke="var(--ink)" stroke-width="3.4"/>
    <path d="M18 -38 q6 -6 13 -4" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    ${l(30,-31,.82,7)}
  </g>`}const q={wondra:"Wondra",roka:"Roka",ola:"Ola",bram:"Bram",sika:"Sika",tumi:"Tumi",idir:"Idir"},F={wondra:v,roka:$,ola:x,bram:m,sika:A,tumi:M,idir:E},b={wondra:"-44 -104 95 122",roka:"-48 -86 106 104",ola:"-45 -98 90 118",bram:"-53 -76 106 97",sika:"-57 -87 114 103",tumi:"-46 -83 92 103",idir:"-50 -70 106 88"};function I(r="wondra",i="idle",e=120){return`<svg viewBox="${b[r]}" width="${e}" height="${e*142/116}" class="character h-${r} ${i}" role="img" aria-label="${q[r]}">${F[r]()}</svg>`}const Q=Object.freeze({face:l,legs:d,arm:f,wondra:v,roka:$,ola:x,bram:m,sika:A,tumi:M,idir:E,names:q,frames:b,character:I});function g(r,i){if(r.length===0||i.length===0)throw new TypeError("L'activité et l'exercice doivent être renseignés.");if(r.includes(":"))throw new TypeError("L'identifiant d'activité ne peut pas contenir « : ».");return`${r}:${i}`}const u=3,C="loupe-du-createur",B=Object.freeze({xp:Object.freeze({pont:2,porte:1}),rewards:Object.freeze({pont:C})});function L(){return{xp:0,level:1,rewards:[],awarded:[]}}function w(r){if(!Number.isSafeInteger(r)||r<0)throw new TypeError("Le total d’XP doit être un entier positif.");return 1+Math.floor(r/u)}function _(r){const i=w(r),e=r%u,t=r>0&&e===0;return{level:i,filled:t?u:e,target:u,reached:t}}function D(r,i,e){return r.awarded.includes(g(i,e))}function T(r,i,e,t=B){const n=g(i,e),a=t.xp[e];if(a===void 0)throw new RangeError(`Aucun barème d’XP pour l’exercice « ${e} ».`);const o=r.xp;if(r.awarded.includes(n))return{progression:r,previous:o,total:o,delta:0,fresh:!1,reward:null};const k=o+a,s=t.rewards?.[e],h=s!==void 0&&!r.rewards.includes(s)?s:null;return{progression:{xp:k,level:w(k),rewards:h===null?r.rewards:[...r.rewards,h],awarded:[...r.awarded,n]},previous:o,total:k,delta:a,fresh:!0,reward:h}}function W(r,i=B,e="C01"){const t=[...new Set(r.rewards)],n=new Set(r.awarded);for(const[a,o]of Object.entries(i.rewards??{}))t.includes(o)&&n.add(g(e,a));return{xp:r.xp,level:w(r.xp),rewards:t,awarded:[...n]}}const p="wondra-c01-v1",y="wondra-progression-v1",S=["pont","porte"],j=["opening","bell","beacon"],z=["demo","obstacle","direct"];function X(){return{pont:{attempts:[],aids:[],predictions:[]},porte:{attempts:[],aids:[],predictions:[]}}}function c(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function N(r,i){return c(r)?Number.isSafeInteger(r.run)&&typeof r.command=="string"&&i.includes(r.command)&&(r.prediction===null||typeof r.prediction=="string"&&j.includes(r.prediction))&&typeof r.success=="boolean":!1}function O(r,i){if(!c(r))return!1;const{attempts:e,aids:t,predictions:n}=r;return Array.isArray(e)&&e.length<=200&&e.every(a=>N(a,i))&&Array.isArray(t)&&t.length<=3&&t.every(a=>typeof a=="string"&&z.includes(a))&&Array.isArray(n)&&n.length<=200&&n.every(a=>c(a)&&Number.isSafeInteger(a.run)&&typeof a.value=="string"&&j.includes(a.value))}function P(r,i){return c(r)?S.every(e=>O(r[e],i[e]??[])):!1}function R(r){if(!c(r))return!1;const i=r.xp,e=r.rewards,t=r.awarded;return Number.isSafeInteger(i)&&i>=0&&i<=Number.MAX_SAFE_INTEGER-3&&Array.isArray(e)&&e.every(n=>typeof n=="string")&&(t===void 0||Array.isArray(t)&&t.every(n=>typeof n=="string"))}function J(r){let i;try{i=localStorage.getItem(p)}catch{return{kind:"unavailable"}}if(i===null)return{kind:"empty"};try{const e=JSON.parse(i);if(!c(e)||e.version!==1||typeof e.sceneId!="string"||!S.includes(e.sceneId)||!P(e.statistics,r))return{kind:"corrupt"};const t=e.runNumber,n=e.lastCompletion;return{kind:"ok",value:{version:1,sceneId:e.sceneId,runNumber:Number.isSafeInteger(t)&&t>=0?t:0,statistics:e.statistics,trainingProof:e.trainingProof??null,lastCompletion:c(n)&&n.sceneId==="porte"?n:null}}}catch{return{kind:"corrupt"}}}function G(){let r;try{r=localStorage.getItem(y)}catch{return{kind:"unavailable"}}if(r===null)return{kind:"empty"};try{const i=JSON.parse(r);if(!R(i))return{kind:"corrupt"};const{xp:e,rewards:t,awarded:n,...a}=i;return{kind:"ok",value:{progression:{xp:e,level:1,rewards:t,awarded:n??[]},extra:Object.fromEntries(Object.entries(a).filter(([o])=>o!=="level"))}}}catch{return{kind:"corrupt"}}}function K(r){try{return localStorage.setItem(p,JSON.stringify(r)),!0}catch{return!1}}function U(r,i){try{return localStorage.setItem(y,JSON.stringify({...i,...r})),!0}catch{return!1}}function V(){let r=!0;for(const i of[p,y])try{localStorage.removeItem(i)}catch{r=!1}return r}export{y as P,Q as W,u as X,L as a,G as b,X as c,T as d,V as e,U as f,D as h,w as l,W as n,_ as p,J as r,K as w};
