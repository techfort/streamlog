let EventType = require('./eventType'),
  UniqueIndex = require('./unique');

function Collection(name, client) {
  let log = [],
    data = [],
    snapshots = [],
    sorted = {},
    unique = {
      id: UniqueIndex('id')
    },
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
      record.id = event.id;
      log.push(event);
      data.push(record);
      unique.id.set(record);
      this.emit(EventType.INSERT, event);
    },
    get: (value, field) => {
      let f = field || 'id';
      return unique[f].get(value);
    },
    on: function (eventName, callback) {
      console.log(eventName, listeners, listeners[eventName]);
      listeners[eventName].push(callback);
    }
  };

}

function generateEvent(type, channel, client, data) {
  return Object.freeze({
    id: `${channel}:${new Date().getTime()}~${client}`,
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
