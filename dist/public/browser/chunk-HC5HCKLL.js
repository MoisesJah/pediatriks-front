import{a as J}from"./chunk-4JVWF6E6.js";import{x as K,y as Q}from"./chunk-47BWZHPK.js";import{a as X}from"./chunk-MKNMNAUM.js";import{a as Y,b as I}from"./chunk-TA6YOJTR.js";import{a as W}from"./chunk-T5KXAZJZ.js";import{a as G}from"./chunk-GKZUPR7X.js";import{b as z,l as B}from"./chunk-P5QLGDHL.js";import{m as L,n as A,o as R,w as q}from"./chunk-CWIGPBJP.js";import{$c as N,Ba as y,Ec as O,Fc as l,Gc as U,Hc as u,La as S,Ma as b,Mb as v,Qc as E,Sc as w,Vb as d,ac as V,fc as i,gc as n,hc as c,ic as f,jc as g,lc as T,q as F,qa as k,uc as p,v as M,vc as _,w as $,wa as D,wb as s,wc as C,xa as h,xc as x}from"./chunk-JCDSCFF6.js";var Z=(()=>{class o{constructor(e){this.http=e,this.apiUrl=`${G.apiUrl}/solicitudes`}aceptarSolicitud(e,t){let r={id_solicitud:e,id_admin:t};return this.http.post(`${this.apiUrl}/aceptar`,r)}enviarSolicitud(e,t,r,m,ne){let oe={id_personal_solicita:e,id_item:t,cantidad:r,id_terapia:m,stock_terapista:ne};return this.http.post(`${this.apiUrl}/enviar`,oe)}negarSolicitud(e,t){let r={id_solicitud:e,id_admin:t};return this.http.post(`${this.apiUrl}/negar`,r)}cargarSolicitudesPendientes(){return this.http.get(`${this.apiUrl}/pendientes`)}cargarTodasLasSolicitudes(){return this.http.get(`${this.apiUrl}/todas`)}stockTerapista(e){return this.http.post(`${this.apiUrl}/stock`,e)}static{this.\u0275fac=function(t){return new(t||o)(D(z))}}static{this.\u0275prov=k({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var ee=(()=>{class o{constructor(){this.solicitudProcesadaSubject=new F,this.solicitudProcesada$=this.solicitudProcesadaSubject.asObservable()}notifySolicitudProcesada(e){this.solicitudProcesadaSubject.next(e)}static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275prov=k({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var ae=[[["","popover-toggle",""]],[["","popover-body",""]]],re=["[popover-toggle]","[popover-body]"];function se(o,a){o&1&&x(0,1)}var te=(()=>{class o{constructor(){this.popperOptions=e=>(e.onFirstUpdate=t=>{t.elements?.arrow&&(t.elements.arrow.style.display="none")},e)}static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275cmp=y({type:o,selectors:[["app-popover"]],standalone:!0,features:[E],ngContentSelectors:re,decls:4,vars:4,consts:[["popover",""],[2,"display","inline-block","height","fit-content",3,"ngbPopover","placement","autoClose","popperOptions"]],template:function(t,r){if(t&1&&(C(ae),i(0,"a",1),x(1),n(),v(2,se,1,0,"ng-template",null,0,N)),t&2){let m=O(3);d("ngbPopover",m)("placement","bottom-end")("autoClose","outside")("popperOptions",r.popperOptions)}},dependencies:[Q,K]})}}return o})();var le=[[["","header-title",""]]],ce=["[header-title]"],H=o=>({active:o});function de(o,a){o&1&&(i(0,"div",65)(1,"span",66),l(2,"No tienes ninguna notificaci\xF3n pendiente"),n()())}function me(o,a){o&1&&(i(0,"div",67),c(1,"span",68)(2,"span",68)(3,"span",68),n())}function pe(o,a){if(o&1){let e=T();i(0,"div",70)(1,"div",71)(2,"div",33)(3,"div",23)(4,"span",72),l(5),n(),i(6,"span",73),l(7),n(),i(8,"span",73),l(9),n(),i(10,"span",73),l(11),n(),i(12,"span",73),l(13),n()()()(),i(14,"div",74)(15,"button",75),p("click",function(){let r=S(e).$implicit,m=_(3);return b(m.aceptarSolicitud(r.id_solicitud,m.user.id))}),l(16,"Aceptar"),n(),i(17,"button",76),p("click",function(){let r=S(e).$implicit,m=_(3);return b(m.negarSolicitud(r.id_solicitud,m.user.id))}),l(18,"Negar"),n()(),c(19,"div",26),n()}if(o&2){let e=a.$implicit;s(5),u("Solicitud de ",e.personal_solicita.nombre,""),s(2),u("\xCDtem: ",e.item.nombre,""),s(2),u("Cantidad solicitada: ",e.cantidad,""),s(2),u("Estado: ",e.estado.nombre,""),s(2),u("Stock del Terapista: ",e.stock_terapista,"")}}function ue(o,a){if(o&1&&(f(0),v(1,pe,20,5,"div",69),g()),o&2){let e=_(2);s(),d("ngForOf",e.solicitudesPendientes)}}function fe(o,a){if(o&1){let e=T();f(0,16),i(1,"div",52)(2,"div",53)(3,"h3",54),l(4,"Notificaciones"),n(),i(5,"button",55),p("click",function(){S(e);let r=_();return b(r.cargarSolicitudes())}),i(6,"i",56),c(7,"span",9)(8,"span",10),n()()(),i(9,"span",57),l(10),n()(),i(11,"div",58),v(12,de,3,0,"div",59)(13,me,4,0,"div",60)(14,ue,2,1,"ng-container",61),n(),i(15,"div",62)(16,"a",63),p("click",function(){S(e);let r=_();return b(r.navegarATablaSolicitudes())}),l(17),i(18,"i",64),c(19,"span",9)(20,"span",10),n()()(),g()}if(o&2){let e=_();s(10),u(" Tienes ",e.totalsolicitudes," solicitudes pendientes "),s(2),d("ngIf",!e.loading&&e.solicitudesPendientes.length===0),s(),d("ngIf",e.loading),s(),d("ngIf",!e.loading&&e.solicitudesPendientes.length>0),s(3),u("Ver todas las solicitudes (",e.totalsolicitudes-e.solicitudesPendientes.length,") ")}}function ge(o,a){o&1&&(i(0,"i",31),c(1,"span",9)(2,"span",10)(3,"span",11)(4,"span",39)(5,"span",40)(6,"span",41)(7,"span",42)(8,"span",43)(9,"span",44)(10,"span",45),n())}function he(o,a){o&1&&(i(0,"i",32),c(1,"span",9)(2,"span",10),n())}var ie=class j{constructor(){this.authService=h(J),this.router=h(B),this.theme=h(W),this.solicitudInventarioService=h(Z),this.solicituEvent=h(ee),this.isLoadingService=h(X),this.loading=!1,this.user=this.authService.user(),this.solicitudesPendientes=[],this.totalsolicitudes=0,this.cargarSolicitudes()}ngOnInit(){this.solicituEvent.solicitudProcesada$.pipe(I(this)).subscribe(()=>{this.cargarSolicitudes()})}cargarSolicitudes(){this.loading=!0,this.solicitudInventarioService.cargarSolicitudesPendientes().pipe(I(this)).subscribe({next:({data:a,total:e})=>{this.solicitudesPendientes=a,this.totalsolicitudes=e},error:a=>console.error("Error al obtener las solicitudes pendientes:",a),complete:()=>this.loading=!1})}aceptarSolicitud(a,e){this.solicitudInventarioService.aceptarSolicitud(a,e).subscribe({next:()=>{this.solicitudesPendientes=this.solicitudesPendientes.filter(t=>t.id_solicitud!==a)},error:t=>{console.error("Error al aceptar solicitud:",t)}})}negarSolicitud(a,e){this.solicitudInventarioService.negarSolicitud(a,e).subscribe({next:()=>{this.solicitudesPendientes=this.solicitudesPendientes.filter(t=>t.id_solicitud!==a)},error:t=>{console.error("Error al negar solicitud:",t)}})}navegarATablaSolicitudes(){this.router.navigate(["/admin/tabla-solicitudes"])}removeCredentials(){localStorage.removeItem("token"),localStorage.removeItem("user")}setDarkTheme(){this.theme.setThemeMode("dark")}setLightTheme(){this.theme.setThemeMode("light")}setSystemTheme(){this.theme.setThemeMode("system")}logout(){this.authService.logout(),this.removeCredentials(),this.router.navigate(["/login"])}static{this.\u0275fac=function(e){return new(e||j)}}static{this.\u0275cmp=y({type:j,selectors:[["app-header"]],standalone:!0,features:[E],ngContentSelectors:ce,decls:84,vars:13,consts:[["id","kt_header","data-kt-sticky","true","data-kt-sticky-name","header","data-kt-sticky-offset","{lg: '300px'}",1,"header","py-6","py-lg-0"],[1,"header-container","container-xxl"],[1,"page-title","d-flex","flex-column","align-items-start","justify-content-center","flex-wrap","me-lg-20","py-3","py-lg-0","me-3"],[1,"d-flex","align-items-center","flex-wrap"],[1,"d-flex","align-items-center","gap-3","py-3","py-lg-0"],["popover-toggle",""],["id","notifications"],["data-kt-menu-trigger","click","data-kt-menu-attach","parent","data-kt-menu-placement","bottom-end",1,"btn","btn-icon","btn-custom","btn-active-color-primary","position-relative"],[1,"ki-duotone","ki-notification-bing","fs-1",2,"color","#ffffff"],[1,"path1"],[1,"path2"],[1,"path3"],[1,"bullet","bullet-dot","bg-success","h-6px","w-6px","position-absolute","translate-middle","top-0","start-50","animation-blink"],["popover-body","",4,"ngIf"],["data-kt-menu-trigger","click","data-kt-menu-attach","parent","data-kt-menu-placement","bottom-end",1,"btn","btn-icon","btn-custom","btn-active-color-primary"],[1,"ki-duotone","ki-user","fs-1",2,"color","#ffffff"],["popover-body",""],[1,"me-3"],["data-kt-menu","true",1,"menu","menu-column","menu-rounded","menu-gray-800","menu-state-bg","menu-state-color","fw-semibold","fs-6",2,"width","250px"],[1,"menu-item","px-3"],[1,"menu-content","d-flex","align-items-center","px-3"],[1,"symbol","symbol-50px","me-5"],["alt","Logo","src","assets/media/avatars/300-1.jpg"],[1,"d-flex","flex-column"],[1,"fw-bold","d-flex","align-items-center","fs-5"],[1,"text-muted","texxt-truncate","fw-semibold","fs-7"],[1,"separator","my-2"],[1,"menu-item","pb-2","px-5"],[1,"menu-link","w-100",3,"click"],[1,"ki-duotone","ki-exit-right","fs-2x"],["type","button","data-kt-menu-trigger","{default:'click', lg: 'hover'}","data-kt-menu-attach","parent","data-kt-menu-placement","bottom-end",1,"btn","btn-icon","btn-custom","btn-active-color-primary"],[1,"ki-duotone","ki-night-day","theme-light-show","fs-1",2,"color","#ffffff"],[1,"ki-duotone","ki-moon","theme-dark-show","fs-1"],[1,"d-flex","align-items-center"],["data-kt-menu","true","data-kt-element","theme-mode-menu",1,"menu","menu-column","menu-rounded","menu-title-gray-700","menu-icon-gray-500","menu-active-bg","menu-state-color","fw-semibold","py-4","fs-base","w-150px"],[1,"menu-item","px-3","my-0"],["data-kt-element","mode","data-kt-value","light",1,"menu-link","px-3","py-2",3,"click","ngClass"],["data-kt-element","icon",1,"menu-icon"],[1,"ki-duotone","ki-night-day","fs-2"],[1,"path4"],[1,"path5"],[1,"path6"],[1,"path7"],[1,"path8"],[1,"path9"],[1,"path10"],[1,"menu-title"],["data-kt-element","mode","data-kt-value","dark",1,"menu-link","px-3","py-2",3,"click","ngClass"],[1,"ki-duotone","ki-moon","fs-2"],["data-kt-element","mode","data-kt-value","system",1,"menu-link","px-3","py-2",3,"click","ngClass"],[1,"ki-duotone","ki-screen","fs-2"],[1,"header-offset"],[1,"d-flex","flex-column","px-6","py-4"],[1,"d-flex","justify-content-between","align-items-center"],[1,"fw-semibold"],[1,"btn","btn-icon","btn-sm","btn-secondary",3,"click"],[1,"ki-duotone","ki-arrows-circle"],[1,"fs-8","opacity-75"],[1,"notification-list","scroll-y","mh-325px","my-5"],["class","container text-center",4,"ngIf"],["class","row w-100 container gap-2",4,"ngIf"],[4,"ngIf"],[1,"py-3","text-center","border-top"],[1,"btn","btn-color-gray-600","btn-active-color-primary",3,"click"],[1,"ki-duotone","ki-arrow-right","fs-5"],[1,"container","text-center"],[1,"text-muted"],[1,"row","w-100","container","gap-2"],[1,"placeholder","col-12","rounded-1","h-5px"],["class","menu menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold fs-6","style","width: 250px",4,"ngFor","ngForOf"],[1,"menu","menu-column","menu-rounded","menu-gray-800","menu-state-bg","menu-state-color","fw-semibold","fs-6",2,"width","250px"],[1,"menu-item","px-3","py-2"],[1,"fw-bold","fs-5"],[1,"text-muted","fs-7"],[1,"menu-item","px-3","d-flex","justify-content-between"],[1,"btn","btn-sm","btn-success","me-2",3,"click"],[1,"btn","btn-sm","btn-danger","me-2",3,"click"]],template:function(e,t){e&1&&(C(le),i(0,"div",0)(1,"div",1)(2,"div",2),x(3),n(),i(4,"div",3)(5,"div",4)(6,"app-popover"),f(7,5),i(8,"div",6)(9,"a",7)(10,"i",8),c(11,"span",9)(12,"span",10)(13,"span",11),n(),c(14,"span",12),n()(),g(),v(15,fe,21,5,"ng-container",13),n(),i(16,"app-popover"),f(17,5),i(18,"a",14)(19,"i",15),c(20,"span",9)(21,"span",10),n()(),g(),f(22,16),i(23,"div",17)(24,"div",18)(25,"div",19)(26,"div",20)(27,"div",21),c(28,"img",22),n(),i(29,"div",23)(30,"div",24),l(31),n(),i(32,"span",25),l(33),n()()()(),c(34,"div",26),i(35,"div",27)(36,"div",28),p("click",function(){return t.logout()}),i(37,"i",29),c(38,"span",9)(39,"span",10),n(),l(40," Cerrar sesi\xF3n "),n()()()(),g(),n(),i(41,"app-popover"),f(42,5),i(43,"button",30),v(44,ge,11,0,"i",31)(45,he,3,0,"i",32),n(),g(),f(46,16),i(47,"div",33)(48,"div",34)(49,"div",35)(50,"a",36),p("click",function(){return t.setLightTheme()}),i(51,"span",37)(52,"i",38),c(53,"span",9)(54,"span",10)(55,"span",11)(56,"span",39)(57,"span",40)(58,"span",41)(59,"span",42)(60,"span",43)(61,"span",44)(62,"span",45),n()(),i(63,"span",46),l(64,"Claro"),n()()(),i(65,"div",35)(66,"a",47),p("click",function(){return t.setDarkTheme()}),i(67,"span",37)(68,"i",48),c(69,"span",9)(70,"span",10),n()(),i(71,"span",46),l(72,"Oscuro"),n()()(),i(73,"div",35)(74,"a",49),p("click",function(){return t.setSystemTheme()}),i(75,"span",37)(76,"i",50),c(77,"span",9)(78,"span",10)(79,"span",11)(80,"span",39),n()(),i(81,"span",46),l(82,"Sistema"),n()()()()(),g(),n()()()(),c(83,"div",51),n()),e&2&&(s(15),d("ngIf",t.authService.isAdmin()),s(16),u(" ",t.user==null?null:t.user.name," "),s(2),U(t.user==null?null:t.user.email),s(11),V(t.theme.getThemeMode()=="light"?44:45),s(6),d("ngClass",w(7,H,t.theme.getThemeMode()=="light")),s(16),d("ngClass",w(9,H,t.theme.getThemeMode()=="dark")),s(8),d("ngClass",w(11,H,t.theme.getThemeMode()=="system")))},dependencies:[q,L,A,R,te]})}};ie=M([Y({checkProperties:!0}),$("design:paramtypes",[])],ie);export{Z as a,ee as b,ie as c};
