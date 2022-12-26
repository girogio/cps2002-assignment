package com.um.gorju.vehiclemanagement.services;

public class Motorcycle extends Vehicle{
    public Motorcycle(String numberPlate, String model, String brand, String colour){
        super(numberPlate, 20, 2, model, brand, colour, true);
    }

    public Motorcycle(){
        this.setCapacity(2);
        this.setPrice(20);
    }
}
