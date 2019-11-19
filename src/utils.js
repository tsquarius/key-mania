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


const ArrowDirections = ["left", "right", "up", "down"];
export function randomDirection() {
  const rndm = Math.floor(Math.random() * 4);
  return ArrowDirections[rndm];
}