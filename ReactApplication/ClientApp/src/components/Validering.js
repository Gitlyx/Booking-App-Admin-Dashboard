export const validerDato = (tid) => {
  const idag = new Date();
  const år = idag.getFullYear();
  let mnd = idag.getMonth() + 1;
  let dato = idag.getDate();
  let timer = idag.getHours();
  let minutter = idag.getMinutes();

  if (mnd < 10) {
    mnd = "0" + mnd;
  }
  if (dato < 10) {
    dato = "0" + dato;
  }
  if (timer < 10) {
    timer = "0" + timer;
  }
  if (minutter < 10) {
    minutter = "0" + minutter;
  }

  let dagsDato = år + "-" + mnd + "-" + dato + "T" + timer + ":" + minutter;

  console.log(tid);
  if (Date.parse(dagsDato) > Date.parse(tid)) {
    console.log(tid);
    return false;
  } else {
    console.log(tid);
    return true;
  }
};

export const validerLogin = (props) => {
  if (!props.brukernavn || !props.passord) {
    props.setErrorMessage("Et eller flere felt er tomme.");
    props.setVariant("warning");
    console.log("Et eller flere felt er tomme.");
    return false;
  }
  return true;
};

export const validerNewTrip = (props) => {
  if (props.dagsreise) {
    console.log(props.dagsreise);
    if (!props.prisBarn || !props.prisVoksen) {
      props.setErrorMessage("Et eller flere felt er tomme.");
      props.setVariant("warning");
      return false;
    }
  }

  if (!props.dagsreise) {
    console.log(props.dagsreise);

    if (
      !props.prisBarn ||
      !props.prisVoksen ||
      !props.prisLugarStandard ||
      !props.prisLugarPremium
    ) {
      props.setErrorMessage("Et eller flere felt er tomme.");
      props.setVariant("warning");
      return false;
    }
  }

  return true;
};
