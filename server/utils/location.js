var moment=require('moment');
var generatelocation= function(from,latitude,longitude){
	return {
		from,
		u:`https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	};
};
module.exports={generatelocation};