const links = document.querySelectorAll('.anchorLink')
for (let link of links) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('navToggle').click();
    const blockID = link.getAttribute('href');
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

document.getElementById("petsLink").addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('a.navMenuLink[href="../pets/index.html"]').click();
});

const queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
const helpSectionScrollParam = urlParams.get('helpSection')
if(helpSectionScrollParam === 'true'){
    setTimeout(() => {
        document.querySelector('.header a[href="#help"]').click();
        urlParams.toString()
        urlParams.delete('helpSection')
    }, 300);
}

function toggleMenu (){
  navToggle.classList.toggle('active');
  document.querySelector('.startScreen .contentWrapper').classList.toggle('activeMenu');
  document.querySelector('.header .navMenu').classList.toggle('active');
  document.body.classList.toggle('overflowHidden');
  document.querySelector('.header .logo').classList.toggle('active');
}

const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click',function(){
  toggleMenu();
})

window.onclick = function(event) {
  if(
      event.target === document.querySelector('.navToggle span')
      ||
      event.target === document.querySelector('.navMenu')
    ){
      return true;
  }else {
    if(document.querySelector('.navMenu').classList.contains('active'))
      toggleMenu();
  }
}

