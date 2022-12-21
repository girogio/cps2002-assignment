package com.um.gorju.vehiclemanagement.web.controllers;

import com.um.gorju.vehiclemanagement.services.*;
import com.um.gorju.vehiclemanagement.web.controllers.requests.*;
import com.um.gorju.vehiclemanagement.web.controllers.responses.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
public class VehicleHandlerController {
    @Autowired
    VehicleHandlerService vehicleHandlerService;

    @Autowired
    ModelMapper mapper;

    // Create a vehicle
    // add vehicle post request
    @PostMapping(value = "vehicles", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CreateVehicleResponse createVehicle(@RequestBody CreateVehicleRequest request, @RequestParam String type){
        Vehicle v;
        switch(type){
            case "family":
                v = new FamilyCar(request.getNumberPlate(), request.getModel(), request.getBrand(), request.getColour());
                break;
            case "commercial":
                v = new CommercialVehicle(request.getNumberPlate(), request.getModel(), request.getBrand(), request.getColour());
                break;
            case "motorcycle":
                v = new Motorcycle(request.getNumberPlate(), request.getModel(), request.getBrand(), request.getColour());
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid vehicle type.");
        }
        return new CreateVehicleResponse(vehicleHandlerService.addVehicle(v));
    }


    //update a vehicle
    // Update a vehicle
    // Method --> PUT
    // Request --> UpdateVehicleRequest
    // Response --> 200 (ok)
    @PutMapping(value = "vehicles", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public UpdateVehicleResponse updateVehicle(@RequestBody UpdateVehicleRequest request){
        boolean found = vehicleHandlerService.updateVehicle(request);
        if(!found){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle Not Found");
        }else{
            return new UpdateVehicleResponse(vehicleHandlerService.updateVehicle(request));
        }

    }

    // get all vehicles
    @GetMapping(value = "vehicles", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public GetVehicleResponse getAllVehicles(@RequestParam(required = false) String colour,  @RequestParam( required = false) String available){
        return new GetVehicleResponse(vehicleHandlerService.getVehicles(colour, available));
    }


    @GetMapping(value = "vehicles/{numberPlate}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public GetVehicleResponse getVehicleByNumberPlate(@PathVariable String numberPlate){
        List<Vehicle> vehicles = new ArrayList<>();
        if(vehicleHandlerService.getVehicleByNumberPlate(numberPlate) == null)throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle Not Found");
        vehicles.add(vehicleHandlerService.getVehicleByNumberPlate(numberPlate));
        return new GetVehicleResponse(vehicles);
    }


    // Delete vehicle
    @DeleteMapping(value = "vehicles/{numberPlate}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public DeleteVehicleResponse deleteVehicle(@RequestBody DeleteVehicleRequest request){
        return new DeleteVehicleResponse(vehicleHandlerService.deleteVehicle(request.getNumberPlate()));
    }
}
