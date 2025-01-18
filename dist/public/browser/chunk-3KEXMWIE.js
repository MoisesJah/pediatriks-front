import{a as Ve,b as Ie,c as De,d as Oe,e as Le,f as H}from"./chunk-B5356M2U.js";import{a as Ae,b as Be}from"./chunk-XIUWHSJZ.js";import{ib as Ne,jb as We,lb as Re}from"./chunk-MAAP3SOV.js";import{a as W}from"./chunk-X7PO4PNB.js";import{a as we}from"./chunk-EJWSEBOW.js";import{a as N}from"./chunk-WXQDA2BM.js";import{a as Ee}from"./chunk-PZER2UBN.js";import{a as Me}from"./chunk-4JZDPN5V.js";import"./chunk-Q5L65FNE.js";import{a as ke,e as Pe,f as Te}from"./chunk-C4F35XIX.js";import{a as Fe,b as qe}from"./chunk-XCZLRYQC.js";import"./chunk-GT4JH6HJ.js";import"./chunk-DUBUW4ZU.js";import{a as xe,b as L}from"./chunk-FKRAWMO5.js";import{o as k,p as Ce,q as Se,v as ye}from"./chunk-FWMYVGKL.js";import{a as O}from"./chunk-PQDQNIDX.js";import"./chunk-OIXA5WM3.js";import{D as pe,E as g,F as me,G as ue,J as he,K as fe,M as _e,P as ge,T as be,V as D,X as ve,d as w,e as re,f as le,i as V,k as I,v as se,w as de,x as ce}from"./chunk-MFZOMSUD.js";import{Ab as q,Ac as c,B as j,Ba as d,C as Q,Cc as x,Fa as F,Fc as M,Hc as ne,I as y,Ic as oe,Lc as f,Mc as _,Ob as v,Pa as R,Qa as B,Sb as J,Vb as Y,Wb as Z,Xb as p,Ya as $,a as P,b as T,bc as K,ca as z,ec as r,fa as E,fc as n,gc as m,hc as X,ic as ee,kc as G,oa as U,qc as C,rc as h,t as S,wc as te,xc as ie,yc as ae,zb as s}from"./chunk-JQJUQ5FW.js";var je=(o,i)=>({"btn-active-primary active":o,"cursor-not-allowed":i});function Qe(o,i){if(o&1){let t=G();r(0,"div",12)(1,"label",27),c(2,"Seleccionar Paquete"),n(),r(3,"ng-select",28),f(4,"async"),C("change",function(a){R(t);let l=h();return B(l.changePaquete(a))}),n()()}if(o&2){let t=h();s(3),p("items",_(4,3,t.paquetesList))("loading",t.loadingPaquetes)("loadingText","Cargando...")}}function ze(o,i){if(o&1&&(r(0,"label",27),c(1),n(),m(2,"input",29)),o&2){let t=h();s(),x("N\xB0 de Sesiones (",t.maxSesiones,")"),s(),Z("max",t.maxSesiones)}}function Ue(o,i){o&1&&(r(0,"label",30),c(1,"Hora de Fin"),n(),m(2,"input",31))}function $e(o,i){if(o&1){let t=G();r(0,"button",36),C("click",function(){let a=R(t).$implicit,l=h(2);return B(l.toggleOption(a))}),c(1),n()}if(o&2){let t=i.$implicit,e=h(2);p("disableTooltip",e.isEnabledDay(t))("disabled",!e.isEnabledDay(t))("ngClass",oe(4,je,e.isOptionSelected(t),!e.isEnabledDay(t))),s(),x(" ",t.label," ")}}function Je(o,i){if(o&1&&(r(0,"div",11)(1,"div",32)(2,"label",33),c(3,"Dias Disponibles"),n(),r(4,"div",34),v(5,$e,2,7,"button",35),n()()()),o&2){let t=h();s(5),p("ngForOf",t.options)}}function Ye(o,i){o&1&&m(0,"span",37)}var b,A=(b=class{constructor(i){this.fb=i,this.personalService=d(N),this.pacienteService=d(Me),this.tipoCitaService=d(Ae),this.terapiaService=d(Ee),this.paquetesService=d(we),this.isLoading=d(O).isLoading,this.citaService=d(W),this.toast=d(ke),this.onSaveComplete=new $,this.modal=d(k),this.personal=null,this.isCitaContinua=!1,this.pacientesList=new S,this.tipoCitasList=new S,this.paquetesList=new S,this.maxSesiones=0,this.isRecurrente=!1,this.isCitaPaquete=!1,this.id_tipopaquete="",this.num_cambios=0,this.loadingPacientes=!1,this.loadingPaquetes=!1,this.loadingTipoCitas=!1,this.timeOptions={enableTime:!0,noCalendar:!0,dateFormat:"H:i"},this.options=[{label:"L",value:1},{label:"M",value:2},{label:"MI",value:3},{label:"J",value:4},{label:"V",value:5},{label:"S",value:6}],this.isEnabledDay=t=>{let e=this.createForm.get("hora_inicio")?.value,a=this.createForm.get("hora_fin")?.value;return(this.personal?.horarios).some(u=>u.startTime.substring(0,5)<=e&&u.endTime.substring(0,5)>=a&&u.daysOfWeek.includes(t.value))},this.isOptionSelected=t=>{let e=this.createForm.get("fecha_inicio")?.value,a=new Date(e).getDay()+1,l=this.createForm.get("recurrencia");return l.value.includes(a)||l.push(this.fb.control(a)),t.value===a?!0:l.value.includes(t.value)&&this.isEnabledDay(t)},this.createForm=this.fb.group({id_paciente:[null,g.required],id_tipocita:[null,g.required],id_paquete:[null],fecha_inicio:[null,g.required],hora_inicio:[null,g.required],hora_fin:[null,g.required],descripcion:[null],paquete:[null],num_sesiones:[null],recurrencia:this.fb.array([])})}ngOnInit(){this.loadPacientes(),this.loadTipoCitas()}toggleOption(i){let t=this.createForm.get("fecha_inicio")?.value,e=this.createForm.get("recurrencia"),a=new Date(t).getDay()+1;i.value!==a&&(e.value.includes(i.value)?e.removeAt(e.value.indexOf(i.value)):e.push(this.fb.control(i.value)))}changePaquete(i){let t=this.createForm.get("id_paquete"),e=this.createForm.get("num_sesiones");this.maxSesiones=i?.cantidadsesiones,this.num_cambios=i?.num_cambios,t.value?(e.setValue(i.cantidadsesiones),e.setValidators([g.required,g.max(i.cantidadsesiones)])):(e.setValue(null),e.clearValidators()),e.updateValueAndValidity()}changeTipoCita(i){this.isRecurrente=i?.recurrente,this.isCitaPaquete=i?.nombre==="Paquete",this.id_tipopaquete=this.isCitaPaquete&&i?.id_tipocita;let t=this.createForm.get("id_paquete"),e=this.createForm.get("num_sesiones");this.isCitaPaquete?t?.setValidators(g.required):(t?.clearValidators(),t?.setValue(null),e?.setValue(null),e?.clearValidators()),t?.updateValueAndValidity(),e?.updateValueAndValidity()}changePaciente(i){let t=this.createForm.get("id_paquete");t&&(t.setValue(null),t.clearValidators())}closeModal(){this.modal.dismissAll()}loadPaquetesPaciente(){this.createForm.valueChanges.pipe(z((i,t)=>i.id_paciente===t.id_paciente&&t.id_tipocita===this.id_tipopaquete)).subscribe(i=>{let{id_paciente:t}=i;t&&this.loadPaquetes(t)})}loadTipoCitas(){this.loadingTipoCitas=!0,this.tipoCitasList=this.tipoCitaService.getAll().pipe(y(i=>i.data),E(()=>this.loadingTipoCitas=!1),L(this))}loadPaquetes(i){this.loadingPaquetes=!0;let t={id_paciente:i,id_terapia:this.personal?.terapia.id_terapia};this.paquetesList=this.paquetesService.getByPaciente(t).pipe(y(e=>e.data),E(()=>this.loadingPaquetes=!1),L(this))}loadPacientes(){this.loadingPacientes=!0,this.pacientesList=this.pacienteService.getAll().pipe(y(i=>i.data),E(()=>this.loadingPacientes=!1),L(this))}ngAfterViewInit(){this.loadPaquetesPaciente()}createCita(){this.createForm.valid&&this.citaService.createForTherapy(T(P({},this.createForm.value),{id_sede:this.personal?.sede.id_sede,id_terapia:this.personal?.terapia.id_terapia,id_personal:this.personal?.id_personal})).subscribe({next:i=>{this.onSaveComplete.emit(),this.closeModal(),i.message.startsWith("Cita")||this.toast.info(i.message,"Cita Creada",{disableTimeOut:!0,closeButton:!0})},error:i=>{if(i.error.errors){let t=Object.values(i.error.errors).join(`
`);this.toast.error(t,"Error")}else this.toast.error("Ocurri\xF3 un error al crear la cita","Error")}})}},b.\u0275fac=function(t){return new(t||b)(q(D))},b.\u0275cmp=F({type:b,selectors:[["app-create-modal"]],outputs:{onSaveComplete:"onSaveComplete"},standalone:!0,features:[M],decls:47,vars:24,consts:[[1,"modal-header"],[1,"modal-title"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"row"],[1,"form-group","col-6"],["for","kt_calendar_datepicker_date",1,"form-label"],["bindValue","id_paciente","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_paciente",3,"change","items","loading","loadingText"],[1,"form-label"],["bindValue","id_tipocita","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_tipocita",3,"change","items","loading","loadingText"],["class","form-group col-6",4,"ngIf"],[1,"form-group","col","mb-3"],["type","text","id","kt_calendar_datepicker_date","formControlName","fecha_inicio","mwlFlatpickr","","readonly","","placeholder","Seleccionar Fecha(s)",1,"form-control",3,"noCalendar","altInput","altFormat"],["for","kt_calendar_datepicker_start_time",1,"form-label"],["type","text","id","kt_calendar_datepicker_start_time","formControlName","hora_inicio","readonly","","placeholder","Seleccionar Hora de Inicio",1,"form-control"],["class","row",4,"ngIf"],[1,"modal-footer"],["type","button",1,"btn","btn-light",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],["for","",1,"form-label"],["bindValue","id_paquetes","placeholder","Seleccionar Paquete","bindLabel","nombre","formControlName","id_paquete",3,"change","items","loading","loadingText"],["type","number","min","1","step","1","formControlName","num_sesiones",1,"form-control"],["for","kt_calendar_datepicker_end_time",1,"form-label"],["type","text","id","kt_calendar_datepicker_end_time","formControlName","hora_fin","readonly","","placeholder","Seleccionar Hora de Fin",1,"form-control"],[1,"form-group","d-flex","flex-column","col","mb-3"],["for","kt_calendar_datepicker_end_date",1,"form-label"],[1,"btn-group"],["ngbTooltip","No Disponible","class","btn btn-outline",3,"disableTooltip","disabled","ngClass","click",4,"ngFor","ngForOf"],["ngbTooltip","No Disponible",1,"btn","btn-outline",3,"click","disableTooltip","disabled","ngClass"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(t,e){if(t&1&&(r(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),m(4,"span",4)(5,"span",5)(6,"span",6),n()(),c(7),n(),r(8,"button",7),C("click",function(){return e.closeModal()}),r(9,"i",8),m(10,"span",4)(11,"span",5),n()()(),r(12,"div",9)(13,"form",10)(14,"section",11)(15,"div",12)(16,"label",13),c(17,"Seleccionar Paciente"),n(),r(18,"ng-select",14),f(19,"async"),C("change",function(l){return e.changePaciente(l)}),n()(),r(20,"div",12)(21,"label",15),c(22,"Seleccionar Tipo de Cita"),n(),r(23,"ng-select",16),f(24,"async"),C("change",function(l){return e.changeTipoCita(l)}),n()()(),v(25,Qe,5,5,"div",17),r(26,"div",11)(27,"div",18)(28,"label",13),c(29,"Fecha"),n(),m(30,"input",19),n(),r(31,"div",18)(32,"label",20),c(33,"Hora de Inicio"),n(),m(34,"input",21),n(),r(35,"div",18),v(36,ze,3,2)(37,Ue,3,0),n()(),v(38,Je,6,1,"div",22),n()(),r(39,"div",23)(40,"button",24),C("click",function(){return e.closeModal()}),c(41,"Cancelar"),n(),r(42,"button",25),f(43,"async"),C("click",function(){return e.createCita()}),c(44," Registrar "),v(45,Ye,1,0,"span",26),f(46,"async"),n()()),t&2){let a;s(7),x(" Registrar Cita para ",e.personal==null?null:e.personal.nombre," "),s(6),p("formGroup",e.createForm),s(5),p("items",_(19,16,e.pacientesList))("loading",e.loadingPacientes)("loadingText","Cargando..."),s(5),p("items",_(24,18,e.tipoCitasList))("loading",e.loadingTipoCitas)("loadingText","Cargando..."),s(2),p("ngIf",e.isCitaPaquete),s(5),p("noCalendar",!0)("altInput",!0)("altFormat","d/m/Y"),s(6),K((a=e.createForm.get("id_paquete"))!=null&&a.value?36:37),s(2),p("ngIf",e.isRecurrente),s(4),p("disabled",!e.createForm.valid||_(43,20,e.isLoading)),s(3),p("ngIf",_(46,22,e.isLoading))}},dependencies:[ve,he,pe,fe,me,ue,be,_e,ge,qe,Fe,Te,Pe,I,w,re,le,V,Se,Ce]}),b);A=j([xe({checkProperties:!0}),Q("design:paramtypes",[D])],A);var Ze=["calendar"],Ke=()=>[Ne,w,V],Xe=o=>({"opacity-50":o});function et(o,i){if(o&1&&(m(0,"full-calendar",10,0),f(2,"async"),f(3,"async")),o&2){let t=h();p("events",_(2,3,t.citasEvent))("ngClass",ne(7,Xe,_(3,5,t.isLoading)))("options",t.calendarOptions)}}function tt(o,i){o&1&&(r(0,"h1"),c(1,"Loading..."),n())}var Kt=(()=>{let i=class i{get bodyParams(){return{id_personal:this.personalId,startWeek:this.startWeek,endWeek:this.endWeek}}constructor(e){this.route=e,this.isLoading=d(O).isLoading,this.modal=d(k),this.loadingCalendar=!1,this.citasService=d(W),this.personalService=d(N),this.modalService=d(k),this.router=d(ce),this.citasEvent=new S,this.personalId=this.route.snapshot.params.terapist,this.startWeek=H().startOfWeek,this.endWeek=H().endOfWeek,this.calendarOptions={plugins:[Ve,Ie,De,Oe],headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},eventMaxStack:1,allDaySlot:!1,expandRows:!0,slotLabelInterval:"00:05:00",slotMinTime:"08:00",slotMaxTime:"20:00:00",slotLabelFormat:{hour:"numeric",minute:"2-digit",omitZeroMinute:!1,meridiem:"narrow"},eventTimeFormat:{hour:"numeric",minute:"2-digit",meridiem:"short"},selectConstraint:"businessHours",initialView:"timeGridWeek",weekends:!0,editable:!0,loading:a=>{this.loadingCalendar=a},select:a=>this.handleClick(a),eventClick:this.handleEventClick.bind(this),selectAllow:a=>{let l=this.calendar?.getApi()?.view.type=="timeGridWeek",u=new Date;return u.setHours(0,0,0,0),a.start>=u&&l},selectable:!0,selectMirror:!0,dayMaxEvents:!0,locale:Le,datesSet:a=>{this.startWeek=a.view.activeStart,this.endWeek=a.view.activeEnd,this.loadCitas(this.bodyParams)}},this.route.params.subscribe(()=>{this.startWeek=this.calendar?.getApi()?.view.activeStart,this.endWeek=this.calendar?.getApi()?.view.activeEnd})}ngOnInit(){this.route.params.pipe(U(({terapist:e})=>this.personalId=e)).subscribe(e=>{this.loadCitas(this.bodyParams)}),this.route.data.subscribe(e=>{this.currentPersonal=e.personal,this.calendarOptions=T(P({},this.calendarOptions),{businessHours:this.currentPersonal?.horarios,slotDuration:this.currentPersonal?.terapia.duracion})})}handleClick(e){let a=this.modal.open(A,{size:"lg",centered:!0});a.componentInstance.personal=this.currentPersonal,a.componentInstance.onSaveComplete.subscribe(()=>{this.loadCitas(this.bodyParams)}),a.componentInstance.createForm.patchValue({fecha_inicio:e.startStr.substring(0,10),hora_inicio:e.startStr.substring(11,16),hora_fin:e.endStr.substring(11,16)})}handleEventClick(e){let a=e.event,l=this.modalService.open(Re,{centered:!0,size:"100",scrollable:!0,backdrop:"static"});window.document.body.classList.add("modal-open"),l.componentInstance.eventId=a.id,l.componentInstance.citaId=a.extendedProps.id_cita,l.componentInstance.eventUpdated.subscribe(()=>{this.loadCitas(this.bodyParams)})}loadCitas(e){if(this.currentPersonal)return this.citasEvent=this.citasService.getByPersonal(e).pipe(y(a=>a.data))}};i.\u0275fac=function(a){return new(a||i)(q(se))},i.\u0275cmp=F({type:i,selectors:[["app-especialista"]],viewQuery:function(a,l){if(a&1&&te(Ze,5),a&2){let u;ie(u=ae())&&(l.calendar=u.first)}},standalone:!0,features:[M],decls:17,vars:1,consts:[["calendar",""],["header-title",""],[1,"d-flex","align-items-center","text-white","fw-bold","my-1"],[1,"content","d-flex","flex-column","flex-column-fluid"],["id","kt_content_container",1,"container-xxl"],[1,"card"],[1,"card-header"],[1,"card-toolbar","d-flex","ms-auto","justify-content-end"],[1,"card-body",2,"border","none","box-shadow","0 4px 8px rgba(0, 0, 0, 0.1)","border-radius","0 0 15px 15px"],[1,"demo-app-main"],[3,"events","ngClass","options"]],template:function(a,l){a&1&&(r(0,"app-header"),X(1,1),r(2,"h1",2),c(3),n(),ee(),n(),r(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7),m(9,"app-dropdown"),n()(),r(10,"div",8)(11,"div",9),v(12,et,4,9)(13,tt,2,0),J(14,12,Ke,null,13),Y(0,-1),n()()()()(),m(16,"router-outlet")),a&2&&(s(3),x(" ",l.currentPersonal==null?null:l.currentPersonal.nombre," "))},dependencies:[ye,Be,We,I,de]});let o=i;return o})();export{Kt as EspecialistaComponent};