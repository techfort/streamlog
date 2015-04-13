let EventType = require('./eventType');

function Broker() {
  let connections = {};
  return Object.freeze({
    connect: function (log, collection) {
      connections[collection.id + '@' + log.id] = {
        log, collection
      };
      collection.on(EventType.INSERT, (record) => {
        log.add(record);
        console.log('Added record', record);
      });
    }
  });
}
module.exports = Broker;
