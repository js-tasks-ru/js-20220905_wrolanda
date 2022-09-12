/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

function sortArray(str1, str2) {
  return str1.localeCompare(str2, ['ru', 'en'], {caseFirst: "upper"});
}

export function sortStrings(arr, param = 'asc') {
  const arrCopy = Object.assign([], arr);
  arrCopy.sort(sortArray);
  if (param === 'desc') {
    arrCopy.reverse();
  }
  return arrCopy;
}
