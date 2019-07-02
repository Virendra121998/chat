const path=require('path');
const publicpath=path.join(__dirname+'./../public');
const express=require('express');
const hbs=require('hbs');
var app=express();
app.use(express.static(publicpath));
app.set('view engine','hbs');

app.listen(3000,()=>{
	console.log('Started app om port 3000');
});
