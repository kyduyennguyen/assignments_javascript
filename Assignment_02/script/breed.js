'use strict';

// Selecting HTML Document elements
const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');
const btnSubmit = document.getElementById('submit-btn');
const tableBody = document.getElementById('tbody');
// Create array get datas from localStorage
const breedArr = JSON.parse(getFromStorage('breedDatas')) ?? [];

// Show all breeds (list)
renderBreedTable(breedArr);

// Create event for submit button - input data for breed list
btnSubmit.addEventListener('click', function () {
  const datas = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  // Check input value validate
  if (!datas.breed) {
    alert('Please input breed !');
    return false;
  } else if (datas.type === 'Select Type') {
    alert('Please select type !');
    return false;
  }

  // clear input form (return default) when submit done
  const cleanInput = () => {
    inputBreed.value = '';
    inputType.value = 'Select Type';
  };

  // Add breeds to list
  breedArr.push(datas);
  renderBreedTable(breedArr);
  cleanInput();

  // save Breed datas to LocalStorage
  saveToStorage('breedDatas', JSON.stringify(breedArr));
});

// Create table show data of breeds
function renderBreedTable(breedArr) {
  tableBody.innerHTML = '';
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr');
    let docHTML = `<th>${i + 1} </th>
        <td>${breedArr[i].breed} </td>
        <td>${breedArr[i].type} </td>  
        <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
          breedArr[i].breed
        }')">Delete</button></td>`;
    row.innerHTML = docHTML;
    tableBody.appendChild(row);
  }
}

// Delete button in table - remove breed type in table and update data breed for LocalStorage
const deleteBreed = (breedId) => {
  // Confirm before deleteBreed
  if (confirm('Are you sure?')) {
    for (let i = 0; i < breedId.length; i++) {
      if (breedId === breedArr[i].breed) {
        breedArr.splice(i, 1);
        renderBreedTable(breedArr);
        // Update data of Breed in LocalStorage
        saveToStorage('breedDatas', JSON.stringify(breedArr));
      }
    }
  }
};
