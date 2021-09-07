let likeBtn = document.querySelector(".like svg");
let img = document.querySelector(".photo img");
let songName = document.querySelector(".song-info h2");
let songer = document.querySelector(".song-info p");
let song = document.getElementById("song");
let progressBar = document.querySelector(".progressBar");
let progress = document.querySelector(".progress");
let songDuration = document.querySelector(".songDuration");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let pauseBtn = document.getElementById("pause");
let playBtn = document.getElementById("play");
let playSong = document.querySelector(".play");
let state = document.querySelector(".state");
state.innerHTML = "Paused";

const data = [
  {
    name: "Smells Like Teen Spirit",
    songer: "Nirvana",
    liked: false,
  },
  {
    name: "Why’d You Only Call Me When You’re High?",
    songer: "Arctic Monkeys",
    liked: true,
  },
  {
    name: "Don't Let Me Down",
    songer: "The Beatles",
    liked: true,
  },
];

const truncate = (text, num) => {
  return text.length > num ? text.slice(0, num) + "..." : text;
};

let playing;

pauseBtn.addEventListener("click", () => {
  playSong.classList.remove("active");
  song.pause();
  playing = false;
  state.innerHTML = "Paused";
});

playBtn.addEventListener("click", () => {
  playSong.classList.add("active");
  playing = true;
  state.innerHTML = "Now Playing";
  setTimeout(function () {
    song.play();
  }, 100);
});

let index = 0;

const loadSong = (i) => {
  songName.innerHTML = truncate(data[i].name, 24);
  songer.innerHTML = data[i].songer;
  img.src = `../images/${i}.jpg`;
  song.src = `../songs/${i}.mp3`;
  playing ? song.play() : song.pause();

  likeSong(i);
};
loadSong(index);

const nextSong = () => {
  index++;
  if (index > data.length - 1) {
    index = 0;
  }
  loadSong(index);
};

const prevSong = () => {
  index--;
  if (index < 0) {
    index = data.length - 1;
  }
  loadSong(index);
};

nextBtn.addEventListener("click", () => {
  nextSong();
});

prevBtn.addEventListener("click", () => {
  prevSong();
});

function likeSong(i) {
  data[i].liked
    ? document.querySelector(".like").classList.add("active")
    : document.querySelector(".like").classList.remove("active");
}

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

song.addEventListener("timeupdate", (e) => {
  let time = (e.srcElement.currentTime / e.srcElement.duration) * 100;
  document.querySelector(".current").style.width = `${time}%`;
 
  document.querySelector(".songDuration").innerHTML = calculateTime(
    song.duration
  );
  document.querySelector(".progress").innerHTML = calculateTime(
    song.currentTime
  );
});

song.addEventListener("ended", () => {
  nextSong();
});

const setProgress = (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = song.duration;
  song.currentTime = (clickX / width) * duration;
};

progressBar.addEventListener("click", setProgress);
