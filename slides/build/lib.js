const pptxgen = require('pptxgenjs');
const P = { bg:'F7F4FB', ink:'1F1442', purple:'5038A6', muted:'6E6591', lav:'DDD8F7', lav2:'EFEAFB', white:'FFFFFF', orange:'F2A03D', mint:'8EE3C8', lilac:'C9A8FF', soft:'C9BFEF' };
const THEME = { name:'SO101 Lavender', headFontFace:'Paperlogy 7 Bold', bodyFontFace:'Paperlogy 4 Regular',
  colors:{ dk1:P.ink, lt1:P.white, dk2:P.purple, lt2:P.bg, accent1:P.purple, accent2:P.orange, accent3:P.muted, accent4:P.lav, accent5:'7A52C7', accent6:'2A9D8F', hlink:P.purple, folHlink:'8C7DCF' } };
const MONO='JetBrains Mono', BOLD='Paperlogy 7 Bold', REG='Paperlogy 4 Regular';
const X=1.25, CW=17.5, R=X+CW;
const pres = new pptxgen();
pres.defineLayout({ name:'W20', width:20, height:11.25 }); pres.layout='W20';
pres.theme = { headFontFace:THEME.headFontFace, bodyFontFace:THEME.bodyFontFace };
pres.title='SO-ARM101 × LeRobot 윈도우 실습';

function fixRun(o){ o=Object.assign({},o); if(o.fontFace!==MONO){ if(o.bold) o.fontFace=BOLD; o.bold=false; } return o; }
function T(s, text, o){ o=Object.assign({ isTextBox:true, margin:0, color:P.ink, valign:'top' }, o);
  const boxBold=!!o.bold && o.fontFace!==MONO;
  if (Array.isArray(text)) text=text.map(r=>({text:r.text, options:fixRun(Object.assign({bold:boxBold, fontFace:o.fontFace}, r.options||{}))}));
  if (o.fontFace!==MONO){ if(boxBold) o.fontFace=BOLD; o.bold=false; }
  if (!o.fontFace) o.fontFace=REG;
  s.addText(text, o); }
function card(s,x,y,w,h,fill,line){ s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,rectRadius:0.18,fill:{color:fill},line:{color:line||fill,width:1.25}}); }
function textW(str,fs){ let u=0; for(const ch of str){ u += /[ᄀ-ᇿ㄰-㆏가-힯←-⇿①-⓿]/.test(ch)?1.0:0.56; } return u*fs/72; }
function nLines(str,fs,w){ return String(str).split('\n').reduce((a,l)=>a+Math.max(1,Math.ceil(textW(l,fs)/(w*0.97))),0); }
function pill(s,x,y,text,fill,color,w){ w=w||(0.5+textW(text,17)); s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h:0.48,rectRadius:0.24,fill:{color:fill},line:{color:fill}});
  T(s,text,{x,y,w,h:0.48,fontSize:17,bold:true,color,align:'center',valign:'middle'}); return w; }
function circleNum(s,x,y,d,n,fill,color){ s.addShape(pres.shapes.OVAL,{x,y,w:d,h:d,fill:{color:fill||P.purple},line:{color:fill||P.purple}});
  T(s,String(n),{x,y,w:d,h:d,fontSize:Math.round(d*34),bold:true,color:color||P.white,align:'center',valign:'middle'}); }
function band(s,y,label,text,h,fill){ h=h||0.8; card(s,X,y,CW,h,fill||P.lav);
  T(s,[{text:label+'   ',options:{bold:true,color:P.purple}},{text,options:{color:P.ink}}],{x:X+0.45,y,w:CW-0.9,h,fontSize:20,valign:'middle'}); }
