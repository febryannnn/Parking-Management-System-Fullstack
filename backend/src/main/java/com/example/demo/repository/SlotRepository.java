package com.example.demo.repository;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    Optional<Slot> findByOccupiedFalse();
}
