import{Y as o,qa as s,r as a}from"./chunk-H565K2KG.js";var d=(()=>{class e{constructor(){this.loadingSub=new a(!1),this.loadingMap=new Map,this.isLoading=this.loadingSub.asObservable().pipe(o(0))}setLoading(i,t){if(!t)throw new Error("The request URL must be provided to the LoadingService.setLoading function");i===!0?(this.loadingMap.set(t,i),this.loadingSub.next(!0)):i===!1&&this.loadingMap.has(t)&&this.loadingMap.delete(t),this.loadingMap.size===0&&this.loadingSub.next(!1)}startLoading(){this.loadingSub.next(!0)}stopLoading(){this.loadingSub.next(!1)}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275prov=s({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{d as a};
