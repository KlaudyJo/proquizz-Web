"use strict";
// accordeon

const acc = document.querySelectorAll('.contain');
acc.forEach((ac) => {
ac.addEventListener('click', () => {
  if (ac.classList.contains('active')) {
    ac.classList.remove('active');

  } else {
    const accOpen = document.querySelectorAll('.active');
    accOpen.forEach((accOpen) => {
      accOpen.classList.remove('active');
    });
    ac.classList.add('active');
  }
}); 
});

