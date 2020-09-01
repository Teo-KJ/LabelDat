const validate = (values) => {
  const errors = {};
  if (!values.picked) {
    errors.picked = "Required";
  }

  return errors;
};

export default validate;
