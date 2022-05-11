const links = document.querySelectorAll('.anchorLink')
for (let link of links) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('navToggle').click();
    const blockID = link.getAttribute('href')
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

document.getElementById("logo").addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('a.navMenuLink[href="../main/index.html"]').click();
});
function toggleMenu (){
  navToggle.classList.toggle('active');
  document.querySelector('.header .navMenu').classList.toggle('active');
  document.body.classList.toggle('overflowHidden');
  document.querySelector('.header .logo').classList.toggle('active');
}
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click',function(e){
  e.stopPropagation();
  toggleMenu();
  if(navToggle.classList.contains('active')){
    document.getElementById('modalOverlay').classList.add('active');
    document.querySelector('.header').classList.add('dark');
  }else{
    document.getElementById('modalOverlay').classList.remove('active');
    document.querySelector('.header').classList.remove('dark');
  }
})

window.onclick = function(event) {
  if(
      event.target === document.querySelector('.navToggle span')
      ||
      event.target === document.querySelector('.navMenu')
    ){
    console.log('asd')
  }else {
    if(document.querySelector('.navMenu').classList.contains('active'))
      toggleMenu();
  }
}