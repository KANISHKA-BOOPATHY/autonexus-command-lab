'use strict';
// Descriptive measurements only. These values do not implement the CNN or its gate.
const WaveAnalysis=(()=>{
 const mean=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:null;
 const median=a=>{if(!a.length)return null;const s=[...a].sort((a,b)=>a-b),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;};
 function differential(w){return w.h.map((v,i)=>v-w.l[i]);}
 function risingEdge(w){const d=differential(w);let at=1,best=-Infinity;for(let i=1;i<d.length;i++){const step=d[i]-d[i-1];if(step>best){best=step;at=i;}}return at;}
 function crossing(d,start,end,level){for(let i=Math.max(1,start);i<=Math.min(end,d.length-1);i++){if(d[i-1]<=level&&d[i]>level)return i-1+(level-d[i-1])/(d[i]-d[i-1]);}return null;}
 function features(w){const d=differential(w),dominant=d.map(v=>v>1),high=[],low=[];let last=-100;
  for(let i=0;i<d.length;i++){if(i>0&&dominant[i]!==dominant[i-1])last=i;if(i-last>=8&&i+4<d.length&&dominant.slice(i,i+5).every(v=>v===dominant[i]))(dominant[i]?high:low).push(i);}
  const hDom=median(high.map(i=>w.h[i])),lDom=median(high.map(i=>w.l[i]));
  const common=median(w.h.map((v,i)=>(v+w.l[i])/2));
  let residuals=[];for(const group of [high,low])for(const values of [w.h,w.l]){const avg=mean(group.map(i=>values[i]));if(avg!==null)residuals.push(...group.map(i=>values[i]-avg));}
  const plateauRms=residuals.length?Math.sqrt(mean(residuals.map(v=>v*v)))*1000:null;
  const edge=risingEdge(w),base=median(d.slice(Math.max(0,edge-12),Math.max(0,edge-3))),top=median(d.slice(edge+8,Math.min(edge+23,d.length)));
  let rise=null,overshoot=null;
  if(base!==null&&top!==null&&top-base>.5){const a=crossing(d,edge-10,edge+8,base+.1*(top-base)),b=crossing(d,edge-10,edge+8,base+.9*(top-base));if(a!==null&&b!==null&&b>=a)rise=(b-a)*50;overshoot=Math.max(0,(Math.max(...d.slice(edge,edge+13))-top)/(top-base)*100);}
  return {hDom,lDom,dDom:median(high.map(i=>d[i])),common,plateauRms,rise,overshoot,edge};
 }
 return {differential,risingEdge,features};
})();
