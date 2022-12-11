package com.um.gorju.vehiclemanagement.services;

import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import com.um.gorju.vehiclemanagement.data.repositories.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class VehicleManagementServiceTests {
    @Autowired
    VehicleHandlerService vehicleHandlerService;

    @MockBean
    VehicleRepository repository;

    @Autowired
    ModelMapper modelMapper;

    @Test
    public void testAddFamilyVehicle(){
        // Setup
        FamilyCar familyCar = new FamilyCar("ABC123", "Captur", "Renault", "White");
        boolean expectedEntered = true;

        when(repository.existsById(any(String.class))).thenReturn(false);

        // Exercise
        boolean entered = vehicleHandlerService.addFamilyCar(familyCar);

        // Verify
        assertEquals(expectedEntered, entered);

        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is called once
        verify(repository, times(1)).save(any(VehicleEntity.class));
        // Teardown -- no teardown needed
    }

    @Test
    public void testAddMotorcycleVehicle(){
        Motorcycle motorcycle = new Motorcycle("ABC234", "Tenere 700", "Yamaha", "Black");
        boolean expectedEntered = true;

        when(repository.existsById(any(String.class))).thenReturn(false);

        // Exercise
        boolean entered = vehicleHandlerService.addMotorcycle(motorcycle);

        // Verify
        assertEquals(expectedEntered, entered);

        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is called once
        verify(repository, times(1)).save(any(VehicleEntity.class));
        // Teardown -- no teardown needed
    }

    @Test
    public void testAddCommercialVehicle(){
        // Setup
        CommercialVehicle commercialVehicle = new CommercialVehicle("ABF234", "Expert", "Peugeot", "Blue");
        boolean expectedEntered = true;
        when(repository.existsById(any(String.class))).thenReturn(false);

        // Exercise
        boolean entered = vehicleHandlerService.addCommercialVehicle(commercialVehicle);

        // Verify
        assertEquals(expectedEntered, entered);

        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is called once
        verify(repository, times(1)).save(any(VehicleEntity.class));
        // Teardown -- no teardown needed
    }

    @Test
    public void deleteExistingVehicletest(){
        String numberPlate = "ABC123";
        //existsById returns true meaning vehicle exists in repository
        when(repository.existsById(any(String.class))).thenReturn(true);
        boolean expectedFound = true;

        // Exercise
        boolean found = vehicleHandlerService.deleteVehicle(numberPlate);

        // Verify
        assertEquals(expectedFound, found);

        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .delete is called once
        verify(repository, times(1)).deleteById(any(String.class));

        // Teardown -- no teardown needed

    }
}


