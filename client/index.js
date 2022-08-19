const characterContainer = document.getElementById("characters-container");
const showBtn = document.getElementById("show-btn");
const playerDiv = document.getElementById("player-character-div");
const enemyDiv = document.getElementById("enemy-character-div");
const playBtn = document.getElementById("play-button");
const attackBtn = document.getElementById("attack-button");
const resetBtn = document.getElementById("play-again");

const userGreeting = document.getElementById("username-greeting");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit-button");

const aboutBtn = document.getElementById("about-button");
const closeAboutBtn = document.getElementById("close-about-button");
const closeRulesBtn = document.getElementById("close-rules-button");
const overlay = document.getElementById("overlay");

aboutBtn.addEventListener("click", () => {
  const about = document.getElementById("about");
  openAbout(about);
});

overlay.addEventListener("click", () => {
  const about = document.getElementById("about");
  closeAbout(about);
});

closeAboutBtn.addEventListener("click", () => {
  const about = document.getElementById("about");
  closeAbout(about);
});

function openAbout(about) {
  about.classList.add("active");
  overlay.classList.add("active");
}
function closeAbout(about) {
  about.classList.remove("active");
  overlay.classList.remove("active");
}

//
const rulesBtn = document.getElementById("rules-button");

rulesBtn.addEventListener("click", () => {
  const rules = document.getElementById("rules");
  openAbout(rules);
});

overlay.addEventListener("click", () => {
  const rules = document.getElementById("rules");
  closeRules(rules);
});

closeRulesBtn.addEventListener("click", () => {
  const rules = document.getElementById("rules");
  closeRules(rules);
});

function openRules(rules) {
  rules.classList.add("active");
  overlay.classList.add("active");
}
function closeRules(rules) {
  rules.classList.remove("active");
  overlay.classList.remove("active");
}

let selectedCharacterArr = [];
let enemyCharacterArr = [];
let userPlayer = [];
let enemyPlayer = [];
let winScore = [];
let lostScore = [];
let indexOfSelectedPlayer = [];
let removedIdCharacter = undefined;
let playerCharIndex = undefined;

const baseURL = `/api`;

const charactersCallback = ({ data: characters }) =>
  displayCharacters(characters);
const errCallback = (err) => console.log(err.response.data);

const createUser = (body) => {
  let selectSound = new Audio();
  selectSound.src = "./audio.mp3";
  selectSound.play();
  let newUser = {
    username: usernameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };
  axios
    .post(baseURL + `/user`, newUser)
    .then((res) => {
      alert(`WELCOME ${res.data}!`);
    })
    .catch(errCallback);

  usernameInput.value = "";
  passwordInput.value = "";
  emailInput.value = "";
};

const getAllCharacters = () =>
  axios
    .get(baseURL + `/characters`)
    .then(charactersCallback)
    .catch(errCallback);

function createCharacterCard(characters) {
  const characterCard = document.createElement("div");
  characterCard.classList.add("player-card");
  characterCard.innerHTML = `<section id=${characters.id} ><img alt='char img' src=${characters.imgUrl} class="character-img"/>
    <p class="character-name">Name: ${characters.name}</p>
    <p class="character-health">Health: ${characters.health}</p>
    <p class="character-defend">Defend: ${characters.defend}</p>
    <p class="character-attack">Attack: ${characters.attack}</p>
    <button class="char-btn" onclick ="showPlayerChar(${characters.id})">SELECT</button>
    </section>
    `;
  characterContainer.appendChild(characterCard);
}

function showPlayerChar(id) {
  if (indexOfSelectedPlayer.length !== 0) {
    let playerCard = document.getElementById("player-id");
    playerDiv.removeChild(playerCard);
  }
  indexOfSelectedPlayer.push(id);
  let selectedPlayer = selectedCharacterArr[id];
  const selectedPlayerCard = document.createElement("div");
  selectedPlayerCard.classList.add("player-card");
  selectedPlayerCard.setAttribute("id", "player-id");
  selectedPlayerCard.innerHTML = `<section id=${selectedPlayer.id} ><img alt='char img' src=${selectedPlayer.imgUrl} class="character-img"/>
    <p class="character-name">Name: ${selectedPlayer.name}</p>
    <p class="character-health">Health: ${selectedPlayer.health}</p>
    <p class="character-defend">Defend: ${selectedPlayer.defend}</p>
    <p class="character-attack">Attack: ${selectedPlayer.attack}</p>
    </select>
    `;

  playerDiv.appendChild(selectedPlayerCard);
  userPlayer.push(selectedPlayer);
}

