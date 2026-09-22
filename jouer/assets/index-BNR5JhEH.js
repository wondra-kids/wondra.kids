import{t as Q,l as B,W as Be,h as Ie,a as Ft,e as ot,n as Gt,p as Zt,r as zt,v as Yt,b as Kt,c as qe,d as Jt,f as E,j as t,u as q,H as ut,X as en,C as tn,R as nn,g as rn}from"./index-DjHZ7ibM.js";import{e as sn,r as on,a as ln,w as an,b as lt,c as cn,u as dn,R as un,d as pn}from"./RevoirVoyage-DP8qY6xj.js";function fn(e,n){return e==="unknown_command"||e==="step_failed"?"failure":e==="already_complete"||n?"success":"no-effect"}function hn(e,n,s){const r=[];let c=n;const b=m=>({outcome:fn(m,e.isComplete(c)),reason:m,steps:r,finalState:c});if(s.length===0)return b("empty");if(e.isComplete(c))return b("already_complete");for(const m of s){const g=e.commands[m];if(g===void 0)return b("unknown_command");for(const h of g){try{c=h.apply(c)}catch{return b("step_failed")}r.push({index:r.length,event:h.event,commandId:m,state:c})}}return b("executed")}function at(e){return{sceneId:e.id,obstacleOpen:!1,beaconOn:!1,bellCount:0,olaWaved:!1,roka:{...e.positions.roka},phase:"ready",lastCommand:null}}function ne(e,n){return n.sceneId===e.id&&n.obstacleOpen&&n.roka.x===e.positions.goal.x&&n.roka.y===e.positions.goal.y}function je(e,n){const s=ne(e,n),r=[];return n.obstacleOpen&&r.push(e.kind==="bridge"?"bridge_opened":"door_opened"),s&&r.push(e.kind==="bridge"?"bridge_crossed":"transfer_success"),{success:s,criteriaValidated:r}}function te(e,n,s){return{event:n,apply:r=>({...r,lastCommand:e,...s(r)})}}function mn(e){const n={},s=c=>e.commands.some(b=>b.id===c),r=e.openCommand;return s(r)&&(n[r]=[te(r,"opened",()=>({phase:"opening",obstacleOpen:!0})),te(r,"crossed",()=>({phase:"crossing",roka:{...e.positions.goal}})),te(r,"completed",()=>({phase:"complete"}))]),s("sonner")&&(n.sonner=[te("sonner","rang",c=>({phase:"reacting",bellCount:c.bellCount+1,olaWaved:!0})),te("sonner","settled",()=>({phase:"ready"}))]),s("allumer")&&(n.allumer=[te("allumer","lit",()=>({phase:"reacting",beaconOn:!0})),te("allumer","settled",()=>({phase:"ready"}))]),{commands:n,isComplete:c=>ne(e,c)}}function ct(e,n,s){if(n.sceneId!==e.id)throw new Error("La scène et l’état ne correspondent pas.");const r=b=>({reason:b,steps:[],finalState:n,verdict:je(e,n)});if(!Array.isArray(s)||s.length>1)return r("invalid_program");const c=hn(mn(e),n,s);return{reason:c.reason,steps:c.steps,finalState:c.finalState,verdict:je(e,c.finalState)}}const De=e=>String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]??n);function we(e,n,s,r){if(typeof e!="number"||!Number.isFinite(e)||e<s||e>r)throw new TypeError(`Coordonnée invalide : ${n}`);return e}function $e(e,n){const s=e??{};return{x:we(s.x,`${n}.x`,0,760),y:we(s.y,`${n}.y`,0,340)}}function pt(e){if(e===null||typeof e!="object"||!["bridge","door"].includes(e.kind))throw new TypeError("Type de scène invalide.");const n=e.positions??{},s=m=>$e(n[m],`positions.${m}`),r=s("obstacle"),c=we((n.obstacle??{}).width,"positions.obstacle.width",14,300),b={x:r.x,y:r.y,width:c};if(b.x+b.width>760)throw new TypeError("Obstacle hors de la scène.");return e.kind==="door"&&we(b.y,"positions.obstacle.y (porte)",114,277),{roka:s("roka"),goal:s("goal"),ola:s("ola"),obstacle:b,beacon:s("beacon"),bell:s("bell")}}function gn(e){let n,s,r,c=!1;function b({x:o,y:l,width:a}){const u=o+a,k=o+a/2,C=k+38,R=Math.min(24,a*.32);function w(x,j=0){return[[C+x*(R+j*.25),82],[C+x*(R+j*.3),106],[k+10+x*(a*.27+j*.45),121],[k+8+x*(a*.32+j*.55),145],[k+x*(a*.41+j*.7),164],[k+x*(a/2+6+j),l-27],[k+x*(a/2+6+j),l],[k+x*(a/2+6+j),l+29],[k-4+x*(a/2+12+j*1.1),266],[k-4+x*(a/2+17+j*1.15),286],[k-4+x*(a/2+20+j*1.2),310],[k+x*(a/2+26+j*1.3),329],[k+x*(a/2+28+j*1.3),350]]}function H(x,j="M"){return`${j}${x[0].join(" ")}
        C${x.slice(1).map(O=>O.join(" ")).join(" ")}`}function V(x,j){return`${H(w(x,j))}
        ${H(w(x).reverse(),"L")}Z`}function G(x,j,O){const D=w(x),T=j*3,S=1-O,[K,oe]=[0,1].map(F=>S*S*S*D[T][F]+3*S*S*O*D[T+1][F]+3*S*O*O*D[T+2][F]+O*O*O*D[T+3][F]);return[K,oe]}const A=H(w(-1)),M=H(w(1).reverse()),Z=`${A}
      ${H(w(1).reverse(),"L")}
      Q${C} 76 ${C-R} 82Z`,me=[[-1,0,.68,.36],[1,0,.86,.44],[-1,1,.22,.6],[1,1,.08,.54],[-1,2,.73,.85],[1,2,.64,.8],[-1,3,.5,1.08],[1,3,.76,1.18]].map(([x,j,O,D],T)=>{const[S,K]=G(x,j,O);return`
        <g transform="translate(${S+x*(5+D*4)} ${K})
                      scale(${D})">
          <path d="M0 1Q-1 -6 -5 -10
                   M0 1Q2 -5 2 -12
                   M0 1Q4 -3 8 -5"
                fill="none" stroke="#739574" stroke-width="1.7"
                stroke-linecap="round"/>
          <path d="M-1 0Q-1 -4 -3 -6"
                fill="none" stroke="#c5dcbf" stroke-width="1.2"
                stroke-linecap="round"/>
          ${T%2===0?`
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
          <path d="${V(-1,10)} ${V(1,10)}"
                fill="#9caf92" opacity=".78"/>
          <path d="${V(-1,4.5)} ${V(1,4.5)}"
                fill="#d4d5b8"/>

          <path d="${Z}" fill="url(#water-pattern)"/>
          <path d="${Z}" fill="url(#canal-light)"/>

          <g clip-path="url(#canal-water-clip)"
             fill="none" stroke-linecap="round">
            <!-- Ombre progressive sous les rives, sans bord supérieur tracé. -->
            <path d="${A} ${M}"
                  stroke="#221b4e" stroke-width="13" opacity=".035"/>
            <path d="${A} ${M}"
                  stroke="#221b4e" stroke-width="7" opacity=".055"/>
            <path d="${A} ${M}"
                  stroke="#466f70" stroke-width="2.5" opacity=".16"/>

            <!-- Rides distinctes : longueur, amplitude et épaisseur en perspective. -->
            <g transform="translate(${C-8} 118) scale(.40)">
              <path d="M-18 0Q-7 -3 3 0T18 -1"
                    stroke="#fffbf4" stroke-width="1.7" opacity=".55"/>
              <path d="M-6 7h12"
                    stroke="#edf4ff" stroke-width="1.1" opacity=".35"/>
            </g>
            <g transform="translate(${k+12} 147) scale(.62)">
              <path d="M-29 0C-18 -4 -8 4 5 0S22 -2 29 -1"
                    stroke="#fffbf4" stroke-width="1.8" opacity=".48"/>
              <path d="M7 8Q14 6 22 8"
                    stroke="#edf4ff" stroke-width="1.2" opacity=".30"/>
            </g>
            <g transform="translate(${k-5} 270)">
              <path d="M-42 0C-24 -5 -8 5 12 0S31 -2 42 -1"
                    stroke="#fffbf4" stroke-width="1.6" opacity=".40"/>
              <path d="M-20 10Q-8 7 4 9"
                    stroke="#edf4ff" stroke-width="1.2" opacity=".26"/>
            </g>
            <g transform="translate(${k+2} 318) scale(1.18)">
              <path d="M-35 0C-19 -4 -2 5 17 1S36 -2 43 0"
                    stroke="#fffbf4" stroke-width="1.6" opacity=".34"/>
              <path d="M-46 11Q-33 8 -21 10"
                    stroke="#edf4ff" stroke-width="1.2" opacity=".25"/>
            </g>

            <!-- Reflets de rive courts, élargis seulement au premier plan. -->
            <path d="M${k+a*.3} 133
                     Q${k+a*.31} 139 ${k+a*.32} 144"
                  stroke="#fffbf4" stroke-width="1" opacity=".38"/>
            <path d="M${o+14} 158Q${o+8} 169 ${o+6} 178"
                  stroke="#fffbf4" stroke-width="1.4" opacity=".32"/>
            <path d="M${u+2} 272
                     C${u+5} 283 ${u+11} 297 ${u+12} 306"
                  stroke="#fffbf4" stroke-width="2" opacity=".38"/>
          </g>

          <path d="${A} ${M}" fill="none"
                stroke="#658f89" stroke-width="1.2" opacity=".65"/>

          ${me}
        </g>
      </g>

      <!-- Avancées herbeuses raccordées aux rives : appuis fixes du pont. -->
      <path d="M${o-24} ${l-28}
               Q${o-9} ${l-35} ${o+4} ${l-29}
               Q${o+10} ${l-19} ${o+8} ${l-3}
               Q${o+11} ${l+17} ${o+3} ${l+29}
               Q${o-10} ${l+34} ${o-24} ${l+27}Z
               M${u+24} ${l-28}
               Q${u+9} ${l-34} ${u-4} ${l-29}
               Q${u-10} ${l-17} ${u-8} ${l+1}
               Q${u-11} ${l+18} ${u-3} ${l+29}
               Q${u+10} ${l+34} ${u+24} ${l+27}Z"
            fill="url(#ground)"/>
      <path d="M${o+4} ${l-28}
               Q${o+10} ${l-16} ${o+8} ${l-3}
               Q${o+11} ${l+17} ${o+3} ${l+28}
               M${u-4} ${l-28}
               Q${u-10} ${l-17} ${u-8} ${l+1}
               Q${u-11} ${l+18} ${u-3} ${l+28}"
            fill="none" stroke="#d4d5b8" stroke-width="4"
            stroke-linecap="round"/>
      <path d="M${o-12} ${l+29}l-3 -6m3 6l4 -5
               M${u+13} ${l-27}l-2 -6m2 6l5 -4"
            fill="none" stroke="#739574" stroke-width="1.5"
            stroke-linecap="round"/>

      <ellipse cx="${k}" cy="${l+29}" rx="${a*.49}" ry="9"
               fill="#221b4e" opacity=".09"
               clip-path="url(#canal-water-clip)"/>
      <g fill="#c8d2bb" stroke="#91a189" stroke-width="1.3">
        <rect x="${o-5}" y="${l-23}" width="13" height="46" rx="4"/>
        <rect x="${u-8}" y="${l-23}" width="13" height="46" rx="4"/>
      </g>

      <g class="bridge-deck"
         style="transform-origin:${o}px ${l}px;transform:rotate(-90deg)">
        <rect x="${o}" y="${l-21}" width="${a}" height="42" rx="6"
              fill="url(#wood-pattern)" stroke="#594565" stroke-width="3"/>
        <path d="M${o+5} ${l-25}H${o+a-5}
                 M${o+5} ${l+25}H${o+a-5}"
              stroke="#8a5e46" stroke-width="7" stroke-linecap="round"/>
        <path d="M${o+5} ${l-27}H${o+a-5}"
              stroke="#ffe5aa" stroke-width="2" stroke-linecap="round"/>
        <circle cx="${o+a-9}" cy="${l}" r="3" fill="#594565"/>
      </g>
      <circle cx="${o}" cy="${l}" r="9" fill="#fff1c9"
              stroke="#594565" stroke-width="3"/>
      <rect class="obstacle-highlight" x="${o-30}" y="${l-a-12}"
            width="${a+55}" height="${a+55}" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function m({x:o,y:l,width:a}){function u(C,R){return`
        <g transform="translate(${o} ${C}) scale(${a/40} ${(R-C)/100})">
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
        </g>`}const k=Array.from({length:5},(C,R)=>{const w=R*a/5,H=w+a*.15,V=-48-R%2*2;return`
        <path d="M${w} -4V${V+4}
                 Q${(w+H)/2} ${V-3} ${H} ${V+4}
                 V-4Z"
              fill="#f0bd83" stroke="#594565" stroke-width="1.5"
              stroke-linejoin="round"/>
        <path d="M${w+a*.06} ${V+10}V-19"
              stroke="#ffe4b8" stroke-width="1.5" stroke-linecap="round"/>`}).join("");return`
      ${u(67,l-42)}
      <ellipse cx="${o+2}" cy="${l-38}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>
      <ellipse cx="${o+a+2}" cy="${l+46}" rx="13" ry="5"
               fill="#221b4e" opacity=".12"/>

      <!-- Projection oblique : les lattes et l'axe des gonds restent verticaux. -->
      <g class="door-leaf"
         style="transform-origin:${o}px ${l-42}px;transform:matrix(1,0,0,1,0,0)">
        <g transform="matrix(1 ${84/a} 0 1 ${o} ${l-42})">
          ${k}
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

      ${u(l+44,322)}
      <rect x="${o-5}" y="${l-98}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <rect x="${o+a-5}" y="${l-14}" width="10" height="60" rx="5"
            fill="#edc28e" stroke="#594565" stroke-width="2.5"/>
      <path d="M${o-2} ${l-89}V${l-48}
               M${o+a-2} ${l-5}V${l+36}"
            stroke="#ffe4b8" stroke-width="2" stroke-linecap="round"/>
      <path d="M${o-5} ${l-77}H${o+5}
               M${o-5} ${l-54}H${o+5}"
            stroke="#594565" stroke-width="3" stroke-linecap="round"/>
      <path d="M${o-9} ${l-37}l-4 -6m4 6l5 -5
               M${o+a+7} ${l+47}l-3 -7m3 7l6 -4"
            fill="none" stroke="#739574" stroke-width="2" stroke-linecap="round"/>
      <rect class="obstacle-highlight" x="${o-21}" y="${l-108}"
            width="${a+42}" height="175" rx="18"
            fill="none" stroke="#5b477b" stroke-width="3" stroke-dasharray="7 7"/>`}function g(o,l,a){if(!["roka","ola"].includes(o))throw new TypeError("Acteur inconnu.");const u=$e({x:l,y:a},`actor.${o}`);return`
      <g class="actor-${o}" style="transform:translate(${u.x}px,${u.y}px)">
        <ellipse cx="1" cy="7" rx="34" ry="9" fill="#221b4e" opacity=".12"/>
        <g transform="scale(1.08)">
          <g class="character h-${o} idle" aria-hidden="true">
            ${Be[o]()}
          </g>
        </g>
        <g transform="translate(0 32)">
          <rect x="-31" y="-15" width="62" height="24" rx="12" fill="#fffaf0" opacity=".95"/>
          <text class="world-label" y="3">${De(Be.names[o])}</text>
        </g>
      </g>`}function h(o,l,a){const u=s.querySelector(o);u!==null&&u.setAttribute(l,a)}function re(o,l){const a=s.querySelector(o);a!==null&&(a.textContent=l)}function I(o,l){const a=pt(o),u=$e(l.roka,"state.roka");n={...o,positions:a},r=l,c=!1,e.innerHTML=`
      <svg viewBox="0 0 760 340" role="img" aria-labelledby="world-title world-description"
           xmlns="http://www.w3.org/2000/svg">
        <title id="world-title">${De(Q(B(),n.title))}</title>
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

        ${n.kind==="bridge"?b(a.obstacle):m(a.obstacle)}

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

        ${g("roka",u.x,u.y)}
        ${g("ola",a.ola.x,a.ola.y)}
        <g class="ola-response" visibility="hidden" transform="translate(${a.ola.x+28} ${a.ola.y-89})">
          <rect x="0" y="-18" width="87" height="30" rx="14" fill="#fffaf0" stroke="#847797" stroke-width="2"/>
          <text x="43" y="3" text-anchor="middle" fill="#221b4e" font-size="15" font-family="system-ui">${De(Q(B(),"Coucou !"))}</text>
        </g>
        <g transform="translate(380 28)">
          <rect x="-103" y="-17" width="206" height="33" rx="16" fill="#fffaf0" stroke="#847797" stroke-width="1.5"/>
          <text class="world-label obstacle-label" y="5"></text>
        </g>
      </svg>`;const k=e.querySelector("svg");if(k===null)throw new TypeError("La scène n’a pas pu être rendue.");return s=k,y(l,"initial")}function Y(o){const l=B();let a;return o.phase==="complete"?a=Q(l,n.text.success):o.phase==="crossing"?a=Q(l,n.text.crossing):o.obstacleOpen?a=Q(l,n.text.opened):a=Q(l,n.text.closed),o.beaconOn&&(a+=Q(B()," Balise allumée, avec des rayons.")),o.olaWaved&&(a+=Q(B()," Ola a répondu à la cloche.")),a}function p(o,l){const a=s.querySelector(`.h-${o}`);if(a!==null)for(const u of["idle","walk","think","win","sulk"])a.classList.toggle(u,u===l)}function y(o,l){const a=$e(o.roka,"state.roka");r=o;const u=s.querySelector(".actor-roka");u!==null&&(u.style.transform=`translate(${a.x}px,${a.y}px)`);const k=s.querySelector(".bridge-deck"),C=s.querySelector(".door-leaf");k!==null&&(k.style.transform=o.obstacleOpen?"rotate(0deg)":"rotate(-90deg)"),C!==null&&(C.style.transform=o.obstacleOpen?`matrix(1,${-84/n.positions.obstacle.width},0,1,0,0)`:"matrix(1,0,0,1,0,0)");const R=o.phase==="complete"?"win":o.phase==="crossing"?"walk":o.phase==="ready"&&o.lastCommand!==null?"think":"idle";p("roka",R),p("ola",o.phase==="complete"?"win":"idle"),h(".beacon-light","fill",o.beaconOn?"#ffb627":"#ded8e9"),h(".beacon-rays","visibility",o.beaconOn?"visible":"hidden"),h(".bell-marks","visibility",o.bellCount>0?"visible":"hidden"),h(".ola-response","visibility",o.olaWaved&&o.phase!=="complete"?"visible":"hidden"),h(".obstacle-highlight","visibility",o.obstacleOpen?"hidden":"visible"),h(".obstacle-highlight","stroke-width",c?"5":"3"),re(".obstacle-label",o.obstacleOpen?Q(B(),"✓ Passage libre"):n.kind==="bridge"?Q(B(),"! Pont replié"):Q(B(),"! Porte fermée"));const w=Y(o);return re("#world-description",w),{description:w,ringing:l==="rang"}}function _(){return c=!0,y(r,"highlight")}return Object.freeze({mount:I,update:y,highlightObstacle:_})}const pe="C01",fe="effects-v2.1",bn={opened:500,crossed:750,completed:0,rang:1e3,lit:450,settled:0},xn=900,dt={voyage:null,title:"Bravo !",finaleHidden:!0,announcement:"",gainText:"0 XP",totalText:"0 XP",levelText:"Niveau 1",progressValue:0,progressText:"0 sur 3 XP vers le niveau 2",nextText:"Encore 3 XP pour le niveau 2",nextHidden:!1,replayHidden:!0,rewardHidden:!0,nextStepHidden:!0,closePrimary:!1,hasGain:!1,isReplay:!1,levelUp:!1};function kn(e){const n=Object.fromEntries(e.scenes.map(i=>[i.id,i])),s=window.matchMedia("(prefers-reduced-motion: reduce)"),r=new Set;let c=null,b=null,m=!1,g=lt(),h=ot(),re={},I=null,Y=null,p=null,y=null,_=[],o=!1,l=null,a=null,u=!1,k=0,C=0,R=!1,w=0,H=!0,V=!1,G=null,A=0,M=null,Z=!1,me="Scène 1 sur 2",x=e.title,j="",O="",D=!1,T="Préparation de la scène…",S=null,K=!1,oe=!0,F=!0,Ce="",Xe="",Me="",Pe=!0,Ne=null,le=!1,We="Une démo à part. Elle ne change pas la scène.",ge="",Te="Le ventilateur est à l’arrêt.",be=!1,Se="Un ventilateur à l’arrêt",Le=!0,Re=!0,z="",xe=!1,U=dt,Oe=!1,Fe=!1,Ge=null,Ze=0,Ee;window.__c01_debug=window.__c01_debug??{runStarts:0};function He(){return p?.id==="porte"&&a===null}function ht(){return p!==null&&y!==null&&ne(p,y)}function ze(){const i=ht(),d=He(),f=p?.id??"pont",v=_[0]??null,N=(p?.commands??[]).map(P=>({id:P.id,label:P.label,code:P.code??"",icon:P.icon??"",pressed:v===P.id,executing:u&&v===P.id,disabled:u||i||d})),L=v===null?"":p?.commands.find(P=>P.id===v)?.code??"";return{ready:Z,chipText:`Niveau ${h.level} · ${h.xp} XP`,progressionXp:h.xp,sceneStep:me,activityTitle:x,instruction:e.instruction,sceneTitle:j,sceneDescription:O,sceneRinging:D,sceneBusy:u,currentSceneId:f,porteUnlocked:Ie(h,pe,"pont"),guideStep:u||i?3:_.length>0?2:1,guidePrepare:d?"Garde ta prévision":p?.id==="porte"?"Prévision gardée · Choisis ta commande":"Choisis ta commande",commands:N,paletteHidden:d,choiceInstruction:d?"D’abord, garde ta prévision. Les commandes apparaîtront ensuite.":"Choisis un seul bloc.",programContent:L,programGuidance:!o&&!d&&!i,clearDisabled:u||i||_.length===0,runDisabled:!Z||u||i||d,runLabel:u?"En cours…":"▶ Lancer",feedback:T,predictionHidden:oe,predictionFormHidden:K,predictionQuestion:p?.prediction?.question??"",predictionOptions:p?.prediction?.options??[],predictionSelected:S,predictionConfirmDisabled:S===null,resultHidden:F,resultTitle:Ce,resultText:Xe,evidenceText:Me,nextButtonHidden:Pe,earned:Ne,helpOpen:le,helpIntro:We,helpDisabled:!Z||u,helpFeedback:ge,demoFeedback:Te,demoRunning:be,demoLabel:Se,obstacleHelpHidden:Le,directHelpHidden:Re,storageStatus:z,eraseConfirm:xe,popup:U,popupOpen:Oe,popupFocusNextStep:Fe,focus:Ge}}function $(){Ee=ze();for(const i of r)i()}Ee=ze();function J(i){Ze+=1,Ge={selector:i,seq:Ze}}function ke(){H=!1,z="Sauvegarde indisponible. Tu peux jouer, mais tes progrès peuvent être perdus en quittant."}function mt(){H&&(cn(h,re)||ke())}function ee(){if(!H||p===null)return;an({version:1,sceneId:p.id,runNumber:C,statistics:g,trainingProof:I,lastCompletion:Y,program:[..._]})?z="Enregistré.":ke()}function gt(i){const d=n.pont;if(d===void 0||i?.sceneId!=="pont"||i.success!==!0)return null;const f=[...g.pont.attempts].reverse().find(N=>N.success&&N.command===d.openCommand);if(f===void 0)return null;const v=ct(d,at(d),[f.command]);return v.verdict.success?{sceneId:"pont",success:v.verdict.success,criteriaValidated:[...v.verdict.criteriaValidated],attempts:ie(g.pont.attempts),aidsUsed:[...g.pont.aids],verdictSource:"engine_replay_of_saved_success"}:null}function ie(i){return JSON.parse(JSON.stringify(i))}function bt(){const i=Object.fromEntries(e.scenes.map(f=>[f.id,f.commands.map(v=>v.id)])),d=on(i);if(d.kind==="unavailable"){ke();return}if(d.kind==="corrupt"){z="La sauvegarde du jeu n’est pas lisible. La scène repart du début.";return}d.kind!=="empty"&&(g=d.value.statistics,C=d.value.runNumber,I=gt(d.value.trainingProof),Y=d.value.lastCompletion,l={sceneId:d.value.sceneId,program:d.value.program??[]},V=!0)}function xt(){const i=ln();if(i.kind==="unavailable"){ke();return}if(i.kind==="corrupt"){z="La progression n’est pas lisible. Le compteur repart à zéro.";return}i.kind!=="empty"&&(re=i.value.extra,h=Gt(i.value.progression))}function Qe(){if(G===null)return;clearTimeout(G.timer);const{resolve:i}=G;G=null,i()}function _e(i){return s.matches||i===0?Promise.resolve():new Promise(d=>{G={timer:window.setTimeout(()=>{G=null,d()},i),resolve:d}})}function Ye(i){const d=i.getBoundingClientRect(),f=window.innerHeight||document.documentElement.clientHeight||0,v=Math.max(0,d.top),N=Math.min(f,d.bottom);return Math.max(0,N-v)/(d.height||1)}async function kt(){const i=b;i!==null&&(Ye(i)>=.6||(i.scrollIntoView({block:"center",inline:"nearest",behavior:s.matches?"instant":"smooth"}),await _e(300),b!==null&&Ye(b)<.6&&b.scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})))}function ve(i,d,f=d){const{level:v,filled:N,target:L,reached:P}=Zt(d);U={...U,gainText:M!==null&&M.delta===0?"XP déjà gagnés":`+${i} XP`,totalText:`${d} XP`,levelText:`Niveau ${v}`,progressValue:zt(f),progressText:P?`${L} sur ${L} XP : palier atteint, niveau ${v}`:`${N} sur ${L} XP vers le niveau ${v+1}`,nextText:P?`Palier rempli ! Niveau ${v} atteint.`:`Encore ${L-N} XP pour le niveau ${v+1}`}}function ae(){cancelAnimationFrame(A),A=0,M!==null&&(ve(M.delta,M.total),U={...U,rewardHidden:!M.reward},$())}function Ve(i=!0){cancelAnimationFrame(A),A=0,M!==null&&(ve(M.delta,M.total),U={...U,rewardHidden:!M.reward}),Oe=!1,U={...U,hasGain:!1,isReplay:!1},M=null,i&&!F&&J("#result-title"),$()}function Ke(){return p?.id==="pont"&&n.porte!==void 0}function vt(i){Ne={xpText:i.delta>0?`+${i.delta} XP · Niveau ${h.level}`:null,reward:i.reward}}function yt(i){Ve(!1),M=i;const d=Ke();if(U={...dt,voyage:i.voyage,title:d?"Bravo !":"Aventure réussie !",finaleHidden:d,nextStepHidden:!d,closePrimary:!d,rewardHidden:!0,replayHidden:i.delta!==0,nextHidden:i.delta===0,hasGain:i.delta>0,isReplay:i.delta===0,levelUp:i.delta>0&&qe(i.total)>qe(i.previous),announcement:(d?"Bravo ! ":"Bravo, tu as réussi le pont ET la porte ! ")+`${i.delta?`Tu gagnes ${i.delta} XP.`:"XP déjà gagnés."} Total : ${i.total} XP. Niveau ${qe(i.total)}.`},Fe=d,vt(i),ve(i.delta,i.previous),Oe=!0,$(),s.matches||i.delta===0){ae();return}const f=performance.now(),v=N=>{if(M===null)return;const L=Jt(i.previous,i.delta,N-f);ve(i.delta,L.total,L.avance),$(),L.fini?ae():A=requestAnimationFrame(v)};A=requestAnimationFrame(v)}function $t(i,d){try{const f=window;typeof f.WONDRA_TRACK=="function"&&f.WONDRA_TRACK(i,d)}catch{}}function jt(i){const d=Yt(h.awarded,i==="pont"?"C01:pont":"C01:porte"),f=Kt(h,pe,i);return $t("c01_scene_reussie",{scene:i,xp_delta:f.delta,nouvelle_reussite:f.fresh===!0}),f.fresh&&(h=f.progression,mt()),{voyage:d,previous:f.previous,total:f.total,delta:f.delta,reward:f.reward!==null}}function wt(){w=0,le=!1,Le=!0,Re=!0,ge="",Te="Le ventilateur est à l’arrêt.",be=!1,Se="Un ventilateur à l’arrêt",We=p?.id==="porte"?"Tu peux revoir la démo. À toi de trouver pour la porte !":"Une démo à part. Elle ne change pas la scène."}function ce(i){O=i.description,D=i.ringing}function de(i,d={}){const f=n[i];if(f===void 0)return;k+=1,Qe(),Ve(!1),u=!1,p=f,y=at(f),_=l?.sceneId===i?[...l.program]:[],l?.sceneId===i&&(l=null),o=_.length>0,a=null,R=!1,C+=1,me=i==="pont"?"Scène 1 sur 2":"Scène 2 sur 2",x=i==="pont"?e.title:f.title,rt(),j=f.title,F=!0,xe=!1,Ne=null,c!==null&&ce(c.mount(f,y)),oe=!(i==="porte"),K=!1,S=null,wt(),T=i==="porte"?"Garde ta prévision. Puis essaie une commande.":"Regarde le pont replié. Quelle commande peut aider Roka ?",d.persist!==!1&&ee(),d.focus===!0&&J(i==="porte"?"#prediction-title":"#palette button"),$()}function Ct(){u||!Ke()||p===null||y===null||!ne(p,y)||!Ie(h,pe,"pont")||de("porte",{focus:!0})}function Je(i,d){i.push(d),i.length>200&&i.shift()}function et(i){return i==="porte"?g.porte:g.pont}function Ae(i){if(p===null)return;const d=et(p.id).aids;d.includes(i)||d.push(i),ee()}function Mt(){if(p===null||y===null)return null;const i=g.porte.predictions[0]??null,d=i?.value??null,f=g.porte.attempts[0]??null,v=je(p,y),N=[...new Set([...I?.success===!0?I.criteriaValidated:[],...v.criteriaValidated])];return a==="opening"&&N.push("prediction_correct"),{sceneId:p.id,criteriaValidated:N,training:ie(I),transfer:{sceneId:"porte",success:v.success,criteriaValidated:[...v.criteriaValidated],prediction:a,predictionCorrect:a==="opening",predictionProtocol:fe,firstRecordedPrediction:d,firstRecordedPredictionProtocol:i?.protocol??"legacy_unknown",firstRecordedCommand:f===null?null:f.command,attempts:ie(g.porte.attempts),predictions:ie(g.porte.predictions),observation:v.success?"automatic_crossing_after_one_command":null,responseHintProvided:!1},aidsUsed:{pont:[...g.pont.aids],porte:[...g.porte.aids]},transferOnFirstRecordedAttempt:i?.protocol===fe&&d==="opening"&&f!==null&&f.predictionProtocol===fe&&f.prediction==="opening"&&f.run===i.run&&f.command===p.openCommand&&f.success&&v.success&&g.porte.attempts.length===1}}function Pt(i){try{const d=window.WondraProgression;if(typeof d?.onActivityCompleted=="function"){const f=d.onActivityCompleted({activity:pe,evidence:ie(i)});f!==null&&typeof f?.then=="function"&&Promise.resolve(f).catch(()=>{})}}catch{}}function Nt(){if(p===null||y===null)return;F=!1,Xe=p.text.success;let i=null;if(p.id==="pont"){const f=je(p,y);I={sceneId:"pont",success:f.success,criteriaValidated:[...f.criteriaValidated],attempts:ie(g.pont.attempts),aidsUsed:[...g.pont.aids],verdictSource:"engine_verdict_of_reached_state"},Ce="Roka a rejoint Ola !",Me="Une commande, une action. Étape suivante : la porte.",Pe=!1}else{Ce="Le passage est réussi !",Pe=!0;const f=p.prediction?.options.find(v=>v.id===a);Me=a==="opening"?"Tu avais prévu un chemin jusqu’à l’autre côté. Le passage est devenu libre et Roka a rejoint Ola.":`Ta prévision : « ${f?.label??""} » Tu as observé un passage devenu libre, puis Roka a rejoint Ola.`,!R&&I?.success===!0&&(R=!0,Y=Mt(),i=Y)}const d=jt(p.id);ee(),yt(d),i!==null&&Pt(i)}function Tt(i){return p===null?null:{opened:p.text.opened,crossed:p.text.crossing,completed:p.text.success,rang:p.text.ring,lit:p.text.light}[i]??null}async function St(){if(p===null||y===null||u||He()||ne(p,y))return;const i=ct(p,y,_);if(i.reason==="empty"){T="Choisis un bloc avant de lancer.",J("#palette button"),$();return}if(i.reason!=="executed"){T="Choisis un des trois blocs pour essayer.",$();return}p.id==="pont"&&(I=null),u=!0;const d=++k;if($(),await kt(),d!==k)return;const f=window.__c01_debug;f!==void 0&&(f.runStarts+=1);const v=C,N=_[0]??"",L=p;$();try{for(const P of i.steps){if(d!==k)return;y=P.state,c!==null&&ce(c.update(P.state,P.event));const st=Tt(P.event);if(st!==null&&(T=st),$(),await _e(bn[P.event]??0),d!==k)return}if(Je(et(L.id).attempts,{run:v,command:N,prediction:a,predictionProtocol:L.id==="porte"?fe:null,success:i.verdict.success}),i.verdict.success){if(await _e(xn),d!==k)return;Nt()}else ee(),T=`${N==="sonner"?L.text.ring:L.text.light} Essaie une autre commande.`}finally{d===k&&(u=!1,$())}}function Lt(i){if(p===null||y===null||u||He()||ne(p,y))return;const d=p.commands.find(f=>f.id===i);d!==void 0&&(_=[d.id],o=!0,ee(),T=`${d.label}. Maintenant, appuie sur « Lancer ».`,$())}function Rt(){p===null||y===null||u||ne(p,y)||(_=[],o=!0,ee(),T="Le programme est vide. Choisis un bloc.",$())}function Ot(i){S=i,$()}function Et(){u||a!==null||p?.id!=="porte"||S!==null&&(a=S,Je(g.porte.predictions,{run:C,value:a,protocol:fe}),K=!0,oe=!0,T="Ta prévision est gardée. Choisis une commande.",ee(),J("#palette button"),$())}function Ht(){u||(le=!le,le&&J("#demo-button"),$())}function Qt(){u||(Ae("demo"),w=Math.max(w,1),be=!1,$(),be=!0,Se="Le ventilateur tourne après la commande",Te="tourner_ventilateur() fait tourner le ventilateur. Une commande, une action.",p?.id==="pont"&&(Le=!1),$())}function _t(){u||p?.id!=="pont"||w<1||(Ae("obstacle"),w=2,c!==null&&ce(c.highlightObstacle()),ge=p.text.highlight??"",Re=!1,$())}function Vt(){u||p?.id!=="pont"||w<2||(Ae("direct"),w=3,ge=p.text.direct??"",$())}function At(){xe=!0,J("#erase-yes"),$()}function It(){xe=!1,J("#erase-button"),$()}function qt(){const i=sn();H=i,g=lt(),h=ot(),re={},I=null,Y=null,C=0,l=null,de("pont",{focus:!0,persist:!1}),z=i?"Tout est effacé. Niveau 1 · 0 XP. On repart du début.":"Le jeu repart à zéro ici. Le navigateur n’a pas pu effacer toutes les sauvegardes.",$()}function Dt(i){u||i==="porte"&&!Ie(h,pe,"pont")||de(i)}function Ut(){p!==null&&de(p.id,{focus:!0})}function tt(i){i.matches&&(Qe(),ae())}let ye=!1;function nt(){ye||typeof s.addEventListener!="function"||(s.addEventListener("change",tt),ye=!0)}nt();let ue=null;function rt(){document.title=Q(B(),"WONDRA — {titre}",{titre:Q(B(),x)})}function Bt(){rt(),c!==null&&p!==null&&y!==null&&ce(c.mount(p,y))}function it(){ue===null&&(ue=Ft(Bt))}it();function Xt(){Qe(),ae(),ye&&typeof s.removeEventListener=="function"&&(s.removeEventListener("change",tt),ye=!1),ue!==null&&(ue(),ue=null)}function Wt(i){if(nt(),it(),b=i,c=gn(i),m){p!==null&&y!==null&&ce(c.mount(p,y)),$();return}m=!0,bt(),xt(),de("pont",{persist:!1}),Z=!0,V&&z===""&&(z="Sauvegarde retrouvée. La scène repart au début ; tes progrès sont gardés."),$()}return{subscribe(i){return r.add(i),()=>{r.delete(i)}},getSnapshot:()=>Ee,attach:Wt,stop:Xt,selectScene:Dt,selectCommand:Lt,clearProgram:Rt,touchProgram:()=>{o=!0,$()},run:St,restart:Ut,goToNextExercise:Ct,selectPrediction:Ot,confirmPrediction:Et,toggleHelp:Ht,playDemo:Qt,showObstacleHelp:_t,showDirectHelp:Vt,askErase:At,cancelErase:It,confirmErase:qt,closePopup:Ve,finishPopup:ae}}const vn=1,yn="C01",$n="fr",jn="Le pont de Roka",wn="Aide Roka à rejoindre Ola.",Cn=[{id:"pont",kind:"bridge",title:"Le canal",openCommand:"ouvrir_pont",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:310,y:204,width:140},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"ouvrir_pont",label:"Ouvrir le pont",icon:"bridge",code:"ouvrir_pont()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"},{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"}],text:{closed:"Obstacle : le pont est replié. Roka ne peut pas passer.",opened:"Le pont se déplie. Le passage est ouvert.",crossing:"Le pont est ouvert. Roka traverse tout seul.",success:"La commande a déplié le pont. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. Le pont reste replié.",light:"La balise est allumée. Le pont reste replié.",highlight:"Regarde le pont debout : il bloque le passage.",direct:"Choisis « Ouvrir le pont », puis « Lancer ». Le pont se déplie. Roka traverse tout seul."}},{id:"porte",kind:"door",title:"La porte du jardin",openCommand:"ouvrir_porte",positions:{roka:{x:218,y:215},goal:{x:516,y:215},ola:{x:618,y:212},obstacle:{x:364,y:204,width:40},beacon:{x:555,y:106},bell:{x:169,y:106}},commands:[{id:"allumer",label:"Allumer",icon:"💡",code:"allumer()"},{id:"ouvrir_porte",label:"Ouvrir la porte",icon:"🚪",code:"ouvrir_porte()"},{id:"sonner",label:"Sonner",icon:"🔔",code:"sonner()"}],prediction:{question:"Pour que Roka rejoigne Ola, quel résultat faut-il obtenir ?",options:[{id:"bell",label:"Ola vient chercher Roka."},{id:"beacon",label:"Roka reste au même endroit."},{id:"opening",label:"Un chemin se crée jusqu’à l’autre côté."}]},text:{closed:"Obstacle : la porte est fermée. Roka ne peut pas passer.",opened:"La porte s’ouvre. Le passage est libre.",crossing:"La porte est ouverte. Roka traverse tout seul.",success:"La commande a ouvert la porte. Roka a traversé tout seul.",ring:"La cloche a sonné. Ola a répondu. La porte reste fermée.",light:"La balise est allumée. La porte reste fermée."}}],Mn={version:vn,activity:yn,locale:$n,title:jn,instruction:wn,scenes:Cn},Pn={C01:Mn};class X extends Error{constructor(n){super(n),this.name="ContentError"}}function se(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function W(e,n,s){const r=e[n];if(typeof r!="string"||r.length===0)throw new X(`${s} : le champ « ${n} » doit être une chaîne non vide.`);return r}function Nn(e,n){if(!se(e))throw new X(`${n} : commande invalide.`);const s={id:W(e,"id",n),label:W(e,"label",n)};return typeof e.icon=="string"&&(s.icon=e.icon),typeof e.code=="string"&&(s.code=e.code),s}function Tn(e,n){if(!se(e))throw new X(`${n} : exercice invalide.`);const s=W(e,"id",n),r=`${n} → « ${s} »`,c=e.commands;if(!Array.isArray(c)||c.length===0)throw new X(`${r} : au moins une commande est requise.`);const b=c.map(h=>Nn(h,r)),m=W(e,"openCommand",r);if(!b.some(h=>h.id===m))throw new X(`${r} : la commande d’ouverture « ${m} » ne figure pas dans les commandes.`);const g={id:s,kind:W(e,"kind",r),title:W(e,"title",r),openCommand:m,commands:b};return se(e.positions)&&(g.positions=e.positions),se(e.text)&&(g.text=e.text),se(e.prediction)&&(g.prediction=e.prediction),g}function Sn(e){if(!se(e))throw new X("Niveau : la racine doit être un objet.");const n=W(e,"activity","Niveau"),s=`Niveau « ${n} »`;if(!Number.isSafeInteger(e.version)||e.version<1)throw new X(`${s} : le champ « version » doit être un entier ≥ 1.`);const r=e.scenes;if(!Array.isArray(r)||r.length===0)throw new X(`${s} : au moins un exercice est requis.`);const c=r.map(m=>Tn(m,s));if(new Set(c.map(m=>m.id)).size!==c.length)throw new X(`${s} : deux exercices portent le même identifiant.`);return{version:e.version,activity:n,locale:W(e,"locale",s),title:W(e,"title",s),instruction:W(e,"instruction",s),scenes:c}}function Ln(e){const n=Pn[e];if(n===void 0)throw new X(`Niveau inconnu : « ${e} ».`);return Sn(n)}const Rn=["closed","opened","crossing","success","ring","light"],On=["highlight","direct"];function En(e){const n=e.text??{},s={};for(const r of Rn){const c=n[r];if(typeof c!="string"||c.length===0)throw new TypeError(`Texte manquant : ${e.id}.${r}`);s[r]=c}for(const r of On){const c=n[r];typeof c=="string"&&(s[r]=c)}return s}function Hn(e){if(e.kind!=="bridge"&&e.kind!=="door")throw new TypeError(`Type de scène invalide : ${e.id}`);const n={id:e.id,kind:e.kind,title:e.title,openCommand:e.openCommand,positions:pt(e),commands:e.commands,text:En(e)};return e.prediction!==void 0?{...n,prediction:e.prediction}:n}function Qn(){const e=Ln("C01");if(e.scenes.length!==2||!["pont","porte"].every(n=>e.scenes.filter(s=>s.id===n).length===1))throw new TypeError("Scènes invalides.");return{version:e.version,activity:e.activity,locale:e.locale,title:e.title,instruction:e.instruction,scenes:e.scenes.map(Hn)}}function _n(){try{return kn(Qn())}catch{return null}}function Vn(){const e=E.useRef(null);e.current??={controller:_n()};const n=e.current.controller,s=E.useCallback(h=>n===null?()=>{}:n.subscribe(h),[n]),r=E.useCallback(()=>n===null?null:n.getSnapshot(),[n]),c=E.useSyncExternalStore(s,r),b=E.useCallback(h=>{h!==null&&n!==null&&n.attach(h)},[n]);E.useEffect(()=>{window.WondraCharacters=Be},[]),E.useEffect(()=>{const h=document.title;return()=>{document.title=h}},[]),E.useEffect(()=>{if(n===null)return;const h=()=>{n.stop()};return window.addEventListener("pagehide",h),()=>{window.removeEventListener("pagehide",h),h()}},[n]);const m=E.useRef(0),g=c?.focus??null;return E.useEffect(()=>{if(g===null||g.seq===m.current)return;m.current=g.seq;const h=document.querySelector(g.selector);h!==null&&(h.focus({preventScroll:!0}),h.scrollIntoView({block:"center",inline:"nearest",behavior:"instant"}))},[g]),{controller:n,snapshot:c,sceneRef:b}}function he(){return t.jsxs("svg",{className:"crystal-icon",viewBox:"0 0 32 40","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"M16 2 27 11 29 25 16 38 3 25 5 11Z",fill:"#c9bcf0",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),t.jsx("path",{d:"M16 2 10 15 16 38 22 15Z",fill:"#eee7ff"}),t.jsx("path",{d:"M3 25 10 15 16 38M29 25 22 15 16 38M5 11 10 15 22 15 27 11M16 2 22 15",fill:"none",stroke:"#8067aa",strokeWidth:"1.3",strokeLinejoin:"round"}),t.jsx("path",{d:"m12 10 3-4",fill:"none",stroke:"white",strokeWidth:"2",strokeLinecap:"round"})]})}function ft(){return t.jsxs("svg",{className:"reward-icon",viewBox:"0 0 40 40","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"m24 25 10 10",fill:"none",stroke:"#594565",strokeWidth:"8",strokeLinecap:"round"}),t.jsx("path",{d:"m25 26 8 8",fill:"none",stroke:"#edc28e",strokeWidth:"4",strokeLinecap:"round"}),t.jsx("circle",{cx:"16",cy:"16",r:"12",fill:"#edc28e",stroke:"#594565",strokeWidth:"2"}),t.jsx("circle",{cx:"16",cy:"16",r:"8.5",fill:"#dceff3",stroke:"#8067aa",strokeWidth:"1.5"}),t.jsx("path",{d:"M11 16a5 5 0 0 1 5-5",fill:"none",stroke:"white",strokeWidth:"2.5",strokeLinecap:"round"})]})}function An(){return t.jsxs("svg",{viewBox:"0 0 32 32","aria-hidden":"true",focusable:"false",children:[t.jsx("path",{d:"M2 27Q6 24 10 27T18 27T26 27T30 27",fill:"none",stroke:"#74afb9",strokeWidth:"2"}),t.jsx("path",{d:"M3 20Q16 7 29 20L29 24Q16 13 3 24Z",fill:"#edc28e",stroke:"#594565",strokeWidth:"2",strokeLinejoin:"round"}),t.jsx("path",{d:"M3 20V12M29 20V12M3 14Q16 1 29 14M10 13V8M22 13V8",fill:"none",stroke:"#8a5e46",strokeWidth:"2",strokeLinecap:"round"})]})}function In({snapshot:e,controller:n}){const s=q();return t.jsx("div",{id:"palette",className:"palette wondra-guidance","data-guidance":e.programGuidance,onPointerDown:()=>n.touchProgram(),onKeyDown:()=>n.touchProgram(),role:"group","aria-label":s("Les trois commandes"),hidden:e.paletteHidden,children:e.commands.map(r=>t.jsxs("button",{type:"button",className:r.executing?"command executing":"command","data-command":r.id,"aria-pressed":r.pressed,"aria-label":s(r.label),disabled:r.disabled,onClick:()=>n.selectCommand(r.id),children:[t.jsx("span",{className:"icon","aria-hidden":"true",children:r.icon==="bridge"?t.jsx(An,{}):r.icon}),t.jsxs("span",{children:[t.jsx("strong",{children:s(r.label)}),t.jsx("code",{children:r.code})]}),t.jsx("span",{className:"check","aria-hidden":"true",children:"✓"})]},r.id))})}function qn({snapshot:e,controller:n}){const s=q();return t.jsxs("section",{id:"prediction-panel",className:"prediction-panel",hidden:e.predictionHidden,"aria-labelledby":"prediction-title",children:[t.jsx("h2",{id:"prediction-title",tabIndex:-1,children:s("D’abord, à ton avis…")}),t.jsxs("form",{id:"prediction-form",hidden:e.predictionFormHidden,onSubmit:r=>{r.preventDefault(),n.confirmPrediction()},children:[t.jsxs("fieldset",{children:[t.jsx("legend",{id:"prediction-question",children:s(e.predictionQuestion)}),t.jsx("div",{id:"prediction-options",children:e.predictionOptions.map(r=>t.jsxs("label",{className:"prediction-option",children:[t.jsx("input",{type:"radio",name:"prediction",value:r.id,required:!0,checked:e.predictionSelected===r.id,onChange:()=>n.selectPrediction(r.id)}),t.jsx("span",{children:s(r.label)})]},r.id))})]}),t.jsx("button",{id:"prediction-confirm",type:"submit",disabled:e.predictionConfirmDisabled,children:s("Garder ma prévision")})]}),t.jsx("p",{id:"prediction-summary",hidden:!0})]})}function Dn({snapshot:e,controller:n}){const s=dn(e.programContent),r=q();return t.jsxs("section",{className:"control-panel","aria-labelledby":"program-title",children:[t.jsx(qn,{snapshot:e,controller:n}),t.jsx("h2",{id:"program-title",children:r("Mon programme")}),t.jsx("p",{id:"choice-instruction",children:r(e.choiceInstruction)}),t.jsx(In,{snapshot:e,controller:n}),t.jsxs("div",{id:"c01-code-window",hidden:e.paletteHidden,children:[t.jsxs("header",{children:[t.jsxs("span",{"aria-hidden":"true",style:{display:"inline-flex",gap:6},children:[t.jsx("span",{style:{width:10,height:10,borderRadius:9999,background:"#e24e6b"}}),t.jsx("span",{style:{width:10,height:10,borderRadius:9999,background:"#ffb627"}}),t.jsx("span",{style:{width:10,height:10,borderRadius:9999,background:"#6fce9a"}})]}),t.jsx("span",{children:"passage.wondra"}),t.jsx("span",{className:"wondra-code-badge",children:r("Ta commande")})]}),t.jsxs("div",{className:"c01-code-protected","aria-label":r("Code protégé"),children:["🔒 ",r("quand_je_lance :")]}),t.jsxs("div",{className:"program-slot",children:[t.jsx("span",{className:"slot-number","aria-hidden":"true",children:"1"}),t.jsx("code",{id:"program-content",className:"wondra-code-line","data-blink":s.active,"data-executing":e.sceneBusy,children:e.programContent},s.revision),e.programContent===""?t.jsx("span",{id:"program-placeholder",className:"c01-code-invite",children:r("Place une commande ici.")}):null,t.jsx("button",{id:"clear-button",type:"button",disabled:e.clearDisabled,"aria-label":r("Vider le programme"),onClick:()=>n.clearProgram(),children:r("Vider")})]}),t.jsxs("div",{className:"c01-code-protected",children:["🔒 ",r("fin")]})]}),t.jsxs("div",{className:"actions",children:[t.jsx("button",{id:"run-button",className:"primary",type:"button",disabled:e.runDisabled,onClick:()=>{n.run()},children:r(e.runLabel)}),t.jsxs("button",{id:"restart-button",type:"button",disabled:!e.ready,onClick:()=>n.restart(),children:["↺ ",r("Recommencer")]})]}),t.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:r(e.feedback)})]})}function Un({snapshot:e,controller:n}){const s=E.useRef(null),r=q();function c(){const b=s.current;b!==null&&(b.classList.remove("running"),b.getBoundingClientRect(),b.classList.add("running")),n.playDemo()}return t.jsxs("section",{className:"help-section","aria-labelledby":"help-title",children:[t.jsxs("div",{className:"section-heading",children:[t.jsx("h2",{id:"help-title",children:r("Besoin d’un indice ?")}),t.jsx("button",{id:"help-button",type:"button","aria-expanded":e.helpOpen,"aria-controls":"help-panel",disabled:e.helpDisabled,onClick:()=>n.toggleHelp(),children:r(e.helpOpen?"Refermer":"Voir un indice")})]}),t.jsxs("div",{id:"help-panel",className:"help-panel",hidden:!e.helpOpen,children:[t.jsx("p",{id:"help-intro",children:r(e.helpIntro)}),t.jsxs("div",{className:"demo",children:[t.jsxs("svg",{id:"demo-fan",ref:s,className:e.demoRunning?"running":"",viewBox:"0 0 120 110",width:"120",height:"110",role:"img","aria-label":r(e.demoLabel),children:[t.jsx("path",{d:"M60 62V95M38 99H82",fill:"none",stroke:"#221b4e",strokeWidth:"7",strokeLinecap:"round"}),t.jsx("circle",{cx:"60",cy:"44",r:"36",fill:"#f0ecfa",stroke:"#221b4e",strokeWidth:"4"}),t.jsx("g",{className:"fan-blades",children:t.jsx("path",{d:`M60 44C39 40 38 15 52 16C65 17 65 31 60 44
                       M60 44C73 26 96 34 88 47C81 57 68 51 60 44
                       M60 44C68 65 50 81 42 69C35 58 47 48 60 44`,fill:"#7ba7f0",stroke:"#221b4e",strokeWidth:"2"})}),t.jsx("circle",{cx:"60",cy:"44",r:"6",fill:"#221b4e"})]}),t.jsxs("div",{children:[t.jsx("p",{children:t.jsx("code",{children:"tourner_ventilateur()"})}),t.jsxs("button",{id:"demo-button",type:"button",disabled:e.helpDisabled,onClick:c,children:["▶ ",r("Voir tourner")]}),t.jsx("p",{id:"demo-feedback",role:"status",children:r(e.demoFeedback)})]})]}),t.jsxs("div",{className:"actions",children:[t.jsx("button",{id:"obstacle-help-button",type:"button",hidden:e.obstacleHelpHidden,disabled:e.helpDisabled,onClick:()=>n.showObstacleHelp(),children:r("Regarde l’obstacle")}),t.jsx("button",{id:"direct-help-button",type:"button",hidden:e.directHelpHidden,disabled:e.helpDisabled,onClick:()=>n.showDirectHelp(),children:r("Un indice de plus")})]}),t.jsx("p",{id:"help-feedback",role:"status",children:r(e.helpFeedback)})]})]})}function Bn({snapshot:e,controller:n,onExit:s}){const r=q();return t.jsxs("footer",{className:"page-footer",children:[t.jsxs("div",{className:"c01-info-card",children:[t.jsx("strong",{children:r("Ton Carnet garde tes découvertes")}),t.jsx("p",{children:r("Tu retrouveras ici tes XP et tes outils. Rien ne se dépense.")})]}),t.jsx("p",{id:"storage-status",role:"status",children:r(e.storageStatus)}),t.jsx("button",{id:"erase-button",type:"button",disabled:!e.ready,onClick:()=>n.askErase(),children:r("Effacer la sauvegarde")}),t.jsxs("div",{id:"erase-confirmation",className:"erase-confirmation",hidden:!e.eraseConfirm,children:[t.jsx("p",{children:r("Effacer les essais, les XP et les cristaux ? Cette action ne peut pas être annulée.")}),t.jsx("button",{id:"erase-yes",type:"button",onClick:()=>n.confirmErase(),children:r("Oui, tout effacer")}),t.jsx("button",{id:"erase-no",type:"button",onClick:()=>n.cancelErase(),children:r("Non, garder")})]}),s===void 0?null:t.jsxs("button",{id:"exit-button",type:"button",onClick:s,children:["← ",r("Revenir à l’accueil")]})]})}function Xn({snapshot:e}){const{earned:n}=e,s=q();return n===null?t.jsx("p",{id:"earned-summary",className:"earned-summary"}):t.jsxs("p",{id:"earned-summary",className:"earned-summary",children:[n.xpText===null?s("Bravo ! Les XP de cette scène sont déjà gagnés."):t.jsxs("span",{className:"earned-item",children:[t.jsx(he,{}),t.jsx("span",{children:s(n.xpText)})]}),n.reward?t.jsxs("span",{className:"earned-item",children:[t.jsx(ft,{}),t.jsx("span",{children:s("Tu as gagné : la Loupe du créateur")})]}):null]})}function Wn({snapshot:e,controller:n}){const s=q();return t.jsxs("section",{id:"result-panel",className:"result-panel",hidden:e.resultHidden,"aria-labelledby":"result-title",children:[t.jsx(ut,{state:"win"}),t.jsxs("p",{className:"eyebrow",children:["✓ ",s("Passage réussi")]}),t.jsx("h2",{id:"result-title",tabIndex:-1,children:s(e.resultTitle)}),t.jsx("p",{id:"result-text",children:s(e.resultText)}),t.jsx("p",{id:"evidence-text",children:s(e.evidenceText)}),t.jsx(Xn,{snapshot:e}),t.jsx(un,{exercice:"C01"}),t.jsx("button",{id:"next-button",className:"primary",type:"button",hidden:e.nextButtonHidden,onClick:()=>n.goToNextExercise(),children:s("Étape suivante : la porte →")})]})}function Fn({snapshot:e,controller:n}){const{currentSceneId:s,porteUnlocked:r}=e,c=q();return t.jsxs("div",{id:"exercise-switch",className:"exercise-switch",role:"group","aria-label":c("Choisir l’exercice"),children:[t.jsxs("button",{id:"ex-pont",type:"button",className:s==="pont"?"active":"","aria-current":s==="pont"?"true":void 0,onClick:()=>n.selectScene("pont"),children:["1 · ",c("Le pont")]}),t.jsxs("button",{id:"ex-porte",type:"button",className:s==="porte"?"active":"","aria-current":s==="porte"?"true":void 0,disabled:!r,title:r?"":c("Réussis d’abord le pont."),"aria-label":r?void 0:c("Réussis d’abord le pont."),onClick:()=>n.selectScene("porte"),children:["2 · ",c("La porte")]})]})}function Gn({snapshot:e,controller:n,sceneRef:s}){const r=q();return t.jsxs("section",{className:"scene-panel","aria-labelledby":"scene-title",children:[t.jsxs("div",{className:"scene-heading",children:[t.jsx("h2",{id:"scene-title",children:r(e.sceneTitle)}),t.jsx("span",{className:"scene-tag",children:r("Une commande → une action")})]}),t.jsx(Fn,{snapshot:e,controller:n}),t.jsx("div",{id:"scene",className:e.sceneRinging?"scene ringing":"scene","aria-busy":e.sceneBusy,ref:s}),t.jsx("p",{id:"scene-description",className:"scene-description",children:r(e.sceneDescription)})]})}function Zn({snapshot:e,controller:n}){const s=E.useRef(null),{popup:r,popupOpen:c,popupFocusNextStep:b}=e,m=q();E.useEffect(()=>{const h=s.current;h!==null&&(c&&!h.open?(h.showModal(),document.getElementById("xp-title")?.focus()):!c&&h.open&&h.close())},[c,b]);const g=[r.hasGain?"has-gain":"",r.isReplay?"is-replay":""].filter(h=>h!=="").join(" ");return t.jsxs("dialog",{id:"xp-popup",ref:s,className:g,"aria-labelledby":"xp-title","aria-describedby":"xp-announcement",onClose:()=>{c&&n.closePopup()},onCancel:h=>{h.preventDefault(),n.closePopup()},children:[t.jsx("div",{className:"popup-emblem","aria-hidden":"true",children:t.jsx(ut,{state:"win"})}),t.jsx("h2",{id:"xp-title",tabIndex:-1,autoFocus:!0,children:m(r.title)}),t.jsx("p",{id:"xp-finale",className:"popup-finale",hidden:r.finaleHidden,children:m("Bravo, tu as réussi le pont ET la porte !")}),t.jsx("p",{id:"xp-announcement",className:"sr-only",children:m(r.announcement)}),t.jsxs("div",{className:"xp-numbers","aria-hidden":"true",children:[t.jsxs("p",{id:"xp-gain","data-etat":r.hasGain?"gain":"repos",children:[t.jsx(he,{}),t.jsx("span",{id:"xp-gain-text",children:m(r.gainText)})]}),t.jsxs("p",{className:"xp-total-line",children:[m("Total :"),t.jsxs("strong",{id:"xp-total",children:[t.jsx(he,{}),t.jsx("span",{id:"xp-total-text",children:m(r.totalText)})]})]}),t.jsx("p",{id:"popup-level",children:m(r.levelText)})]}),t.jsx("label",{className:"sr-only",htmlFor:"xp-progress",children:m("Progression du palier de niveau")}),t.jsxs("div",{className:"xp-progress-row",children:[t.jsx(he,{}),t.jsx("progress",{id:"xp-progress",max:en,value:r.progressValue,"aria-valuetext":m(r.progressText)})]}),t.jsx("p",{id:"xp-next",className:"[font-variant-numeric:tabular-nums]",hidden:r.nextHidden,children:m(r.nextText)}),t.jsx("p",{id:"xp-replay",hidden:r.replayHidden,children:m("Ces XP sont déjà dans ton Carnet.")}),t.jsxs("p",{id:"reward-toast",className:"reward-toast",role:"status","aria-atomic":"true",hidden:r.rewardHidden,children:[t.jsx(ft,{}),t.jsx("span",{children:m("Tu as gagné : la Loupe du créateur")})]}),r.hasGain&&r.voyage!==null?t.jsx(tn,{voyage:r.voyage}):null,t.jsxs("div",{className:"popup-actions",children:[t.jsx("button",{id:"xp-next-step",className:"primary",type:"button",hidden:r.nextStepHidden,onClick:()=>n.goToNextExercise(),children:m("Étape suivante : la porte →")}),t.jsx("button",{id:"xp-close",type:"button",className:r.closePrimary?"primary":"",onClick:()=>n.closePopup(),children:m("Voir mon résultat")})]})]})}function Ue({step:e,current:n,children:s}){return t.jsxs("li",{"data-guide-step":e,"aria-current":e===n?"step":void 0,children:[t.jsx("b",{children:e})," ",s]})}function Kn({onExit:e}){const{controller:n,snapshot:s,sceneRef:r}=Vn(),c=q(),[b,m]=E.useState(!1),g=pn(s!==null&&s.ready?s.progressionXp:null);return n===null||s===null?t.jsx("main",{children:t.jsx("p",{id:"feedback",className:"feedback",role:"status","aria-live":"polite","aria-atomic":"true",children:c("La scène ne peut pas être chargée. Ses données doivent être vérifiées.")})}):t.jsxs("div",{className:"c01-page",children:[t.jsxs("header",{className:"page-header",children:[t.jsxs("p",{className:"brand",children:["WONDRA",t.jsx("span",{children:c("CREATE · Mon premier programme")})]}),t.jsx("div",{className:"page-header-tools",children:t.jsxs("p",{id:"level-chip",className:"level-chip","data-en-montee":g.enMontee?"true":"false",children:[t.jsx(he,{}),t.jsx("span",{id:"level-chip-text",children:c(g.text)})]})})]}),t.jsxs("main",{children:[t.jsxs("header",{className:"activity-header",children:[t.jsx("p",{id:"scene-step",className:"eyebrow",children:c(s.sceneStep)}),t.jsx("h1",{id:"activity-title",children:c(s.activityTitle)}),t.jsx("p",{id:"instruction",className:"instruction",children:c(s.instruction)})]}),t.jsxs("nav",{className:"c01-settings-menu","aria-label":c("Aide et informations"),children:[t.jsx("button",{type:"button","aria-expanded":s.helpOpen,"aria-controls":"help-panel",disabled:s.helpDisabled,onClick:()=>n.toggleHelp(),children:c("Aide")}),t.jsxs("details",{className:"c01-secondary",children:[t.jsxs("summary",{children:["🎯 ",c("Objectif")]}),t.jsxs("ol",{className:"guide","aria-label":c("Les trois temps de ton programme"),children:[t.jsx(Ue,{step:1,current:s.guideStep===1?1:0,children:t.jsx("span",{id:"guide-prepare",children:c(s.guidePrepare)})}),t.jsx(Ue,{step:2,current:s.guideStep,children:c("Lance")}),t.jsx(Ue,{step:3,current:s.guideStep,children:c("Regarde ce qui se passe")})]})]}),t.jsxs("details",{id:"c01-infos",className:"c01-secondary",children:[t.jsxs("summary",{children:["ℹ ",c("Infos")]}),t.jsx(Bn,{snapshot:s,controller:n,onExit:e})]}),t.jsx(nn,{prefix:"c01",ouvert:b,basculer:()=>m(!b)})]}),t.jsx(rn,{prefix:"c01",ouvert:b,fermer:()=>m(!1),className:"c01-reglages-panel"}),t.jsxs("div",{className:"game-layout",children:[t.jsx(Gn,{snapshot:s,controller:n,sceneRef:r}),t.jsx(Wn,{snapshot:s,controller:n}),t.jsx(Dn,{snapshot:s,controller:n})]}),t.jsx(Un,{snapshot:s,controller:n})]}),t.jsx(Zn,{snapshot:s,controller:n})]})}export{Kn as default};
