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

const dateFull = new Date();
// Create array get datas from localStorage
const petArr = JSON.parse(getFromStorage('petDatas')) ?? [];
const breedArr = JSON.parse(getFromStorage('breedDatas')) ?? [];

// SHow Data of pets
renderTableBreed(breedArr);
renderTableData(petArr);

// Show pets on list table
function renderTableData(petArr) {
  tableBody.innerHTML = '';

  // Creare and add row for elements of petArr on table.
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');
    var date = new Date(petArr[i].date);
    var mydate = date.toLocaleDateString();
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
      <td>${mydate} </td>
      <td><button type="button" class="btn btn-danger" onclick="deletePet('${
        petArr[i].id
      }')">Delete</button></td>`;

    row.innerHTML = docHTML;
    tableBody.appendChild(row);
  }
}
//
function deletePet(petId) {
  const isDeleted = confirm('Are you sure?');
  if (isDeleted) {
    // excute remove pet
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // delete pet out of array
        petArr.splice(i, 1);
        renderTableData(petArr);
      }
    }
  }
}

// Create event for type input
typeInput.addEventListener('change', renderBreed);

// Show breeds by type (Dog or Cat)
function renderBreed() {
  breedInput.innerHTML = '<option>Select Breed</option>';

  // If type is Dog
  if (typeInput.value === 'Dog') {
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === 'Dog');
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement('option');
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    // if type is Cat
  } else if (typeInput.value === 'Cat') {
    const breedCats = breedArr.filter((breedItem) => breedItem.type === 'Cat');
    breedCats.forEach(function (breedItem) {
      const option = document.createElement('option');
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// Add event for submit
btnSubmit.addEventListener('click', function () {
  // Get datas from Form input
  const datas = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
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

  // save datas to LocalStorage
  saveToStorage('petDatas', JSON.stringify(petArr));
});

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

// Add Animation when click 'SideBar' on header
let sidebar = document.getElementById('sidebar');
// click icon on sidebar to remove active for sidebar
document.querySelector('.bi-list').addEventListener('click', function () {
  sidebar.classList.toggle('active');
});
// when sidebar not active -> click icon heart on sidebar to active
document
  .querySelector('.bi-envelope-paper-heart-fill')
  .addEventListener('click', function () {
    sidebar.classList.add('active');
  });

// For each breeds in breedArr add a data row to table
function renderTableBreed(breedArr) {
  tableBody.innerHTML = '';
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td scope="col">${index + 1}</td>
      <td scope="col">${breedItem.breed}</td>
      <td scope="col">${breedItem.type}</td>
      <td><button type="button" onclick= "deleteBreed(${
        breedItem.breed
      })"class="btn btn-danger">Delete</button></td>`;
    tableBody.appendChild(row);
  });
}
