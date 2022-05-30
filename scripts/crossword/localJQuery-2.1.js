// arrays
var across_answers_cells = [];
var down_answers_cells = [];
var path_to_clue_boxes = [];
var count_to15 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var path_to_all_cells_rows = [];
var path_to_all_cells_columns = [];
var paths_to_clue_numbers_in_cells = [];
var across_clues_numbers = [];
var down_clues_numbers = [];
var user_selected_down_answer_cells = [];
var user_selected_across_answer_cells = [];
//intergers
var indexStartNumber = 0;
var countDownToReset = 15;
var offSet = 0;
var userCellClickIndex = parseInt(0);
var goingDownColumnNumber = parseInt(0);
var goingAcrossRowNumber = parseInt(0);
var indexOffSet = parseInt(0);
var retrievedClueNumber = 0;
// ?
var findMatchingClueNumberPath = null;
//booleans
var startCountFromClueNumberCell = 0;
var downClueDetailsReq = 0;
var acrossClueDetailsReq = 0;
var matchedIndex;
//strings
var trafficLight = "red";

$(function () {
  path_to_all_cells_columns = $(".crosswordCell");
  down_answers_cells = $(".crosswordCell");

  $.each(path_to_all_cells_columns, function (index, value) {
    var cellIndexNumber = indexStartNumber + offSet; // 0 + 0
    indexStartNumber = indexStartNumber + 15; // pathtoCells in rows hence + 15
    countDownToReset--; // 15 - 0

    var cellPath = path_to_all_cells_columns[cellIndexNumber];
    path_to_all_cells_rows.push(cellPath);
    across_answers_cells.push(cellPath);

    if (countDownToReset == 0) {
      offSet++; // squence 15,30,45,..... 16,31,46,... etc.
      indexStartNumber = 0;
      countDownToReset = 15;
    }
  });

  paths_to_clue_numbers_in_cells = $(".clueNumberInCell");
  // end of CELL inspection --------------------------------------//

  // start of CLUE box inspection  --------/* gather clue data */--------//

  path_to_clue_boxes = $(".individualClueBox");
  pathToClueDirection = $(".clueDirection");

  across_clues_numbers = $("div:contains('Across')").find(".clueNumber");
  acrossCluesAnswersLength = $("div:contains('Across')").find(".answerLength");

  down_clues_numbers = $("div:contains('Down')").find(".clueNumber");
  downCluesAnswersLength = $("div:contains('Down')").find(".answerLength");

  //grid TABINDEX setup -- looks for clue numbers in grid and changes tabindex attr accordingly

  tabIndexElement = $(".clueNumberInCell:not(:empty)");

  $.each(tabIndexElement, function (index, value) {
    var elementContent = value;
    var tabValue = $(elementContent).html();
    $(this)
      .next()
      .attr("tabindex", tabValue * 15); // mutliple by 15 so as to seprate tabindex value
    var clueNumberCheck = value;
    var findClueNumberCheck = $(clueNumberCheck).html();
    /*
    if (findClueNumberCheck == startingCell) {
      $(clueNumberCheck).next().focus(); // focus 1 across
      wantedClueNumber = startingCell;
      $(clueNumberCheck).clueFocusing(wantedClueNumber);
    }
    */
  });

  // places paths to start cells in numeric order in array startCellsPaths

  $("input").click(function () {
    //alert("trafficLight = " + trafficLight);
    if (trafficLight === "green") {
      return false;
    }
    user_selected_across_answer_cells = [];
    user_selected_down_answer_cells = []; // clear existing instance of array

    var checkForClueNumber = $(this).prev();
    xValueData = $(checkForClueNumber).siblings(".xNumberInCell").html();
    yValueData = $(checkForClueNumber).siblings(".yNumberInCell").html();
    xValue = parseInt(xValueData);
    yValue = parseInt(yValueData);
    // calc array index by adjusting xNum and yNum
    rowsDown = xValue - 1;
    columnsAcross = yValue - 1;
    userCellClickIndex = rowsDown * 15 + columnsAcross;
    //alert("userCellClickIndex = " + userCellClickIndex);
    // check if word start if so get all clue details and highlight clue
    if (checkForClueNumber.html() > 0) {
      cursorPositionWithinAnswer = 1;
      retrievedClueNumber = checkForClueNumber.html();
      $().IterateDownClueNumbers(retrievedClueNumber);
      var idThisCell = path_to_all_cells_columns[userCellClickIndex]; // start from this cell
      var inputCellFoundAbove = $(idThisCell).children(".xNumberInCell").html();
      goingDownColumnNumber = parseInt(inputCellFoundAbove);
      startCountFromClueNumberCell = 1;
      if (downClueDetailsReq === 1) {
        acrossOrDownResult = "Down";
        $().IterateColumnsForwards();
      }
      $().IterateAcrossClueNumbers(retrievedClueNumber);
      idThisCell = path_to_all_cells_columns[userCellClickIndex];
      var inputCellFoundToLeft = $(idThisCell)
        .children(".yNumberInCell")
        .html();
      //alert("IN ONCLICK goingAcrossRowNumber = " + goingAcrossRowNumber);
      goingAcrossRowNumber = parseInt(inputCellFoundToLeft);
      if (acrossClueDetailsReq === 1) {
        acrossOrDownResult = "Across";
        $().IterateRowsForwards();
      }
      //$().getClueDetails(userSelectedClueNumber);
      // $().focusCell(this, cursorPositionWithinAnswer);
    } else {
      startCountFromClueNumberCell = 0;
      $().IdUserCellClick(checkForClueNumber);
    }
  });
});

