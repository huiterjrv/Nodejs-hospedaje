// Slideshow Apartment Images
var slideIndex = 1;


function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var dots = document.getElementsByClassName("demo");
    if (n > dots.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = dots.length }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
        dots[i].childNodes[1].addEventListener('focusout', validate);
        dots[i].childNodes[3].addEventListener('focusout', validate);
    }
    dots[slideIndex - 1].className += " w3-opacity-off";
    viewImg(dots[slideIndex - 1]);
}

function validate(x) {
    //console.log(x.target.parentNode.parentNode.childNodes[1]);
    
    if(x.target.value != '' && x.target.name == 'uri'){

        let a = x.target.parentNode.nextSibling.nextSibling.childNodes;
        if(a[1].value == ''){
            a[1].classList.add('w3-red');
            a[3].style.visibility = 'visible';
        }else{
            a[1].classList.remove('w3-red');
            a[3].style.visibility = 'hidden';
        }

        x.target.parentNode.childNodes[1].classList.remove('w3-red');
        x.target.parentNode.childNodes[3].style.visibility = 'hidden';

    }else if(x.target.value != '' && x.target.name == 'descript'){
        
        let a = x.target.parentNode.parentNode.childNodes[1].childNodes;
        if(a[1].value == ''){
            a[1].classList.add('w3-red');
            a[3].style.visibility = 'visible';
        }else{
            a[1].classList.remove('w3-red');
            a[3].style.visibility = 'hidden';
        }

        x.target.parentNode.childNodes[1].classList.remove('w3-red');
        x.target.parentNode.childNodes[3].style.visibility = 'hidden';

    }

    if(x.target.value != '' && x.target.name == 'uri'){

        let a = x.target.parentNode.nextSibling.nextSibling.childNodes[1].value;
        if(a != ''){
            viewImg(x.target.parentNode.parentNode);
            x.target.parentNode.parentNode.style.backgroundImage = `url(${x.target.value})`;
        }

    }else if(x.target.value != '' && x.target.name == 'descript'){
        let a = x.target.parentNode.parentNode.childNodes[1].childNodes[1].value;
        if(a != ''){
            viewImg(x.target.parentNode.parentNode);
            x.target.parentNode.parentNode.style.backgroundImage = `url(${a})`;
        }
    }

}

function viewImg(nodo) {

    let x = document.querySelector('.viewImg');

    if(nodo.childNodes[1].childNodes[1].value != '' && nodo.childNodes[1].childNodes[1].name == 'uri'){

        if(nodo.childNodes[3].childNodes[1].value != '' && nodo.childNodes[3].childNodes[1].name == 'descript'){
        
            x.childNodes[1].src = nodo.childNodes[1].childNodes[1].value;
            x.childNodes[3].childNodes[1].textContent = nodo.childNodes[3].childNodes[1].value;
            document.querySelector(`input[name='img']`).value = nodo.childNodes[1].childNodes[1].value;

        }

    } 

}

function valueInput(){
    let x = document.querySelectorAll('div.demo');
    for (let i = 0; i < x.length; i++) {

        if (x[i].childNodes[1].childNodes[1].value != '' && x[i].childNodes[3].childNodes[1].value != '') {
            x[i].style.backgroundImage = `url(${x[i].childNodes[1].childNodes[1].value})`;
        }
        
    }

}
