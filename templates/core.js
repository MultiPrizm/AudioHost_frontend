
function downloadFile(event) {
  console.log(`loading: ${event}`);
  document.location.href = `/api/download/${event.target.name}`;
};

function Load(){
  const audioList = fetch("/api/info/list", {
      method: "GET"
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)

    data["response"].forEach(element => {
      addAudioToList(element);
    });
  })
};

function addAudioToList(audioFile) {
  // Створюємо новий div елемент
  const newDiv = document.createElement('div');
  newDiv.className = 'list-item';

  const newAudio = document.createElement('audio');
  const newSourse = document.createElement('source');

  newAudio.id = 'audio';
  newAudio.controls = true;

  newSourse.type = 'audio/mpeg';
  newSourse.src = `/api/audio/${audioFile}`;

  newAudio.appendChild(newSourse);

  newDiv.appendChild(newAudio);

  const newButton = document.createElement('button');
  newButton.textContent = 'download';
  newButton.className = 'download-button';
  newButton.name = audioFile;

  newButton.addEventListener("click", downloadFile, false);

  newDiv.appendChild(newButton);

  // Додаємо новий div до списку
  document.getElementById('audioList').appendChild(newDiv);
};

Load();

const parentDOM = document.getElementById("audioList");



document.addEventListener('DOMContentLoaded', () => {
  // Отримуємо всі елементи з класом 'download-button'
  const downloadButtons = parentDOM.getElementsByClassName("download-button");

  // Перебираємо кожну кнопку
  downloadButtons.classList.forEach((button) => {
      // Ваш код для обробки кожної кнопки
      console.log(button);

      // Наприклад, можна додати обробник події 'click'
      button.addEventListener('click', () => {
          console.log('Button clicked:', button);
          // Ваш код для обробки натискання на кнопку
      });
  });
});