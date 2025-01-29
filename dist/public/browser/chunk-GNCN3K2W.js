import{a as z}from"./chunk-UZO5QNZS.js";import{a as j}from"./chunk-D4MMWRT4.js";import{c as O,d as q}from"./chunk-NZWSPJLI.js";import{a as I,b as W}from"./chunk-KG3B2A6X.js";import{a as H}from"./chunk-U2EAJGNN.js";import{u as M}from"./chunk-TEKV2OXA.js";import{a as G}from"./chunk-NMGGHNE5.js";import{a as P}from"./chunk-BIMAMPZW.js";import{a as V}from"./chunk-KNEUCQQI.js";import"./chunk-GKZUPR7X.js";import"./chunk-ZM3MROS5.js";import{m as L,t as $,v as B}from"./chunk-DP3M2V7L.js";import{Aa as F,C as v,Gc as E,Ic as R,Ka as u,La as f,Lb as T,Nc as g,Oc as _,Pb as w,Rb as D,Ub as h,bc as i,cc as r,dc as c,ec as k,fc as N,hc as A,n as b,nc as d,oc as m,v as y,vb as S,wa as s,yc as p}from"./chunk-B7JMKZ3I.js";var Q=()=>[O,$],X=l=>[l];function Y(l,e){if(l&1){let t=A();i(0,"ag-grid-angular",19),g(1,"async"),g(2,"async"),d("gridReady",function(a){u(t);let o=m();return f(o.gridReady(a))})("gridReady",function(a){u(t);let o=m();return f(o.gridReady(a))}),r()}if(l&2){let t=m();h("rowData",_(1,7,t.fichasList))("columnDefs",t.colDefs)("enableCellTextSelection",!0)("localeText",t.localeText)("ariaHidden",!0)("pagination",!0)("loading",_(2,9,t.isLoading))}}function Z(l,e){l&1&&(i(0,"div",20)(1,"div",21)(2,"span",22),p(3,"Loading..."),r()()())}var U=class x{constructor(){this.authService=s(P),this.fichasService=s(j),this.theme=s(V),this.fichasList=new b,this.isLoading=s(G).isLoading,this.localeText=H,this.colDefs=[{headerName:"Nombre",field:"nombre",cellClass:"fw-bold",filter:"agTextColumnFilter",minWidth:250},{headerName:"Paciente",field:"paciente",filter:!0,minWidth:200},{headerName:"Personal",field:"personal",cellClass:e=>e.data.can_edit?"fw-bold":"",filter:!0,minWidth:200},{headerName:"Terapia",field:"terapia",filter:!0,minWidth:200,cellRenderer:e=>`<span class="d-flex align-items-center gap-2"><span class="h-5px w-5px rounded-circle" style="background-color: ${e.data.color}"></span>${e.value}</span>`},{headerName:"Fecha",field:"fecha_sesion",filter:"agDateColumnFilter",valueFormatter:e=>z(e.value)},{headerName:"Status",field:"status",filter:"agTextColumnFilter",cellRenderer:e=>e.value==="pendiente"?`<span class="badge badge-light-warning rounded-pill">${e.value}</span>`:`<span class="badge badge-light-success rounded-pill">${e.value}</span>`},{headerName:"Fecha Completado",field:"fecha_completado",filter:"agDateColumnFilter",filterParams:{comparator:(e,t)=>{let n=t;if(n==null)return 0;let a=n.slice(0,10).split("/"),o=Number(a[2]),J=Number(a[1])-1,K=Number(a[0]),C=new Date(o,J,K);return C<e?-1:C>e?1:0}},cellClass:"fw-semibold text-gray-600 text-center"},{headerName:"Acciones",filter:!1,field:"can_edit",autoHeight:!0,cellRenderer:e=>{let t=`/ficha-result/${e.data.id_resultado}`,n=`/terapista/${e.data.id_sesion}/${e.data.id_ficha}`;if(e.data.completado)return`<a href="${t}" target="_blank" class="btn btn-light-info btn-sm btn-active-icon-white rounded-pill"><i class="ki-outline ki-eye fs-4"></i>Ver Contenido</a>`;if(e.value&&!e.data.completado)return`<a href="${n}" target="_blank" class="btn btn-light-primary btn-sm btn-active-icon-white rounded-pill"><i class="ki-outline ki-check-circle fs-4"></i>Completar</a>`}}]}ngOnInit(){this.getFichas()}gridReady(e){this.gridApi=e.api}onFilterTextBoxChanged(){this.gridApi.setGridOption("quickFilterText",document.getElementById("terapia-search").value)}getFichas(){this.fichasList=this.fichasService.getByPersonal(this.authService.user()?.personal?.id_personal).pipe(v(e=>e.data),W(this))}loadTabla(){this.getFichas()}static{this.\u0275fac=function(t){return new(t||x)}}static{this.\u0275cmp=F({type:x,selectors:[["app-fichas"]],standalone:!0,features:[E],decls:26,vars:3,consts:[["header-title",""],[1,"d-flex","flex-column","text-gray-900","fw-bold","my-1"],[1,"",2,"color","white"],[1,"content","d-flex","flex-column","flex-column-fluid"],[1,"container-xxl"],[1,"card","shadow","p-2","px-4"],[1,"d-flex","py-4","justify-content-between","align-items-center"],["data-kt-search-element","form","autocomplete","off",1,"position-relative"],["type","hidden"],[1,"ki-duotone","ki-magnifier","fs-2","search-icon","position-absolute","top-50","translate-middle-y","ms-4"],[1,"path1"],[1,"path2"],["type","search","id","terapia-search","name","search","value","","placeholder","B\xFAsqueda","data-kt-search-element","input",1,"form-control","custom-form-control","ps-13",3,"input"],[1,"d-flex","align-items-center","gap-3"],["type","button",1,"btn","btn-light-primary",3,"click"],[1,"d-flex","align-items-center"],[1,"fa-solid","fa-rotate-right"],[1,"ms-2"],[2,"height","calc(100dvh - 281px)",3,"ngClass"],["loadingMessage","Cargando...",2,"width","100%","height","100%",3,"gridReady","rowData","columnDefs","enableCellTextSelection","localeText","ariaHidden","pagination","loading"],[1,"d-flex","justify-content-center","align-items-center",2,"height","100%"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(t,n){t&1&&(i(0,"app-header"),k(1,0),i(2,"h1",1)(3,"span",2),p(4,"Fichas"),r()(),N(),r(),i(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"form",7),c(10,"input",8),i(11,"i",9),c(12,"span",10)(13,"span",11),r(),i(14,"input",12),d("input",function(){return n.onFilterTextBoxChanged()}),r()(),i(15,"div",13)(16,"button",14),d("click",function(){return n.loadTabla()}),i(17,"span",15),c(18,"span",16),i(19,"span",17),p(20,"Actualizar"),r()()()()(),i(21,"div",18),T(22,Y,3,11)(23,Z,4,0),w(24,22,Q,23),D(),r()()()()),t&2&&(S(21),h("ngClass",R(1,X,n.theme.getThemeMode()==="light"?"ag-theme-quartz":"ag-theme-quartz-dark")))},dependencies:[q,B,L,M]})}};U=y([I()],U);export{U as FichasComponent};
