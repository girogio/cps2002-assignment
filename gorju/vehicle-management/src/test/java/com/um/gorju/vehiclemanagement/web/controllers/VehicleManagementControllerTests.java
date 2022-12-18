package com.um.gorju.vehiclemanagement.web.controllers;

import com.cedarsoftware.util.DeepEquals;
import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import com.um.gorju.vehiclemanagement.services.*;
import com.um.gorju.vehiclemanagement.web.controllers.requests.*;
import com.um.gorju.vehiclemanagement.web.controllers.responses.*;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.apache.logging.log4j.message.ParameterizedMessage.deepToString;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class VehicleManagementControllerTests {
    @Autowired
    VehicleHandlerController vehicleHandlerController;

    @Autowired
    ModelMapper mapper = new ModelMapper();

    @MockBean
    VehicleHandlerService vehicleManagementServiceMock;

    /*
    @Test
    public void testAddCommercialVehicle(){
        // Setup
        AddCommercialRequest request =
                new AddCommercialRequest("ABC123", "Captur", "Renault", "White");
        boolean expectedEntered = true;
        when(vehicleManagementServiceMock.addCommercialVehicle(any(CommercialVehicle.class))).thenReturn(expectedEntered);

        // Exercise
        AddCommercialResponse actualResponse = vehicleHandlerController.addCommercial(request);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedEntered, actualResponse.isEntered());

        verify(vehicleManagementServiceMock, times(1)).addCommercialVehicle(any(CommercialVehicle.class));
        // Teardown - no teardown stage
    }

    @Test
    public void testAddFamilyCar(){
        // Setup
        AddFamilyCarRequest request =
                new AddFamilyCarRequest("ABC123", "Clio", "Renault", "Yellow");
        boolean expectedEntered = true;
        when(vehicleManagementServiceMock.addFamilyCar(any(FamilyCar.class))).thenReturn(expectedEntered);

        // Exercise
        AddFamilyCarResponse actualResponse = vehicleHandlerController.addFamilyCar(request);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedEntered, actualResponse.isEntered());

        verify(vehicleManagementServiceMock, times(1)).addFamilyCar(any(FamilyCar.class));
        // Teardown - no teardown stage
    }

    @Test
    public void testAddMotorcycle(){
        // Setup
        AddMotorcycleRequest request =
                new AddMotorcycleRequest("ABC123", "Captur", "Renault", "White");
        boolean expectedEntered = true;
        when(vehicleManagementServiceMock.addMotorcycle(any(Motorcycle.class))).thenReturn(expectedEntered);

        // Exercise
        AddMotorcycleResponse actualResponse = vehicleHandlerController.addMotorcycle(request);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedEntered, actualResponse.isEntered());

        verify(vehicleManagementServiceMock, times(1)).addMotorcycle(any(Motorcycle.class));
        // Teardown - no teardown stage
    }
    */


    @Test
    public void testCreateFamilyCar(){
        // Setup
        String type = "family";
        CreateVehicleRequest request =
                new CreateVehicleRequest("ABC123","Captur", "Renault", "White", "family");
        boolean expectedEntered = true;
        when(vehicleManagementServiceMock.addVehicle(any(Vehicle.class))).thenReturn(expectedEntered);

        // Exercise
        CreateVehicleResponse actualResponse = vehicleHandlerController.createVehicle(request, type);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedEntered, actualResponse.isEntered());

        verify(vehicleManagementServiceMock, times(1)).addVehicle(any(Vehicle.class));
        // Teardown - no teardown stage
    }
    @Test
    public void testCreateCommercial(){
        // Setup
        String type = "commercial";
        CreateVehicleRequest request =
                new CreateVehicleRequest("ABC123","Captur", "Renault", "White", "commercial");
        boolean expectedEntered = true;
        when(vehicleManagementServiceMock.addVehicle(any(Vehicle.class))).thenReturn(expectedEntered);

        // Exercise
        CreateVehicleResponse actualResponse = vehicleHandlerController.createVehicle(request, type);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedEntered, actualResponse.isEntered());

        verify(vehicleManagementServiceMock, times(1)).addVehicle(any(Vehicle.class));
        // Teardown - no teardown stage
    }

    @Test
    public void testCreateMotorcycle(){
        // Setup
        String type = "motorcycle";
        CreateVehicleRequest request =
                new CreateVehicleRequest("ABC123","Captur", "Renault", "White", "motorcycle");
        boolean expectedEntered = true;
        when(vehicleManagementServiceMock.addVehicle(any(Vehicle.class))).thenReturn(expectedEntered);

        // Exercise
        CreateVehicleResponse actualResponse = vehicleHandlerController.createVehicle(request, type);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedEntered, actualResponse.isEntered());

        verify(vehicleManagementServiceMock, times(1)).addVehicle(any(Vehicle.class));
        // Teardown - no teardown stage
    }

    @Test
    public void testCreateVehicleOfInvalidType(){
        String type = "bus";
        boolean caught = false;
        CreateVehicleRequest request =
                new CreateVehicleRequest("ABC123","City", "Mercedes", "Gray", "bus");
        boolean expectedEntered = true;
        when(vehicleManagementServiceMock.addVehicle(any(Vehicle.class))).thenReturn(expectedEntered);


        //Exercise
        try{
            CreateVehicleResponse actualResponse = vehicleHandlerController.createVehicle(request, type);
        }catch(Exception e){
            caught = true;
        }

        //Verify
        assertTrue(caught);
        assertThrows(ResponseStatusException.class, () ->  vehicleHandlerController.createVehicle(request,type));

    }

    @Test
    public void testDeleteExistingVehicle(){
        // Setup
        String numberPlate = "ABC123";
        CreateVehicleRequest createRequest = new CreateVehicleRequest("ABC123", "Captur", "Renault", "White", "family");
        vehicleHandlerController.createVehicle(createRequest, "family");

        DeleteVehicleRequest deleteRequest = new DeleteVehicleRequest(numberPlate);
        boolean expectedFound = true;
        when(vehicleManagementServiceMock.deleteVehicle(numberPlate)).thenReturn(expectedFound);

        // Exercise
        DeleteVehicleResponse actualResponse = vehicleHandlerController.deleteVehicle(deleteRequest);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedFound, actualResponse.isFound());

        verify(vehicleManagementServiceMock, times(1)).deleteVehicle(numberPlate);
        // Teardown - no teardown stage
    }

    @Test
    public void testDeleteNonExistingVehicle(){
        // Setup
        String numberPlate = "ABC123";
        DeleteVehicleRequest deleteRequest = new DeleteVehicleRequest(numberPlate);
        boolean expectedFound = false;
        when(vehicleManagementServiceMock.deleteVehicle(numberPlate)).thenReturn(expectedFound);

        // Exercise
        DeleteVehicleResponse actualResponse = vehicleHandlerController.deleteVehicle(deleteRequest);

        // Verify
        assertNotNull(actualResponse, "Response is null.");
        assertEquals(expectedFound, actualResponse.isFound());
        verify(vehicleManagementServiceMock, times(1)).deleteVehicle(numberPlate);
        // Teardown - no teardown stage
    }

    @Test
    public void testGetAllVehicles(){
        //Setup
        List<Vehicle> returnedVehicleList= new ArrayList<>();
        returnedVehicleList.add(new Vehicle("JUK987", 200, 10, "Captur", "Renault", "White"));
        returnedVehicleList.add(new Vehicle("JIK984", 200, 10, "Clio", "Renault", "Red"));
        GetVehicleResponse expectedResponse = new GetVehicleResponse(returnedVehicleList);
        when(vehicleManagementServiceMock.getVehicles(null, null)).thenReturn(returnedVehicleList);

        // Exercise
        GetVehicleResponse response = vehicleHandlerController.getAllVehicles(null, null);

        // Verify
        assertNotNull(response);
        assertTrue(DeepEquals.deepEquals(expectedResponse, response));
        verify(vehicleManagementServiceMock, times(1)).getVehicles(null, null);
    }
}
