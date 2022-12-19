package com.um.gorju.vehiclemanagement.web.controllers.responses;

public class CreateVehicleResponse {
    boolean entered;
    public CreateVehicleResponse() { }

    public CreateVehicleResponse(boolean entered) { this.entered = entered; }

    public boolean isEntered() {
        return entered;
    }

    public void setEntered(boolean entered) {
        this.entered = entered;
    }
}
