import _ from 'lodash';

export default class ObjectSchema {
  constructor(shapes) {
    this.validators = shapes;
  }

  shape(fields) {
    return new ObjectSchema(fields);
  }

  // validation scheme
  // const schema = v.object().shape({
  //   num: v.number(),
  //   obj: {
  //     array: v.array().allIntegers(),
  //     innerObj: {
  //       num: v.number(),
  //       deepestObj: {
  //         num: v.number()
  //       }
  //     }
  //   }
  // });

  // value to validate
  // { num: 54, obj: { array: [1, 2], innerObj: { num: 2, deepestObj: { num: 5 }}} }
  isValid(value) {
    // keys = [ num, obj ]
    const keys = Object.keys(value);
    if (keys.length !== Object.keys(this.validators).length) {
      return false;
    }

    const iter = (obj, key, schema) => {
      // obj = { array: [1, 2], innerObj: { num: 2, deepestObj: { num: 5 }}}
      if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
        return schema[key].isValid(obj);
      }
      const keys = Object.keys(obj);
      const validator = schema[key];
      return keys.map((key) => iter(obj[key], key, validator));
    };

    // 0: key = num, value[num] = 54
    // 1: key = obj, value[obj] = { array: [1, 2], innerObj: { num: 2, deepestObj: { num: 5 }}}
    const test = _.flattenDeep(keys.map((key) => iter(value[key], key, this.validators)))
    .every((val) => val);
    console.log(test)

    return _.flattenDeep(keys.map((key) => iter(value[key], key, this.validators)))
      .every((val) => val);
  }
}
