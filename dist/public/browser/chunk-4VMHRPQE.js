import{a as h}from"./chunk-YR44ZVP5.js";import{m as o}from"./chunk-EITZOAMY.js";import{sa as p,ya as s}from"./chunk-LYSYPXVF.js";var u=(()=>{let r=class r{constructor(t){this.http=t,this.apiUrl=`${h.apiUrl}/paquete`}getAll(){return this.http.get(`${this.apiUrl}/list`)}getById(t){return this.http.get(`${this.apiUrl}/show/${t}`)}create(t){return this.http.post(`${this.apiUrl}/add`,t)}update(t,i){return this.http.put(`${this.apiUrl}/edit/${t}`,i)}delete(t){return this.http.delete(`${this.apiUrl}/delete/${t}`)}purchase(t,i){let a={paqueteId:t,pacienteId:i};return this.http.post(`${this.apiUrl}/purchase`,a)}};r.\u0275fac=function(i){return new(i||r)(s(o))},r.\u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"});let e=r;return e})();export{u as a};