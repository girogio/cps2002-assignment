package com.um.gorju.vehiclemanagement.services;

import com.cedarsoftware.util.DeepEquals;
import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import com.um.gorju.vehiclemanagement.data.repositories.VehicleRepository;
import com.um.gorju.vehiclemanagement.web.controllers.requests.UpdateVehicleRequest;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

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
    public void testAddVehicle(){
        // Setup
        Vehicle vehicle = new Vehicle("ABC123", 70, 5, "Captur", "Renault", "White");
        boolean expectedEntered = true;

        when(repository.existsById(any(String.class))).thenReturn(false);

        // Exercise
        boolean entered = vehicleHandlerService.addVehicle(vehicle);

        // Verify
        assertEquals(expectedEntered, entered);

        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is called once
        verify(repository, times(1)).save(any(VehicleEntity.class));
        // Teardown -- no teardown needed
    }

    @Test
    public void testAddExistingVehicle(){
        // Setup
        Vehicle vehicle = new Vehicle("ABC123", 70, 5, "Captur", "Renault", "White");

        when(repository.existsById(any(String.class))).thenReturn(true);

        // Exercise
        assertThrows(ResponseStatusException.class, () ->  vehicleHandlerService.addVehicle(vehicle));

        // Verify
        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is called once
        verify(repository, times(0)).save(any(VehicleEntity.class));
        // Teardown -- no teardown needed
    }

    @Test
    public void testAddFamilyCar(){
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
    public void testAddExistingFamilyCar(){
        //Setup
        boolean expectedEntered = false;
        FamilyCar familyCar = new FamilyCar("ABC123", "Captur", "Renault", "White");
        VehicleEntity passedVehicleEntity = modelMapper.map(familyCar, VehicleEntity.class);

        //existsById returns true meaning another vehicle already has the same ID
        when(repository.existsById(any(String.class))).thenReturn(true);

        // Exercise
        boolean entered = vehicleHandlerService.addFamilyCar(familyCar);

        // Verify
        assertEquals(expectedEntered, entered);
        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is not called
        verify(repository, times(0)).save(any(VehicleEntity.class));
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
    public void testAddExistingMotorcycle(){
        //Setup
        boolean expectedEntered = false;
        Motorcycle motorcycle = new Motorcycle("ABC234", "Tenere 700", "Yamaha", "Black");
        VehicleEntity passedVehicleEntity = modelMapper.map(motorcycle, VehicleEntity.class);

        //existsById returns true meaning another vehicle already has the same ID
        when(repository.existsById(any(String.class))).thenReturn(true);

        // Exercise
        boolean entered = vehicleHandlerService.addMotorcycle(motorcycle);

        // Verify
        assertEquals(expectedEntered, entered);
        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is not called
        verify(repository, times(0)).save(any(VehicleEntity.class));
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
    public void testAddExistingCommercialVehicle(){
        //Setup
        boolean expectedEntered = false;
        CommercialVehicle commercialVehicle = new CommercialVehicle("ABF234", "Expert", "Peugeot", "Blue");
        VehicleEntity passedVehicleEntity = modelMapper.map(commercialVehicle, VehicleEntity.class);

        //existsById returns true meaning another vehicle already has the same ID
        when(repository.existsById(any(String.class))).thenReturn(true);

        // Exercise
        boolean entered = vehicleHandlerService.addCommercialVehicle(commercialVehicle);

        // Verify
        assertEquals(expectedEntered, entered);
        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .save is not called
        verify(repository, times(0)).save(any(VehicleEntity.class));
        // Teardown -- no teardown needed
    }
    @Test
    public void testDeleteExistingVehicle(){
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

    @Test
    public void testDeleteNonExistingVehicle(){
        String numberPlate = "JYT123";
        //existsById returns true meaning vehicle exists in repository
        when(repository.existsById(any(String.class))).thenReturn(false);
        boolean expectedFound = false;

        // Exercise
        boolean found = vehicleHandlerService.deleteVehicle(numberPlate);

        // Verify
        assertEquals(expectedFound, found);

        //Checking that .existsById is called once
        verify(repository, times(1)).existsById(any(String.class));
        //Checking that .delete is not called
        verify(repository, times(0)).deleteById(any(String.class));

        // no teardown needed

    }

    @Test
    public void testGetExistingVehiclebyNumberPlate(){
        // Setup
        String numberPlate = "SEF657";
        Vehicle expectedResponse = new Vehicle(numberPlate, 200, 10, "Captur", "Renault", "Cream");
        VehicleEntity expectedEntityResponse = modelMapper.map(expectedResponse, VehicleEntity.class);
       // when(repository.existsById(numberPlate)).thenReturn(true);
       // when(repository.getById(numberPlate)).thenReturn(expectedEntityResponse);

        // Exercise
        Vehicle response = vehicleHandlerService.getVehicleByNumberPlate(numberPlate);

        // Verify
        verify(repository, times(1)).existsById(numberPlate);

        // Teardown -- no teardown needed
    }


    @Test
    public void testGetNonExistingVehiclebyNumberPlate(){
        // Setup

        String numberPlate = "ABC 123";
        when(repository.existsById(numberPlate)).thenReturn(false);

        // Exercise
        Vehicle response = vehicleHandlerService.getVehicleByNumberPlate(numberPlate);

        // Verify
        assertNull(response);
        verify(repository, times(1)).existsById(numberPlate);
        verify(repository, times(0)).getById(numberPlate);

        // Teardown -- no teardown needed
    }

    @Test
    public void testGetVehicleByColour(){
        // Setup
        String colour = "White";

        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White"));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue"));
        returnedVehicleList.add(new VehicleEntity("IAL329", 200, 10, "Demio", "Mazda", "Black"));
        returnedVehicleList.add(new VehicleEntity("AAS213", 200, 10, "208", "Peugeot", "White"));
        returnedVehicleList.add(new VehicleEntity("KJL145", 200, 10, "Rio", "Kia", "Green"));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("JUK987", 200, 10, "Captur", "Renault", "White"));
        expectedResponse.add(new Vehicle("AAS213", 200, 10, "208", "Peugeot", "White"));

        // Exercise
        List<Vehicle> response = vehicleHandlerService.getVehicleByColour(colour);

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        // Teardown -- no teardown stage
    }

    @Test
    public void testGetVehiclesByColour(){
        // Setup
        String colour = "White";

        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White"));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue"));
        returnedVehicleList.add(new VehicleEntity("IAL329", 200, 10, "Demio", "Mazda", "Black"));
        returnedVehicleList.add(new VehicleEntity("AAS213", 200, 10, "208", "Peugeot", "White"));
        returnedVehicleList.add(new VehicleEntity("KJL145", 200, 10, "Rio", "Kia", "Green"));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("JUK987", 200, 10, "Captur", "Renault", "White"));
        expectedResponse.add(new Vehicle("AAS213", 200, 10, "208", "Peugeot", "White"));

        // Exercise
        List<Vehicle> response = vehicleHandlerService.getVehicles(colour, null);

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        // Teardown -- no teardown stage
    }

    @Test
    public void testGetVehiclesByColourAndAvailability(){
        // Setup
        String colour = "White";

        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White", true));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue", false));
        returnedVehicleList.add(new VehicleEntity("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        returnedVehicleList.add(new VehicleEntity("AAS213", 200, 10, "208", "Peugeot", "White", true));
        returnedVehicleList.add(new VehicleEntity("KJL145", 200, 10, "Rio", "Kia", "Green", false));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("JUK987", 200, 10, "Captur", "Renault", "White", true));
        expectedResponse.add(new Vehicle("AAS213", 200, 10, "208", "Peugeot", "White", true));

        // Exercise
        List<Vehicle> response = vehicleHandlerService.getVehicles(colour, "true");

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        // Teardown -- no teardown stage
    }

    @Test
    public void testGetVehiclesByAvailability(){
        // Setup

        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White", true));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue", false));
        returnedVehicleList.add(new VehicleEntity("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        returnedVehicleList.add(new VehicleEntity("AAS213", 200, 10, "208", "Peugeot", "White", true));
        returnedVehicleList.add(new VehicleEntity("KJL145", 200, 10, "Rio", "Kia", "Green", false));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("JIK984", 200, 10, "Clio", "Renault", "Blue", false));
        expectedResponse.add(new Vehicle("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        expectedResponse.add(new Vehicle("KJL145", 200, 10, "Rio", "Kia", "Green", false));

        // Exercise
        List<Vehicle> response = vehicleHandlerService.getVehicles(null, "false");

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        // Teardown -- no teardown stage
    }

    @Test
    public void testGetVehicles(){
        // Setup

        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White", true));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue", false));
        returnedVehicleList.add(new VehicleEntity("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        returnedVehicleList.add(new VehicleEntity("AAS213", 200, 10, "208", "Peugeot", "White", true));
        returnedVehicleList.add(new VehicleEntity("KJL145", 200, 10, "Rio", "Kia", "Green", false));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("JUK987", 200, 10, "Captur", "Renault", "White", true));
        expectedResponse.add(new Vehicle("JIK984", 200, 10, "Clio", "Renault", "Blue", false));
        expectedResponse.add(new Vehicle("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        expectedResponse.add(new Vehicle("AAS213", 200, 10, "208", "Peugeot", "White", true));
        expectedResponse.add(new Vehicle("KJL145", 200, 10, "Rio", "Kia", "Green", false));
        // Exercise
        List<Vehicle> response = vehicleHandlerService.getVehicles(null, null);

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        // Teardown -- no teardown stage
    }


    @Test
    public void testGetAvailableVehicles(){
        //Setup
        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White", true));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue", true));
        returnedVehicleList.add(new VehicleEntity("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        returnedVehicleList.add(new VehicleEntity("AAS213", 200, 10, "208", "Peugeot", "White", false));
        returnedVehicleList.add(new VehicleEntity("KJL145", 200, 10, "Rio", "Kia", "Green", false));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("JUK987", 200, 10, "Captur", "Renault", "White", true));
        expectedResponse.add(new Vehicle("JIK984", 200, 10, "Clio", "Renault", "Blue", true));

        // Exercise
        List<Vehicle> response = vehicleHandlerService.getAvailableVehicles();

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        //No teardown required
    }

    @Test
    public void testGetUnavailableVehicles(){
        //Setup
        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White", true));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue", true));
        returnedVehicleList.add(new VehicleEntity("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        returnedVehicleList.add(new VehicleEntity("AAS213", 200, 10, "208", "Peugeot", "White", false));
        returnedVehicleList.add(new VehicleEntity("KJL145", 200, 10, "Rio", "Kia", "Green", false));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("IAL329", 200, 10, "Demio", "Mazda", "Black", false));
        expectedResponse.add(new Vehicle("AAS213", 200, 10, "208", "Peugeot", "White", false));
        expectedResponse.add(new Vehicle("KJL145", 200, 10, "Rio", "Kia", "Green", false));

        // Exercise
        List<Vehicle> response = vehicleHandlerService.getUnavailableVehicles();

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        //No teardown required
    }

    @Test
    public void testGetAllVehicles(){
        //Setup
        List<VehicleEntity> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new VehicleEntity("JUK987", 200, 10, "Captur", "Renault", "White"));
        returnedVehicleList.add(new VehicleEntity("JIK984", 200, 10, "Clio", "Renault", "Blue"));
        when(repository.findAll()).thenReturn(returnedVehicleList);

        List<Vehicle> expectedResponse = new ArrayList<>();
        expectedResponse.add(new Vehicle("JUK987", 200, 10, "Captur", "Renault", "White"));
        expectedResponse.add(new Vehicle("JIK984", 200, 10, "Clio", "Renault", "Blue"));

        // Exercise
        List<Vehicle> response = vehicleHandlerService.getVehicles();

        // Verify
        assertTrue(DeepEquals.deepEquals(response, expectedResponse));
        verify(repository, times(1)).findAll();

        //No teardown required

    }

    @Test
    public void testUpdateVehicle(){
        // Setup
        String numberPlate = "ABC123";
        VehicleEntity v = new VehicleEntity("ABC123", 120,12, "BMW", "X3","Green", true);
        UpdateVehicleRequest request = new UpdateVehicleRequest("ABC123", 120,12, "BMW", "X3","Green", false);
        VehicleEntity new_v = new VehicleEntity("ABC123", 120,12, "BMW", "X3","Green", false);
        when(repository.findByNumberPlate(numberPlate)).thenReturn(v);
        when(repository.existsById(numberPlate)).thenReturn(true);

        // Exercise
        boolean found = vehicleHandlerService.updateVehicle(request);

        // Verify
        assertTrue(found);
        assertFalse(DeepEquals.deepEquals(repository.getById(numberPlate),new_v));
        verify(repository, times(1)).existsById(numberPlate);

        // Teardown -- no teardown needed

    }

    @Test
    public void testUpdateNonExistingVehicle(){
        // Setup
        String numberPlate = "ABC124";
        UpdateVehicleRequest request = new UpdateVehicleRequest("ABC124", 120,12, "BMW", "X3","Green", true);
        when(repository.existsById(numberPlate)).thenReturn(false);

        // Exercise
        boolean found = vehicleHandlerService.updateVehicle(request);

        // Verify
        assertFalse(found);
        verify(repository, times(1)).existsById(numberPlate);

        // Teardown -- no teardown needed

    }
}


