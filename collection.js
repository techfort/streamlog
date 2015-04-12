let EventType = require('./eventType');

function Collection(name, client) {
  let log = [],
    data = [],
    snapshots = [],
    sorted = {},
    unique = {},
    exact = {},
    views = {},
    listeners = {
      ['' + EventType.INSERT]: []
    };

  return {
    id: name,
    client: client,
    emit: function (eventName, arg) {
      listeners[eventName].forEach((listener) => {
        listener(arg);
      });
    },
    insert: function (record) {
      let event = genInsertEvent(name, client, data);
      log.push(event);
      data.push(record);
      this.emit(EventType.INSERT, event);
    },
    on: function (eventName, callback) {
      console.log(eventName, listeners, listeners[eventName]);
      listeners[eventName].push(callback);
    }
  };

}

function generateEvent(type, channel, client, data) {
  return Object.freeze({
    type: type,
    channel: channel,
    client: client,
    data: data
  });
}

function genInsertEvent(channel, client, data) {
  return generateEvent(EventType.INSERT, channel, client, data);
}

function genUpdateEvent(channel, client, data) {
  return generateEvent(EventType.UPDATE, channel, client, data);
}

function genReadEvent(channel, client, data) {
  return generateEvent(EventType.READ, channel, client, data);
}

function genDeleteEvent(channel, client, data) {
  return generateEvent(EventType.DELETE, channel, client, data);
}

function genRejectEvent(channel, client, data) {
  return generateEvent(EventType.REJECT, channel, client, data);
}

module.exports = Collection;
