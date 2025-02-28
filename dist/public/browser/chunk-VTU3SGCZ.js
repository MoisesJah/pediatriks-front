import{a as p}from"./chunk-GKZUPR7X.js";import{b as a}from"./chunk-DA7F7PFS.js";import{qa as e,wa as s}from"./chunk-MKY54U27.js";var u=(()=>{class r{constructor(t){this.http=t,this.apiUrl=p.apiUrl}getAll(t){return this.http.post(`${this.apiUrl}/citas/list`,t)}getByTerapia(t){return this.http.post(`${this.apiUrl}/citas/list`,t)}getById(t,i){return this.http.get(`${this.apiUrl}/citas/sesion/${t}/${i}`)}getCitasByUser(t){return this.http.get(`${this.apiUrl}/citas/user/${t}`)}create(t){return this.http.post(`${this.apiUrl}/citas/add`,t)}createForTherapy(t){return this.http.post(`${this.apiUrl}/citas/add/therapy`,t)}getByPersonal(t){return this.http.post(`${this.apiUrl}/citas/personal`,t)}getPacienteInfo(t){return this.http.get(`${this.apiUrl}/citas/paciente/${t}`)}getCitasByPersonal(t){return this.http.post(`${this.apiUrl}/citas/personal`,t)}getCitasByFecha(t,i,h){let n={id_personal:t,fecha_inicio:i,fecha_fin:h};return this.http.post(`${this.apiUrl}/citas/filtrar-por-fechas`,n)}getAvailablePersonal(t){return this.http.post(`${this.apiUrl}/citas/personal/available`,t)}update(t,i){return this.http.put(`${this.apiUrl}/citas/edit/${t}`,i)}updateStatus(t){return this.http.put(`${this.apiUrl}/citas/update-status`,t)}delete(t){return this.http.delete(`${this.apiUrl}/citas/delete`,{body:t})}static{this.\u0275fac=function(i){return new(i||r)(s(a))}}static{this.\u0275prov=e({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{u as a};
