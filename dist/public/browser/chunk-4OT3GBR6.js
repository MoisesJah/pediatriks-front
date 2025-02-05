import{a as ae}from"./chunk-CNJ6AYXX.js";import{a as oe,b as re}from"./chunk-KG3B2A6X.js";import{a as ne}from"./chunk-U2EAJGNN.js";import{o as I,t as te,u as ie}from"./chunk-CZPC3FHQ.js";import{a as k}from"./chunk-NMGGHNE5.js";import{a as z}from"./chunk-A3C2G7L3.js";import{a as ee}from"./chunk-KNEUCQQI.js";import"./chunk-GKZUPR7X.js";import{A as K,C as Q,F as W,J as X,M as Y,O as Z,r as U,s as _,t as $,u as H,z as J}from"./chunk-R7YU5FNY.js";import{n as P,o as y,t as x,v as C}from"./chunk-DP3M2V7L.js";import{Aa as b,Ac as G,C as L,Gc as S,Ka as q,La as A,Lb as v,Nc as g,Oc as h,Ta as N,Ub as p,bc as e,cc as t,dc as c,ec as D,fc as O,hc as V,n as T,nc as u,oc as j,pb as R,rc as E,v as w,vb as s,wa as m,wb as B,yc as o,zc as F}from"./chunk-B7JMKZ3I.js";function me(r,l){r&1&&(e(0,"div")(1,"small",21),o(2,"La cantidad debe ser mayor que 0."),t()())}function pe(r,l){r&1&&(e(0,"div")(1,"small",21),o(2,"El stock debe ser 0 o mayor."),t()())}function ue(r,l){r&1&&c(0,"span",22)}var le=(()=>{class r{constructor(i){this.fb=i,this.modal=m(I),this.loadingService=m(k),this.authService=m(z),this.solicitudInventarioService=m(te),this.isLoading=this.loadingService.isLoading,this.user=this.authService.user(),this.onRequestComplete=new N,this.solicitarForm=this.fb.group({cantidad_solicitar:["",[_.required,_.min(1)]],stock_actual:["",[_.required,_.min(0)]]})}close(){this.modal.dismissAll()}sendRequest(){if(this.solicitarForm.invalid){console.error("El formulario no es v\xE1lido.");return}let i=this.solicitarForm.get("cantidad_solicitar")?.value,d=this.solicitarForm.get("stock_actual")?.value,n=this.user?.personal?.id_personal,a=this.user?.personal?.terapia?.id_terapia;if(this.inventarioId===void 0||!n||!a){console.error("Faltan datos necesarios para enviar la solicitud.");return}this.loadingService.startLoading(),this.solicitudInventarioService.enviarSolicitud(n,this.inventarioId.toString(),i,a,d).subscribe({next:()=>{console.log("Solicitud de stock enviada exitosamente."),this.onRequestComplete.emit()},error:f=>{console.error("Error al enviar la solicitud:",f)},complete:()=>{this.loadingService.stopLoading(),this.close()}})}static{this.\u0275fac=function(d){return new(d||r)(B(Y))}}static{this.\u0275cmp=b({type:r,selectors:[["app-solicitar-modal"]],inputs:{inventarioId:"inventarioId"},outputs:{onRequestComplete:"onRequestComplete"},standalone:!0,features:[S],decls:32,vars:9,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"ngSubmit","formGroup"],[1,"form-group"],["for","cantidad_solicitar",1,"form-label"],["id","cantidad_solicitar","formControlName","cantidad_solicitar","type","number","placeholder","Ingresa la cantidad",1,"form-control"],[4,"ngIf"],["for","stock_actual",1,"form-label"],["id","stock_actual","formControlName","stock_actual","type","number","placeholder","Ingresa el stock actual","min","0",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(d,n){if(d&1&&(e(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),c(4,"span",4)(5,"span",5)(6,"span",6),t()(),o(7," Solicitar Stock "),t(),e(8,"button",7),u("click",function(){return n.close()}),e(9,"i",8),c(10,"span",4)(11,"span",5),t()()(),e(12,"div",9)(13,"form",10),u("ngSubmit",function(){return n.sendRequest()}),e(14,"div",11)(15,"label",12),o(16,"Cantidad a Solicitar"),t(),c(17,"input",13),v(18,me,3,0,"div",14),t(),e(19,"div",11)(20,"label",15),o(21,"Stock que Posee Actualmente"),t(),c(22,"input",16),v(23,pe,3,0,"div",14),t()()(),e(24,"div",17)(25,"button",18),u("click",function(){return n.close()}),o(26,"Cancelar"),t(),e(27,"button",19),g(28,"async"),u("click",function(){return n.sendRequest()}),o(29," Enviar solicitud "),v(30,ue,1,0,"span",20),g(31,"async"),t()()),d&2){let a,f;s(13),p("formGroup",n.solicitarForm),s(5),p("ngIf",((a=n.solicitarForm.get("cantidad_solicitar"))==null?null:a.invalid)&&(((a=n.solicitarForm.get("cantidad_solicitar"))==null?null:a.touched)||((a=n.solicitarForm.get("cantidad_solicitar"))==null?null:a.dirty))),s(5),p("ngIf",((f=n.solicitarForm.get("stock_actual"))==null?null:f.invalid)&&(((f=n.solicitarForm.get("stock_actual"))==null?null:f.touched)||((f=n.solicitarForm.get("stock_actual"))==null?null:f.dirty))),s(4),p("disabled",n.solicitarForm.invalid||h(28,5,n.isLoading)),s(3),p("ngIf",h(31,7,n.isLoading))}},dependencies:[Z,J,U,K,$,H,X,Q,W,C,y,x]})}}return r})();function fe(r,l){r&1&&(e(0,"div",20)(1,"div",21)(2,"span",22),o(3,"Cargando..."),t()()())}function ve(r,l){if(r&1){let i=V();e(0,"div",23)(1,"div",24)(2,"div",25),c(3,"img",26),t(),e(4,"div",27)(5,"h5",28),o(6),t(),e(7,"p",29),o(8),t(),e(9,"p",29)(10,"strong"),o(11,"Stock:"),t(),o(12),t(),e(13,"button",30),u("click",function(){let n=q(i).$implicit,a=j();return A(a.openSolicitarModal(n))}),c(14,"span",31),o(15," Solicitar "),t()()()()}if(r&2){let i=l.$implicit;s(3),E("src",i.banner_url,R),E("alt",i.nombre),s(3),F(i.nombre),s(2),F(i.descripcion),s(4),G(" ",i.stock,"")}}var se=class M{constructor(){this.inventarioService=m(ae),this.isLoading=m(k).isLoading,this.theme=m(ee),this.modal=m(I),this.inventarioList=new T,this.localeText=ne}ngOnInit(){this.fetchInventario()}fetchInventario(){this.inventarioList=this.inventarioService.getAll().pipe(L(l=>(console.log("Inventario recibido:",l.data),l.data)),re(this))}loadTabla(){this.fetchInventario()}gridReady(l){this.gridApi=l.api}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("item-search").value)}openSolicitarModal(l){let i=this.modal.open(le,{size:"300px",animation:!0,centered:!0});i.componentInstance.inventarioId=l.id,i.componentInstance.onRequestComplete.subscribe(()=>{this.fetchInventario()})}ngOnDestroy(){}static{this.\u0275fac=function(i){return new(i||M)}}static{this.\u0275cmp=b({type:M,selectors:[["app-inventario"]],standalone:!0,features:[S],decls:25,vars:6,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"d-flex","py-4","justify-content-between","align-items-center"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","item-search","name","search","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"input"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],["class","loading-container d-flex justify-content-center align-items-center",4,"ngIf"],[1,"row"],["class","col-md-4",4,"ngFor","ngForOf"],[1,"loading-container","d-flex","justify-content-center","align-items-center"],["role","status",1,"spinner-border","text-primary"],[1,"visually-hidden"],[1,"col-md-4"],[1,"card","mb-4",2,"width","18rem","padding","5px"],[1,"image-container",2,"box-shadow","0 4px 8px rgba(0, 0, 0, 0.1)","border-radius","8px","overflow","hidden"],[1,"card-img-top",2,"width","100%","height","auto",3,"src","alt"],[1,"card-body"],[1,"card-title"],[1,"card-text"],["type","button",1,"btn","btn-primary","btn-lg","w-100","d-flex","justify-content-center","align-items-center",3,"click"],[1,"ki-solid","ki-plus","text-white","fs-1"]],template:function(i,d){i&1&&(e(0,"app-header"),D(1,0),e(2,"h1",1)(3,"span",2),o(4,"Inventario"),t()(),O(),t(),e(5,"div",3)(6,"div",4)(7,"div",5)(8,"form",6),c(9,"input",7),e(10,"i",8),c(11,"span",9)(12,"span",10),t(),e(13,"input",11),u("input",function(){return d.onFilterTextBoxChanged()}),t()(),e(14,"div",12)(15,"button",13),u("click",function(){return d.loadTabla()}),e(16,"span",14),c(17,"span",15),e(18,"span",16),o(19,"Actualizar"),t()()()()(),v(20,fe,4,0,"div",17),g(21,"async"),e(22,"div",18),v(23,ve,16,5,"div",19),g(24,"async"),t()()()),i&2&&(s(20),p("ngIf",h(21,2,d.isLoading)),s(3),p("ngForOf",h(24,4,d.inventarioList)))},dependencies:[C,P,y,x,ie]})}};se=w([oe()],se);export{se as InventarioComponent};
