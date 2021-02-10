/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {

  if(str.includes("1XbeT now") || str.includes("free xxxxx")) {
    return true;
  }
  else {
    return false;
  }

  // alert("str".includes("1xBet"));
  // alert("str".includes("XXX")); как вариант
  // // ваш код...
}
