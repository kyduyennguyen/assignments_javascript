'use strict';
// Selecting HTML Document elements
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const btnSubmit = document.getElementById('submit-btn');
const tableBody = document.getElementById('tbody');
const containerForm = document.getElementById('container-form');
const dateFull = new Date();
// Create array get datas from localStorage
const petArr = JSON.parse(getFromStorage('petDatas')) ?? [];
const breedArr = JSON.parse(getFromStorage('breedDatas')) ?? [];
// Show all pets in Storage
renderTableData(petArr);

function renderTableData(petArr) {
  // delete data contents in table
  tableBody.innerHTML = '';
  // for each pets in petArr, create a row containing a data of this pet in the table.
  petArr.forEach((pet) => {
    const row = document.createElement('tr');
    var date = new Date(pet.date);
    var mydate = date.toLocaleDateString();
    let docHTML = `<th>${pet.id} </th>   <td>${pet.name} </td>   <td>${
      pet.age
    } </td>   <td>${pet.type} </td>  <td>${pet.weight} kg</td>  <td>${
      pet.length
    } cm</td> <td>${
      pet.breed
    } </td>  <td><i class="bi bi-square-fill" style="color: ${
      pet.color
    }"></i></td>  <td>${
      pet.vaccinated === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'></i>"
    }</td>  <td>${
      pet.dewormed === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'></i>"
    }</td>  <td>${
      pet.sterilized === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'></i>"
    }</td>  <td>${mydate}</td>
      <td><button type="button" class="btn btn-danger" onclick="startEditPet('${
        pet.id
      }')">Edit</button></td>`;

    row.innerHTML = docHTML;
    tableBody.appendChild(row);
  });
}

// Create event for edit button in form
function startEditPet(petId) {
  // Show datas form
  containerForm.classList.remove('hide');
  // Find datas of pet need to edit
  const pet = petArr.find((petItem) => petItem.id === petId);
  // Show pet informations on input form
  inputId.value = id;
  inputName.value = pet.name;
  inputAge.value = pet.age;
  inputType.value = pet.type;
  inputWeight.value = pet.weight;
  inputLength.value = pet.length;
  inputColor.value = pet.color;
  inputVaccinated.checked = pet.vaccinated;
  inputDewormed.checked = pet.dewormed;
  inputSterilized.checked = pet.sterilized;

  // Show breed datas by type Dog or Cat
  renderBreed();
  // Show breed datas before edit
  inputBreed.value = `${pet.breed}`;
}

// Create event for Type input
inputType.addEventListener('change', renderBreed);
// Show breed by type of breed (dog - cat)
function renderBreed() {
  inputBreed.innerHTML = '<option>Select Breed</option>';
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === 'Dog');
  const breedCats = breedArr.filter((breedItem) => breedItem.type === 'Cat');
  // If type is Dog
  if (inputType.value === 'Dog') {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement('option');
      option.innerHTML = `${breedItem.breed}`;
      inputBreed.appendChild(option);
    });
    // If type if Cat
  } else if (inputType.value === 'Cat') {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement('option');
      option.innerHTML = `${breedItem.breed}`;
      inputBreed.appendChild(option);
    });
  }
}

// Add event for submit button to save new informations for pet data
btnSubmit.addEventListener('click', function () {
  // Get data from form
  const data = {
    id: inputId.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: parseInt(inputWeight.value),
    length: parseInt(inputLength.value),
    color: inputColor.value,
    breed: inputBreed.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
    date: `${dateFull.getDate()}/${
      dateFull.getMonth() + 1
    }/${dateFull.getFullYear()}`,
  };

  // Create function to check validate for data
  let isValidate = true;
  const validateData = (data) => {
    if (data.id.trim() === '') {
      alert('Emty value for ID!');
      isValidate = false;
    } else if (data.name.trim() === '') {
      alert('Emty value for name! ');
      isValidate = false;
    } else if (isNaN(data.age)) {
      alert('Empty value for age!');
      isValidate = false;
    } else if (isNaN(data.weight)) {
      alert('Empty value for weight!');
      isValidate = false;
    } else if (isNaN(data.length)) {
      alert('Empty value for length!');
      isValidate = false;
    }
    return isValidate;
  };
  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    petArr[index] = data;
    // Update informations of pet after edit
    saveToStorage('petDatas', JSON.stringify(petArr));
    // Hide form and show data table of all pet
    containerForm.classList.add('hide');
    renderTableData(petArr);
  }
});
