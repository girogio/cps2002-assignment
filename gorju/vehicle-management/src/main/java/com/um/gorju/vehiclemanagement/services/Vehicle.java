package com.um.gorju.vehiclemanagement.services;

public class Vehicle {
    private String numberPlate;
    private double price;
    private int capacity;
    private String model;
    private String brand;
    private String colour;
    private boolean available;

    public Vehicle(String numberPlate, double price, int capacity, String model, String brand, String colour){
        this.numberPlate = numberPlate;
        this.price = price;
        this.capacity = capacity;
        this.model=model;
        this.brand=brand;
        this.colour=colour;
        available=true;
    }

    public Vehicle() {
    }

    public String getNumberPlate() {
        return numberPlate;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getModel() { return model; }

    public void setModel(String model) { this.model = model; }

    public String getBrand() { return brand; }

    public void setBrand(String brand) { this.brand = brand; }

    public String getColour() { return colour; }

    public void setColour(String colour) { this.colour = colour; }

    public boolean getAvailable() { return available; }

    public void setAvailable(boolean available) { this.available = available; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle vehicle = (Vehicle) o;
        return Double.compare(vehicle.price, price) == 0 && capacity == vehicle.capacity && numberPlate.equals(vehicle.numberPlate) && model.equals(vehicle.model) && colour.equals(vehicle.colour);
    }
}
