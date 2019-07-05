var moment=require('moment');
var m=(from,text)=>{
return {
	from:from,
	text:text,
	createdAt:moment().valueOf()
};
};

module.exports={m};
