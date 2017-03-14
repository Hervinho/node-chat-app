const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  it('should add new User', () => {
    var userArray = new Users();
    var user = {
      id: '12',
      name: 'Hervinho',
      room: 'General'
    };

    var resultUser = userArray.addUser(user.id, user.name, user.room);
    expect(userArray.users).toEqual([user]);
  });
});
