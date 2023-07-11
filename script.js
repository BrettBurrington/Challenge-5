$(document).ready(function() {
    // Display the current day at the top of the calendar
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);
  
    // Load saved events from local storage
    loadSavedEvents();
  
    // Save button click event
    $(".saveBtn").on("click", function() {
      var time = $(this).data("time");
      var description = $(`.description[data-time=${time}]`).val().trim();
      saveEvent(time, description);
    });
  
    // Clear All button click event
    $(".clearBtn").on("click", function() {
      clearAllEvents();
    });
  
    // Function to save an event to local storage
    function saveEvent(time, description) {
      var events = JSON.parse(localStorage.getItem("events")) || {};
      events[time] = description;
      localStorage.setItem("events", JSON.stringify(events));
    }
  
    // Function to load saved events from local storage
    function loadSavedEvents() {
      var events = JSON.parse(localStorage.getItem("events")) || {};
      Object.keys(events).forEach(function(time) {
        $(`.description[data-time=${time}]`).val(events[time]);
      });
    }
  
    // Function to clear all events from local storage
    function clearAllEvents() {
      localStorage.removeItem("events");
      $(".description").val("");
    }
  });
  