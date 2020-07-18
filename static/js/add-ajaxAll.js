
function link() {

    let linkId = document.querySelectorAll('p[data-id]')
    linkId.forEach(element => {
        element.addEventListener('click',linckID)
    });
    
}

function linckID(id) {    
    ajaxPOST('/admin/apartment/'+id.target.attributes[1].nodeValue,'','adminAllId');
}

function AJAX() {

    let x = document.querySelector(`input[type='hidden']`).value;
    x = JSON.parse(x);
    let a = ['start','end','city','province'];
    let b = '';
    for (let i = 0; i < a.length; i++) {
        if(x[a[i]]){
            b += a[i]+'='+x[a[i]]+'&';
        }
    }
    if(!b){
        b += 'action=true&location=all';
    }

    document.querySelector('p button').addEventListener('click',look);
    ajaxPOST('/admin/apartment',b,'adminAll');// la variable b es para hacer mejoras en busquedas

}

function look() {

    let x = document.querySelectorAll('input');
    let a = ['start','end','city','province'];
    let b = 'location=all';
    let c = false;
    for (let i = 0; i < x.length; i++) {
        for (let y = 0; y < a.length; y++) {

            if(x[i].name == a[y]){
               if(x[i].value != ''){
                    b += '&'+a[y]+'='+x[i];
                    c = true;
               }
            }
            
        }

    }
    if(c){
        b += '&action=false';
    }else{
        b += '&action=true';
    }

    document.querySelector('h3#price').textContent = '';
    ajaxPOST('/admin/apartment',b,'adminAll');// la variable b es para hacer mejoras en busquedas

}

function upData(){

    let textarea = document.querySelectorAll('textarea');
    let messaje = textarea[0].name+'='+textarea[0].value+'&'+textarea[1].name+'='+textarea[1].value;
    let inmput = document.querySelectorAll('input');
    for (let i = 0; i < inmput.length; i++) {
        messaje +='&'+inmput[i].name+'='+inmput[i].value;
    }
console.log(messaje);
console.log(inmput);


    ajaxPOST('/admin/apartment/addNew',messaje,'adminAllNew');
}

AJAX()