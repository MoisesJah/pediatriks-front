import{b as q,c as j,d as V,e as P}from"./chunk-NM3ZKYMF.js";import"./chunk-WXQDA2BM.js";import{a as B}from"./chunk-35XITZXV.js";import"./chunk-IWNHHSHM.js";import"./chunk-ZUYGAZX4.js";import"./chunk-DUBUW4ZU.js";import{a as H}from"./chunk-MYRVSVX3.js";import{a as O,b as G}from"./chunk-FKRAWMO5.js";import{b as L,i as N,k as z}from"./chunk-XWWCT2EB.js";import{a as F}from"./chunk-PQDQNIDX.js";import"./chunk-OIXA5WM3.js";import{d as A,i as I,k as R}from"./chunk-MFZOMSUD.js";import{Ac as d,B as x,Ba as s,Fa as C,Fc as w,Hc as M,I as _,Lc as f,Mc as h,Ob as S,Pa as y,Qa as b,Sb as D,Ub as T,Xb as c,ec as i,fc as n,gc as l,hc as U,ic as E,kc as k,qc as m,rc as u,t as g,zb as v}from"./chunk-JQJUQ5FW.js";var K=()=>[I,import("./chunk-RHBLOMFZ.js").then(r=>r.AgGridAngular)],Q=r=>[r];function X(r,t){if(r&1){let e=k();i(0,"ag-grid-angular",22),f(1,"async"),f(2,"async"),m("gridReady",function(p){y(e);let J=u();return b(J.gridReady(p))}),n()}if(r&2){let e=u();c("rowData",h(1,6,e.userList))("loading",h(2,8,e.isLoading))("columnDefs",e.colDefs)("enableCellTextSelection",!0)("localeText",e.localeText)("pagination",!0)}}function Y(r,t){r&1&&(i(0,"div",23)(1,"div",24)(2,"span",25),d(3,"Loading..."),n()()())}var o,W=(o=class{constructor(){this.users=s(B),this.isLoading=s(F).isLoading,this.theme=s(N),this.modal=s(L),this.localeText=H,this.userList=new g,this.colDefs=[{field:"name",headerName:"Nombre",filter:!0},{field:"dni",headerName:"DNI",filter:!0},{field:"direccion",headerName:"Direcci\xF3n",filter:!0},{field:"telefono",headerName:"Tel\xE9fono",filter:!0},{field:"email",headerName:"Correo",filter:!0},{field:"tipo_user.nombre",headerName:"Tipo de Usuario",filter:!0},{headerName:"Acciones",cellRenderer:P,cellRendererParams:{onEdit:t=>this.openEditModal(t),onDelete:t=>this.openDeleteModal(t)},maxWidth:100,resizable:!1}]}ngOnInit(){this.fetchUsers()}gridReady(t){this.gridApi=t.api}fetchUsers(){this.userList=this.users.getAll().pipe(_(t=>t.data),G(this))}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("user-search").value)}ngOnDestroy(){}loadTabla(){this.fetchUsers()}openCreateModal(){this.modal.open(q,{size:"300px",animation:!0,centered:!0}).componentInstance.onSaveComplete.subscribe(()=>{this.fetchUsers()})}openEditModal(t){let e=this.modal.open(j,{size:"300px",animation:!0,centered:!0});e.componentInstance.userId=t.id,e.componentInstance.onSaveComplete.subscribe(()=>{this.fetchUsers()})}openDeleteModal(t){let e=this.modal.open(V,{size:"300px",animation:!0,centered:!0});e.componentInstance.userId=t.id,e.componentInstance.onSaveComplete.subscribe(()=>{this.fetchUsers()})}},o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=C({type:o,selectors:[["app-users"]],standalone:!0,features:[w],decls:31,vars:3,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"card","shadow","p-2","px-4"],[1,"d-flex","py-4","gap-3","justify-content-between","align-items-center"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","user-search","name","search","value","","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"input"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],["type","button",1,"btn","btn-primary",3,"click"],[1,"ki-solid","ki-plus","text-white","fs-1"],[1,"text-white","ms-2"],["id","myGrid",2,"height","calc(100dvh - 281px)",3,"ngClass"],[2,"width","100%","height","100%",3,"gridReady","rowData","loading","columnDefs","enableCellTextSelection","localeText","pagination"],[1,"d-flex","justify-content-center","align-items-center",2,"height","100%"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(e,a){e&1&&(i(0,"app-header"),U(1,0),i(2,"h1",1)(3,"span",2),d(4,"Usuarios"),n()(),E(),n(),i(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"form",7),l(10,"input",8),i(11,"i",9),l(12,"span",10)(13,"span",11),n(),i(14,"input",12),m("input",function(){return a.onFilterTextBoxChanged()}),n()(),i(15,"div",13)(16,"button",14),m("click",function(){return a.loadTabla()}),i(17,"span",15),l(18,"span",16),i(19,"span",17),d(20,"Actualizar"),n()()(),i(21,"button",18),m("click",function(){return a.openCreateModal()}),i(22,"span",15),l(23,"span",19),i(24,"span",20),d(25,"An\u0303adir"),n()()()()(),i(26,"div",21),S(27,X,3,10)(28,Y,4,0),D(29,27,K,28),T(),n()()()()),e&2&&(v(26),c("ngClass",M(1,Q,a.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")))},dependencies:[R,A,z]}),o);W=x([O()],W);export{W as UsersComponent};
