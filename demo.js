let {
  StreamLog, Broker, Collection
} = require('./index');
let broker = Broker(),
  streamlog = StreamLog('TestLog'),
  users = Collection('users', 'joe');

let user = {
  username: 'joe',
  fullname: 'Joe Minichino'
};

broker.connect(streamlog, users);
users.insert(user);
