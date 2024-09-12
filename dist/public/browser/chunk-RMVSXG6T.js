import{a as H,b as V,c as U,d as W}from"./chunk-NQEXVQ5M.js";import"./chunk-B2KUHG2X.js";import"./chunk-D5MMKCXX.js";import{a as j}from"./chunk-SMXGL3IA.js";import"./chunk-PVL7WP7S.js";import"./chunk-GT4JH6HJ.js";import"./chunk-W54JGCTE.js";import{a as q}from"./chunk-MYRVSVX3.js";import{a as G,b as O}from"./chunk-V5XXOWMS.js";import{a as B}from"./chunk-6AI7ETL6.js";import{b as I,h as L,i as z}from"./chunk-R5RWQE6G.js";import"./chunk-7DDO5UV4.js";import{c as A,d as N,i as F,k as R}from"./chunk-BZQHEDDQ.js";import{$b as w,B as _,Ba as C,Bb as i,Cb as n,Db as s,Eb as T,Fb as E,Hb as M,I as x,Ka as y,La as b,Lb as m,Mb as f,Vb as d,_b as k,ab as v,dc as u,ec as h,mb as S,qb as D,sb as P,t as g,ub as p,xa as l}from"./chunk-LN7CUKCY.js";var Q=()=>[F,import("./chunk-6NGAYFQR.js").then(o=>o.AgGridAngular)],X=o=>[o];function Y(o,e){if(o&1){let t=M();i(0,"ag-grid-angular",22),u(1,"async"),u(2,"async"),m("gridReady",function(c){y(t);let K=f();return b(K.gridReady(c))}),n()}if(o&2){let t=f();p("rowData",h(1,7,t.pacientesList))("columnDefs",t.colDefs)("loading",h(2,9,t.isLoading))("localeText",t.localeText)("enableCellTextSelection",!0)("ariaHidden",!0)("pagination",!0)}}function Z(o,e){o&1&&(i(0,"div",23)(1,"div",24)(2,"span",25),d(3,"Loading..."),n()()())}var a,J=(a=class{constructor(){this.modal=l(I),this.pacienteService=l(j),this.theme=l(L),this.isLoading=l(B).isLoading,this.localeText=q,this.pacientesList=new g,this.colDefs=[{field:"nombre",headerName:"Nombres",filter:!0},{field:"dni",headerName:"DNI",filter:!0},{field:"genero.nombre",headerName:"G\xE9nero"},{field:"fecha_nacimiento",headerName:"Fecha Nacimiento",filter:"agDateColumnFilter",valueFormatter:e=>A(e.value,"dd/MM/yyyy","en")},{field:"user.name",headerName:"Padre de familia",filter:!0},{field:"direccion",headerName:"Direcci\xF3n",filter:!0},{field:"colegio",headerName:"Colegio",filter:!0},{headerName:"Acciones",cellRenderer:W,cellRendererParams:{onEdit:e=>this.openEditModal(e),onDelete:e=>this.openDeleteModal(e)},maxWidth:100,resizable:!1}]}ngOnInit(){this.fetchPacientes()}fetchPacientes(){this.pacientesList=this.pacienteService.getAll().pipe(O(this),x(e=>e.data||[]))}loadTabla(){this.fetchPacientes()}openCreateModal(){this.modal.open(H,{size:"300px",animation:!0,centered:!0}).componentInstance.onSaveComplete.subscribe(()=>{this.fetchPacientes()})}gridReady(e){this.gridApi=e.api}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("paciente-search").value)}openEditModal(e){let t=this.modal.open(V,{size:"300px",animation:!0,centered:!0});t.componentInstance.paciente=e,t.componentInstance.onSaveComplete.subscribe(()=>{this.fetchPacientes()})}openDeleteModal(e){let t=this.modal.open(U,{size:"300px",animation:!0,centered:!0});t.componentInstance.pacienteId=e.id_paciente,t.componentInstance.onSaveComplete.subscribe(()=>{this.fetchPacientes()})}close(){this.modal.dismissAll()}},a.\u0275fac=function(t){return new(t||a)},a.\u0275cmp=C({type:a,selectors:[["app-pacientes"]],standalone:!0,features:[k],decls:31,vars:3,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"card","shadow","p-2","px-4"],[1,"d-flex","py-4","justify-content-between","align-items-center"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","paciente-search","name","search","value","","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"input"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],["type","button",1,"btn","btn-primary",3,"click"],[1,"ki-solid","ki-plus","text-white","fs-1"],[1,"text-white","ms-2"],[2,"height","470px",3,"ngClass"],["loadingMessage","Cargando...",2,"width","100%","height","100%",3,"gridReady","rowData","columnDefs","loading","localeText","enableCellTextSelection","ariaHidden","pagination"],[1,"d-flex","justify-content-center","align-items-center",2,"height","100%"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(t,r){t&1&&(i(0,"app-header"),T(1,0),i(2,"h1",1)(3,"span",2),d(4,"Pacientes"),n()(),E(),n(),i(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"form",7),s(10,"input",8),i(11,"i",9),s(12,"span",10)(13,"span",11),n(),i(14,"input",12),m("input",function(){return r.onFilterTextBoxChanged()}),n()(),i(15,"div",13)(16,"button",14),m("click",function(){return r.loadTabla()}),i(17,"span",15),s(18,"span",16),i(19,"span",17),d(20,"Actualizar"),n()()(),i(21,"button",18),m("click",function(){return r.openCreateModal()}),i(22,"span",15),s(23,"span",19),i(24,"span",20),d(25,"A\xF1adir"),n()()()()(),i(26,"div",21),S(27,Y,3,11)(28,Z,4,0),D(29,27,Q,28),P(),n()()()()),t&2&&(v(26),p("ngClass",w(1,X,r.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")))},dependencies:[R,N,z]}),a);J=_([G()],J);export{J as PacientesComponent};