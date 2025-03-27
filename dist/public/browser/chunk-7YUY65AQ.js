function D(e=new Date){let n=e.getDay(),a=new Date(e.setDate(e.getDate()-(n===0?6:n-1))),t=new Date(a);return t.setDate(t.getDate()+6),{startOfWeek:a,endOfWeek:t}}export{D as a};
