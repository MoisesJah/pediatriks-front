import{a as o}from"./chunk-GKZUPR7X.js";import{b as a}from"./chunk-ZM3MROS5.js";import{pa as i,va as p}from"./chunk-B7JMKZ3I.js";var l=(()=>{class r{constructor(t){this.http=t,this.apiUrl=o.apiUrl}getAll(){return this.http.get(`${this.apiUrl}/personal/list`)}getById(t){return this.http.get(`${this.apiUrl}/personal/list/${t}`)}getPersonalByUser(t){return this.http.get(`${this.apiUrl}/personal/user/${t}`)}getHorarios(t){return this.http.get(`${this.apiUrl}/personal/horarios/${t}`)}getByTerapia(t){return this.http.get(`${this.apiUrl}/personal/terapias/${t}`)}create(t){let e=new FormData;return e.append("nombre",t.nombre),e.append("dni",t.dni),e.append("telefono",t.telefono),e.append("correo",t.correo),e.append("id_genero",t.id_genero),e.append("id_sede",t.id_sede),e.append("sueldo",t.sueldo.toString()),e.append("id_terapia",t.id_terapia),e.append("horarios",JSON.stringify(t.horarios)),e.append("color",t.color),t.cv&&e.append("cv",t.cv),this.http.post(`${this.apiUrl}/personal/add`,e)}update(t,e){return this.http.post(`${this.apiUrl}/personal/edit/${e}`,t)}getCV(t){return this.http.get(`${this.apiUrl}/personal/cv/${t}`,{responseType:"blob"})}getAvailable(){return this.http.get(`${this.apiUrl}/personal/available`)}delete(t){return this.http.delete(`${this.apiUrl}/personal/delete/${t}`)}static{this.\u0275fac=function(e){return new(e||r)(p(a))}}static{this.\u0275prov=i({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{l as a};
