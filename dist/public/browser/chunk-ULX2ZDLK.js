import{a as w}from"./chunk-JN3SLQY4.js";import{a as N}from"./chunk-AHYCEPXJ.js";import{a as R}from"./chunk-UZO5QNZS.js";import{c as L}from"./chunk-HU6BYMHG.js";import{a as M}from"./chunk-U2EAJGNN.js";import{a as A}from"./chunk-4TSZW343.js";import{a as y,b}from"./chunk-OO4BC6LN.js";import{a as _}from"./chunk-67M5LFVM.js";import"./chunk-GKZUPR7X.js";import{j as S}from"./chunk-QUGPZPJP.js";import{m as T,t as v,v as D}from"./chunk-O2FCGDZ2.js";import{Ba as d,C as p,Jc as g,Lc as C,Qc as o,Rc as n,Vb as r,ec as f,fc as h,gc as u,n as m,v as l,wb as c,xa as t}from"./chunk-H565K2KG.js";var B=x=>[x],F=class s{constructor(){this.reporteService=t(N),this.isLoading=t(A).isLoading,this.theme=t(_),this.id_paciente=t(S).snapshot.paramMap.get("id"),this.localeText=M,this.columnDefs=[{field:"fecha_sesion",headerName:"Fecha",filter:"agDateColumnFilter",cellRenderer:e=>R(e.data.fecha_sesion)},{field:"hora",headerName:"Horario",filter:!0,cellRenderer:e=>`${e.data.hora_inicio} - ${e.data.hora_fin}`},{field:"terapia",headerName:"Terapia",filter:!0},{field:"terapista",headerName:"Terapista",filter:!0},{field:"status",headerName:"Status",filter:!0,cellRenderer:w}],this.horariosList=new m}ngOnInit(){this.horariosList=this.reporteService.getAsistencias(this.id_paciente).pipe(p(e=>e.data.asistencias),b(this))}static{this.\u0275fac=function(a){return new(a||s)}}static{this.\u0275cmp=d({type:s,selectors:[["app-tab-asistencia"]],standalone:!0,features:[g],decls:4,vars:14,consts:[[1,"mt-4",2,"height","calc(100dvh - 281px)",3,"ngClass"],["loadingMessage","Cargando...",2,"width","100%","height","100%",3,"rowData","columnDefs","loading","localeText","enableCellTextSelection","ariaHidden","pagination"]],template:function(a,i){a&1&&(f(0,"div",0),u(1,"ag-grid-angular",1),o(2,"async"),o(3,"async"),h()),a&2&&(r("ngClass",C(12,B,i.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")),c(),r("rowData",n(2,8,i.horariosList))("columnDefs",i.columnDefs)("loading",n(3,10,i.isLoading))("localeText",i.localeText)("enableCellTextSelection",!0)("ariaHidden",!0)("pagination",!0))},dependencies:[L,D,T,v],encapsulation:2})}};F=l([y()],F);export{F as TabAsistenciaComponent};
