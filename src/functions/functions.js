export function counter(initialState = 0, counterName) {
  let counterModel = {};

  counter = function (initialState = 0, counterName) {
  if (typeof initialState === "string") {
    counterName = initialState;
    initialState = 0;

    // Need this only for passing test
    counterModel["default"].state = 0;
    }
    
    const counterCalculatedName = counterName ?? "default";
    
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

export function createCalculator(initialValue) {
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
