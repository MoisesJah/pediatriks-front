import{a as o}from"./chunk-3IC3XWDF.js";import{l as d}from"./chunk-DA7F7PFS.js";import{xa as i}from"./chunk-MKY54U27.js";var m=(c,a)=>{let e=i(o),t=i(d),u=!e.isAuthenticated(),s=["/login","/registrate"].includes(a.url),n=a.url.includes("admin");if(u&&!s)return t.navigate(["/login"]),!1;if(s&&e.isAuthenticated()){let r="";switch(e.user()?.tipo_user){case"administrador":r="/admin/dashboard";break;case"terapista":r="/terapista/dashboard";break;case"paciente":r="/dashboard";break;default:break}return t.navigate([r]),!1}if(e.isAdmin()&&!n&&!a.url.includes("ficha-result"))return t.navigateByUrl("/admin/dashboard"),!1;if(e.isAuthenticated()&&!e.isAdmin()&&n){let r=e.isTerapista()?"/terapista/dashboard":"/dashboard";return t.navigateByUrl(r),!1}return!0};export{m as a};
