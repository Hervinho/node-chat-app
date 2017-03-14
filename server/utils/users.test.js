const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var usersArray;

  beforeEach(() => {
    usersArray = new Users();
    usersArray.users = [{
      id: '1',
      name: 'Ironman',
      room: 'Marvel'
    },{
      id: '2',
      name: 'Batman',
      room: 'DC Comics'
    }, {
      id: '3',
      name: 'Superman',
      room: 'DC Comics'
    }];
  });

  it('should add new User', () => {
    var usersArray = new Users();
    var user = {
      id: '12',
      name: 'Hervinho',
      room: 'General'
    };

    var resultUser = usersArray.addUser(user.id, user.name, user.room);
    expect(usersArray.users).toEqual([user]);
  });

  it('should return names for DC Comics', () => {
    var roomName = 'DC Comics';
    var usersList = usersArray.getUserList(roomName);

    expect(usersList).toEqual(['Batman', 'Superman']);
  });

  it('should return names for Marvel', () => {
    var roomName = 'Marvel';
    var usersList = usersArray.getUserList(roomName);

    expect(usersList).toEqual(['Ironman']);
  });

  it('should find a user', () => {
    var id = '1';
    var user = usersArray.getUser(id);

    expect(user).toEqual(usersArray.users[0]);
  });

  it('should not find a user', () => {
    var id = '10';
    var user = usersArray.getUser(id);

    expect(user).toNotExist();
  });

  it('should remove a user', () => {
    var id = '1';
    var user = usersArray.removeUser(id);

    //ensure such user to be found.
    expect(user.id).toEqual(id);

    //ensure user was removed
    expect(usersArray.users).toNotInclude(user);
  });

  it('should not remove a user', () => {
    var id = '11';
    var user = usersArray.removeUser(id);

    //ensure such user not to be found.
    expect(user).toNotExist();

    //ensure usersArray has not changed.
    expect(usersArray.users.length).toEqual(3);
  });
});
