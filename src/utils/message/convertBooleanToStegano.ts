
export const convertBooleanToStegano = (message: Boolean[], bitPerCluster: number): number[] => {
  const steganoMessage = [];
  let currentStgValue = '';
  for (let i = 0; i < message.length; i++) {
    if (!(i % bitPerCluster)) {
      if (currentStgValue) steganoMessage.push(parseInt(currentStgValue, 2));
      currentStgValue = '';
    }
    currentStgValue += +message[i];
  }
  if (currentStgValue) {
    while (currentStgValue.length < bitPerCluster) currentStgValue += "0";
    steganoMessage.push(parseInt(currentStgValue, 2));
  }
  return steganoMessage;
}