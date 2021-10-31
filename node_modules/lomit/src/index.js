export default function omit(obj = {}, props = []) {
  obj = {...obj};
  props.forEach((prop) => {
    obj.hasOwnProperty(prop) && delete(obj[prop]);
  });

  return obj;
}
