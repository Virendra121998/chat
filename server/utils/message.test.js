const expect=require('expect');
var {m}=require('./message');
var {generatelocation}=require('./location');
describe('Generate message',()=>{
	it('should generate message',()=>{
        var result=m('virendra','Hi there');
        expect(result.from).toBe('virendra');
        expect(result.text).toBe('Hi there');
        expect(result.createdAt).toBeA('number');     
	});
});
describe('Generate location message',()=>{
	it('should generate location ',()=>{
		var res=generatelocation('virendra',15.234,23.4556);
		expect(res.from).toBe(	`virendra`);
		expect(res.url).toEqual(`https://www.google.com/maps?q=15.234,23.4556`);
	});
});
