import{a as me}from"./chunk-I5IYTPG5.js";import{a as x}from"./chunk-IJFH7NGW.js";import{a as H,e as R}from"./chunk-6DZXAK53.js";import{a as $,b as I}from"./chunk-KG3B2A6X.js";import{o as k,p as G}from"./chunk-CZPC3FHQ.js";import{a as T}from"./chunk-NMGGHNE5.js";import{a as pe}from"./chunk-GKZUPR7X.js";import{C as V,F as q,L as P,M as _,b as se,r as A,s as p,t as j,u as O,z as U}from"./chunk-R7YU5FNY.js";import{d as le,o as S,t as E}from"./chunk-DP3M2V7L.js";import{Aa as g,Ba as te,C as M,Ca as ie,Ka as ne,La as oe,Lb as v,Nc as b,Oc as h,Ta as C,Ua as re,Ub as u,bc as o,cc as i,dc as l,hc as ae,n as F,nc as m,oc as K,pa as L,qa as X,sa as ee,v as N,va as B,vb as c,w as D,wa as d,wb as y,yc as s}from"./chunk-B7JMKZ3I.js";var Z=(()=>{class a{constructor(t){this.http=t,this.apiUrl=pe.apiUrl}getAll(){return this.http.get(`${this.apiUrl}/tipo-user/list`)}getPacientes(){return this.http.get(`${this.apiUrl}/usuario/list/paciente`)}getById(t){return this.http.get(`${this.apiUrl}/tipo-user/list/${t}`)}create(t){return this.http.post(`${this.apiUrl}/tipo-user/add`,t)}update(t,e){return this.http.put(`${this.apiUrl}/tipouser/edit/${e}`,t)}delete(t){return this.http.delete(`${this.apiUrl}/tipouser/delete/${t}`)}static{this.\u0275fac=function(e){return new(e||a)(B(se))}}static{this.\u0275prov=L({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})();var Y=class{constructor(r,t){this._document=t;let e=this._textarea=this._document.createElement("textarea"),n=e.style;n.position="fixed",n.top=n.opacity="0",n.left="-999em",e.setAttribute("aria-hidden","true"),e.value=r,e.readOnly=!0,(this._document.fullscreenElement||this._document.body).appendChild(e)}copy(){let r=this._textarea,t=!1;try{if(r){let e=this._document.activeElement;r.select(),r.setSelectionRange(0,r.value.length),t=this._document.execCommand("copy"),e&&e.focus()}}catch{}return t}destroy(){let r=this._textarea;r&&(r.remove(),this._textarea=void 0)}},be=(()=>{class a{constructor(t){this._document=t}copy(t){let e=this.beginCopy(t),n=e.copy();return e.destroy(),n}beginCopy(t){return new Y(t,this._document)}static{this.\u0275fac=function(e){return new(e||a)(B(le))}}static{this.\u0275prov=L({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})(),he=new ee("CDK_COPY_TO_CLIPBOARD_CONFIG"),z=(()=>{class a{constructor(t,e,n){this._clipboard=t,this._ngZone=e,this.text="",this.attempts=1,this.copied=new C,this._pending=new Set,n&&n.attempts!=null&&(this.attempts=n.attempts)}copy(t=this.attempts){if(t>1){let e=t,n=this._clipboard.beginCopy(this.text);this._pending.add(n);let f=()=>{let W=n.copy();!W&&--e&&!this._destroyed?this._currentTimeout=this._ngZone.runOutsideAngular(()=>setTimeout(f,1)):(this._currentTimeout=null,this._pending.delete(n),n.destroy(),this.copied.emit(W))};f()}else this.copied.emit(this._clipboard.copy(this.text))}ngOnDestroy(){this._currentTimeout&&clearTimeout(this._currentTimeout),this._pending.forEach(t=>t.destroy()),this._pending.clear(),this._destroyed=!0}static{this.\u0275fac=function(e){return new(e||a)(y(be),y(re),y(he,8))}}static{this.\u0275dir=ie({type:a,selectors:[["","cdkCopyToClipboard",""]],hostBindings:function(e,n){e&1&&m("click",function(){return n.copy()})},inputs:{text:[0,"cdkCopyToClipboard","text"],attempts:[0,"cdkCopyToClipboardAttempts","attempts"]},outputs:{copied:"cdkCopyToClipboardCopied"},standalone:!0})}}return a})(),je=(()=>{class a{static{this.\u0275fac=function(e){return new(e||a)}}static{this.\u0275mod=te({type:a})}static{this.\u0275inj=X({})}}return a})();function _e(a,r){if(a&1){let t=ae();o(0,"div",11)(1,"label",12),s(2," Seleccionar Terapista "),i(),o(3,"ng-select",36),b(4,"async"),b(5,"async"),m("change",function(n){ne(t);let f=K();return oe(f.changePersonal(n))}),i()()}if(a&2){let t=K();c(3),u("items",h(4,3,t.personalList))("loading",h(5,5,t.isLoading))("loadingText","Cargando...")}}function ve(a,r){a&1&&l(0,"span",37)}var ce=class J{constructor(r){this.fb=r,this.modal=d(k),this.userService=d(x),this.toast=d(H),this.personalService=d(me),this.tipouserService=d(Z),this.isLoading=d(T).isLoading,this.tipoUserList=new F,this.personalList=new F,this.isTipoTerapista=!1,this.onSaveComplete=new C,this.userForm=this.fb.group({name:["",p.required],email:["",[p.required,p.email]],dni:["",[p.required,p.minLength(8),p.pattern("^[0-9]*")]],id_tipousers:[null,p.required],telefono:["",[p.required,p.pattern("^[0-9]*")]],password:["",[p.required,p.minLength(8)]],direccion:[""],id_personal:[null]})}ngOnInit(){this.loadTipousers(),this.loadPersonal()}changeTipoUser(r){this.isTipoTerapista=r&&r?.nombre==="terapista",this.isTipoTerapista?(this.userForm.get("id_personal")?.setValidators(p.required),this.userForm.get("id_personal")?.updateValueAndValidity()):(this.userForm.get("id_personal")?.clearValidators(),this.userForm.get("id_personal")?.updateValueAndValidity())}changePersonal(r){r?this.userForm.patchValue({name:r.nombre,email:r.correo,dni:r.dni,telefono:r.telefono}):this.userForm.reset({name:"",email:"",dni:"",telefono:""})}generatePassword(){let t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",e="";for(let n=0;n<12;n++){let f=Math.floor(Math.random()*t.length);e+=t[f]}this.userForm.get("password")?.patchValue(e)}close(){this.modal.dismissAll()}loadTipousers(){this.tipoUserList=this.tipouserService.getAll().pipe(M(r=>r.data),I(this))}loadPersonal(){this.personalList=this.personalService.getAvailable().pipe(M(r=>r.data),I(this))}save(){this.userForm.valid&&this.userService.create(this.userForm.value).subscribe({next:()=>{this.close(),this.onSaveComplete.emit()},error:r=>{if(r.error.errors){let t=Object.values(r.error.errors).join(`
`);this.toast.error(t,"Error")}else this.toast.error("Ocurrio un error al crear el usuario","Error")}})}static{this.\u0275fac=function(t){return new(t||J)(y(_))}}static{this.\u0275cmp=g({type:J,selectors:[["app-create-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:62,vars:16,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"form-group"],["for","exampleFormControlInput1",1,"required","form-label"],["type","text","formControlName","name","placeholder","Ingresa tu Nombre",1,"form-control"],[1,"row"],[1,"form-group","col-6"],["type","text","pattern","[0-9]*","formControlName","dni","placeholder","Ingresa tu DNI",1,"form-control"],["type","email","formControlName","telefono","placeholder","Ingresa tu Tel\xE9fono",1,"form-control"],["type","email","formControlName","email","placeholder","Ingresa tu Correo",1,"form-control"],["for","exampleFormControlInput1",1,"form-label"],["type","email","formControlName","direccion","placeholder","Ingresa tu Direcci\xF3n",1,"form-control"],["bindValue","id_tipousers","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_tipousers",3,"change","items","loading","loadingText"],["class","form-group",4,"ngIf"],[1,"d-flex","align-items-center","justify-content-between",2,"margin-bottom","0.75rem"],["for","password",1,"required","form-label","d-flex","align-items-center","justify-content-between"],["ngbTooltip","Guarde la contrasen\u0303a en un lugar seguro para no perderla",2,"margin-left","0.15rem"],[1,"ki-solid","ki-information-2"],["type","button",1,"btn","btn-sm","btn-secondary",3,"click"],[1,"position-relative"],["formControlName","password","type","password","placeholder","Ingresa tu Contrase\xF1a",1,"form-control","pe-8"],["type","button","ngbTooltip","Copiar","placement","bottom",1,"btn","btn-icon","copy-icon","btn-sm","copy-icon","btn-active-color-primary","btn-color-gray-800","position-absolute",3,"cdkCopyToClipboard"],[1,"ki-solid","ki-copy","fs-1"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],["bindValue","id_personal","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_personal",3,"change","items","loading","loadingText"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(t,e){if(t&1&&(o(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),l(4,"span",4)(5,"span",5)(6,"span",6),i()(),s(7," A\xF1adir Usuario "),i(),o(8,"button",7),m("click",function(){return e.close()}),o(9,"i",8),l(10,"span",4)(11,"span",5),i()()(),o(12,"div",9)(13,"form",10)(14,"div",11)(15,"label",12),s(16,"Nombres"),i(),l(17,"input",13),i(),o(18,"div",14)(19,"div",15)(20,"label",12),s(21,"DNI"),i(),l(22,"input",16),i(),o(23,"div",15)(24,"label",12),s(25," Tel\xE9fono "),i(),l(26,"input",17),i()(),o(27,"div",11)(28,"label",12),s(29," Correo "),i(),l(30,"input",18),i(),o(31,"div",11)(32,"label",19),s(33," Direcci\xF3n "),i(),l(34,"input",20),i(),o(35,"div",11)(36,"label",12),s(37," Tipo de usuario "),i(),o(38,"ng-select",21),b(39,"async"),b(40,"async"),m("change",function(f){return e.changeTipoUser(f)}),i()(),v(41,_e,6,7,"div",22),o(42,"div",11)(43,"div",23)(44,"label",24),s(45," Contrasen\u0303a "),o(46,"span",25),l(47,"i",26),i()(),o(48,"button",27),m("click",function(){return e.generatePassword()}),s(49," autogenerar "),i()(),o(50,"div",28),l(51,"input",29),o(52,"button",30),l(53,"span",31),i()()()()(),o(54,"div",32)(55,"button",33),m("click",function(){return e.close()}),s(56," Cancelar "),i(),o(57,"button",34),b(58,"async"),m("click",function(){return e.save()}),s(59," Guardar "),v(60,ve,1,0,"span",35),b(61,"async"),i()()),t&2){let n;c(13),u("formGroup",e.userForm),c(25),u("items",h(39,8,e.tipoUserList))("loading",h(40,10,e.isLoading))("loadingText","Cargando..."),c(3),u("ngIf",e.isTipoTerapista),c(11),u("cdkCopyToClipboard",(n=e.userForm.get("password"))==null?null:n.value),c(5),u("disabled",e.userForm.invalid||h(58,12,e.isLoading)),c(3),u("ngIf",h(61,14,e.isLoading))}},dependencies:[S,U,A,j,O,P,G,z,R,V,q,E]})}};ce=N([$({checkProperties:!0}),D("design:paramtypes",[_])],ce);function Se(a,r){a&1&&l(0,"span",34)}var fe=class Q{constructor(r){this.fb=r,this.modal=d(k),this.userService=d(x),this.tipouserService=d(Z),this.toast=d(H),this.isLoading=d(T).isLoading,this.tipoUserList=new F,this.onSaveComplete=new C,this.userForm=this.fb.group({name:["",p.required],email:["",[p.required,p.email]],dni:["",[p.required,p.minLength(8),p.pattern("^[0-9]*")]],id_tipousers:[null,p.required],telefono:["",[p.required,p.pattern("^[0-9]*")]],password:["",[p.required,p.minLength(8)]],direccion:[""]})}ngOnInit(){this.userService.getById(this.userId).pipe(I(this)).subscribe(r=>{this.userForm.patchValue(r.data)}),this.loadTipousers()}loadTipousers(){this.tipoUserList=this.tipouserService.getAll().pipe(M(r=>r.data.filter(t=>t.nombre!=="terapista")),I(this))}generatePassword(){let t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+={}[]|;:<>?,./`~",e="";for(let n=0;n<12;n++){let f=Math.floor(Math.random()*t.length);e+=t[f]}this.userForm.get("password")?.patchValue(e)}close(){this.modal.dismissAll()}edit(r,t){this.userService.update(r,t).subscribe({next:()=>{this.onSaveComplete.emit(),this.close()},error:e=>{if(e.error.errors){let n=Object.values(e.error.errors).join(`
`);this.toast.error(n,"Error")}else this.toast.error("Ocurrio un error al actualizar el usuario","Error")}})}static{this.\u0275fac=function(t){return new(t||Q)(y(_))}}static{this.\u0275cmp=g({type:Q,selectors:[["app-edit-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:63,vars:15,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-notepad-edit","text-gray-900","fs-1",2,"vertical-align","top"],[1,"path1"],[1,"path2"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"form-group"],["for","exampleFormControlInput1",1,"required","form-label"],["type","text","formControlName","name",1,"form-control"],[1,"row"],[1,"form-group","col-6"],["type","text","pattern","[0-9]*","formControlName","dni",1,"form-control"],["type","email","formControlName","telefono",1,"form-control"],["type","email","formControlName","email",1,"form-control"],["for","exampleFormControlInput1",1,"form-label"],["type","email","formControlName","direccion","placeholder","Ingresa tu Direcci\xF3n",1,"form-control"],["bindValue","id_tipousers","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_tipousers",3,"items","loading","loadingText"],[1,"d-flex","align-items-center","justify-content-between",2,"margin-bottom","0.75rem"],["for","password",1,"required","form-label","d-flex","align-items-center","justify-content-between"],["ngbTooltip","Guarde la contrasen\u0303a en un lugar seguro para no perderla",2,"margin-left","0.15rem"],[1,"ki-solid","ki-information-2"],["type","button",1,"btn","btn-sm","btn-secondary",3,"click"],[1,"ki-duotone","ki-note"],[1,"position-relative"],["formControlName","password","type","password",1,"form-control","pe-8"],["type","button","ngbTooltip","Copiar",1,"btn","btn-icon","btn-sm","top-0","copy-icon","end-0","btn-active-color-primary","btn-color-gray-800","position-absolute",3,"cdkCopyToClipboard"],[1,"ki-solid","ki-copy","fs-1"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(t,e){if(t&1&&(o(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),l(4,"span",3)(5,"span",4),i()(),s(6," Editar Informaci\xF3n "),i(),o(7,"button",5),m("click",function(){return e.close()}),o(8,"i",6),l(9,"span",3)(10,"span",4),i()()(),o(11,"div",7)(12,"form",8)(13,"div",9)(14,"label",10),s(15,"Nombres"),i(),l(16,"input",11),i(),o(17,"div",12)(18,"div",13)(19,"label",10),s(20,"DNI"),i(),l(21,"input",14),i(),o(22,"div",13)(23,"label",10),s(24," Tel\xE9fono "),i(),l(25,"input",15),i()(),o(26,"div",9)(27,"label",10),s(28," Correo "),i(),l(29,"input",16),i(),o(30,"div",9)(31,"label",17),s(32," Direcci\xF3n "),i(),l(33,"input",18),i(),o(34,"div",9)(35,"label",10),s(36," Tipo de usuario "),i(),l(37,"ng-select",19),b(38,"async"),b(39,"async"),i(),o(40,"div",9)(41,"div",20)(42,"label",21),s(43," Contrasen\u0303a "),o(44,"span",22),l(45,"i",23),i()(),o(46,"button",24),m("click",function(){return e.generatePassword()}),o(47,"i",25),l(48,"span",3)(49,"span",4),i(),s(50," autogenerar "),i()(),o(51,"div",26),l(52,"input",27),o(53,"button",28),l(54,"span",29),i()()()()(),o(55,"div",30)(56,"button",31),m("click",function(){return e.close()}),s(57," Cancelar "),i(),o(58,"button",32),b(59,"async"),m("click",function(){return e.edit(e.userForm.value,e.userId)}),s(60," Actualizar "),v(61,Se,1,0,"span",33),b(62,"async"),i()()),t&2){let n;c(12),u("formGroup",e.userForm),c(25),u("items",h(38,7,e.tipoUserList))("loading",h(39,9,e.isLoading))("loadingText","Cargando..."),c(16),u("cdkCopyToClipboard",(n=e.userForm.get("password"))==null?null:n.value),c(5),u("disabled",e.userForm.invalid||h(59,11,e.isLoading)),c(3),u("ngIf",h(62,13,e.isLoading))}},dependencies:[S,U,A,j,O,P,G,z,R,V,q,E]})}};fe=N([$({checkProperties:!0}),D("design:paramtypes",[_])],fe);function Ee(a,r){a&1&&l(0,"span",13)}var ht=(()=>{class a{constructor(){this.modal=d(k),this.users=d(x),this.isLoading=d(T).isLoading,this.onSaveComplete=new C}close(){this.modal.dismissAll()}delete(){this.users.delete(this.userId).subscribe(()=>{this.onSaveComplete.emit(),this.modal.dismissAll()})}static{this.\u0275fac=function(e){return new(e||a)}}static{this.\u0275cmp=g({type:a,selectors:[["app-delete-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:25,vars:6,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-information","text-danger","fs-2hx",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body","text-center"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-danger",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(e,n){e&1&&(o(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),l(4,"span",3)(5,"span",4)(6,"span",5),i()(),s(7," Eliminar Usuario "),i(),o(8,"button",6),m("click",function(){return n.close()}),o(9,"i",7),l(10,"span",3)(11,"span",4),i()()(),o(12,"div",8)(13,"p"),s(14,"\xBFEst\xE1s seguro de eliminar este usuario?"),i(),o(15,"p"),s(16,"Toda la informaci\xF3n relacionada con este usuario se perder\xE1."),i()(),o(17,"div",9)(18,"button",10),m("click",function(){return n.close()}),s(19," Cancelar "),i(),o(20,"button",11),b(21,"async"),m("click",function(){return n.delete()}),s(22," Eliminar "),v(23,Ee,1,0,"span",12),b(24,"async"),i()()),e&2&&(c(20),u("disabled",h(21,2,n.isLoading)),c(3),u("ngIf",h(24,4,n.isLoading)))},dependencies:[S,E]})}}return a})();var Ct=(()=>{class a{ngOnInit(){}agInit(t){this.params=t}openEdit(){this.params?.onEdit(this.params.data)}openDelete(){this.params?.onDelete(this.params.data)}refresh(t){return!0}static{this.\u0275fac=function(e){return new(e||a)}}static{this.\u0275cmp=g({type:a,selectors:[["app-action-buttons"]],decls:5,vars:0,consts:[[1,"d-flex","align-items-center","gap-2",2,"padding-block","0.15rem"],["type","button",1,"btn","btn-icon","btn-sm","bg-success",3,"click"],[1,"ki-solid","ki-pencil","text-white"],["type","button",1,"btn","btn-icon","btn-sm","btn-danger",3,"click"],[1,"ki-solid","ki-trash","text-white"]],template:function(e,n){e&1&&(o(0,"div",0)(1,"button",1),m("click",function(){return n.openEdit()}),l(2,"span",2),i(),o(3,"button",3),m("click",function(){return n.openDelete()}),l(4,"span",4),i()())}})}}return a})();export{je as a,ce as b,fe as c,ht as d,Ct as e};
