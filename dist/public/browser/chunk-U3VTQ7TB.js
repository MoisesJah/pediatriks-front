import{a as he}from"./chunk-RLKMVJSR.js";import{a as ve}from"./chunk-WFL7FBLQ.js";import"./chunk-EBZKSOFQ.js";import{a as O,c as fe}from"./chunk-HC5HCKLL.js";import{a as w}from"./chunk-4JVWF6E6.js";import{o as C}from"./chunk-47BWZHPK.js";import{A as R,c as A,d as I,e as D,f as L,i as le,k as q,l as se,n as ce,o as me,r as de,v as pe,y as ue}from"./chunk-JV7DKPVM.js";import{c as ge}from"./chunk-QDPNGC45.js";import{a as j}from"./chunk-U2EAJGNN.js";import{a as k}from"./chunk-MKNMNAUM.js";import{a as B,b as V}from"./chunk-TA6YOJTR.js";import{a as G}from"./chunk-T5KXAZJZ.js";import"./chunk-GKZUPR7X.js";import"./chunk-P5QLGDHL.js";import{m as T,n as ae,o as N,t as S,w as y}from"./chunk-CWIGPBJP.js";import{Ba as _,C as x,D as K,Fc as r,Gc as W,Hc as re,La as X,Ma as Y,Mb as h,Qc as b,Sc as M,Ua as Z,Vb as p,Xc as g,Yc as v,fc as t,gc as i,ha as Q,hc as c,ic as ie,jc as ne,lc as oe,n as E,qb as ee,uc as u,v as F,vc as P,wb as s,xa as d,xb as te,yc as U}from"./chunk-JCDSCFF6.js";function xe(l,a){l&1&&(t(0,"div")(1,"small",21),r(2,"La cantidad debe ser mayor que 0."),i()())}function Ie(l,a){l&1&&(t(0,"div")(1,"small",21),r(2,"El stock debe ser 0 o mayor."),i()())}function Ee(l,a){l&1&&c(0,"span",22)}var Se=(()=>{class l{constructor(e){this.fb=e,this.modal=d(C),this.loadingService=d(k),this.authService=d(w),this.solicitudInventarioService=d(O),this.isLoading=this.loadingService.isLoading,this.toast=d(ve),this.user=this.authService.user(),this.onRequestComplete=new Z,this.solicitarForm=this.fb.group({cantidad_solicitar:["",[I.required,I.min(1)]],stock_actual:["",[I.required,I.min(0)]]})}close(){this.modal.dismissAll()}sendRequest(){if(this.solicitarForm.invalid){console.error("El formulario no es v\xE1lido.");return}let e=this.solicitarForm.get("cantidad_solicitar")?.value,n=this.solicitarForm.get("stock_actual")?.value,o=this.user?.personal?.id_personal,m=this.user?.personal?.terapia?.id_terapia;if(this.inventarioId===void 0||!o||!m){console.error("Faltan datos necesarios para enviar la solicitud.");return}this.loadingService.startLoading(),this.solicitudInventarioService.enviarSolicitud(o,this.inventarioId.toString(),e,m,n).subscribe({next:()=>{this.onRequestComplete.emit()},error:f=>{f.error.invalid&&this.toast.error(f.error.invalid,"Error")},complete:()=>{this.loadingService.stopLoading(),this.close()}})}static{this.\u0275fac=function(n){return new(n||l)(te(ue))}}static{this.\u0275cmp=_({type:l,selectors:[["app-solicitar-modal"]],inputs:{inventarioId:"inventarioId"},outputs:{onRequestComplete:"onRequestComplete"},standalone:!0,features:[b],decls:32,vars:9,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"ngSubmit","formGroup"],[1,"form-group"],["for","cantidad_solicitar",1,"form-label"],["id","cantidad_solicitar","formControlName","cantidad_solicitar","type","number","placeholder","Ingresa la cantidad",1,"form-control"],[4,"ngIf"],["for","stock_actual",1,"form-label"],["id","stock_actual","formControlName","stock_actual","type","number","placeholder","Ingresa el stock actual","min","0",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(n,o){if(n&1&&(t(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),c(4,"span",4)(5,"span",5)(6,"span",6),i()(),r(7," Solicitar Stock "),i(),t(8,"button",7),u("click",function(){return o.close()}),t(9,"i",8),c(10,"span",4)(11,"span",5),i()()(),t(12,"div",9)(13,"form",10),u("ngSubmit",function(){return o.sendRequest()}),t(14,"div",11)(15,"label",12),r(16,"Cantidad a Solicitar"),i(),c(17,"input",13),h(18,xe,3,0,"div",14),i(),t(19,"div",11)(20,"label",15),r(21,"Stock que Posee Actualmente"),i(),c(22,"input",16),h(23,Ie,3,0,"div",14),i()()(),t(24,"div",17)(25,"button",18),u("click",function(){return o.close()}),r(26,"Cancelar"),i(),t(27,"button",19),g(28,"async"),u("click",function(){return o.sendRequest()}),r(29," Enviar solicitud "),h(30,Ee,1,0,"span",20),g(31,"async"),i()()),n&2){let m,f;s(13),p("formGroup",o.solicitarForm),s(5),p("ngIf",((m=o.solicitarForm.get("cantidad_solicitar"))==null?null:m.invalid)&&(((m=o.solicitarForm.get("cantidad_solicitar"))==null?null:m.touched)||((m=o.solicitarForm.get("cantidad_solicitar"))==null?null:m.dirty))),s(5),p("ngIf",((f=o.solicitarForm.get("stock_actual"))==null?null:f.invalid)&&(((f=o.solicitarForm.get("stock_actual"))==null?null:f.touched)||((f=o.solicitarForm.get("stock_actual"))==null?null:f.dirty))),s(4),p("disabled",o.solicitarForm.invalid||v(28,5,o.isLoading)),s(3),p("ngIf",v(31,7,o.isLoading))}},dependencies:[R,q,A,se,D,L,pe,me,de,y,N,S]})}}return l})();var Fe=l=>[l],z=class ${constructor(){this.modal=d(C),this.solicitudService=d(O),this.auth=d(w),this.theme=d(G),this.isLoading=d(k).isLoading,this.stockTerapista=new E,this.localeText=j,this.colDefs=[{field:"item",headerName:"Item",filter:!0},{field:"stock",headerName:"Stock",filter:"agNumberColumnFilter"},{field:"created_at",minWidth:250,headerName:"\xDAltima Solicitud Aprobada",filter:"agDateColumnFilter",filterParams:{comparator:(a,e)=>{let n=e;if(n==null)return 0;let o=n.slice(0,10).split("/"),m=Number(o[2]),f=Number(o[1])-1,Ce=Number(o[0]),J=new Date(m,f,Ce);return J<a?-1:J>a?1:0}},cellClass:"fw-semibold text-gray-600 text-center"}]}ngOnInit(){this.getStock()}getStock(){this.stockTerapista=this.solicitudService.stockTerapista({id_personal:this.auth.user()?.personal?.id_personal}).pipe(x(a=>a.data),V(this))}close(){this.modal.dismissAll()}static{this.\u0275fac=function(e){return new(e||$)}}static{this.\u0275cmp=_({type:$,selectors:[["app-mi-stock"]],standalone:!0,features:[b],decls:18,vars:12,consts:[[1,"modal-body"],[1,"d-flex","py-4","justify-content-between","align-items-center"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-sm","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"path1"],[1,"path2"],["id","myGrid",2,"height","calc(100dvh - 281px)",3,"ngClass"],[2,"width","100%","height","100%",3,"localeText","pagination","loading","rowData","columnDefs"]],template:function(e,n){e&1&&(t(0,"div",0)(1,"div",1)(2,"h3"),r(3,"Mi Stock"),i(),t(4,"div",2)(5,"button",3),u("click",function(){return n.getStock()}),t(6,"span",4),c(7,"span",5),t(8,"span",6),r(9,"Actualizar"),i()()(),t(10,"button",7),u("click",function(){return n.close()}),t(11,"i",8),c(12,"span",9)(13,"span",10),i()()()(),t(14,"div",11),c(15,"ag-grid-angular",12),g(16,"async"),g(17,"async"),i()()),e&2&&(s(14),p("ngClass",M(10,Fe,n.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")),s(),p("localeText",n.localeText)("pagination",!0)("loading",v(16,6,n.isLoading))("rowData",v(17,8,n.stockTerapista))("columnDefs",n.colDefs))},dependencies:[ge,y,T,S]})}};z=F([B()],z);var Me=l=>({"img-inventory":l});function Te(l,a){l&1&&(t(0,"div",22)(1,"div",23)(2,"span",24),r(3,"Cargando..."),i()()())}function Ne(l,a){if(l&1){let e=oe();t(0,"div",25)(1,"div",26)(2,"div",27),c(3,"img",28),i(),t(4,"div",29)(5,"h5",30),r(6),i(),t(7,"p",31),r(8),i(),t(9,"p",31)(10,"strong"),r(11,"Stock:"),i(),r(12),i(),t(13,"button",32),u("click",function(){let o=X(e).$implicit,m=P();return Y(m.openSolicitarModal(o))}),c(14,"span",33),r(15," Solicitar "),i()()()()}if(l&2){let e=a.$implicit,n=P();s(2),p("ngClass",M(6,Me,e.banner_url==null?null:e.banner_url.includes("default.png"))),s(),U("src",e.banner_url!=null&&e.banner_url.includes("default.png")?n.banner_url:e.banner_url,ee),U("alt",e.nombre),s(3),W(e.nombre),s(2),W(e.descripcion),s(4),re(" ",e.stock,"")}}var ye=class H{constructor(){this.inventarioService=d(he),this.isLoading=d(k).isLoading,this.theme=d(G),this.modal=d(C),this.inventarioList=new E,this.localeText=j,this.searchControl=new le(""),this.banner_url="https://cdn-icons-png.flaticon.com/512/9573/9573235.png"}ngOnInit(){this.fetchInventario()}fetchInventario(){let a=this.searchControl.valueChanges.pipe(Q(""));this.inventarioList=K([this.inventarioService.getAll().pipe(x(e=>e.data),V(this)),a]).pipe(x(([e,n])=>n?e.filter(o=>o.nombre.toLowerCase().includes(n.toLowerCase())):e))}loadTabla(){this.fetchInventario()}gridReady(a){this.gridApi=a.api}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("item-search").value)}openSolicitarModal(a){let e=this.modal.open(Se,{size:"300px",animation:!0,centered:!0});e.componentInstance.inventarioId=a.id,e.componentInstance.onRequestComplete.subscribe(()=>{this.fetchInventario()})}openStockModal(){this.modal.open(z,{centered:!0,size:"lg"})}ngOnDestroy(){}static{this.\u0275fac=function(e){return new(e||H)}}static{this.\u0275cmp=_({type:H,selectors:[["app-inventario"]],standalone:!0,features:[b],decls:29,vars:7,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"d-flex","py-4","justify-content-between","align-items-center"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","item-search","name","search","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"formControl"],[1,"d-flex","align-items-center","gap-3"],[1,"btn","btn-secondary",3,"click"],[1,"ki-solid","ki-abstract-28","fs-4"],[1,"ms-2"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],["class","loading-container d-flex justify-content-center align-items-center",4,"ngIf"],[1,"row","my-5"],["class","col-md-4",4,"ngFor","ngForOf"],[1,"loading-container","d-flex","justify-content-center","align-items-center"],["role","status",1,"spinner-border","text-primary"],[1,"visually-hidden"],[1,"col-md-4"],[1,"card","mb-4"],[1,"image-container",3,"ngClass"],[1,"card-img-top",2,"width","100%","height","auto",3,"src","alt"],[1,"card-body"],[1,"card-title","fs-2"],[1,"card-text"],["type","button",1,"btn","btn-primary","btn-lg","w-100","d-flex","justify-content-center","align-items-center",3,"click"],[1,"ki-solid","ki-plus","text-white","fs-1"]],template:function(e,n){e&1&&(t(0,"app-header"),ie(1,0),t(2,"h1",1)(3,"span",2),r(4,"Inventario"),i()(),ne(),i(),t(5,"div",3)(6,"div",4)(7,"div",5)(8,"form",6),c(9,"input",7),t(10,"i",8),c(11,"span",9)(12,"span",10),i(),c(13,"input",11),i(),t(14,"div",12)(15,"button",13),u("click",function(){return n.openStockModal()}),c(16,"span",14),t(17,"span",15),r(18,"Mi Stock"),i()(),t(19,"button",16),u("click",function(){return n.loadTabla()}),t(20,"span",17),c(21,"span",18),t(22,"span",15),r(23,"Actualizar"),i()()()()(),h(24,Te,4,0,"div",19),g(25,"async"),t(26,"div",20),h(27,Ne,16,8,"div",21),g(28,"async"),i()()()),e&2&&(s(13),p("formControl",n.searchControl),s(11),p("ngIf",v(25,3,n.isLoading)),s(3),p("ngForOf",v(28,5,n.inventarioList)))},dependencies:[y,T,ae,N,S,fe,R,q,A,D,L,ce]})}};ye=F([B()],ye);export{ye as InventarioComponent};
