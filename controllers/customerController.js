
const Apartment = require('../models/apatments');
const User = require('../models/users');
const Tools = require('../models/construct');
const Crypto = require('crypto');
const { Query } = require('mongoose');

// enpoin /
exports.getAllApartments = async(req, res) => {
    //let objt = await Apartment.find({},{titel:1,images:1,price:1,apartmentSize:1,services:1,location:1}).limit(3);
    //res.render('index',{x:objt});
    let status = false;
    res.render('index',{status:status,err:''});
}

// enpoin /
exports.postLoginUser = async(req,res) => {

    let status = false;
    let error = '';
    let user;
    if (req.body.name) {

        let mykey = Crypto.createCipher('aes-128-cbc', 'mypassword');
        let mystr = mykey.update(req.body.password, 'utf8', 'hex')
        mystr += mykey.final('hex');
        req.body.password = mystr;
        user = Tools.constructUser(req.body);
        const newUser = new User(user);
        newUser.save().catch(err => console.log('err user: ',err)
        );
        status = true
      
    }else{

        user = await User.findOne({email:req.body.loginEmail}).catch(err => console.log('err user: ',err)
        );
        let mykey = Crypto.createDecipher('aes-128-cbc', 'mypassword');
        let mystr = mykey.update(user.password, 'hex', 'utf8')
        mystr += mykey.final('utf8');

        if (req.body.loginPassword == mystr) { 
            status = true;
        } else {
            error = 'sorry the password is wrong';
        }

    }

    res.render('index',{err:error,status:status,user:user});

}

// enpoin /reservation
exports.postReservationAJAX = async(req,res) => {

    console.log(req.body);
    let Post = await Apartment.updateOne({_id:req.body.id},{$push:{'reservations':{'start':req.body.IN,'end':req.body.OUT,'idUser':req.body.idUser} } }).catch(err => console.log('erro usuario: ',err));
    console.log(Post);
    res.send((Post.nModified > 0)? true : false)

}

// enpoin /apartment
exports.getAllApartmentsAll = (req, res) => {
    let search
    if (req.query.start) {
        search = 'exact';
    } else {
        search = 'all'
    }
    res.render('all',{x:req.query,search:search,In:req.query.start,out:req.query.end});
}

// enpoin /user/:idUser
exports.getUserId = async(req,res) => {

    let objt = await Apartment.find({'reservations.idUser':req.params.idUser},{reservations:1,titel:1}).catch(err => console.log('erro usuario: ',err));
console.log(objt);
    res.render('viewsUser',{obj:objt});
}

// enpoin /apartment/:idApartment
exports.getDetailedApartment = async(req, res) => {
    const idApartment = req.params.idApartment;
    //console.log("Identificador del apartamento: ", idApartment);
    let get = await Apartment.findOne({_id:idApartment}).catch(err => console.log('erro usuario: ',err));
    res.render('details',{obj:get});
}

// enpoin /AJAX/apartment
exports.postAllApartmentsAllAJAX = async (req, res) => {

    //console.log('all example: ',req.body);
    let query = req.body;
    let objt = await Tools.searchManagement(query)
    //console.log( 'objt --->',objt);
    let search
    if (query.start) {
        search = 'exact';
    } else {
        search = 'all'
    }
    //console.log(search,' ',req.body.start,' ',req.body.end);

    res.render('other/gallery',{x:objt,y:query.location,search:search,In:req.body.start,out:req.body.end});
    
}

// enpoin /AJAX/apartment/:idApartment
exports.postDetailedApartmentAJAX = async(req, res) => {
    const idApartment = req.params.idApartment;
    let get = await Apartment.findOne({_id:idApartment}).catch(err => console.log('erro usuario: ',err));
    res.render('other/details',{obj:get});
}

// enpoin /AJAX
exports.postAllApartmentsAJAX = async (req, res) => {
    //console.log('index example: ',req.body);
    let objt = await Apartment.find({},{titel:1,images:1,price:1,apartmentSize:1,services:1,location:1,status:1}).catch(err => console.log('erro usuario: ',err));
    res.render('other/gallery',{x:objt,y:req.body.location,search:''});
}

// enpoin /AJAX/users
exports.postAllUsersAJAX = async (req, res) => {
    //console.log('index example: ',req.body);
    let objt = await User.find({},{email:1}).catch(err => console.log('erro usuario: ',err));
    res.send(objt);
}
