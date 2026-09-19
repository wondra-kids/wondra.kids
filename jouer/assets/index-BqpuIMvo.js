import{r as O,j as n}from"./index-B_g0WXeJ.js";function U(e,t,r,i){const a=(m,f,k)=>`<circle cx="${m+k*.38}" cy="${f-k*.42}" r="${k*.36}" fill="#fff"/>`;let p=`<g transform="translate(${e},${t}) scale(${r})">`;return p+=`<g class="ex" data-e="idle">
    <g class="eyes" style="transform-origin:0px 0px">
      <circle cx="${-i}" cy="0" r="6.4" fill="var(--ink)"/>${a(-i,0,6.4)}
      <circle cx="${i}" cy="0" r="7.2" fill="var(--ink)"/>${a(i,0,7.2)}
    </g>
    <path d="M-5 12 q5.5 5 11 0" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
  </g>`,p+=`<g class="ex" data-e="walk">
    <ellipse cx="${-i}" cy="0" rx="6.2" ry="5.4" fill="var(--ink)"/>${a(-i,-.6,6.2)}
    <ellipse cx="${i}" cy="0" rx="6.8" ry="5.8" fill="var(--ink)"/>${a(i,-.6,6.8)}
    <path d="M-6 11 q6 7 12 0 z" fill="var(--ink)"/>
  </g>`,p+=`<g class="ex" data-e="think">
    <path d="M${-i-8} -14 q8 -6 15 0" stroke="var(--ink)" stroke-width="3.2"
          fill="none" stroke-linecap="round"/>
    <path d="M${i+8} -10 l-14 3" stroke="var(--ink)" stroke-width="3.2"
          stroke-linecap="round"/>
    <circle cx="${-i}" cy="-1" r="6.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${-i-1.6}" cy="-3.4" r="3.4" fill="var(--ink)"/>
    <circle cx="${i}" cy="-1" r="6.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${i-1.6}" cy="-3.4" r="3.4" fill="var(--ink)"/>
    <path d="M-2 12 q5 -3 9 1" stroke="var(--ink)" stroke-width="3.2"
          fill="none" stroke-linecap="round"/>
    <circle cx="14" cy="-16" r="2.2" fill="var(--ink)" opacity=".55"/>
    <circle cx="19" cy="-22" r="3" fill="var(--ink)" opacity=".35"/>
  </g>`,p+=`<g class="ex" data-e="win">
    <path d="M${-i-9} -12 q9 -6 17 -1 M${i+9} -12 q-9 -6 -17 -1"
          stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M${-i-7} 1 q7 -9 14 0 M${i-7} 1 q7 -9 14 0"
          stroke="var(--ink)" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M-11 10 a11 10 0 0 0 22 0 z" fill="var(--ink)"/>
    <path d="M-5 17 a5 4 0 0 0 10 0 z" fill="var(--berry)"/>
  </g>`,p+=`<g class="ex" data-e="sulk">
    <path d="M${-i-11} -8 q6 -9 15 -6" stroke="var(--ink)" stroke-width="3.6"
          fill="none" stroke-linecap="round"/>
    <path d="M${i+11} -8 q-6 -9 -15 -6" stroke="var(--ink)" stroke-width="3.6"
          fill="none" stroke-linecap="round"/>

    <circle cx="${-i}" cy="1" r="7.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${-i}" cy="2" r="5.6" fill="var(--ink)"/>
    <circle cx="${-i+2.4}" cy="-1.2" r="2.5" fill="#fff"/>
    <circle cx="${-i-2.6}" cy="3.6" r="1.4" fill="#fff" opacity=".9"/>
    <path class="water" d="M${-i-5} 6 q5 3.4 10 0" stroke="#fff" stroke-width="2"
          fill="none" opacity=".8" stroke-linecap="round"/>

    <circle cx="${i}" cy="1" r="7.4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="${i}" cy="2" r="5.6" fill="var(--ink)"/>
    <circle cx="${i-2.4}" cy="-1.2" r="2.5" fill="#fff"/>
    <circle cx="${i+2.6}" cy="3.6" r="1.4" fill="#fff" opacity=".9"/>
    <path class="water" d="M${i-5} 6 q5 3.4 10 0" stroke="#fff" stroke-width="2"
          fill="none" opacity=".8" stroke-linecap="round"/>

    <path d="M-9 16 q5 -4 9 -1 t7 -3" stroke="var(--ink)" stroke-width="3.4"
          fill="none" stroke-linecap="round"/>
    <path d="M13 11 q8 -1 13 -6" stroke="var(--ink)" stroke-width="2.8" fill="none"
          stroke-linecap="round" opacity=".5" stroke-dasharray="2.5 4"/>
  </g>`,p+"</g>"}function ie(e,t){return`
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
  </g>`}function he(e,t,r,i,a){return`
  <g transform="translate(${e},${t})">
    <g class="arm${i} j">
      <rect x="-4" y="0" width="8" height="17" rx="4" fill="${r}"
            ${a?'stroke="var(--ink)" stroke-width="2"':""}/>
    </g>
  </g>`}function lt({guide:e=!1}={}){return`<g class="rig">
    ${ie("#221B4E","#1A1438")}
    ${he(21,-44,"#E09400","B",!1)}
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
    ${U(0,-36,1,10)}
    ${he(-21,-44,"#FFB627","A",!0)}
  </g>`}function at(){return`<g class="rig">
    ${ie("#4A8A60","#3B7050")}
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
    ${U(0,-46,.98,10)}
  </g>`}function ct(){return`<g class="rig">
    ${ie("#CA709F","#AB5484")}
    <path d="M-22 -29 Q-43 -30 -34 -15 Q-28 -10 -21 -17 M22 -29 Q43 -30 34 -15 Q28 -10 21 -17"
          fill="#DF89B4" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M-9 -65 Q-22 -85 -10 -86 Q1 -82 0 -65 M2 -65 Q5 -84 16 -79 Q21 -69 11 -62"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M0 -71 C-17 -71 -20 -55 -24 -44 C-29 -31 -37 -17 -25 -10 C-14 -3 14 -3 25 -10 C37 -17 29 -31 24 -44 C20 -55 17 -71 0 -71 Z"
          fill="#F2A6C8" stroke="var(--ink)" stroke-width="3.4" stroke-linejoin="round"/>
    ${U(0,-45,1.08,10)}
  </g>`}function dt(){return`<g class="rig">
    ${ie("#C93A57","#A82C46")}
    <circle cx="-24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    <circle cx="24" cy="-56" r="9" fill="#E24E6B" stroke="var(--ink)" stroke-width="3.2"/>
    ${he(-39,-23,"#E24E6B","A",!0)}
    ${he(39,-23,"#C93A57","B",!0)}
    <path d="M-31 -10 Q-37 -41 -23 -53 Q0 -65 23 -53 Q37 -41 31 -10 Z" fill="#E24E6B"
          stroke="var(--ink)" stroke-width="3.6" stroke-linejoin="round"/>
    ${U(0,-34,1,11)}
  </g>`}function ut(){return`<g class="rig">
    <g transform="translate(-18,-40)"><g class="wing">
      <path d="M0 0 q-24 -8 -29 13 16 8 29 -3 z" fill="#5B8FD9"
            stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    </g></g>
    <path d="M18 -40 q24 -8 29 13 -16 8 -29 -3 z" fill="#7BA7F0"
          stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-34" rx="22" ry="23" fill="#7BA7F0" stroke="var(--ink)" stroke-width="3.4"/>
    <path d="M-4 -60 q1 -16 10 -13 7 3 0 13 z M5 -61 q5 -13 13 -8 4 4 -4 10 z"
          fill="#5B8FD9" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    ${U(1,-38,.94,10)}
  </g>`}function pt(){return`<g class="rig">
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
    ${U(16,-34,.72,7)}
    <circle cx="-16" cy="-35" r="20" fill="#FF8A5B" stroke="var(--ink)" stroke-width="3.2"/>
    <path d="M-16 -55 q-3 -14 6 -14 6 1 1 12" stroke="var(--ink)" stroke-width="3"
          fill="none" stroke-linecap="round"/>
    ${U(-16,-36,.8,8)}
  </g>`}function ft(){return`<g class="rig">
    ${ie("#6B4BB8","#553A96")}
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
    ${U(30,-31,.82,7)}
  </g>`}const ht={wondra:"Wondra",roka:"Roka",ola:"Ola",bram:"Bram",sika:"Sika",tumi:"Tumi",idir:"Idir"},tr={wondra:lt,roka:at,ola:ct,bram:dt,sika:ut,tumi:pt,idir:ft},kt={wondra:"-44 -104 95 122",roka:"-48 -86 106 104",ola:"-45 -98 90 118",bram:"-53 -76 106 97",sika:"-57 -87 114 103",tumi:"-46 -83 92 103",idir:"-50 -70 106 88"};function rr(e="wondra",t="idle",r=120){return`<svg viewBox="${kt[e]}" width="${r}" height="${r*142/116}" class="character h-${e} ${t}" role="img" aria-label="${ht[e]}">${tr[e]()}</svg>`}const Ve=Object.freeze({face:U,legs:ie,arm:he,wondra:lt,roka:at,ola:ct,bram:dt,sika:ut,tumi:pt,idir:ft,names:ht,frames:kt,character:rr});function De(e,t){if(e.length===0||t.length===0)throw new TypeError("L'activité et l'exercice doivent être renseignés.");if(e.includes(":"))throw new TypeError("L'identifiant d'activité ne peut pas contenir « : ».");return`${e}:${t}`}const pe=3,nr="loupe-du-createur",gt=Object.freeze({xp:Object.freeze({pont:2,porte:1}),rewards:Object.freeze({pont:nr})});function tt(){return{xp:0,level:1,rewards:[],awarded:[]}}function Ce(e){if(!Number.isSafeInteger(e)||e<0)throw new TypeError("Le total d’XP doit être un entier positif.");return 1+Math.floor(e/pe)}function ir(e){const t=Ce(e),r=e%pe,i=e>0&&r===0;return{level:t,filled:i?pe:r,target:pe,reached:i}}function Ie(e,t,r){return e.awarded.includes(De(t,r))}function or(e,t,r,i=gt){const a=De(t,r),p=i.xp[r];if(p===void 0)throw new RangeError(`Aucun barème d’XP pour l’exercice « ${r} ».`);const m=e.xp;if(e.awarded.includes(a))return{progression:e,previous:m,total:m,delta:0,fresh:!1,reward:null};const f=m+p,k=i.rewards?.[r],Q=k!==void 0&&!e.rewards.includes(k)?k:null;return{progression:{xp:f,level:Ce(f),rewards:Q===null?e.rewards:[...e.rewards,Q],awarded:[...e.awarded,a]},previous:m,total:f,delta:p,fresh:!0,reward:Q}}function sr(e,t=gt,r="C01"){const i=[...new Set(e.rewards)],a=new Set(e.awarded);for(const[p,m]of Object.entries(t.rewards??{}))i.includes(m)&&a.add(De(r,p));return{xp:e.xp,level:Ce(e.xp),rewards:i,awarded:[...a]}}function lr(e,t){return e==="unknown_command"||e==="step_failed"?"failure":e==="already_complete"||t?"success":"no-effect"}function ar(e,t,r){const i=[];let a=t;const p=m=>({outcome:lr(m,e.isComplete(a)),reason:m,steps:i,finalState:a});if(r.length===0)return p("empty");if(e.isComplete(a))return p("already_complete");for(const m of r){const f=e.commands[m];if(f===void 0)return p("unknown_command");for(const k of f){try{a=k.apply(a)}catch{return p("step_failed")}i.push({index:i.length,event:k.event,commandId:m,state:a})}}return p("executed")}function rt(e){return{sceneId:e.id,obstacleOpen:!1,beaconOn:!1,bellCount:0,olaWaved:!1,roka:{...e.positions.roka},phase:"ready",lastCommand:null}}function ee(e,t){return t.sceneId===e.id&&t.obstacleOpen&&t.roka.x===e.positions.goal.x&&t.roka.y===e.positions.goal.y}function je(e,t){const r=ee(e,t),i=[];return t.obstacleOpen&&i.push(e.kind==="bridge"?"bridge_opened":"door_opened"),r&&i.push(e.kind==="bridge"?"bridge_crossed":"transfer_success"),{success:r,criteriaValidated:i}}function K(e,t,r){return{event:t,apply:i=>({...i,lastCommand:e,...r(i)})}}function cr(e){const t={},r=a=>e.commands.some(p=>p.id===a),i=e.openCommand;return r(i)&&(t[i]=[K(i,"opened",()=>({phase:"opening",obstacleOpen:!0})),K(i,"crossed",()=>({phase:"crossing",roka:{...e.positions.goal}})),K(i,"completed",()=>({phase:"complete"}))]),r("sonner")&&(t.sonner=[K("sonner","rang",a=>({phase:"reacting",bellCount:a.bellCount+1,olaWaved:!0})),K("sonner","settled",()=>({phase:"ready"}))]),r("allumer")&&(t.allumer=[K("allumer","lit",()=>({phase:"reacting",beaconOn:!0})),K("allumer","settled",()=>({phase:"ready"}))]),{commands:t,isComplete:a=>ee(e,a)}}function nt(e,t,r){if(t.sceneId!==e.id)throw new Error("La scène et l’état ne correspondent pas.");const i=p=>({reason:p,steps:[],finalState:t,verdict:je(e,t)});if(!Array.isArray(r)||r.length>1)return i("invalid_program");const a=ar(cr(e),t,r);return{reason:a.reason,steps:a.steps,finalState:a.finalState,verdict:je(e,a.finalState)}}const it=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t);function Me(e,t,r,i){if(typeof e!="number"||!Number.isFinite(e)||e<r||e>i)throw new TypeError(`Coordonnée invalide : ${t}`);return e}function we(e,t){const r=e??{};return{x:Me(r.x,`${t}.x`,0,760),y:Me(r.y,`${t}.y`,0,340)}}function mt(e){if(e===null||typeof e!="object"||!["bridge","door"].includes(e.kind))throw new TypeError("Type de scène invalide.");const t=e.positions??{},r=m=>we(t[m],`positions.${m}`),i=r("obstacle"),a=Me((t.obstacle??{}).width,"positions.obstacle.width",14,300),p={x:i.x,y:i.y,width:a};if(p.x+p.width>760)throw new TypeError("Obstacle hors de la scène.");return e.kind==="door"&&Me(p.y,"positions.obstacle.y (porte)",114,277),{roka:r("roka"),goal:r("goal"),ola:r("ola"),obstacle:p,beacon:r("beacon"),bell:r("bell")}}function dr(e){let t,r,i,a=!1;function p({x:l,y:s,width:c}){const g=l+c,b=l+c/2,M=b+38,T=Math.min(24,c*.32);function N(x,w=0){return[[M+x*(T+w*.25),82],[M+x*(T+w*.3),106],[b+10+x*(c*.27+w*.45),121],[b+8+x*(c*.32+w*.55),145],[b+x*(c*.41+w*.7),164],[b+x*(c/2+6+w),s-27],[b+x*(c/2+6+w),s],[b+x*(c/2+6+w),s+29],[b-4+x*(c/2+12+w*1.1),266],[b-4+x*(c/2+17+w*1.15),286],[b-4+x*(c/2+20+w*1.2),310],[b+x*(c/2+26+w*1.3),329],[b+x*(c/2+28+w*1.3),350]]}function E(x,w="M"){return`${w}${x[0].join(" ")}
        C${x.slice(1).map(j=>j.join(" ")).join(" ")}`}function P(x,w){return`${E(N(x,w))}
        ${E(N(x).reverse(),"L")}Z`}function A(x,w,j){const L=N(x),I=w*3,q=1-j,[W,oe]=[0,1].map(J=>q*q*q*L[I][J]+3*q*q*j*L[I+1][J]+3*q*j*j*L[I+2][J]+j*j*j*L[I+3][J]);return[W,oe]}const B=E(N(-1)),G=E(N(1).reverse()),Z=`${B}
      ${E(N(1).reverse(),"L")}
      Q${M} 76 ${M-T} 82Z`,ke=[[-1,0,.68,.36],[1,0,.86,.44],[-1,1,.22,.6],[1,1,.08,.54],[-1,2,.73,.85],[1,2,.64,.8],[-1,3,.5,1.08],[1,3,.76,1.18]].map(([x,w,j,L],I)=>{const[q,W]=A(x,w,j);return`
        <g transform="translate(${q+x*(5+L*4)} ${W})
                      scale(${L})">
          <path d="M0 1Q-1 -6 -5 -10
                   M0 1Q2 -5 2 -12
                   M0 1Q4 -3 8 -5"
                fill="none" stroke="#739574" stroke-width="1.7"
                stroke-linecap="round"/>
          <path d="M-1 0Q-1 -4 -3 -6"
                fill="none" stroke="#c5dcbf" stroke-width="1.2"
                stroke-linecap="round"/>
          ${I%2===0?`
            <ellipse cx="${x*7}" cy="5" rx="5" ry="2"
                     fill="#221b4e" opacity=".08"/>
            <path d="M${x*7-4} 4
                     Q${x*7-3} -1 ${x*7+1} 1
                     Q${x*7+5} 1 ${x*7+4} 4
                     Q${x*7} 6 ${x*7-4} 4Z"
                  fill="#d4d5b8" stroke="#91a189" stroke-width=".9"/>
            <path d="M${x*7-2} 2h3"
                  stroke="#fffbf4" stroke-width=".9"
                  stroke-linecap="round" opacity=".65"/>`:""}
        </g>`}).join("");return`
      <defs>
        <clipPath id="canal-water-clip" clipPathUnits="userSpaceOnUse">
          <path d="${Z}"/>
        </clipPath>

        <!-- Silhouette exacte du terrain existant : aucune eau sur la colline. -->
        <clipPath id="canal-terrain-clip" clipPathUnits="userSpaceOnUse">
          <path d="M0 110Q116 51 236 108T476 90T760 106V350H0Z"/>
        </clipPath>
        <linearGradient id="canal-distance-fade" gradientUnits="userSpaceOnUse"
                        x1="0" y1="82" x2="0" y2="142">
          <stop stop-color="#fff" stop-opacity="0"/>
          <stop offset=".35" stop-color="#fff" stop-opacity=".08"/>
          <stop offset=".70" stop-color="#fff" stop-opacity=".65"/>
          <stop offset="1" stop-color="#fff"/>
        </linearGradient>
        <mask id="canal-horizon-mask" maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
              x="0" y="0" width="760" height="350">
          <rect width="760" height="350" fill="url(#canal-distance-fade)"/>
        </mask>
      </defs>

      <g clip-path="url(#canal-terrain-clip)">
        <g mask="url(#canal-horizon-mask)">
          <!-- Rubans de terre : fins au loin, plus généreux au premier plan. -->
          <path d="${P(-1,10)} ${P(1,10)}"
                fill="#9caf92" opacity=".78"/>
          <path d="${P(-1,4.5)} ${P(1,4.5)}"
                fill="#d4d5b8"/>

          <path d="${Z}" fill="url(#water-pattern)"/>
          <path d="${Z}" fill="url(#canal-light)"/>

          <g clip-path="url(#canal-water-clip)"
             fill="none" stroke-linecap="round">
            <!-- Ombre progressive sous les rives, sans bord supérieur tracé. -->
            <path d="${B} ${G}"
                  stroke="#221b4e" stroke-width="13" opacity=".035"/>
            <path d="${B} ${G}"
                  stroke="#221b4e" stroke-width="7" opacity=".055"/>
            <path d="${B} ${G}"
                  stroke="#466f70" stroke-width="2.5" opacity=".16"/>

            <!-- Rides distinctes : longueur, amplitude et épaisseur en perspective. -->
            <g transform="translate(${M-8} 118) scale(.40)">
              <path d="M-18 0Q-7 -3 3 0T18 -1"
                    stroke="#fffbf4" stroke-width="1.7" opacity=".55"/>
              <path d="M-6 7h12"
                    stroke="#edf4ff" stroke-width="1.1" opacity=".35"/>
            </g>
            <g transform="translate(${b+12} 147) scale(.62)">
              <path d="M-29 0C-18 -4 -8 4 5 0S22 -2 29 -1"
                    stroke="#fffbf4" stroke-width="1.8" opacity=".48"/>
              <path d="M7 8Q14 6 22 8"
                    stroke="#edf4ff" stroke-width="1.2" opacity=".30"/>
            </g>
            <g transform="translate(${b-5} 270)">
              <path d="M-42 0C-24 -5 -8 5 12 0S31 -2 42 -1"
                    stroke="#fffbf4" stroke-width="1.6" opacity=".40"/>
              <path d="M-20 10Q-8 7 4 9"
                    stroke="#edf4ff" stroke-width="1.2" opacity=".26"/>
            </g>
            <g transform="translate(${b+2} 318) scale(1.18)">
              <path d="M-35 0C-19 -4 -2 5 17 1S36 -2 43 0"
                    stroke="#fffbf4" stroke-width="1.6" opacity=".34"/>
              <path d="M-46 11Q-33 8 -21 10"
                    stroke="#edf4ff" stroke-width="1.2" opacity=".25"/>
            </g>

            <!-- Reflets de rive courts, élargis seulement au premier plan. -->
            <path d="M${b+c*.3} 133
                     Q${b+c*.31} 139 ${b+c*.32} 144"
                  stroke="#fffbf4" stroke-width="1" opacity=".38"/>
            <path d="M${l+14} 158Q${l+8} 169 ${l+6} 178"
                  stroke="#fffbf4" stroke-width="1.4" opacity=".32"/>
            <path d="M${g+2} 272
                     C${g+5} 283 ${g+11} 297 ${g+12} 306"
                  stroke="#fffbf4" stroke-width="2" opacity=".38"/>
          </g>

          <path d="${B} ${G}" fill="none"
                stroke="#658f89" stroke-width="1.2" opacity=".65"/>

          ${ke}
        </g>
      </g>

      <!-- Avancées herbeuses raccordées aux rives : appuis fixes du pont. -->
      <path d="M${l-24} ${s-28}
               Q${l-9} ${s-35} ${l+4} ${s-29}
               Q${l+10} ${s-19} ${l+8} ${s-3}
               Q${l+11} ${s+17} ${l+3} ${s+29}
               Q${l-10} ${s+34} ${l-24} ${s+27}Z
               M${g+24} ${s-28}
               Q${g+9} ${s-34} ${g-4} ${s-29}
               Q${g-10} ${s-17} ${g-8} ${s+1}
               Q${g-11} ${s+18} ${g-3} ${s+29}
               Q${g+10} ${s+34} ${g+24} ${s+27}Z"
            fill="url(#ground)"/>
      <path d="M${l+4} ${s-28}
               Q${l+10} ${s-16} ${l+8} ${s-3}
               Q${l+11} ${s+17} ${l+3} ${s+28}
               M${g-4} ${s-28}
               Q${g-10} ${s-17} ${g-8} ${s+1}
               Q${g-11} ${s+18} ${g-3} ${s+28}"
            fill="none" stroke="#d4d5b8" stroke-width="4"
            stroke-linecap="round"/>
      <path d="M${l-12} ${s+29}l-3 -6m3 6l4 -5
               M${g+13} ${s-27}l-2 -6m2 6l5 -4"
            fill="none" stroke="#739574" stroke-width="1.5"
            stroke-linecap="round"/>

      <ellipse cx="${b}" cy="${s+29}" rx="${c*.49}" ry="9"
               fill="#221b4e" opacity=".09"
               clip-path="url(#canal-water-clip)"/>
      <g fill="#c8d2bb" stroke="#91a189" stroke-width="1.3">
        <rect x="${l-5}" y="${s-23}" width="13" height="46" rx="4"/>
        <rect x="${g-8}" y="${s-23}" width="13" height="46" rx="4"/>
      </g>

      <g class="bridge-deck"
         style="transform-origin:${l}px ${s}px;transform:rotate(-90deg)">
        <rect x="${l}" y="${s-21}" width="${c}" height="42" rx="6"
              fill="url(#wood-pattern)" stroke="#594565" stroke-width="3"/>
        <path d="M${l+5} ${s-25}H${l+c-5}
                 M${l+5} ${s+25}H${l+c-5}"
              stroke="#8a5e46" stroke-width="7" stroke-linecap="round"/>
        <path d="M${l+5} ${s-27}H${l+c-5}"
              stroke="#ffe5aa" stroke-width="2" stroke-linecap="round"/>
        <circle cx="${l+c-9}" cy="${s}" r="3" fill="#594565"/>
      </g>
      <circle cx="${l}" cy="${s}" r="9" fill="#fff1c9"
              stroke="#594565" stroke-width="3"/>
      <rect class="obstacle-highlight" x="${l-30}" y="${s-c-12}"
            width="${c+55}" height="${c+55}" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function m({x:l,y:s,width:c}){function g(M,T){return`
        <g transform="translate(${l} ${M}) scale(${c/40} ${(T-M)/100})">
          <path d="M2 96Q-8 87 -5 72Q-12 58 -5 44
                   Q-11 25 0 19Q-2 3 13 5Q25 -4 33 8
                   Q47 6 44 26Q53 39 45 54Q51 70 43 79
                   Q47 96 32 98Q16 104 2 96Z"
                fill="#9caf92" stroke="#739574" stroke-width="2.5"
                vector-effect="non-scaling-stroke"/>
          <path d="M4 28Q2 15 15 17M18 10Q29 5 34 18
                   M0 58Q-3 45 8 41M25 70Q37 59 42 69
                   M7 87Q14 78 23 85"
                fill="none" stroke="#c5dcbf" stroke-width="3"
                stroke-linecap="round" vector-effect="non-scaling-stroke"/>
        </g>`}const b=Array.from({length:5},(M,T)=>{const N=T*c/5,E=N+c*.15,P=-48-T%2*2;return`
        <path d="M${N} -4V${P+4}
                 Q${(N+E)/2} ${P-3} ${E} ${P+4}
                 V-4Z"
              fill="#f0bd83" stroke="#594565" stroke-width="1.5"
              stroke-linejoin="round"/>
        <path d="M${N+c*.06} ${P+10}V-19"
              stroke="#ffe4b8" stroke-width="1.5" stroke-linecap="round"/>`}).join("");return`
      ${g(67,s-42)}
      <ellipse cx="${l+2}" cy="${s-38}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>
      <ellipse cx="${l+c+2}" cy="${s+46}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>

      <!-- Projection oblique : les lattes et l'axe des gonds restent verticaux. -->
      <g class="door-leaf"
         style="transform-origin:${l}px ${s-42}px;transform:matrix(1,0,0,1,0,0)">
        <g transform="matrix(1 ${84/c} 0 1 ${l} ${s-42})">
          ${b}
          <path d="M1 -35H${c-2}M1 -12H${c-2}
                   M2 -13L${c-3} -34"
                fill="none" stroke="#8a5e46" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 -37H${c-3}"
                stroke="#ffe4b8" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="${c-5}" cy="-25" r="3"
                  fill="#fff5cf" stroke="#594565" stroke-width="1.5"/>
        </g>
      </g>

      ${g(s+44,322)}
      <rect x="${l-5}" y="${s-98}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <rect x="${l+c-5}" y="${s-14}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <path d="M${l-2} ${s-89}V${s-48}
               M${l+c-2} ${s-5}V${s+36}"
            stroke="#ffe4b8" stroke-width="2" stroke-linecap="round"/>
      <path d="M${l-5} ${s-77}H${l+5}
               M${l-5} ${s-54}H${l+5}"
            stroke="#594565" stroke-width="3" stroke-linecap="round"/>
      <path d="M${l-9} ${s-37}l-4 -6m4 6l5 -5
               M${l+c+7} ${s+47}l-3 -7m3 7l6 -4"
            fill="none" stroke="#739574" stroke-width="2" stroke-linecap="round"/>
      <rect class="obstacle-highlight" x="${l-21}" y="${s-108}"
            width="${c+42}" height="175" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function f(l,s,c){if(!["roka","ola"].includes(l))throw new TypeError("Acteur inconnu.");const g=we({x:s,y:c},`actor.${l}`);return`
      <g class="actor-${l}" style="transform:translate(${g.x}px,${g.y}px)">
        <ellipse cx="1" cy="7" rx="34" ry="9" fill="#221b4e" opacity=".12"/>
        <g transform="scale(1.08)">
          <g class="character h-${l} idle" aria-hidden="true">
            ${Ve[l]()}
          </g>
        </g>
        <g transform="translate(0 32)">
          <rect x="-31" y="-15" width="62" height="24" rx="12" fill="#fffaf0" opacity=".95"/>
          <text class="world-label" y="3">${it(Ve.names[l])}</text>
        </g>
      </g>`}function k(l,s,c){const g=r.querySelector(l);g!==null&&g.setAttribute(s,c)}function Q(l,s){const c=r.querySelector(l);c!==null&&(c.textContent=s)}function H(l,s){const c=mt(l),g=we(s.roka,"state.roka");t={...l,positions:c},i=s,a=!1,e.innerHTML=`
      <svg viewBox="0 0 760 340" role="img" aria-labelledby="world-title world-description"
           xmlns="http://www.w3.org/2000/svg">
        <title id="world-title">${it(t.title)}</title>
        <desc id="world-description"></desc>
        <defs>
          <linearGradient id="sky" x2="0" y2="1">
            <stop stop-color="#e8e0fa"/><stop offset="1" stop-color="#fff6e6"/>
          </linearGradient>
          <linearGradient id="ground" x2="0" y2="1">
            <stop stop-color="#dce8d3"/><stop offset="1" stop-color="#c5dcbf"/>
          </linearGradient>

          <!-- ID conservé ; le motif à tuiles devient un dégradé continu.
               Teal et bleu de l'atelier, adoucis pour le décor. -->
          <linearGradient id="water-pattern" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stop-color="#b7d9cf"/>
            <stop offset=".18" stop-color="#91c9c4"/>
            <stop offset=".48" stop-color="#73abbc"/>
            <stop offset=".68" stop-color="#80b6c6"/>
            <stop offset="1" stop-color="#b7d9cf"/>
          </linearGradient>
          <linearGradient id="canal-light" gradientUnits="userSpaceOnUse"
                          x1="0" y1="62" x2="0" y2="340">
            <stop stop-color="#fffbf4" stop-opacity=".24"/>
            <stop offset=".48" stop-color="#fffbf4" stop-opacity="0"/>
            <stop offset="1" stop-color="#221b4e" stop-opacity=".06"/>
          </linearGradient>

          <pattern id="wood-pattern" width="20" height="42" patternUnits="userSpaceOnUse">
            <rect width="20" height="42" fill="#edc28e"/>
            <path d="M1 0V42" stroke="#ac7a55" stroke-width="2"/>
            <path d="M7 8v19" stroke="#ffe4b8" stroke-width="2" stroke-linecap="round"/>
          </pattern>
          <pattern id="wall-pattern" width="40" height="30" patternUnits="userSpaceOnUse">
            <rect width="40" height="30" fill="#c7bad8"/>
            <path d="M0 0H40M0 15H40M20 0V15M0 15V30M40 15V30"
                  fill="none" stroke="#a394b7" stroke-width="2"/>
          </pattern>
          <g id="grass" fill="none" stroke="#739574" stroke-width="2.5" stroke-linecap="round">
            <path d="M0 0l-4 -8M0 0l4 -10M0 0l9 -4"/>
          </g>
          <g id="flower">
            <path d="M0 0V-12" stroke="#739574" stroke-width="2"/>
            <circle cy="-14" r="5" fill="#fff5dc"/><circle cy="-14" r="2" fill="#b87a35"/>
          </g>
        </defs>

        <rect width="760" height="340" fill="url(#sky)"/>
        <circle cx="684" cy="43" r="23" fill="#ffe5a1"/>
        <path d="M31 38q14 -18 29 -3q20 -13 33 8H28Z
                 M574 30q12 -15 25 -3q16 -10 29 7H573Z"
              fill="#fffaf8" opacity=".85"/>
        <path d="M0 91Q92 36 193 82T388 72T585 83T760 66V340H0Z" fill="#c6c5de"/>
        <path d="M0 110Q116 51 236 108T476 90T760 106V340H0Z" fill="url(#ground)"/>
        <path d="M-15 210Q177 190 270 205T487 204T775 196"
              stroke="#9bb590" stroke-width="77" fill="none" opacity=".3"/>
        <path d="M-15 204Q177 184 270 199T487 198T775 190"
              stroke="#f5e7c7" stroke-width="64" fill="none" stroke-linecap="round"/>
        <path d="M25 205h25M85 198h15M675 197h28M726 192h14"
              stroke="#d4bf95" stroke-width="3" stroke-linecap="round"/>

        ${t.kind==="bridge"?p(c.obstacle):m(c.obstacle)}

        <g opacity=".9">
          <use href="#grass" x="52" y="151"/><use href="#grass" x="112" y="294"/>
          <use href="#grass" x="266" y="289"/><use href="#grass" x="482" y="293"/>
          <use href="#grass" x="697" y="265"/><use href="#grass" x="732" y="128"/>
          <use href="#flower" x="72" y="280"/><use href="#flower" x="83" y="286"/>
          <use href="#flower" x="646" y="298"/><use href="#flower" x="663" y="303"/>
        </g>
        <g fill="#9caf92">
          <ellipse cx="26" cy="323" rx="44" ry="20"/><ellipse cx="735" cy="327" rx="47" ry="23"/>
        </g>
        <g fill="#c8d2bb" stroke="#91a189" stroke-width="2">
          <ellipse cx="130" cy="265" rx="12" ry="6"/><ellipse cx="704" cy="144" rx="10" ry="5"/>
        </g>

        <g transform="translate(${c.beacon.x} ${c.beacon.y})">
          <ellipse cy="43" rx="23" ry="6" fill="#221b4e" opacity=".1"/>
          <path d="M0 0V40M-14 41H14" stroke="#65556f" stroke-width="5" stroke-linecap="round"/>
          <g class="beacon-rays" visibility="hidden" stroke="#8a6223" stroke-width="3">
            <path d="M0 -40V-31M-31 -25L-23 -20M31 -25L23 -20M-34 0H-27M34 0H27"/>
          </g>
          <rect class="beacon-light" x="-17" y="-24" width="34" height="32" rx="9"
                fill="#ded8e9" stroke="#65556f" stroke-width="3"/>
          <path d="M-22 -26H22" stroke="#65556f" stroke-width="5" stroke-linecap="round"/>
        </g>
        <g transform="translate(${c.bell.x} ${c.bell.y})">
          <ellipse cx="-19" cy="42" rx="25" ry="6" fill="#221b4e" opacity=".1"/>
          <path d="M-30 38V-38H0V-25" fill="none" stroke="#65556f"
                stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <g class="bell-body">
            <path d="M-19 8Q-12 -2 -12 -12Q-12 -29 0 -29
                     Q12 -29 12 -12Q12 -2 19 8Z"
                  fill="#ffb627" stroke="#65556f" stroke-width="3"/>
            <circle cy="12" r="4" fill="#65556f"/>
            <path d="M-6 -16q0 -6 4 -7" stroke="#fff5ce" stroke-width="3" fill="none"/>
          </g>
          <g class="bell-marks" visibility="hidden" stroke="#65556f" stroke-width="3" fill="none">
            <path d="M-25 -20Q-36 -10 -25 0M25 -20Q36 -10 25 0"/>
          </g>
        </g>

        ${f("roka",g.x,g.y)}
        ${f("ola",c.ola.x,c.ola.y)}
        <g class="ola-response" visibility="hidden" transform="translate(${c.ola.x+28} ${c.ola.y-89})">
          <rect x="0" y="-18" width="87" height="30" rx="14" fill="#fffaf0" stroke="#847797" stroke-width="2"/>
          <text x="43" y="3" text-anchor="middle" fill="#221b4e" font-size="15" font-family="system-ui">Coucou !</text>
        </g>
        <g transform="translate(380 28)">
          <rect x="-103" y="-17" width="206" height="33" rx="16" fill="#fffaf0" stroke="#847797" stroke-width="1.5"/>
          <text class="world-label obstacle-label" y="5"></text>
        </g>
      </svg>`;const b=e.querySelector("svg");if(b===null)throw new TypeError("La scène n’a pas pu être rendue.");return r=b,$(s,"initial")}function z(l){let s;return l.phase==="complete"?s=t.text.success:l.phase==="crossing"?s=t.text.crossing:l.obstacleOpen?s=t.text.opened:s=t.text.closed,l.beaconOn&&(s+=" Balise allumée, avec des rayons."),l.olaWaved&&(s+=" Ola a répondu à la cloche."),s}function u(l,s){const c=r.querySelector(`.h-${l}`);if(c!==null)for(const g of["idle","walk","think","win","sulk"])c.classList.toggle(g,g===s)}function $(l,s){const c=we(l.roka,"state.roka");i=l;const g=r.querySelector(".actor-roka");g!==null&&(g.style.transform=`translate(${c.x}px,${c.y}px)`);const b=r.querySelector(".bridge-deck"),M=r.querySelector(".door-leaf");b!==null&&(b.style.transform=l.obstacleOpen?"rotate(0deg)":"rotate(-90deg)"),M!==null&&(M.style.transform=l.obstacleOpen?`matrix(1,${-84/t.positions.obstacle.width},0,1,0,0)`:"matrix(1,0,0,1,0,0)");const T=l.phase==="complete"?"win":l.phase==="crossing"?"walk":l.phase==="ready"&&l.lastCommand!==null?"think":"idle";u("roka",T),u("ola",l.phase==="complete"?"win":"idle"),k(".beacon-light","fill",l.beaconOn?"#ffb627":"#ded8e9"),k(".beacon-rays","visibility",l.beaconOn?"visible":"hidden"),k(".bell-marks","visibility",l.bellCount>0?"visible":"hidden"),k(".ola-response","visibility",l.olaWaved&&l.phase!=="complete"?"visible":"hidden"),k(".obstacle-highlight","visibility",l.obstacleOpen?"hidden":"visible"),k(".obstacle-highlight","stroke-width",a?"5":"3"),Q(".obstacle-label",l.obstacleOpen?"✓ Passage libre":t.kind==="bridge"?"! Pont replié":"! Porte fermée");const N=z(l);return Q("#world-description",N),{description:N,ringing:s==="rang"}}function _(){return a=!0,$(i,"highlight")}return Object.freeze({mount:H,update:$,highlightObstacle:_})}const Ue="wondra-c01-v1",We="wondra-progression-v1",xt=["pont","porte"],bt=["opening","bell","beacon"],ur=["demo","obstacle","direct"];function ot(){return{pont:{attempts:[],aids:[],predictions:[]},porte:{attempts:[],aids:[],predictions:[]}}}function te(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function pr(e,t){return te(e)?Number.isSafeInteger(e.run)&&typeof e.command=="string"&&t.includes(e.command)&&(e.prediction===null||typeof e.prediction=="string"&&bt.includes(e.prediction))&&typeof e.success=="boolean":!1}function fr(e,t){if(!te(e))return!1;const{attempts:r,aids:i,predictions:a}=e;return Array.isArray(r)&&r.length<=200&&r.every(p=>pr(p,t))&&Array.isArray(i)&&i.length<=3&&i.every(p=>typeof p=="string"&&ur.includes(p))&&Array.isArray(a)&&a.length<=200&&a.every(p=>te(p)&&Number.isSafeInteger(p.run)&&typeof p.value=="string"&&bt.includes(p.value))}function hr(e,t){return te(e)?xt.every(r=>fr(e[r],t[r]??[])):!1}function kr(e){if(!te(e))return!1;const t=e.xp,r=e.rewards,i=e.awarded;return Number.isSafeInteger(t)&&t>=0&&t<=Number.MAX_SAFE_INTEGER-3&&Array.isArray(r)&&r.every(a=>typeof a=="string")&&(i===void 0||Array.isArray(i)&&i.every(a=>typeof a=="string"))}function gr(e){let t;try{t=localStorage.getItem(Ue)}catch{return{kind:"unavailable"}}if(t===null)return{kind:"empty"};try{const r=JSON.parse(t);if(!te(r)||r.version!==1||typeof r.sceneId!="string"||!xt.includes(r.sceneId)||!hr(r.statistics,e))return{kind:"corrupt"};const i=r.runNumber,a=r.lastCompletion;return{kind:"ok",value:{version:1,sceneId:r.sceneId,runNumber:Number.isSafeInteger(i)&&i>=0?i:0,statistics:r.statistics,trainingProof:r.trainingProof??null,lastCompletion:te(a)&&a.sceneId==="porte"?a:null}}}catch{return{kind:"corrupt"}}}function mr(){let e;try{e=localStorage.getItem(We)}catch{return{kind:"unavailable"}}if(e===null)return{kind:"empty"};try{const t=JSON.parse(e);if(!kr(t))return{kind:"corrupt"};const{xp:r,rewards:i,awarded:a,...p}=t;return{kind:"ok",value:{progression:{xp:r,level:1,rewards:i,awarded:a??[]},extra:Object.fromEntries(Object.entries(p).filter(([m])=>m!=="level"))}}}catch{return{kind:"corrupt"}}}function xr(e){try{return localStorage.setItem(Ue,JSON.stringify(e)),!0}catch{return!1}}function br(e,t){try{return localStorage.setItem(We,JSON.stringify({...t,...e})),!0}catch{return!1}}function vr(){let e=!0;for(const t of[Ue,We])try{localStorage.removeItem(t)}catch{e=!1}return e}const de="C01",ue="effects-v2.1",yr={opened:500,crossed:750,completed:0,rang:1e3,lit:450,settled:0},$r=900,st={title:"Bravo !",finaleHidden:!0,announcement:"",gainText:"0 XP",totalText:"0 XP",levelText:"Niveau 1",progressValue:0,progressText:"0 sur 3 XP vers le niveau 2",nextText:"Encore 3 XP pour le niveau 2",nextHidden:!1,replayHidden:!0,rewardHidden:!0,nextStepHidden:!0,closePrimary:!1,hasGain:!1,isReplay:!1};function wr(e){const t=Object.fromEntries(e.scenes.map(o=>[o.id,o])),r=window.matchMedia("(prefers-reduced-motion: reduce)"),i=new Set;let a=null,p=null,m=!1,f=ot(),k=tt(),Q={},H=null,z=null,u=null,$=null,_=[],l=null,s=!1,c=0,g=0,b=!1,M=0,T=!0,N=!1,E=null,P=0,A=null,B=!1,G="Scène 1 sur 2",Z=e.title,ke="",x="",w=!1,j="Préparation de la scène…",L=null,I=!1,q=!0,W=!0,oe="",J="",Se="",Ne=!0,Pe=null,se=!1,Xe="Une démo à part. Elle ne change pas la scène.",ge="",Te="Le ventilateur est à l’arrêt.",me=!1,Ee="Un ventilateur à l’arrêt",Ae=!0,Le=!0,X="",xe=!1,F=st,Re=!1,ze=!1,Ge=null,Ze=0,Oe;window.__c01_debug=window.__c01_debug??{runStarts:0};function qe(){return u?.id==="porte"&&l===null}function yt(){return u!==null&&$!==null&&ee(u,$)}function Je(){const o=yt(),d=qe(),h=u?.id??"pont",v=_[0]??null,C=(u?.commands??[]).map(S=>({id:S.id,label:S.label,code:S.code??"",icon:S.icon??"",pressed:v===S.id,executing:s&&v===S.id,disabled:s||o||d})),R=v===null?"Place une commande ici.":u?.commands.find(S=>S.id===v)?.code??"";return{ready:B,chipText:`Niveau ${k.level} · ${k.xp} XP`,sceneStep:G,activityTitle:Z,instruction:e.instruction,sceneTitle:ke,sceneDescription:x,sceneRinging:w,sceneBusy:s,currentSceneId:h,porteUnlocked:Ie(k,de,"pont"),guideStep:s||o?3:_.length>0?2:1,guidePrepare:d?"Garde ta prévision":u?.id==="porte"?"Prévision gardée · Choisis ta commande":"Choisis ta commande",commands:C,paletteHidden:d,choiceInstruction:d?"D’abord, garde ta prévision. Les commandes apparaîtront ensuite.":"Choisis un seul bloc.",programContent:R,clearDisabled:s||o||_.length===0,runDisabled:!B||s||o||d,runLabel:s?"En cours…":"▶ Lancer",feedback:j,predictionHidden:q,predictionFormHidden:I,predictionQuestion:u?.prediction?.question??"",predictionOptions:u?.prediction?.options??[],predictionSelected:L,predictionConfirmDisabled:L===null,resultHidden:W,resultTitle:oe,resultText:J,evidenceText:Se,nextButtonHidden:Ne,earned:Pe,helpOpen:se,helpIntro:Xe,helpDisabled:!B||s,helpFeedback:ge,demoFeedback:Te,demoRunning:me,demoLabel:Ee,obstacleHelpHidden:Ae,directHelpHidden:Le,storageStatus:X,eraseConfirm:xe,popup:F,popupOpen:Re,popupFocusNextStep:ze,focus:Ge}}function y(){Oe=Je();for(const o of i)o()}Oe=Je();function Y(o){Ze+=1,Ge={selector:o,seq:Ze}}function be(){T=!1,X="Sauvegarde indisponible. Tu peux jouer, mais tes progrès peuvent être perdus en quittant."}function $t(){T&&(br(k,Q)||be())}function le(){if(!T||u===null)return;xr({version:1,sceneId:u.id,runNumber:g,statistics:f,trainingProof:H,lastCompletion:z})?X="Gardé sur cet appareil.":be()}function wt(o){const d=t.pont;if(d===void 0||o?.sceneId!=="pont"||o.success!==!0)return null;const h=[...f.pont.attempts].reverse().find(C=>C.success&&C.command===d.openCommand);if(h===void 0)return null;const v=nt(d,rt(d),[h.command]);return v.verdict.success?{sceneId:"pont",success:v.verdict.success,criteriaValidated:[...v.verdict.criteriaValidated],attempts:re(f.pont.attempts),aidsUsed:[...f.pont.aids],verdictSource:"engine_replay_of_saved_success"}:null}function re(o){return JSON.parse(JSON.stringify(o))}function jt(){const o=Object.fromEntries(e.scenes.map(h=>[h.id,h.commands.map(v=>v.id)])),d=gr(o);if(d.kind==="unavailable"){be();return}if(d.kind==="corrupt"){X="La sauvegarde du jeu n’est pas lisible. La scène repart du début.";return}d.kind!=="empty"&&(f=d.value.statistics,g=d.value.runNumber,H=wt(d.value.trainingProof),z=d.value.lastCompletion,N=!0)}function Mt(){const o=mr();if(o.kind==="unavailable"){be();return}if(o.kind==="corrupt"){X="La progression n’est pas lisible. Le compteur repart à zéro.";return}o.kind!=="empty"&&(Q=o.value.extra,k=sr(o.value.progression))}function He(){if(E===null)return;clearTimeout(E.timer);const{resolve:o}=E;E=null,o()}function Qe(o){return r.matches||o===0?Promise.resolve():new Promise(d=>{E={timer:window.setTimeout(()=>{E=null,d()},o),resolve:d}})}function Ct(){const o=p;if(o===null)return Promise.resolve();const d=o.getBoundingClientRect(),h=window.innerHeight||document.documentElement.clientHeight||0,v=Math.max(0,d.top),C=Math.min(h,d.bottom);return Math.max(0,C-v)/(d.height||1)>=.6?Promise.resolve():(o.scrollIntoView({block:"center",inline:"nearest",behavior:r.matches?"instant":"smooth"}),Qe(300))}function ve(o,d){const{level:h,filled:v,target:C,reached:R}=ir(d);F={...F,gainText:A!==null&&A.delta===0?"XP déjà gagnés":`+${o} XP`,totalText:`${d} XP`,levelText:`Niveau ${h}`,progressValue:v,progressText:R?`${C} sur ${C} XP : palier atteint, niveau ${h}`:`${v} sur ${C} XP vers le niveau ${h+1}`,nextText:R?`Palier rempli ! Niveau ${h} atteint.`:`Encore ${C-v} XP pour le niveau ${h+1}`}}function ae(){cancelAnimationFrame(P),P=0,A!==null&&(ve(A.delta,A.total),F={...F,rewardHidden:!A.reward},y())}function _e(o=!0){cancelAnimationFrame(P),P=0,A!==null&&(ve(A.delta,A.total),F={...F,rewardHidden:!A.reward}),Re=!1,F={...F,hasGain:!1,isReplay:!1},A=null,o&&!W&&Y("#result-title"),y()}function Ye(){return u?.id==="pont"&&t.porte!==void 0}function St(o){Pe={xpText:o.delta>0?`+${o.delta} XP · Niveau ${k.level}`:null,reward:o.reward}}function Nt(o){_e(!1),A=o;const d=Ye();if(F={...st,title:d?"Bravo !":"Aventure réussie !",finaleHidden:d,nextStepHidden:!d,closePrimary:!d,rewardHidden:!0,replayHidden:o.delta!==0,nextHidden:o.delta===0,hasGain:o.delta>0,isReplay:o.delta===0,announcement:(d?"Bravo ! ":"Bravo, tu as terminé les deux exercices ! ")+`${o.delta?`Tu gagnes ${o.delta} XP.`:"XP déjà gagnés."} Total : ${o.total} XP. Niveau ${Ce(o.total)}.`},ze=d,St(o),ve(o.delta===0?0:1,o.previous),Re=!0,y(),r.matches||o.delta===0){ae();return}const h=performance.now(),v=C=>{if(A===null)return;const R=C-h,S=Math.max(1,Math.round(o.delta*Math.min(1,R/400))),$e=Math.max(0,Math.min(1,(R-400)/550)),er=o.previous+Math.round(o.delta*$e);ve(S,er),y(),R>=1150?ae():P=requestAnimationFrame(v)};P=requestAnimationFrame(v)}function Pt(o,d){try{const h=window;typeof h.WONDRA_TRACK=="function"&&h.WONDRA_TRACK(o,d)}catch{}}function Tt(o){const d=or(k,de,o);return Pt("c01_scene_reussie",{scene:o,xp_delta:d.delta,nouvelle_reussite:d.fresh===!0}),d.fresh&&(k=d.progression,$t()),{previous:d.previous,total:d.total,delta:d.delta,reward:d.reward!==null}}function Et(){M=0,se=!1,Ae=!0,Le=!0,ge="",Te="Le ventilateur est à l’arrêt.",me=!1,Ee="Un ventilateur à l’arrêt",Xe=u?.id==="porte"?"Tu peux revoir la démo. À toi de trouver pour la porte !":"Une démo à part. Elle ne change pas la scène."}function ye(o){x=o.description,w=o.ringing}function ce(o,d={}){const h=t[o];if(h===void 0)return;c+=1,He(),_e(!1),s=!1,u=h,$=rt(h),_=[],l=null,b=!1,g+=1,G=o==="pont"?"Scène 1 sur 2":"Scène 2 sur 2",Z=o==="pont"?e.title:h.title,document.title=`WONDRA — ${Z}`,ke=h.title,W=!0,xe=!1,Pe=null,a!==null&&ye(a.mount(h,$)),q=!(o==="porte"),I=!1,L=null,Et(),j=o==="porte"?"Garde ta prévision. Puis essaie une commande.":"Regarde le pont replié. Quelle commande peut aider Roka ?",d.persist!==!1&&le(),d.focus===!0&&Y(o==="porte"?"#prediction-title":"#palette button"),y()}function At(){s||!Ye()||u===null||$===null||!ee(u,$)||!Ie(k,de,"pont")||ce("porte",{focus:!0})}function Ke(o,d){o.push(d),o.length>200&&o.shift()}function et(o){return o==="porte"?f.porte:f.pont}function Be(o){if(u===null)return;const d=et(u.id).aids;d.includes(o)||d.push(o),le()}function Lt(){if(u===null||$===null)return null;const o=f.porte.predictions[0]??null,d=o?.value??null,h=f.porte.attempts[0]??null,v=je(u,$),C=[...new Set([...H?.success===!0?H.criteriaValidated:[],...v.criteriaValidated])];return l==="opening"&&C.push("prediction_correct"),{sceneId:u.id,criteriaValidated:C,training:re(H),transfer:{sceneId:"porte",success:v.success,criteriaValidated:[...v.criteriaValidated],prediction:l,predictionCorrect:l==="opening",predictionProtocol:ue,firstRecordedPrediction:d,firstRecordedPredictionProtocol:o?.protocol??"legacy_unknown",firstRecordedCommand:h===null?null:h.command,attempts:re(f.porte.attempts),predictions:re(f.porte.predictions),observation:v.success?"automatic_crossing_after_one_command":null,responseHintProvided:!1},aidsUsed:{pont:[...f.pont.aids],porte:[...f.porte.aids]},transferOnFirstRecordedAttempt:o?.protocol===ue&&d==="opening"&&h!==null&&h.predictionProtocol===ue&&h.prediction==="opening"&&h.run===o.run&&h.command===u.openCommand&&h.success&&v.success&&f.porte.attempts.length===1}}function Rt(o){try{const d=window.WondraProgression;if(typeof d?.onActivityCompleted=="function"){const h=d.onActivityCompleted({activity:de,evidence:re(o)});h!==null&&typeof h?.then=="function"&&Promise.resolve(h).catch(()=>{})}}catch{}}function Ot(){if(u===null||$===null)return;W=!1,J=u.text.success;let o=null;if(u.id==="pont"){const h=je(u,$);H={sceneId:"pont",success:h.success,criteriaValidated:[...h.criteriaValidated],attempts:re(f.pont.attempts),aidsUsed:[...f.pont.aids],verdictSource:"engine_verdict_of_reached_state"},oe="Roka a rejoint Ola !",Se="Une commande, une action. Étape suivante : la porte.",Ne=!1}else{oe="Le passage est réussi !",Ne=!0;const h=u.prediction?.options.find(v=>v.id===l);Se=l==="opening"?"Tu avais prévu un chemin jusqu’à l’autre côté. Le passage est devenu libre et Roka a rejoint Ola.":`Ta prévision : « ${h?.label??""} » Tu as observé un passage devenu libre, puis Roka a rejoint Ola.`,!b&&H?.success===!0&&(b=!0,z=Lt(),o=z)}const d=Tt(u.id);le(),Nt(d),o!==null&&Rt(o)}function qt(o){return u===null?null:{opened:u.text.opened,crossed:u.text.crossing,completed:u.text.success,rang:u.text.ring,lit:u.text.light}[o]??null}async function Ht(){if(u===null||$===null||s||qe()||ee(u,$))return;const o=nt(u,$,_);if(o.reason==="empty"){j="Choisis un bloc avant de lancer.",Y("#palette button"),y();return}if(o.reason!=="executed"){j="Choisis un des trois blocs pour essayer.",y();return}u.id==="pont"&&(H=null),s=!0;const d=++c;if(y(),await Ct(),d!==c)return;const h=window.__c01_debug;h!==void 0&&(h.runStarts+=1);const v=g,C=_[0]??"",R=u;y();try{for(const S of o.steps){if(d!==c)return;$=S.state,a!==null&&ye(a.update(S.state,S.event));const $e=qt(S.event);if($e!==null&&(j=$e),y(),await Qe(yr[S.event]??0),d!==c)return}if(Ke(et(R.id).attempts,{run:v,command:C,prediction:l,predictionProtocol:R.id==="porte"?ue:null,success:o.verdict.success}),o.verdict.success){if(await Qe($r),d!==c)return;Ot()}else le(),j=`${C==="sonner"?R.text.ring:R.text.light} Essaie une autre commande.`}finally{d===c&&(s=!1,y())}}function Qt(o){if(u===null||$===null||s||qe()||ee(u,$))return;const d=u.commands.find(h=>h.id===o);d!==void 0&&(_=[d.id],j=`${d.label}. Maintenant, appuie sur « Lancer ».`,y())}function _t(){u===null||$===null||s||ee(u,$)||(_=[],j="Le programme est vide. Choisis un bloc.",y())}function Bt(o){L=o,y()}function It(){s||l!==null||u?.id!=="porte"||L!==null&&(l=L,Ke(f.porte.predictions,{run:g,value:l,protocol:ue}),I=!0,q=!0,j="Ta prévision est gardée. Choisis une commande.",le(),Y("#palette button"),y())}function Ft(){s||(se=!se,se&&Y("#demo-button"),y())}function Vt(){s||(Be("demo"),M=Math.max(M,1),me=!1,y(),me=!0,Ee="Le ventilateur tourne après la commande",Te="tourner_ventilateur() fait tourner le ventilateur. Une commande, une action.",u?.id==="pont"&&(Ae=!1),y())}function Dt(){s||u?.id!=="pont"||M<1||(Be("obstacle"),M=2,a!==null&&ye(a.highlightObstacle()),ge=u.text.highlight??"",Le=!1,y())}function Ut(){s||u?.id!=="pont"||M<2||(Be("direct"),M=3,ge=u.text.direct??"",y())}function Wt(){xe=!0,Y("#erase-yes"),y()}function Xt(){xe=!1,Y("#erase-button"),y()}function zt(){const o=vr();T=o,f=ot(),k=tt(),Q={},H=null,z=null,g=0,ce("pont",{focus:!0,persist:!1}),X=o?"Tout est effacé. Niveau 1 · 0 XP. On repart du début.":"Le jeu repart à zéro ici. Le navigateur n’a pas pu effacer toutes les sauvegardes.",y()}function Gt(o){s||o==="porte"&&!Ie(k,de,"pont")||ce(o)}function Zt(){u!==null&&ce(u.id,{focus:!0})}function Jt(o){o.matches&&(He(),ae())}typeof r.addEventListener=="function"&&r.addEventListener("change",Jt);function Yt(){He(),ae()}function Kt(o){if(p=o,a=dr(o),m){u!==null&&$!==null&&ye(a.mount(u,$)),y();return}m=!0,jt(),Mt(),ce("pont",{persist:!1}),B=!0,N&&X===""&&(X="Sauvegarde retrouvée. La scène repart au début ; tes progrès sont gardés."),y()}return{subscribe(o){return i.add(o),()=>{i.delete(o)}},getSnapshot:()=>Oe,attach:Kt,stop:Yt,selectScene:Gt,selectCommand:Qt,clearProgram:_t,run:Ht,restart:Zt,goToNextExercise:At,selectPrediction:Bt,confirmPrediction:It,toggleHelp:Ft,playDemo:Vt,showObstacleHelp:Dt,showDirectHelp:Ut,askErase:Wt,cancelErase:Xt,confirmErase:zt,closePopup:_e,finishPopup:ae}}const jr=1,Mr="C01",Cr="fr",Sr="Le pont de Roka",Nr="Aide Roka à rejoindre Ola.",Pr=[{id:"pont",kind:"bridge",title:"Le canal",openCommand:"ouvrir_pont",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:310,y:204,width:140},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"ouvrir_pont",label:"Ouvrir le pont",icon:"bridge",code:"ouvrir_pont()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"},{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"}],text:{closed:"Obstacle : le pont est replié. Roka ne peut pas passer.",opened:"Le pont se déplie. Le passage est ouvert.",crossing:"Le pont est ouvert. Roka traverse tout seul.",success:"La commande a déplié le pont. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. Le pont reste replié.",light:"La balise est allumée. Le pont reste replié.",highlight:"Regarde le pont debout : il bloque le passage.",direct:"Choisis « Ouvrir le pont », puis « Lancer ». Le pont se déplie. Roka traverse tout seul."}},{id:"porte",kind:"door",title:"La porte du jardin",openCommand:"ouvrir_porte",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:364,y:204,width:40},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"},{id:"ouvrir_porte",label:"Ouvrir la porte",icon:"🚪",code:"ouvrir_porte()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"}],prediction:{question:"Pour que Roka rejoigne Ola, quel résultat faut-il obtenir ?",options:[{id:"bell",label:"Ola vient chercher Roka."},{id:"beacon",label:"Roka reste au même endroit."},{id:"opening",label:"Un chemin se crée jusqu’à l’autre côté."}]},text:{closed:"Obstacle : la porte est fermée. Roka ne peut pas passer.",opened:"La porte s’ouvre. Le passage est libre.",crossing:"La porte est ouverte. Roka traverse tout seul.",success:"La commande a ouvert la porte. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. La porte reste fermée.",light:"La balise est allumée. La porte reste fermée."}}],Tr={version:jr,activity:Mr,locale:Cr,title:Sr,instruction:Nr,scenes:Pr},Er={C01:Tr};class V extends Error{constructor(t){super(t),this.name="ContentError"}}function ne(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function D(e,t,r){const i=e[t];if(typeof i!="string"||i.length===0)throw new V(`${r} : le champ « ${t} » doit être une chaîne non vide.`);return i}function Ar(e,t){if(!ne(e))throw new V(`${t} : commande invalide.`);const r={id:D(e,"id",t),label:D(e,"label",t)};return typeof e.icon=="string"&&(r.icon=e.icon),typeof e.code=="string"&&(r.code=e.code),r}function Lr(e,t){if(!ne(e))throw new V(`${t} : exercice invalide.`);const r=D(e,"id",t),i=`${t} → « ${r} »`,a=e.commands;if(!Array.isArray(a)||a.length===0)throw new V(`${i} : au moins une commande est requise.`);const p=a.map(k=>Ar(k,i)),m=D(e,"openCommand",i);if(!p.some(k=>k.id===m))throw new V(`${i} : la commande d’ouverture « ${m} » ne figure pas dans les commandes.`);const f={id:r,kind:D(e,"kind",i),title:D(e,"title",i),openCommand:m,commands:p};return ne(e.positions)&&(f.positions=e.positions),ne(e.text)&&(f.text=e.text),ne(e.prediction)&&(f.prediction=e.prediction),f}function Rr(e){if(!ne(e))throw new V("Niveau : la racine doit être un objet.");const t=D(e,"activity","Niveau"),r=`Niveau « ${t} »`;if(!Number.isSafeInteger(e.version)||e.version<1)throw new V(`${r} : le champ « version » doit être un entier ≥ 1.`);const i=e.scenes;if(!Array.isArray(i)||i.length===0)throw new V(`${r} : au moins un exercice est requis.`);const a=i.map(m=>Lr(m,r));if(new Set(a.map(m=>m.id)).size!==a.length)throw new V(`${r} : deux exercices portent le même identifiant.`);return{version:e.version,activity:t,locale:D(e,"locale",r),title:D(e,"title",r),instruction:D(e,"instruction",r),scenes:a}}function Or(e){const t=Er[e];if(t===void 0)throw new V(`Niveau inconnu : « ${e} ».`);return Rr(t)}const qr=["closed","opened","crossing","success","ring","light"],Hr=["highlight","direct"];function Qr(e){const t=e.text??{},r={};for(const i of qr){const a=t[i];if(typeof a!="string"||a.length===0)throw new TypeError(`Texte manquant : ${e.id}.${i}`);r[i]=a}for(const i of Hr){const a=t[i];typeof a=="string"&&(r[i]=a)}return r}function _r(e){if(e.kind!=="bridge"&&e.kind!=="door")throw new TypeError(`Type de scène invalide : ${e.id}`);const t={id:e.id,kind:e.kind,title:e.title,openCommand:e.openCommand,positions:mt(e),commands:e.commands,text:Qr(e)};return e.prediction!==void 0?{...t,prediction:e.prediction}:t}function Br(){const e=Or("C01");if(e.scenes.length!==2||!["pont","porte"].every(t=>e.scenes.filter(r=>r.id===t).length===1))throw new TypeError("Scènes invalides.");return{version:e.version,activity:e.activity,locale:e.locale,title:e.title,instruction:e.instruction,scenes:e.scenes.map(_r)}}function Ir(){try{return wr(Br())}catch{return null}}function Fr(){const e=O.useRef(null);e.current??={controller:Ir()};const t=e.current.controller,r=O.useCallback(k=>t===null?()=>{}:t.subscribe(k),[t]),i=O.useCallback(()=>t===null?null:t.getSnapshot(),[t]),a=O.useSyncExternalStore(r,i),p=O.useCallback(k=>{k!==null&&t!==null&&t.attach(k)},[t]);O.useEffect(()=>{window.WondraCharacters=Ve},[]),O.useEffect(()=>{const k=document.title;return()=>{document.title=k}},[]),O.useEffect(()=>{if(t===null)return;const k=()=>{t.stop()};return window.addEventListener("pagehide",k),()=>{window.removeEventListener("pagehide",k),k()}},[t]);const m=O.useRef(0),f=a?.focus??null;return O.useEffect(()=>{if(f===null||f.seq===m.current)return;m.current=f.seq;const k=document.querySelector(f.selector);k!==null&&(k.focus({preventScroll:!0}),k.scrollIntoView({block:"center",inline:"nearest",behavior:"instant"}))},[f]),{controller:t,snapshot:a,sceneRef:p}}function fe(){return n.jsxs("svg",{className:"crystal-icon",viewBox:"0 0 32 40","aria-hidden":"true",focusable:"false",children:[n.jsx("path",{d:"M16 2 27 11 29 25 16 38 3 25 5 11Z",fill:"#c9bcf0",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),n.jsx("path",{d:"M16 2 10 15 16 38 22 15Z",fill:"#eee7ff"}),n.jsx("path",{d:"M3 25 10 15 16 38M29 25 22 15 16 38M5 11 10 15 22 15 27 11M16 2 22 15",fill:"none",stroke:"#8067aa",strokeWidth:"1.3",strokeLinejoin:"round"}),n.jsx("path",{d:"m12 10 3-4",fill:"none",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})}function vt(){return n.jsxs("svg",{className:"reward-icon",viewBox:"0 0 40 40","aria-hidden":"true",focusable:"false",children:[n.jsx("path",{d:"m24 25 10 10",fill:"none",stroke:"#594565",strokeWidth:"8",strokeLinecap:"round"}),n.jsx("path",{d:"m25 26 8 8",fill:"none",stroke:"#edc28e",strokeWidth:"4",strokeLinecap:"round"}),n.jsx("circle",{cx:"16",cy:"16",r:"12",fill:"#edc28e",stroke:"#594565",strokeWidth:"2"}),n.jsx("circle",{cx:"16",cy:"16",r:"8.5",fill:"#dceff3",stroke:"#8067aa",strokeWidth:"1.5"}),n.jsx("path",{d:"M11 16a5 5 0 0 1 5-5",fill:"none",stroke:"white",strokeWidth:"2.5",strokeLinecap:"round"})]})}function Vr(){return n.jsxs("svg",{viewBox:"0 0 32 32","aria-hidden":"true",focusable:"false",children:[n.jsx("path",{d:"M2 27Q6 24 10 27T18 27T26 27T30 27",fill:"none",stroke:"#74afb9",strokeWidth:"2"}),n.jsx("path",{d:"M3 20Q16 7 29 20L29 24Q16 13 3 24Z",fill:"#edc28e",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),n.jsx("path",{d:"M3 20V12M29 20V12M3 14Q16 1 29 14M10 13V8M22 13V8",fill:"none",stroke:"#8a5e46",strokeWidth:"2",strokeLinecap:"round"})]})}function Dr({snapshot:e,controller:t}){return n.jsx("div",{id:"palette",className:"palette",role:"group","aria-label":"Les trois commandes",hidden:e.paletteHidden,children:e.commands.map(r=>n.jsxs("button",{type:"button",className:r.executing?"command executing":"command","data-command":r.id,"aria-pressed":r.pressed,"aria-label":r.label,disabled:r.disabled,onClick:()=>t.selectCommand(r.id),children:[n.jsx("span",{className:"icon","aria-hidden":"true",children:r.icon==="bridge"?n.jsx(Vr,{}):r.icon}),n.jsxs("span",{children:[n.jsx("strong",{children:r.label}),n.jsx("code",{children:r.code})]}),n.jsx("span",{className:"check","aria-hidden":"true",children:"✓"})]},r.id))})}function Ur({snapshot:e,controller:t}){return n.jsxs("section",{id:"prediction-panel",className:"prediction-panel",hidden:e.predictionHidden,"aria-labelledby":"prediction-title",children:[n.jsx("h2",{id:"prediction-title",tabIndex:-1,children:"D’abord, à ton avis…"}),n.jsxs("form",{id:"prediction-form",hidden:e.predictionFormHidden,onSubmit:r=>{r.preventDefault(),t.confirmPrediction()},children:[n.jsxs("fieldset",{children:[n.jsx("legend",{id:"prediction-question",children:e.predictionQuestion}),n.jsx("div",{id:"prediction-options",children:e.predictionOptions.map(r=>n.jsxs("label",{className:"prediction-option",children:[n.jsx("input",{type:"radio",name:"prediction",value:r.id,required:!0,checked:e.predictionSelected===r.id,onChange:()=>t.selectPrediction(r.id)}),n.jsx("span",{children:r.label})]},r.id))})]}),n.jsx("button",{id:"prediction-confirm",type:"submit",disabled:e.predictionConfirmDisabled,children:"Garder ma prévision"})]}),n.jsx("p",{id:"prediction-summary",hidden:!0})]})}function Wr({snapshot:e,controller:t}){return n.jsxs("section",{className:"control-panel","aria-labelledby":"program-title",children:[n.jsx(Ur,{snapshot:e,controller:t}),n.jsx("h2",{id:"program-title",children:"Mon programme"}),n.jsx("p",{id:"choice-instruction",children:e.choiceInstruction}),n.jsx(Dr,{snapshot:e,controller:t}),n.jsxs("div",{className:"program-slot",children:[n.jsx("span",{className:"slot-number","aria-hidden":"true",children:"1"}),n.jsx("p",{id:"program-content",children:e.programContent}),n.jsx("button",{id:"clear-button",type:"button",disabled:e.clearDisabled,"aria-label":"Vider le programme",onClick:()=>t.clearProgram(),children:"Vider"})]}),n.jsx("p",{className:"microcopy",children:"Un seul bloc. Blocs WONDRA, pas du Python."}),n.jsxs("div",{className:"actions",children:[n.jsx("button",{id:"run-button",className:"primary",type:"button",disabled:e.runDisabled,onClick:()=>{t.run()},children:e.runLabel}),n.jsx("button",{id:"restart-button",type:"button",disabled:!e.ready,onClick:()=>t.restart(),children:"↺ Recommencer"})]}),n.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:e.feedback})]})}function Xr({snapshot:e,controller:t}){const r=O.useRef(null);function i(){const a=r.current;a!==null&&(a.classList.remove("running"),a.getBoundingClientRect(),a.classList.add("running")),t.playDemo()}return n.jsxs("section",{className:"help-section","aria-labelledby":"help-title",children:[n.jsxs("div",{className:"section-heading",children:[n.jsx("h2",{id:"help-title",children:"Un coup de main ?"}),n.jsx("button",{id:"help-button",type:"button","aria-expanded":e.helpOpen,"aria-controls":"help-panel",disabled:e.helpDisabled,onClick:()=>t.toggleHelp(),children:e.helpOpen?"Fermer l’aide":"Ouvrir l’aide"})]}),n.jsxs("div",{id:"help-panel",className:"help-panel",hidden:!e.helpOpen,children:[n.jsx("p",{id:"help-intro",children:e.helpIntro}),n.jsxs("div",{className:"demo",children:[n.jsxs("svg",{id:"demo-fan",ref:r,className:e.demoRunning?"running":"",viewBox:"0 0 120 110",width:"120",height:"110",role:"img","aria-label":e.demoLabel,children:[n.jsx("path",{d:"M60 62V95M38 99H82",fill:"none",stroke:"#221b4e",strokeWidth:"7",strokeLinecap:"round"}),n.jsx("circle",{cx:"60",cy:"44",r:"36",fill:"#f0ecfa",stroke:"#221b4e",strokeWidth:"4"}),n.jsx("g",{className:"fan-blades",children:n.jsx("path",{d:`M60 44C39 40 38 15 52 16C65 17 65 31 60 44
                       M60 44C73 26 96 34 88 47C81 57 68 51 60 44
                       M60 44C68 65 50 81 42 69C35 58 47 48 60 44`,fill:"#7ba7f0",stroke:"#221b4e",strokeWidth:"2"})}),n.jsx("circle",{cx:"60",cy:"44",r:"6",fill:"#221b4e"})]}),n.jsxs("div",{children:[n.jsx("p",{children:n.jsx("code",{children:"tourner_ventilateur()"})}),n.jsx("button",{id:"demo-button",type:"button",disabled:e.helpDisabled,onClick:i,children:"▶ Jouer la démo"}),n.jsx("p",{id:"demo-feedback",role:"status",children:e.demoFeedback})]})]}),n.jsxs("div",{className:"actions",children:[n.jsx("button",{id:"obstacle-help-button",type:"button",hidden:e.obstacleHelpHidden,disabled:e.helpDisabled,onClick:()=>t.showObstacleHelp(),children:"Voir l’obstacle"}),n.jsx("button",{id:"direct-help-button",type:"button",hidden:e.directHelpHidden,disabled:e.helpDisabled,onClick:()=>t.showDirectHelp(),children:"Explique-moi"})]}),n.jsx("p",{id:"help-feedback",role:"status",children:e.helpFeedback})]})]})}function zr({snapshot:e,controller:t,onExit:r}){return n.jsxs("footer",{className:"page-footer",children:[n.jsx("p",{children:"Ton Carnet garde tes XP et tes outils. Rien ne se dépense."}),n.jsx("p",{id:"storage-status",role:"status",children:e.storageStatus}),n.jsx("button",{id:"erase-button",type:"button",disabled:!e.ready,onClick:()=>t.askErase(),children:"Effacer la sauvegarde"}),n.jsxs("div",{id:"erase-confirmation",className:"erase-confirmation",hidden:!e.eraseConfirm,children:[n.jsx("p",{children:"Effacer les essais, les XP et les outils gardés sur cet appareil ?"}),n.jsx("button",{id:"erase-yes",type:"button",onClick:()=>t.confirmErase(),children:"Oui, tout effacer"}),n.jsx("button",{id:"erase-no",type:"button",onClick:()=>t.cancelErase(),children:"Non, garder"})]}),r===void 0?null:n.jsx("button",{id:"exit-button",type:"button",onClick:r,children:"← Revenir à l’accueil"})]})}function Gr({snapshot:e}){const{earned:t}=e;return t===null?n.jsx("p",{id:"earned-summary",className:"earned-summary"}):n.jsxs("p",{id:"earned-summary",className:"earned-summary",children:[t.xpText===null?"Bravo ! Les XP de cette scène sont déjà gagnés.":n.jsxs("span",{className:"earned-item",children:[n.jsx(fe,{}),n.jsx("span",{children:t.xpText})]}),t.reward?n.jsxs("span",{className:"earned-item",children:[n.jsx(vt,{}),n.jsx("span",{children:"Tu as gagné : la Loupe du créateur"})]}):null]})}function Zr({snapshot:e,controller:t}){return n.jsxs("section",{id:"result-panel",className:"result-panel",hidden:e.resultHidden,"aria-labelledby":"result-title",children:[n.jsx("p",{className:"eyebrow",children:"✓ Passage réussi"}),n.jsx("h2",{id:"result-title",tabIndex:-1,children:e.resultTitle}),n.jsx("p",{id:"result-text",children:e.resultText}),n.jsx("p",{id:"evidence-text",children:e.evidenceText}),n.jsx(Gr,{snapshot:e}),n.jsx("button",{id:"next-button",className:"primary",type:"button",hidden:e.nextButtonHidden,onClick:()=>t.goToNextExercise(),children:"Étape suivante : la porte →"})]})}function Jr({snapshot:e,controller:t}){const{currentSceneId:r,porteUnlocked:i}=e;return n.jsxs("div",{id:"exercise-switch",className:"exercise-switch",role:"group","aria-label":"Choisir l’exercice",children:[n.jsx("button",{id:"ex-pont",type:"button",className:r==="pont"?"active":"","aria-current":r==="pont"?"true":void 0,onClick:()=>t.selectScene("pont"),children:"1 · Le pont"}),n.jsx("button",{id:"ex-porte",type:"button",className:r==="porte"?"active":"","aria-current":r==="porte"?"true":void 0,disabled:!i,title:i?"":"Réussis d'abord le pont.","aria-label":i?void 0:"Réussis d'abord le pont.",onClick:()=>t.selectScene("porte"),children:"2 · La porte"})]})}function Yr({snapshot:e,controller:t,sceneRef:r}){return n.jsxs("section",{className:"scene-panel","aria-labelledby":"scene-title",children:[n.jsxs("div",{className:"scene-heading",children:[n.jsx("h2",{id:"scene-title",children:e.sceneTitle}),n.jsx("span",{className:"scene-tag",children:"Une commande → une action"})]}),n.jsx(Jr,{snapshot:e,controller:t}),n.jsx("div",{id:"scene",className:e.sceneRinging?"scene ringing":"scene","aria-busy":e.sceneBusy,ref:r}),n.jsx("p",{id:"scene-description",className:"scene-description",children:e.sceneDescription})]})}function Kr({snapshot:e,controller:t}){const r=O.useRef(null),{popup:i,popupOpen:a,popupFocusNextStep:p}=e;O.useEffect(()=>{const f=r.current;f!==null&&(a&&!f.open?(f.showModal(),document.getElementById(p?"xp-next-step":"xp-close")?.focus()):!a&&f.open&&f.close())},[a,p]);const m=[i.hasGain?"has-gain":"",i.isReplay?"is-replay":""].filter(f=>f!=="").join(" ");return n.jsxs("dialog",{id:"xp-popup",ref:r,className:m,"aria-labelledby":"xp-title","aria-describedby":"xp-announcement",onCancel:f=>{f.preventDefault(),t.closePopup()},children:[n.jsx("div",{className:"popup-emblem","aria-hidden":"true",children:"✦"}),n.jsx("h2",{id:"xp-title",children:i.title}),n.jsx("p",{id:"xp-finale",className:"popup-finale",hidden:i.finaleHidden,children:"Bravo, tu as terminé les deux exercices !"}),n.jsx("p",{id:"xp-announcement",className:"sr-only",children:i.announcement}),n.jsxs("div",{className:"xp-numbers","aria-hidden":"true",children:[n.jsxs("p",{id:"xp-gain",children:[n.jsx(fe,{}),n.jsx("span",{id:"xp-gain-text",children:i.gainText})]}),n.jsxs("p",{className:"xp-total-line",children:["Total :",n.jsxs("strong",{id:"xp-total",children:[n.jsx(fe,{}),n.jsx("span",{id:"xp-total-text",children:i.totalText})]})]}),n.jsx("p",{id:"popup-level",children:i.levelText})]}),n.jsx("label",{className:"sr-only",htmlFor:"xp-progress",children:"Progression du palier de niveau"}),n.jsxs("div",{className:"xp-progress-row",children:[n.jsx(fe,{}),n.jsx("progress",{id:"xp-progress",max:pe,value:i.progressValue,"aria-valuetext":i.progressText})]}),n.jsx("p",{id:"xp-next",hidden:i.nextHidden,children:i.nextText}),n.jsx("p",{id:"xp-replay",hidden:i.replayHidden,children:"Ces XP sont déjà dans ton Carnet."}),n.jsxs("p",{id:"reward-toast",className:"reward-toast",role:"status","aria-atomic":"true",hidden:i.rewardHidden,children:[n.jsx(vt,{}),n.jsx("span",{children:"Tu as gagné : la Loupe du créateur"})]}),n.jsxs("div",{className:"popup-actions",children:[n.jsx("button",{id:"xp-next-step",className:"primary",type:"button",hidden:i.nextStepHidden,onClick:()=>t.goToNextExercise(),children:"Étape suivante : la porte →"}),n.jsx("button",{id:"xp-close",type:"button",className:i.closePrimary?"primary":"",onClick:()=>t.closePopup(),children:"Voir mon résultat"})]})]})}function Fe({step:e,current:t,children:r}){return n.jsxs("li",{"data-guide-step":e,"aria-current":e===t?"step":void 0,children:[n.jsx("b",{children:e})," ",r]})}function tn({onExit:e}){const{controller:t,snapshot:r,sceneRef:i}=Fr();return t===null||r===null?n.jsx("main",{children:n.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:"La scène ne peut pas être chargée. Ses données doivent être vérifiées."})}):n.jsxs("div",{className:"c01-page",children:[n.jsxs("header",{className:"page-header",children:[n.jsxs("p",{className:"brand",children:["WONDRA",n.jsx("span",{children:"CREATE · Mon premier programme"})]}),n.jsxs("p",{id:"level-chip",className:"level-chip",children:[n.jsx(fe,{}),n.jsx("span",{id:"level-chip-text",children:r.chipText})]})]}),n.jsxs("main",{children:[n.jsxs("header",{className:"activity-header",children:[n.jsx("p",{id:"scene-step",className:"eyebrow",children:r.sceneStep}),n.jsx("h1",{id:"activity-title",children:r.activityTitle}),n.jsx("p",{id:"instruction",className:"instruction",children:r.instruction}),n.jsx("p",{className:"mission-note",children:"Une commande agit. Si le passage est libre, Roka traverse tout seul."})]}),n.jsxs("ol",{className:"guide","aria-label":"Les trois temps de ton programme",children:[n.jsx(Fe,{step:1,current:r.guideStep,children:n.jsx("span",{id:"guide-prepare",children:r.guidePrepare})}),n.jsx(Fe,{step:2,current:r.guideStep,children:"Lance"}),n.jsx(Fe,{step:3,current:r.guideStep,children:"Regarde ce qui se passe"})]}),n.jsxs("div",{className:"game-layout",children:[n.jsx(Yr,{snapshot:r,controller:t,sceneRef:i}),n.jsx(Zr,{snapshot:r,controller:t}),n.jsx(Wr,{snapshot:r,controller:t})]}),n.jsx(Xr,{snapshot:r,controller:t}),n.jsx(zr,{snapshot:r,controller:t,onExit:e})]}),n.jsx(Kr,{snapshot:r,controller:t})]})}export{tn as default};
