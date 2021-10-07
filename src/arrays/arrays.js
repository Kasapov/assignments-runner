export function mapTo(array, mapValue) {
  if (typeof mapValue === "string") {
    // Could we use reduce here ?
    return array.filter(value=>value[mapValue]).map(value => value[mapValue]);
  }

  return array.map((_, index) => index);
}

export function mapToProfile(array) {
  return array.map(value => {
    const name = value.name ?? null;
    const surname = value.surname ?? null;
    const age = value.age ?? null;
    // Could we use class here instead ?
    const prototype = {
      get isOld() {
        return this.age > 50 
      },
       get isAnonymous() {
        // Could we use .every((name) => !name) ?
        // Why we don't use this here ? 
        return !Boolean(model.name) && !Boolean(model.surname)
      }
    }

    // Could we move this logic into "prototype" ?
    let fullname = null;
    if (name || surname) {
      // Could we use join(" ") instead ?
      fullname = (name ?? "_") + " " + (surname ?? "_");
    }

    // Why we use let instead of const here ?
    let model = Object.create(prototype);
    model.name = name;
    model.surname = surname;
    model.fullname = fullname;
    model.age = age;

    return model;
  })
}

export function filterBy(array, filerValue) {
  switch (typeof filerValue) {
    case 'number':
      return array.filter(numberValue => numberValue >= filerValue);
    case 'string':
      return array.filter(stringValue => stringValue[filerValue])
    case 'object':
      const propertyName = filerValue.property;
      const filerCondition = filerValue.filterCb;
      return array.filter(objectValue => filerCondition(objectValue[propertyName]))
    default:
      return array;
  }
}

export function reduceTo(array, reduceParams) {
  if (!reduceParams) {
    // Should we use initial value here ?
    return array.reduce((prev, curr) => prev + curr);
  }
  
  // We could also check !Array.isArray(reduceParams) previously and make code less nested
  if (Array.isArray(reduceParams)) {
    // Could we move this into reducer initial value ?
    let result = [];
    // Could we use reduce instead ?
    reduceParams.forEach((param) => {
    const paramResult = array.reduce((prev, curr) => prev + curr[param],0)
     result.push(paramResult);
    })
    return result;
  }
  else {
    return array.reduce((prev, curr) => prev + curr[reduceParams],0);
  }
}

export function sort(array, sortParams) {
    if (!sortParams) {
    return array.sort((first,second)=>first - second);
  }
   
  if (Array.isArray(sortParams)) {
    return array.sort((first, second) => {
      for (var i = 0; i < sortParams.length; i++) {
        // There better use is/has/are for boolean variables
        const haveAdditionalParams = typeof sortParams[i] === 'object';
        const descSorting = haveAdditionalParams && sortParams[i].order === 'desc';
        const paramField = haveAdditionalParams ? sortParams[i].field : sortParams[i];

        const localCompareResult = descSorting ? second[paramField] - first[paramField] : first[paramField] - second[paramField];

// Do we actually need to ignore the equality by this way ?
        if (localCompareResult) {
          return localCompareResult;
        }
      }
    })
  }
  else {
    return array.sort((first, second) => first[sortParams] - second[sortParams]);
  }
}

export function complex(array, operationParams) {
  const supportedOperations = ["map", "filter", "sort", "reduce"];
  // Why do we need this reassignment ?
  let newArray = array;

  operationParams.forEach(operationParam => {
    // Do we really need the bind ?
    const operationFunction = newArray[operationParam.operation].bind(newArray);
    const callback = operationParam.callback;
    const operationField = operationParam.property;
    // Why the initial value is empty object ?
    let neededFunctionParams = {};

    // Do we really need this check ?
    if (!supportedOperations.some(value=>(value) === operationParam.operation)) {
      return newArray;
    }

    switch (operationParam.operation) {
      case 'map':
        neededFunctionParams = (value) => value[operationField];
        break;
      case 'reduce':
        neededFunctionParams = (prev, curr) => (prev[operationField] ?? prev) + curr[operationField];
        break;
      case 'sort':
        // Do we really need operationParam.sort === 'decs' this check ?
        neededFunctionParams = (first, second) => operationParam.sort === 'decs' ? second - first : first - second
        break;
      default:
        break;
    }

    newArray = callback ? operationFunction(arrayElement => callback(arrayElement[operationField]))
      : operationFunction(neededFunctionParams);

      // Could we check by this approach operationParam.order === 'desc' ?
    if(operationParam.order && operationParam.order === 'desc'){
      newArray.reverse();
    }
  }
  );

  return newArray;
}
