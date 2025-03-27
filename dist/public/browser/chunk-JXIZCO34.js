import{a as y}from"./chunk-X6NFAZFH.js";import{a as Z}from"./chunk-QOPFTOZL.js";import{b as X}from"./chunk-7KNNJSCE.js";import{a as W}from"./chunk-FMZGRIZ6.js";import"./chunk-KLLKZ3UM.js";import"./chunk-MGQU4BYR.js";import{a as ee}from"./chunk-LJLIPVAH.js";import{a as Y}from"./chunk-U2EAJGNN.js";import{a as K}from"./chunk-RQ4VGEOD.js";import{a as Q,b as T}from"./chunk-PIACHCSP.js";import{a as J}from"./chunk-J6P2CT7J.js";import"./chunk-GKZUPR7X.js";import{j as v,l as x,o as m}from"./chunk-APQUY7ND.js";import{j as V,m as q,t as $,w as C}from"./chunk-JS4ZJV2L.js";import{Ba as E,C as _,Ca as h,Fc as u,La as F,Ma as L,Mb as P,Oc as G,Qb as I,Qc as U,Sb as z,Vb as b,Vc as w,Wc as M,fc as r,gc as n,hc as f,ic as O,jc as B,lc as H,md as g,n as D,ra as p,uc as S,v as k,vc as R,w as A,wb as j,xa as d,xb as l}from"./chunk-B762IU3Y.js";var re=()=>[$,import("./chunk-I4BRQATP.js").then(e=>e.AgGridAngular)],ae=e=>[e];function ne(e,i){if(e&1){let t=H();r(0,"ag-grid-angular",18),w(1,"async"),w(2,"async"),S("gridReady",function(c){F(t);let o=R();return L(o.gridReady(c))}),n()}if(e&2){let t=R();b("rowData",M(1,7,t.citasPaciente))("columnDefs",t.colDefs)("loading",M(2,9,t.isLoading))("localeText",t.localeText)("enableCellTextSelection",!0)("ariaHidden",!0)("pagination",!0)}}function oe(e,i){e&1&&(r(0,"div",19)(1,"div",20)(2,"span",21),u(3,"Loading..."),n()()())}var s=class N{constructor(i,t,a,c){this.route=i,this.changeDetector=t,this.router=a,this.citaService=c,this.localeText=Y,this.isLoading=d(K).isLoading,this.theme=d(J),this.authService=d(W),this.pacienteService=d(Z),this.pacientesList=new D,this.citasPaciente=new D,this.user=this.authService.user(),this.colDefs=[{field:"paciente",headerName:"Paciente",filter:!0},{field:"tipocita",headerName:"Tipo de Cita",filter:!0},{field:"sede",headerName:"Sede",filter:!0},{field:"fecha_sesion",headerName:"Fecha de Cita",valueFormatter:o=>V(o.value,"dd/MM/yyyy","en"),cellRenderer:o=>`<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-calendar text-gray-900 fs-2"></i>${o.valueFormatted}</span>`,filter:"agDateColumnFilter"},{field:"hora_inicio",headerName:"Hora de Cita",filter:!0,cellRenderer:o=>`<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${o.value}</span>`},{field:"terapia",headerName:"Terapia",filter:!0},{field:"terapista",headerName:"Terapista",filter:!0},{field:"status",headerName:"Estado",filter:!0,cellRenderer:ee}]}ngOnInit(){if(this.user){console.log("Usuario logueado:",this.user);let i=this.user.id.toString();this.loadCitasPaciente(i)}}loadPacientes(){this.pacientesList=this.pacienteService.getAll().pipe(_(i=>i.data),T(this))}refreshList(){this.loadCitasPaciente(this.user?.id.toString())}loadCitasPaciente(i){this.citasPaciente=this.citaService.getCitasByUser(i).pipe(_(t=>t.data),T(this))}gridReady(i){this.gridApi=i.api}sizeColumnsToFit(){let i=()=>this.gridApi.sizeColumnsToFit();new ResizeObserver(()=>{window.innerWidth>=768&&i()}).observe(document.body),i()}static{this.\u0275fac=function(t){return new(t||N)(l(v),l(g),l(x),l(y))}}static{this.\u0275cmp=E({type:N,selectors:[["app-dashboard"]],standalone:!0,features:[G],decls:25,vars:3,consts:[["header-title",""],[1,"d-flex","text-gray-900","fw-bold","align-items-center","gap-2"],[1,"ki-duotone","ki-calendar","text-white","fs-2tx",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"",2,"color","white"],["href","https://api.whatsapp.com/send?phone=51993723593","target","_blank",1,"float"],[1,"my-float"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"card","shadow","p-2","px-4"],[1,"d-flex","py-4","justify-content-between","align-items-center"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],[2,"height","350px",3,"ngClass"],["loadingMessage","Cargando...",2,"width","100%","height","100%",3,"gridReady","rowData","columnDefs","loading","localeText","enableCellTextSelection","ariaHidden","pagination"],[1,"d-flex","justify-content-center","align-items-center",2,"height","100%"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(t,a){t&1&&(r(0,"app-header"),O(1,0),r(2,"h1",1)(3,"i",2),f(4,"span",3)(5,"span",4),n(),r(6,"span",5),u(7,"Mis Citas"),n(),r(8,"a",6),f(9,"i",7),n()(),B(),n(),r(10,"div",8)(11,"div",9)(12,"div",10)(13,"div",11)(14,"div",12)(15,"button",13),S("click",function(){return a.refreshList()}),r(16,"span",14),f(17,"span",15),r(18,"span",16),u(19,"Actualizar"),n()()()()(),r(20,"div",17),P(21,ne,3,11)(22,oe,4,0),I(23,21,re,22),z(),n()()()()),t&2&&(j(20),b("ngClass",U(1,ae,a.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")))},dependencies:[C,q,X]})}};s=k([Q({checkProperties:!0}),A("design:paramtypes",[v,g,x,y])],s);var se=[{path:"",component:s},{path:"reservar-cita/:tag",loadChildren:()=>import("./chunk-QFOPMIGM.js").then(e=>e.ReservarCitaModule)}],ie=(()=>{class e{static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275mod=h({type:e})}static{this.\u0275inj=p({imports:[m.forChild(se),m]})}}return e})();var de=[{path:"",component:s}],ze=(()=>{class e{static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275mod=h({type:e})}static{this.\u0275inj=p({imports:[C,ie,m.forChild(de)]})}}return e})();export{ze as DashboardModule};
