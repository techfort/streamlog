function Collection(name, client) {
  let name = name,
    client = client,
    log = [],
    snapshots = [],
    sorted = {},
    unique = {},
    exact = {},
    views = {};

  return {
    insert: function (record) {
      genInsertEvent(name, client, data);
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
