function getMinMax(str) {

  let strSpaces = str.split(' ').join();
  let itComma = strSpaces.split(',');
  let onlyNum = itComma
    .filter((item) => item !== '' && isFinite(item));

  let max = Math.max(...onlyNum);
  let min = Math.min(...onlyNum);

  return {min, max};

}
