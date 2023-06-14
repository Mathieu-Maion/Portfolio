var translations = {};
var hideContactBar;

window.addEventListener('DOMContentLoaded', () => {
  const userLang = navigator.language || navigator.userLanguage;
  if (userLang == "fr") loadTranslations("fr");
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
    splashScreen.style.zIndex = -1;
    setTimeout(()=>{
      splashScreen.setAttribute("hidden",true);
    },1000);
  },1500)
}

function contactBarEvents(){
  if(window.innerWidth <= 900) hideContactBar = true;
  else hideContactBar = false;
  var phone = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) phone = true;})(navigator.userAgent||navigator.vendor||window.opera);
  if(phone){
    showContactBar(true);
  } else {
    if (hideContactBar) {
      showContactBar(true);
    } else {
      document.getElementById("ShowContactBarButton").style.right = "-40px";
    }

    addEventListener("resize", () => {
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
}