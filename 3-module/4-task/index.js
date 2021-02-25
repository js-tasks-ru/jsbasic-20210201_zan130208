function showSalary(users, age) {

  let maxAge = users.filter ( user => user.age <= age );
  let nameBalance = maxAge.map ( user => user.name + ", " + user.balance);
  let result = nameBalance.join ("\n");

  return result;

};
