package com.um.gorju.vehiclemanagement.data.repositories;

import com.um.gorju.vehiclemanagement.data.entities.VehicleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<VehicleEntity, String>{
}

