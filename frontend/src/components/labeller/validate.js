const validate = (values, taskIndex) => {
  let errors = { picked: [] };

  // Radio Button
  if (!values.picked[taskIndex]) {
    errors.picked[taskIndex] = "Required";
  }

  // Checkbox
  if (
    Array.isArray(values.picked[taskIndex]) &&
    !values.picked[taskIndex].length
  ) {
    errors.picked[taskIndex] = "Required";
  }

  if (!errors.picked.length) errors = {};

  return errors;
};

export default validate;
