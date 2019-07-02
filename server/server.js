const path=require('path');
const publicpath=path.join(__dirname+'./../public');
const express=require('express');
const hbs=require('hbs');
const port=process.env.PORT||3000;
var app=express();
app.use(express.static(publicpath));
app.set('view engine','hbs');

app.listen(port,()=>{
	console.log(`Started app on port ${port}`);
});
