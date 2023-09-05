let initialState = true;
let currentValue = null;
let currentOperator = null;

// Controls and Events

const dispaly = document.getElementById("dispaly");

const plus = document.getElementById("plus");

plus.addEventListener("click", () =>{
    operation(parseFloat(dispaly.innerText), '+');
})

const minus = document.getElementById("minus");

minus.addEventListener("click", () =>{
    operation(parseFloat(dispaly.innerText), '-');
})

const times = document.getElementById("times");

times.addEventListener("click", () =>{
    operation(parseFloat(dispaly.innerText), '*');
})

const divided = document.getElementById("divided");

divided.addEventListener("click", () =>{
    operation(parseFloat(dispaly.innerText), '/');
})

const equals = document.getElementById("equals");

equals.addEventListener("click", () =>{
    if(currentValue !== null){
        let value = calc(currentValue, parseFloat(dispaly.innerText), currentOperator);
        if(value == Infinity){
            dispaly.innerText = "ERROR";
        }
        else{
            dispaly.innerText = value;
        }
        reset();
    }
})

const signChange = document.getElementById("signChange");

signChange.addEventListener("click", () =>{
    if(initialState != true){
        dispaly.innerText = parseFloat(dispaly.innerText) * -1;
    }
})

const decimal = document.getElementById("decimal");

decimal.addEventListener("click", () => {
    if(!hasDecimalPoint()){
        dispaly.innerText += ".";
    }
});


const ce = document.getElementById("clear");

ce.addEventListener("click", () =>{
    clearDispaly();
    reset();
})

const del = document.getElementById("delete");

del.addEventListener("click", () =>{
    back();
})

for(let i = 0; i < 10; i++){
    document.getElementById("num" + i).addEventListener("click", () =>{
        showOnDisplay(i);
    });
}


// Additional functions

function showOnDisplay(val){
    if(initialState == true){
        dispaly.innerText = val;
        initialState = false;
    }
    else{
        if(checkLength()){
            return;
        }
        dispaly.innerText += val;
    }
    
}

function clearDispaly(){
    dispaly.innerText = "0";
}

function back(){
    if(dispaly.innerText.length == 1){
        clearDispaly();
        initialState = true;
    }
    else{
        dispaly.innerText = dispaly.innerText.slice(0, -1);
    }
    
}

function operation(val, operator){
    if(currentValue === null){
        if(initialState == true){
            return;
        }
        currentValue = val;
        currentOperator = operator;
    }
    else{
        currentValue = calc(currentValue, val, currentOperator);
        currentOperator = operator;
    }
    clearDispaly();
    initialState = true;

}

function calc(val1, val2, operator){
    return operator == '+' ? val1 + val2 : operator == '-' ? val1 - val2 : operator == "*" ? val1 * val2 : val1 / val2;
}

function reset(){
    initialState = true;
    currentValue = null;
    currentOperator = null;
}

function checkLength(){
    if(parseFloat(dispaly.innerText) < 0){
        if(dispaly.innerText.length >= 11){
            return true;
        }
    }
    else if(dispaly.innerText.length >= 10){
        return true;
    }
    return false;
}

function hasDecimalPoint(){
   return dispaly.innerText.includes(".");
}
