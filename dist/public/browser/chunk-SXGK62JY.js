import{b as a}from"./chunk-4PY7PIQX.js";import{u}from"./chunk-VUZMLSUX.js";import{za as i}from"./chunk-UAHLOU27.js";var h=(d,t)=>{let r=i(a),e=i(u),n=["/login","/registrate"];if(!r.isAuthenticated()&&t.url!=="/"&&!n.includes(t.url))return e.navigate(["/login"]),!1;if(n.includes(t.url)&&r.isAuthenticated()){let o=r.isAdmin()?"/admin/dashboard":"/dashboard";return e.navigate([o]),!1}return!r.isAdmin()&&t.url.includes("admin")&&r.isAuthenticated()?(e.navigateByUrl("/dashboard"),!1):!0};export{h as a};
