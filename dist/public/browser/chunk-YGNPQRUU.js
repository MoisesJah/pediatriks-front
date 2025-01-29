import{a as H}from"./chunk-5KQ5MGRV.js";import{a as D}from"./chunk-N4AQLFPP.js";import{a as Z}from"./chunk-K7PIUIFR.js";import{a as j}from"./chunk-B7DVNT2Z.js";import{a as G,e as O}from"./chunk-6PYJZL2G.js";import{a as U}from"./chunk-PO2RMC3Q.js";import{a as V,b as g}from"./chunk-KG3B2A6X.js";import{n as k}from"./chunk-TEKV2OXA.js";import{a as N}from"./chunk-NMGGHNE5.js";import{a as z}from"./chunk-GKZUPR7X.js";import{B as A,E as P,L as C,b as X,q as L,r as f,s as B,t as q,y as w}from"./chunk-ZM3MROS5.js";import{o as E,t as x}from"./chunk-DP3M2V7L.js";import{Aa as S,C as v,Lb as _,Nc as p,Oc as c,Ta as y,Ub as d,bc as i,cc as e,dc as n,f as Q,n as h,nc as b,pa as R,v as T,va as W,vb as m,w as M,wa as s,wb as I,yc as o}from"./chunk-B7JMKZ3I.js";var ie=Q(Z());var $=(()=>{class l{constructor(a){this.http=a,this.apiUrl=z.apiUrl}getAll(){return this.http.get(`${z.apiUrl}/parentescos/list`)}static{this.\u0275fac=function(t){return new(t||l)(W(X))}}static{this.\u0275prov=R({token:l,factory:l.\u0275fac,providedIn:"root"})}}return l})();function se(l,r){l&1&&n(0,"span",36)}var ee=class J{constructor(r){this.fb=r,this.modal=s(k),this.isLoading=s(N).isLoading,this.pacienteService=s(D),this.userService=s(j),this.toast=s(G),this.generoService=s(H),this.parentescoService=s($),this.userList=new h,this.es=ie.default.es,this.generos=new h,this.parentescos=new h,this.onSaveComplete=new y,this.pacienteForm=this.fb.group({nombre:["",f.required],dni:["",[f.required,f.pattern("^[0-9]*")]],fecha_nacimiento:["",f.required],id:[null,f.required],id_parentesco:[null,f.required],id_genero:[null,f.required],pos_hijo:[""],diagnostico:[""],colegio:[""]})}ngAfterViewInit(){this.userList=this.userService.getPacientes().pipe(g(this),v(r=>r.data)),this.generos=this.generoService.getAll().pipe(g(this),v(r=>r.data)),this.parentescos=this.parentescoService.getAll().pipe(g(this),v(r=>r.data))}ngOnDestroy(){}close(){this.modal.close()}save(){let r=this.pacienteForm.value;this.pacienteForm.valid&&this.pacienteService.create(r).subscribe({next:()=>{this.onSaveComplete.emit(),this.modal.close()},error:a=>{if(a.error.errors){let t=Object.values(a.error.errors).join(`
`);this.toast.error(t,"Error")}else this.toast.error("Ocurrio un error al crear el paciente","Error")}})}static{this.\u0275fac=function(a){return new(a||J)(I(C))}}static{this.\u0275cmp=S({type:J,selectors:[["app-create-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:66,vars:30,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"d-flex","flex-column","gap-1"],["for","name",1,"required","form-label"],["type","text","id","","formControlName","nombre","placeholder","Ingresar Nombre del Paciente",1,"form-control"],[1,"d-flex","gap-3"],["for","lastName",1,"required","form-label"],["type","text","id","lastName","formControlName","dni","placeholder","Ingresar DNI del Paciente",1,"form-control"],["for","email",1,"required","form-label"],["mwlFlatpickr","","placeholder","Seleccionar fecha","formControlName","fecha_nacimiento",1,"form-control",3,"locale","altInput","altFormat"],["for","colegio",1,"form-label"],["type","text","id","colegio","formControlName","colegio","placeholder","Nombre del Colegio",1,"form-control"],[1,"row"],[1,"col-6"],["for","id_genero",1,"required","form-label"],["bindLabel","nombre","bindValue","id_genero","placeholder","Seleccionar","formControlName","id_genero",3,"items","loadingText"],["for","nro_hermano",1,"required","form-label"],["type","text","id","n","formControlName","pos_hijo","placeholder","Ingresar N\xB0 de Hermano",1,"form-control"],["for","name",1,"form-label"],["type","text","id","","formControlName","diagnostico",1,"form-control"],[1,"col"],["bindValue","id","placeholder","Seleccionar","bindLabel","name","formControlName","id",3,"items","loading","loadingText","notFoundText"],["bindValue","id_parentesco","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_parentesco",3,"items","loading","loadingText","notFoundText"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(a,t){a&1&&(i(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),n(4,"span",4)(5,"span",5)(6,"span",6),e()(),o(7," Crear Paciente "),e(),i(8,"button",7),b("click",function(){return t.close()}),i(9,"i",8),n(10,"span",4)(11,"span",5),e()()(),i(12,"div",9)(13,"form",10)(14,"div",11)(15,"label",12),o(16,"Nombres"),e(),n(17,"input",13),e(),i(18,"div",14)(19,"div",11)(20,"label",15),o(21,"DNI"),e(),n(22,"input",16),e(),i(23,"div",11)(24,"label",17),o(25,"Fecha Nacimiento"),e(),n(26,"input",18),e()(),i(27,"div",11)(28,"label",19),o(29,"Colegio del Paciente"),e(),n(30,"input",20),e(),i(31,"div",21)(32,"div",22)(33,"label",23),o(34,"Genero"),e(),n(35,"ng-select",24),p(36,"async"),e(),i(37,"div",22)(38,"label",25),o(39,"N\xB0 de Hermano "),e(),n(40,"input",26),e()(),i(41,"div",11)(42,"label",27),o(43,"Diagno\u0301stico"),e(),n(44,"input",28),e(),i(45,"div",21)(46,"div",29)(47,"label",17),o(48,"Apoderado"),e(),n(49,"ng-select",30),p(50,"async"),p(51,"async"),e(),i(52,"div",29)(53,"label",17),o(54,"Parentesco"),e(),n(55,"ng-select",31),p(56,"async"),p(57,"async"),e()()()(),i(58,"div",32)(59,"button",33),b("click",function(){return t.close()}),o(60," Cerrar "),e(),i(61,"button",34),p(62,"async"),b("click",function(){return t.save()}),o(63," Guardar "),_(64,se,1,0,"span",35),p(65,"async"),e()()),a&2&&(m(13),d("formGroup",t.pacienteForm),m(13),d("locale",t.es)("altInput",!0)("altFormat","j/n/Y"),m(9),d("items",c(36,16,t.generos))("loadingText","Cargando.."),m(14),d("items",c(50,18,t.userList))("loading",c(51,20,t.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),m(6),d("items",c(56,22,t.parentescos))("loading",c(57,24,t.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),m(6),d("disabled",t.pacienteForm.invalid||c(62,26,t.isLoading)),m(3),d("ngIf",c(65,28,t.isLoading)))},dependencies:[E,w,L,B,q,A,P,O,U,x]})}};ee=T([V(),M("design:paramtypes",[C])],ee);var oe=Q(Z());function me(l,r){l&1&&n(0,"span",36)}var ne=class K{constructor(r){this.fb=r,this.modal=s(k),this.isLoading=s(N).isLoading,this.pacienteService=s(D),this.toast=s(G),this.userService=s(j),this.generoService=s(H),this.parentescoService=s($),this.userList=new h,this.es=oe.default.es,this.generos=new h,this.parentescos=new h,this.onSaveComplete=new y,this.pacienteForm=this.fb.group({nombre:["",f.required],dni:["",[f.required,f.pattern("^[0-9]*")]],fecha_nacimiento:["",f.required],id:[null,f.required],id_genero:[null,f.required],id_parentesco:[null,f.required],pos_hijo:[""],diagnostico:[""],colegio:[""]})}ngOnInit(){this.pacienteService.getById(this.paciente?.id_paciente).pipe(g(this)).subscribe(r=>{this.pacienteForm.patchValue(r.data)})}ngAfterViewInit(){this.userList=this.userService.getPacientes().pipe(g(this),v(r=>r.data)),this.generos=this.generoService.getAll().pipe(g(this),v(r=>r.data)),this.parentescos=this.parentescoService.getAll().pipe(g(this),v(r=>r.data))}ngOnDestroy(){}close(){this.modal.close()}edit(){let r=this.pacienteForm.value,a=this.paciente?.id_paciente;this.pacienteForm.valid&&this.pacienteService.update(r,a).subscribe({next:()=>{this.onSaveComplete.emit(),this.modal.close()},error:t=>{if(t.error.errors){let u=Object.values(t.error.errors).join(`
`);this.toast.error(u,"Error")}else this.toast.error("Ocurrio un error al crear el paciente","Error")}})}static{this.\u0275fac=function(a){return new(a||K)(I(C))}}static{this.\u0275cmp=S({type:K,selectors:[["app-edit-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:65,vars:29,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-notepad-edit","text-gray-900","fs-1",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"d-flex","flex-column","gap-3"],["for","name",1,"required","form-label"],["type","text","id","","formControlName","nombre",1,"form-control"],[1,"d-flex","gap-3"],["for","lastName",1,"required","form-label"],["type","text","id","lastName","formControlName","dni",1,"form-control"],["for","email",1,"required","form-label"],["mwlFlatpickr","","placeholder","Seleccionar fecha","formControlName","fecha_nacimiento",1,"form-control",3,"locale","altInput","altFormat"],["for","colegio",1,"required","form-label"],["type","text","id","colegio","formControlName","colegio",1,"form-control"],[1,"row"],[1,"col-6"],["for","id_genero",1,"required","form-label"],["bindLabel","nombre","bindValue","id_genero","placeholder","Seleccionar","formControlName","id_genero",3,"items"],["for","nro_hermano",1,"required","form-label"],["type","text","id","n","formControlName","pos_hijo",1,"form-control"],[1,"d-flex","flex-column","gap-1"],["for","name",1,"form-label"],["type","text","id","","formControlName","diagnostico",1,"form-control"],[1,"col-7"],["bindValue","id","placeholder","Seleccionar","bindLabel","name","formControlName","id",3,"items","loading","loadingText","notFoundText"],[1,"col-5"],["bindValue","id_parentesco","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_parentesco",3,"items","loading","loadingText","notFoundText"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(a,t){a&1&&(i(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),n(4,"span",3)(5,"span",4),e()(),o(6," Editar Paciente "),e(),i(7,"button",5),b("click",function(){return t.close()}),i(8,"i",6),n(9,"span",3)(10,"span",4),e()()(),i(11,"div",7)(12,"form",8)(13,"div",9)(14,"label",10),o(15,"Nombres"),e(),n(16,"input",11),e(),i(17,"div",12)(18,"div",9)(19,"label",13),o(20,"DNI"),e(),n(21,"input",14),e(),i(22,"div",9)(23,"label",15),o(24,"Fecha Nacimiento"),e(),n(25,"input",16),e()(),i(26,"div",9)(27,"label",17),o(28,"Colegio"),e(),n(29,"input",18),e(),i(30,"div",19)(31,"div",20)(32,"label",21),o(33,"G\xE9nero"),e(),n(34,"ng-select",22),p(35,"async"),e(),i(36,"div",20)(37,"label",23),o(38,"N\xB0 de Hermano "),e(),n(39,"input",24),e()(),i(40,"div",25)(41,"label",26),o(42,"Diagno\u0301stico"),e(),n(43,"input",27),e(),i(44,"div",19)(45,"div",28)(46,"label",15),o(47,"Apoderado"),e(),n(48,"ng-select",29),p(49,"async"),p(50,"async"),e(),i(51,"div",30)(52,"label",15),o(53,"Parentesco"),e(),n(54,"ng-select",31),p(55,"async"),p(56,"async"),e()()()(),i(57,"div",32)(58,"button",33),b("click",function(){return t.close()}),o(59," Cerrar "),e(),i(60,"button",34),p(61,"async"),b("click",function(){return t.edit()}),o(62," Guardar "),_(63,me,1,0,"span",35),p(64,"async"),e()()),a&2&&(m(12),d("formGroup",t.pacienteForm),m(13),d("locale",t.es)("altInput",!0)("altFormat","j/n/Y"),m(9),d("items",c(35,15,t.generos)),m(14),d("items",c(49,17,t.userList))("loading",c(50,19,t.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),m(6),d("items",c(55,21,t.parentescos))("loading",c(56,23,t.isLoading))("loadingText","Cargando..")("notFoundText","Sin resultados"),m(6),d("disabled",t.pacienteForm.invalid||c(61,25,t.isLoading)),m(3),d("ngIf",c(64,27,t.isLoading)))},dependencies:[E,w,L,B,q,A,P,O,U,x]})}};ne=T([V({checkProperties:!0}),M("design:paramtypes",[C])],ne);function de(l,r){l&1&&n(0,"span",13)}var Re=(()=>{class l{constructor(){this.modal=s(k),this.pacienteService=s(D),this.isLoading=s(N).isLoading,this.onSaveComplete=new y}close(){this.modal.dismiss()}delete(){this.pacienteService.delete(this.pacienteId).subscribe(()=>{this.onSaveComplete.emit(),this.modal.close()})}static{this.\u0275fac=function(t){return new(t||l)}}static{this.\u0275cmp=S({type:l,selectors:[["app-pacientes-delete-modal"]],outputs:{onSaveComplete:"onSaveComplete"},decls:25,vars:6,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-information","text-danger","fs-2hx",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body","text-center"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-danger",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(t,u){t&1&&(i(0,"div",0)(1,"h4",1)(2,"span")(3,"i",2),n(4,"span",3)(5,"span",4)(6,"span",5),e()(),o(7," Eliminar Paciente "),e(),i(8,"button",6),b("click",function(){return u.close()}),i(9,"i",7),n(10,"span",3)(11,"span",4),e()()(),i(12,"div",8)(13,"p"),o(14,"\xBFEst\xE1s seguro de eliminar este Paciente?"),e(),i(15,"p"),o(16,"Toda la informaci\xF3n relacionada con este paciente se perder\xE1."),e()(),i(17,"div",9)(18,"button",10),b("click",function(){return u.close()}),o(19," Cancelar "),e(),i(20,"button",11),p(21,"async"),b("click",function(){return u.delete()}),o(22," Eliminar "),_(23,de,1,0,"span",12),p(24,"async"),e()()),t&2&&(m(20),d("disabled",c(21,2,u.isLoading)),m(3),d("ngIf",c(24,4,u.isLoading)))},dependencies:[E,x]})}}return l})();var Xe=(()=>{class l{ngOnInit(){}agInit(a){this.params=a}openEdit(){this.params?.onEdit(this.params.data)}openDelete(){this.params?.onDelete(this.params.data)}refresh(a){return!0}static{this.\u0275fac=function(t){return new(t||l)}}static{this.\u0275cmp=S({type:l,selectors:[["app-pacientes-action-buttons"]],decls:5,vars:0,consts:[[1,"d-flex","align-items-center","gap-2",2,"padding-block","0.15rem"],["type","button",1,"btn","btn-icon","btn-sm","bg-success",3,"click"],[1,"ki-solid","ki-pencil","text-white"],["type","button",1,"btn","btn-icon","btn-sm","btn-danger",3,"click"],[1,"ki-solid","ki-trash","text-white"]],template:function(t,u){t&1&&(i(0,"div",0)(1,"button",1),b("click",function(){return u.openEdit()}),n(2,"span",2),e(),i(3,"button",3),b("click",function(){return u.openDelete()}),n(4,"span",4),e()())}})}}return l})();export{ee as a,ne as b,Re as c,Xe as d};
