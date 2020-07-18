
const Apartment = require('../models/apatments');
const User = require('../models/users');

module.exports = class tools {

    static constructApartment = (x) =>{

        let apartment = {
            titel : x.titel,
            description : x.description,
            rulesDescription : x.rulesDescription,
            rulesTags : {
                smoking: x.smoking,//(x.smoking)? true : false,
                pets:x.pets,//(x.pets)? true : false,
                eat:x.eat,//(x.eat)? true : false,
                steal:x.steal,//(x.steal)? true : false,
                parties:x.parties,//(x.parties)? true : false,
                kids:x.kids,//(x.kids)? true : false,
                arrivals:x.arrivals//(x.arrivals)? true : false
            },
            beds : [
                /*{
                    type:String,
                    beds:Number
                }*/
            ],
            bathRooms : x.Bathrooms,
            images : [
                /*{
                    description : String,
                    isMainPhoto : Boolean,
                    uri : String
                }*/
            ],
            price : x.price,
            occupancy : x.occupancy,
            apartmentSize : x.apartmentSize,
            services : {
                    wifi : x.wifi,//(x.wifi)? true : false,
                    heating : x.heating,//(x.heating)? true : false,
                    reducedMobility : x.reducedMobility,//(x.reducedMobility)? true : false,
                    TV : x.TV,//(x.TV)? true : false,
                    kitchen : x.kitchen,// (x.kitchen)? true : false,
                    AC : x.AC//(x.AC)? true : false
            },
            location : {
                province : x.province,
                city : x.city,
                gps : [x.gps[0],x.gps[1]]
            },
            reservations : [
                /*{
                    start : Date,
                    end : Date
                }*/
            ],
            status: true
        };

        for (let i = 0; i < x.uri.length; i++) {
            
            if (x.uri[i] != '') {

                let a = (x.uri[i] == x.img)? true : false;
                apartment.images.push({description:x.descript[i],isMainPhoto:a,uri:x.uri[i]});

            }

            
        }

        if(x.individual != ''){
            apartment.beds.push({type:'individual',beds:x.individual})
        }
        if(x.matrimonial != ''){
            apartment.beds.push({type:'matrimonial',beds:x.matrimonial})
        }
        if(x.queenSize != ''){
            apartment.beds.push({type:'queen size',beds:x.queenSize})
        }
        if(x.kingSize != ''){
            apartment.beds.push({type:'king size',beds:x.kingSize})
        }

        return apartment;
        
    }

    static constructUser = (x) =>{

        return {
            name:x.name,
            email:x.email,
            password:x.password,
            rool:x.rool,
            status:true
        }

    }

    static queryProjection =  async (x={},y={}) => {
        return await Apartment.find(x,y).catch(err => console.log('erro usuario: ',err));
            console.log('estamos aki --->',objt);
    }

    static queryProjectionOne =  async (x={},y={}) => {
        return await Apartment.findOne(x,y).catch(err => console.log('erro usuario: ',err));
            console.log('estamos aki --->',objt);
    }

    static dateManagement = (query,objt) => {

        let ids = []
        let x = true
        
        if (objt.length >0 ) {

            for (let I = 0; I < objt.length; I++) {

                if (objt[I].reservations.length > 0) {

                    for (let i = 0; i < objt[I].reservations.length; i++) {
                        
                        if (objt[I].reservations[i].start <= query.start) {
        
                            if (!(objt[I].reservations[i].end < query.start)) {
        
                                x = false
        
                            }         
        
                        } else {
        
                            if (!(objt[I].reservations[i].start > query.end)) {
        
                                x = false
        
                            }
        
                        }

                        if(i == (--(objt[I].reservations.length))){
                            
                            if (x) { ids.push(objt[I]._id);  x=true;}

                        }
                        
                    }
                    
                } else {
        
                    ids.push(objt[I]._id);
        
                }
            }
            
        } else {

            ids = false;

        }
        

        return ids;

    }

    static searchManagement = async (query,admin=false) =>{

        let Projection = {titel:1,images:1,price:1,apartmentSize:1,services:1,location:1,status:1,reservations:1}
        let ids = []
        let objt 

        let queryGlobal

        if (admin) {

            if (query.city && query.people && query.province) {
                queryGlobal = {
                    'location.city':query.city,
                    'location.province':query.province,
                    occupancy:query.people
                }
            } else if (query.city && query.people) {
                queryGlobal = {
                    'location.city':query.city,
                    occupancy:query.people
                }
            } else if (query.city && query.province) {
                queryGlobal = {
                    'location.city':query.city,
                    'location.province':query.province
                }
            } else if (query.people && query.province) {
                queryGlobal = {
                    'location.province':query.province,
                    occupancy:query.people
                }
            } else if (query.people) {
                queryGlobal = {
                    occupancy:query.people
                }
            } else if (query.province) {
                queryGlobal = {
                    'location.province':query.province
                }
            } else if (query.city) {
                queryGlobal = {
                    'location.city':query.city
                }
            } else {
                queryGlobal = {}
            }

        } else {

            if (query.city && query.people && query.province) {
                queryGlobal = {
                    'location.city':query.city,
                    'location.province':query.province,
                    occupancy:query.people,
                    status:true
                }
            } else if (query.city && query.people) {
                queryGlobal = {
                    'location.city':query.city,
                    occupancy:query.people,
                    status:true
                }
            } else if (query.city && query.province) {
                queryGlobal = {
                    'location.city':query.city,
                    'location.province':query.province,
                    status:true
                }
            } else if (query.people && query.province) {
                queryGlobal = {
                    'location.province':query.province,
                    occupancy:query.people,
                    status:true
                }
            } else if (query.people) {
                queryGlobal = {
                    occupancy:query.people,
                    status:true
                }
            } else if (query.province) {
                queryGlobal = {
                    'location.province':query.province,
                    status:true
                }
            } else if (query.city) {
                queryGlobal = {
                    'location.city':query.city,
                    status:true
                }
            } else {
                queryGlobal = {
                    status:true
                }
            }

            
        }

        if(query.action){

            objt = await this.queryProjection(queryGlobal,Projection);

        }else{

            if (query.start) {
                objt = await this.queryProjection(queryGlobal,Projection);
                ids = this.dateManagement(query,objt);
            } else {
                objt = await this.queryProjection(queryGlobal,Projection);
            }

        }

        if (ids != false && ids.length > 0) {

            objt = []          

            for (let i = 0; i < ids.length; i++) {

                let obj = await this.queryProjectionOne({status:true,_id:ids[i]},Projection);
                objt.push(obj);
                
            }

        }

        return objt;

    }
    
}

