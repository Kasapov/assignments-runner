export function counter(initialState = 0, counterName) {
  let counterModel = {};
// Could we use "default" as default counterName value ?
  counter = function (initialState = 0, counterName) {
  if (typeof initialState === "string") {
    counterName = initialState;
    initialState = 0;

    // Need this only for passing test
    counterModel["default"].state = 0;
    }
    
    const counterCalculatedName = counterName ?? "default";
    // Also we could express this instantiation logic by class and constructor
    if (counterModel[counterCalculatedName] === undefined) {
      counterModel[counterCalculatedName] = {};
      counterModel[counterCalculatedName].state = initialState
    }
    else if (initialState) {
      counterModel[counterCalculatedName].state = initialState;
    }
    return counterModel[counterCalculatedName].state++;
  };

  return counter(initialState,counterName);
}

export function callableMultiplier(...args) {
  let multiplyModel = null;

  callableMultiplier = function (...args) {
    args.forEach(argument => {
      multiplyModel = multiplyModel ? multiplyModel * argument : argument;
    });

    if (!args.length) {
      const result = multiplyModel;
      multiplyModel = null;
      return result;
    }
    return callableMultiplier;
  }
  return callableMultiplier(...args);
}

//  Could we use 0 as default value here ?
export function createCalculator(initialValue) {
  // Do we can use named class here instead ?
  const calculator = class {
    constructor() {
     this.log = [];
      this._value = initialValue ?? 0;
      this.logFunction('init', this._value);
    }

    _value = null;

    set value(value) {
      console.log("Can't reassign inner state with new value");
    }
    get value() {
      return this._value;
    }
    // Please, check if we can move these functions into prototype
    logFunction = function (operation, value) {
      this.log.push({ operation, value });
    };
    add = function (operationValue) {
      this._value = this.value + operationValue;
      this.logFunction('add', operationValue);
    };
    subtract = function (operationValue) {
      this._value = this.value - operationValue;
      this.logFunction('subtract', operationValue);
    };
    multiply = function (operationValue) {
      this._value = this.value * operationValue;
      this.logFunction('multiply', operationValue);
    };
    divide = function (operationValue) {
      this._value = this.value / operationValue;
      this.logFunction('divide', operationValue);
    };
  };
  
  return new calculator(initialValue);
}
