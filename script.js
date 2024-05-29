function loadXMLFile(xmlFile) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.open("GET", xmlFile, false);
    xmlhttp.send();
    return xmlhttp.responseXML;
}

class Lodge {
    constructor(lodgeNumber, picture, capacity, cost, bookedStatus) {
        this.lodgeNumber = lodgeNumber;
        this.picture = picture;
        this.capacity = capacity;
        this.cost = cost;
        this.bookedStatus = bookedStatus;
    }
}
function loadLodges() {
    xmlDoc = loadXMLFile("lodges.xml");

    var x = xmlDoc.documentElement.getElementsByTagName("lodge");

    for (i = 0; i < x.length; i++) {
        var newLodge = new Lodge(
            x[i].getElementsByTagName("lodgeNumber")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("capacity")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("cost")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("bookedStatus")[0].childNodes[0].nodeValue
        );

        lodges.push(newLodge);
    }
}
function addEventListeners() {
    for (i = 0; i < icons.length; i++) {
        let detailsElement = document.getElementById(`lodge${i + 1}Details`);
        icons[i].addEventListener("mouseenter", (event) => {
            detailsElement.style.visibility = "visible";
        });
        icons[i].addEventListener("mouseleave", (event) => {
            detailsElement.style.visibility = "hidden";
        });
        icons[i].addEventListener("click", selectLodge);
    }

    numberStayingInput.addEventListener("change", updateNumberStaying);

    checkInInput.addEventListener("change", (event) => {
        let date = new Date();
        if (event.target.valueAsDate < date) {
            alert("You cannot book a date that is in the past.");
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            checkInInput.valueAsDate = date;
        } else {
            checkIn = event.target.valueAsDate;
        }
        updateDaysStaying();
    });

    checkOutInput.addEventListener("change", (event) => {
        let date = new Date();
        if (event.target.valueAsDate < date) {
            alert("You cannot book a date that is in the past.");
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            checkOutInput.valueAsDate = date;
        } else {
            checkOut = event.target.valueAsDate;
        }
        updateDaysStaying();
    });

    submitButton.addEventListener("click", (event) => {
        if (cost == 0) {
            alert("Please complete the booking form to make a lodge booking.");
        } else {
            inputForm.style.display = "none";
            mapDisplay.style.display = "none";
            summaryForm.style.display = "block";
            summaryPicture.style.display = "block";
            submitForm();
        }
    });

    returnButton.addEventListener("click", (event) => {
        inputForm.style.display = "block";
        mapDisplay.style.display = "block";
        summaryForm.style.display = "none";
        summaryPicture.style.display = "none";
    });

    confirmBookingButton.addEventListener("click", confirmBooking);
}



function submitForm() {
    console.log(checkIn);
    document.getElementById(
        "summaryPictureContainer"
    ).innerHTML = `<img src=\"${lodgeToBook.picture}\">`;

    document.getElementById(
        "summaryLodgeNumber"
    ).innerHTML = `Lodge Number: ${lodgeToBook.lodgeNumber}`;
    document.getElementById(
        "summaryLodgeCapacity"
    ).innerHTML = `Lodge Capacity: ${lodgeToBook.capacity}`;
    document.getElementById(
        "summaryLodgeCost"
    ).innerHTML = `Lodge Cost per Night: \$${lodgeToBook.cost}`;

    
    document.getElementById(
        "summaryArrivalDate"
    ).innerHTML = `Arrival Date: ${checkIn.getDate()}-${checkIn.getMonth()}-${checkIn.getFullYear()}`;
    document.getElementById(
        "summaryLeaveDate"
    ).innerHTML = `Departure Date: ${checkOut.getDate()}-${checkOut.getMonth()}-${checkOut.getFullYear()}`;
    document.getElementById(
        "summaryPartySize"
    ).innerHTML = `Party Size: ${numberStaying}`;
    document.getElementById(
        "summaryTotalCost"
    ).innerHTML = `Total Cost to stay: \$${cost}`;
}

function addDetails(lodge) {
    let booked = "Vacant";
    if (lodge.bookedStatus == "true") {
        booked = "Booked";
    }

    let detailsElement = document.getElementById(
        `lodge${lodge.lodgeNumber}Details`
    );
    let htmlString = `<img src=\"${lodge.picture}\" alt=\"lodge ${lodge.lodgeNumber}  Picture\" class=\"lodgePic\">`;
    htmlString += `<p class=\"row\">Cost per night: \$${lodge.cost}</p>`;
    htmlString += `<p class=\"row\">Capacity: ${lodge.capacity}</p>`;
    htmlString += `<p class=\"row\">Vacancy: ${booked}</p>`;

    detailsElement.innerHTML = htmlString;
}

