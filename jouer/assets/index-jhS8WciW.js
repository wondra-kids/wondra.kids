import{r as E,j as t}from"./index-MPr52Py1.js";import{W as _e,h as Ee,e as Ht,a as Xe,r as Et,b as Qt,n as _t,w as Vt,c as Fe,p as At,d as qt,l as Ut,f as Dt,X as It}from"./storage-CPKL7h9D.js";function Wt(e,n){return e==="unknown_command"||e==="step_failed"?"failure":e==="already_complete"||n?"success":"no-effect"}function Bt(e,n,r){const l=[];let d=n;const k=v=>({outcome:Wt(v,e.isComplete(d)),reason:v,steps:l,finalState:d});if(r.length===0)return k("empty");if(e.isComplete(d))return k("already_complete");for(const v of r){const f=e.commands[v];if(f===void 0)return k("unknown_command");for(const m of f){try{d=m.apply(d)}catch{return k("step_failed")}l.push({index:l.length,event:m.event,commandId:v,state:d})}}return k("executed")}function Ge(e){return{sceneId:e.id,obstacleOpen:!1,beaconOn:!1,bellCount:0,olaWaved:!1,roka:{...e.positions.roka},phase:"ready",lastCommand:null}}function J(e,n){return n.sceneId===e.id&&n.obstacleOpen&&n.roka.x===e.positions.goal.x&&n.roka.y===e.positions.goal.y}function ke(e,n){const r=J(e,n),l=[];return n.obstacleOpen&&l.push(e.kind==="bridge"?"bridge_opened":"door_opened"),r&&l.push(e.kind==="bridge"?"bridge_crossed":"transfer_success"),{success:r,criteriaValidated:l}}function Y(e,n,r){return{event:n,apply:l=>({...l,lastCommand:e,...r(l)})}}function Xt(e){const n={},r=d=>e.commands.some(k=>k.id===d),l=e.openCommand;return r(l)&&(n[l]=[Y(l,"opened",()=>({phase:"opening",obstacleOpen:!0})),Y(l,"crossed",()=>({phase:"crossing",roka:{...e.positions.goal}})),Y(l,"completed",()=>({phase:"complete"}))]),r("sonner")&&(n.sonner=[Y("sonner","rang",d=>({phase:"reacting",bellCount:d.bellCount+1,olaWaved:!0})),Y("sonner","settled",()=>({phase:"ready"}))]),r("allumer")&&(n.allumer=[Y("allumer","lit",()=>({phase:"reacting",beaconOn:!0})),Y("allumer","settled",()=>({phase:"ready"}))]),{commands:n,isComplete:d=>J(e,d)}}function Ze(e,n,r){if(n.sceneId!==e.id)throw new Error("La scène et l’état ne correspondent pas.");const l=k=>({reason:k,steps:[],finalState:n,verdict:ke(e,n)});if(!Array.isArray(r)||r.length>1)return l("invalid_program");const d=Bt(Xt(e),n,r);return{reason:d.reason,steps:d.steps,finalState:d.finalState,verdict:ke(e,d.finalState)}}const ze=e=>String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]??n);function ve(e,n,r,l){if(typeof e!="number"||!Number.isFinite(e)||e<r||e>l)throw new TypeError(`Coordonnée invalide : ${n}`);return e}function xe(e,n){const r=e??{};return{x:ve(r.x,`${n}.x`,0,760),y:ve(r.y,`${n}.y`,0,340)}}function Je(e){if(e===null||typeof e!="object"||!["bridge","door"].includes(e.kind))throw new TypeError("Type de scène invalide.");const n=e.positions??{},r=v=>xe(n[v],`positions.${v}`),l=r("obstacle"),d=ve((n.obstacle??{}).width,"positions.obstacle.width",14,300),k={x:l.x,y:l.y,width:d};if(k.x+k.width>760)throw new TypeError("Obstacle hors de la scène.");return e.kind==="door"&&ve(k.y,"positions.obstacle.y (porte)",114,277),{roka:r("roka"),goal:r("goal"),ola:r("ola"),obstacle:k,beacon:r("beacon"),bell:r("bell")}}function Ft(e){let n,r,l,d=!1;function k({x:o,y:s,width:a}){const h=o+a,b=o+a/2,M=b+38,N=Math.min(24,a*.32);function T(g,j=0){return[[M+g*(N+j*.25),82],[M+g*(N+j*.3),106],[b+10+g*(a*.27+j*.45),121],[b+8+g*(a*.32+j*.55),145],[b+g*(a*.41+j*.7),164],[b+g*(a/2+6+j),s-27],[b+g*(a/2+6+j),s],[b+g*(a/2+6+j),s+29],[b-4+g*(a/2+12+j*1.1),266],[b-4+g*(a/2+17+j*1.15),286],[b-4+g*(a/2+20+j*1.2),310],[b+g*(a/2+26+j*1.3),329],[b+g*(a/2+28+j*1.3),350]]}function L(g,j="M"){return`${j}${g[0].join(" ")}
        C${g.slice(1).map(w=>w.join(" ")).join(" ")}`}function S(g,j){return`${L(T(g,j))}
        ${L(T(g).reverse(),"L")}Z`}function R(g,j,w){const O=T(g),q=j*3,Q=1-w,[W,ne]=[0,1].map(Z=>Q*Q*Q*O[q][Z]+3*Q*Q*w*O[q+1][Z]+3*Q*w*w*O[q+2][Z]+w*w*w*O[q+3][Z]);return[W,ne]}const A=L(T(-1)),F=L(T(1).reverse()),G=`${A}
      ${L(T(1).reverse(),"L")}
      Q${M} 76 ${M-N} 82Z`,de=[[-1,0,.68,.36],[1,0,.86,.44],[-1,1,.22,.6],[1,1,.08,.54],[-1,2,.73,.85],[1,2,.64,.8],[-1,3,.5,1.08],[1,3,.76,1.18]].map(([g,j,w,O],q)=>{const[Q,W]=R(g,j,w);return`
        <g transform="translate(${Q+g*(5+O*4)} ${W})
                      scale(${O})">
          <path d="M0 1Q-1 -6 -5 -10
                   M0 1Q2 -5 2 -12
                   M0 1Q4 -3 8 -5"
                fill="none" stroke="#739574" stroke-width="1.7"
                stroke-linecap="round"/>
          <path d="M-1 0Q-1 -4 -3 -6"
                fill="none" stroke="#c5dcbf" stroke-width="1.2"
                stroke-linecap="round"/>
          ${q%2===0?`
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
          <path d="${G}"/>
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
          <path d="${S(-1,10)} ${S(1,10)}"
                fill="#9caf92" opacity=".78"/>
          <path d="${S(-1,4.5)} ${S(1,4.5)}"
                fill="#d4d5b8"/>

          <path d="${G}" fill="url(#water-pattern)"/>
          <path d="${G}" fill="url(#canal-light)"/>

          <g clip-path="url(#canal-water-clip)"
             fill="none" stroke-linecap="round">
            <!-- Ombre progressive sous les rives, sans bord supérieur tracé. -->
            <path d="${A} ${F}"
                  stroke="#221b4e" stroke-width="13" opacity=".035"/>
            <path d="${A} ${F}"
                  stroke="#221b4e" stroke-width="7" opacity=".055"/>
            <path d="${A} ${F}"
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
            <path d="M${b+a*.3} 133
                     Q${b+a*.31} 139 ${b+a*.32} 144"
                  stroke="#fffbf4" stroke-width="1" opacity=".38"/>
            <path d="M${o+14} 158Q${o+8} 169 ${o+6} 178"
                  stroke="#fffbf4" stroke-width="1.4" opacity=".32"/>
            <path d="M${h+2} 272
                     C${h+5} 283 ${h+11} 297 ${h+12} 306"
                  stroke="#fffbf4" stroke-width="2" opacity=".38"/>
          </g>

          <path d="${A} ${F}" fill="none"
                stroke="#658f89" stroke-width="1.2" opacity=".65"/>

          ${de}
        </g>
      </g>

      <!-- Avancées herbeuses raccordées aux rives : appuis fixes du pont. -->
      <path d="M${o-24} ${s-28}
               Q${o-9} ${s-35} ${o+4} ${s-29}
               Q${o+10} ${s-19} ${o+8} ${s-3}
               Q${o+11} ${s+17} ${o+3} ${s+29}
               Q${o-10} ${s+34} ${o-24} ${s+27}Z
               M${h+24} ${s-28}
               Q${h+9} ${s-34} ${h-4} ${s-29}
               Q${h-10} ${s-17} ${h-8} ${s+1}
               Q${h-11} ${s+18} ${h-3} ${s+29}
               Q${h+10} ${s+34} ${h+24} ${s+27}Z"
            fill="url(#ground)"/>
      <path d="M${o+4} ${s-28}
               Q${o+10} ${s-16} ${o+8} ${s-3}
               Q${o+11} ${s+17} ${o+3} ${s+28}
               M${h-4} ${s-28}
               Q${h-10} ${s-17} ${h-8} ${s+1}
               Q${h-11} ${s+18} ${h-3} ${s+28}"
            fill="none" stroke="#d4d5b8" stroke-width="4"
            stroke-linecap="round"/>
      <path d="M${o-12} ${s+29}l-3 -6m3 6l4 -5
               M${h+13} ${s-27}l-2 -6m2 6l5 -4"
            fill="none" stroke="#739574" stroke-width="1.5"
            stroke-linecap="round"/>

      <ellipse cx="${b}" cy="${s+29}" rx="${a*.49}" ry="9"
               fill="#221b4e" opacity=".09"
               clip-path="url(#canal-water-clip)"/>
      <g fill="#c8d2bb" stroke="#91a189" stroke-width="1.3">
        <rect x="${o-5}" y="${s-23}" width="13" height="46" rx="4"/>
        <rect x="${h-8}" y="${s-23}" width="13" height="46" rx="4"/>
      </g>

      <g class="bridge-deck"
         style="transform-origin:${o}px ${s}px;transform:rotate(-90deg)">
        <rect x="${o}" y="${s-21}" width="${a}" height="42" rx="6"
              fill="url(#wood-pattern)" stroke="#594565" stroke-width="3"/>
        <path d="M${o+5} ${s-25}H${o+a-5}
                 M${o+5} ${s+25}H${o+a-5}"
              stroke="#8a5e46" stroke-width="7" stroke-linecap="round"/>
        <path d="M${o+5} ${s-27}H${o+a-5}"
              stroke="#ffe5aa" stroke-width="2" stroke-linecap="round"/>
        <circle cx="${o+a-9}" cy="${s}" r="3" fill="#594565"/>
      </g>
      <circle cx="${o}" cy="${s}" r="9" fill="#fff1c9"
              stroke="#594565" stroke-width="3"/>
      <rect class="obstacle-highlight" x="${o-30}" y="${s-a-12}"
            width="${a+55}" height="${a+55}" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function v({x:o,y:s,width:a}){function h(M,N){return`
        <g transform="translate(${o} ${M}) scale(${a/40} ${(N-M)/100})">
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
        </g>`}const b=Array.from({length:5},(M,N)=>{const T=N*a/5,L=T+a*.15,S=-48-N%2*2;return`
        <path d="M${T} -4V${S+4}
                 Q${(T+L)/2} ${S-3} ${L} ${S+4}
                 V-4Z"
              fill="#f0bd83" stroke="#594565" stroke-width="1.5"
              stroke-linejoin="round"/>
        <path d="M${T+a*.06} ${S+10}V-19"
              stroke="#ffe4b8" stroke-width="1.5" stroke-linecap="round"/>`}).join("");return`
      ${h(67,s-42)}
      <ellipse cx="${o+2}" cy="${s-38}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>
      <ellipse cx="${o+a+2}" cy="${s+46}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>

      <!-- Projection oblique : les lattes et l'axe des gonds restent verticaux. -->
      <g class="door-leaf"
         style="transform-origin:${o}px ${s-42}px;transform:matrix(1,0,0,1,0,0)">
        <g transform="matrix(1 ${84/a} 0 1 ${o} ${s-42})">
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

      ${h(s+44,322)}
      <rect x="${o-5}" y="${s-98}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <rect x="${o+a-5}" y="${s-14}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <path d="M${o-2} ${s-89}V${s-48}
               M${o+a-2} ${s-5}V${s+36}"
            stroke="#ffe4b8" stroke-width="2" stroke-linecap="round"/>
      <path d="M${o-5} ${s-77}H${o+5}
               M${o-5} ${s-54}H${o+5}"
            stroke="#594565" stroke-width="3" stroke-linecap="round"/>
      <path d="M${o-9} ${s-37}l-4 -6m4 6l5 -5
               M${o+a+7} ${s+47}l-3 -7m3 7l6 -4"
            fill="none" stroke="#739574" stroke-width="2" stroke-linecap="round"/>
      <rect class="obstacle-highlight" x="${o-21}" y="${s-108}"
            width="${a+42}" height="175" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function f(o,s,a){if(!["roka","ola"].includes(o))throw new TypeError("Acteur inconnu.");const h=xe({x:s,y:a},`actor.${o}`);return`
      <g class="actor-${o}" style="transform:translate(${h.x}px,${h.y}px)">
        <ellipse cx="1" cy="7" rx="34" ry="9" fill="#221b4e" opacity=".12"/>
        <g transform="scale(1.08)">
          <g class="character h-${o} idle" aria-hidden="true">
            ${_e[o]()}
          </g>
        </g>
        <g transform="translate(0 32)">
          <rect x="-31" y="-15" width="62" height="24" rx="12" fill="#fffaf0" opacity=".95"/>
          <text class="world-label" y="3">${ze(_e.names[o])}</text>
        </g>
      </g>`}function m(o,s,a){const h=r.querySelector(o);h!==null&&h.setAttribute(s,a)}function K(o,s){const a=r.querySelector(o);a!==null&&(a.textContent=s)}function _(o,s){const a=Je(o),h=xe(s.roka,"state.roka");n={...o,positions:a},l=s,d=!1,e.innerHTML=`
      <svg viewBox="0 0 760 340" role="img" aria-labelledby="world-title world-description"
           xmlns="http://www.w3.org/2000/svg">
        <title id="world-title">${ze(n.title)}</title>
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

        ${f("roka",h.x,h.y)}
        ${f("ola",a.ola.x,a.ola.y)}
        <g class="ola-response" visibility="hidden" transform="translate(${a.ola.x+28} ${a.ola.y-89})">
          <rect x="0" y="-18" width="87" height="30" rx="14" fill="#fffaf0" stroke="#847797" stroke-width="2"/>
          <text x="43" y="3" text-anchor="middle" fill="#221b4e" font-size="15" font-family="system-ui">Coucou !</text>
        </g>
        <g transform="translate(380 28)">
          <rect x="-103" y="-17" width="206" height="33" rx="16" fill="#fffaf0" stroke="#847797" stroke-width="1.5"/>
          <text class="world-label obstacle-label" y="5"></text>
        </g>
      </svg>`;const b=e.querySelector("svg");if(b===null)throw new TypeError("La scène n’a pas pu être rendue.");return r=b,y(s,"initial")}function X(o){let s;return o.phase==="complete"?s=n.text.success:o.phase==="crossing"?s=n.text.crossing:o.obstacleOpen?s=n.text.opened:s=n.text.closed,o.beaconOn&&(s+=" Balise allumée, avec des rayons."),o.olaWaved&&(s+=" Ola a répondu à la cloche."),s}function u(o,s){const a=r.querySelector(`.h-${o}`);if(a!==null)for(const h of["idle","walk","think","win","sulk"])a.classList.toggle(h,h===s)}function y(o,s){const a=xe(o.roka,"state.roka");l=o;const h=r.querySelector(".actor-roka");h!==null&&(h.style.transform=`translate(${a.x}px,${a.y}px)`);const b=r.querySelector(".bridge-deck"),M=r.querySelector(".door-leaf");b!==null&&(b.style.transform=o.obstacleOpen?"rotate(0deg)":"rotate(-90deg)"),M!==null&&(M.style.transform=o.obstacleOpen?`matrix(1,${-84/n.positions.obstacle.width},0,1,0,0)`:"matrix(1,0,0,1,0,0)");const N=o.phase==="complete"?"win":o.phase==="crossing"?"walk":o.phase==="ready"&&o.lastCommand!==null?"think":"idle";u("roka",N),u("ola",o.phase==="complete"?"win":"idle"),m(".beacon-light","fill",o.beaconOn?"#ffb627":"#ded8e9"),m(".beacon-rays","visibility",o.beaconOn?"visible":"hidden"),m(".bell-marks","visibility",o.bellCount>0?"visible":"hidden"),m(".ola-response","visibility",o.olaWaved&&o.phase!=="complete"?"visible":"hidden"),m(".obstacle-highlight","visibility",o.obstacleOpen?"hidden":"visible"),m(".obstacle-highlight","stroke-width",d?"5":"3"),K(".obstacle-label",o.obstacleOpen?"✓ Passage libre":n.kind==="bridge"?"! Pont replié":"! Porte fermée");const T=X(o);return K("#world-description",T),{description:T,ringing:s==="rang"}}function V(){return d=!0,y(l,"highlight")}return Object.freeze({mount:_,update:y,highlightObstacle:V})}const le="C01",ae="effects-v2.1",Gt={opened:500,crossed:750,completed:0,rang:1e3,lit:450,settled:0},Zt=900,Ye={title:"Bravo !",finaleHidden:!0,announcement:"",gainText:"0 XP",totalText:"0 XP",levelText:"Niveau 1",progressValue:0,progressText:"0 sur 3 XP vers le niveau 2",nextText:"Encore 3 XP pour le niveau 2",nextHidden:!1,replayHidden:!0,rewardHidden:!0,nextStepHidden:!0,closePrimary:!1,hasGain:!1,isReplay:!1};function zt(e){const n=Object.fromEntries(e.scenes.map(i=>[i.id,i])),r=window.matchMedia("(prefers-reduced-motion: reduce)"),l=new Set;let d=null,k=null,v=!1,f=Fe(),m=Xe(),K={},_=null,X=null,u=null,y=null,V=[],o=null,s=!1,a=0,h=0,b=!1,M=0,N=!0,T=!1,L=null,S=0,R=null,A=!1,F="Scène 1 sur 2",G=e.title,de="",g="",j=!1,w="Préparation de la scène…",O=null,q=!1,Q=!0,W=!0,ne="",Z="",$e="",ye=!0,je=null,re=!1,Ve="Une démo à part. Elle ne change pas la scène.",ue="",we="Le ventilateur est à l’arrêt.",pe=!1,Me="Un ventilateur à l’arrêt",Ce=!0,Pe=!0,B="",fe=!1,U=Ye,Te=!1,Ae=!1,qe=null,Ue=0,Se;window.__c01_debug=window.__c01_debug??{runStarts:0};function Ne(){return u?.id==="porte"&&o===null}function et(){return u!==null&&y!==null&&J(u,y)}function De(){const i=et(),c=Ne(),p=u?.id??"pont",x=V[0]??null,C=(u?.commands??[]).map(P=>({id:P.id,label:P.label,code:P.code??"",icon:P.icon??"",pressed:x===P.id,executing:s&&x===P.id,disabled:s||i||c})),H=x===null?"Place une commande ici.":u?.commands.find(P=>P.id===x)?.code??"";return{ready:A,chipText:`Niveau ${m.level} · ${m.xp} XP`,sceneStep:F,activityTitle:G,instruction:e.instruction,sceneTitle:de,sceneDescription:g,sceneRinging:j,sceneBusy:s,currentSceneId:p,porteUnlocked:Ee(m,le,"pont"),guideStep:s||i?3:V.length>0?2:1,guidePrepare:c?"Garde ta prévision":u?.id==="porte"?"Prévision gardée · Choisis ta commande":"Choisis ta commande",commands:C,paletteHidden:c,choiceInstruction:c?"D’abord, garde ta prévision. Les commandes apparaîtront ensuite.":"Choisis un seul bloc.",programContent:H,clearDisabled:s||i||V.length===0,runDisabled:!A||s||i||c,runLabel:s?"En cours…":"▶ Lancer",feedback:w,predictionHidden:Q,predictionFormHidden:q,predictionQuestion:u?.prediction?.question??"",predictionOptions:u?.prediction?.options??[],predictionSelected:O,predictionConfirmDisabled:O===null,resultHidden:W,resultTitle:ne,resultText:Z,evidenceText:$e,nextButtonHidden:ye,earned:je,helpOpen:re,helpIntro:Ve,helpDisabled:!A||s,helpFeedback:ue,demoFeedback:we,demoRunning:pe,demoLabel:Me,obstacleHelpHidden:Ce,directHelpHidden:Pe,storageStatus:B,eraseConfirm:fe,popup:U,popupOpen:Te,popupFocusNextStep:Ae,focus:qe}}function $(){Se=De();for(const i of l)i()}Se=De();function z(i){Ue+=1,qe={selector:i,seq:Ue}}function he(){N=!1,B="Sauvegarde indisponible. Tu peux jouer, mais tes progrès peuvent être perdus en quittant."}function tt(){N&&(Dt(m,K)||he())}function ie(){if(!N||u===null)return;Vt({version:1,sceneId:u.id,runNumber:h,statistics:f,trainingProof:_,lastCompletion:X})?B="Gardé sur cet appareil.":he()}function nt(i){const c=n.pont;if(c===void 0||i?.sceneId!=="pont"||i.success!==!0)return null;const p=[...f.pont.attempts].reverse().find(C=>C.success&&C.command===c.openCommand);if(p===void 0)return null;const x=Ze(c,Ge(c),[p.command]);return x.verdict.success?{sceneId:"pont",success:x.verdict.success,criteriaValidated:[...x.verdict.criteriaValidated],attempts:ee(f.pont.attempts),aidsUsed:[...f.pont.aids],verdictSource:"engine_replay_of_saved_success"}:null}function ee(i){return JSON.parse(JSON.stringify(i))}function rt(){const i=Object.fromEntries(e.scenes.map(p=>[p.id,p.commands.map(x=>x.id)])),c=Et(i);if(c.kind==="unavailable"){he();return}if(c.kind==="corrupt"){B="La sauvegarde du jeu n’est pas lisible. La scène repart du début.";return}c.kind!=="empty"&&(f=c.value.statistics,h=c.value.runNumber,_=nt(c.value.trainingProof),X=c.value.lastCompletion,T=!0)}function it(){const i=Qt();if(i.kind==="unavailable"){he();return}if(i.kind==="corrupt"){B="La progression n’est pas lisible. Le compteur repart à zéro.";return}i.kind!=="empty"&&(K=i.value.extra,m=_t(i.value.progression))}function Le(){if(L===null)return;clearTimeout(L.timer);const{resolve:i}=L;L=null,i()}function Re(i){return r.matches||i===0?Promise.resolve():new Promise(c=>{L={timer:window.setTimeout(()=>{L=null,c()},i),resolve:c}})}function st(){const i=k;if(i===null)return Promise.resolve();const c=i.getBoundingClientRect(),p=window.innerHeight||document.documentElement.clientHeight||0,x=Math.max(0,c.top),C=Math.min(p,c.bottom);return Math.max(0,C-x)/(c.height||1)>=.6?Promise.resolve():(i.scrollIntoView({block:"center",inline:"nearest",behavior:r.matches?"instant":"smooth"}),Re(300))}function me(i,c){const{level:p,filled:x,target:C,reached:H}=At(c);U={...U,gainText:R!==null&&R.delta===0?"XP déjà gagnés":`+${i} XP`,totalText:`${c} XP`,levelText:`Niveau ${p}`,progressValue:x,progressText:H?`${C} sur ${C} XP : palier atteint, niveau ${p}`:`${x} sur ${C} XP vers le niveau ${p+1}`,nextText:H?`Palier rempli ! Niveau ${p} atteint.`:`Encore ${C-x} XP pour le niveau ${p+1}`}}function se(){cancelAnimationFrame(S),S=0,R!==null&&(me(R.delta,R.total),U={...U,rewardHidden:!R.reward},$())}function Oe(i=!0){cancelAnimationFrame(S),S=0,R!==null&&(me(R.delta,R.total),U={...U,rewardHidden:!R.reward}),Te=!1,U={...U,hasGain:!1,isReplay:!1},R=null,i&&!W&&z("#result-title"),$()}function Ie(){return u?.id==="pont"&&n.porte!==void 0}function ot(i){je={xpText:i.delta>0?`+${i.delta} XP · Niveau ${m.level}`:null,reward:i.reward}}function lt(i){Oe(!1),R=i;const c=Ie();if(U={...Ye,title:c?"Bravo !":"Aventure réussie !",finaleHidden:c,nextStepHidden:!c,closePrimary:!c,rewardHidden:!0,replayHidden:i.delta!==0,nextHidden:i.delta===0,hasGain:i.delta>0,isReplay:i.delta===0,announcement:(c?"Bravo ! ":"Bravo, tu as terminé les deux exercices ! ")+`${i.delta?`Tu gagnes ${i.delta} XP.`:"XP déjà gagnés."} Total : ${i.total} XP. Niveau ${Ut(i.total)}.`},Ae=c,ot(i),me(i.delta===0?0:1,i.previous),Te=!0,$(),r.matches||i.delta===0){se();return}const p=performance.now(),x=C=>{if(R===null)return;const H=C-p,P=Math.max(1,Math.round(i.delta*Math.min(1,H/400))),be=Math.max(0,Math.min(1,(H-400)/550)),Ot=i.previous+Math.round(i.delta*be);me(P,Ot),$(),H>=1150?se():S=requestAnimationFrame(x)};S=requestAnimationFrame(x)}function at(i,c){try{const p=window;typeof p.WONDRA_TRACK=="function"&&p.WONDRA_TRACK(i,c)}catch{}}function ct(i){const c=qt(m,le,i);return at("c01_scene_reussie",{scene:i,xp_delta:c.delta,nouvelle_reussite:c.fresh===!0}),c.fresh&&(m=c.progression,tt()),{previous:c.previous,total:c.total,delta:c.delta,reward:c.reward!==null}}function dt(){M=0,re=!1,Ce=!0,Pe=!0,ue="",we="Le ventilateur est à l’arrêt.",pe=!1,Me="Un ventilateur à l’arrêt",Ve=u?.id==="porte"?"Tu peux revoir la démo. À toi de trouver pour la porte !":"Une démo à part. Elle ne change pas la scène."}function ge(i){g=i.description,j=i.ringing}function oe(i,c={}){const p=n[i];if(p===void 0)return;a+=1,Le(),Oe(!1),s=!1,u=p,y=Ge(p),V=[],o=null,b=!1,h+=1,F=i==="pont"?"Scène 1 sur 2":"Scène 2 sur 2",G=i==="pont"?e.title:p.title,document.title=`WONDRA — ${G}`,de=p.title,W=!0,fe=!1,je=null,d!==null&&ge(d.mount(p,y)),Q=!(i==="porte"),q=!1,O=null,dt(),w=i==="porte"?"Garde ta prévision. Puis essaie une commande.":"Regarde le pont replié. Quelle commande peut aider Roka ?",c.persist!==!1&&ie(),c.focus===!0&&z(i==="porte"?"#prediction-title":"#palette button"),$()}function ut(){s||!Ie()||u===null||y===null||!J(u,y)||!Ee(m,le,"pont")||oe("porte",{focus:!0})}function We(i,c){i.push(c),i.length>200&&i.shift()}function Be(i){return i==="porte"?f.porte:f.pont}function He(i){if(u===null)return;const c=Be(u.id).aids;c.includes(i)||c.push(i),ie()}function pt(){if(u===null||y===null)return null;const i=f.porte.predictions[0]??null,c=i?.value??null,p=f.porte.attempts[0]??null,x=ke(u,y),C=[...new Set([..._?.success===!0?_.criteriaValidated:[],...x.criteriaValidated])];return o==="opening"&&C.push("prediction_correct"),{sceneId:u.id,criteriaValidated:C,training:ee(_),transfer:{sceneId:"porte",success:x.success,criteriaValidated:[...x.criteriaValidated],prediction:o,predictionCorrect:o==="opening",predictionProtocol:ae,firstRecordedPrediction:c,firstRecordedPredictionProtocol:i?.protocol??"legacy_unknown",firstRecordedCommand:p===null?null:p.command,attempts:ee(f.porte.attempts),predictions:ee(f.porte.predictions),observation:x.success?"automatic_crossing_after_one_command":null,responseHintProvided:!1},aidsUsed:{pont:[...f.pont.aids],porte:[...f.porte.aids]},transferOnFirstRecordedAttempt:i?.protocol===ae&&c==="opening"&&p!==null&&p.predictionProtocol===ae&&p.prediction==="opening"&&p.run===i.run&&p.command===u.openCommand&&p.success&&x.success&&f.porte.attempts.length===1}}function ft(i){try{const c=window.WondraProgression;if(typeof c?.onActivityCompleted=="function"){const p=c.onActivityCompleted({activity:le,evidence:ee(i)});p!==null&&typeof p?.then=="function"&&Promise.resolve(p).catch(()=>{})}}catch{}}function ht(){if(u===null||y===null)return;W=!1,Z=u.text.success;let i=null;if(u.id==="pont"){const p=ke(u,y);_={sceneId:"pont",success:p.success,criteriaValidated:[...p.criteriaValidated],attempts:ee(f.pont.attempts),aidsUsed:[...f.pont.aids],verdictSource:"engine_verdict_of_reached_state"},ne="Roka a rejoint Ola !",$e="Une commande, une action. Étape suivante : la porte.",ye=!1}else{ne="Le passage est réussi !",ye=!0;const p=u.prediction?.options.find(x=>x.id===o);$e=o==="opening"?"Tu avais prévu un chemin jusqu’à l’autre côté. Le passage est devenu libre et Roka a rejoint Ola.":`Ta prévision : « ${p?.label??""} » Tu as observé un passage devenu libre, puis Roka a rejoint Ola.`,!b&&_?.success===!0&&(b=!0,X=pt(),i=X)}const c=ct(u.id);ie(),lt(c),i!==null&&ft(i)}function mt(i){return u===null?null:{opened:u.text.opened,crossed:u.text.crossing,completed:u.text.success,rang:u.text.ring,lit:u.text.light}[i]??null}async function gt(){if(u===null||y===null||s||Ne()||J(u,y))return;const i=Ze(u,y,V);if(i.reason==="empty"){w="Choisis un bloc avant de lancer.",z("#palette button"),$();return}if(i.reason!=="executed"){w="Choisis un des trois blocs pour essayer.",$();return}u.id==="pont"&&(_=null),s=!0;const c=++a;if($(),await st(),c!==a)return;const p=window.__c01_debug;p!==void 0&&(p.runStarts+=1);const x=h,C=V[0]??"",H=u;$();try{for(const P of i.steps){if(c!==a)return;y=P.state,d!==null&&ge(d.update(P.state,P.event));const be=mt(P.event);if(be!==null&&(w=be),$(),await Re(Gt[P.event]??0),c!==a)return}if(We(Be(H.id).attempts,{run:x,command:C,prediction:o,predictionProtocol:H.id==="porte"?ae:null,success:i.verdict.success}),i.verdict.success){if(await Re(Zt),c!==a)return;ht()}else ie(),w=`${C==="sonner"?H.text.ring:H.text.light} Essaie une autre commande.`}finally{c===a&&(s=!1,$())}}function bt(i){if(u===null||y===null||s||Ne()||J(u,y))return;const c=u.commands.find(p=>p.id===i);c!==void 0&&(V=[c.id],w=`${c.label}. Maintenant, appuie sur « Lancer ».`,$())}function xt(){u===null||y===null||s||J(u,y)||(V=[],w="Le programme est vide. Choisis un bloc.",$())}function kt(i){O=i,$()}function vt(){s||o!==null||u?.id!=="porte"||O!==null&&(o=O,We(f.porte.predictions,{run:h,value:o,protocol:ae}),q=!0,Q=!0,w="Ta prévision est gardée. Choisis une commande.",ie(),z("#palette button"),$())}function $t(){s||(re=!re,re&&z("#demo-button"),$())}function yt(){s||(He("demo"),M=Math.max(M,1),pe=!1,$(),pe=!0,Me="Le ventilateur tourne après la commande",we="tourner_ventilateur() fait tourner le ventilateur. Une commande, une action.",u?.id==="pont"&&(Ce=!1),$())}function jt(){s||u?.id!=="pont"||M<1||(He("obstacle"),M=2,d!==null&&ge(d.highlightObstacle()),ue=u.text.highlight??"",Pe=!1,$())}function wt(){s||u?.id!=="pont"||M<2||(He("direct"),M=3,ue=u.text.direct??"",$())}function Mt(){fe=!0,z("#erase-yes"),$()}function Ct(){fe=!1,z("#erase-button"),$()}function Pt(){const i=Ht();N=i,f=Fe(),m=Xe(),K={},_=null,X=null,h=0,oe("pont",{focus:!0,persist:!1}),B=i?"Tout est effacé. Niveau 1 · 0 XP. On repart du début.":"Le jeu repart à zéro ici. Le navigateur n’a pas pu effacer toutes les sauvegardes.",$()}function Tt(i){s||i==="porte"&&!Ee(m,le,"pont")||oe(i)}function St(){u!==null&&oe(u.id,{focus:!0})}function Nt(i){i.matches&&(Le(),se())}typeof r.addEventListener=="function"&&r.addEventListener("change",Nt);function Lt(){Le(),se()}function Rt(i){if(k=i,d=Ft(i),v){u!==null&&y!==null&&ge(d.mount(u,y)),$();return}v=!0,rt(),it(),oe("pont",{persist:!1}),A=!0,T&&B===""&&(B="Sauvegarde retrouvée. La scène repart au début ; tes progrès sont gardés."),$()}return{subscribe(i){return l.add(i),()=>{l.delete(i)}},getSnapshot:()=>Se,attach:Rt,stop:Lt,selectScene:Tt,selectCommand:bt,clearProgram:xt,run:gt,restart:St,goToNextExercise:ut,selectPrediction:kt,confirmPrediction:vt,toggleHelp:$t,playDemo:yt,showObstacleHelp:jt,showDirectHelp:wt,askErase:Mt,cancelErase:Ct,confirmErase:Pt,closePopup:Oe,finishPopup:se}}const Yt=1,Jt="C01",Kt="fr",en="Le pont de Roka",tn="Aide Roka à rejoindre Ola.",nn=[{id:"pont",kind:"bridge",title:"Le canal",openCommand:"ouvrir_pont",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:310,y:204,width:140},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"ouvrir_pont",label:"Ouvrir le pont",icon:"bridge",code:"ouvrir_pont()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"},{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"}],text:{closed:"Obstacle : le pont est replié. Roka ne peut pas passer.",opened:"Le pont se déplie. Le passage est ouvert.",crossing:"Le pont est ouvert. Roka traverse tout seul.",success:"La commande a déplié le pont. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. Le pont reste replié.",light:"La balise est allumée. Le pont reste replié.",highlight:"Regarde le pont debout : il bloque le passage.",direct:"Choisis « Ouvrir le pont », puis « Lancer ». Le pont se déplie. Roka traverse tout seul."}},{id:"porte",kind:"door",title:"La porte du jardin",openCommand:"ouvrir_porte",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:364,y:204,width:40},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"},{id:"ouvrir_porte",label:"Ouvrir la porte",icon:"🚪",code:"ouvrir_porte()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"}],prediction:{question:"Pour que Roka rejoigne Ola, quel résultat faut-il obtenir ?",options:[{id:"bell",label:"Ola vient chercher Roka."},{id:"beacon",label:"Roka reste au même endroit."},{id:"opening",label:"Un chemin se crée jusqu’à l’autre côté."}]},text:{closed:"Obstacle : la porte est fermée. Roka ne peut pas passer.",opened:"La porte s’ouvre. Le passage est libre.",crossing:"La porte est ouverte. Roka traverse tout seul.",success:"La commande a ouvert la porte. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. La porte reste fermée.",light:"La balise est allumée. La porte reste fermée."}}],rn={version:Yt,activity:Jt,locale:Kt,title:en,instruction:tn,scenes:nn},sn={C01:rn};class D extends Error{constructor(n){super(n),this.name="ContentError"}}function te(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function I(e,n,r){const l=e[n];if(typeof l!="string"||l.length===0)throw new D(`${r} : le champ « ${n} » doit être une chaîne non vide.`);return l}function on(e,n){if(!te(e))throw new D(`${n} : commande invalide.`);const r={id:I(e,"id",n),label:I(e,"label",n)};return typeof e.icon=="string"&&(r.icon=e.icon),typeof e.code=="string"&&(r.code=e.code),r}function ln(e,n){if(!te(e))throw new D(`${n} : exercice invalide.`);const r=I(e,"id",n),l=`${n} → « ${r} »`,d=e.commands;if(!Array.isArray(d)||d.length===0)throw new D(`${l} : au moins une commande est requise.`);const k=d.map(m=>on(m,l)),v=I(e,"openCommand",l);if(!k.some(m=>m.id===v))throw new D(`${l} : la commande d’ouverture « ${v} » ne figure pas dans les commandes.`);const f={id:r,kind:I(e,"kind",l),title:I(e,"title",l),openCommand:v,commands:k};return te(e.positions)&&(f.positions=e.positions),te(e.text)&&(f.text=e.text),te(e.prediction)&&(f.prediction=e.prediction),f}function an(e){if(!te(e))throw new D("Niveau : la racine doit être un objet.");const n=I(e,"activity","Niveau"),r=`Niveau « ${n} »`;if(!Number.isSafeInteger(e.version)||e.version<1)throw new D(`${r} : le champ « version » doit être un entier ≥ 1.`);const l=e.scenes;if(!Array.isArray(l)||l.length===0)throw new D(`${r} : au moins un exercice est requis.`);const d=l.map(v=>ln(v,r));if(new Set(d.map(v=>v.id)).size!==d.length)throw new D(`${r} : deux exercices portent le même identifiant.`);return{version:e.version,activity:n,locale:I(e,"locale",r),title:I(e,"title",r),instruction:I(e,"instruction",r),scenes:d}}function cn(e){const n=sn[e];if(n===void 0)throw new D(`Niveau inconnu : « ${e} ».`);return an(n)}const dn=["closed","opened","crossing","success","ring","light"],un=["highlight","direct"];function pn(e){const n=e.text??{},r={};for(const l of dn){const d=n[l];if(typeof d!="string"||d.length===0)throw new TypeError(`Texte manquant : ${e.id}.${l}`);r[l]=d}for(const l of un){const d=n[l];typeof d=="string"&&(r[l]=d)}return r}function fn(e){if(e.kind!=="bridge"&&e.kind!=="door")throw new TypeError(`Type de scène invalide : ${e.id}`);const n={id:e.id,kind:e.kind,title:e.title,openCommand:e.openCommand,positions:Je(e),commands:e.commands,text:pn(e)};return e.prediction!==void 0?{...n,prediction:e.prediction}:n}function hn(){const e=cn("C01");if(e.scenes.length!==2||!["pont","porte"].every(n=>e.scenes.filter(r=>r.id===n).length===1))throw new TypeError("Scènes invalides.");return{version:e.version,activity:e.activity,locale:e.locale,title:e.title,instruction:e.instruction,scenes:e.scenes.map(fn)}}function mn(){try{return zt(hn())}catch{return null}}function gn(){const e=E.useRef(null);e.current??={controller:mn()};const n=e.current.controller,r=E.useCallback(m=>n===null?()=>{}:n.subscribe(m),[n]),l=E.useCallback(()=>n===null?null:n.getSnapshot(),[n]),d=E.useSyncExternalStore(r,l),k=E.useCallback(m=>{m!==null&&n!==null&&n.attach(m)},[n]);E.useEffect(()=>{window.WondraCharacters=_e},[]),E.useEffect(()=>{const m=document.title;return()=>{document.title=m}},[]),E.useEffect(()=>{if(n===null)return;const m=()=>{n.stop()};return window.addEventListener("pagehide",m),()=>{window.removeEventListener("pagehide",m),m()}},[n]);const v=E.useRef(0),f=d?.focus??null;return E.useEffect(()=>{if(f===null||f.seq===v.current)return;v.current=f.seq;const m=document.querySelector(f.selector);m!==null&&(m.focus({preventScroll:!0}),m.scrollIntoView({block:"center",inline:"nearest",behavior:"instant"}))},[f]),{controller:n,snapshot:d,sceneRef:k}}function ce(){return t.jsxs("svg",{className:"crystal-icon",viewBox:"0 0 32 40","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"M16 2 27 11 29 25 16 38 3 25 5 11Z",fill:"#c9bcf0",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),t.jsx("path",{d:"M16 2 10 15 16 38 22 15Z",fill:"#eee7ff"}),t.jsx("path",{d:"M3 25 10 15 16 38M29 25 22 15 16 38M5 11 10 15 22 15 27 11M16 2 22 15",fill:"none",stroke:"#8067aa",strokeWidth:"1.3",strokeLinejoin:"round"}),t.jsx("path",{d:"m12 10 3-4",fill:"none",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})}function Ke(){return t.jsxs("svg",{className:"reward-icon",viewBox:"0 0 40 40","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"m24 25 10 10",fill:"none",stroke:"#594565",strokeWidth:"8",strokeLinecap:"round"}),t.jsx("path",{d:"m25 26 8 8",fill:"none",stroke:"#edc28e",strokeWidth:"4",strokeLinecap:"round"}),t.jsx("circle",{cx:"16",cy:"16",r:"12",fill:"#edc28e",stroke:"#594565",strokeWidth:"2"}),t.jsx("circle",{cx:"16",cy:"16",r:"8.5",fill:"#dceff3",stroke:"#8067aa",strokeWidth:"1.5"}),t.jsx("path",{d:"M11 16a5 5 0 0 1 5-5",fill:"none",stroke:"white",strokeWidth:"2.5",strokeLinecap:"round"})]})}function bn(){return t.jsxs("svg",{viewBox:"0 0 32 32","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"M2 27Q6 24 10 27T18 27T26 27T30 27",fill:"none",stroke:"#74afb9",strokeWidth:"2"}),t.jsx("path",{d:"M3 20Q16 7 29 20L29 24Q16 13 3 24Z",fill:"#edc28e",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),t.jsx("path",{d:"M3 20V12M29 20V12M3 14Q16 1 29 14M10 13V8M22 13V8",fill:"none",stroke:"#8a5e46",strokeWidth:"2",strokeLinecap:"round"})]})}function xn({snapshot:e,controller:n}){return t.jsx("div",{id:"palette",className:"palette",role:"group","aria-label":"Les trois commandes",hidden:e.paletteHidden,children:e.commands.map(r=>t.jsxs("button",{type:"button",className:r.executing?"command executing":"command","data-command":r.id,"aria-pressed":r.pressed,"aria-label":r.label,disabled:r.disabled,onClick:()=>n.selectCommand(r.id),children:[t.jsx("span",{className:"icon","aria-hidden":"true",children:r.icon==="bridge"?t.jsx(bn,{}):r.icon}),t.jsxs("span",{children:[t.jsx("strong",{children:r.label}),t.jsx("code",{children:r.code})]}),t.jsx("span",{className:"check","aria-hidden":"true",children:"✓"})]},r.id))})}function kn({snapshot:e,controller:n}){return t.jsxs("section",{id:"prediction-panel",className:"prediction-panel",hidden:e.predictionHidden,"aria-labelledby":"prediction-title",children:[t.jsx("h2",{id:"prediction-title",tabIndex:-1,children:"D’abord, à ton avis…"}),t.jsxs("form",{id:"prediction-form",hidden:e.predictionFormHidden,onSubmit:r=>{r.preventDefault(),n.confirmPrediction()},children:[t.jsxs("fieldset",{children:[t.jsx("legend",{id:"prediction-question",children:e.predictionQuestion}),t.jsx("div",{id:"prediction-options",children:e.predictionOptions.map(r=>t.jsxs("label",{className:"prediction-option",children:[t.jsx("input",{type:"radio",name:"prediction",value:r.id,required:!0,checked:e.predictionSelected===r.id,onChange:()=>n.selectPrediction(r.id)}),t.jsx("span",{children:r.label})]},r.id))})]}),t.jsx("button",{id:"prediction-confirm",type:"submit",disabled:e.predictionConfirmDisabled,children:"Garder ma prévision"})]}),t.jsx("p",{id:"prediction-summary",hidden:!0})]})}function vn({snapshot:e,controller:n}){return t.jsxs("section",{className:"control-panel","aria-labelledby":"program-title",children:[t.jsx(kn,{snapshot:e,controller:n}),t.jsx("h2",{id:"program-title",children:"Mon programme"}),t.jsx("p",{id:"choice-instruction",children:e.choiceInstruction}),t.jsx(xn,{snapshot:e,controller:n}),t.jsxs("div",{className:"program-slot",children:[t.jsx("span",{className:"slot-number","aria-hidden":"true",children:"1"}),t.jsx("p",{id:"program-content",children:e.programContent}),t.jsx("button",{id:"clear-button",type:"button",disabled:e.clearDisabled,"aria-label":"Vider le programme",onClick:()=>n.clearProgram(),children:"Vider"})]}),t.jsx("p",{className:"microcopy",children:"Un seul bloc. Blocs WONDRA, pas du Python."}),t.jsxs("div",{className:"actions",children:[t.jsx("button",{id:"run-button",className:"primary",type:"button",disabled:e.runDisabled,onClick:()=>{n.run()},children:e.runLabel}),t.jsx("button",{id:"restart-button",type:"button",disabled:!e.ready,onClick:()=>n.restart(),children:"↺ Recommencer"})]}),t.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:e.feedback})]})}function $n({snapshot:e,controller:n}){const r=E.useRef(null);function l(){const d=r.current;d!==null&&(d.classList.remove("running"),d.getBoundingClientRect(),d.classList.add("running")),n.playDemo()}return t.jsxs("section",{className:"help-section","aria-labelledby":"help-title",children:[t.jsxs("div",{className:"section-heading",children:[t.jsx("h2",{id:"help-title",children:"Un coup de main ?"}),t.jsx("button",{id:"help-button",type:"button","aria-expanded":e.helpOpen,"aria-controls":"help-panel",disabled:e.helpDisabled,onClick:()=>n.toggleHelp(),children:e.helpOpen?"Fermer l’aide":"Ouvrir l’aide"})]}),t.jsxs("div",{id:"help-panel",className:"help-panel",hidden:!e.helpOpen,children:[t.jsx("p",{id:"help-intro",children:e.helpIntro}),t.jsxs("div",{className:"demo",children:[t.jsxs("svg",{id:"demo-fan",ref:r,className:e.demoRunning?"running":"",viewBox:"0 0 120 110",width:"120",height:"110",role:"img","aria-label":e.demoLabel,children:[t.jsx("path",{d:"M60 62V95M38 99H82",fill:"none",stroke:"#221b4e",strokeWidth:"7",strokeLinecap:"round"}),t.jsx("circle",{cx:"60",cy:"44",r:"36",fill:"#f0ecfa",stroke:"#221b4e",strokeWidth:"4"}),t.jsx("g",{className:"fan-blades",children:t.jsx("path",{d:`M60 44C39 40 38 15 52 16C65 17 65 31 60 44
                       M60 44C73 26 96 34 88 47C81 57 68 51 60 44
                       M60 44C68 65 50 81 42 69C35 58 47 48 60 44`,fill:"#7ba7f0",stroke:"#221b4e",strokeWidth:"2"})}),t.jsx("circle",{cx:"60",cy:"44",r:"6",fill:"#221b4e"})]}),t.jsxs("div",{children:[t.jsx("p",{children:t.jsx("code",{children:"tourner_ventilateur()"})}),t.jsx("button",{id:"demo-button",type:"button",disabled:e.helpDisabled,onClick:l,children:"▶ Jouer la démo"}),t.jsx("p",{id:"demo-feedback",role:"status",children:e.demoFeedback})]})]}),t.jsxs("div",{className:"actions",children:[t.jsx("button",{id:"obstacle-help-button",type:"button",hidden:e.obstacleHelpHidden,disabled:e.helpDisabled,onClick:()=>n.showObstacleHelp(),children:"Voir l’obstacle"}),t.jsx("button",{id:"direct-help-button",type:"button",hidden:e.directHelpHidden,disabled:e.helpDisabled,onClick:()=>n.showDirectHelp(),children:"Explique-moi"})]}),t.jsx("p",{id:"help-feedback",role:"status",children:e.helpFeedback})]})]})}function yn({snapshot:e,controller:n,onExit:r}){return t.jsxs("footer",{className:"page-footer",children:[t.jsx("p",{children:"Ton Carnet garde tes XP et tes outils. Rien ne se dépense."}),t.jsx("p",{id:"storage-status",role:"status",children:e.storageStatus}),t.jsx("button",{id:"erase-button",type:"button",disabled:!e.ready,onClick:()=>n.askErase(),children:"Effacer la sauvegarde"}),t.jsxs("div",{id:"erase-confirmation",className:"erase-confirmation",hidden:!e.eraseConfirm,children:[t.jsx("p",{children:"Effacer les essais, les XP et les outils gardés sur cet appareil ?"}),t.jsx("button",{id:"erase-yes",type:"button",onClick:()=>n.confirmErase(),children:"Oui, tout effacer"}),t.jsx("button",{id:"erase-no",type:"button",onClick:()=>n.cancelErase(),children:"Non, garder"})]}),r===void 0?null:t.jsx("button",{id:"exit-button",type:"button",onClick:r,children:"← Revenir à l’accueil"})]})}function jn({snapshot:e}){const{earned:n}=e;return n===null?t.jsx("p",{id:"earned-summary",className:"earned-summary"}):t.jsxs("p",{id:"earned-summary",className:"earned-summary",children:[n.xpText===null?"Bravo ! Les XP de cette scène sont déjà gagnés.":t.jsxs("span",{className:"earned-item",children:[t.jsx(ce,{}),t.jsx("span",{children:n.xpText})]}),n.reward?t.jsxs("span",{className:"earned-item",children:[t.jsx(Ke,{}),t.jsx("span",{children:"Tu as gagné : la Loupe du créateur"})]}):null]})}function wn({snapshot:e,controller:n}){return t.jsxs("section",{id:"result-panel",className:"result-panel",hidden:e.resultHidden,"aria-labelledby":"result-title",children:[t.jsx("p",{className:"eyebrow",children:"✓ Passage réussi"}),t.jsx("h2",{id:"result-title",tabIndex:-1,children:e.resultTitle}),t.jsx("p",{id:"result-text",children:e.resultText}),t.jsx("p",{id:"evidence-text",children:e.evidenceText}),t.jsx(jn,{snapshot:e}),t.jsx("button",{id:"next-button",className:"primary",type:"button",hidden:e.nextButtonHidden,onClick:()=>n.goToNextExercise(),children:"Étape suivante : la porte →"})]})}function Mn({snapshot:e,controller:n}){const{currentSceneId:r,porteUnlocked:l}=e;return t.jsxs("div",{id:"exercise-switch",className:"exercise-switch",role:"group","aria-label":"Choisir l’exercice",children:[t.jsx("button",{id:"ex-pont",type:"button",className:r==="pont"?"active":"","aria-current":r==="pont"?"true":void 0,onClick:()=>n.selectScene("pont"),children:"1 · Le pont"}),t.jsx("button",{id:"ex-porte",type:"button",className:r==="porte"?"active":"","aria-current":r==="porte"?"true":void 0,disabled:!l,title:l?"":"Réussis d'abord le pont.","aria-label":l?void 0:"Réussis d'abord le pont.",onClick:()=>n.selectScene("porte"),children:"2 · La porte"})]})}function Cn({snapshot:e,controller:n,sceneRef:r}){return t.jsxs("section",{className:"scene-panel","aria-labelledby":"scene-title",children:[t.jsxs("div",{className:"scene-heading",children:[t.jsx("h2",{id:"scene-title",children:e.sceneTitle}),t.jsx("span",{className:"scene-tag",children:"Une commande → une action"})]}),t.jsx(Mn,{snapshot:e,controller:n}),t.jsx("div",{id:"scene",className:e.sceneRinging?"scene ringing":"scene","aria-busy":e.sceneBusy,ref:r}),t.jsx("p",{id:"scene-description",className:"scene-description",children:e.sceneDescription})]})}function Pn({snapshot:e,controller:n}){const r=E.useRef(null),{popup:l,popupOpen:d,popupFocusNextStep:k}=e;E.useEffect(()=>{const f=r.current;f!==null&&(d&&!f.open?(f.showModal(),document.getElementById(k?"xp-next-step":"xp-close")?.focus()):!d&&f.open&&f.close())},[d,k]);const v=[l.hasGain?"has-gain":"",l.isReplay?"is-replay":""].filter(f=>f!=="").join(" ");return t.jsxs("dialog",{id:"xp-popup",ref:r,className:v,"aria-labelledby":"xp-title","aria-describedby":"xp-announcement",onCancel:f=>{f.preventDefault(),n.closePopup()},children:[t.jsx("div",{className:"popup-emblem","aria-hidden":"true",children:"✦"}),t.jsx("h2",{id:"xp-title",children:l.title}),t.jsx("p",{id:"xp-finale",className:"popup-finale",hidden:l.finaleHidden,children:"Bravo, tu as terminé les deux exercices !"}),t.jsx("p",{id:"xp-announcement",className:"sr-only",children:l.announcement}),t.jsxs("div",{className:"xp-numbers","aria-hidden":"true",children:[t.jsxs("p",{id:"xp-gain",children:[t.jsx(ce,{}),t.jsx("span",{id:"xp-gain-text",children:l.gainText})]}),t.jsxs("p",{className:"xp-total-line",children:["Total :",t.jsxs("strong",{id:"xp-total",children:[t.jsx(ce,{}),t.jsx("span",{id:"xp-total-text",children:l.totalText})]})]}),t.jsx("p",{id:"popup-level",children:l.levelText})]}),t.jsx("label",{className:"sr-only",htmlFor:"xp-progress",children:"Progression du palier de niveau"}),t.jsxs("div",{className:"xp-progress-row",children:[t.jsx(ce,{}),t.jsx("progress",{id:"xp-progress",max:It,value:l.progressValue,"aria-valuetext":l.progressText})]}),t.jsx("p",{id:"xp-next",hidden:l.nextHidden,children:l.nextText}),t.jsx("p",{id:"xp-replay",hidden:l.replayHidden,children:"Ces XP sont déjà dans ton Carnet."}),t.jsxs("p",{id:"reward-toast",className:"reward-toast",role:"status","aria-atomic":"true",hidden:l.rewardHidden,children:[t.jsx(Ke,{}),t.jsx("span",{children:"Tu as gagné : la Loupe du créateur"})]}),t.jsxs("div",{className:"popup-actions",children:[t.jsx("button",{id:"xp-next-step",className:"primary",type:"button",hidden:l.nextStepHidden,onClick:()=>n.goToNextExercise(),children:"Étape suivante : la porte →"}),t.jsx("button",{id:"xp-close",type:"button",className:l.closePrimary?"primary":"",onClick:()=>n.closePopup(),children:"Voir mon résultat"})]})]})}function Qe({step:e,current:n,children:r}){return t.jsxs("li",{"data-guide-step":e,"aria-current":e===n?"step":void 0,children:[t.jsx("b",{children:e})," ",r]})}function Nn({onExit:e}){const{controller:n,snapshot:r,sceneRef:l}=gn();return n===null||r===null?t.jsx("main",{children:t.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:"La scène ne peut pas être chargée. Ses données doivent être vérifiées."})}):t.jsxs("div",{className:"c01-page",children:[t.jsxs("header",{className:"page-header",children:[t.jsxs("p",{className:"brand",children:["WONDRA",t.jsx("span",{children:"CREATE · Mon premier programme"})]}),t.jsxs("p",{id:"level-chip",className:"level-chip",children:[t.jsx(ce,{}),t.jsx("span",{id:"level-chip-text",children:r.chipText})]})]}),t.jsxs("main",{children:[t.jsxs("header",{className:"activity-header",children:[t.jsx("p",{id:"scene-step",className:"eyebrow",children:r.sceneStep}),t.jsx("h1",{id:"activity-title",children:r.activityTitle}),t.jsx("p",{id:"instruction",className:"instruction",children:r.instruction}),t.jsx("p",{className:"mission-note",children:"Une commande agit. Si le passage est libre, Roka traverse tout seul."})]}),t.jsxs("ol",{className:"guide","aria-label":"Les trois temps de ton programme",children:[t.jsx(Qe,{step:1,current:r.guideStep,children:t.jsx("span",{id:"guide-prepare",children:r.guidePrepare})}),t.jsx(Qe,{step:2,current:r.guideStep,children:"Lance"}),t.jsx(Qe,{step:3,current:r.guideStep,children:"Regarde ce qui se passe"})]}),t.jsxs("div",{className:"game-layout",children:[t.jsx(Cn,{snapshot:r,controller:n,sceneRef:l}),t.jsx(wn,{snapshot:r,controller:n}),t.jsx(vn,{snapshot:r,controller:n})]}),t.jsx($n,{snapshot:r,controller:n}),t.jsx(yn,{snapshot:r,controller:n,onExit:e})]}),t.jsx(Pn,{snapshot:r,controller:n})]})}export{Nn as default};
