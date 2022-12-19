package com.um.gorju.vehiclemanagement.services;

public class CommercialVehicle extends Vehicle {
    public CommercialVehicle(String numberPlate, String model, String brand, String colour){
        super(numberPlate, 80, 8, model, brand, colour);
    }

    public CommercialVehicle(){
        this.setCapacity(8);
        this.setPrice(80);
    }
}
