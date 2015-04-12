let lib = require('./index');
console.log(lib);
let broker = lib.Broker(),
  streamlog = lib.StreamLog('TestLog'),
  users = streamlog.Collection('users', 'joe');

let user = {
  username: 'joe',
  fullname: 'Joe Minichino'
};

broker.connect(streamlog, users);
users.insert(user);
