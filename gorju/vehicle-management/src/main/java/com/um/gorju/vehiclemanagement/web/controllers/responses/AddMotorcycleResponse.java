package com.um.gorju.vehiclemanagement.web.controllers.responses;

public class AddMotorcycleResponse {
    boolean entered;
    public AddMotorcycleResponse(){}

    public AddMotorcycleResponse(boolean entered) { this.entered = entered; }

    public boolean isEntered() {
        return entered;
    }

    public void setEntered(boolean entered) {
        this.entered = entered;
    }

}
