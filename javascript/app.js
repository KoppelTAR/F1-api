const GetDriverInfo = document.querySelector('#button')
const ChosenDriver = document.querySelector('#locality-dropdown')
const DriverId = document.querySelector('.DriverId')
const Code = document.querySelector('.Code')
const PermanentNumber = document.querySelector('.PermanentNumber')
const GivenName = document.querySelector('.GivenName')
const FamilyName = document.querySelector('.FamilyName')
const DateOfBirth = document.querySelector('.DateOfBirth')
const Nationality = document.querySelector('.Nationality')

const parser = new DOMParser();

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

var element = document.createElement("div");
let defaultOption = document.createElement('option')
defaultOption.text = 'Choose a driver';

dropdown.add(defaultOption)
dropdown.selectedIndex = 0;

const url = 'http://ergast.com/api/f1/drivers?limit=10000';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.text().then(function(data) { 
        const xml = parser.parseFromString(data, "application/xml"); 
        let option;
    
    	for (let i = 0; i < data.length; i++) {
        console.log((xml.getElementsByTagName("Driver")[i].getAttribute("driverId")));
        if (!xml.getElementsByTagName("Driver")[i].getAttribute("code")) {
          i = i+1
        }
        else{
          option = document.createElement('option');
      	  option.text = xml.getElementsByTagName("Driver")[i].getAttribute("driverId");
          //option.value = i  :(
      	  dropdown.add(option);
        }
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

  GetDriverInfo.addEventListener('click', getInfo);


function getInfo(){
  fetch(`http://ergast.com/api/f1/drivers/${ChosenDriver.value}`, requestOptions)
  .then(response => response.text())
  .then(data => {
  const xml = parser.parseFromString(data, "application/xml");
  console.log(xml);
  console.log(`http://ergast.com/api/f1/drivers/${ChosenDriver.value}`);
  DriverId.innerHTML = "Driver Id : " + xml.getElementsByTagName("Driver")[0].getAttribute("driverId")
  Code.innerHTML = "Driver Code : " + xml.getElementsByTagName("Driver")[0].getAttribute("code")
  if (!xml.getElementsByTagName("PermanentNumber")[0] || (!xml.getElementsByTagName("PermanentNumber")[0].textContent )) { // :(
    PermanentNumber.innerHTML = "Permanent Number : No permanent Number"
  }
  else {
    PermanentNumber.innerHTML = "Permanent Number : " + xml.getElementsByTagName("PermanentNumber")[0].textContent
  }
  GivenName.innerHTML = "First Name : " + xml.getElementsByTagName("GivenName")[0].textContent
  FamilyName.innerHTML = "Family Name : " + xml.getElementsByTagName("FamilyName")[0].textContent
  DateOfBirth.innerHTML = "Date Of Birth : " + xml.getElementsByTagName("DateOfBirth")[0].textContent
  Nationality.innerHTML = "Nationality : " + xml.getElementsByTagName("Nationality")[0].textContent
})
}