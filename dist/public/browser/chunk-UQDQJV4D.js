import{a as p}from"./chunk-GKZUPR7X.js";import{b as s}from"./chunk-P5QLGDHL.js";import{qa as i,wa as r}from"./chunk-JCDSCFF6.js";var h=(()=>{class e{constructor(t){this.http=t,this.apiUrl=`${p.apiUrl}/paciente/stats`}getTerapias(t){return this.http.post(`${this.apiUrl}?type=terapias`,{pacienteId:t})}getSesiones(t){return this.http.post(`${this.apiUrl}?type=horarios`,{pacienteId:t})}getAsistencias(t){return this.http.post(`${this.apiUrl}?type=asistencias`,{pacienteId:t})}getFichas(t){return this.http.post(`${this.apiUrl}?type=informes`,{pacienteId:t})}getPaquetes(t){return this.http.post(`${this.apiUrl}?type=paquetes`,{pacienteId:t})}static{this.\u0275fac=function(a){return new(a||e)(r(s))}}static{this.\u0275prov=i({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{h as a};
