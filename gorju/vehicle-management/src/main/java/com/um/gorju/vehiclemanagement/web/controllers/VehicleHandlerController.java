package com.um.gorju.vehiclemanagement.web.controllers;

import com.um.gorju.vehiclemanagement.services.*;
import com.um.gorju.vehiclemanagement.web.controllers.requests.AddCommercialRequest;
import com.um.gorju.vehiclemanagement.web.controllers.requests.AddFamilyCarRequest;
import com.um.gorju.vehiclemanagement.web.controllers.requests.AddMotorcycleRequest;
import com.um.gorju.vehiclemanagement.web.controllers.requests.DeleteVehicleRequest;
import com.um.gorju.vehiclemanagement.web.controllers.responses.AddCommercialResponse;
import com.um.gorju.vehiclemanagement.web.controllers.responses.AddFamilyCarResponse;
import com.um.gorju.vehiclemanagement.web.controllers.responses.AddMotorcycleResponse;
import com.um.gorju.vehiclemanagement.web.controllers.responses.DeleteVehicleResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class VehicleHandlerController {
    @Autowired
    VehicleHandlerService vehicleHandlerService;

    @Autowired
    ModelMapper mapper;

    //Create family car, motorcycle, commercial
    @PostMapping(value = "familycar", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public AddFamilyCarResponse addFamilyCar(@RequestBody AddFamilyCarRequest request){
        FamilyCar familyCar = mapper.map(request, FamilyCar.class);
        return new AddFamilyCarResponse(vehicleHandlerService.addFamilyCar(familyCar));
    }

    @PostMapping(value = "commercial", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public AddCommercialResponse addCommercial(@RequestBody AddCommercialRequest request){
        CommercialVehicle commercialVehicle = mapper.map(request, CommercialVehicle.class);
        return new AddCommercialResponse(vehicleHandlerService.addCommercialVehicle(commercialVehicle));
    }

    @PostMapping(value = "motorcycle", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public AddMotorcycleResponse addMotorcycle(@RequestBody AddMotorcycleRequest request){
        Motorcycle motorcycle = mapper.map(request, Motorcycle.class);
        return new AddMotorcycleResponse(vehicleHandlerService.addMotorcycle(motorcycle));
    }

    // Delete vehicle
    @DeleteMapping(value = "vehicles/{numberPlate}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public DeleteVehicleResponse deleteVehicle(@RequestBody DeleteVehicleRequest request){
        return new DeleteVehicleResponse(vehicleHandlerService.deleteVehicle(request.getNumberPlate()));
    }

    // Get vehicle by number plate

    // Get vehicle by colour

    // Get all vehicles

    // Get available vehicles

    // Get unavailable vehicles

    //Update a vehicle


}
