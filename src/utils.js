export function throttle(callback, interval) {
  let tooSoon = false;
  return (...args) => {
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(() => (tooSoon = false), interval);
      callback(...args);
    }
  };
}

//generate a random direction
const ArrowDirections = ["left", "right", "up", "down"];

export function randomDirection() {
  const rndm = Math.floor(Math.random() * 4);
  return ArrowDirections[rndm];
}

// generate combo key strokes
const ArrowPairs = [
  ["left", "right"],
  ["left", "up"],
  ["left", "down"],
  ["right", "up"],
  ["right", "down"],
  ["up", "down"]
];

export function randomPair() {
  const rndm = Math.floor(Math.random() * 6);
  return ArrowPairs[rndm];
}

// pre-load images
export const leftArrow = new Image();
export const rightArrow = new Image();
export const downArrow = new Image();
export const upArrow = new Image();

leftArrow.src = "./assets/left50Mosaic.png";
rightArrow.src = "./assets/right50Mosaic.png";
upArrow.src = "./assets/up50Mosaic.png";
downArrow.src = "./assets/down50Mosaic.png";

export const fixedLeft = new Image();
export const fixedRight = new Image();
export const fixedDown = new Image();
export const fixedUp = new Image();

fixedLeft.src = "./assets/leftGray50.png";
fixedRight.src = "./assets/rightGray50.png";
fixedDown.src = "./assets/downGray50.png";
fixedUp.src = "./assets/upGray50.png";
