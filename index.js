/**
 * show all properties of target
 * @param {*} target you want to dump
 * @param {*} depth dump depth, default -1, means dump all
 * @returns
 */
function dumpProps(target, depth = -1) {
  const P = "@@proto";
  function _(obj, ret, n) {
    if (!obj) {
      return;
    }

    Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj))
      .forEach((item) => {
        ret[String(item)] = Object.getOwnPropertyDescriptor(obj, item);
      });

    n && obj.__proto__ && _(obj.__proto__, (ret[P] = {}), n - 1);
  }

  const ret = {};
  _(target, ret, depth < 0 ? 0xff : depth);
  return ret;
}

export default dumpProps;
