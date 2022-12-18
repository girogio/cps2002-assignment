package com.um.gorju.vehiclemanagement.web.controllers;

import com.um.gorju.vehiclemanagement.data.repositories.VehicleRepository;
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

    /*
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

     */

    // Create a vehicle
    // add vehicle post request
    @PostMapping(value = "vehicles", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CreateVehicleResponse createVehicle(@RequestBody CreateVehicleRequest request, @RequestParam String type){
        Vehicle v;
        switch(type){
            case "family":
                v = mapper.map(request, FamilyCar.class);
                break;
            case "commercial":
                v = mapper.map(request, CommercialVehicle.class);
                break;
            case "motorcycle":
                v = mapper.map(request, Motorcycle.class);
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid vehicle type.");
        }
        return new CreateVehicleResponse(vehicleHandlerService.addVehicle(v));
    }

    /*
    //update a vehicle
    @PutMapping(value="vehicles", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateVehicle(@RequestBody UpdateVehicleRequest request){
        Vehicle v = mapper.map(request, Vehicle.class);
        vehicleHandlerService.updateVehicle(v);
    }
    */

    // get all vehicles
    @GetMapping(value = "vehicles", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public GetVehicleResponse getAllVehicles(@RequestParam(required = false) String colour,  @RequestParam( required = false) String isAvailable){
        return new GetVehicleResponse(vehicleHandlerService.getVehicles(colour, isAvailable));
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
