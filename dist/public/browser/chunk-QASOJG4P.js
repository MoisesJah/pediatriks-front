import{a as C}from"./chunk-GKZUPR7X.js";import{b as x}from"./chunk-P5QLGDHL.js";import{Ba as m,Fc as o,Hc as p,Mb as h,Qc as g,ac as f,fc as n,gc as s,qa as u,vc as r,wa as d,wb as a}from"./chunk-JCDSCFF6.js";var y=(()=>{class e{constructor(t){this.http=t,this.apiUrl=C.apiUrl,this.status_url=`${this.apiUrl}/asistencia-status`}getAll(){return this.http.get(`${this.apiUrl}/asistencia/list`)}getById(t){return this.http.get(`${this.apiUrl}/asistencia/list/${t}`)}getByPersonal(t){return this.http.get(`${this.apiUrl}/asistencia/personal/${t}`)}create(t){return this.http.post(`${this.apiUrl}/asistencia/add`,t)}update(t,i){return this.http.put(`${this.apiUrl}/asistencia/update/${i}`,t)}delete(t){return this.http.delete(`${this.apiUrl}/asistencia/delete/${t}`)}getStatusList(){return this.http.get(`${this.status_url}`)}static{this.\u0275fac=function(i){return new(i||e)(d(x))}}static{this.\u0275prov=u({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function S(e,c){if(e&1&&(n(0,"span",0),o(1),s()),e&2){let t=r();a(),p(" ",t.status," ")}}function $(e,c){if(e&1&&(n(0,"span",1),o(1),s()),e&2){let t=r();a(),p(" ",t.status," ")}}function v(e,c){if(e&1&&(n(0,"span",2),o(1),s()),e&2){let t=r();a(),p(" ",t.status," ")}}function I(e,c){if(e&1&&(n(0,"span",3),o(1),s()),e&2){let t=r();a(),p(" ",t.status," ")}}var T=(()=>{class e{constructor(){this.status=""}agInit(t){this.status=t.data.status.nombre}refresh(t){return!1}static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["app-status-badge"]],standalone:!0,features:[g],decls:4,vars:1,consts:[[1,"badge","text-capitalize","fs-7","badge-light-success","rounded-pill"],[1,"badge","text-capitalize","fs-7","badge-light-danger","rounded-pill"],[1,"badge","text-capitalize","fs-7","badge-light-warning","rounded-pill"],[1,"badge","text-capitalize","fs-7","badge-light-twitter","rounded-pill"]],template:function(i,_){if(i&1&&h(0,S,2,1,"span",0)(1,$,2,1,"span",1)(2,v,2,1,"span",2)(3,I,2,1,"span",3),i&2){let l;f((l=_.status)==="asisti\xF3"?0:l==="inasistencia"?1:l==="tardanza"?2:l==="justificado"?3:-1)}},encapsulation:2})}}return e})();export{y as a,T as b};
