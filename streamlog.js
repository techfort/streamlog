(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {
  INSERT: 4919,
  UPDATE: 4920,
  DELETE: 4921,
  READ: 4160,
  REJECT: 4161
};

},{}],2:[function(require,module,exports){
'use strict';

var UniqueIndex = require('./unique'),
    EventType = require('./eventType');

function Collection() {}

Collection.prototype = {
  log: [],
  data: [],
  sorted: {},
  unique: {},
  exact: {},
  views: {},
  maintain: function maintain(record) {},
  processEvent: function processEvent(event) {},
  insert: function insert(record) {
    this.data.push(record);
    this.maintain(record);
  },
  update: function update(record) {},
  get: function get(recordId) {},
  by: function by(field, value) {}
};

function add(log, event) {
  if (!event) {
    return function (e) {
      log.push(e);
    };
  }
  log.push(event);
}

function StreamLog() {
  var log = [],
      collections = {};
  this.add = add(log);
  this.register = function (coll) {
    collections[coll.name] = coll;
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

// maintain indexes here

// do something with the event
// then process the indexes with process()

},{"./eventType":1,"./unique":3}],3:[function(require,module,exports){
'use strict';

function UniqueIndex(uniqueField) {
  this.field = uniqueField;
}

UniqueIndex.prototype = {
  keyMap: {},
  idMap: {},
  set: function set(obj) {
    if (this.keyMap[obj[this.field]]) {
      throw new Error('Duplicate key for property ' + this.field);
    } else {
      this.keyMap[obj[this.field]] = obj;
      this.idMap[obj.$loki] = obj[this.field];
    }
  },
  get: function get(key) {
    return this.keyMap[key];
  },
  byId: function byId(id) {
    return this.keyMap[this.idMap[id]];
  },
  update: function update(obj) {
    if (this.idMap[obj.$loki] !== obj[this.field]) {
      var old = this.idMap[obj.$loki];
      this.set(obj);
      // make the old key fail bool test, while avoiding the use of delete (mem-leak prone)
      this.keyMap[old] = undefined;
    } else {
      this.keyMap[obj[this.field]] = obj;
    }
  },
  remove: function remove(key) {
    var obj = this.keyMap[key];
    this.keyMap[key] = undefined;
    this.idMap[obj.$loki] = undefined;
  },
  clear: function clear() {
    this.keyMap = {};
    this.idMap = {};
  }
};

module.exports = UniqueIndex;

},{}]},{},[2]);
