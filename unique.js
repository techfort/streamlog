function UniqueIndex(uniqueField) {
  let keyMap = {},
    idMap = {};

  return {
    field: uniqueField,
    set: function (obj) {
      if (keyMap[obj[this.field]]) {
        throw new Error('Duplicate key for property ' + this.field);
      } else {
        keyMap[obj[this.field]] = obj;
        idMap[obj.$loki] = obj[this.field];
      }
    },
    get: function (key) {
      return keyMap[key];
    },
    byId: function (id) {
      return keyMap[idMap[id]];
    },
    update: function (obj) {
      if (idMap[obj.$loki] !== obj[this.field]) {
        var old = idMap[obj.$loki];
        this.set(obj);
        // make the old key fail bool test, while avoiding the use of delete (mem-leak prone)
        keyMap[old] = undefined;
      } else {
        keyMap[obj[this.field]] = obj;
      }
    },
    remove: function (key) {
      var obj = keyMap[key];
      keyMap[key] = undefined;
      idMap[obj.$loki] = undefined;
    },
    clear: function () {
      keyMap = {};
      idMap = {};
    }
  };
}
module.exports = UniqueIndex;
