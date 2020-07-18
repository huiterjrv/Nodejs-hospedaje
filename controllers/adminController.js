const Tools = require('../models/construct')
const Apartment = require('../models/apatments');
const Users = require('../models/users');
const { render } = require('pug');
//------------------INIT--------------------------ADMIN--------------------

// empoin /add-new
exports.getNewApartment  =  (req, res) => {
    res.render('add-new');
}

// empoin /add-new
exports.postNewApartment  =  (req, res) => {
    // const newApartment = new Apartment(.....)
    // newApartment.save()
    //console.log('parametros pasados por post:',req.body);
    let apartament = Tools.constructApartment(req.body);
    const newApartment = new Apartment(apartament);
    let ress = newApartment.save().catch(err => console.log('ha ocurrido un error -> ',err))
    //console.log(ress);
    
    res.send('Apartamento insertado en la BBDD');
}

// empoin /add-new/:idUser
exports.getNewApartmentUser  =  async(req, res) => {
    let query = req.params.idUser
    console.log(query);
    let obj = await Users.findOne({_id:query}).catch(err => console.log('error: -> ', err)) 
    console.log('mieeeeeee...... ---> ',obj);

    res.render('user-new',{obj:obj});
}

// empoin /add-new/:idUser
exports.postNewApartmentUser  =  (req, res) => {
    // const newApartment = new Apartment(.....)
    // newApartment.save()
    //console.log('parametros pasados por post:',req.body);
    let apartament = Tools.constructApartment(req.body);
    const newApartment = new Apartment(apartament);
    let ress = newApartment.save().catch(err => console.log('ha ocurrido un error -> ',err))
    //console.log(ress);
    
    res.send('Apartamento insertado en la BBDD');
}

// empoin /
exports.getAdmin = async(req,res) => {

    let query = req.query
    let obj = await Users.findOne({_id:query._id}).catch(err => console.log('error: -> ', err)) 
    console.log(obj);
    res.render('add-admin',{obj:obj})

}

//--------------FIN------ADMIN-----------------------

//--------------INIT----------------APARTMENT------------------

// empoin /apartment
exports.getAllApartments = (req, res) => {
    res.render('add-all',{x:req.query});
}
// empoin /apartment
exports.postAllApartmentsAJAX = async (req, res) => {
    //console.log('index example: ',req.body);
    let query = req.body;
    let objt = await Tools.searchManagement(query,true)
    //console.log( 'objt --->',objt); 
    res.render('other/add-gallery',{x:objt,y:req.body.location});
}

// empoin /apartment/:idApartment
exports.postDetailedApartmentAJAX = async (req, res) => {
    const idApartment = req.params.idApartment;
    let get = await Apartment.findOne({_id:idApartment}).catch(err => console.log('admin ID :' ,err));
    res.render('other/add-details',{obj:get});
}

// empoin /apartment/upData
exports.postUpDateApartmentAJAX = async (req, res) => {
    
    //console.log('parametros pasados por post:',req.body);
    let apartament = Tools.constructApartment(req.body);
    let ress = await Apartment.updateOne({ _id:req.body.id },apartament).catch(err => console.log('error: -> ', err))
    //console.log(ress);
    ress = (ress.nModified == 1)? '<i class="fas fa-check-circle w3-jumbo"></i> List is already modified':'<i class="fab fa-node-js w3-jumbo"></i> Oops ... something went wrong';
    res.send(ress);

}

// empoin /users/:idApartment
exports.postUpDataApartmentAJAX = async (req, res) => {
    
    let ress = await Apartment.updateOne({ _id:req.params.idApartment },{status:req.body.status}).catch(err => console.log('error: -> ', err))
    //console.log(ress);
    ress = (ress.nModified == 1)? true:false;
    res.send(ress);

}

//------------FIN-------APARTMENT-----------------

//-----------INT----------USER-------------

// empoin /users
exports.getUsers = async(req,res) => {
    let obj = await Users.find().catch(err => console.log('error: -> ', err)) 
    res.render('other/add-users',{obj:obj})
}

// empoin /users/update
exports.getUsersUpDate = async(req,res) => {

    let obj = await Users.find().catch(err => console.log('error: -> ', err)) 
    res.render('other/add-usersUpData',{obj:obj})

}

// empoin /users/upDateId
exports.postUsersUpDateId = async(req,res) => {

    console.log('data -----> ',req.body);
    let obj = req.body.obj;
    let ress
    //obj.forEach(element => element = JSON.parse(element));//TypeError: obj.forEach is not a function
    if ( (typeof obj) == 'string') {
        
        obj=JSON.parse(obj);
        ress = await Users.updateOne({ _id:obj.id },obj).catch(err => console.log('error: -> ', err));
        ress = (ress.nModified == 1)? true:false;

    } else {

        for (let i = 0; i < obj.length; i++) {
            obj[i]=JSON.parse(obj[i]);
        }
        for (let i = 0; i < obj.length; i++) {
            let change = {};
            if (obj[i].name) { change.name = obj[i].name};
            if (obj[i].email) { change.email = obj[i].email};
            if (obj[i].rool) { change.rool = obj[i].rool};
            if (obj[i].status) { change.status = obj[i].status}
            ress = await Users.updateOne({ _id:obj[i].id },obj[i]).catch(err => console.log('error: -> ', err));
            ress = (ress.nModified == 1)? true:false;
            if (ress) { break; }
            
        }
        
    }
   
    res.send(ress);

}

