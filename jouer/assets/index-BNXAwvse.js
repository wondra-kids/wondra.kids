import{W as Ve,h as Ee,e as Ze,n as _t,p as Vt,r as At,v as qt,a as It,l as Qe,b as Ut,c as E,j as t,H as tt,X as Dt,C as Bt}from"./index-W31mRKTW.js";import{e as Xt,r as Wt,a as Ft,w as Gt,b as ze,c as Zt,u as zt,d as Yt}from"./useBlink-WG0uI6s8.js";function Jt(e,n){return e==="unknown_command"||e==="step_failed"?"failure":e==="already_complete"||n?"success":"no-effect"}function Kt(e,n,i){const l=[];let d=n;const k=v=>({outcome:Jt(v,e.isComplete(d)),reason:v,steps:l,finalState:d});if(i.length===0)return k("empty");if(e.isComplete(d))return k("already_complete");for(const v of i){const h=e.commands[v];if(h===void 0)return k("unknown_command");for(const m of h){try{d=m.apply(d)}catch{return k("step_failed")}l.push({index:l.length,event:m.event,commandId:v,state:d})}}return k("executed")}function Ye(e){return{sceneId:e.id,obstacleOpen:!1,beaconOn:!1,bellCount:0,olaWaved:!1,roka:{...e.positions.roka},phase:"ready",lastCommand:null}}function K(e,n){return n.sceneId===e.id&&n.obstacleOpen&&n.roka.x===e.positions.goal.x&&n.roka.y===e.positions.goal.y}function xe(e,n){const i=K(e,n),l=[];return n.obstacleOpen&&l.push(e.kind==="bridge"?"bridge_opened":"door_opened"),i&&l.push(e.kind==="bridge"?"bridge_crossed":"transfer_success"),{success:i,criteriaValidated:l}}function J(e,n,i){return{event:n,apply:l=>({...l,lastCommand:e,...i(l)})}}function en(e){const n={},i=d=>e.commands.some(k=>k.id===d),l=e.openCommand;return i(l)&&(n[l]=[J(l,"opened",()=>({phase:"opening",obstacleOpen:!0})),J(l,"crossed",()=>({phase:"crossing",roka:{...e.positions.goal}})),J(l,"completed",()=>({phase:"complete"}))]),i("sonner")&&(n.sonner=[J("sonner","rang",d=>({phase:"reacting",bellCount:d.bellCount+1,olaWaved:!0})),J("sonner","settled",()=>({phase:"ready"}))]),i("allumer")&&(n.allumer=[J("allumer","lit",()=>({phase:"reacting",beaconOn:!0})),J("allumer","settled",()=>({phase:"ready"}))]),{commands:n,isComplete:d=>K(e,d)}}function Je(e,n,i){if(n.sceneId!==e.id)throw new Error("La scène et l’état ne correspondent pas.");const l=k=>({reason:k,steps:[],finalState:n,verdict:xe(e,n)});if(!Array.isArray(i)||i.length>1)return l("invalid_program");const d=Kt(en(e),n,i);return{reason:d.reason,steps:d.steps,finalState:d.finalState,verdict:xe(e,d.finalState)}}const Ke=e=>String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]??n);function ke(e,n,i,l){if(typeof e!="number"||!Number.isFinite(e)||e<i||e>l)throw new TypeError(`Coordonnée invalide : ${n}`);return e}function be(e,n){const i=e??{};return{x:ke(i.x,`${n}.x`,0,760),y:ke(i.y,`${n}.y`,0,340)}}function nt(e){if(e===null||typeof e!="object"||!["bridge","door"].includes(e.kind))throw new TypeError("Type de scène invalide.");const n=e.positions??{},i=v=>be(n[v],`positions.${v}`),l=i("obstacle"),d=ke((n.obstacle??{}).width,"positions.obstacle.width",14,300),k={x:l.x,y:l.y,width:d};if(k.x+k.width>760)throw new TypeError("Obstacle hors de la scène.");return e.kind==="door"&&ke(k.y,"positions.obstacle.y (porte)",114,277),{roka:i("roka"),goal:i("goal"),ola:i("ola"),obstacle:k,beacon:i("beacon"),bell:i("bell")}}function tn(e){let n,i,l,d=!1;function k({x:s,y:o,width:a}){const u=s+a,b=s+a/2,C=b+38,R=Math.min(24,a*.32);function w(g,j=0){return[[C+g*(R+j*.25),82],[C+g*(R+j*.3),106],[b+10+g*(a*.27+j*.45),121],[b+8+g*(a*.32+j*.55),145],[b+g*(a*.41+j*.7),164],[b+g*(a/2+6+j),o-27],[b+g*(a/2+6+j),o],[b+g*(a/2+6+j),o+29],[b-4+g*(a/2+12+j*1.1),266],[b-4+g*(a/2+17+j*1.15),286],[b-4+g*(a/2+20+j*1.2),310],[b+g*(a/2+26+j*1.3),329],[b+g*(a/2+28+j*1.3),350]]}function O(g,j="M"){return`${j}${g[0].join(" ")}
        C${g.slice(1).map(H=>H.join(" ")).join(" ")}`}function _(g,j){return`${O(w(g,j))}
        ${O(w(g).reverse(),"L")}Z`}function X(g,j,H){const q=w(g),N=j*3,L=1-H,[Z,re]=[0,1].map(B=>L*L*L*q[N][B]+3*L*L*H*q[N+1][B]+3*L*H*H*q[N+2][B]+H*H*H*q[N+3][B]);return[Z,re]}const V=O(w(-1)),P=O(w(1).reverse()),W=`${V}
      ${O(w(1).reverse(),"L")}
      Q${C} 76 ${C-R} 82Z`,de=[[-1,0,.68,.36],[1,0,.86,.44],[-1,1,.22,.6],[1,1,.08,.54],[-1,2,.73,.85],[1,2,.64,.8],[-1,3,.5,1.08],[1,3,.76,1.18]].map(([g,j,H,q],N)=>{const[L,Z]=X(g,j,H);return`
        <g transform="translate(${L+g*(5+q*4)} ${Z})
                      scale(${q})">
          <path d="M0 1Q-1 -6 -5 -10
                   M0 1Q2 -5 2 -12
                   M0 1Q4 -3 8 -5"
                fill="none" stroke="#739574" stroke-width="1.7"
                stroke-linecap="round"/>
          <path d="M-1 0Q-1 -4 -3 -6"
                fill="none" stroke="#c5dcbf" stroke-width="1.2"
                stroke-linecap="round"/>
          ${N%2===0?`
            <ellipse cx="${g*7}" cy="5" rx="5" ry="2"
                     fill="#221b4e" opacity=".08"/>
            <path d="M${g*7-4} 4
                     Q${g*7-3} -1 ${g*7+1} 1
                     Q${g*7+5} 1 ${g*7+4} 4
                     Q${g*7} 6 ${g*7-4} 4Z"
                  fill="#d4d5b8" stroke="#91a189" stroke-width=".9"/>
            <path d="M${g*7-2} 2h3"
                  stroke="#fffbf4" stroke-width=".9"
                  stroke-linecap="round" opacity=".65"/>`:""}
        </g>`}).join("");return`
      <defs>
        <clipPath id="canal-water-clip" clipPathUnits="userSpaceOnUse">
          <path d="${W}"/>
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
          <path d="${_(-1,10)} ${_(1,10)}"
                fill="#9caf92" opacity=".78"/>
          <path d="${_(-1,4.5)} ${_(1,4.5)}"
                fill="#d4d5b8"/>

          <path d="${W}" fill="url(#water-pattern)"/>
          <path d="${W}" fill="url(#canal-light)"/>

          <g clip-path="url(#canal-water-clip)"
             fill="none" stroke-linecap="round">
            <!-- Ombre progressive sous les rives, sans bord supérieur tracé. -->
            <path d="${V} ${P}"
                  stroke="#221b4e" stroke-width="13" opacity=".035"/>
            <path d="${V} ${P}"
                  stroke="#221b4e" stroke-width="7" opacity=".055"/>
            <path d="${V} ${P}"
                  stroke="#466f70" stroke-width="2.5" opacity=".16"/>

            <!-- Rides distinctes : longueur, amplitude et épaisseur en perspective. -->
            <g transform="translate(${C-8} 118) scale(.40)">
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
            <path d="M${b+a*.3} 133
                     Q${b+a*.31} 139 ${b+a*.32} 144"
                  stroke="#fffbf4" stroke-width="1" opacity=".38"/>
            <path d="M${s+14} 158Q${s+8} 169 ${s+6} 178"
                  stroke="#fffbf4" stroke-width="1.4" opacity=".32"/>
            <path d="M${u+2} 272
                     C${u+5} 283 ${u+11} 297 ${u+12} 306"
                  stroke="#fffbf4" stroke-width="2" opacity=".38"/>
          </g>

          <path d="${V} ${P}" fill="none"
                stroke="#658f89" stroke-width="1.2" opacity=".65"/>

          ${de}
        </g>
      </g>

      <!-- Avancées herbeuses raccordées aux rives : appuis fixes du pont. -->
      <path d="M${s-24} ${o-28}
               Q${s-9} ${o-35} ${s+4} ${o-29}
               Q${s+10} ${o-19} ${s+8} ${o-3}
               Q${s+11} ${o+17} ${s+3} ${o+29}
               Q${s-10} ${o+34} ${s-24} ${o+27}Z
               M${u+24} ${o-28}
               Q${u+9} ${o-34} ${u-4} ${o-29}
               Q${u-10} ${o-17} ${u-8} ${o+1}
               Q${u-11} ${o+18} ${u-3} ${o+29}
               Q${u+10} ${o+34} ${u+24} ${o+27}Z"
            fill="url(#ground)"/>
      <path d="M${s+4} ${o-28}
               Q${s+10} ${o-16} ${s+8} ${o-3}
               Q${s+11} ${o+17} ${s+3} ${o+28}
               M${u-4} ${o-28}
               Q${u-10} ${o-17} ${u-8} ${o+1}
               Q${u-11} ${o+18} ${u-3} ${o+28}"
            fill="none" stroke="#d4d5b8" stroke-width="4"
            stroke-linecap="round"/>
      <path d="M${s-12} ${o+29}l-3 -6m3 6l4 -5
               M${u+13} ${o-27}l-2 -6m2 6l5 -4"
            fill="none" stroke="#739574" stroke-width="1.5"
            stroke-linecap="round"/>

      <ellipse cx="${b}" cy="${o+29}" rx="${a*.49}" ry="9"
               fill="#221b4e" opacity=".09"
               clip-path="url(#canal-water-clip)"/>
      <g fill="#c8d2bb" stroke="#91a189" stroke-width="1.3">
        <rect x="${s-5}" y="${o-23}" width="13" height="46" rx="4"/>
        <rect x="${u-8}" y="${o-23}" width="13" height="46" rx="4"/>
      </g>

      <g class="bridge-deck"
         style="transform-origin:${s}px ${o}px;transform:rotate(-90deg)">
        <rect x="${s}" y="${o-21}" width="${a}" height="42" rx="6"
              fill="url(#wood-pattern)" stroke="#594565" stroke-width="3"/>
        <path d="M${s+5} ${o-25}H${s+a-5}
                 M${s+5} ${o+25}H${s+a-5}"
              stroke="#8a5e46" stroke-width="7" stroke-linecap="round"/>
        <path d="M${s+5} ${o-27}H${s+a-5}"
              stroke="#ffe5aa" stroke-width="2" stroke-linecap="round"/>
        <circle cx="${s+a-9}" cy="${o}" r="3" fill="#594565"/>
      </g>
      <circle cx="${s}" cy="${o}" r="9" fill="#fff1c9"
              stroke="#594565" stroke-width="3"/>
      <rect class="obstacle-highlight" x="${s-30}" y="${o-a-12}"
            width="${a+55}" height="${a+55}" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function v({x:s,y:o,width:a}){function u(C,R){return`
        <g transform="translate(${s} ${C}) scale(${a/40} ${(R-C)/100})">
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
        </g>`}const b=Array.from({length:5},(C,R)=>{const w=R*a/5,O=w+a*.15,_=-48-R%2*2;return`
        <path d="M${w} -4V${_+4}
                 Q${(w+O)/2} ${_-3} ${O} ${_+4}
                 V-4Z"
              fill="#f0bd83" stroke="#594565" stroke-width="1.5"
              stroke-linejoin="round"/>
        <path d="M${w+a*.06} ${_+10}V-19"
              stroke="#ffe4b8" stroke-width="1.5" stroke-linecap="round"/>`}).join("");return`
      ${u(67,o-42)}
      <ellipse cx="${s+2}" cy="${o-38}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>
      <ellipse cx="${s+a+2}" cy="${o+46}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>

      <!-- Projection oblique : les lattes et l'axe des gonds restent verticaux. -->
      <g class="door-leaf"
         style="transform-origin:${s}px ${o-42}px;transform:matrix(1,0,0,1,0,0)">
        <g transform="matrix(1 ${84/a} 0 1 ${s} ${o-42})">
          ${b}
          <path d="M1 -35H${a-2}M1 -12H${a-2}
                   M2 -13L${a-3} -34"
                fill="none" stroke="#8a5e46" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 -37H${a-3}"
                stroke="#ffe4b8" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="${a-5}" cy="-25" r="3"
                  fill="#fff5cf" stroke="#594565" stroke-width="1.5"/>
        </g>
      </g>

      ${u(o+44,322)}
      <rect x="${s-5}" y="${o-98}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <rect x="${s+a-5}" y="${o-14}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <path d="M${s-2} ${o-89}V${o-48}
               M${s+a-2} ${o-5}V${o+36}"
            stroke="#ffe4b8" stroke-width="2" stroke-linecap="round"/>
      <path d="M${s-5} ${o-77}H${s+5}
               M${s-5} ${o-54}H${s+5}"
            stroke="#594565" stroke-width="3" stroke-linecap="round"/>
      <path d="M${s-9} ${o-37}l-4 -6m4 6l5 -5
               M${s+a+7} ${o+47}l-3 -7m3 7l6 -4"
            fill="none" stroke="#739574" stroke-width="2" stroke-linecap="round"/>
      <rect class="obstacle-highlight" x="${s-21}" y="${o-108}"
            width="${a+42}" height="175" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function h(s,o,a){if(!["roka","ola"].includes(s))throw new TypeError("Acteur inconnu.");const u=be({x:o,y:a},`actor.${s}`);return`
      <g class="actor-${s}" style="transform:translate(${u.x}px,${u.y}px)">
        <ellipse cx="1" cy="7" rx="34" ry="9" fill="#221b4e" opacity=".12"/>
        <g transform="scale(1.08)">
          <g class="character h-${s} idle" aria-hidden="true">
            ${Ve[s]()}
          </g>
        </g>
        <g transform="translate(0 32)">
          <rect x="-31" y="-15" width="62" height="24" rx="12" fill="#fffaf0" opacity=".95"/>
          <text class="world-label" y="3">${Ke(Ve.names[s])}</text>
        </g>
      </g>`}function m(s,o,a){const u=i.querySelector(s);u!==null&&u.setAttribute(o,a)}function ee(s,o){const a=i.querySelector(s);a!==null&&(a.textContent=o)}function A(s,o){const a=nt(s),u=be(o.roka,"state.roka");n={...s,positions:a},l=o,d=!1,e.innerHTML=`
      <svg viewBox="0 0 760 340" role="img" aria-labelledby="world-title world-description"
           xmlns="http://www.w3.org/2000/svg">
        <title id="world-title">${Ke(n.title)}</title>
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

        ${n.kind==="bridge"?k(a.obstacle):v(a.obstacle)}

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

        <g transform="translate(${a.beacon.x} ${a.beacon.y})">
          <ellipse cy="43" rx="23" ry="6" fill="#221b4e" opacity=".1"/>
          <path d="M0 0V40M-14 41H14" stroke="#65556f" stroke-width="5" stroke-linecap="round"/>
          <g class="beacon-rays" visibility="hidden" stroke="#8a6223" stroke-width="3">
            <path d="M0 -40V-31M-31 -25L-23 -20M31 -25L23 -20M-34 0H-27M34 0H27"/>
          </g>
          <rect class="beacon-light" x="-17" y="-24" width="34" height="32" rx="9"
                fill="#ded8e9" stroke="#65556f" stroke-width="3"/>
          <path d="M-22 -26H22" stroke="#65556f" stroke-width="5" stroke-linecap="round"/>
        </g>
        <g transform="translate(${a.bell.x} ${a.bell.y})">
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

        ${h("roka",u.x,u.y)}
        ${h("ola",a.ola.x,a.ola.y)}
        <g class="ola-response" visibility="hidden" transform="translate(${a.ola.x+28} ${a.ola.y-89})">
          <rect x="0" y="-18" width="87" height="30" rx="14" fill="#fffaf0" stroke="#847797" stroke-width="2"/>
          <text x="43" y="3" text-anchor="middle" fill="#221b4e" font-size="15" font-family="system-ui">Coucou !</text>
        </g>
        <g transform="translate(380 28)">
          <rect x="-103" y="-17" width="206" height="33" rx="16" fill="#fffaf0" stroke="#847797" stroke-width="1.5"/>
          <text class="world-label obstacle-label" y="5"></text>
        </g>
      </svg>`;const b=e.querySelector("svg");if(b===null)throw new TypeError("La scène n’a pas pu être rendue.");return i=b,$(o,"initial")}function G(s){let o;return s.phase==="complete"?o=n.text.success:s.phase==="crossing"?o=n.text.crossing:s.obstacleOpen?o=n.text.opened:o=n.text.closed,s.beaconOn&&(o+=" Balise allumée, avec des rayons."),s.olaWaved&&(o+=" Ola a répondu à la cloche."),o}function p(s,o){const a=i.querySelector(`.h-${s}`);if(a!==null)for(const u of["idle","walk","think","win","sulk"])a.classList.toggle(u,u===o)}function $(s,o){const a=be(s.roka,"state.roka");l=s;const u=i.querySelector(".actor-roka");u!==null&&(u.style.transform=`translate(${a.x}px,${a.y}px)`);const b=i.querySelector(".bridge-deck"),C=i.querySelector(".door-leaf");b!==null&&(b.style.transform=s.obstacleOpen?"rotate(0deg)":"rotate(-90deg)"),C!==null&&(C.style.transform=s.obstacleOpen?`matrix(1,${-84/n.positions.obstacle.width},0,1,0,0)`:"matrix(1,0,0,1,0,0)");const R=s.phase==="complete"?"win":s.phase==="crossing"?"walk":s.phase==="ready"&&s.lastCommand!==null?"think":"idle";p("roka",R),p("ola",s.phase==="complete"?"win":"idle"),m(".beacon-light","fill",s.beaconOn?"#ffb627":"#ded8e9"),m(".beacon-rays","visibility",s.beaconOn?"visible":"hidden"),m(".bell-marks","visibility",s.bellCount>0?"visible":"hidden"),m(".ola-response","visibility",s.olaWaved&&s.phase!=="complete"?"visible":"hidden"),m(".obstacle-highlight","visibility",s.obstacleOpen?"hidden":"visible"),m(".obstacle-highlight","stroke-width",d?"5":"3"),ee(".obstacle-label",s.obstacleOpen?"✓ Passage libre":n.kind==="bridge"?"! Pont replié":"! Porte fermée");const w=G(s);return ee("#world-description",w),{description:w,ringing:o==="rang"}}function Q(){return d=!0,$(l,"highlight")}return Object.freeze({mount:A,update:$,highlightObstacle:Q})}const le="C01",ae="effects-v2.1",nn={opened:500,crossed:750,completed:0,rang:1e3,lit:450,settled:0},rn=900,et={voyage:null,title:"Bravo !",finaleHidden:!0,announcement:"",gainText:"0 XP",totalText:"0 XP",levelText:"Niveau 1",progressValue:0,progressText:"0 sur 3 XP vers le niveau 2",nextText:"Encore 3 XP pour le niveau 2",nextHidden:!1,replayHidden:!0,rewardHidden:!0,nextStepHidden:!0,closePrimary:!1,hasGain:!1,isReplay:!1,levelUp:!1};function sn(e){const n=Object.fromEntries(e.scenes.map(r=>[r.id,r])),i=window.matchMedia("(prefers-reduced-motion: reduce)"),l=new Set;let d=null,k=null,v=!1,h=ze(),m=Ze(),ee={},A=null,G=null,p=null,$=null,Q=[],s=!1,o=null,a=null,u=!1,b=0,C=0,R=!1,w=0,O=!0,_=!1,X=null,V=0,P=null,W=!1,de="Scène 1 sur 2",g=e.title,j="",H="",q=!1,N="Préparation de la scène…",L=null,Z=!1,re=!0,B=!0,ve="",Ae="",ye="",$e=!0,je=null,ie=!1,qe="Une démo à part. Elle ne change pas la scène.",ue="",we="Le ventilateur est à l’arrêt.",pe=!1,Ce="Un ventilateur à l’arrêt",Me=!0,Pe=!0,F="",fe=!1,I=et,Te=!1,Ie=!1,Ue=null,De=0,Ne;window.__c01_debug=window.__c01_debug??{runStarts:0};function Se(){return p?.id==="porte"&&a===null}function it(){return p!==null&&$!==null&&K(p,$)}function Be(){const r=it(),c=Se(),f=p?.id??"pont",x=Q[0]??null,T=(p?.commands??[]).map(M=>({id:M.id,label:M.label,code:M.code??"",icon:M.icon??"",pressed:x===M.id,executing:u&&x===M.id,disabled:u||r||c})),S=x===null?"Place une commande ici.":p?.commands.find(M=>M.id===x)?.code??"";return{ready:W,chipText:`Niveau ${m.level} · ${m.xp} XP`,progressionXp:m.xp,sceneStep:de,activityTitle:g,instruction:e.instruction,sceneTitle:j,sceneDescription:H,sceneRinging:q,sceneBusy:u,currentSceneId:f,porteUnlocked:Ee(m,le,"pont"),guideStep:u||r?3:Q.length>0?2:1,guidePrepare:c?"Garde ta prévision":p?.id==="porte"?"Prévision gardée · Choisis ta commande":"Choisis ta commande",commands:T,paletteHidden:c,choiceInstruction:c?"D’abord, garde ta prévision. Les commandes apparaîtront ensuite.":"Choisis un seul bloc.",programContent:S,programGuidance:!s&&!c&&!r,clearDisabled:u||r||Q.length===0,runDisabled:!W||u||r||c,runLabel:u?"En cours…":"▶ Lancer",feedback:N,predictionHidden:re,predictionFormHidden:Z,predictionQuestion:p?.prediction?.question??"",predictionOptions:p?.prediction?.options??[],predictionSelected:L,predictionConfirmDisabled:L===null,resultHidden:B,resultTitle:ve,resultText:Ae,evidenceText:ye,nextButtonHidden:$e,earned:je,helpOpen:ie,helpIntro:qe,helpDisabled:!W||u,helpFeedback:ue,demoFeedback:we,demoRunning:pe,demoLabel:Ce,obstacleHelpHidden:Me,directHelpHidden:Pe,storageStatus:F,eraseConfirm:fe,popup:I,popupOpen:Te,popupFocusNextStep:Ie,focus:Ue}}function y(){Ne=Be();for(const r of l)r()}Ne=Be();function z(r){De+=1,Ue={selector:r,seq:De}}function he(){O=!1,F="Sauvegarde indisponible. Tu peux jouer, mais tes progrès peuvent être perdus en quittant."}function st(){O&&(Zt(m,ee)||he())}function Y(){if(!O||p===null)return;Gt({version:1,sceneId:p.id,runNumber:C,statistics:h,trainingProof:A,lastCompletion:G,program:[...Q]})?F="Enregistré.":he()}function ot(r){const c=n.pont;if(c===void 0||r?.sceneId!=="pont"||r.success!==!0)return null;const f=[...h.pont.attempts].reverse().find(T=>T.success&&T.command===c.openCommand);if(f===void 0)return null;const x=Je(c,Ye(c),[f.command]);return x.verdict.success?{sceneId:"pont",success:x.verdict.success,criteriaValidated:[...x.verdict.criteriaValidated],attempts:te(h.pont.attempts),aidsUsed:[...h.pont.aids],verdictSource:"engine_replay_of_saved_success"}:null}function te(r){return JSON.parse(JSON.stringify(r))}function lt(){const r=Object.fromEntries(e.scenes.map(f=>[f.id,f.commands.map(x=>x.id)])),c=Wt(r);if(c.kind==="unavailable"){he();return}if(c.kind==="corrupt"){F="La sauvegarde du jeu n’est pas lisible. La scène repart du début.";return}c.kind!=="empty"&&(h=c.value.statistics,C=c.value.runNumber,A=ot(c.value.trainingProof),G=c.value.lastCompletion,o={sceneId:c.value.sceneId,program:c.value.program??[]},_=!0)}function at(){const r=Ft();if(r.kind==="unavailable"){he();return}if(r.kind==="corrupt"){F="La progression n’est pas lisible. Le compteur repart à zéro.";return}r.kind!=="empty"&&(ee=r.value.extra,m=_t(r.value.progression))}function Le(){if(X===null)return;clearTimeout(X.timer);const{resolve:r}=X;X=null,r()}function Re(r){return i.matches||r===0?Promise.resolve():new Promise(c=>{X={timer:window.setTimeout(()=>{X=null,c()},r),resolve:c}})}function ct(){const r=k;if(r===null)return Promise.resolve();const c=r.getBoundingClientRect(),f=window.innerHeight||document.documentElement.clientHeight||0,x=Math.max(0,c.top),T=Math.min(f,c.bottom);return Math.max(0,T-x)/(c.height||1)>=.6?Promise.resolve():(r.scrollIntoView({block:"center",inline:"nearest",behavior:i.matches?"instant":"smooth"}),Re(300))}function me(r,c,f=c){const{level:x,filled:T,target:S,reached:M}=Vt(c);I={...I,gainText:P!==null&&P.delta===0?"XP déjà gagnés":`+${r} XP`,totalText:`${c} XP`,levelText:`Niveau ${x}`,progressValue:At(f),progressText:M?`${S} sur ${S} XP : palier atteint, niveau ${x}`:`${T} sur ${S} XP vers le niveau ${x+1}`,nextText:M?`Palier rempli ! Niveau ${x} atteint.`:`Encore ${S-T} XP pour le niveau ${x+1}`}}function se(){cancelAnimationFrame(V),V=0,P!==null&&(me(P.delta,P.total),I={...I,rewardHidden:!P.reward},y())}function He(r=!0){cancelAnimationFrame(V),V=0,P!==null&&(me(P.delta,P.total),I={...I,rewardHidden:!P.reward}),Te=!1,I={...I,hasGain:!1,isReplay:!1},P=null,r&&!B&&z("#result-title"),y()}function Xe(){return p?.id==="pont"&&n.porte!==void 0}function dt(r){je={xpText:r.delta>0?`+${r.delta} XP · Niveau ${m.level}`:null,reward:r.reward}}function ut(r){He(!1),P=r;const c=Xe();if(I={...et,voyage:r.voyage,title:c?"Bravo !":"Aventure réussie !",finaleHidden:c,nextStepHidden:!c,closePrimary:!c,rewardHidden:!0,replayHidden:r.delta!==0,nextHidden:r.delta===0,hasGain:r.delta>0,isReplay:r.delta===0,levelUp:r.delta>0&&Qe(r.total)>Qe(r.previous),announcement:(c?"Bravo ! ":"Bravo, tu as terminé les deux exercices ! ")+`${r.delta?`Tu gagnes ${r.delta} XP.`:"XP déjà gagnés."} Total : ${r.total} XP. Niveau ${Qe(r.total)}.`},Ie=c,dt(r),me(r.delta,r.previous),Te=!0,y(),i.matches||r.delta===0){se();return}const f=performance.now(),x=T=>{if(P===null)return;const S=Ut(r.previous,r.delta,T-f);me(r.delta,S.total,S.avance),y(),S.fini?se():V=requestAnimationFrame(x)};V=requestAnimationFrame(x)}function pt(r,c){try{const f=window;typeof f.WONDRA_TRACK=="function"&&f.WONDRA_TRACK(r,c)}catch{}}function ft(r){const c=qt(m.awarded,r==="pont"?"C01:pont":"C01:porte"),f=It(m,le,r);return pt("c01_scene_reussie",{scene:r,xp_delta:f.delta,nouvelle_reussite:f.fresh===!0}),f.fresh&&(m=f.progression,st()),{voyage:c,previous:f.previous,total:f.total,delta:f.delta,reward:f.reward!==null}}function ht(){w=0,ie=!1,Me=!0,Pe=!0,ue="",we="Le ventilateur est à l’arrêt.",pe=!1,Ce="Un ventilateur à l’arrêt",qe=p?.id==="porte"?"Tu peux revoir la démo. À toi de trouver pour la porte !":"Une démo à part. Elle ne change pas la scène."}function ge(r){H=r.description,q=r.ringing}function oe(r,c={}){const f=n[r];if(f===void 0)return;b+=1,Le(),He(!1),u=!1,p=f,$=Ye(f),Q=o?.sceneId===r?[...o.program]:[],o?.sceneId===r&&(o=null),s=Q.length>0,a=null,R=!1,C+=1,de=r==="pont"?"Scène 1 sur 2":"Scène 2 sur 2",g=r==="pont"?e.title:f.title,document.title=`WONDRA — ${g}`,j=f.title,B=!0,fe=!1,je=null,d!==null&&ge(d.mount(f,$)),re=!(r==="porte"),Z=!1,L=null,ht(),N=r==="porte"?"Garde ta prévision. Puis essaie une commande.":"Regarde le pont replié. Quelle commande peut aider Roka ?",c.persist!==!1&&Y(),c.focus===!0&&z(r==="porte"?"#prediction-title":"#palette button"),y()}function mt(){u||!Xe()||p===null||$===null||!K(p,$)||!Ee(m,le,"pont")||oe("porte",{focus:!0})}function We(r,c){r.push(c),r.length>200&&r.shift()}function Fe(r){return r==="porte"?h.porte:h.pont}function Oe(r){if(p===null)return;const c=Fe(p.id).aids;c.includes(r)||c.push(r),Y()}function gt(){if(p===null||$===null)return null;const r=h.porte.predictions[0]??null,c=r?.value??null,f=h.porte.attempts[0]??null,x=xe(p,$),T=[...new Set([...A?.success===!0?A.criteriaValidated:[],...x.criteriaValidated])];return a==="opening"&&T.push("prediction_correct"),{sceneId:p.id,criteriaValidated:T,training:te(A),transfer:{sceneId:"porte",success:x.success,criteriaValidated:[...x.criteriaValidated],prediction:a,predictionCorrect:a==="opening",predictionProtocol:ae,firstRecordedPrediction:c,firstRecordedPredictionProtocol:r?.protocol??"legacy_unknown",firstRecordedCommand:f===null?null:f.command,attempts:te(h.porte.attempts),predictions:te(h.porte.predictions),observation:x.success?"automatic_crossing_after_one_command":null,responseHintProvided:!1},aidsUsed:{pont:[...h.pont.aids],porte:[...h.porte.aids]},transferOnFirstRecordedAttempt:r?.protocol===ae&&c==="opening"&&f!==null&&f.predictionProtocol===ae&&f.prediction==="opening"&&f.run===r.run&&f.command===p.openCommand&&f.success&&x.success&&h.porte.attempts.length===1}}function bt(r){try{const c=window.WondraProgression;if(typeof c?.onActivityCompleted=="function"){const f=c.onActivityCompleted({activity:le,evidence:te(r)});f!==null&&typeof f?.then=="function"&&Promise.resolve(f).catch(()=>{})}}catch{}}function xt(){if(p===null||$===null)return;B=!1,Ae=p.text.success;let r=null;if(p.id==="pont"){const f=xe(p,$);A={sceneId:"pont",success:f.success,criteriaValidated:[...f.criteriaValidated],attempts:te(h.pont.attempts),aidsUsed:[...h.pont.aids],verdictSource:"engine_verdict_of_reached_state"},ve="Roka a rejoint Ola !",ye="Une commande, une action. Étape suivante : la porte.",$e=!1}else{ve="Le passage est réussi !",$e=!0;const f=p.prediction?.options.find(x=>x.id===a);ye=a==="opening"?"Tu avais prévu un chemin jusqu’à l’autre côté. Le passage est devenu libre et Roka a rejoint Ola.":`Ta prévision : « ${f?.label??""} » Tu as observé un passage devenu libre, puis Roka a rejoint Ola.`,!R&&A?.success===!0&&(R=!0,G=gt(),r=G)}const c=ft(p.id);Y(),ut(c),r!==null&&bt(r)}function kt(r){return p===null?null:{opened:p.text.opened,crossed:p.text.crossing,completed:p.text.success,rang:p.text.ring,lit:p.text.light}[r]??null}async function vt(){if(p===null||$===null||u||Se()||K(p,$))return;const r=Je(p,$,Q);if(r.reason==="empty"){N="Choisis un bloc avant de lancer.",z("#palette button"),y();return}if(r.reason!=="executed"){N="Choisis un des trois blocs pour essayer.",y();return}p.id==="pont"&&(A=null),u=!0;const c=++b;if(y(),await ct(),c!==b)return;const f=window.__c01_debug;f!==void 0&&(f.runStarts+=1);const x=C,T=Q[0]??"",S=p;y();try{for(const M of r.steps){if(c!==b)return;$=M.state,d!==null&&ge(d.update(M.state,M.event));const Ge=kt(M.event);if(Ge!==null&&(N=Ge),y(),await Re(nn[M.event]??0),c!==b)return}if(We(Fe(S.id).attempts,{run:x,command:T,prediction:a,predictionProtocol:S.id==="porte"?ae:null,success:r.verdict.success}),r.verdict.success){if(await Re(rn),c!==b)return;xt()}else Y(),N=`${T==="sonner"?S.text.ring:S.text.light} Essaie une autre commande.`}finally{c===b&&(u=!1,y())}}function yt(r){if(p===null||$===null||u||Se()||K(p,$))return;const c=p.commands.find(f=>f.id===r);c!==void 0&&(Q=[c.id],s=!0,Y(),N=`${c.label}. Maintenant, appuie sur « Lancer ».`,y())}function $t(){p===null||$===null||u||K(p,$)||(Q=[],s=!0,Y(),N="Le programme est vide. Choisis un bloc.",y())}function jt(r){L=r,y()}function wt(){u||a!==null||p?.id!=="porte"||L!==null&&(a=L,We(h.porte.predictions,{run:C,value:a,protocol:ae}),Z=!0,re=!0,N="Ta prévision est gardée. Choisis une commande.",Y(),z("#palette button"),y())}function Ct(){u||(ie=!ie,ie&&z("#demo-button"),y())}function Mt(){u||(Oe("demo"),w=Math.max(w,1),pe=!1,y(),pe=!0,Ce="Le ventilateur tourne après la commande",we="tourner_ventilateur() fait tourner le ventilateur. Une commande, une action.",p?.id==="pont"&&(Me=!1),y())}function Pt(){u||p?.id!=="pont"||w<1||(Oe("obstacle"),w=2,d!==null&&ge(d.highlightObstacle()),ue=p.text.highlight??"",Pe=!1,y())}function Tt(){u||p?.id!=="pont"||w<2||(Oe("direct"),w=3,ue=p.text.direct??"",y())}function Nt(){fe=!0,z("#erase-yes"),y()}function St(){fe=!1,z("#erase-button"),y()}function Lt(){const r=Xt();O=r,h=ze(),m=Ze(),ee={},A=null,G=null,C=0,o=null,oe("pont",{focus:!0,persist:!1}),F=r?"Tout est effacé. Niveau 1 · 0 XP. On repart du début.":"Le jeu repart à zéro ici. Le navigateur n’a pas pu effacer toutes les sauvegardes.",y()}function Rt(r){u||r==="porte"&&!Ee(m,le,"pont")||oe(r)}function Ht(){p!==null&&oe(p.id,{focus:!0})}function Ot(r){r.matches&&(Le(),se())}typeof i.addEventListener=="function"&&i.addEventListener("change",Ot);function Et(){Le(),se()}function Qt(r){if(k=r,d=tn(r),v){p!==null&&$!==null&&ge(d.mount(p,$)),y();return}v=!0,lt(),at(),oe("pont",{persist:!1}),W=!0,_&&F===""&&(F="Sauvegarde retrouvée. La scène repart au début ; tes progrès sont gardés."),y()}return{subscribe(r){return l.add(r),()=>{l.delete(r)}},getSnapshot:()=>Ne,attach:Qt,stop:Et,selectScene:Rt,selectCommand:yt,clearProgram:$t,touchProgram:()=>{s=!0,y()},run:vt,restart:Ht,goToNextExercise:mt,selectPrediction:jt,confirmPrediction:wt,toggleHelp:Ct,playDemo:Mt,showObstacleHelp:Pt,showDirectHelp:Tt,askErase:Nt,cancelErase:St,confirmErase:Lt,closePopup:He,finishPopup:se}}const on=1,ln="C01",an="fr",cn="Le pont de Roka",dn="Aide Roka à rejoindre Ola.",un=[{id:"pont",kind:"bridge",title:"Le canal",openCommand:"ouvrir_pont",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:310,y:204,width:140},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"ouvrir_pont",label:"Ouvrir le pont",icon:"bridge",code:"ouvrir_pont()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"},{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"}],text:{closed:"Obstacle : le pont est replié. Roka ne peut pas passer.",opened:"Le pont se déplie. Le passage est ouvert.",crossing:"Le pont est ouvert. Roka traverse tout seul.",success:"La commande a déplié le pont. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. Le pont reste replié.",light:"La balise est allumée. Le pont reste replié.",highlight:"Regarde le pont debout : il bloque le passage.",direct:"Choisis « Ouvrir le pont », puis « Lancer ». Le pont se déplie. Roka traverse tout seul."}},{id:"porte",kind:"door",title:"La porte du jardin",openCommand:"ouvrir_porte",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:364,y:204,width:40},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"},{id:"ouvrir_porte",label:"Ouvrir la porte",icon:"🚪",code:"ouvrir_porte()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"}],prediction:{question:"Pour que Roka rejoigne Ola, quel résultat faut-il obtenir ?",options:[{id:"bell",label:"Ola vient chercher Roka."},{id:"beacon",label:"Roka reste au même endroit."},{id:"opening",label:"Un chemin se crée jusqu’à l’autre côté."}]},text:{closed:"Obstacle : la porte est fermée. Roka ne peut pas passer.",opened:"La porte s’ouvre. Le passage est libre.",crossing:"La porte est ouverte. Roka traverse tout seul.",success:"La commande a ouvert la porte. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. La porte reste fermée.",light:"La balise est allumée. La porte reste fermée."}}],pn={version:on,activity:ln,locale:an,title:cn,instruction:dn,scenes:un},fn={C01:pn};class U extends Error{constructor(n){super(n),this.name="ContentError"}}function ne(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function D(e,n,i){const l=e[n];if(typeof l!="string"||l.length===0)throw new U(`${i} : le champ « ${n} » doit être une chaîne non vide.`);return l}function hn(e,n){if(!ne(e))throw new U(`${n} : commande invalide.`);const i={id:D(e,"id",n),label:D(e,"label",n)};return typeof e.icon=="string"&&(i.icon=e.icon),typeof e.code=="string"&&(i.code=e.code),i}function mn(e,n){if(!ne(e))throw new U(`${n} : exercice invalide.`);const i=D(e,"id",n),l=`${n} → « ${i} »`,d=e.commands;if(!Array.isArray(d)||d.length===0)throw new U(`${l} : au moins une commande est requise.`);const k=d.map(m=>hn(m,l)),v=D(e,"openCommand",l);if(!k.some(m=>m.id===v))throw new U(`${l} : la commande d’ouverture « ${v} » ne figure pas dans les commandes.`);const h={id:i,kind:D(e,"kind",l),title:D(e,"title",l),openCommand:v,commands:k};return ne(e.positions)&&(h.positions=e.positions),ne(e.text)&&(h.text=e.text),ne(e.prediction)&&(h.prediction=e.prediction),h}function gn(e){if(!ne(e))throw new U("Niveau : la racine doit être un objet.");const n=D(e,"activity","Niveau"),i=`Niveau « ${n} »`;if(!Number.isSafeInteger(e.version)||e.version<1)throw new U(`${i} : le champ « version » doit être un entier ≥ 1.`);const l=e.scenes;if(!Array.isArray(l)||l.length===0)throw new U(`${i} : au moins un exercice est requis.`);const d=l.map(v=>mn(v,i));if(new Set(d.map(v=>v.id)).size!==d.length)throw new U(`${i} : deux exercices portent le même identifiant.`);return{version:e.version,activity:n,locale:D(e,"locale",i),title:D(e,"title",i),instruction:D(e,"instruction",i),scenes:d}}function bn(e){const n=fn[e];if(n===void 0)throw new U(`Niveau inconnu : « ${e} ».`);return gn(n)}const xn=["closed","opened","crossing","success","ring","light"],kn=["highlight","direct"];function vn(e){const n=e.text??{},i={};for(const l of xn){const d=n[l];if(typeof d!="string"||d.length===0)throw new TypeError(`Texte manquant : ${e.id}.${l}`);i[l]=d}for(const l of kn){const d=n[l];typeof d=="string"&&(i[l]=d)}return i}function yn(e){if(e.kind!=="bridge"&&e.kind!=="door")throw new TypeError(`Type de scène invalide : ${e.id}`);const n={id:e.id,kind:e.kind,title:e.title,openCommand:e.openCommand,positions:nt(e),commands:e.commands,text:vn(e)};return e.prediction!==void 0?{...n,prediction:e.prediction}:n}function $n(){const e=bn("C01");if(e.scenes.length!==2||!["pont","porte"].every(n=>e.scenes.filter(i=>i.id===n).length===1))throw new TypeError("Scènes invalides.");return{version:e.version,activity:e.activity,locale:e.locale,title:e.title,instruction:e.instruction,scenes:e.scenes.map(yn)}}function jn(){try{return sn($n())}catch{return null}}function wn(){const e=E.useRef(null);e.current??={controller:jn()};const n=e.current.controller,i=E.useCallback(m=>n===null?()=>{}:n.subscribe(m),[n]),l=E.useCallback(()=>n===null?null:n.getSnapshot(),[n]),d=E.useSyncExternalStore(i,l),k=E.useCallback(m=>{m!==null&&n!==null&&n.attach(m)},[n]);E.useEffect(()=>{window.WondraCharacters=Ve},[]),E.useEffect(()=>{const m=document.title;return()=>{document.title=m}},[]),E.useEffect(()=>{if(n===null)return;const m=()=>{n.stop()};return window.addEventListener("pagehide",m),()=>{window.removeEventListener("pagehide",m),m()}},[n]);const v=E.useRef(0),h=d?.focus??null;return E.useEffect(()=>{if(h===null||h.seq===v.current)return;v.current=h.seq;const m=document.querySelector(h.selector);m!==null&&(m.focus({preventScroll:!0}),m.scrollIntoView({block:"center",inline:"nearest",behavior:"instant"}))},[h]),{controller:n,snapshot:d,sceneRef:k}}function ce(){return t.jsxs("svg",{className:"crystal-icon",viewBox:"0 0 32 40","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"M16 2 27 11 29 25 16 38 3 25 5 11Z",fill:"#c9bcf0",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),t.jsx("path",{d:"M16 2 10 15 16 38 22 15Z",fill:"#eee7ff"}),t.jsx("path",{d:"M3 25 10 15 16 38M29 25 22 15 16 38M5 11 10 15 22 15 27 11M16 2 22 15",fill:"none",stroke:"#8067aa",strokeWidth:"1.3",strokeLinejoin:"round"}),t.jsx("path",{d:"m12 10 3-4",fill:"none",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})}function rt(){return t.jsxs("svg",{className:"reward-icon",viewBox:"0 0 40 40","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"m24 25 10 10",fill:"none",stroke:"#594565",strokeWidth:"8",strokeLinecap:"round"}),t.jsx("path",{d:"m25 26 8 8",fill:"none",stroke:"#edc28e",strokeWidth:"4",strokeLinecap:"round"}),t.jsx("circle",{cx:"16",cy:"16",r:"12",fill:"#edc28e",stroke:"#594565",strokeWidth:"2"}),t.jsx("circle",{cx:"16",cy:"16",r:"8.5",fill:"#dceff3",stroke:"#8067aa",strokeWidth:"1.5"}),t.jsx("path",{d:"M11 16a5 5 0 0 1 5-5",fill:"none",stroke:"white",strokeWidth:"2.5",strokeLinecap:"round"})]})}function Cn(){return t.jsxs("svg",{viewBox:"0 0 32 32","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"M2 27Q6 24 10 27T18 27T26 27T30 27",fill:"none",stroke:"#74afb9",strokeWidth:"2"}),t.jsx("path",{d:"M3 20Q16 7 29 20L29 24Q16 13 3 24Z",fill:"#edc28e",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),t.jsx("path",{d:"M3 20V12M29 20V12M3 14Q16 1 29 14M10 13V8M22 13V8",fill:"none",stroke:"#8a5e46",strokeWidth:"2",strokeLinecap:"round"})]})}function Mn({snapshot:e,controller:n}){return t.jsx("div",{id:"palette",className:"palette wondra-guidance","data-guidance":e.programGuidance,onPointerDown:()=>n.touchProgram(),onKeyDown:()=>n.touchProgram(),role:"group","aria-label":"Les trois commandes",hidden:e.paletteHidden,children:e.commands.map(i=>t.jsxs("button",{type:"button",className:i.executing?"command executing":"command","data-command":i.id,"aria-pressed":i.pressed,"aria-label":i.label,disabled:i.disabled,onClick:()=>n.selectCommand(i.id),children:[t.jsx("span",{className:"icon","aria-hidden":"true",children:i.icon==="bridge"?t.jsx(Cn,{}):i.icon}),t.jsxs("span",{children:[t.jsx("strong",{children:i.label}),t.jsx("code",{children:i.code})]}),t.jsx("span",{className:"check","aria-hidden":"true",children:"✓"})]},i.id))})}function Pn({snapshot:e,controller:n}){return t.jsxs("section",{id:"prediction-panel",className:"prediction-panel",hidden:e.predictionHidden,"aria-labelledby":"prediction-title",children:[t.jsx("h2",{id:"prediction-title",tabIndex:-1,children:"D’abord, à ton avis…"}),t.jsxs("form",{id:"prediction-form",hidden:e.predictionFormHidden,onSubmit:i=>{i.preventDefault(),n.confirmPrediction()},children:[t.jsxs("fieldset",{children:[t.jsx("legend",{id:"prediction-question",children:e.predictionQuestion}),t.jsx("div",{id:"prediction-options",children:e.predictionOptions.map(i=>t.jsxs("label",{className:"prediction-option",children:[t.jsx("input",{type:"radio",name:"prediction",value:i.id,required:!0,checked:e.predictionSelected===i.id,onChange:()=>n.selectPrediction(i.id)}),t.jsx("span",{children:i.label})]},i.id))})]}),t.jsx("button",{id:"prediction-confirm",type:"submit",disabled:e.predictionConfirmDisabled,children:"Garder ma prévision"})]}),t.jsx("p",{id:"prediction-summary",hidden:!0})]})}function Tn({snapshot:e,controller:n}){const i=zt(e.programContent);return t.jsxs("section",{className:"control-panel","aria-labelledby":"program-title",children:[t.jsx(Pn,{snapshot:e,controller:n}),t.jsx("h2",{id:"program-title",children:"Mon programme"}),t.jsx("p",{id:"choice-instruction",children:e.choiceInstruction}),t.jsx(Mn,{snapshot:e,controller:n}),t.jsxs("div",{id:"c01-code-window",hidden:e.paletteHidden,children:[t.jsxs("header",{children:[t.jsx("span",{children:"passage.wondra"}),t.jsx("span",{className:"wondra-code-badge",children:"Ta commande"})]}),t.jsxs("div",{className:"program-slot",children:[t.jsx("span",{className:"slot-number","aria-hidden":"true",children:"1"}),t.jsx("code",{id:"program-content",className:"wondra-code-line","data-blink":i.active,"data-executing":e.sceneBusy,children:e.programContent},i.revision),t.jsx("button",{id:"clear-button",type:"button",disabled:e.clearDisabled,"aria-label":"Vider le programme",onClick:()=>n.clearProgram(),children:"Vider"})]})]}),t.jsx("p",{className:"microcopy",children:"Un seul bloc. Blocs WONDRA, pas du Python."}),t.jsxs("div",{className:"actions",children:[t.jsx("button",{id:"run-button",className:"primary",type:"button",disabled:e.runDisabled,onClick:()=>{n.run()},children:e.runLabel}),t.jsx("button",{id:"restart-button",type:"button",disabled:!e.ready,onClick:()=>n.restart(),children:"↺ Recommencer"})]}),t.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:e.feedback})]})}function Nn({snapshot:e,controller:n}){const i=E.useRef(null);function l(){const d=i.current;d!==null&&(d.classList.remove("running"),d.getBoundingClientRect(),d.classList.add("running")),n.playDemo()}return t.jsxs("section",{className:"help-section","aria-labelledby":"help-title",children:[t.jsxs("div",{className:"section-heading",children:[t.jsx("h2",{id:"help-title",children:"Un coup de main ?"}),t.jsx("button",{id:"help-button",type:"button","aria-expanded":e.helpOpen,"aria-controls":"help-panel",disabled:e.helpDisabled,onClick:()=>n.toggleHelp(),children:e.helpOpen?"Fermer l’aide":"Ouvrir l’aide"})]}),t.jsxs("div",{id:"help-panel",className:"help-panel",hidden:!e.helpOpen,children:[t.jsx("p",{id:"help-intro",children:e.helpIntro}),t.jsxs("div",{className:"demo",children:[t.jsxs("svg",{id:"demo-fan",ref:i,className:e.demoRunning?"running":"",viewBox:"0 0 120 110",width:"120",height:"110",role:"img","aria-label":e.demoLabel,children:[t.jsx("path",{d:"M60 62V95M38 99H82",fill:"none",stroke:"#221b4e",strokeWidth:"7",strokeLinecap:"round"}),t.jsx("circle",{cx:"60",cy:"44",r:"36",fill:"#f0ecfa",stroke:"#221b4e",strokeWidth:"4"}),t.jsx("g",{className:"fan-blades",children:t.jsx("path",{d:`M60 44C39 40 38 15 52 16C65 17 65 31 60 44
                       M60 44C73 26 96 34 88 47C81 57 68 51 60 44
                       M60 44C68 65 50 81 42 69C35 58 47 48 60 44`,fill:"#7ba7f0",stroke:"#221b4e",strokeWidth:"2"})}),t.jsx("circle",{cx:"60",cy:"44",r:"6",fill:"#221b4e"})]}),t.jsxs("div",{children:[t.jsx("p",{children:t.jsx("code",{children:"tourner_ventilateur()"})}),t.jsx("button",{id:"demo-button",type:"button",disabled:e.helpDisabled,onClick:l,children:"▶ Jouer la démo"}),t.jsx("p",{id:"demo-feedback",role:"status",children:e.demoFeedback})]})]}),t.jsxs("div",{className:"actions",children:[t.jsx("button",{id:"obstacle-help-button",type:"button",hidden:e.obstacleHelpHidden,disabled:e.helpDisabled,onClick:()=>n.showObstacleHelp(),children:"Voir l’obstacle"}),t.jsx("button",{id:"direct-help-button",type:"button",hidden:e.directHelpHidden,disabled:e.helpDisabled,onClick:()=>n.showDirectHelp(),children:"Explique-moi"})]}),t.jsx("p",{id:"help-feedback",role:"status",children:e.helpFeedback})]})]})}function Sn({snapshot:e,controller:n,onExit:i}){return t.jsxs("footer",{className:"page-footer",children:[t.jsx("p",{children:"Ton Carnet garde tes XP et tes outils. Rien ne se dépense."}),t.jsx("p",{id:"storage-status",role:"status",children:e.storageStatus}),t.jsx("button",{id:"erase-button",type:"button",disabled:!e.ready,onClick:()=>n.askErase(),children:"Effacer la sauvegarde"}),t.jsxs("div",{id:"erase-confirmation",className:"erase-confirmation",hidden:!e.eraseConfirm,children:[t.jsx("p",{children:"Effacer les essais, les XP et les cristaux ? Cette action ne peut pas être annulée."}),t.jsx("button",{id:"erase-yes",type:"button",onClick:()=>n.confirmErase(),children:"Oui, tout effacer"}),t.jsx("button",{id:"erase-no",type:"button",onClick:()=>n.cancelErase(),children:"Non, garder"})]}),i===void 0?null:t.jsx("button",{id:"exit-button",type:"button",onClick:i,children:"← Revenir à l’accueil"})]})}function Ln({snapshot:e}){const{earned:n}=e;return n===null?t.jsx("p",{id:"earned-summary",className:"earned-summary"}):t.jsxs("p",{id:"earned-summary",className:"earned-summary",children:[n.xpText===null?"Bravo ! Les XP de cette scène sont déjà gagnés.":t.jsxs("span",{className:"earned-item",children:[t.jsx(ce,{}),t.jsx("span",{children:n.xpText})]}),n.reward?t.jsxs("span",{className:"earned-item",children:[t.jsx(rt,{}),t.jsx("span",{children:"Tu as gagné : la Loupe du créateur"})]}):null]})}function Rn({snapshot:e,controller:n}){return t.jsxs("section",{id:"result-panel",className:"result-panel",hidden:e.resultHidden,"aria-labelledby":"result-title",children:[t.jsx(tt,{state:"win"}),t.jsx("p",{className:"eyebrow",children:"✓ Passage réussi"}),t.jsx("h2",{id:"result-title",tabIndex:-1,children:e.resultTitle}),t.jsx("p",{id:"result-text",children:e.resultText}),t.jsx("p",{id:"evidence-text",children:e.evidenceText}),t.jsx(Ln,{snapshot:e}),t.jsx("button",{id:"next-button",className:"primary",type:"button",hidden:e.nextButtonHidden,onClick:()=>n.goToNextExercise(),children:"Étape suivante : la porte →"})]})}function Hn({snapshot:e,controller:n}){const{currentSceneId:i,porteUnlocked:l}=e;return t.jsxs("div",{id:"exercise-switch",className:"exercise-switch",role:"group","aria-label":"Choisir l’exercice",children:[t.jsx("button",{id:"ex-pont",type:"button",className:i==="pont"?"active":"","aria-current":i==="pont"?"true":void 0,onClick:()=>n.selectScene("pont"),children:"1 · Le pont"}),t.jsx("button",{id:"ex-porte",type:"button",className:i==="porte"?"active":"","aria-current":i==="porte"?"true":void 0,disabled:!l,title:l?"":"Réussis d'abord le pont.","aria-label":l?void 0:"Réussis d'abord le pont.",onClick:()=>n.selectScene("porte"),children:"2 · La porte"})]})}function On({snapshot:e,controller:n,sceneRef:i}){return t.jsxs("section",{className:"scene-panel","aria-labelledby":"scene-title",children:[t.jsxs("div",{className:"scene-heading",children:[t.jsx("h2",{id:"scene-title",children:e.sceneTitle}),t.jsx("span",{className:"scene-tag",children:"Une commande → une action"})]}),t.jsx(Hn,{snapshot:e,controller:n}),t.jsx("div",{id:"scene",className:e.sceneRinging?"scene ringing":"scene","aria-busy":e.sceneBusy,ref:i}),t.jsx("p",{id:"scene-description",className:"scene-description",children:e.sceneDescription})]})}function En({snapshot:e,controller:n}){const i=E.useRef(null),{popup:l,popupOpen:d,popupFocusNextStep:k}=e;E.useEffect(()=>{const h=i.current;h!==null&&(d&&!h.open?(h.showModal(),document.getElementById(k?"xp-next-step":"xp-close")?.focus()):!d&&h.open&&h.close())},[d,k]);const v=[l.hasGain?"has-gain":"",l.isReplay?"is-replay":""].filter(h=>h!=="").join(" ");return t.jsxs("dialog",{id:"xp-popup",ref:i,className:v,"aria-labelledby":"xp-title","aria-describedby":"xp-announcement",onCancel:h=>{h.preventDefault(),n.closePopup()},children:[t.jsx("div",{className:"popup-emblem","aria-hidden":"true",children:t.jsx(tt,{state:"win"})}),t.jsx("h2",{id:"xp-title",children:l.title}),t.jsx("p",{id:"xp-finale",className:"popup-finale",hidden:l.finaleHidden,children:"Bravo, tu as terminé les deux exercices !"}),t.jsx("p",{id:"xp-announcement",className:"sr-only",children:l.announcement}),t.jsxs("div",{className:"xp-numbers","aria-hidden":"true",children:[t.jsxs("p",{id:"xp-gain","data-etat":l.hasGain?"gain":"repos",children:[t.jsx(ce,{}),t.jsx("span",{id:"xp-gain-text",children:l.gainText})]}),t.jsxs("p",{className:"xp-total-line",children:["Total :",t.jsxs("strong",{id:"xp-total",children:[t.jsx(ce,{}),t.jsx("span",{id:"xp-total-text",children:l.totalText})]})]}),t.jsx("p",{id:"popup-level",children:l.levelText})]}),t.jsx("label",{className:"sr-only",htmlFor:"xp-progress",children:"Progression du palier de niveau"}),t.jsxs("div",{className:"xp-progress-row",children:[t.jsx(ce,{}),t.jsx("progress",{id:"xp-progress",max:Dt,value:l.progressValue,"aria-valuetext":l.progressText})]}),t.jsx("p",{id:"xp-next",className:"[font-variant-numeric:tabular-nums]",hidden:l.nextHidden,children:l.nextText}),t.jsx("p",{id:"xp-replay",hidden:l.replayHidden,children:"Ces XP sont déjà dans ton Carnet."}),t.jsxs("p",{id:"reward-toast",className:"reward-toast",role:"status","aria-atomic":"true",hidden:l.rewardHidden,children:[t.jsx(rt,{}),t.jsx("span",{children:"Tu as gagné : la Loupe du créateur"})]}),l.hasGain&&l.voyage!==null?t.jsx(Bt,{voyage:l.voyage}):null,t.jsxs("div",{className:"popup-actions",children:[t.jsx("button",{id:"xp-next-step",className:"primary",type:"button",hidden:l.nextStepHidden,onClick:()=>n.goToNextExercise(),children:"Étape suivante : la porte →"}),t.jsx("button",{id:"xp-close",type:"button",className:l.closePrimary?"primary":"",onClick:()=>n.closePopup(),children:"Voir mon résultat"})]})]})}function _e({step:e,current:n,children:i}){return t.jsxs("li",{"data-guide-step":e,"aria-current":e===n?"step":void 0,children:[t.jsx("b",{children:e})," ",i]})}function Vn({onExit:e}){const{controller:n,snapshot:i,sceneRef:l}=wn(),d=Yt(i!==null&&i.ready?i.progressionXp:null);return n===null||i===null?t.jsx("main",{children:t.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:"La scène ne peut pas être chargée. Ses données doivent être vérifiées."})}):t.jsxs("div",{className:"c01-page",children:[t.jsxs("header",{className:"page-header",children:[t.jsxs("p",{className:"brand",children:["WONDRA",t.jsx("span",{children:"CREATE · Mon premier programme"})]}),t.jsxs("p",{id:"level-chip",className:"level-chip","data-en-montee":d.enMontee?"true":"false",children:[t.jsx(ce,{}),t.jsx("span",{id:"level-chip-text",children:d.text})]})]}),t.jsxs("main",{children:[t.jsxs("header",{className:"activity-header",children:[t.jsx("p",{id:"scene-step",className:"eyebrow",children:i.sceneStep}),t.jsx("h1",{id:"activity-title",children:i.activityTitle}),t.jsx("p",{id:"instruction",className:"instruction",children:i.instruction}),t.jsx("p",{className:"mission-note",children:"Une commande agit. Si le passage est libre, Roka traverse tout seul."})]}),t.jsxs("ol",{className:"guide","aria-label":"Les trois temps de ton programme",children:[t.jsx(_e,{step:1,current:i.guideStep===1?1:0,children:t.jsx("span",{id:"guide-prepare",children:i.guidePrepare})}),t.jsx(_e,{step:2,current:i.guideStep,children:"Lance"}),t.jsx(_e,{step:3,current:i.guideStep,children:"Regarde ce qui se passe"})]}),t.jsxs("div",{className:"game-layout",children:[t.jsx(On,{snapshot:i,controller:n,sceneRef:l}),t.jsx(Rn,{snapshot:i,controller:n}),t.jsx(Tn,{snapshot:i,controller:n})]}),t.jsx(Nn,{snapshot:i,controller:n}),t.jsx(Sn,{snapshot:i,controller:n,onExit:e})]}),t.jsx(En,{snapshot:i,controller:n})]})}export{Vn as default};
