import{c as Ee,d as ie,f as M,h as re,i as oe,j as H,k as se}from"./chunk-EBZKSOFQ.js";import{p as Pe}from"./chunk-DA7F7PFS.js";import{n as ke,o as ne,r as Q,v as ye}from"./chunk-IVHFDWNE.js";import{Ac as xe,Ba as R,Bb as ve,Bc as W,Ca as ge,Cc as we,Da as U,Dc as ee,Ic as be,Ka as ue,La as f,Lc as te,Ma as m,Mb as y,Na as L,Oa as Ce,Ra as fe,Ua as w,Vb as p,Wb as S,Xa as J,Xb as X,Yb as _e,bd as Fe,ec as h,fc as d,gc as x,gd as G,hc as T,ic as V,kc as b,pa as he,qa as q,qc as u,ra as de,rc as c,tb as me,ub as Z,wa as z,wb as l,xb as F,xc as Y,yc as N,zc as j}from"./chunk-MKY54U27.js";var Oe=["hueSlider"],Te=["alphaSlider"];function Ve(i,s){if(i&1){let e=b();h(0,"div",10),u("newValue",function(n){f(e);let r=c();return m(r.onSliderChange("saturation-lightness",n))}),h(1,"div",11),x(2,"div"),d()()}if(i&2){let e=c();S("background-color",e.hueSliderColor),p("rgX",1)("rgY",1),l(),S("top",e.slider==null?null:e.slider.v,"px")("left",e.slider==null?null:e.slider.s,"px")}}function Ie(i,s){if(i&1&&(h(0,"div",12),x(1,"div",13)(2,"div",14),d()),i&2){let e=c();l(2),S("background-color",e.selectedColor)}}function He(i,s){if(i&1){let e=b();h(0,"div",15,1),u("newValue",function(n){f(e);let r=c();return m(r.onSliderChange("hue",n))}),h(2,"div",16)(3,"div"),x(4,"div"),d()()()}if(i&2){let e=c();p("rgX",1),l(2),S("left",e.slider==null?null:e.slider.h,"px")}}function ze(i,s){if(i&1){let e=b();h(0,"div",17,2),u("newValue",function(n){f(e);let r=c();return m(r.onSliderChange("alpha",n))}),x(2,"div",18),h(3,"div",16)(4,"div"),x(5,"div"),d()()()}if(i&2){let e=c();p("rgX",1),l(2),p("ngStyle",e.getBackgroundColor(e.alphaSliderColor)),l(),S("left",e.slider==null?null:e.slider.a,"px")}}var Re=["dialog"],Ae=i=>({background:i});function Le(i,s){i&1&&x(0,"div",12)}function Xe(i,s){if(i&1){let e=b();T(0),h(1,"div",9)(2,"div",10),u("click",function(){let n=f(e).$implicit,r=c(2);return m(r.onColorClick(n))}),y(3,Le,1,0,"div",11),d()(),V()}if(i&2){let e=s.$implicit,t=s.index,n=c(2);l(2),X("colornull",!e),p("ngStyle",n.getBackgroundColor(e)),l(),p("ngIf",t==n.indexSeleccionado)}}function Ye(i,s){if(i&1&&x(0,"div",18),i&2){let e=c(3);p("ngStyle",e.getBackgroundColor(e.color))}}function Ne(i,s){if(i&1){let e=b();h(0,"div",13),u("click",function(){f(e);let n=c(2);return m(n.addColor())}),y(1,Ye,1,1,"div",14),L(),h(2,"svg",15),x(3,"path",16)(4,"path",17),d()()}if(i&2){let e=c(2);l(),p("ngIf",e.indexSeleccionado===void 0)}}function je(i,s){if(i&1){let e=b();h(0,"color-picker",19),u("colorChange",function(n){f(e);let r=c(2);return m(r.onChangeColorPicker(n))})("onAlphaChange",function(n){f(e);let r=c(2);return m(r.onAlphaChange(n))}),d()}if(i&2){let e=c(2);p("controls",e.colorPickerControls)("color",e.hsva)}}function We(i,s){if(i&1&&(T(0),h(1,"div",5),y(2,Xe,4,4,"ng-container",6)(3,Ne,5,1,"div",7)(4,je,1,2,"color-picker",8),d(),V()),i&2){let e=c();l(),p("@colorsAnimation",e.colorsAnimationEffect),l(),p("ngForOf",e.palette),l(),p("ngIf",!e.hideColorPicker&&e.colorPickerControls!="only-alpha"),l(),p("ngIf",!e.hideColorPicker&&e.colorPickerControls=="only-alpha")}}function Ge(i,s){i&1&&x(0,"div",12)}function Qe(i,s){if(i&1){let e=b();T(0),h(1,"div",9)(2,"div",25),u("click",function(){let n=f(e).$implicit,r=c(2);return m(r.changeColor(n))}),y(3,Ge,1,0,"div",11),d()(),V()}if(i&2){let e=s.$implicit,t=c(2);l(2),X("colornull",!e),p("ngStyle",te(4,Ae,e)),l(),p("ngIf",t.isSelected(e))}}function $e(i,s){if(i&1){let e=b();T(0),h(1,"div",5)(2,"div",20)(3,"div",21),u("click",function(){f(e);let n=c();return m(n.onClickBack())}),L(),h(4,"svg",22),x(5,"path",23)(6,"path",24),d()()(),y(7,Qe,4,6,"ng-container",6),d(),V()}if(i&2){let e=c();l(),p("@colorsAnimation",e.colorsAnimationEffect),l(6),p("ngForOf",e.variants)}}function Ke(i,s){if(i&1){let e=b();T(0),h(1,"div",26)(2,"div",27),u("click",function(){f(e);let n=c();return m(n.onClickBack())}),L(),h(3,"svg",22),x(4,"path",23)(5,"path",24),d()(),Ce(),h(6,"button",28),u("click",function(){f(e);let n=c();return m(n.emitClose("cancel"))}),W(7),d(),h(8,"button",28),u("click",function(){f(e);let n=c();return m(n.emitClose("accept"))}),W(9),d()(),h(10,"div",29)(11,"color-picker",30),u("sliderChange",function(n){f(e);let r=c();return m(r.onChangeColorPicker(n))}),d()(),V()}if(i&2){let e=c();l(7),ee(" ",e.cancelLabel," "),l(2),ee(" ",e.acceptLabel," "),l(2),p("controls",e.colorPickerControls)("color",e.hsva)}}function qe(i,s){if(i&1){let e=b();h(0,"div",31)(1,"p",32),u("click",function(){f(e);let n=c();return m(n.nextFormat())}),W(2),d(),h(3,"div",33)(4,"input",34,1),u("keyup",function(){f(e);let n=xe(5),r=c();return m(r.changeColorManual(n.value))})("keydown.enter",function(){f(e);let n=c();return m(n.emitClose("accept"))}),d()()()}if(i&2){let e=c();l(2),we(e.colorFormats[e.format]),l(2),S("font-size",e.color&&e.color.length>23?9:10,"px")("letter-spacing",e.color&&e.color.length>16?0:1.5,"px"),p("placeholder",e.placeholder)("value",e.color)}}var ae=["hex","rgba","hsla","cmyk"],v=function(i){return i[i.HEX=0]="HEX",i[i.RGBA=1]="RGBA",i[i.HSLA=2]="HSLA",i[i.CMYK=3]="CMYK",i}(v||{}),Me=[{color:"rojo",preview:"#E57373",variants:["#FFEBEE","#FFCDD2","#EF9A9A","#E57373","#EF5350","#F44336","#E53935","#D32F2F","#C62828"]},{color:"rosa",preview:"#F06292",variants:["#FCE4EC","#F8BBD0","#F48FB1","#F06292","#EC407A","#E91E63","#D81B60","#C2185B","#AD1457"]},{color:"purpura",preview:"#BA68C8",variants:["#F3E5F5","#E1BEE7","#CE93D8","#BA68C8","#AB47BC","#9C27B0","#8E24AA","#7B1FA2","#6A1B9A"]},{color:"purpura oscuro",preview:"#9575CD",variants:["#EDE7F6","#D1C4E9","#B39DDB","#9575CD","#7E57C2","#673AB7","#5E35B1","#512DA8","#4527A0"]},{color:"indigo",preview:"#7986CB",variants:["#E8EAF6","#C5CAE9","#9FA8DA","#7986CB","#5C6BC0","#3F51B5","#3949AB","#303F9F","#283593"]},{color:"azul",preview:"#64B5F6",variants:["#E3F2FD","#BBDEFB","#90CAF9","#64B5F6","#42A5F5","#2196F3","#1E88E5","#1976D2","#1565C0"]},{color:"celeste",preview:"#4FC3F7",variants:["#E1F5FE","#B3E5FC","#81D4FA","#4FC3F7","#29B6F6","#03A9F4","#039BE5","#0288D1","#0277BD"]},{color:"cyan",preview:"#4DD0E1",variants:["#E0F7FA","#B2EBF2","#80DEEA","#4DD0E1","#26C6DA","#00BCD4","#00ACC1","#0097A7","#00838F"]},{color:"color",preview:"#4DB6AC",variants:["#E0F2F1","#B2DFDB","#80CBC4","#4DB6AC","#26A69A","#009688","#00897B","#00796B","#00695C"]},{color:"verde",preview:"#81C784",variants:["#E8F5E9","#C8E6C9","#A5D6A7","#81C784","#66BB6A","#4CAF50","#43A047","#388E3C","#2E7D32"]},{color:"verde claro",preview:"#AED581",variants:["#F1F8E9","#DCEDC8","#C5E1A5","#AED581","#9CCC65","#8BC34A","#7CB342","#689F38","#558B2F"]},{color:"lima",preview:"#DCE775",variants:["#F9FBE7","#F0F4C3","#E6EE9C","#DCE775","#D4E157","#CDDC39","#C0CA33","#AFB42B","#9E9D24"]},{color:"amarillo",preview:"#FFF176",variants:["#FFFDE7","#FFF9C4","#FFF59D","#FFF176","#FFEE58","#FFEB3B","#FDD835","#FBC02D","#F9A825"]},{color:"ambar",preview:"#FFD54F",variants:["#FFF8E1","#FFECB3","#FFE082","#FFD54F","#FFCA28","#FFC107","#FFB300","#FFA000","#FF8F00"]},{color:"naranja",preview:"#FFB74D",variants:["#FFF3E0","#FFE0B2","#FFCC80","#FFB74D","#FFA726","#FF9800","#FB8C00","#F57C00","#EF6C00"]},{color:"naranja oscuro",preview:"#FF8A65",variants:["#FBE9E7","#FFCCBC","#FFAB91","#FF8A65","#FF7043","#FF5722","#F4511E","#E64A19","#D84315"]},{color:"marron",preview:"#A1887F",variants:["#EFEBE9","#D7CCC8","#BCAAA4","#A1887F","#8D6E63","#795548","#6D4C41","#5D4037","#4E342E"]},{color:"escala de grises",preview:"#E0E0E0",variants:["#FFFFFF","#FAFAFA","#F5F5F5","#EEEEEE","#E0E0E0","#BDBDBD","#9E9E9E","#757575","#616161","#424242","#000000"]},{color:"azul gris",preview:"#90A4AE",variants:["#ECEFF1","#CFD8DC","#B0BEC5","#90A4AE","#78909C","#607D8B","#546E7A","#455A64","#37474F"]}],P=class{constructor(s,e,t,n){this.r=s,this.g=e,this.b=t,this.a=n}denormalize(){return this.r=Math.round(this.r*255),this.g=Math.round(this.g*255),this.b=Math.round(this.b*255),this}toString(){return this.denormalize(),"rgb"+(this.a!=1?"a(":"(")+this.r+", "+this.g+", "+this.b+(this.a!=1?", "+this.a.toPrecision(2)+")":")")}},k=class{constructor(s,e,t,n){this.h=s,this.s=e,this.v=t,this.a=n,this.onChange=new w(!0)}onColorChange(s){this.s=s.s/s.rgX,this.v=s.v/s.rgY}onHueChange(s){this.h=s.v/s.rgX}onValueChange(s){this.v=s.v/s.rgX}onAlphaChange(s){this.a=s.v/s.rgX}},D=class{constructor(s,e,t,n){this.h=s,this.s=e,this.l=t,this.a=n}denormalize(){return this.h=Math.round(this.h*360),this.s=Math.round(this.s*100),this.l=Math.round(this.l*100),this}toString(){return"hsl"+(this.a!=1?"a(":"(")+this.h+", "+this.s+"%, "+this.l+"%"+(this.a!=1?", "+this.a.toPrecision(2)+")":")")}},A=class{constructor(s,e,t,n,r=1){this.c=s,this.m=e,this.y=t,this.k=n,this.a=r}denormalize(){return this.c=Math.round(this.c*100),this.m=Math.round(this.m*100),this.y=Math.round(this.y*100),this.k=Math.round(this.k*100),this}toString(){return this.denormalize(),"cmyk("+this.c+", "+this.m+", "+this.y+", "+this.k+")"}},le=class{constructor(s){s&&(this.preview=s.preview,this.variants=s.variants)}},K=(()=>{class i{constructor(){}toFormat(e,t){var n="";if(e)switch(t){case v.HEX:var o=this.hsvaToRgba(e);o.denormalize();var n=this.rgbaToHex(o,!0);break;case v.HSLA:var r=this.hsva2hsla(e);r.denormalize();var n=r.toString();break;case v.RGBA:var o=this.hsvaToRgba(e),n=o.toString();break;case v.CMYK:var a=this.hsvaToCmyk(e),n=a.toString();break}return n}stringToFormat(e,t){var n=this.stringToHsva(e,!0);return this.toFormat(n,t)}hsva2hsla(e){let t=e.h,n=e.s,r=e.v,o=e.a;if(r===0)return new D(t,0,0,o);if(n===0&&r===1)return new D(t,1,1,o);{let a=r*(2-n)/2;return new D(t,r*n/(1-Math.abs(2*a-1)),a,o)}}hsla2hsva(e){let t=Math.min(e.h,1),n=Math.min(e.s,1),r=Math.min(e.l,1),o=Math.min(e.a,1);if(r===0)return new k(t,0,0,o);{let a=r+n*(1-Math.abs(2*r-1))/2;return new k(t,2*(a-r)/a,a,o)}}hsvaToRgba(e){let t,n,r,o=e.h,a=e.s,g=e.v,C=e.a,E=Math.floor(o*6),O=o*6-E,_=g*(1-a),I=g*(1-O*a),B=g*(1-(1-O)*a);switch(E%6){case 0:t=g,n=B,r=_;break;case 1:t=I,n=g,r=_;break;case 2:t=_,n=g,r=B;break;case 3:t=_,n=I,r=g;break;case 4:t=B,n=_,r=g;break;case 5:t=g,n=_,r=I;break;default:t=0,n=0,r=0}return new P(t,n,r,C)}cmykToRgb(e){let t=(1-e.c)*(1-e.k),n=(1-e.m)*(1-e.k),r=(1-e.y)*(1-e.k);return new P(t,n,r,e.a)}rgbaToCmyk(e){let t=1-Math.max(e.r,e.g,e.b);if(t===1)return new A(0,0,0,1,e.a);{let n=(1-e.r-t)/(1-t),r=(1-e.g-t)/(1-t),o=(1-e.b-t)/(1-t);return new A(n,r,o,t,e.a)}}hsvaToCmyk(e){let t=this.hsvaToRgba(e);return this.rgbaToCmyk(t)}rgbaToHsva(e){let t,n,r=Math.min(e.r,1),o=Math.min(e.g,1),a=Math.min(e.b,1),g=Math.min(e.a,1),C=Math.max(r,o,a),E=Math.min(r,o,a),O=C,_=C-E;if(n=C===0?0:_/C,C===E)t=0;else{switch(C){case r:t=(o-a)/_+(o<a?6:0);break;case o:t=(a-r)/_+2;break;case a:t=(r-o)/_+4;break;default:t=0}t/=6}return new k(t,n,O,g)}rgbaToHex(e,t){let n="#"+(16777216|e.r<<16|e.g<<8|e.b).toString(16).substr(1);return e.a!=1&&(n+=(256|Math.round(e.a*255)).toString(16).substr(1)),n}normalizeCMYK(e){return new A(e.c/100,e.m/100,e.y/100,e.k/100,e.a)}denormalizeCMYK(e){return new A(Math.floor(e.c*100),Math.floor(e.m*100),Math.floor(e.y*100),Math.floor(e.k*100),e.a)}denormalizeRGBA(e){return new P(Math.round(e.r*255),Math.round(e.g*255),Math.round(e.b*255),e.a)}stringToHsva(e="",t=!0){let n=null;e=(e||"").toLowerCase();let r=[{re:/(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(o){return new P(parseInt(o[2],10)/255,parseInt(o[3],10)/255,parseInt(o[4],10)/255,isNaN(parseFloat(o[5]))?1:parseFloat(o[5]))}},{re:/(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(o){return new D(parseInt(o[2],10)/360,parseInt(o[3],10)/100,parseInt(o[4],10)/100,isNaN(parseFloat(o[5]))?1:parseFloat(o[5]))}},{re:/cmyk?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(o){return new A(parseInt(o[1],10)/100,parseInt(o[2],10)/100,parseInt(o[3],10)/100,parseInt(o[4],10)/100)}}];t?r.push({re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/,parse:function(o){return new P(parseInt(o[1],16)/255,parseInt(o[2],16)/255,parseInt(o[3],16)/255,parseInt(o[4]||"FF",16)/255)}}):r.push({re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,parse:function(o){return new P(parseInt(o[1],16)/255,parseInt(o[2],16)/255,parseInt(o[3],16)/255,1)}}),r.push({re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,parse:function(o){return new P(parseInt(o[1]+o[1],16)/255,parseInt(o[2]+o[2],16)/255,parseInt(o[3]+o[3],16)/255,1)}});for(let o in r)if(r.hasOwnProperty(o)){let a=r[o],g=a.re.exec(e),C=g&&a.parse(g);if(C){if(C instanceof P)n=this.rgbaToHsva(C);else if(C instanceof D)n=this.hsla2hsva(C);else if(C instanceof A){let E=this.cmykToRgb(C);n=this.rgbaToHsva(E)}return n}}return n}outputFormat(e){return this.hsvaToRgba(e).toString()}getFormatByString(e){if(e){e=e.toLowerCase();let t=/(#([\da-f]{3}(?:[\da-f]{3})?(?:[\da-f]{2})?))/,n=/(rgba\((\d{1,3},\s?){3}(1|0?\.\d+)\)|rgb\(\d{1,3}(,\s?\d{1,3}){2}\))/,r=/(hsla\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|hsl\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/,o=/(cmyk\(\d{1,3}(,\s?\d{1,3}){3}\))/;if(t.test(e))return"hex";if(n.test(e))return"rgba";if(r.test(e))return"hsla";if(o.test(e))return"cmyk"}return"hex"}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275prov=q({token:i,factory:i.\u0275fac}),i})(),$=class{constructor(s,e,t,n){this.h=s,this.s=e,this.v=t,this.a=n}},ce=class{constructor(s,e,t,n){this.h=s,this.s=e,this.v=t,this.a=n}},Ue=(()=>{class i{mouseDown(e){this.start(e)}touchStart(e){this.start(e)}constructor(e){this.elRef=e,this.dragEnd=new w,this.dragStart=new w,this.newValue=new w,this.listenerMove=t=>this.move(t),this.listenerStop=()=>this.stop()}move(e){e.preventDefault(),this.setCursor(e)}start(e){this.setCursor(e),e.stopPropagation(),document.addEventListener("mouseup",this.listenerStop),document.addEventListener("touchend",this.listenerStop),document.addEventListener("mousemove",this.listenerMove),document.addEventListener("touchmove",this.listenerMove),this.dragStart.emit()}stop(){document.removeEventListener("mouseup",this.listenerStop),document.removeEventListener("touchend",this.listenerStop),document.removeEventListener("mousemove",this.listenerMove),document.removeEventListener("touchmove",this.listenerMove),this.dragEnd.emit()}getX(e){let t=this.elRef.nativeElement.getBoundingClientRect();return(e.pageX!==void 0?e.pageX:e.touches[0].pageX)-t.left-window.pageXOffset}getY(e){let t=this.elRef.nativeElement.getBoundingClientRect();return(e.pageY!==void 0?e.pageY:e.touches[0].pageY)-t.top-window.pageYOffset}setCursor(e){let t=this.elRef.nativeElement.offsetWidth,n=this.elRef.nativeElement.offsetHeight,r=Math.max(0,Math.min(this.getX(e),t)),o=Math.max(0,Math.min(this.getY(e),n));this.rgX!==void 0&&this.rgY!==void 0?this.newValue.emit({s:r/t,v:1-o/n,rgX:this.rgX,rgY:this.rgY}):this.rgX===void 0&&this.rgY!==void 0?this.newValue.emit({v:o/n,rgY:this.rgY}):this.rgX!==void 0&&this.rgY===void 0&&this.newValue.emit({v:r/t,rgX:this.rgX})}}return i.\u0275fac=function(e){return new(e||i)(F(J))},i.\u0275dir=U({type:i,selectors:[["","slider",""]],hostBindings:function(e,t){e&1&&u("mousedown",function(r){return t.mouseDown(r)})("touchstart",function(r){return t.touchStart(r)})},inputs:{rgX:"rgX",rgY:"rgY",slider:"slider"},outputs:{dragEnd:"dragEnd",dragStart:"dragStart",newValue:"newValue"}}),i})(),Je=(()=>{class i{constructor(e,t){this.service=e,this.cdr=t,this.color=new k(0,1,1,1),this.controls="default",this.sliderChange=new w(!1),this.onAlphaChange=new w(!1),this.hsva=new k(0,1,1,1),this.selectedColor="#000000",this.fallbackColor="#000000"}ngOnInit(){this.color||(this.color=new k(0,1,1,1)),this.slider=new $(0,0,0,0),this.update()}ngOnDestroy(){}ngOnChanges(e){e.color&&this.color&&this.update()}ngAfterViewInit(){let e=this.hueSlider?.nativeElement.offsetWidth||140,t=this.alphaSlider?.nativeElement.offsetWidth||140;this.sliderDimMax=new ce(e,220,130,t),this.update()}onSliderChange(e,t){switch(e){case"saturation-lightness":this.hsva.onColorChange(t);break;case"hue":this.hsva.onHueChange(t);break;case"alpha":this.hsva.onAlphaChange(t),this.onAlphaChange.emit(t);break;case"value":this.hsva.onValueChange(t);break}this.update(),this.setColor(this.outputColor)}setColor(e){this.color=e,this.sliderChange.emit(this.color)}getBackgroundColor(e){return{background:"linear-gradient(90deg, rgba(36,0,0,0) 0%, "+e+" 100%)"}}update(){if(this.hsva=this.color,this.sliderDimMax){let e=this.service.hsvaToRgba(this.hsva).denormalize(),t=this.service.hsvaToRgba(new k(this.hsva.h,1,1,1)).denormalize();this.hueSliderColor="rgb("+t.r+","+t.g+","+t.b+")",this.alphaSliderColor="rgb("+e.r+","+e.g+","+e.b+")",this.outputColor=this.hsva,this.selectedColor=this.service.hsvaToRgba(this.hsva).toString(),this.slider=new $(this.hsva.h*this.sliderDimMax.h-5,this.hsva.s*this.sliderDimMax.s-8,(1-this.hsva.v)*this.sliderDimMax.v-8,this.hsva.a*this.sliderDimMax.a-5),this.cdr.detectChanges()}}}return i.\u0275fac=function(e){return new(e||i)(F(K),F(G))},i.\u0275cmp=R({type:i,selectors:[["color-picker"]],viewQuery:function(e,t){if(e&1&&(Y(Oe,5),Y(Te,5)),e&2){let n;N(n=j())&&(t.hueSlider=n.first),N(n=j())&&(t.alphaSlider=n.first)}},inputs:{color:"color",controls:"controls"},outputs:{sliderChange:"sliderChange",onAlphaChange:"onAlphaChange"},features:[ue],decls:8,vars:4,consts:[["dialogPopup",""],["hueSlider",""],["alphaSlider",""],[1,"color-picker",3,"click"],["class","saturation-lightness",3,"slider","rgX","rgY","background-color","newValue",4,"ngIf"],[1,"hue-alpha","box"],["class","left",4,"ngIf"],[1,"right"],["class","hue",3,"slider","rgX","newValue",4,"ngIf"],["class","alpha",3,"slider","rgX","newValue",4,"ngIf"],[1,"saturation-lightness",3,"newValue","slider","rgX","rgY"],[1,"cursor"],[1,"left"],[1,"selected-color-background"],[1,"selected-color"],[1,"hue",3,"newValue","slider","rgX"],[1,"sliderCursor"],[1,"alpha",3,"newValue","slider","rgX"],[1,"alpha-gradient",3,"ngStyle"]],template:function(e,t){if(e&1){let n=b();h(0,"div",3,0),u("click",function(o){return f(n),m(o.stopPropagation())}),y(2,Ve,3,8,"div",4),h(3,"div",5),y(4,Ie,3,2,"div",6),h(5,"div",7),y(6,He,5,3,"div",8)(7,ze,6,4,"div",9),d()()()}e&2&&(l(2),p("ngIf",t.controls!="only-alpha"),l(2),p("ngIf",t.controls!="only-alpha"),l(2),p("ngIf",t.controls!="only-alpha"),l(),p("ngIf",t.controls!="no-alpha"))},dependencies:[ne,Q,Ue],styles:[`.color-picker{position:relative;z-index:1000;width:220px;height:auto;cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:none}.color-picker *{box-sizing:border-box;margin:0;font-size:11px}.color-picker input{width:0;height:26px;min-width:0;font-size:13px;text-align:center;color:#000}.color-picker input:invalid,.color-picker input:-moz-ui-invalid,.color-picker input:-moz-submit-invalid{box-shadow:none}.color-picker input::-webkit-inner-spin-button,.color-picker input::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.color-picker .sliderCursor{width:10px;border-radius:5px;position:absolute;margin-top:-3px;border:1px solid black}.color-picker .sliderCursor>div{border:2px solid white;border-radius:5px}.color-picker .sliderCursor>div>div{border-radius:5px;border:1px solid black;height:24px}.color-picker .cursor{position:absolute;width:21px;border:3px solid black;border-radius:100%;margin:-2px 0 0 -2px}.color-picker .cursor>div{height:15px;border:3px solid white;border-radius:100%}.color-picker .box{display:flex;padding:4px 8px}.color-picker .left{position:relative;padding:16px 8px}.color-picker .right{flex:1 1 auto;display:flex;flex-direction:column;gap:10px;padding:12px 8px}.color-picker .hue-alpha{display:flex;align-items:center;margin-bottom:3px}.color-picker .hue{direction:ltr;width:100%;height:24px;border:none;border-radius:5px;position:relative;cursor:pointer;background-size:100% 100%;background:linear-gradient(to right,red 0%,#ff0 17%,lime 33%,cyan 50%,blue 66%,#f0f 83%,red 100%)}.color-picker .alpha{direction:ltr;position:relative;width:100%;height:24px;border:none;border-radius:5px;cursor:pointer;background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.color-picker .alpha-gradient{width:100%;height:100%;border-radius:5px;position:absolute}.color-picker .selected-color{position:absolute;top:16px;left:8px;width:40px;height:40px;box-shadow:0 1px 1px 1px #00000026;border-radius:50%}.color-picker .selected-color-background{width:40px;height:40px;border-radius:50%;background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.color-picker .saturation-lightness{direction:ltr;cursor:crosshair;width:100%;position:relative;height:130px;border:none;touch-action:manipulation;background-image:linear-gradient(to top,#000 0%,transparent 100%),linear-gradient(to right,#fff 0%,transparent 100%)}
`],encapsulation:2}),i})(),Ze=(()=>{class i{click(e){this.isOutside(e)&&this.emitClose("cancel")}onScroll(){this.onScreenMovement()}onResize(){this.onScreenMovement()}constructor(e,t){this.service=e,this.cdr=t,this.color="#000000",this.previewColor="#000000",this.hsva=new k(0,1,1,1),this.colorsAnimationEffect="slide-in",this.palette=Me,this.variants=[],this.userFormats=[],this.colorFormats=ae,this.format=v.HEX,this.formatMap={hex:v.HEX,rgba:v.RGBA,hsla:v.HSLA,cmyk:v.CMYK},this.canChangeFormat=!0,this.menu=1,this.hideColorPicker=!1,this.hideTextInput=!1,this.colorPickerControls="default",this.placeholder="#FFFFFF"}ngOnInit(){this.setPosition(),this.hsva=this.service.stringToHsva(this.color),this.indexSeleccionado=this.findIndexSelectedColor(this.palette)}ngAfterViewInit(){this.setPositionY()}onScreenMovement(){this.setPosition(),this.setPositionY(),this.panelRef.nativeElement.style.transition||(this.panelRef.nativeElement.style.transition="transform 0.5s ease-out")}findIndexSelectedColor(e){let t;if(this.color)for(let n=0;n<e.length;n++){let r=e[n];typeof r=="string"?this.service.stringToFormat(this.color,v.HEX)==this.service.stringToFormat(r,v.HEX)&&(t=n):r===void 0?this.color=void 0:this.findIndexSelectedColor(r.variants)!=null&&(t=n)}return t}iniciate(e,t,n,r,o,a,g,C,E,O,_,I,B=[]){if(this.colorPickerControls=_,this.triggerInstance=e,this.TriggerBBox=t,this.color=n,this.hideColorPicker=C,this.hideTextInput=g,this.acceptLabel=E,this.cancelLabel=O,B.length&&B.every(De=>ae.includes(De))&&(this.colorFormats=B),a?this.colorFormats.includes(a)?(this.format=this.colorFormats.indexOf(a.toLowerCase()),this.canChangeFormat=!1,this.service.getFormatByString(this.color)!=a.toLowerCase()&&this.setColor(this.service.stringToHsva(this.color))):(console.error("Format provided is invalid, using HEX"),this.format=v.HEX):(this.format=this.colorFormats.indexOf(this.service.getFormatByString(this.color)),this.format<0&&(this.format=0)),this.previewColor=this.color,this.palette=r??Me,this.colorsAnimationEffect=o,I=="top"){let pe=this.TriggerBBox.nativeElement.getBoundingClientRect();this.positionString="transform: translateY(calc( -100% - "+pe.height+"px ))"}}setPosition(){if(this.TriggerBBox){let t=this.TriggerBBox.nativeElement.getBoundingClientRect();this.top=t.top+t.height,t.left+250>window.innerWidth?this.left=t.right<250?window.innerWidth/2-250/2:t.right-250:this.left=t.left}}setPositionY(){let e=this.TriggerBBox.nativeElement.getBoundingClientRect(),t=this.panelRef.nativeElement.getBoundingClientRect(),n=t.height;e.bottom+n>window.innerHeight?this.positionString=e.top<t.height?"transform: translateY(-"+e.bottom+"px );":"transform: translateY(calc( -100% - "+e.height+"px ));":this.positionString="",this.cdr.detectChanges()}hasVariant(e){return this.previewColor?typeof e!="string"&&e.variants.some(t=>t.toUpperCase()==this.previewColor.toUpperCase()):!1}isSelected(e){return this.previewColor?typeof e=="string"&&e.toUpperCase()==this.previewColor.toUpperCase():!1}getBackgroundColor(e){return typeof e=="string"?{background:e}:{background:e?.preview}}onAlphaChange(e){this.palette=this.ChangeAlphaOnPalette(e,this.palette)}ChangeAlphaOnPalette(e,t){var n=[];for(let r=0;r<t.length;r++){let o=t[r];if(typeof o=="string"){let a=this.service.stringToHsva(o);a.onAlphaChange(e),n.push(this.service.toFormat(a,this.format))}else{let a=new le,g=this.service.stringToHsva(o.preview);g.onAlphaChange(e),a.preview=this.service.toFormat(g,this.format),a.variants=this.ChangeAlphaOnPalette(e,o.variants),n.push(a)}}return n}changeColor(e){this.setColor(this.service.stringToHsva(e)),this.emitClose("accept")}onChangeColorPicker(e){this.temporalColor=e,this.color=this.service.toFormat(e,this.format),this.triggerInstance.sliderChange(this.service.toFormat(e,this.format))}changeColorManual(e){this.previewColor=e,this.color=e,this.hsva=this.service.stringToHsva(e),this.setPreviewColor(this.hsva),this.temporalColor=this.hsva,this.triggerInstance.setColor(this.color,this.previewColor)}setColor(e,t=-1){this.hsva=e;let n=this.colorFormats[this.format],r=t;r<0&&(r=this.formatMap[n]),this.color=this.service.toFormat(e,r),this.setPreviewColor(e),this.triggerInstance.setColor(this.color,this.previewColor)}setPreviewColor(e){this.previewColor=e?this.service.hsvaToRgba(e).toString():void 0}onChange(){}onColorClick(e){typeof e=="string"||e===void 0?this.changeColor(e):(this.variants=e.variants,this.menu=2)}addColor(){this.menu=3,this.backupColor=this.color,this.temporalColor=this.service.stringToHsva(this.color)}nextFormat(){if(this.canChangeFormat){this.format=(this.format+1)%this.colorFormats.length;let e=this.colorFormats[this.format],t=this.formatMap[e];this.setColor(this.hsva,t),this.placeholder=this.service.toFormat(new k(0,0,1,1),t)}}emitClose(e){this.menu==3&&(e=="cancel"||e=="accept"&&this.setColor(this.temporalColor)),this.triggerInstance.closePanel()}onClickBack(){this.menu==3&&(this.color=this.backupColor,this.hsva=this.service.stringToHsva(this.color)),this.indexSeleccionado=this.findIndexSelectedColor(this.palette),this.menu=1}isOutside(e){return e.target.classList.contains("ngx-colors-overlay")}}return i.\u0275fac=function(e){return new(e||i)(F(K),F(G))},i.\u0275cmp=R({type:i,selectors:[["ngx-colors-panel"]],viewQuery:function(e,t){if(e&1&&Y(Re,5),e&2){let n;N(n=j())&&(t.panelRef=n.first)}},hostVars:4,hostBindings:function(e,t){e&1&&u("mousedown",function(r){return t.click(r)},!1,Z)("scroll",function(){return t.onScroll()},!1,Z)("resize",function(){return t.onResize()},!1,me),e&2&&S("top",t.top,"px")("left",t.left,"px")},decls:6,vars:6,consts:[["dialog",""],["paintInput",""],[1,"opened"],[4,"ngIf"],["class","manual-input-wrapper",4,"ngIf"],[1,"colors"],[4,"ngFor","ngForOf"],["style","background: rgb(245 245 245); position: relative","class","circle button",3,"click",4,"ngIf"],[3,"controls","color","colorChange","onAlphaChange",4,"ngIf"],[1,"circle","wrapper","color"],[1,"circle","color","circle-border",3,"click","ngStyle"],["class","selected",4,"ngIf"],[1,"selected"],[1,"circle","button",2,"background","rgb(245 245 245)","position","relative",3,"click"],["style",`
            position: absolute;
            height: 7px;
            width: 7px;
            border: 1px solid rgba(0, 0, 0, 0.03);
            border-radius: 100%;
            top: 0;
            right: 0;
          `,3,"ngStyle",4,"ngIf"],["xmlns","http://www.w3.org/2000/svg","height","24px","viewBox","0 0 24 24","width","24px","fill","#222222"],["d","M24 24H0V0h24v24z","fill","none","opacity",".87"],["d","M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"],[2,"position","absolute","height","7px","width","7px","border","1px solid rgba(0, 0, 0, 0.03)","border-radius","100%","top","0","right","0",3,"ngStyle"],[3,"colorChange","onAlphaChange","controls","color"],[1,"circle","wrapper"],[1,"add",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24"],["d","M0 0h24v24H0z","fill","none"],["d","M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"],[1,"circle","circle-border",3,"click","ngStyle"],[1,"nav-wrapper"],[1,"round-button","button",2,"float","left",3,"click"],[2,"float","right",3,"click"],[1,"color-picker-wrapper"],[3,"sliderChange","controls","color"],[1,"manual-input-wrapper"],[2,"cursor","pointer",3,"click"],[1,"g-input"],["type","text",3,"keyup","keydown.enter","placeholder","value"]],template:function(e,t){e&1&&(h(0,"div",2,0),y(2,We,5,4,"ng-container",3)(3,$e,8,2,"ng-container",3)(4,Ke,12,4,"ng-container",3)(5,qe,6,7,"div",4),d()),e&2&&(_e(t.positionString),l(2),p("ngIf",t.menu==1),l(),p("ngIf",t.menu==2),l(),p("ngIf",t.menu==3),l(),p("ngIf",!t.hideTextInput))},dependencies:[ke,ne,Q,Je],styles:["[_nghost-%COMP%]{position:fixed;z-index:2001}.hidden[_ngcontent-%COMP%]{display:none}.button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.top[_ngcontent-%COMP%]{transform:translateY(-100%)}.opened[_ngcontent-%COMP%]{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:250px;border-radius:5px;position:absolute}.opened[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px}.opened[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .opened[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus{outline:none}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%]{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%]   .add[_ngcontent-%COMP%]{font-size:20px;line-height:45px;text-align:center}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle.colornull[_ngcontent-%COMP%]{background:linear-gradient(135deg,rgba(236,236,236,.7) 0%,rgba(236,236,236,.7) 45%,#de0f00 50%,rgba(236,236,236,.7) 55%,rgba(236,236,236,.7) 100%)}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle.wrapper[_ngcontent-%COMP%]{margin:0 5px 5px;flex:34px 0 0}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle.button[_ngcontent-%COMP%]{margin:0 5px 5px}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle.wrapper.color[_ngcontent-%COMP%]{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened[_ngcontent-%COMP%]   .colors[_ngcontent-%COMP%]   .circle-border[_ngcontent-%COMP%]{border:1px solid rgba(0,0,0,.03)}.opened[_ngcontent-%COMP%]   .color-picker-wrapper[_ngcontent-%COMP%]{margin:5px 15px}.opened[_ngcontent-%COMP%]   .nav-wrapper[_ngcontent-%COMP%]{overflow:hidden;margin:5px}.opened[_ngcontent-%COMP%]   .nav-wrapper[_ngcontent-%COMP%]   .round-button[_ngcontent-%COMP%]{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened[_ngcontent-%COMP%]   .manual-input-wrapper[_ngcontent-%COMP%]{display:flex;margin:15px;font-family:sans-serif}.opened[_ngcontent-%COMP%]   .manual-input-wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened[_ngcontent-%COMP%]   .manual-input-wrapper[_ngcontent-%COMP%]   .g-input[_ngcontent-%COMP%]{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened[_ngcontent-%COMP%]   .manual-input-wrapper[_ngcontent-%COMP%]   .g-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}"],data:{animation:[Ee("colorsAnimation",[oe("void => slide-in",[H(":enter",M({opacity:0}),{optional:!0}),H(":enter",se("10ms",[ie(".3s ease-in",re([M({opacity:0,transform:"translatex(-50%)",offset:0}),M({opacity:.5,transform:"translatex(-10px) scale(1.1)",offset:.3}),M({opacity:1,transform:"translatex(0)",offset:1})]))]),{optional:!0})]),oe("void => popup",[H(":enter",M({opacity:0,transform:"scale(0)"}),{optional:!0}),H(":enter",se("10ms",[ie("500ms ease-out",re([M({opacity:.5,transform:"scale(.5)",offset:.3}),M({opacity:1,transform:"scale(1.1)",offset:.8}),M({opacity:1,transform:"scale(1)",offset:1})]))]),{optional:!0})])])]}}),i})(),Se={position:"fixed",height:"100%",width:"100%","z-index":2e3,top:0,left:0},Be=(()=>{class i{constructor(e,t,n){this.resolver=e,this.applicationRef=t,this.injector=n}createPanel(e,t){this.componentRef!=null&&this.removePanel();let n=this.resolver.resolveComponentFactory(Ze);this.componentRef=n.create(this.injector),this.applicationRef.attachView(this.componentRef.hostView);let r=this.componentRef.hostView.rootNodes[0];return this.overlay=document.createElement("div"),this.overlay.id="ngx-colors-overlay",this.overlay.classList.add("ngx-colors-overlay"),this.overlay.classList.add(t),Object.keys(Se).forEach(o=>{this.overlay.style[o]=Se[o]}),e?document.getElementById(e).appendChild(this.overlay):document.body.appendChild(this.overlay),this.overlay.appendChild(r),this.componentRef}removePanel(){this.applicationRef.detachView(this.componentRef.hostView),this.componentRef.destroy(),this.overlay.remove()}}return i.\u0275fac=function(e){return new(e||i)(z(ve),z(Fe),z(fe))},i.\u0275prov=q({token:i,factory:i.\u0275fac}),i})(),et=(()=>{class i{onClick(){this.openPanel()}constructor(e,t,n){this.triggerRef=e,this.panelFactory=t,this.service=n,this.color="",this.colorsAnimation="slide-in",this.position="bottom",this.attachTo=void 0,this.overlayClassName=void 0,this.colorPickerControls="default",this.acceptLabel="ACCEPT",this.cancelLabel="CANCEL",this.change=new w,this.input=new w,this.slider=new w,this.close=new w,this.open=new w,this.isDisabled=!1,this.onTouchedCallback=()=>{},this.onChangeCallback=()=>{}}ngOnDestroy(){this.panelRef&&this.panelFactory.removePanel()}openPanel(){this.isDisabled||(this.panelRef=this.panelFactory.createPanel(this.attachTo,this.overlayClassName),this.panelRef.instance.iniciate(this,this.triggerRef,this.color,this.palette,this.colorsAnimation,this.format,this.hideTextInput,this.hideColorPicker,this.acceptLabel,this.cancelLabel,this.colorPickerControls,this.position,this.formats)),this.open.emit(this.color)}closePanel(){this.panelFactory.removePanel(),this.onTouchedCallback(),this.close.emit(this.color)}setDisabledState(e){this.isDisabled=e,this.triggerRef.nativeElement.style.opacity=e?.5:1}setColor(e,t=""){this.writeValue(e,t),this.onChangeCallback(e),this.input.emit(e)}sliderChange(e){this.slider.emit(e)}get value(){return this.color}set value(e){this.setColor(e),this.onChangeCallback(e)}writeValue(e,t=""){if(e!==this.color){if(this.format){let r=ae.indexOf(this.format.toLowerCase());e=this.service.stringToFormat(e,r)}this.color=e;let n=!1;e&&e.startsWith("cmyk")&&(n=!0,t||(t=this.service.stringToFormat(e,v.RGBA))),this.change.emit(n?t:e)}}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}}return i.\u0275fac=function(e){return new(e||i)(F(J),F(Be),F(K))},i.\u0275dir=U({type:i,selectors:[["","ngx-colors-trigger",""]],hostBindings:function(e,t){e&1&&u("click",function(){return t.onClick()})},inputs:{colorsAnimation:"colorsAnimation",palette:"palette",format:"format",formats:"formats",position:"position",hideTextInput:"hideTextInput",hideColorPicker:"hideColorPicker",attachTo:"attachTo",overlayClassName:"overlayClassName",colorPickerControls:"colorPickerControls",acceptLabel:"acceptLabel",cancelLabel:"cancelLabel"},outputs:{change:"change",input:"input",slider:"slider",close:"close",open:"open"},features:[be([{provide:Pe,useExisting:he(()=>i),multi:!0}])]}),i})(),vt=(()=>{class i{constructor(e,t){this.cdRef=e,this.triggerDirective=t,this.triggerDirectiveColorChangeSubscription=null,this.color=this.triggerDirective.color}ngOnInit(){this.triggerDirectiveColorChangeSubscription=this.triggerDirective.change.subscribe(e=>{this.color=e,this.cdRef.markForCheck()})}ngOnDestroy(){this.triggerDirectiveColorChangeSubscription&&this.triggerDirectiveColorChangeSubscription.unsubscribe()}}return i.\u0275fac=function(e){return new(e||i)(F(G),F(et,1))},i.\u0275cmp=R({type:i,selectors:[["ngx-colors"]],decls:4,vars:5,consts:[[1,"app-color-picker"],[1,"preview"],[1,"preview-background"],[1,"circle",3,"ngStyle"]],template:function(e,t){e&1&&(h(0,"div",0)(1,"div",1)(2,"div",2),x(3,"div",3),d()()()),e&2&&(l(3),X("colornull",!t.color),p("ngStyle",te(3,Ae,t.color)))},dependencies:[Q],styles:["[_nghost-%COMP%]   .app-color-picker[_ngcontent-%COMP%]{line-height:1px;font-family:sans-serif}[_nghost-%COMP%]   .app-color-picker[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]{margin:2px;display:inline-block;box-sizing:border-box;border-radius:100%;background:white;cursor:pointer;padding:3px;box-shadow:0 1px 1px #0003,0 1px 1px 1px #00000024,0 1px 1px 1px #0000001f}[_nghost-%COMP%]   .app-color-picker[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .preview-background[_ngcontent-%COMP%]{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px;border-radius:100%}[_nghost-%COMP%]   .app-color-picker[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .circle[_ngcontent-%COMP%]{height:20px;width:20px;box-sizing:border-box;border-radius:100%;cursor:pointer}[_nghost-%COMP%]   .app-color-picker[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .circle.colornull[_ngcontent-%COMP%]{background:linear-gradient(135deg,rgba(236,236,236,.7) 0%,rgba(236,236,236,.7) 45%,#de0f00 50%,rgba(236,236,236,.7) 55%,rgba(236,236,236,.7) 100%)}[_nghost-%COMP%]   .app-color-picker[_ngcontent-%COMP%]   .preview[_ngcontent-%COMP%]   .noselected[_ngcontent-%COMP%]{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}"]}),i})(),_t=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=ge({type:i}),i.\u0275inj=de({providers:[K,Be],imports:[ye]}),i})();export{et as a,vt as b,_t as c};
