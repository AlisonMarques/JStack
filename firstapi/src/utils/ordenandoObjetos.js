
function ordenObjects(object, order) {
  object.sort((a, b) => {
    if (order === 'desc') {
      return a.id < b.id ? 1 : -1;
    }
    return a.id > b.id ? 1 : -1;
  })
  return object
}

module.exports = ordenObjects;