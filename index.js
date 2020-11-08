const { findTextInArray } = require('./recursion');

const arr = [
  { name: "evge", surname: "ogo", n: 2 },
  {
    name: "niko",
    surname: "dva",
    z: new Date(),
    n: 4,
    read: {
      a: "zz",
      c: null
    },
    arr: [{ pi: "aaaa2" }, { joris: "vorn", arr: [{ be: "miaso" }] }]
  }
];

console.log(findTextInArray(arr, 'text'));