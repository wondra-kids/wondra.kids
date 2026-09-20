import{r as x,j as n}from"./index-CDoJJh78.js";function C(e,t){if(e.length===0||t.length===0)throw new TypeError("L'activité et l'exercice doivent être renseignés.");if(e.includes(":"))throw new TypeError("L'identifiant d'activité ne peut pas contenir « : ».");return`${e}:${t}`}const y=3,ne="loupe-du-createur",W=Object.freeze({xp:Object.freeze({pont:2,porte:1}),rewards:Object.freeze({pont:ne})});function $e(){return{xp:0,level:1,rewards:[],awarded:[]}}function $(e){if(!Number.isSafeInteger(e)||e<0)throw new TypeError("Le total d’XP doit être un entier positif.");return 1+Math.floor(e/y)}function Me(e){const t=$(e),i=e%y,r=e>0&&i===0;return{level:t,filled:r?y:i,target:y,reached:r}}function je(e,t,i){return e.awarded.includes(C(t,i))}function be(e,t,i,r=W){const a=C(t,i),o=r.xp[i];if(o===void 0)throw new RangeError(`Aucun barème d’XP pour l’exercice « ${i} ».`);const s=e.xp;if(e.awarded.includes(a))return{progression:e,previous:s,total:s,delta:0,fresh:!1,reward:null};const l=s+o,c=r.rewards?.[i],d=c!==void 0&&!e.rewards.includes(c)?c:null;return{progression:{xp:l,level:$(l),rewards:d===null?e.rewards:[...e.rewards,d],awarded:[...e.awarded,a]},previous:s,total:l,delta:o,fresh:!0,reward:d}}function Ae(e,t=W,i="C01"){const r=[...new Set(e.rewards)],a=new Set(e.awarded);for(const[o,s]of Object.entries(t.rewards??{}))r.includes(s)&&a.add(C(i,o));return{xp:e.xp,level:$(e.xp),rewards:r,awarded:[...a]}}const q=3e3,z=450;function Ee(e,t,i){const r=e+Math.max(0,t);if(t<=0||i>=q)return{total:r,avance:r,fini:!0};const a=Math.max(0,Math.min(1,(i-z)/(q-z)));return{total:e+Math.floor(t*a),avance:e+t*a,fini:!1}}function Se(e){const t=e%y;return e>0&&t===0?y:t}function B(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}const ae=2e3,oe=300;function se(e,t,i,r=ae){const a=e+Math.max(0,t);if(t<=0||r<=0||i>=r)return{total:a,avance:a,fini:!0};const o=Math.min(oe,r/2),s=Math.max(0,Math.min(1,(i-o)/(r-o)));return{total:e+Math.floor(t*s),avance:e+t*s,fini:!1}}function qe(e){const[t,i]=x.useState(void 0),r=x.useRef(e);x.useEffect(()=>{if(e===null)return;if(r.current===null){r.current=e;return}if(e<=r.current){r.current=e;return}const o=r.current,s=e-o;if(B()){r.current=e;return}let l=0;const c=performance.now(),d=M=>{const g=se(o,s,M-c);if(g.fini){r.current=o+s,i(void 0);return}i({affiche:g.total}),l=requestAnimationFrame(d)};return i({affiche:o}),l=requestAnimationFrame(d),()=>cancelAnimationFrame(l)},[e]);const a=t===void 0?e??r.current??0:t.affiche;return{xp:a,text:`Niveau ${$(a)} · ${a} XP`,enMontee:t!==void 0}}function h(e,t,i,r){const a=(s,l,c)=>`<circle cx="${s+c*.38}" cy="${l-c*.42}" r="${c*.36}" fill="#fff"/>`;let o=`<g transform="translate(${e},${t}) scale(${i})">`;return o+=`<g class="ex" data-e="idle">
    <g class="eyes" style="transform-origin:0px 0px">
      <circle cx="${-r}" cy="0" r="6.4" fill="var(--ink)"/>${a(-r,0,6.4)}
      <circle cx="${r}" cy="0" r="7.2" fill="var(--ink)"/>${a(r,0,7.2)}
    </g>
    <path d="M-5 12 q5.5 5 11 0" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
  </g>`,o+=`<g class="ex" data-e="walk">
    <ellipse cx="${-r}" cy="0" rx="6.2" ry="5.4" fill="var(--ink)"/>${a(-r,-.6,6.2)}
    <ellipse cx="${r}" cy="0" rx="6.8" ry="5.8" fill="var(--ink)"/>${a(r,-.6,6.8)}
    <path d="M-6 11 q6 7 12 0 z" fill="var(--ink)"/>
  </g>`,o+=`<g class="ex" data-e="think">
    <path d="M${-r-8} -14 q8 -6 15 0" stroke="var(--ink)" stroke-width="3.2"
          fill="none" stroke-linecap="round"/>
    <path d="M${r+8} -10 l-14 3" stroke="var(--ink)" stroke-width="3.2"
          stroke-linecap="round"/>
    <circle cx="${-r}" cy="-1" r="6.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${-r-1.6}" cy="-3.4" r="3.4" fill="var(--ink)"/>
    <circle cx="${r}" cy="-1" r="6.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${r-1.6}" cy="-3.4" r="3.4" fill="var(--ink)"/>
    <path d="M-2 12 q5 -3 9 1" stroke="var(--ink)" stroke-width="3.2"
          fill="none" stroke-linecap="round"/>
    <circle cx="14" cy="-16" r="2.2" fill="var(--ink)" opacity=".55"/>
    <circle cx="19" cy="-22" r="3" fill="var(--ink)" opacity=".35"/>
  </g>`,o+=`<g class="ex" data-e="win">
    <path d="M${-r-9} -12 q9 -6 17 -1 M${r+9} -12 q-9 -6 -17 -1"
          stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M${-r-7} 1 q7 -9 14 0 M${r-7} 1 q7 -9 14 0"
          stroke="var(--ink)" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M-11 10 a11 10 0 0 0 22 0 z" fill="var(--ink)"/>
    <path d="M-5 17 a5 4 0 0 0 10 0 z" fill="var(--berry)"/>
  </g>`,o+=`<g class="ex" data-e="sulk">
    <path d="M${-r-11} -8 q6 -9 15 -6" stroke="var(--ink)" stroke-width="3.6"
          fill="none" stroke-linecap="round"/>
    <path d="M${r+11} -8 q-6 -9 -15 -6" stroke="var(--ink)" stroke-width="3.6"
          fill="none" stroke-linecap="round"/>

    <circle cx="${-r}" cy="1" r="7.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${-r}" cy="2" r="5.6" fill="var(--ink)"/>
    <circle cx="${-r+2.4}" cy="-1.2" r="2.5" fill="#fff"/>
    <circle cx="${-r-2.6}" cy="3.6" r="1.4" fill="#fff" opacity=".9"/>
    <path class="water" d="M${-r-5} 6 q5 3.4 10 0" stroke="#fff" stroke-width="2"
          fill="none" opacity=".8" stroke-linecap="round"/>

    <circle cx="${r}" cy="1" r="7.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${r}" cy="2" r="5.6" fill="var(--ink)"/>
    <circle cx="${r-2.4}" cy="-1.2" r="2.5" fill="#fff"/>
    <circle cx="${r+2.6}" cy="3.6" r="1.4" fill="#fff" opacity=".9"/>
    <path class="water" d="M${r-5} 6 q5 3.4 10 0" stroke="#fff" stroke-width="2"
          fill="none" opacity=".8" stroke-linecap="round"/>

    <path d="M-9 16 q5 -4 9 -1 t7 -3" stroke="var(--ink)" stroke-width="3.4"
          fill="none" stroke-linecap="round"/>
    <path d="M13 11 q8 -1 13 -6" stroke="var(--ink)" stroke-width="2.8" fill="none"
          stroke-linecap="round" opacity=".5" stroke-dasharray="2.5 4"/>
  </g>`,o+"</g>"}function w(e,t){return`
  <g transform="translate(7,-15)">
    <g class="hipB j">
      <rect x="-4.5" y="0" width="9" height="18" rx="4.5" fill="${t}"/>
      <g transform="translate(0,18)">
        <g class="ankB j"><ellipse cx="3" cy="0" rx="8.5" ry="4" fill="${t}"/></g>
      </g>
    </g>
  </g>
  <g transform="translate(-7,-15)">
    <g class="hipA j">
      <rect x="-4.5" y="0" width="9" height="18" rx="4.5" fill="${e}"/>
      <g transform="translate(0,18)">
        <g class="ankA j"><ellipse cx="3" cy="0" rx="8.5" ry="4" fill="${e}"/></g>
      </g>
    </g>
  </g>`}function m(e,t,i,r,a){return`
  <g transform="translate(${e},${t})">
    <g class="arm${r} j">
      <rect x="-4" y="0" width="8" height="17" rx="4" fill="${i}"
            ${a?'stroke="var(--ink)" stroke-width="2"':""}/>
    </g>
  </g>`}function Q({guide:e=!1}={}){return`<g class="rig">
    ${w("#221B4E","#1A1438")}
    ${m(21,-44,"#E09400","B",!1)}
    ${e?`
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
    ${h(0,-36,1,10)}
    ${m(-21,-44,"#FFB627","A",!0)}
  </g>`}function X(){return`<g class="rig">
    ${w("#4A8A60","#3B7050")}
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
    ${h(0,-46,.98,10)}
  </g>`}function D(){return`<g class="rig">
    ${w("#CA709F","#AB5484")}
    <path d="M-22 -29 Q-43 -30 -34 -15 Q-28 -10 -21 -17 M22 -29 Q43 -30 34 -15 Q28 -10 21 -17"
          fill="#DF89B4" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M-9 -65 Q-22 -85 -10 -86 Q1 -82 0 -65 M2 -65 Q5 -84 16 -79 Q21 -69 11 -62"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M0 -71 C-17 -71 -20 -55 -24 -44 C-29 -31 -37 -17 -25 -10 C-14 -3 14 -3 25 -10 C37 -17 29 -31 24 -44 C20 -55 17 -71 0 -71 Z"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.4" stroke-linejoin="round"/>
    ${h(0,-45,1.08,10)}
  </g>`}function V(){return`<g class="rig">
    ${w("#C93A57","#A82C46")}
    <circle cx="-24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    <circle cx="24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    ${m(-39,-23,"#E24E6B","A",!0)}
    ${m(39,-23,"#C93A57","B",!0)}
    <path d="M-31 -10 Q-37 -41 -23 -53 Q0 -65 23 -53 Q37 -41 31 -10 Z" fill="#E24E6B"
          stroke="var(--ink)" stroke-width="3.6" stroke-linejoin="round"/>
    ${h(0,-34,1,11)}
  </g>`}function Z(){return`<g class="rig">
    <g transform="translate(-18,-40)"><g class="wing">
      <path d="M0 0 q-24 -8 -29 13 16 8 29 -3 z" fill="#5B8FD9"
            stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    </g></g>
    <path d="M18 -40 q24 -8 29 13 -16 8 -29 -3 z" fill="#7BA7F0"
          stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-34" rx="22" ry="23" fill="#7BA7F0" stroke="var(--ink)" stroke-width="3.4"/>
    <path d="M-4 -60 q1 -16 10 -13 7 3 0 13 z M5 -61 q5 -13 13 -8 4 4 -4 10 z"
          fill="#5B8FD9" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    ${h(1,-38,.94,10)}
  </g>`}function J(){return`<g class="rig">
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
    ${h(16,-34,.72,7)}
    <circle cx="-16" cy="-35" r="20" fill="#FF8A5B" stroke="var(--ink)" stroke-width="3.2"/>
    <path d="M-16 -55 q-3 -14 6 -14 6 1 1 12" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    ${h(-16,-36,.8,8)}
  </g>`}function U(){return`<g class="rig">
    ${w("#6B4BB8","#553A96")}
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
    ${h(30,-31,.82,7)}
  </g>`}const G={wondra:"Wondra",roka:"Roka",ola:"Ola",bram:"Bram",sika:"Sika",tumi:"Tumi",idir:"Idir"},le={wondra:Q,roka:X,ola:D,bram:V,sika:Z,tumi:J,idir:U},H={wondra:"-44 -104 95 122",roka:"-48 -86 106 104",ola:"-45 -98 90 118",bram:"-53 -76 106 97",sika:"-57 -87 114 103",tumi:"-46 -83 92 103",idir:"-50 -70 106 88"};function ce(e="wondra",t="idle",i=120){return`<svg viewBox="${H[e]}" width="${i}" height="${i*142/116}" class="character h-${e} ${t}" role="img" aria-label="${G[e]}">${le[e]()}</svg>`}const Be=Object.freeze({face:h,legs:w,arm:m,wondra:Q,roka:X,ola:D,bram:V,sika:Z,tumi:J,idir:U,names:G,frames:H,character:ce}),N="wondra-c01-v1",_="wondra-progression-v1",K=["pont","porte"],Y=["opening","bell","beacon"],de=["demo","obstacle","direct"];function Ce(){return{pont:{attempts:[],aids:[],predictions:[]},porte:{attempts:[],aids:[],predictions:[]}}}function v(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fe(e,t){return v(e)?Number.isSafeInteger(e.run)&&typeof e.command=="string"&&t.includes(e.command)&&(e.prediction===null||typeof e.prediction=="string"&&Y.includes(e.prediction))&&typeof e.success=="boolean":!1}function ue(e,t){if(!v(e))return!1;const{attempts:i,aids:r,predictions:a}=e;return Array.isArray(i)&&i.length<=200&&i.every(o=>fe(o,t))&&Array.isArray(r)&&r.length<=3&&r.every(o=>typeof o=="string"&&de.includes(o))&&Array.isArray(a)&&a.length<=200&&a.every(o=>v(o)&&Number.isSafeInteger(o.run)&&typeof o.value=="string"&&Y.includes(o.value))}function ke(e,t){return v(e)?K.every(i=>ue(e[i],t[i]??[])):!1}function he(e){if(!v(e))return!1;const t=e.xp,i=e.rewards,r=e.awarded;return Number.isSafeInteger(t)&&t>=0&&t<=Number.MAX_SAFE_INTEGER-3&&Array.isArray(i)&&i.every(a=>typeof a=="string")&&(r===void 0||Array.isArray(r)&&r.every(a=>typeof a=="string"))}function Ne(e){let t;try{t=localStorage.getItem(N)}catch{return{kind:"unavailable"}}if(t===null)return{kind:"empty"};try{const i=JSON.parse(t);if(!v(i)||i.version!==1||typeof i.sceneId!="string"||!K.includes(i.sceneId)||!ke(i.statistics,e))return{kind:"corrupt"};const r=i.runNumber,a=i.lastCompletion;return{kind:"ok",value:{version:1,sceneId:i.sceneId,runNumber:Number.isSafeInteger(r)&&r>=0?r:0,statistics:i.statistics,trainingProof:i.trainingProof??null,lastCompletion:v(a)&&a.sceneId==="porte"?a:null}}}catch{return{kind:"corrupt"}}}function _e(){let e;try{e=localStorage.getItem(_)}catch{return{kind:"unavailable"}}if(e===null)return{kind:"empty"};try{const t=JSON.parse(e);if(!he(t))return{kind:"corrupt"};const{xp:i,rewards:r,awarded:a,...o}=t;return{kind:"ok",value:{progression:{xp:i,level:1,rewards:r,awarded:a??[]},extra:Object.fromEntries(Object.entries(o).filter(([s])=>s!=="level"))}}}catch{return{kind:"corrupt"}}}function Ie(e){try{return localStorage.setItem(N,JSON.stringify(e)),!0}catch{return!1}}function Le(e,t){try{return localStorage.setItem(_,JSON.stringify({...t,...e})),!0}catch{return!1}}function Fe(){let e=!0;for(const t of[N,_])try{localStorage.removeItem(t)}catch{e=!1}return e}const Pe=Object.freeze([Object.freeze({id:"c01",label:"Le pont de Roka",ariaLieu:"le pont de Roka",ariaArrivee:"au pont de Roka"}),Object.freeze({id:"b01",label:"L’affiche de la fête",ariaLieu:"l’affiche de la fête",ariaArrivee:"à l’affiche de la fête"}),Object.freeze({id:"avenir",label:"À venir…",ariaLieu:"la prochaine aventure",ariaArrivee:"à la prochaine aventure"})]),pe=q+80,R=260,xe=1450;function ge(e,t){if(t<=1)return{x:170,y:80};const i=e/(t-1);return{x:66+i*212,y:94-Math.sin(i*Math.PI)*20}}function ve(e){if(e.length<=17)return[e];const t=e.split(" "),i=Math.ceil(t.length/2);return[t.slice(0,i).join(" "),t.slice(i).join(" ")]}function ye({heros:e}){return e==="roka"?n.jsxs("g",{"aria-hidden":"true",children:[n.jsx("path",{d:"M-9 -9C-13 -20 -7 -24 -2 -13M8 -9C15 -19 20 -14 11 -6",fill:"#5fa777",stroke:"#221b4e",strokeWidth:"2.2",strokeLinecap:"round"}),n.jsx("circle",{r:"12",fill:"#5fa777",stroke:"#221b4e",strokeWidth:"2.4"}),n.jsx("circle",{cx:"-4",cy:"-2",r:"1.6",fill:"#221b4e"}),n.jsx("circle",{cx:"4",cy:"-2",r:"1.6",fill:"#221b4e"}),n.jsx("path",{d:"M-4 4Q0 7 4 4",fill:"none",stroke:"#221b4e",strokeWidth:"1.8",strokeLinecap:"round"})]}):n.jsxs("g",{"aria-hidden":"true",children:[n.jsx("path",{d:"M-7 -10Q-3 -19 0 -11Q6 -20 8 -8",fill:"#ffb627",stroke:"#221b4e",strokeWidth:"2.2",strokeLinejoin:"round"}),n.jsx("circle",{r:"12",fill:"#ffb627",stroke:"#221b4e",strokeWidth:"2.4"}),n.jsx("circle",{cx:"-4",cy:"-2",r:"1.6",fill:"#221b4e"}),n.jsx("circle",{cx:"4",cy:"-2",r:"1.6",fill:"#221b4e"}),n.jsx("path",{d:"M-4 4Q0 7 4 4",fill:"none",stroke:"#221b4e",strokeWidth:"1.8",strokeLinecap:"round"})]})}function we(){return n.jsxs("g",{"aria-hidden":"true",children:[n.jsx("path",{d:"M-4 -1v-3a4 4 0 0 1 8 0v3",fill:"none",stroke:"#625d70",strokeWidth:"1.5",strokeLinecap:"round"}),n.jsx("rect",{x:"-5",y:"-1",width:"10",height:"8",rx:"2",fill:"#f4f2f6",stroke:"#625d70",strokeWidth:"1.4"}),n.jsx("circle",{cy:"3",r:"1",fill:"#625d70"})]})}function Oe({stations:e,stationCible:t,stationDepart:i,heros:r,nomHeros:a,changementNiveau:o=!1}){const s=Math.max(0,e.findIndex(f=>f.id===t)),l=i===void 0?s-1:e.findIndex(f=>f.id===i),c=x.useMemo(()=>e.map((f,p)=>ge(p,e.length)),[e]),d=c[s]??{x:170,y:80},M=l>=0?c[l]??d:{x:28,y:106},g=B(),[I,j]=x.useState(g),[L,b]=x.useState(g),[A,E]=x.useState(g);x.useEffect(()=>{if(B()){j(!0),b(!0),E(!0);return}j(!1),b(!1),E(!1);let f=0,p=0;const u=window.setTimeout(()=>{j(!0),f=window.setTimeout(()=>b(!0),R),p=window.setTimeout(()=>E(!0),R+xe)},pe);return()=>{window.clearTimeout(u),window.clearTimeout(f),window.clearTimeout(p)}},[t,i]);const F=L?d:M,ee=I?A?"arrivee":L?"deplacement":"depart":"attente",S=l>=0?e[l]:void 0,P=e[s],O=P?.ariaArrivee??`à ${P?.label??t}`,re=S===void 0?`Ton chemin : ${a} est arrivé ${O}.`:`Ton chemin : ${a} a quitté ${S.ariaLieu??S.label} et est arrivé ${O}.`;return n.jsxs("section",{className:"carte-aventure-slot","aria-label":"Progression dans l’aventure",children:[n.jsx("div",{id:"map",className:"carte-aventure","data-visible":I?"true":"false","data-phase":ee,"data-motion":g?"reduit":"anime","data-target":t,role:"img","aria-label":re,children:n.jsxs("svg",{viewBox:"0 0 340 142","aria-hidden":"true",focusable:"false",children:[n.jsx("rect",{x:"1.5",y:"1.5",width:"337",height:"139",rx:"17",fill:"#cfeaf8",stroke:"#221b4e",strokeWidth:"3"}),n.jsx("circle",{cx:"44",cy:"27",r:"11",fill:"#fff6e4",opacity:".9"}),n.jsx("path",{d:"M3 79C45 57 76 75 111 62C151 47 183 69 219 57C258 44 290 58 338 42V139H3Z",fill:"#79b98c"}),n.jsx("path",{d:"M3 101C43 85 77 99 116 85C157 70 193 95 229 81C267 66 300 82 338 66V139H3Z",fill:"#5fa777"}),n.jsx("path",{d:"M21 111C58 109 54 92 90 89S139 70 171 74S229 103 281 91S306 77 320 73",fill:"none",stroke:"#221b4e",strokeWidth:"9",strokeLinecap:"round",opacity:".18"}),n.jsx("path",{d:"M21 108C58 106 54 89 90 86S139 67 171 71S229 100 281 88S306 74 320 70",fill:"none",stroke:"#fff6e4",strokeWidth:"8",strokeLinecap:"round"}),n.jsxs("g",{opacity:".96",children:[n.jsx("rect",{x:"38",y:"51",width:"4",height:"18",rx:"2",fill:"#6b4a2f"}),n.jsx("circle",{cx:"40",cy:"47",r:"10",fill:"#3f7f55"}),n.jsx("rect",{x:"302",y:"47",width:"4",height:"17",rx:"2",fill:"#6b4a2f"}),n.jsx("circle",{cx:"304",cy:"43",r:"9",fill:"#3f7f55"}),n.jsx("path",{d:"M21 70l5-8 5 8Z",fill:"#ffb627",stroke:"#221b4e",strokeWidth:"1.5"})]}),e.map((f,p)=>{const u=c[p]??d,k=p<s?"reussie":p===s?"courante":"verrouillee",te=ve(f.label);return n.jsxs("g",{className:`carte-aventure__station carte-aventure__station--${k}`,"data-station":f.id,"data-state":k,children:[k==="courante"?n.jsx("circle",{className:"carte-aventure__pulse",cx:u.x,cy:u.y,r:"15",fill:"#ffb627"}):null,n.jsx("circle",{cx:u.x,cy:u.y,r:"9",fill:k==="verrouillee"?"#ddd9e2":k==="reussie"?"#5fa777":"#ffb627",stroke:k==="verrouillee"?"#817a8d":"#221b4e",strokeWidth:"2.4",strokeDasharray:k==="verrouillee"?"3 2":void 0}),k==="reussie"?n.jsx("path",{d:`M${u.x-4} ${u.y}l3 3 6-7`,fill:"none",stroke:"#fff",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"}):null,k==="verrouillee"?n.jsx("g",{transform:`translate(${u.x} ${u.y})`,children:n.jsx(we,{})}):null,n.jsx("text",{className:"carte-aventure__label",x:u.x,y:"120",textAnchor:"middle",children:te.map((T,ie)=>n.jsx("tspan",{x:u.x,dy:ie===0?0:10,children:T},`${f.id}-${T}`))})]},f.id)}),n.jsxs("g",{id:"map-character",className:"carte-aventure__personnage","data-hero":r,"data-position":A?t:i??"depart","data-from":i??"depart","data-to":t,style:{transform:`translate(${F.x}px, ${F.y-28}px)`},children:[n.jsx("path",{d:"M-5 11L0 18L5 11",fill:r==="roka"?"#5fa777":"#ffb627",stroke:"#221b4e",strokeWidth:"2",strokeLinejoin:"round"}),n.jsx(ye,{heros:r})]}),n.jsx("circle",{className:"carte-aventure__arrivee","data-active":A&&o?"true":"false",cx:d.x,cy:d.y,r:"18",fill:"none",stroke:"#ffb627",strokeWidth:"3"})]})}),n.jsx("p",{className:"carte-aventure-legende",children:"Ton héros avance sur le chemin de Wondra."})]})}export{Oe as C,_ as P,Pe as S,Be as W,y as X,$e as a,_e as b,Ce as c,Se as d,Fe as e,be as f,Le as g,je as h,Ee as i,$ as l,B as m,Ae as n,Me as p,Ne as r,qe as u,Ie as w};
