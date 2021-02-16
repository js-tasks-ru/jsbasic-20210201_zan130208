function camelize(str) {

  let arr = str.split("-");

  let newStr = "";

  for (let i = 0; i < arr.length; i++) {

    arr[i] = arr[i].toLowerCase();

    if(i > 0) {
      let upperCaseMod = arr[i].charAt(0).toUpperCase();

      arr[i] = upperCaseMod + arr[i].slice(1);

    }

    newStr += arr[i];

  }

  alert (newStr);
  return newStr;
}

alert (camelize(""));
