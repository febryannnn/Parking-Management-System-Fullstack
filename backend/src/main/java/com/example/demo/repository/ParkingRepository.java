package com.example.demo.repository;

public interface ParkingRepository extends JpaRepository<ParkingLog, Long> {
    List<ParkingLog> findByExitTimeIsNull(); // kendaraan yg belum keluar
}
