import changeState from "./changeState";

const setEnemyHp = changeState("enemyHitPoints");
const setEnemyDamage = changeState("enemyDamage");
const setEnemyDefense = changeState("enemyDefense");

export { setEnemyHp, setEnemyDamage, setEnemyDefense};