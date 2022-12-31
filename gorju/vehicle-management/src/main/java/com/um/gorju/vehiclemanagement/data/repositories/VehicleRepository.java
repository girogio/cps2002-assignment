package com.um.gorju.vehiclemanagement.data.repositories;

import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<VehicleEntity, String>{
    @Query("SELECT vehicle FROM VehicleEntity vehicle WHERE vehicle.numberPlate = ?1")
    VehicleEntity findByNumberPlate(String numberPlate);
}

