package com.um.gorju.vehiclemanagement.web.controllers.responses;

public class DeleteVehicleResponse {
    boolean vehicleFound;

    public DeleteVehicleResponse() {
    }

    public DeleteVehicleResponse(boolean found) {
        this.vehicleFound = found;
    }

    public boolean isFound() {
        return vehicleFound;
    }

    public void setFound(boolean found) {
        this.vehicleFound = vehicleFound;
    }
}
