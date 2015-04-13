let UniqueIndex = require('./unique'),
  EventType = require('./eventType'),
  Collection = require('./collection'),
  Broker = require('./broker');

function StreamLog(name) {
  let log = [],
    collections = {};

  return {
    id: name,
    add: add(log),
    get: () => {
      return log
    },
    register: register(collections),
    deregister: deregister(collections)
  };
}

function add(log, event) {
  if (!event) {
    return function (e) {
      log.push(e);
    };
  }
  log.push(event);
  console.log(log.get());
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



module.exports = {
  StreamLog, Broker, Collection
};
