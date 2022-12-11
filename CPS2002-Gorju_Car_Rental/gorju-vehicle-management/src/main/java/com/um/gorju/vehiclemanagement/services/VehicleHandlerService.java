package com.um.gorju.vehiclemanagement.services;

import com.um.gorju.vehiclemanagement.data.repositories.VehicleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicleHandlerService {
    @Autowired
    ModelMapper mapper;

    @Autowired
    VehicleRepository repository;

    // public boolean addVehicle(VehicleSubmission vehicleSubmission) {
        //add motorcycle, family car, commercial vehicle

   //  public boolean deleteVehicle(VehicleSubmission vehicleSubmission) {
        //delete motorcycle, family car, commercial vehicle

    // public Vehicle getVehiclebyNumberPlate(String numberPlate) {

    // public List<Vehicle> getVehicleByColour(String colour, RequestType requestType){


    // public boolean updateVehicle(UpdateVehicleRequest request){


}
