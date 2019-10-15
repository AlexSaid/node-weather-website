

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");
const img = document.getElementById("foricon")
weatherForm.addEventListener("submit", (e) => {
 e.preventDefault()
 const location = search.value;

 message1.textContent =  "Loading......";
 message2.textContent =  "";
 if(location == ""){
  message1.textContent =  "provide an address please";
 }
   fetch("/weather?address=" + location).then((response) =>{
    response.json().then((data) => {
      console.log("go go ", data)
      if(data.error){
       message1.textContent =  data.error;
      }
      else{
       message1.textContent =  data.location;
       message2.textContent =  data.forecast;
       
      }
  })
  })
  

});