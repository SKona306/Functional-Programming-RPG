import {changeState, changeStateString} from "./changeState";

const setName = changeStateString("name");
const setDefense = changeState("defense");
const setMaxHp = changeState("maxHP");
const setCurrentHp = changeState("HP"); 
const setStrength = changeState("strength");
const setCharType = changeState("charType");
const setMagic = changeState("magic");

export {
  setDefense, setMaxHp, setCurrentHp, setStrength, setCharType, setMagic, setName
};