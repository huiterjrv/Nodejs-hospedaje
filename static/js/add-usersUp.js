function initInput(){
    let x = document.querySelectorAll('table input');
    let y = document.querySelectorAll('table select');
    let data = document.createElement('input');
    data.type = 'hidden';
    let input = [];
    let select = [];
    let num = 0;
    for (let i = 0; i < x.length; i++) {
        if (num == 2) {
            input.push(x[i].dataset.status);
            num=0;
        } else {
            input.push(x[i].value);
            num++;
        } 
    }
    for (let i = 0; i < y.length; i++) { 
        select.push(y[i].value);
    }
    input = JSON.stringify(input);
    select = JSON.stringify(select);
    data.dataset.input = input;
    data.dataset.select = select;
    document.querySelector('#AJAX').append(data);
}

function checkChange() {
    let input = JSON.parse(document.querySelector('#AJAX input[type=hidden]').dataset.input);
    let select = JSON.parse(document.querySelector('#AJAX input[type=hidden]').dataset.select);
    let x = document.querySelectorAll('table input');
    let y = document.querySelectorAll('table select');

    let upData = '';
    let data = '';

    let num = 0;
    let status = false;
    let numSlec = 0;
    let change = false;
    console.log(input);
    
    for (let i = 0; i < x.length; i++) {
        if (num == 2) {
            if (x[i].checked) {
                data += `"${x[i].name}":${(input[i] == 'true')?false:true},`;                
                status = true;
            }
            if (y[numSlec].value != select[numSlec]) {
                data += `"${y[numSlec].name}":"${y[numSlec].value}",`;
                status = true;
            }
            if (status) {
                data += `"id":"${x[i].value}"`;
                upData +=`obj={${data}}&`;
                data = '';
                status = false;
                change = true;
            }
            numSlec++;
            num=0;
           
        } else {
            if (x[i].value != input[i]) {
                data += `"${x[i].name}":"${x[i].value}",`;
                status = true;
            }
            num++;
            
        } 
    }
    console.log(change);
    console.log(upData);
    
    
    if (change) {
        ajaxPOST('/admin/users/upDateId',upData,'adminUpDate');
    }
    
}