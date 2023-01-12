//If one user completes registration, local storage clears and other user can register without any problem
localStorage.clear();

//When user finishes registration URL changes and user moves to first page for another registration
let currentURL = document.URL;
setTimeout(() => {
  const newURL = currentURL.replace(
    currentURL.slice(currentURL.lastIndexOf("/") + 1),
    "first-reg-page.html"
  );
  window.location.assign(String(newURL));
}, 5000);
