export const scale = (
  input: number,
  fromLower: number,
  fromUpper: number,
  toLower: number,
  toUpper: number
) => {
  return (
    ((input - fromLower) * (toUpper - toLower)) / (fromUpper - fromLower) +
    toLower
  );
};
