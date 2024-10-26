import"./chunk-7W3L62EU.js";import{a as _e}from"./chunk-MYRVSVX3.js";import{a as B,b as he}from"./chunk-73QAVBZN.js";import{a as k}from"./chunk-C4LB5HPP.js";import{b as C,i as be,j as ge}from"./chunk-FR665RP3.js";import{a as ve,e as V,f as g,g as G,h as j,l as O,m as W,o as R,r as $,u as h,w as N}from"./chunk-O36CONK3.js";import{f as ue,g as T,j as I,l as S,m as fe}from"./chunk-FM6AGUVW.js";import{B as D,C as L,Da as _,Ec as y,I as re,Kb as b,Kc as f,Lc as v,Na as z,Oa as P,Tb as u,Wa as w,ac as o,bc as n,cc as l,dc as me,ec as de,gc as pe,mc as s,nc as Q,qc as te,rb as se,sa as ae,sc as H,t as oe,tc as J,uc as K,wb as d,wc as a,xb as q,xc as ie,ya as le,yc as ce,za as c}from"./chunk-6QDZBSPE.js";var E=(()=>{let t=class t{constructor(e){this.http=e,this.apiUrl=`${ve.apiUrl}/inventario`}getAll(){return this.http.get(`${this.apiUrl}/list`)}getById(e){return this.http.get(`${this.apiUrl}/show/${e}`)}create(e){return this.http.post(`${this.apiUrl}/add`,e)}update(e,r){return this.http.put(`${this.apiUrl}/edit/${e}`,r)}delete(e){return this.http.delete(`${this.apiUrl}/delete/${e}`)}addStock(e){return this.http.post(`${this.apiUrl}/add-stock`,e)}requestItem(e,r){let p={itemId:e,terapeutaId:r};return this.http.post(`${this.apiUrl}/request-item`,p)}};t.\u0275fac=function(r){return new(r||t)(le(fe))},t.\u0275prov=ae({token:t,factory:t.\u0275fac,providedIn:"root"});let m=t;return m})();var Ce=["fileInput"];function ke(m,t){m&1&&(o(0,"div")(1,"small",25),a(2,"El stock debe ser mayor que 0."),n()())}function Ee(m,t){m&1&&l(0,"span",26)}var x,X=(x=class{constructor(t){this.fb=t,this.modal=c(C),this.inventarioService=c(E),this.loadingService=c(k),this.isLoading=this.loadingService.isLoading,this.onSaveComplete=new w,this.inventarioForm=this.fb.group({nombre:["",g.required],descripcion:[""],stock:["",[g.required,g.min(1)]],banner_url:[""]})}evtSelectFile(t){let i=t.target.files;this.inventarioForm.get("banner_url")?.setValue(i?.item(0))}ngOnInit(){}close(){this.modal.dismissAll()}save(){let t=new FormData;Object.keys(this.inventarioForm.value).forEach(i=>{let e=this.inventarioForm.get(i);Array.isArray(e?.value)?t.append(i,JSON.stringify(e?.value)):t.append(i,e?.value)}),this.inventarioService.create(t).subscribe({next:()=>{this.modal.dismissAll(),this.onSaveComplete.emit()},error:i=>{console.log(i)}})}},x.\u0275fac=function(i){return new(i||x)(q(h))},x.\u0275cmp=_({type:x,selectors:[["app-crear-modal"]],viewQuery:function(i,e){if(i&1&&H(Ce,5),i&2){let r;J(r=K())&&(e.fileInput=r.first)}},outputs:{onSaveComplete:"onSaveComplete"},standalone:!0,features:[y],decls:39,vars:8,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"ngSubmit","formGroup"],[1,"form-group"],["for","nombre",1,"required","form-label"],["type","text","id","nombre","formControlName","nombre","placeholder","Ingresa Nombre del Item",1,"form-control"],["for","",1,"required","form-label"],["type","file","id","imagen","accept","image/*",1,"form-control",3,"change"],["for","descripcion",1,"form-label"],["cols","3","rows","2","id","descripcion","formControlName","descripcion","placeholder","Ingresa Descripci\xF3n del Paquete",1,"form-control"],["for","stock",1,"form-label"],["id","stock","formControlName","stock","type","number","placeholder","Ingresa el stock",1,"form-control"],[4,"ngIf"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(i,e){if(i&1&&(o(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),l(4,"span",4)(5,"span",5)(6,"span",6),n()(),a(7," A\xF1adir Inventario "),n(),o(8,"button",7),s("click",function(){return e.close()}),o(9,"i",8),l(10,"span",4)(11,"span",5),n()()(),o(12,"div",9)(13,"form",10),s("ngSubmit",function(){return e.save()}),o(14,"div",11)(15,"label",12),a(16,"Nombre del Item"),n(),l(17,"input",13),n(),o(18,"div",11)(19,"label",14),a(20,"Imagen"),n(),o(21,"input",15),s("change",function(p){return e.evtSelectFile(p)}),n()(),o(22,"div",11)(23,"label",16),a(24,"Descripci\xF3n"),n(),l(25,"textarea",17),n(),o(26,"div",11)(27,"label",18),a(28,"Stock"),n(),l(29,"input",19),b(30,ke,3,0,"div",20),n()()(),o(31,"div",21)(32,"button",22),s("click",function(){return e.close()}),a(33,"Cancelar"),n(),o(34,"button",23),f(35,"async"),s("click",function(){return e.save()}),a(36," Guardar "),b(37,Ee,1,0,"span",24),f(38,"async"),n()()),i&2){let r;d(13),u("formGroup",e.inventarioForm),d(17),u("ngIf",((r=e.inventarioForm.get("stock"))==null?null:r.invalid)&&(((r=e.inventarioForm.get("stock"))==null?null:r.touched)||((r=e.inventarioForm.get("stock"))==null?null:r.dirty))),d(4),u("disabled",e.inventarioForm.invalid||v(35,4,e.isLoading)),d(3),u("ngIf",v(38,6,e.isLoading))}},dependencies:[N,O,V,W,G,j,R,$,S,T,I]}),x);X=D([B({checkProperties:!0}),L("design:paramtypes",[h])],X);function xe(m,t){m&1&&l(0,"span",13)}var Ie=(()=>{let t=class t{constructor(){this.modal=c(C),this.inventarioService=c(E),this.isLoading=c(k).isLoading,this.inventarioId="",this.onSaveComplete=new w}close(){this.modal.dismissAll()}delete(){let e=typeof this.inventarioId=="string"?this.inventarioId:this.inventarioId.id;e?this.inventarioService.delete(e).subscribe({next:()=>{this.onSaveComplete.emit(),this.modal.dismissAll()},error:r=>{console.error("Error al eliminar inventario:",r)}}):console.error("ID del inventario no proporcionado o en formato incorrecto")}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=_({type:t,selectors:[["app-borrar-modal"]],inputs:{inventarioId:"inventarioId"},outputs:{onSaveComplete:"onSaveComplete"},standalone:!0,features:[y],decls:25,vars:6,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-information","text-danger","fs-2hx",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body","text-center"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-danger",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(r,p){r&1&&(o(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),l(4,"span",3)(5,"span",4)(6,"span",5),n()(),a(7," Eliminar Inventario "),n(),o(8,"button",6),s("click",function(){return p.close()}),o(9,"i",7),l(10,"span",3)(11,"span",4),n()()(),o(12,"div",8)(13,"p"),a(14,"\xBFEst\xE1s seguro de eliminar este registro de inventario?"),n(),o(15,"p"),a(16,"Toda la informaci\xF3n relacionada con este \xEDtem se perder\xE1."),n()(),o(17,"div",9)(18,"button",10),s("click",function(){return p.close()}),a(19," Cancelar "),n(),o(20,"button",11),f(21,"async"),s("click",function(){return p.delete()}),a(22," Eliminar "),b(23,xe,1,0,"span",12),f(24,"async"),n()()),r&2&&(d(20),u("disabled",v(21,2,p.isLoading)),d(3),u("ngIf",v(24,4,p.isLoading)))},dependencies:[N,S,T,I]});let m=t;return m})();var Fe=["fileInput"];function Me(m,t){m&1&&l(0,"span",18)}var F,Z=(F=class{constructor(t){this.fb=t,this.modal=c(C),this.inventarioService=c(E),this.isLoading=c(k).isLoading,this.inventarioId="",this.onSaveComplete=new w,this.inventarioForm=this.fb.group({nombre:["",g.required],descripcion:["",g.required],banner_url:[""]})}ngOnInit(){typeof this.inventarioId=="string"?this.loadInventarioData():typeof this.inventarioId=="object"&&this.inventarioId.id?this.loadInventarioData(this.inventarioId.id):console.error("ID del inventario no proporcionado o no es una cadena",this.inventarioId)}close(){this.modal.dismissAll()}save(){if(this.inventarioForm.valid){let t=new FormData;t.append("nombre",this.inventarioForm.get("nombre")?.value),t.append("descripcion",this.inventarioForm.get("descripcion")?.value),console.log("Datos que se env\xEDan:",this.inventarioForm.value);let i=typeof this.inventarioId=="string"?this.inventarioId:this.inventarioId.id;i?this.inventarioService.update(i,t).subscribe({next:()=>{console.log("Actualizaci\xF3n exitosa"),this.onSaveComplete.emit(),this.modal.dismissAll()},error:e=>{console.error("Error al actualizar inventario:",e.message),alert("No se pudo actualizar el inventario. Intenta nuevamente.")}}):console.error("ID del inventario no proporcionado o en formato incorrecto")}}loadInventarioData(t){let i=t||(typeof this.inventarioId=="object"?this.inventarioId.id:this.inventarioId);i?this.inventarioService.getById(i).subscribe({next:e=>{this.inventarioForm.patchValue(e.data)},error:e=>{console.error("Error al cargar datos del inventario:",e)}}):console.error("ID del inventario no proporcionado")}},F.\u0275fac=function(i){return new(i||F)(q(h))},F.\u0275cmp=_({type:F,selectors:[["app-editar-modal"]],viewQuery:function(i,e){if(i&1&&H(Fe,5),i&2){let r;J(r=K())&&(e.fileInput=r.first)}},inputs:{inventarioId:"inventarioId"},outputs:{onSaveComplete:"onSaveComplete"},standalone:!0,features:[y],decls:29,vars:7,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-notepad-edit","text-gray-900","fs-1",2,"vertical-align","top"],[1,"path1"],[1,"path2"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"form-group"],["for","nombre",1,"required","form-label"],["type","text","id","nombre","formControlName","nombre",1,"form-control"],["for","descripcion",1,"required","form-label"],["rows","2","id","descripcion","formControlName","descripcion",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(i,e){i&1&&(o(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),l(4,"span",3)(5,"span",4),n()(),a(6," Editar Inventario "),n(),o(7,"button",5),s("click",function(){return e.close()}),o(8,"i",6),l(9,"span",3)(10,"span",4),n()()(),o(11,"div",7)(12,"form",8)(13,"div",9)(14,"label",10),a(15,"Nombre del Inventario"),n(),l(16,"input",11),n(),o(17,"div",9)(18,"label",12),a(19,"Descripci\xF3n"),n(),l(20,"textarea",13),n()()(),o(21,"div",14)(22,"button",15),s("click",function(){return e.close()}),a(23," Cancelar "),n(),o(24,"button",16),f(25,"async"),s("click",function(){return e.save()}),a(26," Guardar "),b(27,Me,1,0,"span",17),f(28,"async"),n()()),i&2&&(d(12),u("formGroup",e.inventarioForm),d(12),u("disabled",e.inventarioForm.invalid||v(25,3,e.isLoading)),d(3),u("ngIf",v(28,5,e.isLoading)))},dependencies:[N,O,V,G,j,R,$,S,T,I]}),F);Z=D([B({checkProperties:!0}),L("design:paramtypes",[h])],Z);function Ae(m,t){m&1&&(o(0,"div")(1,"small",21),a(2,"El stock debe ser mayor que 0."),n()())}function De(m,t){m&1&&(o(0,"div")(1,"small",21),a(2,"El costo del stock debe ser un n\xFAmero."),n()())}function we(m,t){m&1&&l(0,"span",22)}var M,ee=(M=class{constructor(t){this.fb=t,this.modal=c(C),this.inventarioService=c(E),this.loadingService=c(k),this.isLoading=this.loadingService.isLoading,this.inventarioId="",this.onSaveComplete=new w,this.inventarioForm=this.fb.group({stock:["",[g.required,g.min(1)]],costo_stock:["",[g.required,g.min(0)]]})}ngOnInit(){typeof this.inventarioId=="string"?this.loadInventarioData():typeof this.inventarioId=="object"&&this.inventarioId.id?this.loadInventarioData(this.inventarioId.id):console.error("ID del inventario no proporcionado o no es una cadena",this.inventarioId)}loadInventarioData(t){let i=t||(typeof this.inventarioId=="object"?this.inventarioId.id:this.inventarioId);i?this.inventarioService.getById(i).subscribe({next:e=>{this.inventarioForm.patchValue({costo_stock:"",stock:""})},error:e=>{console.error("Error al cargar datos del inventario:",e)}}):console.error("ID del inventario no proporcionado")}close(){this.modal.dismissAll()}save(){if(!this.inventarioId){console.error("El inventario no tiene un ID v\xE1lido.");return}if(this.inventarioForm.invalid){console.error("El formulario no es v\xE1lido.");return}let t={id:this.inventarioId.toString(),stock:this.inventarioForm.get("stock")?.value,costo_stock:this.inventarioForm.get("costo_stock")?.value};this.inventarioService.addStock(t).subscribe({next:i=>{console.log("Stock agregado exitosamente:",i),this.close(),this.onSaveComplete.emit()},error:i=>{console.error("Error al agregar stock:",i)}})}},M.\u0275fac=function(i){return new(i||M)(q(h))},M.\u0275cmp=_({type:M,selectors:[["app-agregar-modal"]],inputs:{inventarioId:"inventarioId"},outputs:{onSaveComplete:"onSaveComplete"},standalone:!0,features:[y],decls:32,vars:9,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"ngSubmit","formGroup"],[1,"form-group"],["for","stock",1,"form-label"],["id","stock","formControlName","stock","type","number","placeholder","Ingresa el stock",1,"form-control"],[4,"ngIf"],["for","costo_stock",1,"required","form-label"],["id","costo_stock","formControlName","costo_stock","type","number","step","0.01","placeholder","Ingresa el costo del stock",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(i,e){if(i&1&&(o(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),l(4,"span",4)(5,"span",5)(6,"span",6),n()(),a(7," A\xF1adir Stock "),n(),o(8,"button",7),s("click",function(){return e.close()}),o(9,"i",8),l(10,"span",4)(11,"span",5),n()()(),o(12,"div",9)(13,"form",10),s("ngSubmit",function(){return e.save()}),o(14,"div",11)(15,"label",12),a(16,"Stock"),n(),l(17,"input",13),b(18,Ae,3,0,"div",14),n(),o(19,"div",11)(20,"label",15),a(21,"Costo del Stock"),n(),l(22,"input",16),b(23,De,3,0,"div",14),n()()(),o(24,"div",17)(25,"button",18),s("click",function(){return e.close()}),a(26,"Cancelar"),n(),o(27,"button",19),f(28,"async"),s("click",function(){return e.save()}),a(29," Guardar "),b(30,we,1,0,"span",20),f(31,"async"),n()()),i&2){let r,p;d(13),u("formGroup",e.inventarioForm),d(5),u("ngIf",((r=e.inventarioForm.get("stock"))==null?null:r.invalid)&&(((r=e.inventarioForm.get("stock"))==null?null:r.touched)||((r=e.inventarioForm.get("stock"))==null?null:r.dirty))),d(5),u("ngIf",((p=e.inventarioForm.get("costo_stock"))==null?null:p.invalid)&&(((p=e.inventarioForm.get("costo_stock"))==null?null:p.touched)||((p=e.inventarioForm.get("costo_stock"))==null?null:p.dirty))),d(4),u("disabled",e.inventarioForm.invalid||v(28,5,e.isLoading)),d(3),u("ngIf",v(31,7,e.isLoading))}},dependencies:[N,O,V,W,G,j,R,$,S,T,I]}),M);ee=D([B({checkProperties:!0}),L("design:paramtypes",[h])],ee);function Te(m,t){if(m&1){let i=pe();o(0,"div",22)(1,"div",23)(2,"div",24)(3,"div",25)(4,"button",26),s("click",function(){let r=z(i).$implicit,p=Q();return P(p.openEditarModal(r))}),l(5,"span",27),n(),o(6,"button",28),s("click",function(){let r=z(i).$implicit,p=Q();return P(p.openBorrarModal(r))}),l(7,"span",29),n()(),o(8,"div",30),l(9,"img",31),n()(),o(10,"div",32)(11,"h5",33),a(12),n(),o(13,"p",34),a(14),n(),o(15,"p",34)(16,"strong"),a(17,"Stock:"),n(),a(18),n(),o(19,"button",35),s("click",function(){let r=z(i).$implicit,p=Q();return P(p.openAgregarModal(r))}),l(20,"span",18),a(21," Agregar "),n()()()()}if(m&2){let i=t.$implicit;d(9),te("src",i.banner_url,se),te("alt",i.nombre),d(3),ie(i.nombre),d(2),ie(i.descripcion),d(4),ce(" ",i.stock,"")}}var A,Se=(A=class{constructor(){this.inventarioService=c(E),this.isLoading=c(k).isLoading,this.theme=c(be),this.modal=c(C),this.inventarioList=new oe,this.localeText=_e}ngOnInit(){this.fetchInventario()}fetchInventario(){this.inventarioList=this.inventarioService.getAll().pipe(re(t=>(console.log("Inventario recibido:",t.data),t.data)),he(this))}loadTabla(){this.fetchInventario()}gridReady(t){this.gridApi=t.api}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("item-search").value)}openCrearModal(){this.modal.open(X,{size:"350px",animation:!0,centered:!0}).componentInstance.onSaveComplete.subscribe(()=>{this.fetchInventario()})}openEditarModal(t){let i=this.modal.open(Z);i.componentInstance.inventarioId=t.id,i.componentInstance.onSaveComplete.subscribe(()=>{this.fetchInventario()})}openBorrarModal(t){if(!t.id){console.error("El art\xEDculo no tiene un id_inventario definido.");return}let i=this.modal.open(Ie,{size:"300px",animation:!0,centered:!0});i.componentInstance.inventarioId=t.id,i.componentInstance.onSaveComplete.subscribe(()=>{this.fetchInventario()})}openAgregarModal(t){if(!t.id){console.error("El art\xEDculo no tiene un id_inventario definido.");return}let i=this.modal.open(ee,{size:"300px",animation:!0,centered:!0});i.componentInstance.inventarioId=t.id,i.componentInstance.onSaveComplete.subscribe(()=>{this.fetchInventario()})}ngOnDestroy(){}},A.\u0275fac=function(i){return new(i||A)},A.\u0275cmp=_({type:A,selectors:[["app-inventario"]],standalone:!0,features:[y],decls:28,vars:3,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"d-flex","py-4","justify-content-between","align-items-center"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","item-search","name","search","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"input"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],["type","button",1,"btn","btn-primary",3,"click"],[1,"ki-solid","ki-plus","text-white","fs-1"],[1,"text-white","ms-2"],[1,"row"],["class","col-md-4",4,"ngFor","ngForOf"],[1,"col-md-4"],[1,"card","mb-4",2,"width","18rem","padding","5px"],[1,"position-relative",2,"padding-top","40px"],[1,"action-buttons",2,"position","absolute","top","0","right","10px","z-index","1"],["type","button",1,"btn","btn-icon","btn-sm","bg-success",2,"margin-right","5px",3,"click"],[1,"ki-solid","ki-pencil","text-white"],["type","button",1,"btn","btn-icon","btn-sm","btn-danger",3,"click"],[1,"ki-solid","ki-trash","text-white"],[1,"image-container",2,"box-shadow","0 4px 8px rgba(0, 0, 0, 0.1)","border-radius","8px","overflow","hidden"],[1,"card-img-top",2,"width","100%","height","auto",3,"src","alt"],[1,"card-body"],[1,"card-title"],[1,"card-text"],["type","button",1,"btn","btn-primary","btn-lg","w-100","d-flex","justify-content-center","align-items-center",3,"click"]],template:function(i,e){i&1&&(o(0,"app-header"),me(1,0),o(2,"h1",1)(3,"span",2),a(4,"Inventario"),n()(),de(),n(),o(5,"div",3)(6,"div",4)(7,"div",5)(8,"form",6),l(9,"input",7),o(10,"i",8),l(11,"span",9)(12,"span",10),n(),o(13,"input",11),s("input",function(){return e.onFilterTextBoxChanged()}),n()(),o(14,"div",12)(15,"button",13),s("click",function(){return e.loadTabla()}),o(16,"span",14),l(17,"span",15),o(18,"span",16),a(19,"Actualizar"),n()()(),o(20,"button",17),s("click",function(){return e.openCrearModal()}),o(21,"span",14),l(22,"span",18),o(23,"span",19),a(24,"A\xF1adir"),n()()()()(),o(25,"div",20),b(26,Te,22,5,"div",21),f(27,"async"),n()()()),i&2&&(d(26),u("ngForOf",v(27,1,e.inventarioList)))},dependencies:[S,ue,I,ge]}),A);Se=D([B()],Se);export{Se as InventarioComponent};
