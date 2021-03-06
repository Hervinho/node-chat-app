class Users{
  constructor (){
    this.users = [];
  }
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    //first, find user to be removed
    var userToRemove = this.getUser(id);

    //if user was found
    if(userToRemove){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return userToRemove;
  }
  getUser(id){
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList(room){
    //get users of a chat room.
    var users = this.users.filter((user) => user.room === room);

    //get users' names by converting array of objects into array of strings
    var userNamesArray = users.map((user) => user.name);

    return userNamesArray;
  }
}

module.exports = {Users};
