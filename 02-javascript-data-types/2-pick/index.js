/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const argList = Object.entries(fields);
  const resObj = {};
  argList.forEach(elem => {
    resObj[elem[1]] = obj[elem[1]];
  })
  return resObj;
};
