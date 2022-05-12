const minLength = (min) => {
  return (value) => value.length > min;
};

const maxLength = (max) => {
  return (value) => value.length < max;
};

const minMaxLength = (min, max) => {
  return (value) => value.length > min && value.length < max;
};


const isDate = (value) => {
  return !isNaN(new Date(value))
}

module.exports = {minLength, maxLength, minMaxLength, isDate};
