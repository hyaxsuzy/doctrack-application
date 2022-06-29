/* eslint-disable */
let arrow = document.querySelectorAll('.arrow');

for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener('click', e => {
    let arrowParent = e.target.parentElement.parentElement;
    console.log(arrowParent);
    arrowParent.classList.toggle('showMenu');
  });
}

let sidebar = document.querySelector('.sidebar');
let btn = document.querySelector('#btn');

if (btn)
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('close');
  });

let li_main = document.querySelector('.li_main');

if (li_main)
  li_main.addEventListener('click', function() {
    this.classList.toggle('active');
  });
