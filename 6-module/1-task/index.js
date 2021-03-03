/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    let table = document.createElement ('table');
    let thead = document.createElement ('thead');
    thead.innerHTML = `<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>`;
    table.appendChild(thead);

    for (let row of rows) {
      let tbody = document.createElement ('tbody');
      let tr = document.createElement ('tr');

      let tdName = document.createElement ('td');
      tdName.innerHTML = row.name;
      tr.appendChild(tdName);

      let tdAge = document.createElement ('td');
      tdAge.innerHTML = row.age;
      tr.appendChild(tdAge);

      let tdSalary = document.createElement ('td');
      tdSalary.innerHTML = row.salary;
      tr.appendChild(tdSalary);

      let tdCity = document.createElement ('td');
      tdCity.innerHTML = row.city;
      tr.appendChild(tdCity);

      let tdBtn = document.createElement ('td');
      tdBtn.innerHTML = `<button>X</button>`;
      tr.appendChild(tdBtn);

      table.appendChild(tbody);
      tbody.appendChild(tr);
  }

    table.addEventListener( "click", (event) => event.target.closest('tr').remove());
    this.elem = table;
  }
}


// ////////////
// function createTable (rows) {
//   let TR = document.createElement ('tr');
//   for (let newRow of rows) {
//     TR.insertAdjacentHTML ('beforeEnd', `<td>${newRow.name}</td><td>${newRow.age}</td>`);

//     td.addEventListener ('click', event => {
//       if (event.target.tagName !== 'td') {
//         return;
//       }
//       event.target.style = 'display: none';
//     });

//     return TR;
//   }
// }
// document.body.append (createTable(rows));
/////////////
