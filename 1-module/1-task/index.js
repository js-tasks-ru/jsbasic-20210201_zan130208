/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let res = 1;
  while(n>0) {
    res = res * n;
    n = n - 1;
  }
  return res;

}
