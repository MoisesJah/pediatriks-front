import{a as N,b as $,c as j,d as q,e as z}from"./chunk-4RXH7IMB.js";import{a as u}from"./chunk-7YUY65AQ.js";import{ib as Z,jb as J,lb as X}from"./chunk-NJLWBR7Y.js";import{a as K}from"./chunk-4KPHLGNN.js";import"./chunk-2HYK5OSW.js";import"./chunk-T5EURV5D.js";import{a as U}from"./chunk-7N33FE2K.js";import"./chunk-4OEN7RKR.js";import"./chunk-UADOA573.js";import"./chunk-A2PIED2A.js";import"./chunk-7APDJY62.js";import"./chunk-GT4JH6HJ.js";import"./chunk-EBZKSOFQ.js";import{b as H}from"./chunk-JBNC72Z7.js";import{a as B}from"./chunk-QA4O23TC.js";import{o as Q}from"./chunk-CUMGWIKM.js";import"./chunk-OSUEIBEK.js";import{a as R}from"./chunk-4TSZW343.js";import{a as V,b as p}from"./chunk-OO4BC6LN.js";import"./chunk-67M5LFVM.js";import"./chunk-GKZUPR7X.js";import{l as A}from"./chunk-QUGPZPJP.js";import{m as T,t as G,v as O}from"./chunk-O2FCGDZ2.js";import{Ba as b,Bc as d,C as s,Jc as F,Lc as L,Mb as x,Qb as S,Qc as m,Rc as c,Tb as k,Vb as w,a as v,b as C,ec as r,fc as a,gc as _,hc as P,ic as W,ka as l,n as g,rc as E,v as y,xa as n,xc as M,yc as D,zc as I}from"./chunk-H565K2KG.js";var ee=["calendar"],te=()=>[Z,T,G],ie=o=>({"opacity-50":o});function ne(o,e){if(o&1&&(_(0,"full-calendar",8,0),m(2,"async"),m(3,"async")),o&2){let t=E();w("events",c(2,3,t.citasEvent))("ngClass",L(7,ie,c(3,5,t.isLoading)))("options",t.calendarOptions)}}function oe(o,e){o&1&&(r(0,"h1"),d(1,"Loading..."),a())}var Y=class f{constructor(){this.isLoading=n(R).isLoading,this.modalService=n(Q),this.loadingCalendar=!1,this.citasService=n(K),this.userService=n(B),this.personalService=n(U),this.router=n(A),this.citasEvent=new g,this.personalId="",this.startWeek=u().startOfWeek,this.endWeek=u().endOfWeek,this.calendarOptions={plugins:[N,$,j,q],headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},eventMaxStack:1,allDaySlot:!1,expandRows:!0,slotLabelInterval:"00:05:00",slotMinTime:"08:00",slotMaxTime:"20:00:00",slotLabelFormat:{hour:"numeric",minute:"2-digit",omitZeroMinute:!1,meridiem:"narrow"},eventTimeFormat:{hour:"numeric",minute:"2-digit",meridiem:"short"},selectConstraint:"businessHours",initialView:"timeGridWeek",weekends:!0,editable:!0,loading:e=>{this.loadingCalendar=e},eventClick:this.handleEventClick.bind(this),selectAllow:e=>{let t=this.calendar?.getApi()?.view.type=="timeGridWeek",i=new Date;return i.setHours(0,0,0,0),e.start>=i&&t},selectable:!1,selectMirror:!0,dayMaxEvents:!0,locale:z,displayEventTime:!1,eventDidMount:e=>{console.log(e.event.title)},datesSet:e=>{this.startWeek=e.view.activeStart,this.endWeek=e.view.activeEnd,this.loadCitas(this.bodyParams)}}}ngOnInit(){this.getPersonalId()}get bodyParams(){return{id_personal:this.personalId,startWeek:this.startWeek,endWeek:this.endWeek}}getPersonalId(){this.personalService.getPersonalByUser(this.userService.user()?.id).pipe(s(e=>e.data.id_personal),l(e=>this.personalId=e),l(()=>this.loadCitas(this.bodyParams)),p(this)).subscribe()}loadCitas(e){if(this.personalId)return this.citasEvent=this.citasService.getByPersonal(e).pipe(s(t=>t.data.map(i=>C(v({},i),{title:`${i.tipocita} - ${i.title}`}))),p(this))}handleEventClick(e){let t=e.event,i=this.modalService.open(X,{centered:!0,size:"100",scrollable:!0,backdrop:"static"});window.document.body.classList.add("modal-open"),i.componentInstance.eventId=t.id,i.componentInstance.citaId=t.extendedProps.id_cita,i.componentInstance.eventUpdated.subscribe(()=>{this.loadCitas(this.bodyParams)})}static{this.\u0275fac=function(t){return new(t||f)}}static{this.\u0275cmp=b({type:f,selectors:[["app-citas"]],viewQuery:function(t,i){if(t&1&&M(ee,5),t&2){let h;D(h=I())&&(i.calendar=h.first)}},standalone:!0,features:[F],decls:13,vars:0,consts:[["calendar",""],["header-title",""],[1,"d-flex","align-items-center","text-white","fw-bold","my-1"],[1,"content","d-flex","flex-column","flex-column-fluid"],["id","kt_content_container",1,"container-xxl"],[1,"card"],[1,"card-body",2,"border","none","box-shadow","0 4px 8px rgba(0, 0, 0, 0.1)","border-radius","0 0 15px 15px"],[1,"demo-app-main"],[3,"events","ngClass","options"]],template:function(t,i){t&1&&(r(0,"app-header"),P(1,1),r(2,"h1",2),d(3," Calendario de Citas "),a(),W(),a(),r(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7),x(9,ne,4,9)(10,oe,2,0),S(11,9,te,null,10),k(0,-1),a()()()()())},dependencies:[H,J,O]})}};Y=y([V()],Y);export{Y as CitasComponent};
