package com.um.gorju.vehiclemanagement.services;

public class FamilyCar extends Vehicle{
    public FamilyCar(String numberPlate, String model, String brand, String colour) {
        super(numberPlate, 50, 5, model, brand, colour, true);
    }

    public FamilyCar(){
        this.setCapacity(5);
        this.setPrice(50);
    }
}
