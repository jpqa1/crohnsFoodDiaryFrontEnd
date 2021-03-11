`use strict`;

const contextPath = "http://localhost:8080";
const foodFormOutput = document.getElementById("foodOutput");
const positiveFoodOutput = document.getElementById("foodOutputPositive");
const negativeFoodOutput = document.getElementById("foodOutputNegative");
let foodId; // KEY TO GETING UPDATE METHOD TO WORK

var myModal = new bootstrap.Modal(document.getElementById('foodModal'), {
    keyboard: false
})

function getFoods() {
    axios.get(contextPath + "/getFood")
        .then(res => {
            foodFormOutput.innerHTML = "";

            const foods = res.data;

            foods.forEach(food => {
                const newFood = renderFood(food);
                console.log("New Food: ", newFood);
                foodFormOutput.appendChild(newFood);
            });
        }).catch(err => console.error(err))
}

// GET ALL POSITIVE FOODS
function getPositiveFoods() {
    axios.get(contextPath + "/getPositiveFood")
        .then(res => {
            positiveFoodOutput.innerHTML = "";

            const foods = res.data;

            foods.forEach(food => {
                const newFood = renderPositiveFood(food);
                console.log("New Food: ", newFood);
                positiveFoodOutput.appendChild(newFood);
            });
        }).catch(err => console.error(err))
}

function renderPositiveFood(food) {
    const newRow = document.createElement("tr");

    const foodName = document.createElement("td");
    foodName.className = "tDataName";
    foodName.innerText = food.name;

    const foodType = document.createElement("td");
    foodType.className = "tDataType";
    foodType.innerText = food.type;

    const foodCalories = document.createElement("td");
    foodCalories.className = "tDataCalories";
    foodCalories.type = "number";
    foodCalories.innerHTML = food.caloriesPerPortion;

    newRow.appendChild(foodName);
    newRow.appendChild(foodType);
    newRow.appendChild(foodCalories);

    return newRow;
}

// GET ALL NEGATIVE FOODS
function getNegativeFoods() {
    axios.get(contextPath + "/getNegativeFood")
        .then(res => {
            negativeFoodOutput.innerHTML = "";

            const foods = res.data;

            foods.forEach(food => {
                const newFood = renderNegativeFood(food);
                console.log("New Food: ", newFood);
                negativeFoodOutput.appendChild(newFood);
            });
        }).catch(err => console.error(err))
}

function renderNegativeFood(food) {
    const newRow = document.createElement("tr");

    const foodName = document.createElement("td");
    foodName.className = "tDataName";
    foodName.innerText = food.name;

    const foodType = document.createElement("td");
    foodType.className = "tDataType";
    foodType.innerText = food.type;

    const foodCalories = document.createElement("td");
    foodCalories.className = "tDataCalories";
    foodCalories.type = "number";
    foodCalories.innerHTML = food.caloriesPerPortion;

    newRow.appendChild(foodName);
    newRow.appendChild(foodType);
    newRow.appendChild(foodCalories);

    return newRow;
}





function renderFood(food) {

    const newRow = document.createElement("tr");

    const foodName = document.createElement("td");
    foodName.className = "tDataName";
    foodName.innerText = food.name;

    const foodType = document.createElement("td");
    foodType.className = "tDataType";
    foodType.innerText = food.type;

    const foodCalories = document.createElement("td");
    foodCalories.className = "tDataCalories";
    foodCalories.type = "number";
    foodCalories.innerHTML = food.caloriesPerPortion;

    const foodEffect = document.createElement("td");
    foodEffect.className = "tDataEffect";
    foodEffect.innerText = food.effect;

    const deleteTd = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-link";
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", function () {
        deleteFood(food.id);
    })

    deleteTd.appendChild(deleteButton);

    const updateTd = document.createElement("td");

    // UPDATE
    const updateButton = document.createElement("button");
    updateButton.className = "btn btn-primary";
    updateButton.innerText = "update";
    updateButton.addEventListener("click", function () {
        myModal.toggle();
        foodId = food.id;
    })

    updateTd.appendChild(updateButton);

    newRow.appendChild(foodName);
    newRow.appendChild(foodType);
    newRow.appendChild(foodCalories);
    newRow.appendChild(foodEffect);
    newRow.appendChild(deleteTd);
    newRow.appendChild(updateTd);

    return newRow;

}

//Delete Food
function deleteFood(id) {
    axios.delete(contextPath + "/removeFood/" + id)
        .then(() => getFoods())
        .catch(err => console.error(err))
}


//Update Food
document.getElementById("foodUpdateForm").addEventListener('submit', function (event) {
    event.preventDefault();
    const data = {
        name: this.foodName.value,
        type: this.foodType.value,
        caloriesPerPortion: this.foodCalories.value,
        effect: this.foodEffect.value
    };

    axios.put(contextPath + "/updateFood/" + foodId, data, {

    }).then(() => {
        this.reset();
        myModal.toggle();
        getFoods();
    }).catch(err => console.error(err));
});


//create Food
document.getElementById("foodOutputForm").addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        name: this.foodName.value,
        type: this.foodType.value,
        caloriesPerPortion: this.foodCalories.value,
        effect: this.foodEffect.value
    };

    axios.post(contextPath + "/createFood", data, {
        headers: {
            "Content-Type": "application/json", // sending JSON
            "Accept": "application/json" // gimme JSON
        }
    }).then(() => {
        this.reset();
        this.name.focus();
        getFoods();
    })
        .catch(err => console.error(err));

});

getFoods();
getPositiveFoods();
getNegativeFoods();

