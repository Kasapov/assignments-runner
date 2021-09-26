export function mapTo(array, mapValue) {
  if (typeof mapValue === "string") {
    return array.filter(value=>value[mapValue]).map(value => value[mapValue]);
  }

  return array.map((_, index) => index);
}

export function mapToProfile(array) {
  return array.map(value => {
    const name = value.name ?? null;
    const surname = value.surname ?? null;
    const age = value.age ?? null;
    const prototype = {
      get isOld() {
        return this.age > 50 
      },
       get isAnonymous() {
        return !Boolean(model.name) && !Boolean(model.surname)
      }
    }

    let fullname = null;
    if (name || surname) {
      fullname = (name ?? "_") + " " + (surname ?? "_");
    }

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
    return array.reduce((prev, curr) => prev + curr);
  }
   
  if (Array.isArray(reduceParams)) {
    let result = [];
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
        const haveAdditionalParams = typeof sortParams[i] === 'object';
        const descSorting = haveAdditionalParams && sortParams[i].order === 'desc';
        const paramField = haveAdditionalParams ? sortParams[i].field : sortParams[i];

        const localCompareResult = descSorting ? second[paramField] - first[paramField] : first[paramField] - second[paramField];

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
  let newArray = array;

  operationParams.forEach(operationParam => {
    const operationFunction = newArray[operationParam.operation].bind(newArray);
    const callback = operationParam.callback;
    const operationField = operationParam.property;
    let neededFunctionParams = {};

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
        neededFunctionParams = (first, second) => operationParam.sort === 'decs' ? second - first : first - second
        break;
      default:
        break;
    }

    newArray = callback ? operationFunction(arrayElement => callback(arrayElement[operationField]))
      : operationFunction(neededFunctionParams);

    if(operationParam.order && operationParam.order === 'desc'){
      newArray.reverse();
    }
  }
  );

  return newArray;
}
