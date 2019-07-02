const expect=require('expect');
var {m}=require('./message');

describe('Generate message',()=>{
	it('should generate message',()=>{
        var result=m('virendra','Hi there');
        expect(result.from).toBe('virendra');
        expect(result.text).toBe('Hi there');
        expect(result.createdAt).toBeA('number');     
	});
});