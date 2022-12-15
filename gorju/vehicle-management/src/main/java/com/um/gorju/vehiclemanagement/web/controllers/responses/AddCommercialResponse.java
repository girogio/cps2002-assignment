package com.um.gorju.vehiclemanagement.web.controllers.responses;

public class AddCommercialResponse {
    boolean entered;
    public AddCommercialResponse() { }

    public AddCommercialResponse(boolean entered) { this.entered = entered; }

    public boolean isEntered() {
        return entered;
    }

    public void setEntered(boolean entered) {
        this.entered = entered;
    }

}

