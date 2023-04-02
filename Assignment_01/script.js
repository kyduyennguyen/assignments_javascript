'use strict';

// Selecting HTMLdoc elements
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const btnSubmit = document.getElementById('submit-btn');
const tableBody = document.getElementById('tbody');
const btnHealthy = document.getElementById('healthy-btn');
const btnCalcBMI = document.getElementById('calcbmi-btn');

const petArr = [];
const dateFull = new Date();

// Model data
// const data = {
//   id: 'P001',
//   name: 'Bob',
//   age: 4,
//   type: 'Cat',
//   weight: 7,
//   length: 40,
//   breed: 'Tabby',
//   color: 'white',
//   vaccinated: true,
//   dewormed: true,
//   sterilized: false,
//   date: `${dateFull.getDate()}/${
//     dateFull.getMonth() + 1
//   }/${dateFull.getFullYear()}`,
// };
// petArr.push(data);

// Submit button event
btnSubmit.addEventListener('click', function () {
  // Get datas from Form input
  const datas = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: `${dateFull.getDate()}/${
      dateFull.getMonth() + 1
    }/${dateFull.getFullYear()}`,
  };

  // Check validate of datas
  const validateData = function (datas) {
    if (!datas.id) {
      alert('Please enter ID!');
      return false;
    } else if (!datas.name) {
      alert('Please enter name! ');
      return false;
    } else if ((datas.age < 1 && datas.age > 15) || !datas.age) {
      alert('Age must be between 1 and 15!');
      return false;
    } else if (datas.type === 'Select Type') {
      alert('Please select type!');
      return false;
    } else if ((datas.weight < 1 && datas.weight > 15) || !datas.weight) {
      alert('Weight must be between 1 and 15!');
      return false;
    } else if ((datas.length < 1 && datas.length > 100) || !datas.length) {
      alert('Length must be between 1 and 100!');
      return false;
    } else if (datas.breed === 'Select Breed') {
      alert('Please select breed!');
      return false;
    } else {
      return true;
    }
  };
  // Check ID if it exist
  let checkId = true;
  for (let i = 0; i < petArr.length; i++) {
    if (idInput.value === petArr[i].id) {
      alert('ID must be unique!');
      checkId = false;
      return checkId;
    }
  }

  // Clear data on Form input
  const clearInput = () => {
    idInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
    typeInput.value = 'Select Type';
    weightInput.value = '';
    lengthInput.value = '';
    breedInput.value = 'Select Breed';
    colorInput.value = '#000000';
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  };

  // Add pets to list
  const validate = validateData(datas);
  if (validate) {
    petArr.push(datas);
    clearInput();
    renderTableData(petArr);
  }
});

// Show pets on list table
function renderTableData(petArr) {
  // delete current contents of table
  tableBody.innerHTML = '';

  // Creare and add row for elements of petArr on table.
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');
    let docHTML = `<th>${petArr[i].id} </th>   <td>${
      petArr[i].name
    } </td>   <td>${petArr[i].age} </td>   <td>${petArr[i].type} </td>  <td>${
      petArr[i].weight
    } kg</td>  <td>${petArr[i].length} cm</td> <td>${
      petArr[i].breed
    } </td>  <td><i class="bi bi-square-fill" style="color: ${
      petArr[i].color
    }"></i></td>  <td>${
      petArr[i].vaccinated === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'></i>"
    }</td>  <td>${
      petArr[i].dewormed === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'></i>"
    }</td>  <td>${
      petArr[i].sterilized === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'></i>"
    }</td>
    <td>${petArr[i].bmi ?? '?'} </td>
    <td>${petArr[i].date} </td>
    <td><button type="button" class="btn btn-danger" onclick="deletePetId('${
      petArr[i].id
    }')">Delete</button></td>`;

    row.innerHTML = docHTML;
    tableBody.appendChild(row);
  }
}

// Deleting a pet with Delete button in table
const deletePetId = (petId) => {
  // Confirm before deletePet
  if (confirm('Are you sure?')) {
    for (let i = 0; i < petId.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTableData(petArr);
      }
    }
  }
};

// Healthy button: just show healthy pets
let healthyCheck = false;
btnHealthy.addEventListener('click', function () {
  if (healthyCheck === true) {
    let healthyPetArr = petArr.filter((petArr) => {
      return petArr.vaccinated && petArr.dewormed && petArr.sterilized;
    });
    renderTableData(healthyPetArr);
    btnHealthy.textContent = 'Show All Pets'; // change content for button
    healthyCheck = false;
  } else {
    // return default (all pets) list table
    renderTableData(petArr);
    btnHealthy.textContent = 'Show Healthy Pets';
    healthyCheck = true;
  }
});

// Calculation BMI for all pets when click Calculate BMI button
btnCalcBMI.addEventListener('click', function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === 'Dog'
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2) //for Dogs
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2); // for Cats
  }
  // Show results for all pets in list
  renderTableData(petArr);
});
