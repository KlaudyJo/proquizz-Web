"use strict";

function getSection(e){
  e.preventDefault();
  const nav_links = document.querySelectorAll('.nav-link');
  nav_links.forEach(link =>{
    
    const nav = document.querySelector(`.${link.id}`)
    if (nav)
{    nav.classList.add('hidden')
}});

  const nav_link = document.querySelector(`.${this.id}`)
  nav_link.classList.remove('hidden')
};

function getHome(e) {
  e.preventDefault();
  const mainSection = document.querySelectorAll('main');
  mainSection.forEach(sec => {
    sec.classList.add('hidden')
  })
  console.log('hello')
  const home = document.querySelector('.home')
  home.classList.remove('hidden')
};


$(".nav-link").click(getSection); 



[$('#logo'), $('.fixed__home'), $('.go__home')].forEach(el => el.click(getHome));

$('#btn_doc').click(function(e){
  e.preventDefault();
  $('.home').addClass('hidden')
  $('.documentation').removeClass('hidden')
});


// accordeon

const acc = document.getElementsByClassName('contain');


for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function(){
      this.classList.toggle('active')

  });
}