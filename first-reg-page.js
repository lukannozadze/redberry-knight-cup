const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const telInput = document.getElementById("tel-input");
const dateInput = document.getElementById("date-input");
const firstBox = document.querySelector(".pers-info");
const correctIcon1 = document.querySelector(".correct-icon1");
const correctIcon2 = document.querySelector(".correct-icon2");
const correctIcon3 = document.querySelector(".correct-icon3");
const correctIcon4 = document.querySelector(".correct-icon4");
const errorBlock = document.querySelector(".error-block");
const errName = document.querySelector(".err-name");
const errText = document.querySelector(".error-txt");
const turnOffBtn = document.querySelector(".x-icon");
const nextBtn = document.querySelector(".next-btn");
const emailRule = /@redberry.ge$/gm;
const nameRule = /\w{2,}/gm;
const telRule = /^\d{9}$/gm;
const boxOneTxt = document.querySelector(".box-txt1");

//Correct input value's array initialization
let user = {};

//Error text change function initialization
const changeError = function (str) {
  errName.textContent = `Invalid ${str}`;
  errText.textContent = `Please enter valid ${str}`;
};

//Name input focus event listener
nameInput.addEventListener("focus", function () {
  changeError("Name");
  document.querySelector(".asterisk1").style.opacity = 0;
  firstBox.style.backgroundColor = "#E9FAF1";
  //Check if name input value is valid in focus
  //Rule: two or more symbols
  if (nameRule.test(nameInput.value)) {
    correctIcon1.style.opacity = 1;
    errorBlock.style.opacity = 0;
    nameInput.style.backgroundColor = "#FFFFFF";
    nameInput.style.color = "#000000";
  }
});

//Name input blur event listener
nameInput.addEventListener("blur", function () {
  document.querySelector(".asterisk1").style.opacity = 1; //
  firstBox.style.backgroundColor = "#FFFFFF";
  if (nameInput.value !== "") {
    document.querySelector(".asterisk1").style.opacity = 0;
    firstBox.style.backgroundColor = "#E9FAF1";
  }
  //Check if name inout value is not valid in blur
  if (!nameRule.test(nameInput.value)) {
    correctIcon1.style.opacity = 0;
    errorBlock.style.opacity = 1;
    nameInput.style.backgroundColor = "#FFEFEF";
    nameInput.style.color = "#DC3545";
  } else {
    correctIcon1.style.opacity = 1;
    //If it's correct finally, user array should fill by this input value
    user = {
      ...user,
      name: nameInput.value,
    };
    errorBlock.style.opacity = 0;
    nameInput.style.backgroundColor = "#FFFFFF";
    nameInput.style.color = "#000000";
  }
});

//Email input focus event listener
emailInput.addEventListener("focus", function () {
  changeError("Email");

  document.querySelector(".asterisk2").style.opacity = 0;
  firstBox.style.backgroundColor = "#E9FAF1";
  //Check if email input value is valid in focus
  //Rule: email input value should be in Redberry format(@redberry.ge)
  if (emailRule.test(emailInput.value)) {
    correctIcon2.style.opacity = 1;
    errorBlock.style.opacity = 0;
    emailInput.style.backgroundColor = "#FFFFFF";
    emailInput.style.color = "#000000";
  }
});
//Email input blur event listener
emailInput.addEventListener("blur", function () {
  document.querySelector(".asterisk2").style.opacity = 1; //
  firstBox.style.backgroundColor = "#FFFFFF";
  if (emailInput.value !== "") {
    document.querySelector(".asterisk2").style.opacity = 0;
    firstBox.style.backgroundColor = "#E9FAF1";
  }
  //Check if name inout value is not valid in blur
  if (!emailRule.test(emailInput.value)) {
    correctIcon2.style.opacity = 0;
    errorBlock.style.opacity = 1;
    emailInput.style.backgroundColor = "#FFEFEF";
    emailInput.style.color = "#DC3545";
  } else {
    correctIcon2.style.opacity = 1;
    //If it's correct finally, user array should fill by this input value
    user = {
      ...user,
      email: emailInput.value,
    };
    errorBlock.style.opacity = 0;
    emailInput.style.backgroundColor = "#FFFFFF";
    emailInput.style.color = "#000000";
  }
});

