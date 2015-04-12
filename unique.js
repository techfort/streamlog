function UniqueIndex(uniqueField) {
  this.field = uniqueField;
}

UniqueIndex.prototype = {
  keyMap: {},
  idMap: {},
  set: function (obj) {
    if (this.keyMap[obj[this.field]]) {
      throw new Error('Duplicate key for property ' + this.field);
    } else {
      this.keyMap[obj[this.field]] = obj;
      this.idMap[obj.$loki] = obj[this.field];
    }
  },
  get: function (key) {
    return this.keyMap[key];
  },
  byId: function (id) {
    return this.keyMap[this.idMap[id]];
  },
  update: function (obj) {
    if (this.idMap[obj.$loki] !== obj[this.field]) {
      var old = this.idMap[obj.$loki];
      this.set(obj);
      // make the old key fail bool test, while avoiding the use of delete (mem-leak prone)
      this.keyMap[old] = undefined;
    } else {
      this.keyMap[obj[this.field]] = obj;
    }
  },
  remove: function (key) {
    var obj = this.keyMap[key];
    this.keyMap[key] = undefined;
    this.idMap[obj.$loki] = undefined;
  },
  clear: function () {
    this.keyMap = {};
    this.idMap = {};
  }
};

module.exports = UniqueIndex;
