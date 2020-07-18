let content = document.querySelector('#AJAX');

function ajaxPOST(url,petition,location,method='POST') {

    let state = true;//loading
    let ajaxPOST = new XMLHttpRequest;
    
    ajaxPOST.open(method, url, true);

    if(method == 'POST'){
        ajaxPOST.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    
    ajaxPOST.onreadystatechange = function(){
    
        if(this.status === 200 && this.readyState === 4){
            showMessage(this.responseText,location);            
        }else if(this.readyState != 4) {
            if(location == 'adminAllup'){
                document.querySelector('h3#RESPONSE').style.display = 'block';
                cargan(state,'..',document.querySelector('h3#RESPONSE'));
            }else if(location == 'adminApartNew'){
                document.querySelector('h3#RESPONSE').style.display = 'block';
                cargan(state,'..',document.querySelector('h3#RESPONSE'));
            }else if(location == 'reser'){ 
                document.querySelector('h3#RESPONSE').style.display = 'block';
                cargan(state,'..',document.querySelector('h3#RESPONSE'));
            }else if(location == 'adminUpDate'){ 
                document.querySelector('h3#RESPONSE').style.display = 'block';
                cargan(state,'..',document.querySelector('h3#RESPONSE'));
            }else if(location == 'adminStatus' || location == 'GetUser'){                
                
            }else if(location.indexOf('admin') >= 0){                
                cargan(state,'..',content);
            }else{
                cargan(state);
            }
            
            state = false;
        }else if(this.status != 200){
            this.onerror = onerror(this.status);
        }
    }
    ajaxPOST.send(petition);
}

function cargan(x,url,ubiety){
        
    if(x){
        if(url){
            let img = document.createElement('IMG');
            img = document.createElement('IMG');
            img.classList.add('loading');
            img.src= url+'/img/ajax_loader.png';
            let node = document.createElement('DIV');
            node.classList.add('loading');
            node.appendChild(img);
            let p = document.createElement('P');
            p.textContent = 'loading AJAX...';
            p.style.textAlign = 'center';
            node.appendChild(p);
            ubiety.appendChild(node);
        }else{
            let img = document.createElement('IMG');
            img = document.createElement('IMG');
            img.classList.add('loading');
            img.src= 'img/ajax_loader.png';
            let node = document.createElement('DIV');
            node.classList.add('loading');
            node.appendChild(img);
            let p = document.createElement('P');
            p.textContent = 'loading AJAX...';
            p.style.textAlign = 'center';
            node.appendChild(p);
            content.appendChild(node);
        }
        
    }
        
}

function onerror(x){
    content.innerHTML ='';
    content.innerHTML = `<p style="font-size: 2em;"><b style="font-size: 2em; color: #f00;">¡¡Uuupss!!....</b></p><p style="font-size: 2em;text-indent: 3em;">¡Something went wrong. There was an error is the ${x}!</p>`; 
}

function showMessage(message,location) {
    //console.log(message);
    
    switch (location) {

        case 'GetUser':
            let nodo = document.createElement('span');
            nodo.dataset.objUser = message;
            nodo.id = 'GetUser';
            let pag = document.querySelector('body');
            pag.appendChild(nodo);
            break;
        case 'all':
                let x = document.createElement('DIV');
                x.className = 'w3-row-padding w3-padding-16';
                x.innerHTML = message
                content.innerHTML = '';
                content.append(x);
                link();
            break;
        case 'allId':
                content.innerHTML = message;
                init();
                USER();
            break;
        case 'reser':
            document.querySelector('h3#RESPONSE').innerHTML = message
            document.querySelector('#subscribe').style.display='block';
            break;
//admin
        case 'adminApartNew':
            document.querySelector('h3#RESPONSE').innerHTML = message
            document.querySelector('#subscribe').style.display='block';
        break;

        case 'adminUsersUp':
            content.innerHTML = message;
            initInput();
        break;
        case 'adminUpDate':
            document.querySelector('h3#RESPONSE').innerHTML = (message)? '<i class="fas fa-check-circle w3-jumbo"></i> List is already modified':'<i class="fab fa-node-js w3-jumbo"></i> Oops ... something went wrong';
            document.querySelector('#subscribe').style.display='block';
        break;
        case 'adminStatus':
            if(!message){
                document.querySelector('h3#RESPONSE').innerHTML = '<i class="fab fa-node-js w3-jumbo"></i> Oops ... something went wrong';
                document.querySelector('#subscribe').style.display='block';
            }
        break;
        case 'adminNewApart':
            content.innerHTML = message
            let button1 = document.querySelector('p button');
            button1.addEventListener('click',newApart);
            valueInput();
        break;
        case 'adminAll':
            let X = document.createElement('DIV');
            X.className = 'w3-row-padding w3-padding-16';
            X.style = 'margin: auto; width: 80%;';
            X.innerHTML = message
            content.innerHTML = '';
            content.append(X);
            link();
        break;
        case 'adminAllId':
                content.innerHTML = message;
                slideIndex = document.querySelector('input#img').dataset.img;
                showDivs(slideIndex);
                valueInput();
                let button = document.querySelector('p button');
                button.addEventListener('click',upData);
            break;
        case 'adminAllup':
            document.querySelector('h3#RESPONSE').innerHTML = message;
            break;
        default:
                content.innerHTML = message
            break;

    }

}