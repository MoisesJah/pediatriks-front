import{a as R}from"./chunk-VIK6P75G.js";import{a as D}from"./chunk-MKNMNAUM.js";import{a as A,b as P}from"./chunk-TA6YOJTR.js";import{a as B}from"./chunk-T5KXAZJZ.js";import"./chunk-GKZUPR7X.js";import{j as F}from"./chunk-P5QLGDHL.js";import{o as L,t as T,w}from"./chunk-CWIGPBJP.js";import{Ba as h,C as g,Fc as i,Gc as s,Mb as f,Mc as I,Nc as C,Oc as E,Qc as M,Vb as u,Xc as d,Yc as m,bc as S,dc as _,ec as y,fc as e,gc as t,n as c,v as x,vc as b,wb as a,xa as l}from"./chunk-JCDSCFF6.js";function z(o,r){o&1&&(e(0,"div")(1,"div",3)(2,"div",4)(3,"span",5),i(4,"Cargando..."),t()()()())}function N(o,r){if(o&1&&(e(0,"tr")(1,"td")(2,"span",10),i(3),t()(),e(4,"td"),i(5),t(),e(6,"td"),i(7),t(),e(8,"td"),i(9),t(),e(10,"td"),i(11),t()()),o&2){let n=r.$implicit;a(3),s(n.mes),a(2),s(n.atenciones),a(2),s(n.permisos),a(2),s(n.tardanzas),a(2),s(n.faltas)}}function O(o,r){o&1&&(e(0,"tr")(1,"td",11),i(2,"No se encontraron registros"),t()())}function k(o,r){if(o&1&&(e(0,"div",6)(1,"table",7)(2,"thead")(3,"tr",8)(4,"th",9),i(5,"Mes"),t(),e(6,"th",9),i(7,"Atenciones"),t(),e(8,"th",9),i(9,"Permisos"),t(),e(10,"th",9),i(11,"Tardanzas"),t(),e(12,"th",9),i(13,"Faltas"),t()()(),e(14,"tbody"),_(15,N,12,5,"tr",null,S,!1,O,3,0,"tr"),t()()()),o&2){b();let n=E(3);a(15),y(n)}}var j=class v{constructor(){this.personalService=l(R),this.router=l(F),this.isLoading=l(D).isLoading,this.atencionesList=new c,this.theme=l(B),this.id_personal=this.router.snapshot.params.id,this.listStats=new c}ngOnInit(){this.getRecords()}getRecords(){this.listStats=this.personalService.getStatMensual({id_personal:this.id_personal}).pipe(g(r=>r.data.mensual),P(this))}static{this.\u0275fac=function(n){return new(n||v)}}static{this.\u0275cmp=h({type:v,selectors:[["app-info-mensual"]],standalone:!0,features:[M],decls:7,vars:9,consts:[[1,"container"],[4,"ngIf"],["class","table-responsive",4,"ngIf"],[1,"loading-container","d-flex","justify-content-center","align-items-center"],["role","status",1,"spinner-border","text-primary"],[1,"visually-hidden"],[1,"table-responsive"],[1,"table","bg-body","table-rounded","table-striped","border","table-row-bordered","gy-7","gs-7"],[1,"fw-semibold","fs-6","text-gray-800","border-bottom","border-gray-200"],["scope","col"],[1,"fw-bold"],["colspan","5"]],template:function(n,p){n&1&&(e(0,"div",0),f(1,z,5,0,"div",1),d(2,"async"),I(3),d(4,"async"),f(5,k,18,1,"div",2),d(6,"async"),t()),n&2&&(a(),u("ngIf",m(2,2,p.isLoading)),a(2),C(m(4,4,p.listStats)),a(2),u("ngIf",!m(6,7,p.isLoading)))},dependencies:[w,L,T],encapsulation:2})}};j=x([A()],j);export{j as InfoMensualComponent};
