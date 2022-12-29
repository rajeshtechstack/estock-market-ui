let _obj = {};

export const setGlobal = (obj) => {
  //console.log("Test Global :",Object.assign(_obj, obj))
  // console.log("Test Global 1:",_obj)
  Object.assign(_obj, obj);
};
export const getGlobal = (varName) => {
  if (_obj[varName] !== undefined) {
    return _obj[varName];
  } else {
    return null;
  }
};
