import{a as F,b as M}from"./chunk-GOCV7MVT.js";import{a as C,b as l,c as y}from"./chunk-RA3TJD6Z.js";import{a as S}from"./chunk-MJY4KJR5.js";import{a as v}from"./chunk-D4MMWRT4.js";import{a as f}from"./chunk-KG3B2A6X.js";import{a as u}from"./chunk-KNEUCQQI.js";import"./chunk-GKZUPR7X.js";import{i as d}from"./chunk-ZM3MROS5.js";import"./chunk-DP3M2V7L.js";import{Aa as m,Gc as p,Ub as n,dc as c,f as s,v as h,wa as i}from"./chunk-B7JMKZ3I.js";var I=s(C()),o=s(F()),j=s(M());var g=class a{constructor(){this.route=i(d),this.theme=i(u),this.fichaId=this.route.snapshot.paramMap.get("surveyId"),this.sesionId=this.route.snapshot.paramMap.get("sesionId"),this.fichaService=i(v),this.fichaResult=i(S)}ngOnInit(){this.getFicha()}getFicha(){this.fichaService.getById(this.fichaId).subscribe(r=>{this.survey=new I.Model(r.data.body),this.survey.locale="es",this.survey.applyTheme(this.theme.getThemeMode()==="dark"?o.DefaultDark:o.DefaultLight),this.survey.completedHtml="<h3>Ficha Completada!</h3>",this.survey.onComplete.add((e,t)=>{t.showSaveInProgress(),this.fichaResult.create({id_sesion:this.sesionId,id_ficha:this.fichaId,body:JSON.stringify(e.data)}).subscribe({next:()=>{t.showSaveSuccess("Ficha Completada!")},error:()=>{t.showSaveError()}})})})}ngAfterViewInit(){}static{this.\u0275fac=function(e){return new(e||a)}}static{this.\u0275cmp=m({type:a,selectors:[["app-survey"]],standalone:!0,features:[p],decls:1,vars:1,consts:[[2,"min-height","100dvh",3,"model"]],template:function(e,t){e&1&&c(0,"survey",0),e&2&&n("model",t.survey)},dependencies:[y,l]})}};g=h([f()],g);export{g as SurveyComponent};
