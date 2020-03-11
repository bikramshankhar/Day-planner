
var timeBlocks = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        events: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        events: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        events: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        events: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "pm",
        events: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "pm",
        events: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "pm",
        events: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "pm",
        events: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "pm",
        events: ""
    },

]

// gets date
function getDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

// saves data to localStorage
function saveEvents() {
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
}

// sets any data in localStorage to the view
function displayEvents() {
    timeBlocks.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.events);
    })
}

// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("timeBlocks"));

    if (storedDay) {
        timeBlocks = storedDay;
    }

    saveEvents();
    displayEvents();
}

getDate();

// creates the visuals for the scheduler body
timeBlocks.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates save button
    var saveButton = $("<i class='fas fa-save'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

init();


// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    timeBlocks[saveIndex].events = $(this).siblings(".description").children(".future").val();
    saveEvents();
    displayEvents();
})
