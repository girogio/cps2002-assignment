package com.um.gorju.vehiclemanagement.web.controllers.requests;

public class DeleteVehicleRequest {
    private String numberPlate;

    public DeleteVehicleRequest() {
    }

    public DeleteVehicleRequest(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public String getNumberPlate() {
        return numberPlate;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }
}
