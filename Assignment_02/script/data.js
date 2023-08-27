'use strict';
const btnImport = document.getElementById('import-btn');
const btnExport = document.getElementById('export-btn');
const inputFile = document.getElementById('input-file');
const petData = JSON.parse(getFromStorage('petDatas'));

// Save and Export data of pet
function saveDynamicDataToFile() {
  var blob = new Blob([JSON.stringify(petData, null, '\t')], {
    type: '/plain;charset=utf-8',
  });

  saveAs(blob, 'DataPet.json');
}
btnExport.addEventListener('click', saveDynamicDataToFile);

// Import data from json file
inputFile.type = 'file';
inputFile.onchange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');

  reader.onload = (readerEvent) => {
    const content = readerEvent.target.result;
    const petArr = JSON.parse(content);
    saveToStorage('petDatas', JSON.stringify(petArr));
  };
};
btnImport.addEventListener('click', inputFile.click);
