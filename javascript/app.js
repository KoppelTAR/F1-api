const DriverId = document.querySelector('.DriverId')
const Code = document.querySelector('.Code')
const PermanentNumber = document.querySelector('.PermanentNumber')
const GivenName = document.querySelector('.GivenName')
const FamilyName = document.querySelector('.FamilyName')
const DateOfBirth = document.querySelector('.DateOfBirth')
const Nationality = document.querySelector('.Nationality')

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://ergast.com/api/f1/drivers/hamilton", requestOptions)
  .then(response => response.text())
.then(data => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, "application/xml");

  console.log(xml);
  DriverId.innerHTML = "Driver Id : " + xml.getElementsByTagName("Driver")[0].getAttribute("driverId")
  Code.innerHTML = "Driver Code : " + xml.getElementsByTagName("Driver")[0].getAttribute("code")
  PermanentNumber.innerHTML = "Permanent Number : " + xml.getElementsByTagName("PermanentNumber")[0].textContent
  GivenName.innerHTML = "First Name : " + xml.getElementsByTagName("GivenName")[0].textContent
  FamilyName.innerHTML = "Family Name : " + xml.getElementsByTagName("FamilyName")[0].textContent
  DateOfBirth.innerHTML = "Date Of Birth : " + xml.getElementsByTagName("DateOfBirth")[0].textContent
  Nationality.innerHTML = "Nationality : " + xml.getElementsByTagName("Nationality")[0].textContent
})