function setIconColor(lodge) {
    let icon = document.getElementById(`lodge${lodge.lodgeNumber}`);
    if (lodge.bookedStatus == "true" || lodge.capacity < numberStaying) {
        icon.style.backgroundColor = "red";
    } else if (lodge.bookedStatus == "false") {
        icon.style.backgroundColor = "green";
    }
}

function selectLodge(event) {
    let selectedLodge = lodges[event.target.innerHTML - 1];
    if (selectedLodge.bookedStatus == "true") {
        alert("This lodge has already been booked, please select another lodge.");
    } else if (selectedLodge.capacity < numberStaying) {
        alert(
            "This lodge does not have the capacity to host your party, please select another lodge or reduce the number of people staying."
        );
    } else {
        updateLodgeSelection(selectedLodge);
    }
}
function updateLodgeSelection(lodge) {
    if(lodge == null)
        {
            document.getElementById("lodgeNumber").innerHTML = ``;

    } else{
    lodgeToBook = lodge;
    document.getElementById("lodgeNumber").innerHTML = `You have selected Lodge ${lodgeToBook.lodgeNumber}`;
}
    updateCost();
}
function setDefaultDates() {
    let date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    checkInInput.valueAsDate = date;
    date.setDate(date.getDate() + 1);
    checkOutInput.valueAsDate = date;
    checkIn = checkInInput.valueAsDate;
    checkOut = checkOutInput.valueAsDate;
}

function setBooked(number){
    lodges[number-1].bookedStatus = "true"
    addDetails(lodges[number-1]);
}

function confirmBooking() {
    inputForm.style.display = "block";
    mapDisplay.style.display = "block";
    summaryForm.style.display = "none";
    summaryPicture.style.display = "none";
    setBooked(lodgeToBook.lodgeNumber);
    
    numberStaying = 0;
    lodgeToBook = null;
    daysStaying = 1;
    cost = 0;
    
    updateLodgeSelection();
    setDefaultDates();
    lodges.forEach(setIconColor);
}

function updateNumberStaying(event) {
    if (lodgeToBook != null) {
        if (lodgeToBook.capacity < event.target.value) {
            alert(
                `Lodge ${lodgeToBook.lodgeNumber} has a capacity of ${lodgeToBook.capacity}.\nPlease select a different lodge.`
            );
            numberStayingInput.value = lodgeToBook.capacity;
            numberStaying = numberStayingInput.value;
        }
    }
    numberStaying = event.target.value;
    lodges.forEach(setIconColor);
}

function updateCost() {
    if (lodgeToBook != null) {
        cost = lodgeToBook.cost * daysStaying;
        document.getElementById("totalCost").innerHTML = `Total Cost: \$${cost}`;
    }
}

function updateDaysStaying() {
    let date = new Date();
    if (checkOut <= checkIn) {
        alert("Checkout date must be after check in date.");
        checkOut.setDate(checkIn.getDate() + 1);
        checkOutInput.valueAsDate = checkOut;
    }
    daysStaying = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    updateCost();
}

var lodges = [];
var icons = document.getElementsByClassName("icon");

var numberStayingInput = document.getElementById("numberStaying");
var checkInInput = document.getElementById("checkIn");
var checkOutInput = document.getElementById("checkOut");
var lodgeSelectionDisplay = document.getElementById("lodgeNumber");
var submitButton = document.getElementById("bookingSubmit");
var returnButton = document.getElementById("returnButton");
var mapDisplay = document.getElementById("map");
var inputForm = document.getElementById("inputForm");
var summaryForm = document.getElementById("summaryForm");
var summaryPicture = document.getElementById("summaryPicture");
var confirmBookingButton = document.getElementById("confirmBookingButton");

var numberStaying = 1;
var lodgeToBook;
var checkIn;
var checkOut;
var daysStaying = 1;
var cost = 0;

loadLodges();
addEventListeners();
lodges.forEach(addDetails);
lodges.forEach(setIconColor);
setDefaultDates();

//TODO updateLodgeSelected function
//price calc
// date selection validation
// summary page
//Index CSS + links
