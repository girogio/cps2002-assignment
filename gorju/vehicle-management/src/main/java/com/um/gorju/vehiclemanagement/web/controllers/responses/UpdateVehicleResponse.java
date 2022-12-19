package com.um.gorju.vehiclemanagement.web.controllers.responses;

public class UpdateVehicleResponse {
    private boolean success;

    public UpdateVehicleResponse(boolean success){
        this.success = success;
    }

   public UpdateVehicleResponse(){

    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
