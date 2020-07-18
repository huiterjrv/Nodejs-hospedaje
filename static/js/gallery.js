  
// Slideshow Apartment Images

let slideIndex = 1;
function init(){
    let x = document.querySelector(`input[type='hidden']#details`);
    slideIndex = x.value;
    showDivs(slideIndex);
    document.querySelector('h3#price').innerHTML = 'from <i class="fa fa-eur" aria-hidden="true"></i>'+x.name;

    document.querySelector('p button#buttonMensaje').addEventListener('click',reservation)
}


function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  x[slideIndex-1].style.height = "25em";
  dots[slideIndex-1].className += " w3-opacity-off";
}
