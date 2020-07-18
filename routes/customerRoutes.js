const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllApartments);
router.post('/', customerController.postLoginUser);
router.get('/user/:idUser',customerController.getUserId)
router.post('/reservation',customerController.postReservationAJAX) 
router.get('/apartment/:idApartment', customerController.getDetailedApartment);
router.get('/apartment', customerController.getAllApartmentsAll);
router.post('/AJAX', customerController.postAllApartmentsAJAX);
router.post('/AJAX/apartment', customerController.postAllApartmentsAllAJAX);
router.post('/AJAX/apartment/:idApartment', customerController.postDetailedApartmentAJAX);
router.post('/AJAX/users', customerController.postAllUsersAJAX);

module.exports = router;