type Color = string;

interface ColorWithMark {
  color: Color;
  busy: boolean;
}

export const takeColor = (colorsArray: ColorWithMark[], color?: Color): Color => {

  if (!color) {
    const firstFreeColorIndex = colorsArray.findIndex(c => !c.busy);
    colorsArray[firstFreeColorIndex].busy = true;
    return colorsArray[firstFreeColorIndex].color;
  }

  const existedColor = colorsArray.find(c => c.color === color);
  if (!existedColor) {
    colorsArray.push({ color, busy: true });
    return color;
  }

  // const colorIsBusy = existedColor.busy;
  // if (colorIsBusy) throw new Error(`Current color: ${color} has already busy!`);

  const index = colorsArray.findIndex(c => c.color === color);
  colorsArray[index].busy = true;
  return color;
}