import{a as h}from"./chunk-MTDZXKVK.js";import{m as p}from"./chunk-VUZMLSUX.js";import{sa as s,ya as a}from"./chunk-UAHLOU27.js";var c=(()=>{let i=class i{constructor(t){this.http=t,this.apiUrl=h.apiUrl}getAll(t){return this.http.post(`${this.apiUrl}/citas/list`,t)}getByTerapia(t){return this.http.post(`${this.apiUrl}/citas/list`,t)}getById(t,r){return this.http.get(`${this.apiUrl}/citas/sesion/${t}/${r}`)}getCitasByUser(t){return this.http.get(`${this.apiUrl}/citas/user/${t}`)}create(t){return this.http.post(`${this.apiUrl}/citas/add`,t)}createForTherapy(t){return this.http.post(`${this.apiUrl}/citas/add/therapy`,t)}getByPersonal(t){return this.http.post(`${this.apiUrl}/citas/personal`,t)}getAvailablePersonal(t){return this.http.post(`${this.apiUrl}/citas/personal/available`,t)}update(t,r){return this.http.put(`${this.apiUrl}/citas/edit/${t}`,r)}delete(t){return this.http.delete(`${this.apiUrl}/citas/delete`,{body:t})}};i.\u0275fac=function(r){return new(r||i)(a(p))},i.\u0275prov=s({token:i,factory:i.\u0275fac,providedIn:"root"});let e=i;return e})();export{c as a};
