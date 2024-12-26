function decamelize(string) {
  if (!string) {
    return string;
  }

  let result = string[0];

  for (let i = 1; i < string.length; i++) {
    if (string[i].toUpperCase() === string[i]) {
      result += ` ${string[i].toLowerCase()}`;
    } else {
      result += string[i];
    }
  }

  return result;
}

export {decamelize}
