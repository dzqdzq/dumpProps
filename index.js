function stringify(obj, replacer, space, cycleReplacer) {
  function serializer(replacer, cycleReplacer) {
    const stack = [];
    const keys = [];
    if (!cycleReplacer) {
        cycleReplacer = (_key, value) =>
          stack[0] === value
            ? "[Circular ~]"
            : "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
    }
    return function(key, value) {
      if (typeof value === "bigint") {
        value = value.toString();
      }
      if (stack.length > 0) {
        const thisPos = stack.indexOf(this);
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
        if (cycleReplacer && ~stack.indexOf(value)) {
          value = cycleReplacer.call(this, key, value);
        }
      } else {
        stack.push(value);
      }
      if (!replacer) {
        return value;
      } else if (typeof replacer === "function") {
        return replacer.call(this, key, value);
      } else if (Array.isArray(replacer)) {
        return !key || replacer.includes(key) ? value : void 0;
      } else {
        return value;
      }
    };
  }
  
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), space != null ? space : void 0);
}

/**
 * show all properties of target
 * @param {*} target you want to dump
 * @param {*} depth dump depth, default -1, means dump all
 * @returns
 */
function dumpProps(target, filter = null, depth = -1) {
  const P = "@@proto";
  if(!filter){
    filter = (key, value) => {
      return true;
    };
  }
  function _(obj, ret, n) {
    if (!obj) {
      return;
    }

    Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj))
      .forEach((item) => {
        if(filter(String(item), obj[item])){
          ret[String(item)] = Object.getOwnPropertyDescriptor(obj, item);
        }
      });

    n && obj.__proto__ && _(obj.__proto__, (ret[P] = {}), n - 1);
  }

  const ret = {};
  _(target, ret, depth < 0 ? 0xff : depth);
  return ret;
}

export { dumpProps, stringify };
