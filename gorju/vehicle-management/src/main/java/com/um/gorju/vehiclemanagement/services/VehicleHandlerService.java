package com.um.gorju.vehiclemanagement.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import com.um.gorju.vehiclemanagement.data.repositories.VehicleRepository;

@Service
public class VehicleHandlerService {
    @Autowired
    ModelMapper mapper;

    @Autowired
    VehicleRepository repository;

    public boolean addFamilyCar(FamilyCar familyCar) {
        VehicleEntity vehicleEntity = mapper.map(familyCar, VehicleEntity.class);
        boolean exists = repository.existsById(vehicleEntity.getNumberPlate());

        if (exists) {
            return false;
        } else {
            repository.save(vehicleEntity);
            return true;
        }
    }

    public boolean addMotorcycle(Motorcycle motorcycle) {
        VehicleEntity vehicleEntity = mapper.map(motorcycle, VehicleEntity.class);
        boolean exists = repository.existsById(vehicleEntity.getNumberPlate());

        if(exists){
            return false;
        }else{
            repository.save(vehicleEntity);
            return true;
        }

    }

    public boolean addCommercialVehicle(CommercialVehicle commercialVehicle) {
        VehicleEntity vehicleEntity = mapper.map(commercialVehicle, VehicleEntity.class);
        boolean exists = repository.existsById(vehicleEntity.getNumberPlate());

        if(exists){
            return false;
        }else{
            repository.save(vehicleEntity);
            return true;
        }
    }


   public boolean deleteVehicle(String numberPlate) {
       if(!repository.existsById(numberPlate))
           return false;
       repository.deleteById(numberPlate);
       return true;
   }


   }

    // public Vehicle getVehiclebyNumberPlate(String numberPlate) {

    // public List<Vehicle> getVehicleByColour(String colour, RequestType requestType){

    // public List<Vehicle> getAvailableCars(){

    // public boolean updateVehicle(UpdateVehicleRequest request){


