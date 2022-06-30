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

function calculateAmount() {
  var selFrst = parseInt(document.getElementById('type').value);
  var selPriceType = parseInt(document.getElementById('price_type').value);
  var selFrstColor = parseInt(document.getElementById('color').value);
  var selPageSide = parseInt(document.getElementById('side').value);
  var selQty = parseInt(document.getElementById('copies').value);
  var tot_price;

  //plain bond paper
  if (selFrst == 3 && selFrstColor == 1) {
    document.getElementById('price_type').value = 3;
    tot_price = selPriceType * selQty * selPageSide;
  } else if (selFrst == 3 && selFrstColor == 2) {
    document.getElementById('price_type').value = 5;
    tot_price = selPriceType * selQty * selPageSide;
  }

  //glossy paper
  if (selFrst == 7 && selFrstColor == 1) {
    document.getElementById('price_type').value = 7;
    tot_price = selPriceType * selQty * selPageSide;
  } else if (selFrst == 7 && selFrstColor == 2) {
    document.getElementById('price_type').value = 12;
    tot_price = selPriceType * selQty * selPageSide;
  }

  //laser paper
  if (selFrst == 10 && selFrstColor == 1) {
    document.getElementById('price_type').value = 7;
    tot_price = selPriceType * selQty * selPageSide;
  } else if (selFrst == 10 && selFrstColor == 2) {
    document.getElementById('price_type').value = 12;
    tot_price = selPriceType * selQty * selPageSide;
  }

  /*display the result*/
  document.getElementById('tot_amount').value = tot_price.toFixed(2);
}
