$(document).ready(function () {
    // Function to execute when the document is ready
  
    var date = moment(); // Get the current date using Moment.js
    var block = $("#time-blocks"); // Select the element with the id "time-blocks"
  
    $("#currentDay").text(date.format("dddd MMM D, YYYY")); // Set the text of the element with id "currentDay" to the formatted current date
  
    block.on("click", ".saveBtn", function (event) {
      // Event handler for click events on elements with class "saveBtn" inside the "time-blocks" container
      var hour = event.target.parentElement; // Get the parent element of the clicked button
      localStorage.setItem(hour.id, hour.children[1].value); // Store the value of the second child element of the parent element in the browser's local storage using the parent element's id as the key
    });
  
    function init() {
      // Initialization function
  
      var currentTime = moment().hour(); // Get the current hour using Moment.js
  
      for (var i = 9; i <= 17; i++) {
        // Loop from 9 to 17 (inclusive)
        var newDiv = $("<div>"); // Create a new <div> element
        var hourLabel = "hour-" + i; // Create an hour label
  
        newDiv.attr("id", hourLabel); // Set the id attribute of the new <div> element to the hour label
  
        if (currentTime > i) {
          newDiv.addClass("row time-block past"); // Add the "past" class if the current time is greater than the looped hour
        } else if (currentTime === i) {
          newDiv.addClass("row time-block present"); // Add the "present" class if the current time is equal to the looped hour
        } else {
          newDiv.addClass("row time-block future"); // Add the "future" class if the current time is less than the looped hour
        }
  
        $("<div>")
          .addClass("col-2 col-md-1 hour text-center py-3")
          .text(i > 12 ? i - 12 + "PM" : i + "AM")
          .appendTo(newDiv); // Create and append a <div> element with the hour label to the new <div> element
  
        $("<textarea>")
          .addClass("col-8 col-md-10 description")
          .attr("rows", "3")
          .val(localStorage.getItem(hourLabel))
          .appendTo(newDiv); // Create and append a <textarea> element with the value from the local storage to the new <div> element
  
        $("<button>")
          .addClass("btn saveBtn col-2 col-md-1")
          .attr("aria-label", "save")
          .append('<i class="fas fa-save" aria-hidden="true"></i>')
          .appendTo(newDiv); // Create and append a <button> element with a save icon to the new <div> element
  
        block.append(newDiv); // Append the new <div> element to the "time-blocks" container
      }
    }
  
    init(); // Call the initialization function
  });
  