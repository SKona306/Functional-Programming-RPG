
import { changeState } from "./changeState";


const generateRandomNum = () => {
  return Math.floor(Math.random() * 3);
};

const walkOrFightRandomizer = () => {
  const randomNum = Math.floor(Math.random() * 100);
  if(randomNum >= 1 && randomNum <= 70) {
    return "walk";
  } else if(randomNum > 70) {
    return "fight";
  }
};

const hitOrMissRandomizer = () => {
  const randomNum = Math.floor(Math.random() * 100);
  if(randomNum > 1 && randomNum <= 80){
    return "hit";
  }else if(randomNum > 80) {
    return "miss";
  }
};

const canHeal = (player) => {
  if(player.hp < player.maxhp) {
    return "canHeal";
  }else if(player.hp >= player.maxhp) {
    return "cantHeal";
  }
};

const canFlee = () => {
  const randomNum = Math.floor(Math.random() * 100);
  if(randomNum > 1 && randomNum <= 50) {
    return "canFlee";
  } else if(randomNum > 50) {
    return "cantFlee";
  }
};

const hasCharacterDied = (player) => {
  if (player.hp == 0) {
    return "died";
  } else if (player.hp > 0){
    return "alive";
  }
};

const damageTaken = changeState("hp")(-1);
const usePotion = changeState("hp")(1);
const useSleep = (player) => {
  return changeState("hp")(player.maxhp - player.hp);
};

export {
  generateRandomNum, walkOrFightRandomizer, hitOrMissRandomizer, canHeal, canFlee, hasCharacterDied, damageTaken, usePotion, useSleep
};

// const heal = () => {
//   changeState("HP") // add 30% of current HP to HP
// };

// const sleep = () => {
//   changeState("HP") // changes HP to 100% of available value
// };