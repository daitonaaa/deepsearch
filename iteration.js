const _ = require("lodash");

const isObject = (source) => {
  return {}.toString.call(source) === "[object Object]";
};

function findInObject(object, searchText) {
  for (let key in object) {
    const current = object[key];
    if (isObject(current)) {
      const res = findInObject(current, searchText);
      if (res) {
        return true;
      }
      continue;
    }

    if (Array.isArray(current)) {
      const res = findTextInArray(current, searchText);
      if (res.length > 0) {
        return true;
      }
      continue;
    }

    const res = compare(current, searchText);
    if (res) {
      return true;
    }
  }

  return false;
}

function compare(item, searchText) {
  return _(item).toLower().includes(searchText.toLowerCase());
}

function findTextInArray(source, searchText) {
  return _.filter(source, (item) => {
    if (isObject(item)) {
      return findInObject(item, searchText);
    }

    if (Array.isArray(item)) {
      return findTextInArray(item, searchText);
    }

    return compare(item, searchText);
  });
}
