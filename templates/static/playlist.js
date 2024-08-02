class Sound {
  constructor(endpoint, id) {
    this.endpoint = endpoint;
    this.id = id;
  }

  downloadFile = () => {
    document.location.href = `/api/download/${this.endpoint}`;
  }

  del_from_playlist = () => {
    fetch(`/api/info/playlist/del/${this.id}`, { method: "POST" });
  }
}

class Page {
  constructor(audiolist, page, hide = true) {
    this.audiolist = [];
    this.div = null;

    // Створюємо основний div для сторінки
    const mainNewDiv = document.createElement('div');
    mainNewDiv.className = "page";
    document.getElementById('audioList').appendChild(mainNewDiv);
    this.div = mainNewDiv;

    audiolist["response"].forEach(element => {
      this.addAudioToList(element[0][2], element[0][1], element[0][0]);
    });

    document.getElementById(`page_b_${page}`).addEventListener('click', this.show, false);

    if (hide) {
      this.hide();
    }
  }

  show = () => {
    HideAllPage();
    if (this.div) {
      this.div.style.display = "block";
    } else {
      console.error("Div element not found");
    }
  }

  hide = () => {
    if (this.div) {
      this.div.style.display = "none";
    } else {
      console.error("Div element not found");
    }
  }

  addAudioToList = (audioFile, namefile, id) => {
    // Переконуємось, що 'audioList' існує
    const audioList = document.getElementById('audioList');
    if (!audioList) {
      console.error("Element with id 'audioList' not found.");
      return;
    }

    const newDiv = document.createElement('div');
    this.div.appendChild(newDiv);
    newDiv.className = 'list-item';

    const newAudio = document.createElement('audio');
    const newSourse = document.createElement('source');

    newAudio.id = 'audio';
    newAudio.controls = true;

    newSourse.type = 'audio/mpeg';
    newSourse.src = `/api/audio/${audioFile}`;

    newAudio.appendChild(newSourse);

    const downloadButton = document.createElement('button');
    const listButton = document.createElement('button');

    listButton.textContent = 'remove from list';

    downloadButton.textContent = 'download';
    const newSoung = new Sound(audioFile, id);

    this.audiolist.push(newSoung);

    downloadButton.addEventListener("click", newSoung.downloadFile, false);
    listButton.addEventListener("click", newSoung.del_from_playlist, false);

    const newText = document.createElement('p');
    newText.textContent = namefile;

    newDiv.appendChild(newText);
    newDiv.appendChild(newAudio);
    newDiv.appendChild(downloadButton);
    newDiv.appendChild(listButton);
  }
}

const audiolist = []

async function LoadPage(page, hide = true) {
  const response = await fetch(`/api/info/playlist`, { method: "GET" });
  const data = await response.json();
  console.log(data);

  // Додаємо нову сторінку до списку сторінок
  audiolist.push(new Page(data, page, hide));
};

function HideAllPage() {
  audiolist.forEach(el => {
    el.hide();
  });
}

// Завантажуємо сторінки
LoadPage(1, false);
LoadPage(2);
