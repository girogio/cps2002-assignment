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
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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

    @Test
    public void testDeleteExistingVehicle(){
        // Setup
        String numberPlate = "ABC123";
        AddMotorcycleRequest addRequest = new AddMotorcycleRequest("ABC123", "Captur", "Renault", "White");
        vehicleHandlerController.addMotorcycle(addRequest);
        DeleteVehicleRequest deleteRequest =
                new DeleteVehicleRequest(numberPlate);
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
}