function newSlide(bg){ const s=pres.addSlide(); s.background={color:bg||P.bg}; return s; }
let CUR={ num:'', name:'' };
function content(num,title,sub){ const s=newSlide();
  T(s,`CH.${CUR.num}  ${CUR.name.replace(/\n/g,' ')}`,{x:X,y:0.55,w:12,h:0.4,fontSize:16,bold:true,color:P.purple});
  T(s,[{text:num+'  ',options:{color:P.purple}},{text:title,options:{color:P.ink}}],{x:X,y:1.15,w:CW,h:1.0,fontSize:48,bold:true,valign:'middle',fit:'shrink'});
  if(sub) T(s,sub,{x:X,y:2.2,w:CW,h:0.5,fontSize:22,color:P.muted});
  return s; }
// 코드 상자: lines = 문자열 배열
function code(s,x,y,w,lines,o){ o=o||{}; const fs=o.fs||17; const inner=w-0.8; const cw=fs*0.6/72;
  let n=0; lines.forEach(l=>{ n+=Math.max(1,Math.ceil(l.length*cw/inner)); });
  const h=o.h||(0.5+n*fs*1.38/72);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,rectRadius:0.14,fill:{color:P.ink},line:{color:P.ink}});
  const runs=[]; lines.forEach((l,i)=>runs.push({text:l,options:{color:(o.colors&&o.colors[i])||P.white,breakLine:i<lines.length-1}}));
  T(s,runs,{x:x+0.4,y:y+0.25,w:inner,h:h-0.5,fontSize:fs,fontFace:MONO,valign:'middle',lineSpacingMultiple:1.05});
  return y+h; }
// 번호 단계 목록
function steps(s,x,y,w,items,o){ o=o||{}; const fs=o.fs||21, d=o.d||0.58, gap=o.gap||0.28;
  items.forEach((it,i)=>{ if(typeof it==='string') it={t:it};
    circleNum(s,x,y,d,o.start?o.start+i:i+1);
    const tw=w-d-0.3; const th=nLines(it.t,fs,tw)*fs*1.35/72;
    T(s,it.t,{x:x+d+0.3,y:y+Math.max(0,(d-fs*1.35/72)/2),w:tw,h:th,fontSize:fs,bold:true});
    let yy=y+Math.max(d,th+Math.max(0,(d-fs*1.35/72)/2));
    if(it.d){ const dh=nLines(it.d,fs-3,tw)*(fs-3)*1.35/72; T(s,it.d,{x:x+d+0.3,y:yy+0.05,w:tw,h:dh,fontSize:fs-3,color:P.muted}); yy+=dh+0.05; }
    if(it.code){ yy=code(s,x+d+0.3,yy+0.12,tw,it.code,{fs:o.cfs||15})+0.02; }
    y=yy+gap; });
  return y; }
