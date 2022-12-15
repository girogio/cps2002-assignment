package com.um.gorju.vehiclemanagement.web.controllers.responses;

import java.util.List;
import com.um.gorju.vehiclemanagement.services.Vehicle;

public class GetVehicleResponse {
    List<Vehicle> vehicles;

    public GetVehicleResponse() {
    }

    public GetVehicleResponse(List<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }

    public List<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }
}
