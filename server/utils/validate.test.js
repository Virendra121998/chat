const expect=require('expect');
var check=require('./validate');
 describe('String Validation',()=>{
 	it('should return a string',()=>{
       var b=check('Virendra');
       expect(b).toBe(true);
 	});
 });