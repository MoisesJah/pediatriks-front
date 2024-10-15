import{kb as ue,lb as _e}from"./chunk-J5FFI2GS.js";import{a as me}from"./chunk-LZZANZIF.js";import{a as de}from"./chunk-TYB3XQY6.js";import{a as pe}from"./chunk-DG2AXNJQ.js";import{a as ce}from"./chunk-P6SIPGUA.js";import{a as se}from"./chunk-JLYIVYEQ.js";import{a as Ce}from"./chunk-DLC4K37R.js";import{c as oe}from"./chunk-UFE7GCPT.js";import{a as le}from"./chunk-BSO3A7B3.js";import{a as re,b as E}from"./chunk-OWRVEPA3.js";import{a as ae}from"./chunk-C7Z7GTCA.js";import{a as q,b as L,g as ne}from"./chunk-JUBFCIG6.js";import{e as X,f as _,g as z,h as K,k as W,n as Z,o as ee,p as te,q as ie,t as N}from"./chunk-MTDZXKVK.js";import{e as $,f as Y,g as J,j as U}from"./chunk-VUZMLSUX.js";import{B as A,C as O,Da as G,Eb as s,I as C,Ma as S,Na as y,Nb as o,Ob as a,Pb as u,Qb as Q,Rb as R,Tb as k,Ua as D,Yb as f,Zb as m,_ as P,ba as B,cc as F,dc as M,ec as I,f as be,gc as d,ib as l,ic as H,jb as w,nc as j,rc as T,sc as V,t as b,vb as x,za as v}from"./chunk-UAHLOU27.js";var fe=be(Ce());var Se=["startTimePicker"],ye=["endTimePicker"],xe=["datePicker"],Ee=c=>({"btn-active-primary active":c});function ke(c,e){if(c&1){let t=k();o(0,"div",41)(1,"button",42),f("click",function(){S(t);let n=m().index,r=m();return y(r.removeInfoTerapia(n))}),u(2,"i",43),a()()}}function Te(c,e){if(c&1){let t=k();o(0,"button",48),f("click",function(){let n=S(t).$implicit,r=m(2).index,p=m();return y(p.toggleOption(n,r))}),d(1),a()}if(c&2){let t=e.$implicit,i=m(2).index,n=m();s("ngClass",j(2,Ee,n.isOptionSelected(t,i))),l(),H(" ",t.label," ")}}function Ve(c,e){if(c&1&&(o(0,"div",13)(1,"div",44)(2,"label",45),d(3,"Dias de Recurrencia"),a(),o(4,"div",46),x(5,Te,2,4,"button",47),a()()()),c&2){let t=m(2);l(5),s("ngForOf",t.options)}}function we(c,e){if(c&1){let t=k();Q(0),o(1,"div",34),x(2,ke,3,0,"div",35),o(3,"div",13)(4,"div",36)(5,"label",37),d(6,"Terapia"),a(),o(7,"ng-select",38),T(8,"async"),f("change",function(n){let r=S(t).index,p=m();return y(p.getTerapiaId(n,r))}),a()(),o(9,"div",36)(10,"label",37),d(11,"Especialista"),a(),u(12,"ng-select",39),a()(),x(13,Ve,6,1,"div",40),a(),R()}if(c&2){let t=e.index,i=m();l(),s("formGroupName",t),l(),s("ngIf",t>0),l(5),s("items",V(8,7,i.terapiasList))("loadingText","Cargando.."),l(5),s("items",i.avaiblePersonal[t])("loadingText","Cargando.."),l(),s("ngIf",i.isCitaContinua)}}function Fe(c,e){if(c&1){let t=k();o(0,"div",49)(1,"button",50),f("click",function(){S(t);let n=m();return y(n.closeModal())}),d(2,"Cancelar"),a(),o(3,"button",51),f("click",function(){S(t);let n=m();return y(n.submitEvent())}),d(4,"Guardar"),a()()}}var h,ve=(h=class{constructor(e,t,i){this.activeModal=e,this.modalService=t,this.fb=i,this.event=null,this.eventSubmitted=new D,this.eventDeleted=new D,this.terapiaService=v(ne),this.sedesService=v(ce),this.personalService=v(de),this.pacienteService=v(se),this.tipoCitaService=v(_e),this.paquetesService=v(pe),this.isLoading=v(ae).isLoading,this.citaService=v(me),this.terapiasList=new b,this.sedesList=new b,this.pacientesList=new b,this.personalList=new b,this.tipoCitasList=new b,this.paquetesList=new b,this.es=fe.default.es,this.isCitaContinua=!1,this.terapiasId=[],this.paquetesId=[],this.timeOptions={enableTime:!0,noCalendar:!0,dateFormat:"H:i"},this.avaiblePersonal=[],this.options=[{label:"L",value:1},{label:"M",value:2},{label:"MI",value:3},{label:"J",value:4},{label:"V",value:5}],this.isOptionSelected=(r,p)=>this.eventForm.get("detalle").at(p)?.get("recurrencia")?.value?.includes(r.value);let n=new Date;this.minDate=this.formatDate(n),this.eventForm=this.fb.group({id_paciente:[null,_.required],id_sede:[null,_.required],fecha_inicio:["",_.required],hora_inicio:["",_.required],hora_fin:["",_.required],id_tipocita:[null,_.required],detalle:this.fb.array([this.createDetalle()])})}get detalle(){return this.eventForm.get("detalle")}changeTipoCita(e){this.isCitaContinua=e?.nombre&&e?.nombre!=="Evaluaci\xF3n",this.isCitaContinua&&this.detalle.controls.forEach(t=>{t.get("id_paquete")?.setValidators(_.required)})}changePaquete(e,t){(this.eventForm.get("detalle").at(t)?.get("num_sesiones")).setValue(e?.cantidadsesiones)}toggleOption(e,t){let n=this.eventForm.get("detalle").at(t)?.get("recurrencia"),r=n.value;r.indexOf(e.value)===-1?n.setValue([...r,e.value]):n.setValue(r.filter(g=>g!==e.value))}onStartTimeChange(e,t){let[i,n]=e.dateString.split(":").map(Number),r=new Date;r.setHours(i,n+5),(this.detalle.at(t)?.get("hora_fin")).setValue(r.toTimeString().slice(0,5))}createDetalle(){return this.fb.group({id_terapia:[null,_.required],id_paquete:[null],num_sesiones:[null],id_personal:[null,_.required],recurrencia:this.fb.control([])})}addInfoTerapia(){this.detalle.push(this.createDetalle())}removeInfoTerapia(e){this.detalle.removeAt(e)}ngOnInit(){this.loadTerapias(),this.loadSedes(),this.loadPacientes(),this.loadPersonal(),this.loadTipoCitas()}getTerapiaId(e,t){this.isCitaContinua&&e?(this.terapiasId[t]=e.id_terapia,this.terapiaService.getPaquetesByTerapia(e.id_terapia).pipe(P(1)).subscribe(i=>this.paquetesId[t]=i.data)):(this.paquetesId[t]=[],this.detalle.at(t).get("id_personal")?.setValue(null),this.detalle.at(t).get("id_paquete")?.setValue(null))}ngAfterViewInit(){this.eventForm.valueChanges.pipe(B((e,t)=>JSON.stringify(e)===JSON.stringify(t))).subscribe(e=>{let t=e.id_sede;e.detalle.forEach((n,r,p)=>{let g={id_terapia:p[r].id_terapia,fecha_inicio:p[r].fecha_inicio,hora_inicio:p[r].hora_inicio,hora_fin:p[r].hora_fin,id_sede:t};[g.id_terapia,g.fecha_inicio,g.hora_inicio,g.hora_fin].every(Boolean)&&t?this.citaService.getAvailablePersonal(g).pipe(P(1)).subscribe({next:ge=>{this.avaiblePersonal[r]=ge.data},error:()=>{this.avaiblePersonal[r]=[]}}):(this.avaiblePersonal[r]=[],this.detalle.at(r).get("id_personal")?.setValue(null))})})}loadTerapias(){this.terapiasList=this.terapiaService.getAll().pipe(C(e=>e.data),E(this))}loadSedes(){this.sedesList=this.sedesService.getAll().pipe(C(e=>e.data),E(this))}loadTipoCitas(){this.tipoCitasList=this.tipoCitaService.getAll().pipe(C(e=>e.data),E(this))}loadPacientes(){this.pacientesList=this.pacienteService.getAll().pipe(C(e=>e.data),E(this))}loadPersonal(){this.personalList=this.personalService.getAll().pipe(C(e=>e.data),E(this))}openEditModal(){this.activeModal.close(),setTimeout(()=>{let e=this.modalService.open(ue,{size:"lg"});e.componentInstance.event=this.event,e.componentInstance.isEditMode=!0,e.componentInstance.eventUpdated.subscribe(t=>{this.eventSubmitted.emit(t),console.log("Event updated:",t)})},300)}closeModal(){this.activeModal.dismiss()}submitEvent(){console.log(this.eventForm.value)}deleteEvent(){this.event&&(this.eventDeleted.emit(this.event.id),this.activeModal.close())}formatDate(e){let t=e.getFullYear(),i=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${i}-${n}`}},h.\u0275fac=function(t){return new(t||h)(w(q),w(L),w(N))},h.\u0275cmp=G({type:h,selectors:[["app-modal-event"]],viewQuery:function(t,i){if(t&1&&(F(Se,5),F(ye,5),F(xe,5)),t&2){let n;M(n=I())&&(i.startTimePicker=n.first),M(n=I())&&(i.endTimePicker=n.first),M(n=I())&&(i.datePicker=n.first)}},inputs:{event:"event"},outputs:{eventSubmitted:"eventSubmitted",eventDeleted:"eventDeleted"},decls:56,vars:17,consts:[[1,"modal-header"],[1,"modal-title"],[1,"ki-duotone","ki-calendar-add","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],[1,"path4"],[1,"path5"],[1,"path6"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"row"],[1,"form-group","col-6","mb-3"],["for","patient_selection",1,"form-label"],["formControlName","id_paciente","bindValue","id_paciente","placeholder","Seleccionar","bindLabel","nombre",3,"items","loadingText"],["for","id_paquete",1,"form-label"],["formControlName","id_tipocita","bindValue","id_tipocita","placeholder","Seleccionar","bindLabel","nombre",3,"change","items","loadingText"],["formControlName","id_sede","bindValue","id_sede","placeholder","Seleccionar","bindLabel","nombre",3,"items","loadingText"],[1,"form-group","col"],["for","kt_calendar_datepicker_date",1,"form-label"],["type","text","mwlFlatpickr","","altFormat","d/m/Y","id","kt_calendar_datepicker_date","formControlName","fecha_inicio","placeholder","Seleccionar Fecha(s)",1,"form-control",3,"noCalendar","altInput"],["for","kt_calendar_datepicker_start_time",1,"form-label"],["type","text","readonly","","id","kt_calendar_datepicker_start_time","formControlName","hora_inicio","placeholder","Seleccionar Hora de Inicio",1,"form-control"],["for","kt_calendar_datepicker_end_time",1,"form-label"],["type","text","readonly","","id","kt_calendar_datepicker_end_time","formControlName","hora_fin","placeholder","Seleccionar Hora de Fin",1,"form-control"],["formArrayName","detalle"],[1,"d-flex","justify-content-between","align-items-center"],["for","",1,"form-label","fw-bolder","fs-5"],[1,"btn","btn-primary","fs-10","btn-sm","btn-icon",3,"click"],[1,"ki-duotone","ki-plus"],[4,"ngFor","ngForOf"],["class","modal-footer",4,"ngIf"],[1,"form-group","d-flex","flex-column","gap-3","position-relative","p-4","border-2","mt-2","border-dashed","border-gray-300","rounded",3,"formGroupName"],["class","position-absolute end-0","style","transform: translateY(-18px) translateX(12px);",4,"ngIf"],[1,"col-6"],["for","",1,"form-label"],["bindValue","id_terapia","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_terapia",3,"change","items","loadingText"],["bindValue","id_personal","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_personal",3,"items","loadingText"],["class","row",4,"ngIf"],[1,"position-absolute","end-0",2,"transform","translateY(-18px) translateX(12px)"],[1,"btn","btn-sm","fs-10","btn-icon","btn-active-color-danger","btn-danger",3,"click"],[1,"ki-solid","ki-cross"],[1,"form-group","d-flex","flex-column","col","mb-3"],["for","kt_calendar_datepicker_end_date",1,"form-label"],[1,"btn-group"],["class","btn btn-outline",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"btn","btn-outline",3,"click","ngClass"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click"]],template:function(t,i){t&1&&(o(0,"div",0)(1,"h4",1)(2,"i",2),u(3,"span",3)(4,"span",4)(5,"span",5)(6,"span",6)(7,"span",7)(8,"span",8),a(),d(9," Registrar Nueva Cita "),a(),o(10,"button",9),f("click",function(){return i.closeModal()}),o(11,"i",10),u(12,"span",3)(13,"span",4),a()()(),o(14,"div",11)(15,"form",12)(16,"div",13)(17,"div",14)(18,"label",15),d(19,"Seleccionar Paciente"),a(),u(20,"ng-select",16),T(21,"async"),a(),o(22,"div",14)(23,"label",17),d(24,"Tipo de Cita"),a(),o(25,"ng-select",18),T(26,"async"),f("change",function(r){return i.changeTipoCita(r)}),a()(),o(27,"div",14)(28,"label",17),d(29,"Seleccionar Sede"),a(),u(30,"ng-select",19),T(31,"async"),a()(),o(32,"div",13)(33,"div",20)(34,"label",21),d(35,"Fecha"),a(),u(36,"input",22),a(),o(37,"div",20)(38,"label",23),d(39,"Hora de Inicio"),a(),u(40,"input",24),a(),o(41,"div",20)(42,"label",25),d(43,"Hora de Fin"),a(),u(44,"input",26),a()(),o(45,"div",27)(46,"div",28)(47,"label",29),d(48,"Detalle de la Cita"),a(),o(49,"button",30),f("click",function(){return i.addInfoTerapia()}),o(50,"span")(51,"i",31),u(52,"span",3)(53,"span",4),a()()()(),x(54,we,14,9,"ng-container",32),a()()(),x(55,Fe,5,0,"div",33)),t&2&&(l(15),s("formGroup",i.eventForm),l(5),s("items",V(21,11,i.pacientesList))("loadingText","Cargando.."),l(5),s("items",V(26,13,i.tipoCitasList))("loadingText","Cargando.."),l(5),s("items",V(31,15,i.sedesList))("loadingText","Cargando.."),l(6),s("noCalendar",!0)("altInput",!0),l(18),s("ngForOf",i.detalle.controls),l(),s("ngIf",!i.event))},dependencies:[$,Y,J,W,X,z,K,Z,ie,ee,te,oe,le,U]}),h);ve=A([re({checkProperties:!0}),O("design:paramtypes",[q,L,N])],ve);export{ve as a};