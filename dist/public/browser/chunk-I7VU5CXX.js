import{a as Ve,b as Ie,c as De,d as Oe,e as Le,f as G}from"./chunk-SBHJJORO.js";import{a as Ae,b as Be}from"./chunk-MZ5GG2VU.js";import{ib as Ne,jb as We,lb as Re}from"./chunk-OSQG6LRP.js";import"./chunk-QJRD3SBW.js";import{a as L}from"./chunk-L4ZHC2S3.js";import"./chunk-T5EURV5D.js";import{a as we}from"./chunk-ZK2D5MUY.js";import{a as O}from"./chunk-I5IYTPG5.js";import{a as Te}from"./chunk-UU7FDT6A.js";import{a as Me}from"./chunk-UAJD3ZHR.js";import"./chunk-K7PIUIFR.js";import{a as ke,e as Pe,f as Ee}from"./chunk-6DZXAK53.js";import{a as Fe,b as qe}from"./chunk-JKPBS6JL.js";import"./chunk-GT4JH6HJ.js";import"./chunk-EBZKSOFQ.js";import{a as xe,b as D}from"./chunk-KG3B2A6X.js";import{o as y,p as Ce,q as Se,u as ye}from"./chunk-CZPC3FHQ.js";import{a as I}from"./chunk-NMGGHNE5.js";import"./chunk-A3C2G7L3.js";import"./chunk-KNEUCQQI.js";import"./chunk-GKZUPR7X.js";import{A as fe,C as _e,F as ge,J as be,M as V,O as ve,j as se,k as de,l as ce,r as pe,s as _,t as me,u as ue,z as he}from"./chunk-R7YU5FNY.js";import{m as q,n as re,o as le,t as M,v as w}from"./chunk-DP3M2V7L.js";import{Aa as E,Ac as S,C,Gc as F,Ic as ne,Jc as oe,Ka as A,La as R,Lb as g,Nc as h,Oc as f,Pb as J,Sb as Y,Ta as $,Tb as Z,Ub as p,Z as z,_b as K,a as x,aa as P,b as k,bc as r,cc as o,dc as m,ec as X,fc as ee,hc as B,ja as U,n as v,nc as b,oc as u,uc as te,v as j,vb as s,vc as ie,w as Q,wa as d,wb as T,wc as ae,yc as c}from"./chunk-B7JMKZ3I.js";var je=(n,i)=>({"btn-active-primary active":n,"cursor-not-allowed":i});function Qe(n,i){if(n&1){let e=B();r(0,"div",12)(1,"label",27),c(2,"Seleccionar Paquete"),o(),r(3,"ng-select",28),h(4,"async"),b("change",function(a){A(e);let l=u();return R(l.changePaquete(a))}),o()()}if(n&2){let e=u();s(3),p("items",f(4,3,e.paquetesList))("loading",e.loadingPaquetes)("loadingText","Cargando...")}}function ze(n,i){if(n&1&&(r(0,"label",27),c(1),o(),m(2,"input",29)),n&2){let e=u();s(),S("N\xB0 de Sesiones (",e.maxSesiones,")"),s(),Z("max",e.maxSesiones)}}function Ue(n,i){n&1&&(r(0,"label",30),c(1,"Hora de Fin"),o(),m(2,"input",31))}function $e(n,i){if(n&1){let e=B();r(0,"button",36),b("click",function(){let a=A(e).$implicit,l=u(2);return R(l.toggleOption(a))}),c(1),o()}if(n&2){let e=i.$implicit,t=u(2);p("disableTooltip",t.isEnabledDay(e))("disabled",!t.isEnabledDay(e))("ngClass",oe(4,je,t.isOptionSelected(e),!t.isEnabledDay(e))),s(),S(" ",e.label," ")}}function Je(n,i){if(n&1&&(r(0,"div",11)(1,"div",32)(2,"label",33),c(3,"Dias Disponibles"),o(),r(4,"div",34),g(5,$e,2,7,"button",35),o()()()),n&2){let e=u();s(5),p("ngForOf",e.options)}}function Ye(n,i){n&1&&m(0,"span",37)}var N=class H{constructor(i){this.fb=i,this.personalService=d(O),this.pacienteService=d(Me),this.tipoCitaService=d(Ae),this.terapiaService=d(Te),this.paquetesService=d(we),this.isLoading=d(I).isLoading,this.citaService=d(L),this.toast=d(ke),this.onSaveComplete=new $,this.modal=d(y),this.personal=null,this.isCitaContinua=!1,this.pacientesList=new v,this.tipoCitasList=new v,this.paquetesList=new v,this.maxSesiones=0,this.isRecurrente=!1,this.isCitaPaquete=!1,this.id_tipopaquete="",this.num_cambios=0,this.loadingPacientes=!1,this.loadingPaquetes=!1,this.loadingTipoCitas=!1,this.timeOptions={enableTime:!0,noCalendar:!0,dateFormat:"H:i"},this.options=[{label:"L",value:1},{label:"M",value:2},{label:"MI",value:3},{label:"J",value:4},{label:"V",value:5},{label:"S",value:6}],this.isEnabledDay=e=>{let t=this.createForm.get("hora_inicio")?.value,a=this.createForm.get("hora_fin")?.value;return(this.personal?.horarios).some(W=>W.startTime.substring(0,5)<=t&&W.endTime.substring(0,5)>=a&&W.daysOfWeek.includes(e.value))},this.isOptionSelected=e=>{let t=this.createForm.get("fecha_inicio")?.value,a=new Date(t).getDay()+1,l=this.createForm.get("recurrencia");return l.value.includes(a)||l.push(this.fb.control(a)),e.value===a?!0:l.value.includes(e.value)&&this.isEnabledDay(e)},this.createForm=this.fb.group({id_paciente:[null,_.required],id_tipocita:[null,_.required],id_paquete:[null],fecha_inicio:[null,_.required],hora_inicio:[null,_.required],hora_fin:[null,_.required],descripcion:[null],paquete:[null],num_sesiones:[null],recurrencia:this.fb.array([])})}ngOnInit(){this.loadPacientes(),this.loadTipoCitas()}toggleOption(i){let e=this.createForm.get("fecha_inicio")?.value,t=this.createForm.get("recurrencia"),a=new Date(e).getDay()+1;i.value!==a&&(t.value.includes(i.value)?t.removeAt(t.value.indexOf(i.value)):t.push(this.fb.control(i.value)))}changePaquete(i){let e=this.createForm.get("id_paquete"),t=this.createForm.get("num_sesiones");this.maxSesiones=i?.cantidadsesiones,this.num_cambios=i?.num_cambios,e.value?(t.setValue(i.cantidadsesiones),t.setValidators([_.required,_.max(i.cantidadsesiones)])):(t.setValue(null),t.clearValidators()),t.updateValueAndValidity()}changeTipoCita(i){this.isRecurrente=i?.recurrente,this.isCitaPaquete=i?.nombre==="Paquete",this.id_tipopaquete=this.isCitaPaquete&&i?.id_tipocita;let e=this.createForm.get("id_paquete"),t=this.createForm.get("num_sesiones");this.isCitaPaquete?e?.setValidators(_.required):(e?.clearValidators(),e?.setValue(null),t?.setValue(null),t?.clearValidators()),e?.updateValueAndValidity(),t?.updateValueAndValidity()}changePaciente(i){let e=this.createForm.get("id_paquete");e&&(e.setValue(null),e.clearValidators())}closeModal(){this.modal.dismissAll()}loadPaquetesPaciente(){this.createForm.valueChanges.pipe(z((i,e)=>i.id_paciente===e.id_paciente&&e.id_tipocita===this.id_tipopaquete)).subscribe(i=>{let{id_paciente:e}=i;e&&this.loadPaquetes(e)})}loadTipoCitas(){this.loadingTipoCitas=!0,this.tipoCitasList=this.tipoCitaService.getAll().pipe(C(i=>i.data),P(()=>this.loadingTipoCitas=!1),D(this))}loadPaquetes(i){this.loadingPaquetes=!0;let e={id_paciente:i,id_terapia:this.personal?.terapia.id_terapia};this.paquetesList=this.paquetesService.getByPaciente(e).pipe(C(t=>t.data),P(()=>this.loadingPaquetes=!1),D(this))}loadPacientes(){this.loadingPacientes=!0,this.pacientesList=this.pacienteService.getAll().pipe(C(i=>i.data),P(()=>this.loadingPacientes=!1),D(this))}ngAfterViewInit(){this.loadPaquetesPaciente()}createCita(){this.createForm.valid&&this.citaService.createForTherapy(k(x({},this.createForm.value),{id_sede:this.personal?.sede.id_sede,id_terapia:this.personal?.terapia.id_terapia,id_personal:this.personal?.id_personal})).subscribe({next:i=>{this.onSaveComplete.emit(),this.closeModal(),i.message.startsWith("Cita")||this.toast.info(i.message,"Cita Creada",{disableTimeOut:!0,closeButton:!0})},error:i=>{if(i.error.errors){let e=Object.values(i.error.errors).join(`
`);this.toast.error(e,"Error")}else this.toast.error("Ocurri\xF3 un error al crear la cita","Error")}})}static{this.\u0275fac=function(e){return new(e||H)(T(V))}}static{this.\u0275cmp=E({type:H,selectors:[["app-create-modal"]],outputs:{onSaveComplete:"onSaveComplete"},standalone:!0,features:[F],decls:47,vars:24,consts:[[1,"modal-header"],[1,"modal-title"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"row"],[1,"form-group","col-6"],["for","kt_calendar_datepicker_date",1,"form-label"],["bindValue","id_paciente","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_paciente",3,"change","items","loading","loadingText"],[1,"form-label"],["bindValue","id_tipocita","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_tipocita",3,"change","items","loading","loadingText"],["class","form-group col-6",4,"ngIf"],[1,"form-group","col","mb-3"],["type","text","id","kt_calendar_datepicker_date","formControlName","fecha_inicio","mwlFlatpickr","","readonly","","placeholder","Seleccionar Fecha(s)",1,"form-control",3,"noCalendar","altInput","altFormat"],["for","kt_calendar_datepicker_start_time",1,"form-label"],["type","text","id","kt_calendar_datepicker_start_time","formControlName","hora_inicio","readonly","","placeholder","Seleccionar Hora de Inicio",1,"form-control"],["class","row",4,"ngIf"],[1,"modal-footer"],["type","button",1,"btn","btn-light",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["class","spinner-border spinner-border-sm align-middle ms-2",4,"ngIf"],["for","",1,"form-label"],["bindValue","id_paquetes","placeholder","Seleccionar Paquete","bindLabel","nombre","formControlName","id_paquete",3,"change","items","loading","loadingText"],["type","number","min","1","step","1","formControlName","num_sesiones",1,"form-control"],["for","kt_calendar_datepicker_end_time",1,"form-label"],["type","text","id","kt_calendar_datepicker_end_time","formControlName","hora_fin","readonly","","placeholder","Seleccionar Hora de Fin",1,"form-control"],[1,"form-group","d-flex","flex-column","col","mb-3"],["for","kt_calendar_datepicker_end_date",1,"form-label"],[1,"btn-group"],["ngbTooltip","No Disponible","class","btn btn-outline",3,"disableTooltip","disabled","ngClass","click",4,"ngFor","ngForOf"],["ngbTooltip","No Disponible",1,"btn","btn-outline",3,"click","disableTooltip","disabled","ngClass"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(e,t){if(e&1&&(r(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),m(4,"span",4)(5,"span",5)(6,"span",6),o()(),c(7),o(),r(8,"button",7),b("click",function(){return t.closeModal()}),r(9,"i",8),m(10,"span",4)(11,"span",5),o()()(),r(12,"div",9)(13,"form",10)(14,"section",11)(15,"div",12)(16,"label",13),c(17,"Seleccionar Paciente"),o(),r(18,"ng-select",14),h(19,"async"),b("change",function(l){return t.changePaciente(l)}),o()(),r(20,"div",12)(21,"label",15),c(22,"Seleccionar Tipo de Cita"),o(),r(23,"ng-select",16),h(24,"async"),b("change",function(l){return t.changeTipoCita(l)}),o()()(),g(25,Qe,5,5,"div",17),r(26,"div",11)(27,"div",18)(28,"label",13),c(29,"Fecha"),o(),m(30,"input",19),o(),r(31,"div",18)(32,"label",20),c(33,"Hora de Inicio"),o(),m(34,"input",21),o(),r(35,"div",18),g(36,ze,3,2)(37,Ue,3,0),o()(),g(38,Je,6,1,"div",22),o()(),r(39,"div",23)(40,"button",24),b("click",function(){return t.closeModal()}),c(41,"Cancelar"),o(),r(42,"button",25),h(43,"async"),b("click",function(){return t.createCita()}),c(44," Registrar "),g(45,Ye,1,0,"span",26),h(46,"async"),o()()),e&2){let a;s(7),S(" Registrar Cita para ",t.personal==null?null:t.personal.nombre," "),s(6),p("formGroup",t.createForm),s(5),p("items",f(19,16,t.pacientesList))("loading",t.loadingPacientes)("loadingText","Cargando..."),s(5),p("items",f(24,18,t.tipoCitasList))("loading",t.loadingTipoCitas)("loadingText","Cargando..."),s(2),p("ngIf",t.isCitaPaquete),s(5),p("noCalendar",!0)("altInput",!0)("altFormat","d/m/Y"),s(6),K((a=t.createForm.get("id_paquete"))!=null&&a.value?36:37),s(2),p("ngIf",t.isRecurrente),s(4),p("disabled",!t.createForm.valid||f(43,20,t.isLoading)),s(3),p("ngIf",f(46,22,t.isLoading))}},dependencies:[ve,he,pe,fe,me,ue,be,_e,ge,qe,Fe,Ee,Pe,w,q,re,le,M,Se,Ce]})}};N=j([xe({checkProperties:!0}),Q("design:paramtypes",[V])],N);var Ze=["calendar"],Ke=()=>[Ne,q,M],Xe=n=>({"opacity-50":n});function et(n,i){if(n&1&&(m(0,"full-calendar",10,0),h(2,"async"),h(3,"async")),n&2){let e=u();p("events",f(2,3,e.citasEvent))("ngClass",ne(7,Xe,f(3,5,e.isLoading)))("options",e.calendarOptions)}}function tt(n,i){n&1&&(r(0,"h1"),c(1,"Loading..."),o())}var Kt=(()=>{class n{get bodyParams(){return{id_personal:this.personalId,startWeek:this.startWeek,endWeek:this.endWeek}}constructor(e){this.route=e,this.isLoading=d(I).isLoading,this.modal=d(y),this.loadingCalendar=!1,this.citasService=d(L),this.personalService=d(O),this.modalService=d(y),this.router=d(ce),this.citasEvent=new v,this.personalId=this.route.snapshot.params.terapist,this.startWeek=G().startOfWeek,this.endWeek=G().endOfWeek,this.calendarOptions={plugins:[Ve,Ie,De,Oe],headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},eventMaxStack:1,allDaySlot:!1,expandRows:!0,slotLabelInterval:"00:05:00",slotMinTime:"08:00",slotMaxTime:"20:00:00",slotLabelFormat:{hour:"numeric",minute:"2-digit",omitZeroMinute:!1,meridiem:"narrow"},eventTimeFormat:{hour:"numeric",minute:"2-digit",meridiem:"short"},selectConstraint:"businessHours",initialView:"timeGridWeek",weekends:!0,editable:!0,loading:t=>{this.loadingCalendar=t},select:t=>this.handleClick(t),eventClick:this.handleEventClick.bind(this),selectAllow:t=>{let a=this.calendar?.getApi()?.view.type=="timeGridWeek",l=new Date;return l.setHours(0,0,0,0),t.start>=l&&a},selectable:!0,selectMirror:!0,dayMaxEvents:!0,locale:Le,datesSet:t=>{this.startWeek=t.view.activeStart,this.endWeek=t.view.activeEnd,this.loadCitas(this.bodyParams)}},this.route.params.subscribe(()=>{this.startWeek=this.calendar?.getApi()?.view.activeStart,this.endWeek=this.calendar?.getApi()?.view.activeEnd})}ngOnInit(){this.route.params.pipe(U(({terapist:e})=>this.personalId=e)).subscribe(e=>{this.loadCitas(this.bodyParams)}),this.route.data.subscribe(e=>{this.currentPersonal=e.personal,this.calendarOptions=k(x({},this.calendarOptions),{businessHours:this.currentPersonal?.horarios,slotDuration:this.currentPersonal?.terapia.duracion})})}handleClick(e){let t=this.modal.open(N,{size:"lg",centered:!0});t.componentInstance.personal=this.currentPersonal,t.componentInstance.onSaveComplete.subscribe(()=>{this.loadCitas(this.bodyParams)}),t.componentInstance.createForm.patchValue({fecha_inicio:e.startStr.substring(0,10),hora_inicio:e.startStr.substring(11,16),hora_fin:e.endStr.substring(11,16)})}handleEventClick(e){let t=e.event,a=this.modalService.open(Re,{centered:!0,size:"100",scrollable:!0,backdrop:"static"});window.document.body.classList.add("modal-open"),a.componentInstance.eventId=t.id,a.componentInstance.citaId=t.extendedProps.id_cita,a.componentInstance.eventUpdated.subscribe(()=>{this.loadCitas(this.bodyParams)})}loadCitas(e){if(this.currentPersonal)return this.citasEvent=this.citasService.getByPersonal(e).pipe(C(t=>t.data))}static{this.\u0275fac=function(t){return new(t||n)(T(se))}}static{this.\u0275cmp=E({type:n,selectors:[["app-especialista"]],viewQuery:function(t,a){if(t&1&&te(Ze,5),t&2){let l;ie(l=ae())&&(a.calendar=l.first)}},standalone:!0,features:[F],decls:17,vars:1,consts:[["calendar",""],["header-title",""],[1,"d-flex","align-items-center","text-white","fw-bold","my-1"],[1,"content","d-flex","flex-column","flex-column-fluid"],["id","kt_content_container",1,"container-xxl"],[1,"card"],[1,"card-header"],[1,"card-toolbar","d-flex","ms-auto","justify-content-end"],[1,"card-body",2,"border","none","box-shadow","0 4px 8px rgba(0, 0, 0, 0.1)","border-radius","0 0 15px 15px"],[1,"demo-app-main"],[3,"events","ngClass","options"]],template:function(t,a){t&1&&(r(0,"app-header"),X(1,1),r(2,"h1",2),c(3),o(),ee(),o(),r(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7),m(9,"app-dropdown"),o()(),r(10,"div",8)(11,"div",9),g(12,et,4,9)(13,tt,2,0),J(14,12,Ke,null,13),Y(0,-1),o()()()()(),m(16,"router-outlet")),t&2&&(s(3),S(" ",a.currentPersonal==null?null:a.currentPersonal.nombre," "))},dependencies:[ye,Be,We,w,de]})}}return n})();export{Kt as EspecialistaComponent};
