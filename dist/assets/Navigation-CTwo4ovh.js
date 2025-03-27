import{c as l,r as c,j as e,L as d,C as x,G as m,N as a}from"./index-Cszak3U1.js";import{X as g}from"./x-DpWnyKc3.js";import{M as h}from"./map-DeECZ_-F.js";import{P as p}from"./plus-54wbS2Oi.js";/**
 * @license lucide-react v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],b=l("house",u);/**
 * @license lucide-react v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],j=l("menu",f),v=""+new URL("logo-CKOKaMNT.png",import.meta.url).href;function C(){const[s,r]=c.useState(!1),o=[{to:"/",icon:b,label:"Home",description:"Cultural Insights"},{to:"/map",icon:h,label:"Cultural Map",description:"Regional Diversity"},{to:"/festivals",icon:x,label:"Festivals",description:"Celebrate Traditions"},{to:"/quiz",icon:m,label:"Cultural Quiz",description:"Test Knowledge"},{to:"/contribute",icon:p,label:"Contribute",description:"Share Insights"}],n=()=>{r(!s)};return e.jsx("nav",{className:"bg-white shadow-md fixed top-0 left-0 right-0 z-50",children:e.jsxs("div",{className:"container mx-auto px-4 py-3 flex justify-between items-center",children:[e.jsxs(d,{to:"/",className:"flex items-center space-x-4 group hover:opacity-80 transition-opacity",children:[e.jsx("img",{src:v,alt:"BharatVista Logo",className:"w-10 h-10 rounded-full ring-2 ring-indigo-500 group-hover:ring-indigo-600 transition-all"}),e.jsx("h1",{className:"text-2xl font-bold text-indigo-800 tracking-tight group-hover:text-indigo-900 transition-colors",children:"BharatVista"})]}),e.jsx("div",{className:"md:hidden",children:e.jsx("button",{onClick:n,className:"text-indigo-600 focus:outline-none",children:s?e.jsx(g,{size:24}):e.jsx(j,{size:24})})}),e.jsx("div",{className:"hidden md:flex items-center space-x-2",children:o.map(t=>e.jsxs(a,{to:t.to,className:({isActive:i})=>`
                group flex items-center px-3 py-2 rounded-md 
                transition-all duration-300
                ${i?"bg-indigo-600 text-white":"text-slate-700 hover:bg-indigo-50 hover:text-indigo-800"}
              `,children:[e.jsx(t.icon,{className:"mr-2",size:16}),e.jsx("span",{className:"text-sm font-medium",children:t.label})]},t.to))}),s&&e.jsx("div",{className:`
            md:hidden absolute top-full left-0 right-0 
            bg-white shadow-lg border-t
            animate-slide-down
          `,children:o.map(t=>e.jsxs(a,{to:t.to,onClick:n,className:({isActive:i})=>`
                  flex items-center px-4 py-3 
                  border-b last:border-b-0
                  transition-colors
                  ${i?"bg-indigo-50 text-indigo-800":"hover:bg-gray-50 text-slate-700"}
                `,children:[e.jsx(t.icon,{className:"mr-4 text-indigo-600",size:20}),e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold",children:t.label}),e.jsx("div",{className:"text-xs text-slate-500",children:t.description})]})]},t.to))})]})})}export{C as default};
