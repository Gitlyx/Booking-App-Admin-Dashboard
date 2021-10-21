const validering = (values) => {
  let errors = {};

  if (!values.brukernavn) {
    errors.brukernavn = "Mangler brukernavn";
  }
  if (!values.passord) {
    errors.passord = "Mangler passord";
  }
  return errors;
};

export default validering;
