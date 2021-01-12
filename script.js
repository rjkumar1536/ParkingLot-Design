// Main Parking Lot class
class ParkingLot {
    constructor(parkingSlots){
        this.parkingSpaces = []
        for(let i = 0; i < parkingSlots; i++){
            this.parkingSpaces.push(new ParkingSpace(i , true, Math.random()*1000, null))
        }
        this.entranceLogs = []
        this.exitLogs = []
    }

    addToEntranceLog(vehicle){
        this.entranceLogs.push(vehicle);
    }

    addToExitLog(vehicle){
        this.exitLogs.push(vehicle);
    }

    getRegistrationNumbersByVehicleColor(color){
        return this.parkingSpaces.filter((parkingSpace) => parkingSpace.isFree == false && parkingSpace.vehicle.color == color).map((parkingSpace) => parkingSpace.vehicle.regId);
    }
    getParkingSpaceByRegistration(regId){
        let parkingSpace = this.parkingSpaces.filter((parkingSpace) => parkingSpace.isFree == false && parkingSpace.vehicle.regId == regId);
        if(parkingSpace.length != 0){
            return parkingSpace[0];
        }
    }
    getAvailableParkingSpaces(){
        return this.parkingSpaces.filter((parkingSpace) => parkingSpace.isFree == true);
    }

    getParkingSpacesByVehicleColor(color){
        return this.parkingSpaces.filter((parkingSpace) => parkingSpace.isFree == false && parkingSpace.vehicle.color == color);
    }

    updateParkingSpace(spaceId, isFree, vehicle){
        this.parkingSpaces[spaceId].isFree = isFree
        this.parkingSpaces[spaceId].vehicle = vehicle;
    }
    parkVehicle(vehicle){
        let availableParkingSpaces = this.getAvailableParkingSpaces();
        if(availableParkingSpaces.length != 0){
           let firstFreeParkingSpace = availableParkingSpaces[0];
           this.updateParkingSpace(firstFreeParkingSpace.spaceId, false, vehicle);
           this.addToEntranceLog(vehicle);
        }
        else{
            console.log(`Sorry No Free Slot Found for Vehicle ${vehicle.regId}`);
        }
    }

    unparkVehicle(regId){
        let parkingSpace = this.getParkingSpaceByRegistration(regId);
        if(parkingSpace){
            this.addToExitLog(parkingSpace.vehicle);
            this.updateParkingSpace(parkingSpace.spaceId, true, null);
        }
        else{
            console.log(`No Vehicle Found with Given Registration ID ${regId}`);
        }
    }
}


// Vehicle class
class Vehicle {
    constructor(regId, color){
        this.regId = regId;
        this.color = color;
    }
}


// Parking Space Class
class ParkingSpace {
	constructor(spaceId, isFree, costPerHour, vehicle){
        this.spaceId = spaceId;
        this.isFree = isFree;
        this.costPerHour = costPerHour;
        this.vehicle = vehicle;
    }
}


/* Main Entry Point */

let parkingLot = new ParkingLot(10);
let colors = ["green", "red", "white", "black", "brown", "gold", "silver"]
let vehicles = [];
for(let i = 0; i < 11; i++){
    let  color = colors[Math.floor(Math.random()*colors.length)]
    let  regId = `A-0${i}`;
    let vehicle = new Vehicle(regId, color);
    vehicles.push(vehicle);
    parkingLot.parkVehicle(vehicle);
}
console.log(parkingLot);

// console.log(parkingLot.getRegistrationNumbersByVehicleColor(vehicles[0].color));
// console.log(parkingLot.getRegistrationNumbersByVehicleColor(vehicles[0].color));

// console.log(parkingLot.getParkingSpaceByRegistration(vehicles[0].regId));

// console.log(parkingLot.getParkingSpacesByVehicleColor(vehicles[0].color));

// parkingLot.unparkVehicle(vehicles[0].regId)
// console.log(parkingLot);



