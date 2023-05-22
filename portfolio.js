var translations = {};

window.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementsByTagName('main')[0];
  textElement.style.animationPlayState = 'running';

  const header = document.getElementsByTagName('header')[0];
  const a = header.getElementsByTagName('a');
  for(var i = 0; i < a.length ; i++){
    a[i].addEventListener("click", (event) => {
      if(!event.target.classList.contains("selected")){
        const selectedElement = header.getElementsByClassName("selected")[0];
        selectedElement.classList.remove("selected");
        const selectedElementClass = selectedElement.classList[0];
        const targetElementClass = event.target.classList[0];
        event.target.classList.add("selected");
        const contentToShow = document.getElementsByTagName("main")[0].getElementsByClassName(targetElementClass)[0];
        const contentToHide = document.getElementsByTagName("main")[0].getElementsByClassName(selectedElementClass)[0];
        contentToHide.setAttribute("hidden", true);
        contentToShow.removeAttribute("hidden");
      }
    });
  }
});


function loadTranslations(lang) {
  fetch('translations.json')
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
  document.getElementById('languageIcon').src = `Icon/${newLang}.png`;
}



