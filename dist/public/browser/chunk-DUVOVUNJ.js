import{i as C}from"./chunk-QIE4PY5K.js";import"./chunk-IHDJPOBN.js";import{k as h,u as n}from"./chunk-BZQHEDDQ.js";import{Ba as c,Bb as s,Ca as a,Cb as l,Eb as p,Fb as f,Vb as d,_b as u,ra as i}from"./chunk-LN7CUKCY.js";var m=(()=>{let e=class e{navigateToSedes(r){r.preventDefault();let t=r.currentTarget;this.removeSelectedClass(),t.style.backgroundColor="#00e4ef",t.classList.add("selected")}navigateToReservarCita(r){r.preventDefault();let t=r.currentTarget;this.removeSelectedClass(),t.style.backgroundColor="#00e4ef",t.classList.add("selected")}removeSelectedClass(){document.querySelectorAll(".menu-item.selected").forEach(t=>{t.classList.remove("selected"),t.style.backgroundColor=""})}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["app-dashboard"]],standalone:!0,features:[u],decls:7,vars:0,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"]],template:function(t,x){t&1&&(s(0,"app-header"),p(1,0),s(2,"h1",1)(3,"span",2),d(4,"Dashboard"),l()(),f(),l(),s(5,"h1"),d(6,"paciente dashboard"),l())},dependencies:[C]});let o=e;return o})();var y=[{path:"",component:m},{path:"reservar-cita/:tag",loadChildren:()=>import("./chunk-RCTT3JMY.js").then(o=>o.ReservarCitaModule)},{path:"sedes",loadChildren:()=>import("./chunk-BIYVGS7A.js").then(o=>o.SedesModule)}],v=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a({type:e}),e.\u0275inj=i({imports:[n.forChild(y),n]});let o=e;return o})();var S=[{path:"",component:m}],k=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a({type:e}),e.\u0275inj=i({imports:[h,v,n.forChild(S)]});let o=e;return o})();export{k as DashboardModule};
