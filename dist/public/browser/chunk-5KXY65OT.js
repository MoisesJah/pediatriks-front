import{a as h}from"./chunk-RCZZN26A.js";import{n as o}from"./chunk-EJJY6ZUA.js";import{sa as p,ya as s}from"./chunk-D6LKZNPK.js";var d=(()=>{let r=class r{constructor(t){this.http=t,this.apiUrl=`${h.apiUrl}/paquete`}getAll(){return this.http.get(`${this.apiUrl}/list`)}getById(t){return this.http.get(`${this.apiUrl}/show/${t}`)}create(t){return this.http.post(`${this.apiUrl}/add`,t)}update(t,i){return this.http.post(`${this.apiUrl}/edit/${t}`,i)}delete(t){return this.http.delete(`${this.apiUrl}/delete/${t}`)}purchase(t,i,a){let n={paqueteId:t,pacienteId:i,usuarioId:a};return this.http.post(`${this.apiUrl}/purchase`,n)}};r.\u0275fac=function(i){return new(i||r)(s(o))},r.\u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"});let e=r;return e})();export{d as a};
