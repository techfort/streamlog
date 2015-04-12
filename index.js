function add(log, event) {
  if (!event) {
    return function (e) {
      log.push(e);
    };
  }
  log.push(event);
}

function Collection() {}

Collection.prototype = {
  data: [],
  sorted: {},
  unique: {},
  exact: {},
  views: {},
  maintain: function (record) {
    // maintain indexes here
  },
  processEvent: function (event) {
    // do something with the event
    // then process the indexes with process()
  },
  insert: function (record) {
    this.data.push(record);
    this.maintain(record);
  },
  update: function (record) {

  },
  get: function (recordId) {

  }
}


function StreamLog() {
  var log = [],
    collections = {};
  this.add = add(log);
  this.register = function (coll) {
    collections[coll.name] = coll;
  };
}