$.fn.IdUserCellClick = function (checkForClueNumber) {
  // alert(userCellClickIndex);
  indexCellAbove = userCellClickIndex - 1;
  var idThisCell = path_to_all_cells_columns[indexCellAbove];
  var inputCellFoundAbove = $(idThisCell).children(".xNumberInCell").html();
  goingDownColumnNumber = parseInt(inputCellFoundAbove);
  if (goingDownColumnNumber > 0) {
    indexOffSet = -1;
    acrossOrDownResult = "Down";
    $().IterateColumnsBackwards();
  } else {
    alert("no cell above");
  }
  // probe cell left for existance
  indexCellLeft = userCellClickIndex - 15;
  idThisCell = path_to_all_cells_columns[indexCellLeft];
  var inputCellFoundToLeft = $(idThisCell).children(".yNumberInCell").html();
  goingAcrossRowNumber = parseInt(inputCellFoundToLeft);

  if (goingAcrossRowNumber > 0) {
    indexOffSet = -15;
    acrossOrDownResult = "Across";
    $().IterateRowsBackwards();
  } else {
    alert("no cell to the left");
  }
  //$().CompareArrays();
};

$.fn.IterateColumnsBackwards = function () {
  //alert("iterate Columns backwards");
  if (trafficLight === "green") {
    return false;
  }
  var indexMinusOne = userCellClickIndex;
  $.each(count_to15, function (index, value) {
    var idThisCell = path_to_all_cells_columns[indexMinusOne];
    indexMinusOne--;
    xNumData = $(idThisCell).children(".xNumberInCell").html();
    inputBoxFound = parseInt(xNumData);
    if (inputBoxFound === goingDownColumnNumber) {
      user_selected_down_answer_cells.push(idThisCell);
    } else {
      $("#cursorPositionCounter").html(
        "cursor position in answer = " + user_selected_down_answer_cells.length
      );
      user_selected_down_answer_cells.reverse();
      var findClueNumber = user_selected_down_answer_cells[0];
      //alert("findClueNumber = " + findClueNumber);
      retrievedClueNumber = $(findClueNumber)
        .children(".clueNumberInCell")
        .html();
      $().IterateDownClueNumbers(retrievedClueNumber);
      return false;
    }
  });
  if (thisCluesAnswersLengthNumber > user_selected_down_answer_cells.length) {
    $().IterateColumnsForwards();
  }
};

$.fn.IterateColumnsForwards = function () {
  //alert("iterate columns forwards " + acrossOrDownResult);
  if (trafficLight === "green") {
    return false;
  }
  if (startCountFromClueNumberCell === 0) {
    indexPlusOne = userCellClickIndex + 1;
  } else {
    indexPlusOne = userCellClickIndex;
  }
  $.each(count_to15, function (index, value) {
    var idThisCell = path_to_all_cells_columns[indexPlusOne];
    indexPlusOne++;
    xNumData = $(idThisCell).children(".xNumberInCell").html();
    inputBoxFound = parseInt(xNumData);

    if (inputBoxFound === goingDownColumnNumber) {
      user_selected_down_answer_cells.push(idThisCell);
    } else {
      return false;
    }
  });
  $("#inputCellNo").html("userClick Cell No. Cols");
  $("#inputCellNo").append(userCellClickIndex);
};

