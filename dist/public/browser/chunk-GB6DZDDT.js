import{a as $}from"./chunk-555LYGFL.js";import{a as Z}from"./chunk-U5GNHINA.js";import{a as I}from"./chunk-3YJPJYYE.js";import{a as O}from"./chunk-7QSZXZSX.js";import{c as H}from"./chunk-VW7FZU7U.js";import{a as Y}from"./chunk-WAKZQXFB.js";import{a as U,b as E}from"./chunk-73QAVBZN.js";import{a as T}from"./chunk-C4LB5HPP.js";import{a as D}from"./chunk-FR665RP3.js";import{a as K,e as w,f as u,g as A,h as P,l as V,o as j,r as G,u as C}from"./chunk-O36CONK3.js";import{g as N,j as F,m as X}from"./chunk-FM6AGUVW.js";import{B,C as M,Da as _,I as y,Kb as x,Kc as s,Lc as m,Tb as l,Wa as k,ac as i,bc as e,cc as o,f as Q,mc as b,sa as R,t as S,wb as a,wc as r,xb as q,ya as W,za as d}from"./chunk-6QDZBSPE.js";var ie=Q(Z());var J=(()=>{let t=class t{constructor(n){this.http=n,this.apiUrl=K.apiUrl}getAll(){return this.http.get(`${K.apiUrl}/parentescos/list`)}};t.\u0275fac=function(c){return new(c||t)(W(X))},t.\u0275prov=R({token:t,factory:t.\u0275fac,providedIn:"root"});let p=t;return p})();function se(p,t){p&1&&o(0,"span",35)}var g,ee=(g=class{constructor(t){this.fb=t,this.modal=d(D),this.isLoading=d(T).isLoading,this.pacienteService=d(I),this.userService=d(O),this.generoService=d($),this.parentescoService=d(J),this.userList=new S,this.es=ie.default.es,this.generos=new S,this.parentescos=new S,this.onSaveComplete=new k,this.pacienteForm=this.fb.group({nombre:["",u.required],dni:["",[u.required,u.pattern("^[0-9]*")]],fecha_nacimiento:["",u.required],id:[null,u.required],id_parentesco:[null,u.required],id_genero:[null,u.required],pos_hijo:[""],colegio:[""]})}ngAfterViewInit(){this.userList=this.userService.getPacientes().pipe(E(this),y(t=>t.data)),this.generos=this.generoService.getAll().pipe(E(this),y(t=>t.data)),this.parentescos=this.parentescoService.getAll().pipe(E(this),y(t=>t.data))}ngOnDestroy(){}close(){this.modal.close()}save(){let t=this.pacienteForm.value;this.pacienteService.create(t).subscribe(()=>{this.onSaveComplete.emit(),this.modal.close()})}},g.\u0275fac=function(f){return new(f||g)(q(C))},g.\u0275cmp=_({type:g,selectors:[["app-create-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:62,vars:30,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"d-flex","flex-column","gap-3"],["for","name",1,"required","form-label"],["type","text","id","","formControlName","nombre","placeholder","Ingresar Nombre del Paciente",1,"form-control"],[1,"d-flex","gap-3"],[1,"d-flex","flex-column","gap-1"],["for","lastName",1,"required","form-label"],["type","text","id","lastName","formControlName","dni","placeholder","Ingresar DNI del Paciente",1,"form-control"],["for","email",1,"required","form-label"],["mwlFlatpickr","","placeholder","Seleccionar fecha","formControlName","fecha_nacimiento",1,"form-control",3,"locale","altInput","altFormat"],["for","colegio",1,"form-label"],["type","text","id","colegio","formControlName","colegio","placeholder","Nombre del Colegio",1,"form-control"],[1,"row"],[1,"col-6"],["for","id_genero",1,"required","form-label"],["bindLabel","nombre","bindValue","id_genero","placeholder","Seleccionar","formControlName","id_genero",3,"items","loadingText"],["for","nro_hermano",1,"required","form-label"],["type","text","id","n","formControlName","pos_hijo","placeholder","Ingresar N\xB0 de Hermano",1,"form-control"],[1,"col"],["bindValue","id","placeholder","Seleccionar","bindLabel","name","formControlName","id",3,"items","loading","loadingText","notFoundText"],["bindValue","id_parentesco","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_parentesco",3,"items","loading","loadingText","notFoundText"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(f,n){f&1&&(i(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),o(4,"span",4)(5,"span",5)(6,"span",6),e()(),r(7," Crear Paciente "),e(),i(8,"button",7),b("click",function(){return n.close()}),i(9,"i",8),o(10,"span",4)(11,"span",5),e()()(),i(12,"div",9)(13,"form",10)(14,"div",11)(15,"label",12),r(16,"Nombres"),e(),o(17,"input",13),e(),i(18,"div",14)(19,"div",15)(20,"label",16),r(21,"DNI"),e(),o(22,"input",17),e(),i(23,"div",15)(24,"label",18),r(25,"Fecha Nacimiento"),e(),o(26,"input",19),e()(),i(27,"div",15)(28,"label",20),r(29,"Colegio del Paciente"),e(),o(30,"input",21),e(),i(31,"div",22)(32,"div",23)(33,"label",24),r(34,"Genero"),e(),o(35,"ng-select",25),s(36,"async"),e(),i(37,"div",23)(38,"label",26),r(39,"N\xB0 de Hermano "),e(),o(40,"input",27),e()(),i(41,"div",22)(42,"div",28)(43,"label",18),r(44,"Apoderado"),e(),o(45,"ng-select",29),s(46,"async"),s(47,"async"),e(),i(48,"div",28)(49,"label",18),r(50,"Parentesco"),e(),o(51,"ng-select",30),s(52,"async"),s(53,"async"),e()()()(),i(54,"div",31)(55,"button",32),b("click",function(){return n.close()}),r(56," Cerrar "),e(),i(57,"button",33),s(58,"async"),b("click",function(){return n.save()}),r(59," Guardar "),x(60,se,1,0,"span",34),s(61,"async"),e()()),f&2&&(a(13),l("formGroup",n.pacienteForm),a(13),l("locale",n.es)("altInput",!0)("altFormat","j/n/Y"),a(9),l("items",m(36,16,n.generos))("loadingText","Cargando.."),a(10),l("items",m(46,18,n.userList))("loading",m(47,20,n.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),a(6),l("items",m(52,22,n.parentescos))("loading",m(53,24,n.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),a(6),l("disabled",n.pacienteForm.invalid||m(58,26,n.isLoading)),a(3),l("ngIf",m(61,28,n.isLoading)))},dependencies:[N,V,w,A,P,j,G,H,Y,F]}),g);ee=B([U(),M("design:paramtypes",[C])],ee);var oe=Q(Z());function me(p,t){p&1&&o(0,"span",33)}var h,ne=(h=class{constructor(t){this.fb=t,this.modal=d(D),this.isLoading=d(T).isLoading,this.pacienteService=d(I),this.userService=d(O),this.generoService=d($),this.parentescoService=d(J),this.userList=new S,this.es=oe.default.es,this.generos=new S,this.parentescos=new S,this.onSaveComplete=new k,this.pacienteForm=this.fb.group({nombre:["",u.required],dni:["",[u.required,u.pattern("^[0-9]*")]],fecha_nacimiento:["",u.required],id:[null,u.required],id_genero:[null,u.required],id_parentesco:[null,u.required],pos_hijo:[""],colegio:[""]})}ngOnInit(){this.pacienteService.getById(this.paciente?.id_paciente).subscribe(t=>{this.pacienteForm.patchValue(t.data)})}ngAfterViewInit(){this.userList=this.userService.getPacientes().pipe(E(this),y(t=>t.data)),this.generos=this.generoService.getAll().pipe(E(this),y(t=>t.data)),this.parentescos=this.parentescoService.getAll().pipe(E(this),y(t=>t.data))}ngOnDestroy(){}close(){this.modal.close()}edit(){let t=this.pacienteForm.value,f=this.paciente?.id_paciente;this.pacienteService.update(t,f).subscribe(()=>{this.onSaveComplete.emit(),this.modal.close()})}},h.\u0275fac=function(f){return new(f||h)(q(C))},h.\u0275cmp=_({type:h,selectors:[["app-edit-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:61,vars:29,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-notepad-edit","text-gray-900","fs-1",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"d-flex","flex-column","gap-3"],["for","name",1,"required","form-label"],["type","text","id","","formControlName","nombre",1,"form-control"],[1,"d-flex","gap-3"],["for","lastName",1,"required","form-label"],["type","text","id","lastName","formControlName","dni",1,"form-control"],["for","email",1,"required","form-label"],["mwlFlatpickr","","placeholder","Seleccionar fecha","formControlName","fecha_nacimiento",1,"form-control",3,"locale","altInput","altFormat"],["for","colegio",1,"required","form-label"],["type","text","id","colegio","formControlName","colegio",1,"form-control"],[1,"row"],[1,"col-6"],["for","id_genero",1,"required","form-label"],["bindLabel","nombre","bindValue","id_genero","placeholder","Seleccionar","formControlName","id_genero",3,"items"],["for","nro_hermano",1,"required","form-label"],["type","text","id","n","formControlName","pos_hijo",1,"form-control"],[1,"col-7"],["bindValue","id","placeholder","Seleccionar","bindLabel","name","formControlName","id",3,"items","loading","loadingText","notFoundText"],[1,"col-5"],["bindValue","id_parentesco","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_parentesco",3,"items","loading","loadingText","notFoundText"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(f,n){f&1&&(i(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),o(4,"span",3)(5,"span",4),e()(),r(6," Editar Paciente "),e(),i(7,"button",5),b("click",function(){return n.close()}),i(8,"i",6),o(9,"span",3)(10,"span",4),e()()(),i(11,"div",7)(12,"form",8)(13,"div",9)(14,"label",10),r(15,"Nombres"),e(),o(16,"input",11),e(),i(17,"div",12)(18,"div",9)(19,"label",13),r(20,"DNI"),e(),o(21,"input",14),e(),i(22,"div",9)(23,"label",15),r(24,"Fecha Nacimiento"),e(),o(25,"input",16),e()(),i(26,"div",9)(27,"label",17),r(28,"Colegio"),e(),o(29,"input",18),e(),i(30,"div",19)(31,"div",20)(32,"label",21),r(33,"G\xE9nero"),e(),o(34,"ng-select",22),s(35,"async"),e(),i(36,"div",20)(37,"label",23),r(38,"N\xB0 de Hermano "),e(),o(39,"input",24),e()(),i(40,"div",19)(41,"div",25)(42,"label",15),r(43,"Apoderado"),e(),o(44,"ng-select",26),s(45,"async"),s(46,"async"),e(),i(47,"div",27)(48,"label",15),r(49,"Parentesco"),e(),o(50,"ng-select",28),s(51,"async"),s(52,"async"),e()()()(),i(53,"div",29)(54,"button",30),b("click",function(){return n.close()}),r(55," Cerrar "),e(),i(56,"button",31),s(57,"async"),b("click",function(){return n.edit()}),r(58," Guardar "),x(59,me,1,0,"span",32),s(60,"async"),e()()),f&2&&(a(12),l("formGroup",n.pacienteForm),a(13),l("locale",n.es)("altInput",!0)("altFormat","j/n/Y"),a(9),l("items",m(35,15,n.generos)),a(10),l("items",m(45,17,n.userList))("loading",m(46,19,n.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),a(6),l("items",m(51,21,n.parentescos))("loading",m(52,23,n.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),a(6),l("disabled",n.pacienteForm.invalid||m(57,25,n.isLoading)),a(3),l("ngIf",m(60,27,n.isLoading)))},dependencies:[N,V,w,A,P,j,G,H,Y,F]}),h);ne=B([U({checkProperties:!0}),M("design:paramtypes",[C])],ne);function de(p,t){p&1&&o(0,"span",13)}var Ke=(()=>{let t=class t{constructor(){this.modal=d(D),this.pacienteService=d(I),this.isLoading=d(T).isLoading,this.onSaveComplete=new k}close(){this.modal.dismiss()}delete(){this.pacienteService.delete(this.pacienteId).subscribe(()=>{this.onSaveComplete.emit(),this.modal.close()})}};t.\u0275fac=function(c){return new(c||t)},t.\u0275cmp=_({type:t,selectors:[["app-pacientes-delete-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:25,vars:6,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-information","text-danger","fs-2hx",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body","text-center"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-danger",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(c,v){c&1&&(i(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),o(4,"span",3)(5,"span",4)(6,"span",5),e()(),r(7," Eliminar Paciente "),e(),i(8,"button",6),b("click",function(){return v.close()}),i(9,"i",7),o(10,"span",3)(11,"span",4),e()()(),i(12,"div",8)(13,"p"),r(14,"\xBFEst\xE1s seguro de eliminar este Paciente?"),e(),i(15,"p"),r(16,"Toda la informaci\xF3n relacionada con este paciente se perder\xE1."),e()(),i(17,"div",9)(18,"button",10),b("click",function(){return v.close()}),r(19," Cancelar "),e(),i(20,"button",11),s(21,"async"),b("click",function(){return v.delete()}),r(22," Eliminar "),x(23,de,1,0,"span",12),s(24,"async"),e()()),c&2&&(a(20),l("disabled",m(21,2,v.isLoading)),a(3),l("ngIf",m(24,4,v.isLoading)))},dependencies:[N,F]});let p=t;return p})();var Re=(()=>{let t=class t{ngOnInit(){}agInit(n){this.params=n}openEdit(){this.params?.onEdit(this.params.data)}openDelete(){this.params?.onDelete(this.params.data)}refresh(n){return!0}};t.\u0275fac=function(c){return new(c||t)},t.\u0275cmp=_({type:t,selectors:[["app-pacientes-action-buttons"]],decls:5,vars:0,consts:[[1,"d-flex","align-items-center","gap-2",2,"padding-block","0.15rem"],["type","button",1,"btn","btn-icon","btn-sm","bg-success",3,"click"],[1,"ki-solid","ki-pencil","text-white"],["type","button",1,"btn","btn-icon","btn-sm","btn-danger",3,"click"],[1,"ki-solid","ki-trash","text-white"]],template:function(c,v){c&1&&(i(0,"div",0)(1,"button",1),b("click",function(){return v.openEdit()}),o(2,"span",2),e(),i(3,"button",3),b("click",function(){return v.openDelete()}),o(4,"span",4),e()())}});let p=t;return p})();export{ee as a,ne as b,Ke as c,Re as d};
