export default class ArraySchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value) === true);
  }

  allIntegers() {
    const validator = (arr) => arr.every((item) => Number.isInteger(item));
    return new ArraySchema([...this.validators, validator]);
  }

  custom(condition) {
    const validator = (arr) => arr.every((item) => condition(item));
    return new ArraySchema([...this.validators, validator]);
  }
}
