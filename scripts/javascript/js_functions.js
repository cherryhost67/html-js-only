function iterateDownClueArray() {
  //for (let i = 1; i < 5; i++) {
  //console.log(i);
  //alert("AnsLength = " + i);
  //}
  var direction = "down";

  /*alert(
    "clue found = " +
      clueNumberFound +
      direction +
      " length = " +
      AnsLength +
      " pathToWantedClueNoInCell = " +
      pathToWantedClueNoInCell +
      " pathToWantedClueNoInCellIndex = " +
      pathToWantedClueNoInCellIndex +
      " yNum = " +
      yNum +
      " xNum = " +
      xNum
  );
*/
  //var k = "down";
  //var i = clueNumberFound;
  //eval("var " + k + i + "= " + i + ";");

  // alert("down2 = " + down2);
  /*
  for (let i = 1; i < AnsLength; i++) {
    alert("i = " + i);
  }
  */
  var k = "col";
  for (let i = 1; i < 15; i++) {
    eval("var " + k + i + "= [];");
    alert(col1);
  }
}
//var i = clueNumberFound;
//eval("var " + k + i + "= " + i + ";");

// alert("down2 = " + down2);
function acrossAnswerCells() {
  var dir = "across";

  for (let i = 1; i < 15; i++) {
    eval("var " + dir + i + "= [];");
    alert(across1);
  }
}
