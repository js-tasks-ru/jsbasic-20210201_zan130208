/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let res=1;
  while (n--)
  res *= n + 1
  return res;
}
alert(factorial(1, 3, 5));
