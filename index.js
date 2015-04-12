let UniqueIndex = require('./unique'),
  EventType = require('./eventType'),
  Collection = require('./collection');

function StreamLog() {
  let log = [],
    collections = {};

  return {
    add: add(log),
    register: register(collections),
    deregister: deregister(collections),
    Collection: Collection
  };
}

function add(log, event) {
  if (!event) {
    return function (e) {
      log.push(e);
    };
  }
  log.push(event);
}

function register(collections, coll) {
  if (!coll) {
    return function (coll) {
      collections[coll.name] = coll;
    }
  }
  collections[coll.name] = coll;
}

function deregister(collections, coll) {
  if (!coll) {
    return function (coll) {
      collections[coll.name] = undefined;
    }
  }
  collections[coll.name] = undefined;
}



module.exports = StreamLog;
