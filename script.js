$(document).ready(function () {
    var date = moment();
    var block = $("#time-blocks");
  
    $("#currentDay").text(date.format("dddd MMM D, YYYY"));
  
    block.on("click", ".saveBtn", function (event) {
      var hour = event.target.parentElement;
      localStorage.setItem(hour.id, hour.children[1].value);
    });
  
    function init() {
      var currentTime = moment().hour();
  
      for (var i = 9; i <= 17; i++) {
        var newDiv = $("<div>");
        var hourLabel = "hour-" + i;
        newDiv.attr("id", hourLabel);
  
        if (currentTime > i) {
          newDiv.addClass("row time-block past");
        } else if (currentTime === i) {
          newDiv.addClass("row time-block present");
        } else {
          newDiv.addClass("row time-block future");
        }
  
        $("<div>")
          .addClass("col-2 col-md-1 hour text-center py-3")
          .text(i > 12 ? i - 12 + "PM" : i + "AM")
          .appendTo(newDiv);
  
        $("<textarea>")
          .addClass("col-8 col-md-10 description")
          .attr("rows", "3")
          .val(localStorage.getItem(hourLabel))
          .appendTo(newDiv);
  
        $("<button>")
          .addClass("btn saveBtn col-2 col-md-1")
          .attr("aria-label", "save")
          .append('<i class="fas fa-save" aria-hidden="true"></i>')
          .appendTo(newDiv);
  
        block.append(newDiv);
      }
    }
  
    init();
  });
  