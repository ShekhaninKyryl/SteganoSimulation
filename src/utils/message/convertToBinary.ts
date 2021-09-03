export const convertToBinary = (message: string): string =>
  message
    .split('')
    .map(char => {
      return ("000000000" + char.charCodeAt(0).toString(2)).substr(-8);
    })
    .join(' ');