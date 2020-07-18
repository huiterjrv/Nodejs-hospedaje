
function link() {

    let linkId = document.querySelectorAll('p[data-id]')
    linkId.forEach(element => {
        element.addEventListener('click',linckID)
    });


    let inputUser = document.querySelector('input[type=hidden]#inputUSER');
    let inputLocality = document.querySelector('input[type=hidden]#inputLocality');
    inputUser.dataset.search = inputLocality.dataset.search
    inputUser.dataset.in =  inputLocality.dataset.in
    inputUser.dataset.out =  inputLocality.dataset.out
}

function linckID(id) {    
    ajaxPOST('http://localhost:3000/AJAX/apartment/'+id.target.attributes[1].nodeValue,'','allId');
}

function AJAX() {

    let x = document.querySelector(`input[type='hidden']#inputAJAX`).value;
    x = JSON.parse(x);
    let a = ['start','end','city','people','province'];
    let b = '';
    for (let i = 0; i < a.length; i++) {

        if(x[a[i]]){
            if (a[i] == 'end' || a[i] == 'start') {
                b += a[i]+'='+Date.parse(x[a[i]])+'&';
            } else {
                b += a[i]+'='+x[a[i]]+'&';
            }
        }
    }
    if(!b){
        b += 'action=true&';
    }
    b += 'location=all';

    document.querySelector('p button').addEventListener('click',look);
    ajaxPOST('http://localhost:3000/AJAX/apartment',b,'all');// la variable b es para hacer mejoras en busquedas

}

function look() {

    let x = document.querySelectorAll('input');
    let a = ['start','end','city','people','province'];
    let b = '';
    for (let I = 0; I < x.length; I++) {

        for (let i = 0; i < a.length; i++) {

            if(x[I].name == a[i] && x[I].value != ''){
                if (a[i] == 'end' || a[i] == 'start') {
                    b += a[i]+'='+Date.parse(x[I].value)+'&';
                } else {
                    b += a[i]+'='+x[I].value+'&';
                }
                break;
            }
            
        }
        
    }
    
    if(!b){
        b += 'action=true&';
    }
    b += 'location=all';

    document.querySelector('h3#price').textContent = '';
    ajaxPOST('http://localhost:3000/AJAX/apartment',b,'all');// la variable b es para hacer mejoras en busquedas

}

function reservation(){

    let JOSNuser =  JSON.parse(sessionStorage.getItem("USER"))
    let input = document.querySelector('input[type=hidden]#inputUSER');
    let inputId = document.querySelector('input[type=hidden]#details');
    let id = inputId.dataset.id
    let idUser = JOSNuser._id
    let IN = input.dataset.in 
    let OUT = input.dataset.out 
    let date = `IN=${IN}&OUT=${OUT}&idUser=${idUser}&id=${id}`
    ajaxPOST('/reservation',date,'reser')

}

AJAX()
