const minLength = (min) => {
  return (value) => value.length > min;
};

const maxLength = (max) => {
  return (value) => value.length < max;
};

const minMaxLength = (min, max) => {
  return (value) => value.length > min && value.length < max;
};

module.exports = { minLength, maxLength, minMaxLength };
