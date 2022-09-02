const minLength = (min) => {
  return (value) => !value || value.length >= min;
};

const maxLength = (max) => {
  return (value) => !value || value.length <= max
};

const minMaxLength = (min, max) => {
  return (value) => !value || value.length >= min && value.length <= max;
};

const length = (valueLength) => {
  return (value) => value?.length === valueLength;
}

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

const isNumber = (value) => {
  return !isNaN(value);
}

const isHours = (value) => {
  if (value.length !== 4) {
    return false
  }
  if (isNaN(+value) || +value > 2359 || value.substring(2, 4) > 59 || value.substring(0, 2) > 23 || value.substring(0, 2) < 0 || value.substring(2, 4) < 0) {
    return false;
  }
  return true;
}

const cpf = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  var result = true;
  [9, 10].forEach(function (j) {
    var soma = 0, r;
    cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
      soma += parseInt(e) * ((j + 2) - (i + 1));
    });
    r = soma % 11;
    r = (r < 2) ? 0 : 11 - r;
    if (r != cpf.substring(j, j + 1)) result = false;
  });
  return result;
}

module.exports = {minLength, maxLength, minMaxLength, isDate, nonRequired, max, min, isHours, isNumber, length, cpf};