function showEnemyChar() {
  if (enemyCharacterArr.length !== 0) {
    let enemyCard = document.getElementById("enemy-id");
    enemyDiv.removeChild(enemyCard);
  }
  playerCharIndex = indexOfSelectedPlayer[0];
  enemyCharacterArr = selectedCharacterArr;
  removedIdCharacter = enemyCharacterArr.splice(playerCharIndex, 1);

  let randomIndex = Math.floor(Math.random() * enemyCharacterArr.length);
  let randomEnemyCharacter = enemyCharacterArr[randomIndex];
  const enemyPlayerCard = document.createElement("div");

  enemyPlayerCard.classList.add("player-card");
  enemyPlayerCard.setAttribute("id", "enemy-id");
  enemyPlayerCard.innerHTML = `<section id=${randomEnemyCharacter.id} ><img alt='char img' src=${randomEnemyCharacter.imgUrl} class="character-img"/>
    <p class="character-name">Name: ${randomEnemyCharacter.name}</p>
    <p class="character-health">Health: ${randomEnemyCharacter.health}</p>
    <p class="character-defend">Defend: ${randomEnemyCharacter.defend}</p>
    <p class="character-attack">Attack: ${randomEnemyCharacter.attack}</p>
    </select>
    `;
  let battleSound = new Audio();
  battleSound.src = "./battle.mp3";
  battleSound.play();

  enemyDiv.appendChild(enemyPlayerCard);
  enemyPlayer.push(randomEnemyCharacter);
}


function idChecker(id) {
  if (document.body.contains(document.getElementById(id))) {
    return true;
  } else {
    return false;
  }
}
let enemyStatus = idChecker("enemy-id");
let playerStatus = idChecker("player-id");


const figthResult = () => {
console.log(enemyStatus)
console.log(playerStatus)

  if (enemyStatus == false || playerStatus == false) {
    return alert(
      "Please SELECT you champion and PRESS JOIN BATTLE to add an enemy!"
    );
  } else {
    let selectSound = new Audio();
    selectSound.src = "./attack.mp3";
    selectSound.play();

    userPlayer = userPlayer[0];
    enemyPlayer = enemyPlayer[0];
    let playerDamage = parseInt(userPlayer.attack - enemyPlayer.defend);
    let enemyDamage = parseInt(enemyPlayer.attack - userPlayer.defend);

    if (playerDamage > enemyDamage) {
      winScore.push(parseInt(1));
      setTimeout(function () {
        alert("You won!");
      }, 2000);
    } else {
      lostScore.push(parseInt(1));
      setTimeout(function () {
        alert("you lose!");
      }, 2000);
    }
  }

  const showScore = () => {
    let winResult = document.getElementById("win-score");
    winResult.innerHTML = `${winScore.length}`;
    let lostResult = document.getElementById("lost-score");
    lostResult.innerHTML = `${lostScore.length}`;
  };
  showScore();
};

function emptyBattleContainer() {
  let enemyCard = document.getElementById("enemy-id");
  enemyDiv.removeChild(enemyCard);
  let playerCard = document.getElementById("player-id");
  playerDiv.removeChild(playerCard);
  enemyCharacterArr.splice(playerCharIndex, 0, removedIdCharacter);
  enemyCharacterArr = [];
  enemyPlayer = [];
  userPlayer = [];
  indexOfSelectedPlayer = [];
  getAllCharacters();
}

const resetPlay = () => {
  //work on a bug!
  if (enemyStatus == false && playerStatus === false) {
    return alert(
      "Please SELECT you champion and PRESS JOIN BATTLE to add an enemy!"
    );
  } else {
  let resetSound = new Audio();
  resetSound.src = "./sword.mp3";
  resetSound.play();
    emptyBattleContainer();
  }
};

function displayCharacters(arr) {
  let resetSound = new Audio();
  resetSound.src = "sword.mp3";
  resetSound.play();

  selectedCharacterArr = arr;
  characterContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createCharacterCard(arr[i]);
  }
}

showBtn.addEventListener("click", getAllCharacters);
playBtn.addEventListener("click", showEnemyChar);
submitBtn.addEventListener("click", createUser);
attackBtn.addEventListener("click", figthResult);
resetBtn.addEventListener("click", resetPlay);
