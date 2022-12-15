package com.um.gorju.vehiclemanagement.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import com.um.gorju.vehiclemanagement.data.repositories.VehicleRepository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

    public Vehicle getVehicleByNumberPlate(String numberPlate) {
        if(repository.existsById(numberPlate)){
            return mapper.map(repository.getById(numberPlate), Vehicle.class);
        }
        return null;
    }

    public List<Vehicle> getVehicleByColour(String colour){
        List<VehicleEntity> vehicleEntityList = repository.findAll();
        Iterator<VehicleEntity> iterator = vehicleEntityList.listIterator();
        List<Vehicle> matchingVehicles = new ArrayList<>();

        while(iterator.hasNext()){
            VehicleEntity vehicleEntity = iterator.next();
            if(vehicleEntity.getColour().equals(colour)){
                matchingVehicles.add(mapper.map(vehicleEntity, Vehicle.class));
            }
        }
        return matchingVehicles;
    }

    public List<Vehicle> getAvailableVehicles() {
        List<VehicleEntity> vehicleEntityList = repository.findAll();
        Iterator<VehicleEntity> iterator = vehicleEntityList.listIterator();
        List<Vehicle> matchingVehicles = new ArrayList<>();

        while(iterator.hasNext()){
            VehicleEntity vehicleEntity = iterator.next();
            if(vehicleEntity.getAvailable()){
                matchingVehicles.add(mapper.map(vehicleEntity, Vehicle.class));
            }
        }
        return matchingVehicles;
    }

    public List<Vehicle> getUnavailableVehicles() {
        List<VehicleEntity> vehicleEntityList = repository.findAll();
        Iterator<VehicleEntity> iterator = vehicleEntityList.listIterator();
        List<Vehicle> matchingVehicles = new ArrayList<>();

        while(iterator.hasNext()){
            VehicleEntity vehicleEntity = iterator.next();
            if(!vehicleEntity.getAvailable()){
                matchingVehicles.add(mapper.map(vehicleEntity, Vehicle.class));
            }
        }
        return matchingVehicles;
    }

    public List<Vehicle> getAllVehicles(){
        List<VehicleEntity> vehicleEntityList = repository.findAll();
        Iterator<VehicleEntity> iterator = vehicleEntityList.listIterator();
        List<Vehicle> vehicles = new ArrayList<>();

        while(iterator.hasNext()){
            VehicleEntity vehicleEntity = iterator.next();
            vehicles.add(mapper.map(vehicleEntity, Vehicle.class));
        }
        return vehicles;
    }

    /*public List<String> getVehicleInfo(String numberPlate){
        List<String> information=null;
        if(repository.existsById(numberPlate)){
            information.add(mapper.map(repository.getById(numberPlate), Vehicle.class).getNumberPlate());
            information.add(mapper.map(repository.getById(numberPlate), Vehicle.class).getColour());
            information.add(mapper.map(repository.getById(numberPlate), Vehicle.class).getBrand());
            information.add(mapper.map(repository.getById(numberPlate), Vehicle.class).getModel());
            return information;
        }
        return null;
    }

    *
     */

    /*public boolean updateVehicle(UpdateVehicleRequest request){
     if(repository.existsById(request.getNumberPlate())){
        repository.save(mapper.map(request, VehicleEntity.class));
        return true;
    }
        return false;
    }*/

}