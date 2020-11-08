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

export function compare(item, searchText) {
  return _(item).toLower().includes(searchText.toLowerCase());
}

export function findTextInArray(source, searchText) {
  return _.filter(source, (item, index) => {
    console.log(index);
    if (isObject(item)) {
      return findInObject(item, searchText);
    }

    if (Array.isArray(item)) {
      return findTextInArray(item, searchText);
    }

    return compare(item, searchText);
  });
}

const arr = new Array(1000).fill(
  {
    a: {
      c: {
        b: new Array(2000).fill({}).map((_, index) => index === 0 ? {a: 'hello'} : {})
      },
      e: {
        test: '245',
        figma: {
          oter: false,
        }
      }
    }
  });

console.log(findTextInArray(arr, 'hello'));