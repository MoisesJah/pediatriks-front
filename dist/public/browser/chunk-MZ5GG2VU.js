import{a as pe}from"./chunk-UU7FDT6A.js";import{a as W,b as X,c as Y,d as Z,e as ee,f as te,g as ne,h as ie,i as oe,j as re,k as ce,l as ae,m as le}from"./chunk-CZPC3FHQ.js";import{a as K}from"./chunk-GKZUPR7X.js";import{b as q,l as z,m as J}from"./chunk-R7YU5FNY.js";import{m as R,n as y,o as I,r as U,t as P,v as S}from"./chunk-DP3M2V7L.js";import{Aa as v,Ac as x,C as N,Gc as k,Ic as w,Ka as u,La as g,Lb as d,Nc as H,Oc as Q,Ta as O,Ub as a,bc as c,cc as r,dc as f,ec as _,fc as h,hc as b,ja as V,n as T,nc as C,oc as p,pa as M,r as A,rc as E,uc as $,va as L,vb as o,vc as G,wa as D,wc as B,yc as m,zc as j}from"./chunk-B7JMKZ3I.js";function ge(n,s){if(n&1){let e=b();c(0,"button",5),C("click",function(){u(e);let i=p();return g(i.uncheckAll())}),m(1,"Limpiar "),f(2,"i",6),r()}}function fe(n,s){if(n&1){let e=b();_(0),c(1,"div",15)(2,"input",16),C("change",function(){let i=u(e).$implicit,l=p(3);return g(l.updateSelectedItem(i))}),r(),c(3,"label",17),m(4),r()(),h()}if(n&2){let e=s.$implicit;o(2),a("checked",e.checked),o(2),j(e.nombre)}}function _e(n,s){if(n&1){let e=b();c(0,"div",8)(1,"div",9)(2,"input",10),C("change",function(i){u(e);let l=p().$implicit,de=p();return g(de.checkGroup(i.target.checked,l))}),r(),c(3,"label",11),m(4),r()(),c(5,"span",12),f(6,"i",13),r(),c(7,"div",14),d(8,fe,5,2,"ng-container",4),r()()}if(n&2){let e=p().$implicit,t=p();o(2),a("indeterminate",t.isGroupIndeterminate(e))("checked",t.isGroupChecked(e)),o(2),x("",e.nombre," "),o(4),a("ngForOf",e.personal)}}function he(n,s){if(n&1&&(_(0),d(1,_e,9,4,"div",7),h()),n&2){let e=s.$implicit;o(),a("ngIf",e.personal)}}var F=(()=>{class n{constructor(){this.items=[],this.selected=new O}get selectedValues(){return this.items.reduce((e,t)=>{let i=t.personal.filter(l=>l.checked).map(l=>l.id);return e.concat(i)},[])}ngOnInit(){}checkAll(e){this.items.forEach(t=>t.checked=e)}uncheckAll(){this.items.forEach(e=>e.personal.forEach(t=>t.checked=!1)),this.selected.emit(this.selectedValues)}updateSelectedItem(e){e.checked=!e.checked,this.selected.emit(this.selectedValues)}checkGroup(e,t){t.personal.forEach(i=>i.checked=e),this.selected.emit(this.selectedValues)}isGroupChecked(e){return e.personal.every(t=>t.checked)}isGroupIndeterminate(e){return!this.isGroupChecked(e)&&e.personal.some(t=>t.checked)}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=v({type:n,selectors:[["app-checkbox"]],inputs:{items:"items"},outputs:{selected:"selected"},standalone:!0,features:[k],decls:6,vars:2,consts:[["ngbAccordion","",1,"d-flex","flex-column","gap-3","p-2",2,"min-width","250px"],[1,"d-flex","justify-content-between"],[1,"fw-bold","px-2","fs-5"],["type","button","class","btn btn-sm btn-danger",3,"click",4,"ngIf"],[4,"ngFor","ngForOf"],["type","button",1,"btn","btn-sm","btn-danger",3,"click"],[1,"fas","fa-times"],["ngbAccordionItem","","class","form-check form-check-sm d-flex flex-wrap align-items-center justify-content-between",4,"ngIf"],["ngbAccordionItem","",1,"form-check","form-check-sm","d-flex","flex-wrap","align-items-center","justify-content-between"],["ngbAccordionHeader",""],["type","checkbox",1,"form-check-input",3,"change","indeterminate","checked"],["ngbAccordionTitle",""],["ngbAccordionToggle","","role","button"],[1,"fas","fa-chevron-down"],["ngbAccordionCollapse",""],["ngbAccordionBody","",1,"form-check","py-3","form-check-sm"],["type","checkbox",1,"form-check-input",3,"change","checked"],[1,"form-check-label"]],template:function(t,i){t&1&&(c(0,"div",0)(1,"div",1)(2,"span",2),m(3,"Filtrar"),r(),d(4,ge,3,0,"button",3),r(),d(5,he,2,1,"ng-container",4),r()),t&2&&(o(4),a("ngIf",i.selectedValues.length),o(),a("ngForOf",i.items))},dependencies:[ne,te,ee,Z,Y,W,X,S,y,I,ie]})}}return n})();var be=n=>({"d-none":n}),Ce=n=>({"ps-3":n}),xe=n=>({"background-color":n});function ve(n,s){if(n&1){let e=b();c(0,"div",11)(1,"app-checkbox",12),C("selected",function(i){u(e);let l=p(2);return g(l.changeSelectedItems(i))}),r()()}if(n&2){let e=p(2);o(),a("items",e.checkBoxList)}}function ke(n,s){if(n&1&&(_(0),c(1,"a",13),m(2),r(),h()),n&2){let e=s.$implicit;o(),E("routerLink",e.link),o(),x(" ",e.nombre," ")}}function we(n,s){if(n&1&&(c(0,"div",11),d(1,ke,3,2,"ng-container",4),r()),n&2){let e=p().$implicit;o(),a("ngForOf",e.personal)}}function ye(n,s){if(n&1&&(_(0),c(1,"div",5,0)(3,"div",6),f(4,"span",7),c(5,"a",8),m(6),f(7,"span",9),r()(),d(8,ve,2,1,"div",10)(9,we,2,1,"div",10),r(),h()),n&2){let e=s.$implicit,t=p();o(4),a("ngClass",w(7,be,t.displayFilters(e))),o(),E("routerLink",e.link),a("ngClass",w(9,Ce,e.nombre==="Cronograma General")),o(),x(" ",e.nombre," "),o(),a("ngStyle",w(11,xe,e.color)),o(),a("ngIf",e.nombre==="Cronograma General"),o(),a("ngIf",e.personal)}}var He=(()=>{class n{constructor(){this.terapiasService=D(pe),this.router=D(z),this.showSubmenu=null,this.selectedItems=new A([]),this.terapiasList=new T,this.checkBoxList=[]}get showFilters(){return this.router.url==="/admin/reservar-cita"}displayFilters(e){let t=e.nombre==="Cronograma General";return this.router.url!=="/admin/reservar-cita"&&t}ngOnInit(){this.terapiasList=this.terapiasService.getAllPersonal().pipe(N(e=>[{link:"/admin/reservar-cita",nombre:"Cronograma General"},...e.data.map(t=>({link:`/admin/reservar-cita/${t.id_terapia}`,nombre:t.nombre,color:t.color,personal:t.personal.map(i=>({link:`/admin/reservar-cita/${t.id_terapia}/${i.id_personal}`,nombre:i.nombre,checked:!1,id:i.id_personal}))}))]),V(e=>{this.checkBoxList=e.filter(t=>t.personal)}))}changeSelectedItems(e){this.selectedItems.next(e)}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=v({type:n,selectors:[["app-dropdown"]],viewQuery:function(t,i){if(t&1&&$(F,5),t&2){let l;G(l=B())&&(i.viewChildren=l)}},standalone:!0,features:[k],decls:6,vars:3,consts:[["dropdown","ngbDropdown"],["ngbDropdown","","placement","bottom-end",1,"d-inline-block"],["ngbDropdownToggle","",1,"btn","btn-secondary"],["ngbDropdownMenu","","aria-labelledby","dropdownBasic1"],[4,"ngFor","ngForOf"],["ngbDropdown","","placement","left-top",1,"d-inline-block","w-100"],[1,"d-flex","dropdown-content","align-items-center"],["role","button","ngbDropdownToggle","",1,"px-3",3,"ngClass"],["ngbDropdownItem","",1,"ps-0","d-flex","align-items-center","justify-content-between",3,"routerLink","ngClass"],[1,"h-8px","w-8px","d-inline-block","rounded-circle",3,"ngStyle"],["ngbDropdownMenu","","aria-labelledby","dropdownBasic2",4,"ngIf"],["ngbDropdownMenu","","aria-labelledby","dropdownBasic2"],[3,"selected","items"],["ngbDropdownItem","",3,"routerLink"]],template:function(t,i){t&1&&(c(0,"div",1)(1,"button",2),m(2," Seleccionar Terapia "),r(),c(3,"div",3),d(4,ye,10,13,"ng-container",4),H(5,"async"),r()()),t&2&&(o(4),a("ngForOf",Q(5,1,i.terapiasList)))},dependencies:[le,ae,ce,re,oe,S,R,y,I,U,P,J,F]})}}return n})();var Pe=(()=>{class n{constructor(e){this.http=e,this.apiUrl=K.apiUrl}getAll(){return this.http.get(`${this.apiUrl}/tipocita/list`)}static{this.\u0275fac=function(t){return new(t||n)(L(q))}}static{this.\u0275prov=M({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();export{Pe as a,He as b};
