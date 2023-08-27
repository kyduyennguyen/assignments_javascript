'use strict';
// Selecting HTML Document elements
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputType = document.getElementById('input-type');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const btnFind = document.getElementById('find-btn');
const tableBody = document.getElementById('tbody');
const containerForm = document.getElementById('container-form');
// Create array get datas from localStorage
const petArr = JSON.parse(getFromStorage('petDatas')) ?? [];
const breedArr = JSON.parse(getFromStorage('breedDatas')) ?? [];

// Add event for Find button to find informations of pet by input
btnFind.addEventListener('click', function () {
  // Note: If input is none, show all pets in table. Besides, users could input over than 1 information to find.
  // Find by pet id
  let petArrFind = petArr;
  if (inputId.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(inputId.value));
  }
  // Find by pet name
  if (inputName.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(inputName.value));
  }
  // Find by pet type
  if (inputType.value !== 'Select Type') {
    petArrFind = petArrFind.filter((pet) => pet.type === inputType.value);
  }
  // Find by pet breed
  if (inputBreed.value !== 'Select Breed') {
    petArrFind = petArrFind.filter((pet) => pet.breed === inputBreed.value);
  }
  // Find by selection vaccinated
  if (inputVaccinated.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  // Find by selection dewormed
  if (inputDewormed.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  // Find by selection sterilized
  if (inputVaccinated.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  // Show list pets after filter informations of pet to find
  renderTableData(petArrFind);
});

renderTableData(petArr);
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
// Show all breeds
// Note: all breeds not discriminate type Dog or Cat
// renderBreed();
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement('option');
    option.innerHTML = `${breedItem.breed}`;
    inputBreed.appendChild(option);
  });
}
renderBreed();
