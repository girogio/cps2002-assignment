package com.um.gorju.vehiclemanagement.services;

import com.um.gorju.vehiclemanagement.web.controllers.requests.UpdateVehicleRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.internal.util.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import com.um.gorju.vehiclemanagement.data.repositories.VehicleRepository;
import org.springframework.web.server.ResponseStatusException;

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

    public boolean addVehicle(Vehicle v) {
        VehicleEntity vehicleEntity = mapper.map(v, VehicleEntity.class);
        boolean exists = repository.existsById(vehicleEntity.getNumberPlate());
        if (exists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Vehicle with same number plate already exists.");
        }

        repository.save(vehicleEntity);
        return true;
    }


   public boolean deleteVehicle(String numberPlate) {
       if(!repository.existsById(numberPlate))
           return false;
       repository.deleteById(numberPlate);
       return true;
   }

    public Vehicle getVehicleByNumberPlate(String numberPlate) {
        Assert.notNull(repository, "NumberPlate must not be null");
        if(repository.existsById(numberPlate)){
            return mapper.map(repository.findByNumberPlate(numberPlate), Vehicle.class);
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

    public List<Vehicle> getVehicles(){
        List<VehicleEntity> vehicleEntityList = repository.findAll();
        Iterator<VehicleEntity> iterator = vehicleEntityList.listIterator();
        List<Vehicle> vehicles = new ArrayList<>();

        while(iterator.hasNext()){
            VehicleEntity vehicleEntity = iterator.next();
            vehicles.add(mapper.map(vehicleEntity, Vehicle.class));
        }
        return vehicles;
    }

    public List<Vehicle> getVehicles(String colour, String isAvailable){
        if(colour == null && isAvailable == null){
            return getVehicles();
        }else if(colour == null){
            return isAvailable.equals("true") ? getAvailableVehicles() : isAvailable.equals("false") ? getUnavailableVehicles() : null;
        }else if(isAvailable == null){
            return getVehicleByColour(colour);
        }else{
            List<Vehicle> vehicles = getVehicleByColour(colour);
            Iterator<Vehicle> iterator = vehicles.listIterator();
            List<Vehicle> matchingVehicles = new ArrayList<>();

            while(iterator.hasNext()){
                Vehicle vehicle = iterator.next();
                if(vehicle.getAvailable() == Boolean.parseBoolean(isAvailable)){
                    matchingVehicles.add(vehicle);
                }
            }
            return matchingVehicles;
        }
    }

    public boolean updateVehicle(UpdateVehicleRequest request) {
            if(repository.existsById(request.getNumberPlate())){
                repository.save(mapper.map(request, VehicleEntity.class));
                return true;
            }
            return false;
        }




    /*public boolean updateVehicle(UpdateVehicleRequest request){
     if(repository.existsById(request.getNumberPlate())){
        repository.save(mapper.map(request, VehicleEntity.class));
        return true;
    }
        return false;
    }*/

}