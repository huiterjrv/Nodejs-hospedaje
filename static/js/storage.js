if (sessionStorage.getItem("USER")){

    let dataUser = sessionStorage.getItem("USER");
    let inputUser = document.querySelector('input[type=hidden]#inputUSER');
    if (inputUser.dataset.locality == 'index' && inputUser.dataset.locality) {
        let nav = document.querySelector('#log');
        dataUser = JSON.parse(dataUser);
        let nodoLoging = document.createElement('a');
        nodoLoging.className = 'w3-bar-item w3-button w3-right w3-light-grey w3-mobile';
        nodoLoging.textContent = 'log off';
        nodoLoging.onclick = function() {removeItemData()};
        nodoLoging.id = 'logOff'
        nav.parentNode.appendChild(nodoLoging)
        if (dataUser.rool != 'admin') {
            nav.href = `#jaajjajajaXD`;
            nav.textContent = dataUser.name;
        } else {
            nav.href = `/admin?name=${dataUser.name}&_id=${dataUser._id}`;
            nav.textContent = dataUser.name;
        }
        
        let hybrid = document.querySelector('a#hybrid')
        if (dataUser.rool == 'visiting') {
            hybrid.textContent = 'Your Reservations'
            hybrid.href = '/user/'+dataUser._id;            
        } else if (dataUser.rool == 'manager') {
            hybrid.textContent = 'New Apartment'
            hybrid.href = '/admin/add-new/'+dataUser._id;    
        }
       
    }
    
} else {
    let inputUser = document.querySelector('input[type=hidden]#inputUSER')
    if(inputUser){
        if (inputUser.dataset.user) {
            sessionStorage.setItem("USER", `${inputUser.dataset.user}`);
            let dataUser = inputUser.dataset.user;
            if (inputUser.dataset.locality == 'index' && inputUser.dataset.locality) {
                let nav = document.querySelector('#log');
                dataUser = JSON.parse(dataUser);
                let nodoLoging = document.createElement('a');
                nodoLoging.className = 'w3-bar-item w3-button w3-right w3-light-grey w3-mobile';
                nodoLoging.textContent = 'log off'
                nodoLoging.onclick = function() {removeItemData()};
                nodoLoging.id = 'logOff'
                nav.parentNode.appendChild(nodoLoging)
                let UserJson = JSON.parse(inputUser.dataset.user) 
                let hybrid = document.querySelector('a#hybrid')
                if (dataUser.rool == 'visiting') {
                    hybrid.textContent = 'Your Reservations'
                    hybrid.href = '/user/'+UserJson._id;           
                } else if (dataUser.rool == 'manager') {
                    hybrid.textContent = 'New Apartment'
                    hybrid.href = '/admin/add-new/'+dataUser._id;   
                }

            }
        }        
    }
  
}

function removeItemData() {

    sessionStorage.removeItem("USER");
    let inputUser = document.querySelector('input[type=hidden]#inputUSER')
    inputUser.dataset.user = ''
    let navLog = document.querySelector('#log');
    navLog.href = '#login';
    navLog.textContent = 'Login Now';
    let navLogOf = document.querySelector('#logOff');
    navLogOf.remove()

    document.querySelector('a#hybrid').href = '#contact'
    document.querySelector('a#hybrid').textContent = 'Sign in'

}