$.fn.IterateRowsBackwards = function () {
 // alert("iterate rows backwards");
  if (trafficLight === "green") {
    return false;
  }
  var indexMinusFifteen = userCellClickIndex;
  $.each(count_to15, function (index, value) {
    var idThisCell = path_to_all_cells_columns[indexMinusFifteen];
    $.each(count_to15, function (index, value) {
      indexMinusFifteen--;
    });
    yNumData = $(idThisCell).children(".yNumberInCell").html();
    inputBoxFound = parseInt(yNumData);
    if (inputBoxFound === goingAcrossRowNumber) {
      user_selected_across_answer_cells.push(idThisCell);
    } else {
      user_selected_across_answer_cells.reverse();
      var findClueNumber = user_selected_across_answer_cells[0];
      retrievedClueNumber = $(findClueNumber)
        .children(".clueNumberInCell")
        .html();
      $().IterateAcrossClueNumbers(retrievedClueNumber);
      return false;
    }
  });
  if (thisCluesAnswersLengthNumber > user_selected_across_answer_cells.length) {
    $().IterateRowsForwards();
  }
};

$.fn.IterateRowsForwards = function () {
 // alert("INSIDE iterate rows forwards + " + acrossOrDownResult);
  if (trafficLight === "green") {
    return false;
  }
  if (startCountFromClueNumberCell === 0) {
    indexPlusFifteen = userCellClickIndex + 15;
  } else {
    indexPlusFifteen = userCellClickIndex;
  }
  //var indexPlusFifteen = userCellClickIndex + 15;
  $.each(count_to15, function (index, value) {
    // alert("indexPlusFifteen = " + indexPlusFifteen);
    var idThisCell = path_to_all_cells_columns[indexPlusFifteen];
    indexPlusFifteen = indexPlusFifteen + 15;
    yNumData = $(idThisCell).children(".yNumberInCell").html();
    var inputBoxFound = parseInt(yNumData);
    if (inputBoxFound === goingAcrossRowNumber) {
      user_selected_across_answer_cells.push(idThisCell);
    } else {
      return false;
    }
  });
  $("#altInputCellNo").html("userClick Cell No. Rows");
  $("#altInputCellNo").append(altIndexRef);
  //alert("hello3 IterateRowsForwards");
};

$.fn.IterateDownClueNumbers = function (retrievedClueNumber) {
  $.each(down_clues_numbers, function (index, value) {
    findMatchingClueNumberPath = value;
    findMatchingClueNumber = $(findMatchingClueNumberPath).html();

    if (findMatchingClueNumber === retrievedClueNumber) {
      //var allClueBoxes = $(".individualClueBox");
      $.each(path_to_clue_boxes, function (index, value) {
        $(value).css("background-color", "#e1fcfd");
      });
      $(findMatchingClueNumberPath)
        .parent(".individualClueBox")
        .css("background-color", "teal");
      thisCluesAnswersLengthPath = downCluesAnswersLength[index];
      thisCluesAnswersLengthString = $(thisCluesAnswersLengthPath).html();
      var numCon = thisCluesAnswersLengthString.split(",");
      if (numCon.length > 1) {
        var lengthOfAnswer = parseInt(0);
        $.each(numCon, function (index, value) {
          lengthOfAnswer = lengthOfAnswer + parseInt(value);
        });
        thisCluesAnswersLengthString = lengthOfAnswer;
      }
      thisCluesAnswersLengthNumber = parseInt(thisCluesAnswersLengthString);
      downClueDetailsReq = 1;
      return false;
    } else {
      //alert("no down clue required");
      downClueDetailsReq = 0;
      return true;
    }
  });
};

$.fn.IterateAcrossClueNumbers = function (retrievedClueNumber) {
  $.each(across_clues_numbers, function (index, value) {
    findMatchingClueNumberPath = value;
    findMatchingClueNumber = $(findMatchingClueNumberPath).html();
    //alert("findMatchingClueNumber + " + findMatchingClueNumber);
    if (findMatchingClueNumber === retrievedClueNumber) {
      $.each(path_to_clue_boxes, function (index, value) {
        $(value).css("background-color", "#e1fcfd");
      });
      $(findMatchingClueNumberPath)
        .parent(".individualClueBox")
        .css("background-color", "teal");
      thisCluesAnswersLengthPath = acrossCluesAnswersLength[index];
      thisCluesAnswersLengthString = $(thisCluesAnswersLengthPath).html();

      var numCon = thisCluesAnswersLengthString.split(",");
      if (numCon.length > 1) {
        var lengthOfAnswer = parseInt(0);
        $.each(numCon, function (index, value) {
          lengthOfAnswer = lengthOfAnswer + parseInt(value);
        });
        thisCluesAnswersLengthString = lengthOfAnswer;
      }
      thisCluesAnswersLengthNumber = parseInt(thisCluesAnswersLengthString);
      acrossClueDetailsReq = 1;
      return false;
    } else {
      acrossClueDetailsReq = 0;
      return true;
    }
  });
};
