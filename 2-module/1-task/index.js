/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let totalSalary = 0;

  for (let amount in salaries) {
    let gross = typeof salaries[amount] === "number" && Number.isFinite(salaries[amount]);

    if (gross) {
      totalSalary += salaries[amount];
    }
  }
  return totalSalary;
};
