class Users{
  constructor (){
    this.users = [];
  }
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
}

module.exports = {Users};

/*
//ES6 class syntax
class Person{
  //constructor
  constructor (name, age){
    this.age = age;
    this.name = name;
  }

  //methods
  getUserDescription (){
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

var me = new Person('Hervinho', 26);
var desc = me.getUserDescription();
console.log(me.name, me.age);
console.log(desc);
*/
