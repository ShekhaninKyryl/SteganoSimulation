export const validateBinary = (binary: string): string => {
  return binary.replaceAll(/[^0|1]/g, "").match(/.{1,8}/g)?.join(" ") || "";
}