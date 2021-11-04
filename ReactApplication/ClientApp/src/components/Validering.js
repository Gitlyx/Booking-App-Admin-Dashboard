export const validerPris = (pris) => {
    if(pris === ""){
        return false
    } else if (pris < parseInt(0)){
        return false;
    }
    return true;
}

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

  
    if (Date.parse(dagsDato) > Date.parse(tid)) {
        
      return false
    } else {
        
      return true
    }
  };