function isNil(value) {
  return value === null || value === undefined;
}

function isEmptyString(str) {
    return (!str || str.length === 0 );
}
function isArray(arr) {
  return Array.isArray(arr);
}

function checkIsNotValidParameters(a, b) {
  const isNullValue = isNil(a) || isNil(b);
  const isInfinityValue = a === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY || a === Number.NEGATIVE_INFINITY || b === Number.POSITIVE_INFINITY;
  const isEmptyStringParams = isEmptyString(a) || isEmptyString(b);
  const isNotANumber = isNaN(a) || isNaN(b);
  const isArrayParams = isArray(a) || isArray(b);

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

  if (isNotValid || b.some(isNil)) {
    return null
  } else {
    return Math.pow(base, degree)
  }
}
