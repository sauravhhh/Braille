/* Braille tool logic (Grade 1, uncontracted) — also used by the page */
const DOTS = { // letter -> braille unicode
  a:"\u2801",b:"\u2803",c:"\u2809",d:"\u2819",e:"\u2811",f:"\u280b",g:"\u281b",h:"\u2813",i:"\u280a",j:"\u281a",
  k:"\u2805",l:"\u2807",m:"\u280d",n:"\u281d",o:"\u2815",p:"\u280f",q:"\u281f",r:"\u2817",s:"\u280e",t:"\u281e",
  u:"\u2825",v:"\u2827",w:"\u283a",x:"\u282d",y:"\u283d",z:"\u2835"
};
const DIGITS = { "1":"\u2801","2":"\u2803","3":"\u2809","4":"\u2819","5":"\u2811","6":"\u280b","7":"\u281b","8":"\u2813","9":"\u280a","0":"\u281a" };
const PUNCT = { ",":"\u2802",";":"\u2806",":":"\u2812",".":"\u2832","!":"\u2816","?":"\u2826","'":"\u2804","-":"\u2824",'"':"\u2826","(":"\u2836",")":"\u2836" };
const CAP = "\u2820", NUM = "\u283c", SPACE = " ";
const REV = {};
Object.entries(DOTS).forEach(([k,v])=>REV[v]=k);
Object.entries(PUNCT).forEach(([k,v])=>{ if(!(v in REV)) REV[v]=k; });
const REVNUM = {}; Object.entries(DIGITS).forEach(([k,v])=>REVNUM[v]=k);

function textToBraille(t){
  let out = "", inNum = false;
  for(const ch of t){
    if(ch >= "0" && ch <= "9"){
      if(!inNum){ out += NUM; inNum = true; }
      out += DIGITS[ch];
    } else {
      inNum = false;
      const low = ch.toLowerCase();
      if(DOTS[low]){
        if(ch !== low) out += CAP;
        out += DOTS[low];
      } else if(PUNCT[ch]){ out += PUNCT[ch]; }
      else if(ch === " " || ch === "\n"){ out += SPACE; }
    }
  }
  return out;
}
function brailleToText(b){
  let out = "", cap = false, num = false;
  for(const ch of b){
    if(ch === CAP){ cap = true; continue; }
    if(ch === NUM){ num = true; continue; }
    if(ch === " " || ch === "\n"){ out += ch; num = false; continue; }
    if(num && REVNUM[ch]){ out += REVNUM[ch]; continue; }
    num = false;
    const l = REV[ch];
    if(l){ out += cap ? l.toUpperCase() : l; }
    cap = false;
  }
  return out;
}
if(typeof module!=="undefined"){ module.exports={textToBraille,brailleToText,DOTS}; }
