export const getSerries = (message: number[]) => {
  const serries: (typeof message)[] = [];
  let value: number;
  message.forEach((m, index) => {
    if (index === 0) {
      value = m;
      serries.push([]);
    }
    if (value === m) serries[serries.length - 1].push(value)
    else {
      value = m;
      serries.push([]);
      serries[serries.length - 1].push(value)
    }
  });

  return serries;
};