function formatTime12Hour(timeString, steplength) {
    let [hours, minutes] = timeString.split(':');
    let minNum = parseInt(minutes);
    let formattedHours = parseInt(hours, 10);
    let period = formattedHours >= 12 ? 'PM' : 'AM';

    if (formattedHours > 12) {
        formattedHours -= 12;
    } else if (formattedHours === 0) {
        formattedHours = 12;
    }
    let hourNum = parseInt(formattedHours);

    //take away step time
    minNum = minNum - steplength;


    //case for hour turn over other than 1 to 12
    if(minNum < 0 && hourNum > 1){
        hourNum -= Math.ceil(-minNum/60);
        minNum = 60*Math.ceil(-minNum/60) + minNum;
        if(minNum < 10 && minNum >= 0){
            minutes = "0" + minNum.toString();
        }else{
            minutes = minNum.toString();    
        }
        formattedHours = hourNum.toString();

    //case for hour turn over from 1 to 12
    }else if(minNum < 0 && hourNum == 1){
        hourNum = 12;
        minNum = 60 + minNum;
        if(minNum < 10 && minNum >= 0){
            minutes = "0" + minNum.toString();
        }else{
            minutes = minNum.toString();    
        }
        formattedHours = hourNum.toString();
        if(period == 'PM'){
            period = 'AM';
        }else{
            period = 'PM';
        }

    }else{
        if(minNum < 10 && minNum >= 0){
            minutes = "0" + minNum.toString();
        }else{
            minutes = minNum.toString();    
        }
    }


    return `${formattedHours}:${minutes} ${period}`;
}


function createNewStep(){
    var card = document.createElement("div");
    card.classList.add("step-element");
    card.innerHTML = "<div class=\"id-wrapper\"><input type=\"text\" class=\"step-title\" placeholder=\"Title\"/><button class=\"remove\"><img src=\"icons8-trash.svg\"></button></div><input type=\"number\" class=\"step-time\" placeholder=\"Minutes\"/>";
    var element = document.getElementById("step-list");
    element.appendChild(card);
    console.log("New step created");

    card.querySelector('.step-time').addEventListener('change', updateTotal);

    card.querySelector('.remove').addEventListener('click', () => {
        element.removeChild(card); // Remove the step element
        updateTotal(); // Update the total after removal
    });

    idchange++;
}

function updateTotal(){
    stepTotal = 0;
    const stepTime = document.querySelectorAll('.step-time');
    stepTime.forEach(field => {
        const value = Number(field.value) || 0; // Convert to number, default to 0
        console.log(`Field value: ${value}`); // Log each field value
        stepTotal += value; // Sum the values
    });
    console.log(`Total Step Time: ${stepTotal}`);
    formattedTime.textContent = formatTime12Hour(timeInput.value, stepTotal);
}

const timeInput = document.getElementById('start-time');
const formattedTime = document.getElementById('values');
const stepTime = document.querySelectorAll('.step-time');
let idchange = 1;
let stepTotal = 0;


stepTime.forEach(field =>{
    field.addEventListener('change', updateTotal);
});

timeInput.addEventListener('change', () => {
    const timeValue = timeInput.value;
    formattedTime.textContent = formatTime12Hour(timeValue, stepTotal);
});
