/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const argList = Object.entries(fields);
  const resObj = Object.assign({}, obj);
  argList.forEach(elem => {
    delete resObj[elem[1]];
  })
  return resObj;
};
