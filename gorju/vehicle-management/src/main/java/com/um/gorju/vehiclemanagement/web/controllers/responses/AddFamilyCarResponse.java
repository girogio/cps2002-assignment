package com.um.gorju.vehiclemanagement.web.controllers.responses;

public class AddFamilyCarResponse {
    boolean entered;

    public AddFamilyCarResponse() {
    }
    public AddFamilyCarResponse(boolean entered) {
        this.entered = entered;
    }

    public boolean isEntered() {
        return entered;
    }

    public void setEntered(boolean entered) {
        this.entered = entered;
    }
}
