const arrowImg = document.querySelector(".arrow-img");
const arrowContainer = document.querySelector(".arrow-cont");
const levelsHeader = document.querySelector(".level-of-knowledge-header");
const asterisk1 = document.querySelector(".asterisk1");
const levelsContainer = document.querySelector(".levels-list-container");
const beginnerLevel = document.getElementById("beginner");
const intermediateLevel = document.getElementById("intermediate");
const professionalLevel = document.getElementById("professional");
const levelOfKnowledgeTxt = document.querySelector(".level-of-knowledge-txt");
const chooseHeader = document.querySelector(".choose-character-header");
const charArrowImg = document.querySelector(".character-arrow-img");
const asterisk3 = document.querySelector(".asterisk3");
const doneBtn = document.querySelector(".done-btn");
const chooseCharacterTxt = document.querySelector(".choose-character-txt");
const errorBlock = document.querySelector(".error-block");
const turnOffBtn = document.querySelector(".x-icon");
const chessPlayersContainer = document.querySelector(
  ".chess-players-container"
);

//Bringing user array from local storage and parsing to add second registration page information and save into local storage again
const userFromLocalStorage = localStorage.getItem("user");
let updatedUser = JSON.parse(userFromLocalStorage);

//Arrow effect algorithm for list's headers
let toggle = true;
const toggleArrow = function () {
  toggle = !toggle;
  if (toggle) {
    arrowImg.src = "./images/btm-arrow.svg";
  } else {
    arrowImg.src = "./images/top-arrow.svg";
    asterisk1.style.display = "none";
  }
};

levelsHeader.addEventListener("click", function () {
  levelsContainer.classList.toggle("show");
  toggleArrow();
});

//If experience level is chosen user array should be filled by this value
beginnerLevel.addEventListener("click", function () {
  levelOfKnowledgeTxt.textContent = beginnerLevel.textContent;
  updatedUser = {
    ...updatedUser,
    experience_level: beginnerLevel.textContent,
  };
  levelsContainer.classList.toggle("show");
  toggleArrow();
});

intermediateLevel.addEventListener("click", function () {
  levelOfKnowledgeTxt.textContent = intermediateLevel.textContent;
  updatedUser = {
    ...updatedUser,
    experience_level: intermediateLevel.textContent,
  };
  levelsContainer.classList.remove("show");
  toggleArrow();
});

professionalLevel.addEventListener("click", function () {
  levelOfKnowledgeTxt.textContent = professionalLevel.textContent;
  updatedUser = {
    ...updatedUser,
    experience_level: professionalLevel.textContent,
  };
  levelsContainer.classList.remove("show");
  toggleArrow();
});

chooseHeader.addEventListener("click", function () {
  toggle = !toggle;
  if (toggle) {
    charArrowImg.src = "./images/btm-arrow.svg";
    chessPlayersContainer.classList.toggle("show");
  } else {
    charArrowImg.src = "./images/top-arrow.svg";
    asterisk3.style.display = "none";
    chessPlayersContainer.classList.toggle("show");
  }
});

//this API does not work properly, so for API imitation creating images array
const paths = [
  "./images/nona.png",
  "./images/wilhelm.png",
  "./images/bobby.png",
  "./images/magnus.png",
];

//fetching grandmasters information from chess-tournament-api.devtest.ge and using it
const arr = [];
fetch("https://chess-tournament-api.devtest.ge/api/grandmasters")
  .then((r) => r.json())
  .then((res) => {
    chessPlayersContainer.innerHTML = "";
    res.forEach((el, index) => {
      arr.push(el);
      const playersHtml = `
      <li class="player-row" id='${index}'>
           <span id='${index}' class="player-name">${el.name}</span>
            <img id='${index}' class="player-img" src="${paths[index]}" alt="${el.id} player img" />
        </li>
      `;
      chessPlayersContainer.innerHTML += playersHtml;
    });
  });

//When concrete grandmaster is clicked user array fills by it's ID
chessPlayersContainer.addEventListener("click", function (e) {
  document.querySelector(".choose-character-txt").textContent =
    arr[Number(e.target.id)].name;
  chessPlayersContainer.classList.remove("show");
  document.querySelector(".create-acc-text").textContent = "Almost Done!";
  updatedUser = {
    ...updatedUser,
    character_id: Number(e.target.id) + 1,
  };
});
//Turn of button for error window
turnOffBtn.addEventListener("click", function () {
  errorBlock.style.opacity = 0;
});

//If answer:yes is selected user fills by yes
document.getElementById("yes").addEventListener("click", function () {
  if (document.getElementById("yes").checked === true) {
    updatedUser = {
      ...updatedUser,
      already_participated: true,
    };
  }
});

//If answer:no is selected user fills by no
document.getElementById("no").addEventListener("click", function () {
  if (document.getElementById("no").checked === true) {
    updatedUser = {
      ...updatedUser,
      already_participated: false,
    };
  }
});

//Done button click event listener
doneBtn.addEventListener("click", function (e) {
  localStorage.removeItem("user");
  //Saving all information in local storage
  localStorage.setItem("user", JSON.stringify(updatedUser));
  //Checking if one of the field us bit selected, registration will not be completed
  if (
    levelOfKnowledgeTxt.textContent === "level of knowledge" ||
    chooseCharacterTxt.textContent === "Choose your character" ||
    (document.getElementById("no").checked === false &&
      document.getElementById("yes").checked === false)
  ) {
    e.preventDefault();
    errorBlock.style.opacity = 1;
  }

  //Sending all information to the register server
  fetch("https://chess-tournament-api.devtest.ge/api/register", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      date_of_birth: updatedUser.date_of_birth,
      experience_level: updatedUser.experience_level.toLowerCase(),
      already_participated: updatedUser.already_participated,
      character_id: updatedUser.character_id,
    }),
  });
});
