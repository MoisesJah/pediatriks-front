import{a as R,b as V,c as H,d as N,e as U,f}from"./chunk-B5356M2U.js";import{ib as j,jb as q,lb as Z}from"./chunk-MAAP3SOV.js";import{a as z}from"./chunk-X7PO4PNB.js";import{a as Q}from"./chunk-WXQDA2BM.js";import"./chunk-Q5L65FNE.js";import"./chunk-C4F35XIX.js";import"./chunk-XCZLRYQC.js";import"./chunk-GT4JH6HJ.js";import"./chunk-DUBUW4ZU.js";import"./chunk-FKRAWMO5.js";import{o as O,v as B}from"./chunk-FWMYVGKL.js";import{a as A}from"./chunk-PQDQNIDX.js";import{b as T}from"./chunk-OIXA5WM3.js";import{d as D,i as F,k as L,x as G}from"./chunk-MFZOMSUD.js";import{Ac as c,Ba as o,Fa as C,Fc as I,Hc as M,I as l,Lc as p,Mc as u,Ob as g,Sb as y,Vb as b,Xb as x,ec as a,fc as s,gc as S,hc as k,ic as w,oa as m,rc as _,t as v,wc as P,xc as W,yc as E}from"./chunk-JQJUQ5FW.js";var J=["calendar"],K=()=>[j,D,F],X=i=>({"opacity-50":i});function Y(i,r){if(i&1&&(S(0,"full-calendar",8,0),p(2,"async"),p(3,"async")),i&2){let d=_();x("events",u(2,3,d.citasEvent))("ngClass",M(7,X,u(3,5,d.isLoading)))("options",d.calendarOptions)}}function $(i,r){i&1&&(a(0,"h1"),c(1,"Loading..."),s())}var we=(()=>{let r=class r{constructor(){this.isLoading=o(A).isLoading,this.modalService=o(O),this.loadingCalendar=!1,this.citasService=o(z),this.userService=o(T),this.personalService=o(Q),this.router=o(G),this.citasEvent=new v,this.personalId="",this.startWeek=f().startOfWeek,this.endWeek=f().endOfWeek,this.calendarOptions={plugins:[R,V,H,N],headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},eventMaxStack:1,allDaySlot:!1,expandRows:!0,slotLabelInterval:"00:05:00",slotMinTime:"08:00",slotMaxTime:"20:00:00",slotLabelFormat:{hour:"numeric",minute:"2-digit",omitZeroMinute:!1,meridiem:"narrow"},eventTimeFormat:{hour:"numeric",minute:"2-digit",meridiem:"short"},selectConstraint:"businessHours",initialView:"timeGridWeek",weekends:!0,editable:!0,loading:e=>{this.loadingCalendar=e},eventClick:this.handleEventClick.bind(this),selectAllow:e=>{let t=this.calendar?.getApi()?.view.type=="timeGridWeek",n=new Date;return n.setHours(0,0,0,0),e.start>=n&&t},selectable:!1,selectMirror:!0,dayMaxEvents:!0,locale:U,datesSet:e=>{this.startWeek=e.view.activeStart,this.endWeek=e.view.activeEnd,this.loadCitas(this.bodyParams)}}}ngOnInit(){this.getPersonalId()}get bodyParams(){return{id_personal:this.personalId,startWeek:this.startWeek,endWeek:this.endWeek}}getPersonalId(){this.personalService.getPersonalByUser(this.userService.user()?.id).pipe(l(e=>e.data.id_personal),m(e=>this.personalId=e),m(()=>this.loadCitas(this.bodyParams))).subscribe()}loadCitas(e){if(this.personalId)return this.citasEvent=this.citasService.getByPersonal(e).pipe(l(t=>t.data))}handleEventClick(e){let t=e.event,n=this.modalService.open(Z,{centered:!0,size:"100",scrollable:!0,backdrop:"static"});window.document.body.classList.add("modal-open"),n.componentInstance.eventId=t.id,n.componentInstance.citaId=t.extendedProps.id_cita,n.componentInstance.eventUpdated.subscribe(()=>{this.loadCitas(this.bodyParams)})}};r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=C({type:r,selectors:[["app-citas"]],viewQuery:function(t,n){if(t&1&&P(J,5),t&2){let h;W(h=E())&&(n.calendar=h.first)}},standalone:!0,features:[I],decls:13,vars:0,consts:[["calendar",""],["header-title",""],[1,"d-flex","align-items-center","text-white","fw-bold","my-1"],[1,"content","d-flex","flex-column","flex-column-fluid"],["id","kt_content_container",1,"container-xxl"],[1,"card"],[1,"card-body",2,"border","none","box-shadow","0 4px 8px rgba(0, 0, 0, 0.1)","border-radius","0 0 15px 15px"],[1,"demo-app-main"],[3,"events","ngClass","options"]],template:function(t,n){t&1&&(a(0,"app-header"),k(1,1),a(2,"h1",2),c(3," Calendario de Citas "),s(),w(),s(),a(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7),g(9,Y,4,9)(10,$,2,0),y(11,9,K,null,10),b(0,-1),s()()()()())},dependencies:[B,q,L]});let i=r;return i})();export{we as CitasComponent};
