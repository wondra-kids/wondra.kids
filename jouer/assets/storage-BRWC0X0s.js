import{r as p}from"./index-BARB3I-I.js";function w(r,e){if(r.length===0||e.length===0)throw new TypeError("L'activité et l'exercice doivent être renseignés.");if(r.includes(":"))throw new TypeError("L'identifiant d'activité ne peut pas contenir « : ».");return`${r}:${e}`}const k=3,z="loupe-du-createur",M=Object.freeze({xp:Object.freeze({pont:2,porte:1}),rewards:Object.freeze({pont:z})});function U(){return{xp:0,level:1,rewards:[],awarded:[]}}function g(r){if(!Number.isSafeInteger(r)||r<0)throw new TypeError("Le total d’XP doit être un entier positif.");return 1+Math.floor(r/k)}function H(r){const e=g(r),n=r%k,t=r>0&&n===0;return{level:e,filled:t?k:n,target:k,reached:t}}function V(r,e,n){return r.awarded.includes(w(e,n))}function Y(r,e,n,t=M){const i=w(e,n),a=t.xp[n];if(a===void 0)throw new RangeError(`Aucun barème d’XP pour l’exercice « ${n} ».`);const o=r.xp;if(r.awarded.includes(i))return{progression:r,previous:o,total:o,delta:0,fresh:!1,reward:null};const s=o+a,l=t.rewards?.[n],f=l!==void 0&&!r.rewards.includes(l)?l:null;return{progression:{xp:s,level:g(s),rewards:f===null?r.rewards:[...r.rewards,f],awarded:[...r.awarded,i]},previous:o,total:s,delta:a,fresh:!0,reward:f}}function Z(r,e=M,n="C01"){const t=[...new Set(r.rewards)],i=new Set(r.awarded);for(const[a,o]of Object.entries(e.rewards??{}))t.includes(o)&&i.add(w(n,a));return{xp:r.xp,level:g(r.xp),rewards:t,awarded:[...i]}}const x=3e3,$=450;function rr(r,e,n){const t=r+Math.max(0,e);if(e<=0||n>=x)return{total:t,avance:t,fini:!0};const i=Math.max(0,Math.min(1,(n-$)/(x-$)));return{total:r+Math.floor(e*i),avance:r+e*i,fini:!1}}function tr(r){const e=r%k;return r>0&&e===0?k:e}function O(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}const R=2e3,_=300;function X(r,e,n,t=R){const i=r+Math.max(0,e);if(e<=0||t<=0||n>=t)return{total:i,avance:i,fini:!0};const a=Math.min(_,t/2),o=Math.max(0,Math.min(1,(n-a)/(t-a)));return{total:r+Math.floor(e*o),avance:r+e*o,fini:!1}}function er(r){const[e,n]=p.useState(void 0),t=p.useRef(r);p.useEffect(()=>{if(r===null)return;if(t.current===null){t.current=r;return}if(r<=t.current){t.current=r;return}const a=t.current,o=r-a;if(O()){t.current=r;return}let s=0;const l=performance.now(),f=N=>{const m=X(a,o,N-l);if(m.fini){t.current=a+o,n(void 0);return}n({affiche:m.total}),s=requestAnimationFrame(f)};return n({affiche:a}),s=requestAnimationFrame(f),()=>cancelAnimationFrame(s)},[r]);const i=e===void 0?r??t.current??0:e.affiche;return{xp:i,text:`Niveau ${g(i)} · ${i} XP`,enMontee:e!==void 0}}function c(r,e,n,t){const i=(o,s,l)=>`<circle cx="${o+l*.38}" cy="${s-l*.42}" r="${l*.36}" fill="#fff"/>`;let a=`<g transform="translate(${r},${e}) scale(${n})">`;return a+=`<g class="ex" data-e="idle">
    <g class="eyes" style="transform-origin:0px 0px">
      <circle cx="${-t}" cy="0" r="6.4" fill="var(--ink)"/>${i(-t,0,6.4)}
      <circle cx="${t}" cy="0" r="7.2" fill="var(--ink)"/>${i(t,0,7.2)}
    </g>
    <path d="M-5 12 q5.5 5 11 0" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
  </g>`,a+=`<g class="ex" data-e="walk">
    <ellipse cx="${-t}" cy="0" rx="6.2" ry="5.4" fill="var(--ink)"/>${i(-t,-.6,6.2)}
    <ellipse cx="${t}" cy="0" rx="6.8" ry="5.8" fill="var(--ink)"/>${i(t,-.6,6.8)}
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
  </g>`,a+"</g>"}function u(r,e){return`
  <g transform="translate(7,-15)">
    <g class="hipB j">
      <rect x="-4.5" y="0" width="9" height="18" rx="4.5" fill="${e}"/>
      <g transform="translate(0,18)">
        <g class="ankB j"><ellipse cx="3" cy="0" rx="8.5" ry="4" fill="${e}"/></g>
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
  </g>`}function h(r,e,n,t,i){return`
  <g transform="translate(${r},${e})">
    <g class="arm${t} j">
      <rect x="-4" y="0" width="8" height="17" rx="4" fill="${n}"
            ${i?'stroke="var(--ink)" stroke-width="2"':""}/>
    </g>
  </g>`}function A({guide:r=!1}={}){return`<g class="rig">
    ${u("#221B4E","#1A1438")}
    ${h(21,-44,"#E09400","B",!1)}
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
    ${c(0,-36,1,10)}
    ${h(-21,-44,"#FFB627","A",!0)}
  </g>`}function E(){return`<g class="rig">
    ${u("#4A8A60","#3B7050")}
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
    ${c(0,-46,.98,10)}
  </g>`}function q(){return`<g class="rig">
    ${u("#CA709F","#AB5484")}
    <path d="M-22 -29 Q-43 -30 -34 -15 Q-28 -10 -21 -17 M22 -29 Q43 -30 34 -15 Q28 -10 21 -17"
          fill="#DF89B4" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M-9 -65 Q-22 -85 -10 -86 Q1 -82 0 -65 M2 -65 Q5 -84 16 -79 Q21 -69 11 -62"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M0 -71 C-17 -71 -20 -55 -24 -44 C-29 -31 -37 -17 -25 -10 C-14 -3 14 -3 25 -10 C37 -17 29 -31 24 -44 C20 -55 17 -71 0 -71 Z"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.4" stroke-linejoin="round"/>
    ${c(0,-45,1.08,10)}
  </g>`}function b(){return`<g class="rig">
    ${u("#C93A57","#A82C46")}
    <circle cx="-24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    <circle cx="24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    ${h(-39,-23,"#E24E6B","A",!0)}
    ${h(39,-23,"#C93A57","B",!0)}
    <path d="M-31 -10 Q-37 -41 -23 -53 Q0 -65 23 -53 Q37 -41 31 -10 Z" fill="#E24E6B"
          stroke="var(--ink)" stroke-width="3.6" stroke-linejoin="round"/>
    ${c(0,-34,1,11)}
  </g>`}function B(){return`<g class="rig">
    <g transform="translate(-18,-40)"><g class="wing">
      <path d="M0 0 q-24 -8 -29 13 16 8 29 -3 z" fill="#5B8FD9"
            stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    </g></g>
    <path d="M18 -40 q24 -8 29 13 -16 8 -29 -3 z" fill="#7BA7F0"
          stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-34" rx="22" ry="23" fill="#7BA7F0" stroke="var(--ink)" stroke-width="3.4"/>
    <path d="M-4 -60 q1 -16 10 -13 7 3 0 13 z M5 -61 q5 -13 13 -8 4 4 -4 10 z"
          fill="#5B8FD9" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    ${c(1,-38,.94,10)}
  </g>`}function S(){return`<g class="rig">
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
    ${c(16,-34,.72,7)}
    <circle cx="-16" cy="-35" r="20" fill="#FF8A5B" stroke="var(--ink)" stroke-width="3.2"/>
    <path d="M-16 -55 q-3 -14 6 -14 6 1 1 12" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    ${c(-16,-36,.8,8)}
  </g>`}function j(){return`<g class="rig">
    ${u("#6B4BB8","#553A96")}
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
    ${c(30,-31,.82,7)}
  </g>`}const F={wondra:"Wondra",roka:"Roka",ola:"Ola",bram:"Bram",sika:"Sika",tumi:"Tumi",idir:"Idir"},Q={wondra:A,roka:E,ola:q,bram:b,sika:B,tumi:S,idir:j},C={wondra:"-44 -104 95 122",roka:"-48 -86 106 104",ola:"-45 -98 90 118",bram:"-53 -76 106 97",sika:"-57 -87 114 103",tumi:"-46 -83 92 103",idir:"-50 -70 106 88"};function T(r="wondra",e="idle",n=120){return`<svg viewBox="${C[r]}" width="${n}" height="${n*142/116}" class="character h-${r} ${e}" role="img" aria-label="${F[r]}">${Q[r]()}</svg>`}const nr=Object.freeze({face:c,legs:u,arm:h,wondra:A,roka:E,ola:q,bram:b,sika:B,tumi:S,idir:j,names:F,frames:C,character:T}),y="wondra-c01-v1",v="wondra-progression-v1",I=["pont","porte"],P=["opening","bell","beacon"],D=["demo","obstacle","direct"];function ir(){return{pont:{attempts:[],aids:[],predictions:[]},porte:{attempts:[],aids:[],predictions:[]}}}function d(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function L(r,e){return d(r)?Number.isSafeInteger(r.run)&&typeof r.command=="string"&&e.includes(r.command)&&(r.prediction===null||typeof r.prediction=="string"&&P.includes(r.prediction))&&typeof r.success=="boolean":!1}function W(r,e){if(!d(r))return!1;const{attempts:n,aids:t,predictions:i}=r;return Array.isArray(n)&&n.length<=200&&n.every(a=>L(a,e))&&Array.isArray(t)&&t.length<=3&&t.every(a=>typeof a=="string"&&D.includes(a))&&Array.isArray(i)&&i.length<=200&&i.every(a=>d(a)&&Number.isSafeInteger(a.run)&&typeof a.value=="string"&&P.includes(a.value))}function J(r,e){return d(r)?I.every(n=>W(r[n],e[n]??[])):!1}function G(r){if(!d(r))return!1;const e=r.xp,n=r.rewards,t=r.awarded;return Number.isSafeInteger(e)&&e>=0&&e<=Number.MAX_SAFE_INTEGER-3&&Array.isArray(n)&&n.every(i=>typeof i=="string")&&(t===void 0||Array.isArray(t)&&t.every(i=>typeof i=="string"))}function ar(r){let e;try{e=localStorage.getItem(y)}catch{return{kind:"unavailable"}}if(e===null)return{kind:"empty"};try{const n=JSON.parse(e);if(!d(n)||n.version!==1||typeof n.sceneId!="string"||!I.includes(n.sceneId)||!J(n.statistics,r))return{kind:"corrupt"};const t=n.runNumber,i=n.lastCompletion;return{kind:"ok",value:{version:1,sceneId:n.sceneId,runNumber:Number.isSafeInteger(t)&&t>=0?t:0,statistics:n.statistics,trainingProof:n.trainingProof??null,lastCompletion:d(i)&&i.sceneId==="porte"?i:null}}}catch{return{kind:"corrupt"}}}function or(){let r;try{r=localStorage.getItem(v)}catch{return{kind:"unavailable"}}if(r===null)return{kind:"empty"};try{const e=JSON.parse(r);if(!G(e))return{kind:"corrupt"};const{xp:n,rewards:t,awarded:i,...a}=e;return{kind:"ok",value:{progression:{xp:n,level:1,rewards:t,awarded:i??[]},extra:Object.fromEntries(Object.entries(a).filter(([o])=>o!=="level"))}}}catch{return{kind:"corrupt"}}}function sr(r){try{return localStorage.setItem(y,JSON.stringify(r)),!0}catch{return!1}}function lr(r,e){try{return localStorage.setItem(v,JSON.stringify({...e,...r})),!0}catch{return!1}}function cr(){let r=!0;for(const e of[y,v])try{localStorage.removeItem(e)}catch{r=!1}return r}export{v as P,nr as W,k as X,U as a,or as b,ir as c,tr as d,cr as e,Y as f,lr as g,V as h,rr as i,g as l,O as m,Z as n,H as p,ar as r,er as u,sr as w};