// 표: cols=[비율], head=[], rows=[[...]]
function table(s,x,y,w,cols,head,rows,o){ o=o||{}; const fs=o.fs||17, pad=0.22; const ws=cols.map(c=>c*w);
  const lineH=fs*1.32/72;
  const drawRow=(cells,yy,isHead)=>{ let mx=1; cells.forEach((c,i)=>{ mx=Math.max(mx,nLines(String(c).replace(/`/g,''),fs,ws[i]-pad*2)); });
    const h=mx*lineH+0.32;
    if(isHead){ s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y:yy,w,h,rectRadius:0.1,fill:{color:P.lav},line:{color:P.lav}}); }
    else { s.addShape(pres.shapes.RECTANGLE,{x,y:yy,w,h,fill:{color:P.white},line:{color:P.lav,width:0.75}}); }
    let xx=x; cells.forEach((c,i)=>{ c=String(c); const isCode=/^`.*`$/.test(c); const txt=c.replace(/`/g,'');
      const first=(i===0&&!isHead&&o.firstBold!==false);
      T(s,txt,{x:xx+pad,y:yy,w:ws[i]-pad*2,h,fontSize:isCode?fs-1:fs,valign:'middle',bold:isHead||first||isCode,
        color:isHead?P.purple:(isCode?P.purple:(i===0?P.ink:(o.mutedCols&&o.mutedCols.includes(i)?P.muted:P.ink))),fontFace:isCode?MONO:undefined});
      xx+=ws[i]; });
    return yy+h; };
  if(head) y=drawRow(head,y,true)+0.05;
  rows.forEach(r=>{ y=drawRow(r,y,false); });
  return y; }
// 카드 격자: items {t,d,hi,tag}
function cards(s,x,y,w,items,cols,h,o){ o=o||{}; const gap=o.gap||0.3; const cw=(w-gap*(cols-1))/cols;
  items.forEach((it,i)=>{ const c=i%cols, r=Math.floor(i/cols), cx=x+c*(cw+gap), cy=y+r*(h+gap);
    const hi=it.hi; const fill=hi==='orange'?P.orange:(hi?P.purple:P.white);
    card(s,cx,cy,cw,h,fill,hi?fill:P.lav); let ty=cy+0.35;
    if(it.num){ T(s,it.num,{x:cx+0.4,y:ty,w:cw-0.8,h:0.9,fontSize:40,bold:true,color:hi?P.white:P.purple}); ty+=0.95; }
    if(it.tag){ pill(s,cx+0.4,ty,it.tag,hi?P.white:P.lav2,P.purple); ty+=0.65; }
    T(s,it.t,{x:cx+0.4,y:ty,w:cw-0.8,h:0.6,fontSize:o.tfs||24,bold:true,color:hi?P.white:(o.tColor||P.ink),fit:'shrink'}); ty+=(o.tfs||24)*1.45/72+0.12;
    if(it.d) T(s,it.d,{x:cx+0.4,y:ty,w:cw-0.8,h:cy+h-ty-0.25,fontSize:o.dfs||18,color:hi?P.white:P.muted});
    if(it.code) code(s,cx+0.4,cy+h-0.95,cw-0.8,[it.code],{fs:15,h:0.65});
  });
  return y+Math.ceil(items.length/cols)*(h+gap)-gap; }
// 챕터 표지
function L_n(a,b,c){ return nLines(a,b,c); }
function chapter(num,name,goals,why,badge){ CUR={num,name}; const s=newSlide(P.purple);
  T(s,'CHAPTER',{x:X,y:1.0,w:6,h:0.5,fontSize:22,bold:true,color:P.soft,charSpacing:4});
  T(s,num,{x:X,y:1.55,w:8,h:2.6,fontSize:170,bold:true,color:P.white});
  T(s,name,{x:X,y:4.45,w:9.6,h:1.9,fontSize:50,bold:true,color:P.white,fit:'shrink'});
  if(badge) pill(s,X,6.5,badge,P.orange,P.white);
  T(s,why,{x:X,y:badge?7.25:6.55,w:9.3,h:3.2,fontSize:21,color:P.lav});
  const gx=11.6, gw=R-gx; let gh=1.75; goals.forEach(g=>{ gh+=Math.max(0.62,L_n(g,22,gw-1.95)*22*1.4/72)+0.55; }); gh=Math.max(gh,4.0); const gy=(11.25-gh)/2; card(s,gx,gy,gw,gh,P.white);
  T(s,'이 챕터의 목표',{x:gx+0.55,y:gy+0.5,w:gw-1.1,h:0.6,fontSize:24,bold:true,color:P.purple});
  let y=gy+1.45; goals.forEach((g,i)=>{ circleNum(s,gx+0.55,y,0.62,'✓',P.purple);
    const h=nLines(g,22,gw-1.95)*22*1.4/72; T(s,g,{x:gx+1.4,y:y+0.06,w:gw-1.95,h:Math.max(0.5,h),fontSize:22,bold:true}); y+=Math.max(0.62,h)+0.55; });
  return s; }
module.exports={pres,P,THEME,MONO,BOLD,REG,X,CW,R,T,card,pill,circleNum,band,newSlide,content,code,steps,table,cards,chapter,textW,nLines};
