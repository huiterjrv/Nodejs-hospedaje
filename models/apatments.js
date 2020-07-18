const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bed = new Schema({
    _id: false,
    type:String,
    beds:Number
});

const img = new Schema({
    _id: false,
    description : String,
    isMainPhoto : Boolean,
    uri : String
});

const reserve = new Schema({
    _id: false,
    start : Number,
    end : Number,
    idUser:String
});

const apartmentSchema = new Schema({
    titel : String,
    description : String,
    rulesDescription : String,
    rulesTags : {
        smoking:Boolean,
        pets:Boolean,
        eat:Boolean,
        steal:Boolean,
        parties:Boolean,
        kids:Boolean,
        arrivals:Boolean
    },
    beds : [bed],
    additionalBeds:Number,
    bathRooms : Number,
    images : [img],
    price : Number,
    occupancy : Number,
    apartmentSize : Number,
    services : {
            wifi : Boolean,
            heating : Boolean,
            reducedMobility : Boolean,
            TV : Boolean,
            kitchen : Boolean,
            AC : Boolean
    },
    location : {
        province : String,
        city : String,
        gps : [String,String]
    },
    reservations : [reserve],
    status: Boolean
    
})

module.exports = mongoose.model('Apartment', apartmentSchema);