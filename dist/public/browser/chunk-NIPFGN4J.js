import{a as Ae,b as We,c as Be,d as Re,e as Ge,f as te}from"./chunk-B5356M2U.js";import{a as Ne}from"./chunk-S4MY4NYX.js";import{a as Ue,b as ze}from"./chunk-XIUWHSJZ.js";import{ib as je,jb as He,lb as Qe}from"./chunk-MAAP3SOV.js";import{a as Q}from"./chunk-X7PO4PNB.js";import{a as Oe}from"./chunk-EJWSEBOW.js";import{a as De}from"./chunk-WXQDA2BM.js";import{a as U}from"./chunk-PZER2UBN.js";import{a as Ie}from"./chunk-4JZDPN5V.js";import{a as Xe}from"./chunk-Q5L65FNE.js";import{a as we,e as Me,f as H}from"./chunk-C4F35XIX.js";import{a as Ve,b as Le}from"./chunk-XCZLRYQC.js";import"./chunk-GT4JH6HJ.js";import"./chunk-DUBUW4ZU.js";import{a as j,b as E}from"./chunk-FKRAWMO5.js";import{o as R,p as Ee,q as qe,v as Pe}from"./chunk-FWMYVGKL.js";import{a as G}from"./chunk-PQDQNIDX.js";import"./chunk-OIXA5WM3.js";import{D as be,E as f,F as ve,G as Ce,J as Se,K as ye,M as xe,P as Te,T as ke,V as B,X as Fe,d as N,e as he,f as fe,g as ge,i as O,k as A,v as W,x as _e}from"./chunk-MFZOMSUD.js";import{Ab as F,Ac as d,B as w,Ba as c,C as D,Cc as x,Fa as V,Fc as L,Hc as ee,I as C,Ic as ue,Lc as u,Mc as h,Ob as y,Pa as K,Qa as Y,Sb as ne,Vb as re,Wb as oe,Xb as m,Ya as Z,Z as ie,a as q,b as P,bc as le,bd as I,ca as M,da as ae,ec as r,f as Ze,fa as k,fc as a,gc as p,hc as se,ic as de,kc as X,oa as $,qc as g,rc as _,t as S,wc as ce,xc as me,yc as pe,zb as s}from"./chunk-JQJUQ5FW.js";var Je=Ze(Xe());var it=(l,i)=>({"btn-active-primary active":l,"cursor-not-allowed":i});function at(l,i){if(l&1){let e=X();r(0,"div",12)(1,"label",17),d(2,"Seleccionar Paquete"),a(),r(3,"ng-select",30),u(4,"async"),g("change",function(n){K(e);let o=_();return Y(o.changePaquete(n))}),a()()}if(l&2){let e=_();s(3),m("items",h(4,3,e.paquetesList))("loading",e.loadingPaquetes)("loadingText","Cargando...")}}function nt(l,i){if(l&1&&(r(0,"label",17),d(1),a(),p(2,"input",31)),l&2){let e=_();s(),x("N\xB0 de Sesiones (",e.maxSesiones,")"),s(),oe("max",e.maxSesiones)}}function rt(l,i){l&1&&(r(0,"label",32),d(1,"Hora de Fin"),a(),p(2,"input",33))}function ot(l,i){if(l&1){let e=X();r(0,"button",38),g("click",function(){let n=K(e).$implicit,o=_(2);return Y(o.toggleOption(n))}),d(1),a()}if(l&2){let e=i.$implicit,t=_(2);m("disableTooltip",t.isEnabledDay(e))("disabled",!t.isEnabledDay(e))("ngClass",ue(4,it,t.isOptionSelected(e),!t.isEnabledDay(e))),s(),x(" ",e.label," ")}}function lt(l,i){if(l&1&&(r(0,"div",11)(1,"div",34)(2,"label",35),d(3,"Dias Disponibles"),a(),r(4,"div",36),y(5,ot,2,7,"button",37),a()()()),l&2){let e=_();s(5),m("ngForOf",e.options)}}var b,z=(b=class{constructor(i){this.fb=i,this.modal=c(R),this.toast=c(we),this.sedesService=c(Ne),this.personalService=c(De),this.pacienteService=c(Ie),this.tipoCitaService=c(Ue),this.terapiaService=c(U),this.paquetesService=c(Oe),this.isLoading=c(G).isLoading,this.citaService=c(Q),this.eventSubmitted=new Z,this.eventDeleted=new Z,this.maxSesiones=0,this.es=Je.default.es,this.isRecurrente=!1,this.isCitaPaquete=!1,this.num_cambios=0,this.id_tipopaquete="",this.sedesList=new S,this.pacientesList=new S,this.personalList=[],this.tipoCitasList=new S,this.paquetesList=new S,this.loadingPacientes=!1,this.loadingSedes=!1,this.loadingPaquetes=!1,this.loadingTipoCitas=!1,this.timeOptions={enableTime:!0,noCalendar:!0,dateFormat:"H:i"},this.options=[{label:"L",value:1},{label:"M",value:2},{label:"MI",value:3},{label:"J",value:4},{label:"V",value:5},{label:"S",value:6}],this.isEnabledDay=e=>{let t=this.createForm.get("id_personal")?.value,n=this.createForm.get("hora_inicio")?.value,o=this.createForm.get("hora_fin")?.value;return this.personalList.some(J=>J.horarios?.some(T=>T.hora_inicio.substring(0,5)<=n&&T.hora_fin.substring(0,5)>=o&&T.dia_semana===e.value&&J.id_personal===t))},this.isOptionSelected=e=>{let t=this.createForm.get("fecha_inicio")?.value,n=new Date(t).getDay()+1,o=this.createForm.get("recurrencia");return o.value.includes(n)||o.push(this.fb.control(n)),e.value===n?!0:o.value.includes(e.value)&&this.isEnabledDay(e)},this.createForm=this.fb.group({id_sede:[null,f.required],id_paciente:[null,f.required],id_personal:[null,f.required],id_tipocita:[null,f.required],id_paquete:[null],fecha_inicio:[null,f.required],hora_inicio:[null,f.required],hora_fin:[null,f.required],descripcion:[null],paquete:[null],num_sesiones:[null],recurrencia:this.fb.array([])})}onChangeSede(i){this.createForm.get("id_personal")?.setValue(null)}onStartTimeChange(i){let[e,t]=i.dateString.split(":").map(Number),n=new Date;n.setHours(e,t+5),this.createForm.get("hora_fin").setValue(n.toTimeString().slice(0,5))}changePaquete(i){let e=this.createForm.get("id_paquete"),t=this.createForm.get("num_sesiones");this.maxSesiones=i?.cantidadsesiones,this.num_cambios=i?.num_cambios,e.value?(t.setValue(i.cantidadsesiones),t.setValidators(f.required)):t.setValue(null),t.updateValueAndValidity()}toggleOption(i){let e=this.createForm.get("fecha_inicio")?.value,t=this.createForm.get("recurrencia"),n=new Date(e).getDay()+1;i.value!==n&&(t.value.includes(i.value)?t.removeAt(t.value.indexOf(i.value)):t.push(this.fb.control(i.value)))}closeModal(){this.modal.dismissAll()}changeTipoCita(i){this.isRecurrente=i?.recurrente,this.isCitaPaquete=i?.nombre==="Paquete",this.id_tipopaquete=this.isCitaPaquete&&i?.id_tipocita;let e=this.createForm.get("id_paquete"),t=this.createForm.get("num_sesiones");this.isCitaPaquete?e?.setValidators(f.required):(e?.clearValidators(),e?.setValue(null),t?.setValue(null),t?.clearValidators()),e?.updateValueAndValidity(),t?.updateValueAndValidity()}ngOnInit(){this.loadSedes(),this.loadPacientes(),this.loadTipoCitas()}changePaciente(i){let e=this.createForm.get("id_paquete");e&&(e.setValue(null),e.clearValidators())}loadPaquetesPaciente(){this.createForm.valueChanges.pipe(M((i,e)=>i.id_paciente===e.id_paciente&&e.id_tipocita===this.id_tipopaquete)).subscribe(i=>{let{id_paciente:e}=i;e&&this.loadPaquetes(e)})}ngAfterViewInit(){this.loadPaquetesPaciente(),this.createForm.valueChanges.pipe(ae("id_sede")).subscribe(i=>{let{id_sede:e,fecha_inicio:t,hora_inicio:n,hora_fin:o,id_personal:J}=i,T=[e,t,n,o],Ke={id_sede:e,fecha_inicio:t,hora_inicio:n,hora_fin:o,id_terapia:this.terapia.id_terapia};T.every(Boolean)?this.citaService.getAvailablePersonal(Ke).pipe(ie(500)).subscribe(Ye=>{this.personalList=Ye.data}):(this.personalList=[],this.createForm.get("id_personal")?.setValue(null))})}loadSedes(){this.loadingSedes=!0,this.sedesList=this.sedesService.getAll().pipe(C(i=>i.data),k(()=>this.loadingSedes=!1),E(this))}loadTipoCitas(){this.loadingTipoCitas=!0,this.tipoCitasList=this.tipoCitaService.getAll().pipe(C(i=>i.data),k(()=>this.loadingTipoCitas=!1),E(this))}loadPaquetes(i){this.loadingPaquetes=!0;let e={id_paciente:i,id_terapia:this.terapia.id_terapia};this.paquetesList=this.paquetesService.getByPaciente(e).pipe(C(t=>t.data),k(()=>this.loadingPaquetes=!1),E(this))}loadPacientes(){this.loadingPacientes=!0,this.pacientesList=this.pacienteService.getAll().pipe(C(i=>i.data),k(()=>this.loadingPacientes=!1),E(this))}createCita(){this.createForm.valid&&this.citaService.createForTherapy(P(q({},this.createForm.value),{num_cambios:this.num_cambios||void 0,id_terapia:this.terapia.id_terapia})).subscribe({next:i=>{this.eventSubmitted.emit(),this.closeModal(),i.message.startsWith("Cita")||this.toast.info(i.message,"Cita Creada",{disableTimeOut:!0,closeButton:!0})},error:i=>{if(i.error.errors){let e=Object.values(i.error.errors).join(`
`);this.toast.error(e,"Error")}else this.toast.error("Ocurri\xF3 un error al crear la cita","Error")}})}},b.\u0275fac=function(e){return new(e||b)(F(B))},b.\u0275cmp=V({type:b,selectors:[["app-crear-modal"]],outputs:{eventSubmitted:"eventSubmitted",eventDeleted:"eventDeleted"},standalone:!0,features:[L],decls:61,vars:32,consts:[[1,"modal-header"],[1,"modal-title"],[1,"text-primary"],[1,"ki-duotone","ki-add-files","text-gray-900","fs-1",2,"vertical-align","text-top"],[1,"path1"],[1,"path2"],[1,"path3"],["type","button","aria-label","Close",1,"btn","btn-sm","btn-icon","btn-active-color-primary","btn-color-gray-800",3,"click"],[1,"ki-duotone","ki-cross-square","fs-1"],[1,"modal-body"],[1,"form","d-flex","flex-column","gap-4",3,"formGroup"],[1,"row"],[1,"form-group","col-6"],["for","kt_calendar_datepicker_date",1,"form-label"],["bindValue","id_paciente","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_paciente",3,"change","items","loading","loadingText"],[1,"form-label"],["bindValue","id_tipocita","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_tipocita",3,"change","items","loading","loadingText"],["for","",1,"form-label"],["bindValue","id_sede","placeholder","Seleccionar Sede","bindLabel","nombre","formControlName","id_sede",3,"change","items","loading","loadingText"],["class","form-group col-6",4,"ngIf"],[1,"form-group","col","mb-3"],["type","text","id","kt_calendar_datepicker_date","formControlName","fecha_inicio","mwlFlatpickr","","readonly","","placeholder","Seleccionar Fecha(s)",1,"form-control",3,"noCalendar","altInput","altFormat"],["for","kt_calendar_datepicker_start_time",1,"form-label"],["type","text","id","kt_calendar_datepicker_start_time","formControlName","hora_inicio","readonly","","placeholder","Seleccionar Hora de Inicio",1,"form-control"],["type","text","readonly","",1,"form-control",3,"value"],["bindValue","id_personal","placeholder","Seleccionar","bindLabel","nombre","formControlName","id_personal",3,"items","loading","loadingText"],["class","row",4,"ngIf"],[1,"modal-footer"],["type","button",1,"btn","btn-light",3,"click"],["type","button",1,"btn","btn-primary",3,"click","disabled"],["bindValue","id_paquetes","placeholder","Seleccionar Paquete","bindLabel","nombre","formControlName","id_paquete",3,"change","items","loading","loadingText"],["type","number","min","1","step","1","formControlName","num_sesiones",1,"form-control"],["for","kt_calendar_datepicker_end_time",1,"form-label"],["type","text","id","kt_calendar_datepicker_end_time","formControlName","hora_fin","readonly","","placeholder","Seleccionar Hora de Fin",1,"form-control"],[1,"form-group","d-flex","flex-column","col","mb-3"],["for","kt_calendar_datepicker_end_date",1,"form-label"],[1,"btn-group"],["ngbTooltip","No Disponible","placement","bottom","class","btn btn-outline",3,"disableTooltip","disabled","ngClass","click",4,"ngFor","ngForOf"],["ngbTooltip","No Disponible","placement","bottom",1,"btn","btn-outline",3,"click","disableTooltip","disabled","ngClass"]],template:function(e,t){if(e&1&&(r(0,"div",0)(1,"h4",1)(2,"span",2)(3,"i",3),p(4,"span",4)(5,"span",5)(6,"span",6),a()(),d(7),a(),r(8,"button",7),g("click",function(){return t.closeModal()}),r(9,"i",8),p(10,"span",4)(11,"span",5),a()()(),r(12,"div",9)(13,"form",10)(14,"section",11)(15,"div",12)(16,"label",13),d(17,"Seleccionar Paciente"),a(),r(18,"ng-select",14),u(19,"async"),g("change",function(o){return t.changePaciente(o)}),a()(),r(20,"div",12)(21,"label",15),d(22,"Seleccionar Tipo de Cita"),a(),r(23,"ng-select",16),u(24,"async"),g("change",function(o){return t.changeTipoCita(o)}),a()()(),r(25,"section",11)(26,"div",12)(27,"label",17),d(28,"Seleccionar Sede"),a(),r(29,"ng-select",18),u(30,"async"),g("change",function(o){return t.onChangeSede(o)}),a()(),y(31,at,5,5,"div",19),a(),r(32,"div",11)(33,"div",20)(34,"label",13),d(35,"Fecha"),a(),p(36,"input",21),a(),r(37,"div",20)(38,"label",22),d(39,"Hora de Inicio"),a(),p(40,"input",23),a(),r(41,"div",20),y(42,nt,3,2)(43,rt,3,0),a()(),r(44,"div",11)(45,"div",12)(46,"label",17),d(47,"Terapia Asignada"),a(),p(48,"input",24),a(),r(49,"div",12)(50,"label",17),d(51,"Seleccionar Terapista Disponible"),a(),p(52,"ng-select",25),u(53,"async"),a()(),y(54,lt,6,1,"div",26),a()(),r(55,"div",27)(56,"button",28),g("click",function(){return t.closeModal()}),d(57,"Cancelar"),a(),r(58,"button",29),u(59,"async"),g("click",function(){return t.createCita()}),d(60,"Registrar"),a()()),e&2){let n,o;s(7),x(" Registrar Cita de ",t.terapia==null?null:t.terapia.nombre," "),s(6),m("formGroup",t.createForm),s(5),m("items",h(19,22,t.pacientesList))("loading",t.loadingPacientes)("loadingText","Cargando..."),s(5),m("items",h(24,24,t.tipoCitasList))("loading",t.loadingTipoCitas)("loadingText","Cargando..."),s(6),m("items",h(30,26,t.sedesList))("loading",t.loadingSedes)("loadingText","Cargando..."),s(2),m("ngIf",t.isCitaPaquete),s(5),m("noCalendar",!0)("altInput",!0)("altFormat","d/m/Y"),s(6),le((n=t.createForm.get("id_paquete"))!=null&&n.value?42:43),s(6),m("value",t.terapia==null?null:t.terapia.nombre),s(4),m("items",t.personalList)("loading",h(53,28,t.isLoading))("loadingText","Cargando..."),s(2),m("ngIf",((o=t.createForm.get("id_personal"))==null?null:o.value)&&t.isRecurrente),s(4),m("disabled",t.createForm.invalid||h(59,30,t.isLoading))}},dependencies:[H,Me,qe,Ee,A,N,he,fe,O,Fe,Se,be,ye,ve,Ce,ke,xe,Te,Le,Ve]}),b);z=w([j({checkProperties:!0}),D("design:paramtypes",[B])],z);var st=["calendar"],dt=()=>[je,N,O],ct=l=>({"background-color":l}),mt=l=>({"opacity-50":l});function pt(l,i){if(l&1&&(p(0,"full-calendar",11,0),u(2,"async"),u(3,"async")),l&2){let e=_();m("ngClass",ee(7,mt,h(2,3,e.isLoading)))("events",h(3,5,e.citasEvent))("options",e.calendarOptions)}}function ut(l,i){l&1&&(r(0,"h1"),d(1,"Loading..."),a())}var v,$e=(v=class{get bodyParams(){return{id_terapia:this.terapiaId,startWeek:this.startWeek,endWeek:this.endWeek}}constructor(i,e){this.route=i,this.changeDetector=e,this.citasService=c(Q),this.modalService=c(R),this.isLoading=c(G).isLoading,this.terapiasService=c(U),this.router=c(_e),this.terapiaId=this.route.snapshot.params.tag,this.loading=!0,this.startWeek=te().startOfWeek,this.endWeek=te().endOfWeek,this.citasEvent=new S,this.calendarOptions={plugins:[Ae,We,Be,Re],headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},initialView:"timeGridWeek",allDaySlot:!1,expandRows:!0,slotLabelInterval:"00:05:00",slotMinTime:"08:00",slotMaxTime:"20:00:00",slotLabelFormat:{hour:"numeric",minute:"2-digit",omitZeroMinute:!1,meridiem:"narrow"},selectAllow:t=>{let n=this.calendar?.getApi()?.view.type=="timeGridWeek",o=new Date;return o.setHours(0,0,0,0),t.start>=o&&n},selectable:!0,selectLongPressDelay:10,weekends:!0,editable:!0,selectMirror:!0,dayMaxEvents:!0,eventTimeFormat:{hour:"numeric",minute:"2-digit",meridiem:"short"},eventClick:this.handleEventClick.bind(this),loading:t=>{this.loading=t},locale:Ge,select:this.handleDateSelect.bind(this),datesSet:t=>{this.startWeek=t.view.activeStart,this.endWeek=t.view.activeEnd,this.loadCitas(this.bodyParams)}},this.route.params.subscribe(()=>{this.startWeek=this.calendar?.getApi()?.view.activeStart,this.endWeek=this.calendar?.getApi()?.view.activeEnd})}ngOnInit(){this.route.params.pipe($(({tag:i})=>this.terapiaId=i)).subscribe(i=>{this.loadCurrentTerapia(),this.loadCitas(this.bodyParams)})}handleDateSelect(i){let e=this.modalService.open(z,{size:"lg",centered:!0});e.componentInstance.terapia=this.currentTerapia,e.componentInstance.createForm.patchValue({fecha_inicio:i.startStr.substring(0,10),hora_inicio:i.startStr.substring(11,16),hora_fin:i.endStr.substring(11,16)}),e.componentInstance.eventSubmitted.subscribe(()=>{this.loadCitas(this.bodyParams)})}handleEventClick(i){let e=i.event,t=this.modalService.open(Qe,{centered:!0,size:"100",scrollable:!0,backdrop:"static"});window.document.body.classList.add("modal-open"),t.componentInstance.eventId=e.id,t.componentInstance.citaId=e.extendedProps.id_cita,t.componentInstance.eventUpdated.subscribe(()=>{this.loadCitas(this.bodyParams)})}loadCitas(i){if(this.terapiaId)return this.citasEvent=this.citasService.getByTerapia(i).pipe(M((e,t)=>JSON.stringify(e)===JSON.stringify(t)),C(e=>e.data))}loadCurrentTerapia(){return this.terapiasService.getById(this.terapiaId).pipe(C(i=>this.currentTerapia=i.data),$(()=>this.calendarOptions=P(q({},this.calendarOptions),{slotDuration:this.currentTerapia?.duracion}))).subscribe()}},v.\u0275fac=function(e){return new(e||v)(F(W),F(I))},v.\u0275cmp=V({type:v,selectors:[["app-cronograma"]],viewQuery:function(e,t){if(e&1&&ce(st,5),e&2){let n;me(n=pe())&&(t.calendar=n.first)}},standalone:!0,features:[L],decls:17,vars:4,consts:[["calendar",""],["header-title",""],[1,"d-flex","align-items-center","text-white","fw-bold","my-1"],[1,"h-15px","w-15px","me-3","rounded-circle","d-inline-block",3,"ngStyle"],[1,"content","d-flex","flex-column","flex-column-fluid"],["id","kt_content_container",1,"container-xxl"],[1,"card"],[1,"card-header"],[1,"card-toolbar","d-flex","ms-auto","justify-content-end"],[1,"card-body",2,"border","none","box-shadow","0 4px 8px rgba(0, 0, 0, 0.1)","border-radius","0 0 15px 15px"],[1,"demo-app-main"],[3,"ngClass","events","options"]],template:function(e,t){e&1&&(r(0,"app-header"),se(1,1),r(2,"h1",2),p(3,"span",3),d(4),a(),de(),a(),r(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7)(9,"div",8),p(10,"app-dropdown"),a()(),r(11,"div",9)(12,"div",10),y(13,pt,4,9)(14,ut,2,0),ne(15,13,dt,null,14),re(0,-1),a()()()()()),e&2&&(s(3),m("ngStyle",ee(2,ct,t.currentTerapia==null?null:t.currentTerapia.color)),s(),x(" ",t.currentTerapia==null?null:t.currentTerapia.nombre," "))},dependencies:[He,A,ge,Pe,H,ze]}),v);$e=w([j({checkProperties:!0}),D("design:paramtypes",[W,I])],$e);export{$e as CronogramaComponent};
