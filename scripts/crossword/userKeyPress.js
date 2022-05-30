$(document).ready(function () {
  $("input:text").keyup(function () {
    var letterInput = false;
    $.each(keyboardDiscriminatorArray, function (index, value) {
      // alert("value = " + value);
      if (event.which === value) {
        letterInput = true;
        trafficLight = "green";
        $("#trafficLightDisplay").html("traffic light = " + trafficLight);
        $("#inputCellNo").append(userCellClickIndex);
        //alert("letterInput = " + letterInput);
        //acrossOrDownResult = $.parseHTML(acrossOrDownResult);
        if (acrossOrDownResult.length === 4) {
          $().CompareArrays("down", true);
        } else {
          $().CompareArrays("right", true);
        }

        return false;
      }
    });
    if (letterInput === false) {
      if (event.which == 9) {
        wantedClueNumber = $(this).prev().html();
        // $(this).clueFocusing(wantedClueNumber);
        // tab key
        return; // tab key
      } else if (event.which === 38) {
        $().CompareArrays("up", false);
      } else if (event.which === 40) {
        $().CompareArrays("down", true);
      } else if (event.which === 37) {
        $().CompareArrays("left", false);
      } else if (event.which === 39) {
        $().CompareArrays("right", true);
      } else if (event.which === 8) {
        // backspace
        if (acrossOrDownResult === "Across") {
          $().moveCursorBack(xValue, yValue);
        } else if (acrossOrDownResult === "Down") {
          $().moveCursorUp(xValue, yValue);
        }
        // backspace
      } else if (event.which === 13) {
        // enter key
        // cursorPositionWithinAnswer = cursorPositionWithinAnswer + 1;
        // var selectNextCell = $(xRows[reqResult]);
        // enterKey
      }
      // alert("event.which = " + event.which);

      // alert(" back in keydown returned from unexpected key press");
    } else if (letterInput === true) {
      //  alert("letterInput + direction = " + acrossOrDownResult);
      //$(this).css("background-color", "white");
      //$(this).blur();
    }
    //alert("end of key down");
  });

  trafficLight = "red";
  $("#trafficLightDisplay").html("traffic light = " + trafficLight);
  //alert("hhh");
  $("input").on("keyup", function () {
    if (acrossOrDownResult === "Across") {
      alert("move across");
      matchedIndex++;
      var nextCell = user_selected_across_answer_cells[matchedIndex];
      alert("nextCell == " + nextCell + matchedIndex);
      $(nextCell).children(".letterInput").focus();
      userCellClickIndex++;
    }
    if (acrossOrDownResult === "Down") {
      alert("move down " + matchedIndex);
      matchedIndex++;
      var nextCell = user_selected_down_answer_cells[matchedIndex];
      alert("nextCell == " + nextCell + matchedIndex);
      $(nextCell).children(".letterInput").focus();
      userCellClickIndex++;
    }
  });
});

$.fn.CompareArrays = function (requestedDirection, forwards) {
  var userMomentum = forwards;
  $.each(path_to_all_cells_columns, function (index, value) {
    var getPath = $(value).children(".letterInput");
    // $(getPath).attr("value", index);
  });
  var remainder = userCellClickIndex % 15;
  var devisor = Math.floor(userCellClickIndex / 15);
  var altIndexRef = devisor + remainder * 15;
  $("#altInputCellNo").html("userClick Cell No. Rows = ");
  $("#altInputCellNo").append(altIndexRef);
  alert(
    "requestedDirection = " +
      requestedDirection +
      " userMomentum = " +
      userMomentum +
      "userCellClickIndex = " +
      userCellClickIndex
  );

  if (userMomentum === true) {
    // alert("true working");
    if (requestedDirection === "right") {
      alert("right working");
      var colsOffSet = 15;
      var rowsOffSet = 1;
    }
    if (requestedDirection === "down") {
      //  alert("down working");
      var colsOffSet = 1;
      var rowsOffSet = 15;
    }
  } else {
    if (requestedDirection === "left") {
      // alert("going left");
      var colsOffSet = -15;
      var rowsOffSet = -1;
    }
    if (requestedDirection === "up") {
      var colsOffSet = -1;
      var rowsOffSet = -15;
    }
  }

  var adjustedUserCellClickIndex15 = userCellClickIndex + colsOffSet;
  var getXValuePath = path_to_all_cells_columns[adjustedUserCellClickIndex15];
  var getXValue = $(getXValuePath).children(".xNumberInCell").html();
  var altIndexRef1 = altIndexRef + rowsOffSet;
  var getYValuePath = path_to_all_cells_rows[altIndexRef1];
  var getYValue = $(getYValuePath).children(".yNumberInCell").html();
  alert(
    "colsOffSet = " +
      colsOffSet +
      " rowsOffSet = " +
      rowsOffSet +
      " getXValue = " +
      getXValue +
      " getYValue = " +
      getYValue
  );
  if (getXValue === undefined || getYValue === undefined) {
    alert(" edge of puzzle illegal move");
    return false;
  }
  if (getXValue != "0" && getYValue != "0") {
    alert(" legal move ok to proceed");
  }
  if (getXValue === "0" && getYValue === "0") {
    alert("illegal move");
    return false;
  }
  var selectedCellXNumPath = path_to_all_cells_columns[userCellClickIndex];
  var xNumCompare = $(selectedCellXNumPath).children(".xNumberInCell").html();
  var yNumCompare = $(selectedCellXNumPath).children(".yNumberInCell").html();
  if (user_selected_down_answer_cells) {
    $.each(user_selected_down_answer_cells, function (index, value) {
      var ansXPath = $(value).children(".xNumberInCell").html();
      var ansYPath = $(value).children(".yNumberInCell").html();
      if (xNumCompare === ansXPath && yNumCompare === ansYPath) {
        matchedIndex = index;
        return false;
      }
    });
    if (user_selected_across_answer_cells) {
      $.each(user_selected_across_answer_cells, function (index, value) {
        alert(index);
        var ansXPath = $(value).children(".xNumberInCell").html();
        var ansYPath = $(value).children(".yNumberInCell").html();
        if (xNumCompare === ansXPath && yNumCompare === ansYPath) {
          matchedIndex = index;
          return false;
        }
      });
    }
    alert(
      "end of the line @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     user_selected_across_answer_cells = " +
        user_selected_across_answer_cells +
        " user_selected_down_answer_cells = " +
        user_selected_down_answer_cells +
        " userCellClickIndex = " +
        userCellClickIndex +
        " altIndexRef = " +
        altIndexRef +
        "cursor position in array = " +
        matchedIndex +
        "acrossOrDownResult = " +
        acrossOrDownResult
    );
  }
  alert("Ok to do something so lets decide to go ahead");
  /*
  if (user_selected_across_answer_cells.length > 0) {
    alert("move across");
    matchedIndex++;
    var nextCell = user_selected_across_answer_cells[matchedIndex];
    alert("nextCell == " + nextCell + matchedIndex);
    $(nextCell).children(".letterInput").focus();
  } else {
    alert("move down " + matchedIndex);
    matchedIndex++;
    var nextCell = user_selected_down_answer_cells[matchedIndex];
    alert("nextCell == " + nextCell + matchedIndex);
    $(nextCell).children(".letterInput").focus();
    /*
    $("input").on("focus", function (event) {
      e = jQuery.Event("click");
      jQuery("input").trigger(e);
      return false;
    });
    
  }
  */
  //return true;
};
