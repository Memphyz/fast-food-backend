const minLength = (min) => {
  return (value) => value.length >= min;
};

const maxLength = (max) => {
  return (value) => value.length <= max;
};

const minMaxLength = (min, max) => {
  return (value) => value.length >= min && value.length <= max;
};


const isDate = (value) => {
  return !isNaN(new Date(value))
}

const nonRequired = (value) => {
  return !value;
}

const max = (maxValue) => {
  return (value) => {
    return value <= maxValue;
  }
}
const min = (minValue) => {
  return (value) => {
    return value > minValue;
  }
}

module.exports = {minLength, maxLength, minMaxLength, isDate, nonRequired, max, min};
