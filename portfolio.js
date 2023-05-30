var translations = {};
var hideContactBar;

window.addEventListener('DOMContentLoaded', () => {
  headerMenuEvents();
  splashScreenEvent();
  contactBarEvents();
});


function loadTranslations(lang) {
  fetch('ressources/translations.json')
    .then(response => response.json())
    .then(data => {
      translations[lang] = data[lang];
      applyTranslations(lang);
    })
    .catch(error => console.error('An error occured while loading translations :', error));
}

function applyTranslations(lang) {
  const keys = Object.keys(translations[lang]);
  keys.forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      element.textContent = translations[lang][key];
    }
  });
}

function toggleLanguage() {
  const newLang = document.documentElement.getAttribute('lang') === 'fr' ? 'en' : 'fr';

  if (!translations[newLang]) loadTranslations(newLang);
  else applyTranslations(newLang);

  document.documentElement.setAttribute('lang', newLang);
  document.getElementById('languageIcon').src = `images/${newLang}.png`;
}

function showCV(){
  const currentLang = document.documentElement.getAttribute('lang');
  if(currentLang == "fr") window.open('ressources/cv_fr.pdf');
  else window.open('ressources/cv_en.pdf');
}

function headerMenuEvents(){
  const header = document.getElementsByTagName('header')[0];
  const a = header.getElementsByTagName('a');

  for(var i = 0; i < a.length ; i++){
    a[i].addEventListener("click", (event) => {
      if(!event.target.classList.contains("selected")){
        const selectedElement = header.getElementsByClassName("selected")[0];
        selectedElement.classList.remove("selected");

        const targetElementClass = event.target.classList[0];
        const selectedElementClass = selectedElement.classList[0];

        event.target.classList.add("selected");

        const contentToShow = document.getElementsByTagName("main")[0].getElementsByClassName(targetElementClass)[0];
        const contentToHide = document.getElementsByTagName("main")[0].getElementsByClassName(selectedElementClass)[0];
        contentToHide.setAttribute("hidden", true);
        contentToShow.removeAttribute("hidden");
      }
    });
  }
}

function showContactBar(event = false){
  const header = document.getElementsByTagName('header')[0];
  const main = document.getElementsByTagName('main')[0];
  const button = document.getElementById("ShowContactBarButton");
  if(event){
    slideContactBar(hideContactBar);
    if(!hideContactBar){
      button.style.right = "5px";
    } else {
      button.style.right = "-40px";
      header.style.marginRight = "310px";
      main.style.marginRight = "310px";
    } 
  } else {
      slideContactBar(hideContactBar);
  }
}

function slideContactBar(slide){
  const contactBar = document.getElementsByClassName("contact-bar")[0];
  const header = document.getElementsByTagName('header')[0];
  const main = document.getElementsByTagName('main')[0];
  const button = document.getElementById("ShowContactBarButton");
  if(slide){
    contactBar.classList.add("slide");
    header.style.marginRight = "0px";
    main.style.marginRight = "0px";
    button.style.backgroundImage = 'url("./images/arrowLeft.png")';
    hideContactBar = false;
  } else {
    contactBar.classList.remove("slide");
    button.style.backgroundImage = 'url("./images/arrowRight.png")';
    hideContactBar = true;
  }
}

function splashScreenEvent(){
  const splashScreen = document.getElementById("splash");
  splashScreen.style.backgroundColor ="white";
  splashScreen.style.color ="#333";
  setTimeout(()=>{
    splashScreen.style.opacity = 0;
    splashScreen.style.zIndex = 0;
    setTimeout(()=>{
      splashScreen.setAttribute("hidden",true);
    },1000);
  },1500)
}

function contactBarEvents(){
  if(window.innerWidth <= 900) hideContactBar = true;
  else hideContactBar = false;
  if (hideContactBar) {
    showContactBar(true);
  } else {
    document.getElementById("ShowContactBarButton").style.right = "-40px";
  }

  addEventListener("resize", (event) => {
    const width = window.innerWidth;
    if(width <= 900 && hideContactBar){
      showContactBar(true);
      hideContactBar = false;
    } else if(width > 900 && !hideContactBar){
      showContactBar(true);
      hideContactBar = true;
    }
  });
}