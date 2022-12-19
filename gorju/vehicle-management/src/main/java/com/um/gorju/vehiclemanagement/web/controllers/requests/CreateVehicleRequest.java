package com.um.gorju.vehiclemanagement.web.controllers.requests;

public class CreateVehicleRequest {
    private String numberPlate;
    private String model;
    private String brand;
    private String colour;
    private boolean available;

    public CreateVehicleRequest(String numberPlate, String model, String brand, String colour, String type){
        this.numberPlate = numberPlate;
        this.model=model;
        this.brand=brand;
        this.colour=colour;
        available=true;
    }

    public CreateVehicleRequest(){}

    public String getNumberPlate() {
        return numberPlate;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public String getModel() { return model; }

    public void setModel(String model) { this.model = model; }

    public String getBrand() { return brand; }

    public void setBrand(String brand) { this.brand = brand; }

    public String getColour() { return colour; }

    public void setColour(String colour) { this.colour = colour; }

    public boolean getAvailable() { return available; }

    public void setAvailable(boolean available) { this.available = available; }
}
