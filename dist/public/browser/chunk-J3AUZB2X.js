import{a}from"./chunk-GKZUPR7X.js";import{b as p}from"./chunk-R7YU5FNY.js";import{pa as e,va as s}from"./chunk-B7JMKZ3I.js";var l=(()=>{class i{constructor(t){this.http=t,this.apiUrl=`${a.apiUrl}/ficha-result`}getAll(){return this.http.get(`${this.apiUrl}/list`)}getList(){return this.http.get(`${this.apiUrl}/all`)}getByPacientes(t){return this.http.get(`${this.apiUrl}/user/${t}`)}create(t){return this.http.post(`${this.apiUrl}/add`,t)}getOne(t){return this.http.get(`${this.apiUrl}/list/${t}`)}update(t,r){return this.http.put(`${this.apiUrl}/edit/${t}`,r)}static{this.\u0275fac=function(r){return new(r||i)(s(p))}}static{this.\u0275prov=e({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{l as a};
