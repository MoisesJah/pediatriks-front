import{a}from"./chunk-GKZUPR7X.js";import{b as s}from"./chunk-APQUY7ND.js";import{qa as r,wa as p}from"./chunk-B762IU3Y.js";var l=(()=>{class i{constructor(t){this.http=t,this.apiUrl=`${a.apiUrl}/ficha`}getAll(){return this.http.get(`${this.apiUrl}/list`)}getById(t){return this.http.get(`${this.apiUrl}/list/${t}`)}getByTerapia(t){return this.http.get(`${this.apiUrl}/terapia/${t}`)}getBySesion(t){return this.http.get(`${this.apiUrl}/sesion/${t}`)}getByPersonal(t){return this.http.get(`${this.apiUrl}/personal/${t}`)}create(t){return this.http.post(`${this.apiUrl}/add`,t)}update(t,e){return this.http.put(`${this.apiUrl}/edit/${e}`,t)}delete(t){return this.http.delete(`${this.apiUrl}/delete/${t}`)}static{this.\u0275fac=function(e){return new(e||i)(p(s))}}static{this.\u0275prov=r({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{l as a};
