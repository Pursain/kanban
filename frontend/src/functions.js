/**
 * Returns the x and y coordinate of the first element matching the filter
 * @param {Array} arr The array to search through
 * @param {Function} filter
 */
export function find2dCoord(arr, filter) {
  console.log(arr[0][0]);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (filter(arr[i][j])) return [i, j];
    }
  }
  return [-1, -1];
}

/**
 * Returns a new 2d array passing through a filter.
 * Shallow Copy. Object Only.
 * @param {Array} arr The array to search through
 * @param {Function} filter
 */
export function filter2d_shallowCopy(arr, filter) {
  let res = [...Array(arr.length)].map(_ => []);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!filter(arr[i][j])) res[i].push(arr[i][j]);
    }
  }
  return res;
}

/**
 * Inserts the object into a 2d array given x, y coordinates
 * @param {Array} arr
 * @param {Object} object
 * @param {Integer} x
 * @param {Integer} y
 */
export function insert2d(arr, object, x, y) {
  return [
    ...arr.slice(0, x),
    [...arr[x].slice(0, y), object, ...arr[x].slice(y, arr[x].length)],
    ...arr.slice(x + 1, arr.length)
  ];
}

export function deepcopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
