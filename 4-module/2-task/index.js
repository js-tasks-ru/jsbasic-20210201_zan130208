function makeDiagonalRed(table) {

  for (let i = 0; i < table.rows.length; i++) {
    let element = table.rows[i];
    element.cells[i].style.backgroundColor = "red";
  }


  // table.rows [0].cells[0]
  // table.rows [1].cells[1]
  // table.rows [2].cells[2]
  // table.rows [3].cells[3]
  // table.rows [4].cells[4]

}
