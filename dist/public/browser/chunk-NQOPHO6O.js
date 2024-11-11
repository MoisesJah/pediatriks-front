import{a as ee}from"./chunk-OBNLLSUG.js";import{a as C}from"./chunk-X7PO4PNB.js";import{a as X}from"./chunk-WXQDA2BM.js";import{a as U}from"./chunk-GT4JH6HJ.js";import{a as Z}from"./chunk-MYRVSVX3.js";import{a as Q,b as k}from"./chunk-FKRAWMO5.js";import{i as Y,k as K}from"./chunk-XWWCT2EB.js";import{a as J}from"./chunk-PQDQNIDX.js";import{b as $}from"./chunk-OIXA5WM3.js";import{b as B,d as H,i as q,j as G,k as V,v as u,x as g}from"./chunk-MFZOMSUD.js";import{Ab as c,Ac as h,B as R,Ba as d,C as T,E as m,Fa as F,Fc as N,Hc as W,I as v,Lc as y,Mc as b,Ob as z,Pa as E,Qa as I,Sb as A,Ub as O,X as x,Xb as D,bd as f,ec as a,fc as o,gc as p,hc as M,ic as L,kc as j,qc as S,rc as _,t as w,zb as P}from"./chunk-JQJUQ5FW.js";var ie=()=>[q,import("./chunk-RHBLOMFZ.js").then(l=>l.AgGridAngular)],re=l=>[l];function ae(l,t){if(l&1){let e=j();a(0,"ag-grid-angular",17),y(1,"async"),y(2,"async"),S("gridReady",function(i){E(e);let n=_();return I(n.gridReady(i))}),o()}if(l&2){let e=_();D("rowData",b(1,7,e.citas))("columnDefs",e.colDefs)("loading",b(2,9,e.isLoading))("localeText",e.localeText)("enableCellTextSelection",!0)("ariaHidden",!0)("pagination",!0)}}function ne(l,t){l&1&&(a(0,"div",18)(1,"div",19)(2,"span",20),h(3,"Loading..."),o()()())}var s,te=(s=class{constructor(t,e,r,i){this.route=t,this.changeDetector=e,this.router=r,this.citaService=i,this.localeText=Z,this.isLoading=d(J).isLoading,this.theme=d(Y),this.authService=d($),this.datePipe=d(G),this.personalService=d(X),this.citas=new w,this.user=this.authService.user(),this.autoSizeStrategy={type:"fitCellContents"},this.colDefs=[{field:"title",headerName:"Paciente",filter:!0,minWidth:250},{field:"tipocita",headerName:"Tipo de Cita",filter:!0},{field:"date",headerName:"Fecha de Cita",valueFormatter:n=>B(n.value,"dd/MM/yyyy","en"),cellRenderer:n=>`<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-calendar text-gray-900 fs-2"></i>${n.value}</span>`,filter:"agDateColumnFilter"},{field:"start",headerName:"Hora de Inicio",filter:!0,cellRenderer:n=>`<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${this.datePipe.transform(new Date(n.value),"hh:mm")}</span>`},{field:"end",headerName:"Hora de Fin",filter:!0,cellRenderer:n=>`<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${this.datePipe.transform(new Date(n.value),"hh:mm")}</span>`},{field:"estado",headerName:"Estado",filter:!0,cellRenderer:ee}]}ngOnInit(){U("#dateRangePicker",{mode:"range",dateFormat:"Y-m-d",onClose:t=>{if(t.length===2){let[e,r]=t;this.filtrarCitasPorFechas(e.toISOString(),r.toISOString())}}}),this.loadCitas()}filtrarCitasPorFechas(t,e){let r=this.user?.personal?.id_personal;if(!r){console.error("ID del personal no disponible");return}this.citas=this.citaService.getCitasByFecha(r,t,e).pipe(v(i=>(console.log("Citas filtradas:",i.data),i.data)),x(i=>(console.error("Error al filtrar citas:",i),m([]))),k(this))}loadCitas(){if(!this.user?.personal){console.log("Mostrar aviso que no tiene personal asignado el usuario");return}let t=this.user?.personal?.id_personal,e=new Date,r=new Date;r.setDate(e.getDate()+7),t?this.citas=this.citaService.getCitasByPersonal({id_personal:t,startWeek:e.toISOString(),endWeek:r.toISOString()}).pipe(v(i=>(console.log("Respuesta del backend:",i),i.data)),x(i=>(console.error("Error al cargar citas:",i),m([]))),k(this)):(console.error("ID personal no disponible"),this.citas=m([]))}gridReady(t){this.gridApi=t.api,this.sizeColumnsToFit()}sizeColumnsToFit(){let t=()=>this.gridApi.sizeColumnsToFit();new ResizeObserver(()=>{window.innerWidth>=768&&t()}).observe(document.body),t()}},s.\u0275fac=function(e){return new(e||s)(c(u),c(f),c(g),c(C))},s.\u0275cmp=F({type:s,selectors:[["app-dashboard"]],standalone:!0,features:[N],decls:24,vars:3,consts:[["header-title",""],[1,"d-flex","text-gray-900","fw-bold","align-items-center","gap-2"],[1,"ki-duotone","ki-calendar","text-white","fs-2tx",2,"vertical-align","middle"],[1,"path1"],[1,"path2"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"card","shadow","p-2","px-4"],[1,"d-flex","py-4","justify-content-between","align-items-center"],[1,"d-flex","gap-3","w-100"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],["id","dateRangePicker","placeholder","Selecciona un rango de Fechas",1,"btn","btn-sm","btn-light","d-flex","ms-auto","px-4"],[2,"height","350px",3,"ngClass"],["loadingMessage","Cargando...",2,"width","100%","height","100%",3,"gridReady","rowData","columnDefs","loading","localeText","enableCellTextSelection","ariaHidden","pagination"],[1,"d-flex","justify-content-center","align-items-center",2,"height","100%"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(e,r){e&1&&(a(0,"app-header"),M(1,0),a(2,"h1",1)(3,"i",2),p(4,"span",3)(5,"span",4),o(),a(6,"span",5),h(7,"Mis Terapias"),o()(),L(),o(),a(8,"div",6)(9,"div",7)(10,"div",8)(11,"div",9)(12,"div",10)(13,"button",11),S("click",function(){return r.loadCitas()}),a(14,"span",12),p(15,"span",13),a(16,"span",14),h(17,"Actualizar"),o()()(),p(18,"input",15),o()(),a(19,"div",16),z(20,ae,3,11)(21,ne,4,0),A(22,20,ie,21),O(),o()()()()),e&2&&(P(19),D("ngClass",W(1,re,r.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")))},dependencies:[V,H,K]}),s);te=R([Q({checkProperties:!0}),T("design:paramtypes",[u,f,g,C])],te);export{te as DashboardComponent};
