const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/',adminController.getAdmin);

router.get('/add-new', adminController.getNewApartment);
router.post('/add-new', adminController.postNewApartment);
router.get('/add-new/:idUser', adminController.getNewApartmentUser);
router.post('/add-new/:idUser', adminController.postNewApartmentUser);

router.get('/users',adminController.getUsers);
router.get('/users/update',adminController.getUsersUpDate);
router.post('/users/upDateId',adminController.postUsersUpDateId);
router.post('/users/:idApartment', adminController.postUpDataApartmentAJAX);

router.get('/apartment', adminController.getAllApartments);
router.post('/apartment',adminController.postAllApartmentsAJAX);
router.post('/apartment/upData',adminController.postUpDateApartmentAJAX)
router.post('/apartment/:idApartment', adminController.postDetailedApartmentAJAX);

module.exports = router;