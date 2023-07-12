$(document).ready(function() {
  var date = moment(); // Get the current date using Moment.js
  var block = $("#time-blocks"); // Select the element with the id "time-blocks"

  $("#currentDay").text(date.format("dddd MMM D, YYYY")); // Set the text of the element with id "currentDay" to the formatted current date

  block.on("click", ".saveBtn", function(event) {
    // Event handler for click events on elements with class "saveBtn" inside the "time-blocks" container
    var hour = event.target.parentElement; // Get the parent element of the clicked button
    localStorage.setItem(hour.id, hour.children[1].value); // Store the value of the second child element of the parent element in the browser's local storage using the parent element's id as the key
  });

  function updateColors() {
    // Update the colors of time blocks based on current time
    var currentTime = moment().hour();

    $(".time-block").each(function() {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      $(this).removeClass("past present future");

      if (currentTime > hour) {
        $(this).addClass("past");
      } else if (currentTime === hour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  function init() {
    // Initialization function
    for (var i = 9; i <= 17; i++) {
      var newDiv = $("<div>");
      var hourLabel = "hour-" + i;

      newDiv.attr("id", hourLabel);
      newDiv.addClass("row time-block");

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

    updateColors(); // Call the updateColors function to set initial colors
    setInterval(updateColors, 60000); // Update colors every minute
  }

  init(); // Call the initialization function
});
