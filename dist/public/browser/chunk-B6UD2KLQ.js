import{a as H,b as U,c as W}from"./chunk-WNBO4K3S.js";import{a as J}from"./chunk-X2SOKOUX.js";import{a as j}from"./chunk-QOPFTOZL.js";import"./chunk-DB5RMVZ7.js";import"./chunk-UXZ2VA4W.js";import"./chunk-QB37QMMN.js";import"./chunk-TS646TIG.js";import"./chunk-4FIJZXK5.js";import"./chunk-TJFBSUUK.js";import"./chunk-GT4JH6HJ.js";import"./chunk-EBZKSOFQ.js";import{b as q}from"./chunk-7KNNJSCE.js";import"./chunk-FMZGRIZ6.js";import{o as R}from"./chunk-KLLKZ3UM.js";import"./chunk-MGQU4BYR.js";import{a as V}from"./chunk-U2EAJGNN.js";import{a as z}from"./chunk-RQ4VGEOD.js";import{a as G,b as O}from"./chunk-PIACHCSP.js";import{a as B}from"./chunk-J6P2CT7J.js";import"./chunk-GKZUPR7X.js";import{m as N}from"./chunk-APQUY7ND.js";import{j as L,m as w,t as A,w as F}from"./chunk-JS4ZJV2L.js";import{Ba as p,C as y,Fc as l,La as v,Ma as S,Mb as k,Oc as f,Qb as P,Qc as u,Sb as T,Vb as d,Vc as g,Wc as C,fc as n,gc as o,hc as r,ic as E,jc as M,lc as I,n as x,uc as c,v as b,vc as h,wb as D,xa as m}from"./chunk-B762IU3Y.js";var Z=i=>["/admin/pacientes",i],K=(()=>{class i{constructor(){this.url=""}agInit(e){this.url=e.data.id_paciente}refresh(e){return!1}static{this.\u0275fac=function(a){return new(a||i)}}static{this.\u0275cmp=p({type:i,selectors:[["app-btn-link-info"]],standalone:!0,features:[f],decls:7,vars:3,consts:[[1,"btn","btn-light-info","btn-flex","btn-sm","rounded-pill",3,"routerLink"],[1,"ki-duotone","ki-book","fs-3"],[1,"path1"],[1,"path2"],[1,"path3"],[1,"path4"]],template:function(a,s){a&1&&(n(0,"a",0)(1,"i",1),r(2,"span",2)(3,"span",3)(4,"span",4)(5,"span",5),o(),l(6," Ver Info "),o()),a&2&&d("routerLink",u(1,Z,s.url))},dependencies:[N]})}}return i})();var $=()=>[A,import("./chunk-I4BRQATP.js").then(i=>i.AgGridAngular)],ee=i=>[i];function te(i,t){if(i&1){let e=I();n(0,"ag-grid-angular",22),g(1,"async"),g(2,"async"),c("gridReady",function(s){v(e);let X=h();return S(X.gridReady(s))}),o()}if(i&2){let e=h();d("rowData",C(1,7,e.pacientesList))("columnDefs",e.colDefs)("loading",C(2,9,e.isLoading))("localeText",e.localeText)("enableCellTextSelection",!0)("ariaHidden",!0)("pagination",!0)}}function ne(i,t){i&1&&(n(0,"div",23)(1,"div",24)(2,"span",25),l(3,"Loading..."),o()()())}var Q=class _{constructor(){this.modal=m(R),this.pacienteService=m(j),this.theme=m(B),this.isLoading=m(z).isLoading,this.localeText=V,this.pacientesList=new x,this.colDefs=[{field:"nombre",headerName:"Nombres",filter:!0},{field:"dni",headerName:"DNI",filter:!0},{field:"genero.nombre",headerName:"G\xE9nero"},{field:"fecha_nacimiento",headerName:"Fecha Nacimiento",filter:"agDateColumnFilter",valueFormatter:t=>L(t.value,"dd/MM/yyyy","en")},{field:"diagnostico",headerName:"Diagn\xF3stico",filter:!0},{field:"user.name",headerName:"Apoderado",filter:!0},{field:"parentesco.nombre",headerName:"Parentesco",filter:!0},{field:"colegio",headerName:"Colegio",filter:!0},{headerName:"Informes",cellRenderer:K},{headerName:"Acciones",cellRenderer:J,cellRendererParams:{onEdit:t=>this.openEditModal(t),onDelete:t=>this.openDeleteModal(t)},maxWidth:100,resizable:!1}]}ngOnInit(){this.fetchPacientes()}fetchPacientes(){this.pacientesList=this.pacienteService.getAll().pipe(O(this),y(t=>t.data||[]))}loadTabla(){this.fetchPacientes()}openCreateModal(){this.modal.open(H,{size:"300px",animation:!0,centered:!0}).componentInstance.onSaveComplete.subscribe(()=>{this.fetchPacientes()})}gridReady(t){this.gridApi=t.api}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("paciente-search").value)}openEditModal(t){let e=this.modal.open(U,{size:"300px",animation:!0,centered:!0});e.componentInstance.paciente=t,e.componentInstance.onSaveComplete.subscribe(()=>{this.fetchPacientes()})}openDeleteModal(t){let e=this.modal.open(W,{size:"300px",animation:!0,centered:!0});e.componentInstance.pacienteId=t.id_paciente,e.componentInstance.onSaveComplete.subscribe(()=>{this.fetchPacientes()})}close(){this.modal.dismissAll()}static{this.\u0275fac=function(e){return new(e||_)}}static{this.\u0275cmp=p({type:_,selectors:[["app-pacientes"]],standalone:!0,features:[f],decls:31,vars:3,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"card","shadow","p-2","px-4"],[1,"d-flex","py-4","gap-3","justify-content-between"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","paciente-search","name","search","value","","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"input"],[1,"d-flex","align-items-stretch","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2","d-none","d-md-block"],["type","button",1,"btn","btn-primary",3,"click"],[1,"ki-solid","ki-plus","text-white","fs-1"],[1,"text-white","ms-2"],[2,"height","calc(100dvh - 281px)",3,"ngClass"],["loadingMessage","Cargando...",2,"width","100%","height","100%",3,"gridReady","rowData","columnDefs","loading","localeText","enableCellTextSelection","ariaHidden","pagination"],[1,"d-flex","justify-content-center","align-items-center",2,"height","100%"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(e,a){e&1&&(n(0,"app-header"),E(1,0),n(2,"h1",1)(3,"span",2),l(4,"Pacientes"),o()(),M(),o(),n(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"form",7),r(10,"input",8),n(11,"i",9),r(12,"span",10)(13,"span",11),o(),n(14,"input",12),c("input",function(){return a.onFilterTextBoxChanged()}),o()(),n(15,"div",13)(16,"button",14),c("click",function(){return a.loadTabla()}),n(17,"span",15),r(18,"span",16),n(19,"span",17),l(20,"Actualizar"),o()()(),n(21,"button",18),c("click",function(){return a.openCreateModal()}),n(22,"span",15),r(23,"span",19),n(24,"span",20),l(25,"A\xF1adir"),o()()()()(),n(26,"div",21),k(27,te,3,11)(28,ne,4,0),P(29,27,$,28),T(),o()()()()),e&2&&(D(26),d("ngClass",u(1,ee,a.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")))},dependencies:[F,w,q]})}};Q=b([G()],Q);export{Q as PacientesComponent};
