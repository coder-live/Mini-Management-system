module.exports = clone = function(obj) {
  let newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if( obj[key] != null && typeof obj[key] === "Object" ) {
        newObj[key]= clone(obj[key]);
      }else{
        newObj[key]= obj[key];
      }
    }
  }
  return newObj;
}