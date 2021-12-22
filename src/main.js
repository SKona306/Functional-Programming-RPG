import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import gameFunction from '.js/gameFunction.js';
import storeState from "./js/storeState";
import {charTypesArr} from "./js/characterTypes";
import {stateControl, stateControlEnemy} from './js/stateControl';
import {setName} from './js/characterFunction';
import {canFlee, canHeal, damageTaken, generateRandomNum, hasCharacterDied, hitOrMissRandomizer, usePotion, useSleep, walkOrFightRandomizer} from './js/gameFunction';
import enemyArr from './js/enemyTypes';

//stateControl() seems to act as a short-term snapshot of player one...This represents the player in a game

$(document).ready(function() {
  $("form.playerCreation").submit(function (event) {
    event.preventDefault();
    const charName = $("input#charName").val();
    const charTypeVal = $("select#charType").val();
    const player = storeState(charTypesArr[charTypeVal]); // setsup stats initial stats for character
    stateControl(player); // creates player with stats that match characterTypes array
    console.log(stateControl(setName(charName))); // attatches name to character.
    showStats();// function can be called whenever you need to update stats 
    $(".banner").hide(); //add animation here so transition isnt so drastic
    $("#statsPage").show();
  });

  $("button#start").click(function(){
    const randomizer = generateRandomNum(); // generates random number between 1-3 
    const enemy = storeState(enemyArr[randomizer]); // uses random number above to create enemy from enemy array
    console.log(stateControlEnemy(enemy)); // calls the current 
    $("#start").hide();
    $(".rules").hide();
    $("#walkingGameBoard").show();
  });

  $("button#walk").click(function() {
    let response = walkOrFightRandomizer();
    if(response === "walk") {
      console.log("you have walked one mile");
    } else if (response === "fight"){
      $("#walkingGameBoard").hide();
      showEnemyStats();
      $("#actionGameBoard").show();
    }
  });

  $("button#heal").click(function() {
    const newPlayerState = stateControl();
    const healVar = canHeal(newPlayerState);
    if(healVar == "canHeal") {
      stateControl(usePotion);
      showStats();
      console.log("the potion has recovered two hp");
    }else if (healVar == "cantHeal") {
      console.log("you character already has max hp");
    }
  });

  $("button#sleep").click(function() {
    const newPlayerState = stateControl();
    const healVar = canHeal(newPlayerState);
    if(healVar == "canHeal") {
      stateControl(useSleep(newPlayerState));
      showStats();
      console.log("your character has recovered 100% hp");
    } else if(healVar == "cantHeal") {
      console.log("your character already has max hp");
    }
  }); 

  $("button#attack").click(function() { //not working
    const newPlayerState = stateControl();
    const newEnemyState = stateControlEnemy();
    const attackBool = hitOrMissRandomizer();
    if(attackBool == "hit") {
      console.log("you hit the enemy");
      stateControlEnemy(damageTaken);
      const diedVar = hasCharacterDied(newEnemyState);
      if(diedVar == "died") {
        console.log("the enemy has died");
        $("#actionGameBoard").hide();
        $("#walkingGameBoard").show();
      } else if (diedVar == "alive") {
        showEnemyStats();
      }
    } else if(attackBool == "miss"){ // works
      console.log("your attack missed");
      console.log("the enemy landed a counter attack");
      stateControl(damageTaken);
      const diedVar = hasCharacterDied(newPlayerState);
      if(diedVar == "died") {
        $("#actionGameBoard").hide();
        $("#gameOver").show();
      } else if (diedVar == "alive") {
        showStats();
      }
    }
  });

  $("button#potion").click(function() {
    const newPlayerState = stateControl();
    const healVar = canHeal(newPlayerState);
    if(healVar == "canHeal") {
      stateControl(usePotion);
      showStats();
      console.log("the potion has recovered two hp");
    }else if (healVar == "cantHeal") {
      console.log("you character already has max hp");
    }
  });

  $("button#flee").click(function() { 
    const newPlayerState = stateControl();
    const fleeVar = canFlee();
    if(fleeVar == "canFlee") {
      console.log("you have successfully fleed");
      $("#actionGameBoard").hide();
      $("#walkingGameBoard").show();
      showStats();
    } else if (fleeVar == "cantFlee"){  // this branch of if else statement does not seem to work as it fails to update the characters new stats
      console.log("your flee attempt failed");
      console.log("The enemy landed a successful blow");
      stateControl(damageTaken);
      const diedVar = hasCharacterDied(newPlayerState);
      if(diedVar == "died") {
        $("#actionGameBoard").hide();
        $("#gameOver").show();
      } else {
        showStats();
      }
      
    }
  });

  function showStats() {
    const newState = stateControl();
    $("#nameBanner").empty().append(newState.name);
    $("#currentStats").empty().append(`<li id="hp">HP: ${newState.hp}</li>`);
    $("#currentStats").append(`<li id="strength">Strength: ${newState.strength}</li>`);
    $("#currentStats").append(`<li id="defense">Defense: ${newState.defense}</li>`);
    $("#currentStats").append(`<li id="magic">Magic: ${newState.magic}</li>`);
  }

  function showEnemyStats() {
    const newState = stateControlEnemy();
    $("#currentEnemyStats").empty().append(`<li id="enemytype">Type: ${newState.type}</li>`);
    $("#currentEnemyStats").append(`<li id="enemyhp">HP: ${newState.hp}</li>`);
    $("#currentEnemyStats").append(`<li id="enemystrength">Strength: ${newState.strength}</li>`);
    $("#currentEnemyStats").append(`<li id="enemydefense">Defense: ${newState.defense}</li>`);
  }
});

