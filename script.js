function loadXMLFile(xmlFile){
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.open("GET", xmlFile, false);
    xmlhttp.send();
    return (xmlhttp.responseXML);
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
function loadLodges(){


    xmlDoc = loadXMLFile("lodges.xml");

    var x = xmlDoc.documentElement.getElementsByTagName("lodge");
    
    for (i=0; i < x.length; i++){
        var newLodge = new Lodge (
            x[i].getElementsByTagName("lodgeNumber")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("picture")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("capacity")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("cost")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("bookedStatus")[0].childNodes[0].nodeValue
        );
        
        lodges.push(newLodge);
        
    }

}
function addEventListeners(){
    
    
        for(i = 0; i < icons.length; i++){
            
            let detailsElement = document.getElementById(`lodge${i+1}Details`);
            icons[i].addEventListener("mouseenter", (event) =>{
                detailsElement.style.visibility = "visible";
            }
             );
             icons[i].addEventListener("mouseleave", (event) =>{
                detailsElement.style.visibility = "hidden";
            }
             );
             icons[i].addEventListener("click", selectLodge);
        }    
}

function addDetails(lodge){
    let booked = "Vacant";
    if(lodge.bookedStatus == "true"){
        booked = "Booked";
    }
    
    let detailsElement = document.getElementById(`lodge${lodge.lodgeNumber}Details`);
    let htmlString = `<img src=\"${lodge.picture}\" alt=\"lodge ${lodge.lodgeNumber}  Picture\" class=\"lodgePic\">`;
    htmlString += `<p class=\"row\">Cost per night: \$${lodge.cost}</p>`;
    htmlString += `<p class=\"row\">Capacity: ${lodge.capacity}</p>`;
    htmlString += `<p class=\"row\">Vacancy: ${booked}</p>`;

    detailsElement.innerHTML = htmlString;
}

function setIconColor(lodge){
    let icon = document.getElementById(`lodge${lodge.lodgeNumber}`);
       if(lodge.bookedStatus == "true" || lodge.capacity < numberStaying){
        icon.style.backgroundColor = "red";
        
    }
    else if(lodge.bookedStatus == "false"){
        icon.style.backgroundColor = "green";
    }
}

function selectLodge(event){
    let selectedLodge = lodges[event.target.innerHTML-1];
    if (selectedLodge.bookedStatus == "true"){
        alert("This lodge has already been booked, please select another lodge.");
    }else if(selectedLodge.capacity < numberStaying){
        alert("This lodge does not have the capacity to host your party, please select another lodge or reduce the number of people staying.");
    }else{
        
        updateLodgeSelection(selectedLodge);
    }

}

function setDefaultDates(){
    let date = new Date();  
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    checkInInput.valueAsDate = date; 
    date.setDate(date.getDate()+ 1);
    checkOutInput.valueAsDate = date;
}

function updateNumberStaying(event){
    numberStaying = event.target.value;
    lodges.forEach(setIconColor);
    updateCost();
}

function updateCost(){
    cost = lodgeSelected.cost * daysStaying;
    console.log(cost);
}

var lodges = [];
var icons = document.getElementsByClassName("icon");



var numberStayingInput = document.getElementById("numberStaying");
var checkInInput = document.getElementById("checkIn");
var checkOutInput = document.getElementById("checkOut");
var lodgeSelectionDisplay = document.getElementById("lodgeNumber");

var numberStaying = 0;
var lodgeSelected;
var checkIn;
var checkOut;
var daysStaying = 1;
var cost = 0;

loadLodges();
addEventListeners();
lodges.forEach(addDetails);
lodges.forEach(setIconColor);
setDefaultDates();

numberStayingInput.addEventListener("change", updateNumberStaying);
checkInInput.addEventListener("change", (event)=>{
    checkIn = event.target.value;  
});

//TODO updateLodgeSelected function
//price calc
// date selection validation
// summary page
//Index CSS + links