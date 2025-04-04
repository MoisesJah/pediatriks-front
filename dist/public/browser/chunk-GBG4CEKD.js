import{a as h}from"./chunk-YBOIPEH3.js";import{a as B}from"./chunk-WFL7FBLQ.js";import{a as C}from"./chunk-GT4JH6HJ.js";import{o as v}from"./chunk-47BWZHPK.js";import{c as D,d as a,e as M,f as P,k as A,l as L,o as j,r as H,v as Q,y as b}from"./chunk-JV7DKPVM.js";import{a as G,b as O}from"./chunk-TA6YOJTR.js";import{o as V}from"./chunk-CWIGPBJP.js";import{Ba as T,Bc as E,Cc as _,Dc as g,Fc as n,La as m,Ma as s,Mb as w,Ua as F,Vb as u,fc as i,gc as e,hc as o,l as k,lc as I,uc as f,v as x,w as N,wb as c,xa as q,xb as p}from"./chunk-JCDSCFF6.js";var U=["startTimePicker"],$=["endTimePicker"];function J(z,d){z&1&&o(0,"span",41)}var R=class y{constructor(d,t,r){this.fb=d,this.sedeService=t,this.modalService=r,this.isLoading=!1,this.subscriptions=new k,this.toast=q(B),this.onSaveComplete=new F,this.sedeForm=this.fb.group({nombre:["",a.required],direccion:["",a.required],distrito:["",a.required],provincia:["",a.required],departamento:["",a.required],telefono:["",[a.required,a.pattern("^[0-9]+$")]],email:["",[a.required,a.email]],horarioapertura:[""],horariocierre:[""],capacidadpacientes:[1,[a.required,a.min(1)]],numeroconsultorios:[1,[a.required,a.min(1)]]})}ngOnInit(){this.sedeId?this.loadSedeData():console.error("sedeId no est\xE1 definido")}ngAfterViewInit(){this.startTimePicker&&this.startTimePicker.nativeElement&&C(this.startTimePicker.nativeElement,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",defaultDate:this.sedeForm?.get("horarioapertura")?.value}),this.endTimePicker&&this.endTimePicker.nativeElement&&C(this.endTimePicker.nativeElement,{enableTime:!0,noCalendar:!0,dateFormat:"H:i",defaultDate:this.sedeForm?.get("horariocierre")?.value})}ngOnDestroy(){this.subscriptions.unsubscribe()}loadSedeData(){this.isLoading=!0;let d=this.sedeService.getById(this.sedeId).pipe(O(this)).subscribe({next:t=>{t.status==="success"&&t.data?(this.sedeForm.patchValue(t.data),this.isLoading=!1,this.ngAfterViewInit()):(console.error("Error en la respuesta:",t),this.isLoading=!1)},error:t=>{console.error("Error al cargar los datos de la sede:",t),this.isLoading=!1}});this.subscriptions.add(d)}close(){this.modalService.dismissAll()}save(){if(this.sedeForm.valid){this.isLoading=!0;let d=this.sedeForm.value,t=this.sedeService.update(d,this.sedeId).subscribe({next:()=>{this.onSaveComplete.emit(),this.modalService.dismissAll()},error:r=>{if(r.error.errors){let l=Object.values(r.error.errors).join(`
`);this.toast.error(l,"Error")}else this.toast.error("Ocurrio un error al actualizar la sede","Error")}});this.subscriptions.add(t)}}static{this.\u0275fac=function(t){return new(t||y)(p(b),p(h),p(v))}}static{this.\u0275cmp=T({type:y,selectors:[["app-editar-modal"]],viewQuery:function(t,r){if(t&1&&(E(U,5),E($,5)),t&2){let l;_(l=g())&&(r.startTimePicker=l.first),_(l=g())&&(r.endTimePicker=l.first)}},inputs:{sedeId:"sedeId"},outputs:{onSaveComplete:"onSaveComplete"},decls:70,vars:3,consts:[["startTimePicker",""],["endTimePicker",""],[1,"modal-header"],["id","modal-basic-title",1,"modal-title","d-flex","align-items-center","gap-1"],[1,"ki-duotone","ki-notepad-edit","text-gray-900","fs-1",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"row"],[1,"form-group","col-6"],["for","nombre",1,"required","form-label"],["type","text","id","nombre","formControlName","nombre",1,"form-control"],["for","direccion",1,"required","form-label"],["type","text","id","direccion","formControlName","direccion",1,"form-control"],["for","distrito",1,"required","form-label"],["type","text","id","distrito","formControlName","distrito",1,"form-control"],["for","provincia",1,"required","form-label"],["type","text","id","provincia","formControlName","provincia",1,"form-control"],["for","departamento",1,"required","form-label"],["type","text","id","departamento","formControlName","departamento",1,"form-control"],["for","telefono",1,"required","form-label"],["type","text","id","telefono","formControlName","telefono",1,"form-control"],[1,"form-group"],["for","email",1,"required","form-label"],["type","email","id","email","formControlName","email",1,"form-control"],[1,"form-group","col-6","mb-3"],["for","kt_calendar_datepicker_start_time"],["type","text","id","kt_calendar_datepicker_start_time","formControlName","horarioapertura","placeholder","Seleccionar Hora de Apertura",1,"form-control"],["for","kt_calendar_datepicker_end_time"],["type","text","id","kt_calendar_datepicker_end_time","formControlName","horariocierre","placeholder","Seleccionar Hora de Cierre",1,"form-control"],["for","capacidadpacientes",1,"required","form-label"],["type","number","id","capacidadpacientes","formControlName","capacidadpacientes","min","1",1,"form-control"],["for","numeroconsultorios",1,"required","form-label"],["type","number","id","numeroconsultorios","formControlName","numeroconsultorios","min","1",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(t,r){if(t&1){let l=I();i(0,"div",2)(1,"h4",3)(2,"span")(3,"i",4),o(4,"span",5)(5,"span",6),e()(),n(6," Editar Sede "),e(),i(7,"button",7),f("click",function(){return m(l),s(r.close())}),i(8,"i",8),o(9,"span",5)(10,"span",6),e()()(),i(11,"div",9)(12,"form",10)(13,"div",11)(14,"div",12)(15,"label",13),n(16,"Nombre"),e(),o(17,"input",14),e(),i(18,"div",12)(19,"label",15),n(20,"Direcci\xF3n"),e(),o(21,"input",16),e()(),i(22,"div",11)(23,"div",12)(24,"label",17),n(25,"Distrito"),e(),o(26,"input",18),e(),i(27,"div",12)(28,"label",19),n(29,"Provincia"),e(),o(30,"input",20),e()(),i(31,"div",11)(32,"div",12)(33,"label",21),n(34,"Departamento"),e(),o(35,"input",22),e(),i(36,"div",12)(37,"label",23),n(38,"Tel\xE9fono"),e(),o(39,"input",24),e()(),i(40,"div",25)(41,"label",26),n(42,"Correo Electr\xF3nico"),e(),o(43,"input",27),e(),i(44,"div",11)(45,"div",28)(46,"label",29),n(47,"Hora de Apertura"),e(),o(48,"input",30,0),e(),i(50,"div",28)(51,"label",31),n(52,"Hora de Cierre"),e(),o(53,"input",32,1),e()(),i(55,"div",11)(56,"div",12)(57,"label",33),n(58,"Capacidad de Pacientes"),e(),o(59,"input",34),e(),i(60,"div",12)(61,"label",35),n(62,"N\xFAmero de Consultorios"),e(),o(63,"input",36),e()()()(),i(64,"div",37)(65,"button",38),f("click",function(){return m(l),s(r.close())}),n(66," Cancelar "),e(),i(67,"button",39),f("click",function(){return m(l),s(r.save())}),n(68," Guardar "),w(69,J,1,0,"span",40),e()()}t&2&&(c(12),u("formGroup",r.sedeForm),c(55),u("disabled",r.sedeForm.invalid||r.isLoading),c(2),u("ngIf",r.isLoading))},dependencies:[V,A,D,L,M,P,Q,j,H]})}};R=x([G(),N("design:paramtypes",[b,h,v])],R);export{R as a};
