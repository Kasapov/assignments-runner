function isNil(value) {
  return value === null || value === undefined;
}

function isEmptyString(str) {
  // Can we reuse isNil function here, or we expect nullish value ? 
    return (!str || str.length === 0 );
}
// Do we really need separate function for built in functionality ?
function isArray(arr) {
  return Array.isArray(arr);
}

function checkIsNotValidParameters(a, b) {
  // Could we use .some here ? Ex: [a,b].some(isNil)
  const isNullValue = isNil(a) || isNil(b);
  // Could we move such logic into function ? 
  const isInfinityValue = a === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY || a === Number.NEGATIVE_INFINITY || b === Number.POSITIVE_INFINITY;
  const isEmptyStringParams = isEmptyString(a) || isEmptyString(b);
  const isNotANumber = isNaN(a) || isNaN(b);
  const isArrayParams = isArray(a) || isArray(b);

  // Could we use if else here instead ? (performance reasons)
  // Could we use .some here ? 
  return isNullValue || isInfinityValue || isEmptyStringParams || isNotANumber || isArrayParams;
}

export function add(a, b) {
  const isNotValid = checkIsNotValidParameters(a, b);
  
  if (isNotValid) {
    return null;
  }
  return a + b
}

export function subtract(a,b) {
  const isNotValid = checkIsNotValidParameters(a, b);

    if (isNotValid) {
    return null;
  }
  return a - b
}

export function complex(a, b) {
  let base = a[0] * a[1];
  let degree = b[0] / b[1];

  const isNotValid = checkIsNotValidParameters(base, degree);

  // Could we use ternary operator here? 
  if (isNotValid || b.some(isNil)) {
    return null
  } else {
    return Math.pow(base, degree)
  }
}
