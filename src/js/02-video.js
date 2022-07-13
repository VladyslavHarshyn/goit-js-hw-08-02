import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);

let saveTime = localStorage.getItem("videoplayer-current-time");

player.on("timeupdate", throttle(onPlayerTime, 1000));

function onPlayerTime({ seconds }) {
  localStorage.setItem("videoplayer-current-time", seconds);
}

let time = localStorage.getItem("videoplayer-current-time");
player.setCurrentTime(saveTime);
