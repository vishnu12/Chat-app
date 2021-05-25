

let users=[]

module.exports={
    addUser:function(id,name,room) {
        let user={id,name,room}
        users.push(user)
        return {user}
    },
    roomData:function(room){
        let members=users.filter(user=>user.room===room)
        return {members}
      },

      findUser:function(id) {
        let index=users.findIndex(user=>user.id===id)
        if(index!==-1){
            return users[index]
        }
    },
    removeUser:function(id){
     let index=users.findIndex(user=>user.id===id)
     if(index !== -1) return users.splice(index, 1)[0];
    }

}

