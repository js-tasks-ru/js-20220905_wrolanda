/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const compareFn = (str1, str2) =>
    str1.localeCompare(str2, ['ru', 'en'], {caseFirst: "upper"});

  return [...arr].sort((str1, str2) => {
    if (param === 'asc') {
      return compareFn(str1, str2);
    } else if (param === 'desc') {
      return compareFn(str2, str1);
    }
  });
}