//Number input focus event listener
telInput.addEventListener("focus", function () {
  changeError("Number");
  document.querySelector(".asterisk3").style.opacity = 0;
  firstBox.style.backgroundColor = "#E9FAF1";
  //Check if number input value is valid in focus
  //Rule: number input value should 9 digits long
  if (telRule.test(telInput.value)) {
    correctIcon3.style.opacity = 1;
    errorBlock.style.opacity = 0;
    telInput.style.backgroundColor = "#FFFFFF";
    telInput.style.color = "#000000";
  }
});
//Number input blur event listener
telInput.addEventListener("blur", function () {
  document.querySelector(".asterisk3").style.opacity = 1; //
  firstBox.style.backgroundColor = "#FFFFFF";
  if (telInput.value !== "") {
    document.querySelector(".asterisk3").style.opacity = 0;
    firstBox.style.backgroundColor = "#E9FAF1";
  }
  //Check if email inout value is not valid in blur
  if (!telRule.test(telInput.value)) {
    correctIcon3.style.opacity = 0;
    errorBlock.style.opacity = 1;
    telInput.style.backgroundColor = "#FFEFEF";
    telInput.style.color = "#DC3545";
  } else {
    correctIcon3.style.opacity = 1;
    //If it's correct finally, user array should fill by this input value
    user = {
      ...user,
      phone: telInput.value,
    };
    errorBlock.style.opacity = 0;
    telInput.style.backgroundColor = "#FFFFFF";
    telInput.style.color = "#000000";
  }
});

//Date input focus event listener
dateInput.addEventListener("focus", function () {
  document.querySelector(".asterisk4").style.opacity = 0;
  firstBox.style.backgroundColor = "#E9FAF1";
});
//Date input blur event listener
dateInput.addEventListener("blur", function () {
  changeError("Date");
  document.querySelector(".asterisk4").style.opacity = 1; //
  firstBox.style.backgroundColor = "#FFFFFF";
  // Check if date input value is not empty
  //Date input value has no rule according to requirements
  if (dateInput.value !== "") {
    document.querySelector(".asterisk4").style.opacity = 0;
    firstBox.style.backgroundColor = "#E9FAF1";
    errorBlock.style.opacity = 0;
    correctIcon4.style.opacity = 1;
    user = {
      //If it is not empty, user array should fill by this input value
      ...user,
      date_of_birth: dateInput.value,
    };
  } else {
    errorBlock.style.opacity = 1;
    correctIcon4.style.opacity = 0;
  }
});
//Turn of button for error window
turnOffBtn.addEventListener("click", function () {
  errorBlock.style.opacity = 0;
});

//Next button click event listener
nextBtn.addEventListener("click", function (e) {
  //Check if input values are valid, save user array in local storage
  if (
    nameInput.value.match(nameRule) &&
    emailInput.value.match(emailRule) &&
    telInput.value.match(telRule)
  ) {
    localStorage.setItem("user", JSON.stringify(user));
    boxOneTxt.style.display = "none";
    const doubleCorrect = document.createElement("img");
    doubleCorrect.src = "./images/icon-doubleCorrect.png";
    firstBox.append(doubleCorrect);
    doubleCorrect.style.padding = "4px 0px 0px 0px";
    //Otherwise, user is unable to move  second registration page
  } else {
    e.preventDefault();
    errName.textContent = `Invalid fields`;
    errText.textContent = `Please fill in valid information`;
    errorBlock.style.opacity = 1;
  }
});
//Next button click event listener
nextBtn.addEventListener("click", function (e) {
  //Check if one of the input values is empty, user is unable to move second registration page
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    telInput.value === "" ||
    dateInput.value === ""
  ) {
    e.preventDefault();
    errName.textContent = `Invalid fields`;
    errText.textContent = `Please fill in all required fields`;
    errorBlock.style.opacity = 1;
  }
});

//When user presses back in second registration page, information in the first registration page
//should not be lost, for this little effect input fields fill from user array, and user array from - local storage
if (!localStorage.getItem("user")) {
  nameInput.value = "";
  emailInput.value = "";
  telInput.value = "";
  dateInput.value = "";
} else {
  user = {
    name: JSON.parse(localStorage.getItem("user")).name,
    email: JSON.parse(localStorage.getItem("user")).email,
    phone: JSON.parse(localStorage.getItem("user")).phone,
    date_of_birth: JSON.parse(localStorage.getItem("user")).date_of_birth,
  };
  nameInput.value = JSON.parse(localStorage.getItem("user")).name;
  emailInput.value = JSON.parse(localStorage.getItem("user")).email;
  telInput.value = JSON.parse(localStorage.getItem("user")).phone;
  dateInput.value = JSON.parse(localStorage.getItem("user")).date_of_birth;

  for (let i = 1; i < 5; i++) {
    document.querySelector(`.asterisk${i}`).style.opacity = 0;
  }
  correctIcon1.style.opacity = 1;
  correctIcon2.style.opacity = 1;
  correctIcon3.style.opacity = 1;
  correctIcon4.style.opacity = 1;
  boxOneTxt.style.display = "none";
  const doubleCorrect = document.createElement("img");
  doubleCorrect.src = "./images/icon-doubleCorrect.png";
  firstBox.append(doubleCorrect);
  doubleCorrect.style.padding = "4px 0px 0px 0px";
}
