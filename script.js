// Accordion Hide and Show Function
function cardListner(element) {
  let val = element.nextElementSibling;
  if (val.style.display === "block") {
    val.style.display = "none";
  } else {
    val.style.display = "block";
  }
}

// Checking that the todo array is already in the memory or not to fetch the existing data from it.
let todoArray = [];
if(localStorage.getItem("todos") === null){
  todoArray = [];
}
else{
  todoArray = localStorage.getItem("todos").split(",");
  displayElement();
}

// Accessing the heading and paragraph element to get the details
let headingArea = document.getElementById("headingArea");
let paraArea = document.getElementById("paraArea");

// This function is generating all the values like heading, description, date, time and storing them in a string and pushing that into an array to handle
function generateElement() {
  let headingAreaValue = headingArea.value;
  headingAreaValue = headingAreaValue.trim();
  let paraAreaValue = paraArea.value;
  paraAreaValue = paraAreaValue.trim();

  // Cheking the heading and description value is empty or not
  if (headingAreaValue == "" || paraAreaValue == "") {
    alert("Heading and Paragraph Area cannot be Empty");
  } else {
    let date = new Date();

    // fetching the current date
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if(month < 10){
      month = "0" + month;
    }

    if(day < 10){
      day = "0" + day;
    }

    let current_date = day + "-" + month + "-" + year;

    // fetching the current time
    let hour = date.getHours();
    let minute = date.getMinutes();

    if(hour > 12){
      hour = Math.ceil(hour / 12);
    }

    if(hour < 10){
      hour = "0" + hour;
    }

    if(minute < 10){
      minute = "0" + minute;
    }

    let current_time = hour + ":" + minute;

    // getting the am pm of time to display
    let ampm = "";
    if (date.getHours() >=   12) {
      ampm = "PM";
    } else {
      ampm = "AM";
    }

    // Creating the new element to insert
    let element = `
        <div id="card" class="w-[90vw] text-white">
          <div class="accordion-heading flex items-center justify-between px-6 py-2 bg-cyan-600 cursor-pointer rounded" onclick="cardListner(this)">
            <div class="flex gap-4">
                <h1 class="title text-lg font-bold">${headingAreaValue}</h1>
                <button class="editButton" onclick="editItem(this)">
                  <i class="fa-solid fa-pen-to-square text-green-400"></i>
                </button>
                <button class="deleteButton" onclick="deleteItem(this)">
                    <i class="fa-solid fa-trash text-red-400"></i>
                </button>
            </div>
    
            <div class="dateTime flex gap-2 items-center justify-between text-xs">
              <p class="date">${current_date}</p>
              <p class="time">${current_time}</p>
              <p class="ampm">${ampm}</p>
              <i class="fa-solid fa-angle-down text-lg"></i>
            </div>
          </div>
    
          <p class="accordion-para content text-sm mt-2 text-black px-6 py-2 border border-cyan-600 hidden rounded">${paraAreaValue}</p>
        </div>
        `;

        // removing the unwanted spaces from the start and end
        element.trim();

    // pushing the new element into array so that it can be stored in memory and can be rendered easily
    todoArray.push(element);

    // clearing the values of heading and paragraph
    headingArea.value = "";
    paraArea.value = "";

    displayElement();
  }
}


// diplaying the stored elements in the document
function displayElement(){
  let cards = document.getElementById("cards");
  // Clearing all the child so that I can render then again through loop
  // childElementCount
  while (cards.childElementCount > 1) {
    cards.removeChild(cards.lastChild);
  }

  // After clearing all the elements, agin fetching them form array and pushing them again into the dom 
  todoArray.forEach(a => {
    let element = document.createElement("div");
    element.innerHTML = a;
    cards.appendChild(element);
  });
  localStorage.setItem("todos", todoArray);
}

// deletion functionality
function deleteItem(btn){
  // deleting the elements
  let element = btn.parentElement.parentElement.parentElement.parentElement.innerHTML;
  let index = todoArray.indexOf(element);
  todoArray.splice(index, 1);
  displayElement();
}

// editing the function
function editItem(btn){
  // Accessing the data stored as heading and paragraph
  let headingValue = btn.parentElement.firstChild.nextElementSibling.innerText;
  let paraValue = btn.parentElement.parentElement.parentElement.lastChild.previousElementSibling.innerText;

  // Appending that value in dom before it's deletion
  headingArea.value = headingValue;
  paraArea.value = paraValue;

  // deleting the elements
  let element = btn.parentElement.parentElement.parentElement.parentElement.innerHTML;
  let index = todoArray.indexOf(element);
  todoArray.splice(index, 1);
  displayElement();
}