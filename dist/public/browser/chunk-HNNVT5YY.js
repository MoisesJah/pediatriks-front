import{b as j,c as V,d as P,e as H}from"./chunk-33P5CXNN.js";import"./chunk-M5KBHNQG.js";import{a as O}from"./chunk-B7DVNT2Z.js";import"./chunk-6PYJZL2G.js";import"./chunk-EBZKSOFQ.js";import{a as G,b as q}from"./chunk-KG3B2A6X.js";import{a as B}from"./chunk-U2EAJGNN.js";import{o as L,u as z}from"./chunk-TEKV2OXA.js";import{a as F}from"./chunk-NMGGHNE5.js";import"./chunk-BIMAMPZW.js";import{a as N}from"./chunk-KNEUCQQI.js";import"./chunk-GKZUPR7X.js";import"./chunk-ZM3MROS5.js";import{m as A,t as I,v as R}from"./chunk-DP3M2V7L.js";import{Aa as C,C as x,Gc as w,Ic as M,Ka as y,La as b,Lb as S,Nc as u,Oc as f,Pb as D,Rb as T,Ub as p,bc as n,cc as i,dc as s,ec as U,fc as E,hc as k,n as g,nc as l,oc as c,v as _,vb as v,wa as a,yc as m}from"./chunk-B7JMKZ3I.js";var K=()=>[I,import("./chunk-TDDSBCRP.js").then(o=>o.AgGridAngular)],Q=o=>[o];function X(o,t){if(o&1){let e=k();n(0,"ag-grid-angular",22),u(1,"async"),u(2,"async"),l("gridReady",function(d){y(e);let J=c();return b(J.gridReady(d))}),i()}if(o&2){let e=c();p("rowData",f(1,6,e.userList))("loading",f(2,8,e.isLoading))("columnDefs",e.colDefs)("enableCellTextSelection",!0)("localeText",e.localeText)("pagination",!0)}}function Y(o,t){o&1&&(n(0,"div",23)(1,"div",24)(2,"span",25),m(3,"Loading..."),i()()())}var W=class h{constructor(){this.users=a(O),this.isLoading=a(F).isLoading,this.theme=a(N),this.modal=a(L),this.localeText=B,this.userList=new g,this.colDefs=[{field:"name",headerName:"Nombre",filter:!0},{field:"dni",headerName:"DNI",filter:!0},{field:"direccion",headerName:"Direcci\xF3n",filter:!0},{field:"telefono",headerName:"Tel\xE9fono",filter:!0},{field:"email",headerName:"Correo",filter:!0},{field:"tipo_user.nombre",headerName:"Tipo de Usuario",filter:!0},{headerName:"Acciones",cellRenderer:H,cellRendererParams:{onEdit:t=>this.openEditModal(t),onDelete:t=>this.openDeleteModal(t)},maxWidth:100,resizable:!1}]}ngOnInit(){this.fetchUsers()}gridReady(t){this.gridApi=t.api}fetchUsers(){this.userList=this.users.getAll().pipe(x(t=>t.data),q(this))}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("user-search").value)}ngOnDestroy(){}loadTabla(){this.fetchUsers()}openCreateModal(){this.modal.open(j,{size:"300px",animation:!0,centered:!0}).componentInstance.onSaveComplete.subscribe(()=>{this.fetchUsers()})}openEditModal(t){let e=this.modal.open(V,{size:"300px",animation:!0,centered:!0});e.componentInstance.userId=t.id,e.componentInstance.onSaveComplete.subscribe(()=>{this.fetchUsers()})}openDeleteModal(t){let e=this.modal.open(P,{size:"300px",animation:!0,centered:!0});e.componentInstance.userId=t.id,e.componentInstance.onSaveComplete.subscribe(()=>{this.fetchUsers()})}static{this.\u0275fac=function(e){return new(e||h)}}static{this.\u0275cmp=C({type:h,selectors:[["app-users"]],standalone:!0,features:[w],decls:31,vars:3,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"card","shadow","p-2","px-4"],[1,"d-flex","py-4","gap-3","justify-content-between","align-items-center"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","user-search","name","search","value","","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"input"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],["type","button",1,"btn","btn-primary",3,"click"],[1,"ki-solid","ki-plus","text-white","fs-1"],[1,"text-white","ms-2"],["id","myGrid",2,"height","calc(100dvh - 281px)",3,"ngClass"],[2,"width","100%","height","100%",3,"gridReady","rowData","loading","columnDefs","enableCellTextSelection","localeText","pagination"],[1,"d-flex","justify-content-center","align-items-center",2,"height","100%"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(e,r){e&1&&(n(0,"app-header"),U(1,0),n(2,"h1",1)(3,"span",2),m(4,"Usuarios"),i()(),E(),i(),n(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"form",7),s(10,"input",8),n(11,"i",9),s(12,"span",10)(13,"span",11),i(),n(14,"input",12),l("input",function(){return r.onFilterTextBoxChanged()}),i()(),n(15,"div",13)(16,"button",14),l("click",function(){return r.loadTabla()}),n(17,"span",15),s(18,"span",16),n(19,"span",17),m(20,"Actualizar"),i()()(),n(21,"button",18),l("click",function(){return r.openCreateModal()}),n(22,"span",15),s(23,"span",19),n(24,"span",20),m(25,"An\u0303adir"),i()()()()(),n(26,"div",21),S(27,X,3,10)(28,Y,4,0),D(29,27,K,28),T(),i()()()()),e&2&&(v(26),p("ngClass",M(1,Q,r.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")))},dependencies:[R,A,z]})}};W=_([G()],W);export{W as UsersComponent};
