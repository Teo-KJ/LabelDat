const validate = (values, taskIndex) => {
  let errors = { picked: [] };

  if (!values.picked[taskIndex]) {
    errors.picked[taskIndex] = "Required";
  }

  if (!errors.picked.length) errors = {};

  return errors;
};

export default validate;
