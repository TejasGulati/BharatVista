import{r as a,j as e}from"./index-Cszak3U1.js";import{G as h}from"./index-Cyre3K_c.js";const u=new h("AIzaSyBUpkr7y-nrr8ODoZ4LKjttWDeLSfBhSYw"),m=u.getGenerativeModel({model:"gemini-1.5-pro"});async function g(t){const s=`
  Analyze this cultural location in India and provide detailed insights:
  
  Location: ${t.name}
  State: ${t.state}
  Type: ${t.type} (e.g., temple, festival, historical site)
  Significance: ${t.significance}
  Best Time to Visit: ${t.bestTime||"Not specified"}
  User Rating: ${t.rating||"Not rated yet"}

  Provide:
  1. Historical background
  2. Cultural significance
  3. Associated myths or stories
  4. Visitor recommendations
  5. Nearby cultural attractions

  Respond in this JSON format:
  \`\`\`json
  {
    "historicalBackground": "",
    "culturalSignificance": "",
    "mythsAndStories": [],
    "visitorRecommendations": [],
    "nearbyAttractions": []
  }
  \`\`\`
  `;try{let i=(await m.generateContent({contents:[{parts:[{text:s}]}]})).response.candidates[0].content.parts[0].text;return i=i.replace(/^```json\n/,"").replace(/\n```$/,""),JSON.parse(i)}catch(n){return console.error("AI Error:",n),{error:"Failed to generate cultural insights"}}}function p({location:t}){const[s,n]=a.useState(null),[i,l]=a.useState(!1),[c,o]=a.useState(null);return a.useEffect(()=>{(async()=>{l(!0);try{const r=await g(t);r.error?o(r.error):n(r)}catch{o("Failed to load cultural insights")}finally{l(!1)}})()},[t]),i?e.jsx("div",{children:"Loading cultural insights..."}):c?e.jsxs("div",{children:["Error: ",c]}):e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:t.name}),s&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Historical Background"}),e.jsx("p",{children:s.historicalBackground})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Cultural Significance"}),e.jsx("p",{children:s.culturalSignificance})]}),s.mythsAndStories.length>0&&e.jsxs("div",{className:"mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Myths and Stories"}),e.jsx("ul",{className:"list-disc pl-5",children:s.mythsAndStories.map((d,r)=>e.jsx("li",{children:d},r))})]})]})]})}export{p as default};
