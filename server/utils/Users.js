class User{
	constructor(){
		this.users=[];
	}
    addUser(id,name,room)
    {
    	var user={id,name,room};
    	this.users.push(user);
    	return user;
    }
    removeUser(id){
    	var user=this.getUser(id);
    	if(user)
    		this.users=this.users.filter((u)=>u.id!==id);
    	return user;
    }
    getUser(id){
    	var user=this.users.filter((u)=>u.id===id);
    	return user[0];
    }
    getUserList(room){
    	var user=this.users.filter((u)=>u.room===room);
    	var namesArray=user.map((u)=>u.name);
    	return namesArray;
    }
}
module.exports={User};