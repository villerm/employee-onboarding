/**
 * @param object object with values
 * @param string object keys divided by dot
 * @description return nested object key value, using nested string as key
 */
function recompose(obj: any, string: string) {
  const parts = string.split(".");
  const newObj = obj[parts[0]];
  if (parts[1]) {
    parts.splice(0, 1);
    const newString = parts.join(".");
    return recompose(newObj, newString);
  }
  return newObj;
}
export default recompose;
