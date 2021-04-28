export const convertStringToBoolean = (message: string): Boolean[] => {
  const codes = message.split("").map(s => s.charCodeAt(0));
  const binaryString = codes.map(c => {
    let binarySymb = c.toString(2);
    while (binarySymb.length < 8) binarySymb = "0" + binarySymb;
    return binarySymb;
  });

  const result: Boolean[] = [];
  binaryString.forEach(bS => bS.split("").forEach(bit => result.push(!!+bit)));
  return result;
}