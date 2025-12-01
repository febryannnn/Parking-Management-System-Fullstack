package com.example.demo.service;

@Service
@RequiredArgsConstructor
public class ParkingService {

    private final ParkingRepository parkingRepo;
    private final SlotRepository slotRepo;

    public ParkingLog vehicleEntry(String plateNumber) {

        Slot freeSlot = slotRepo.findByOccupiedFalse()
                .orElseThrow(() -> new RuntimeException("No free slot"));

        freeSlot.setOccupied(true);
        slotRepo.save(freeSlot);

        ParkingLog record = new ParkingLog();
        record.setPlateNumber(plateNumber);
        record.setEntryTime(LocalDateTime.now());
        record.setSlot(freeSlot);

        return parkingRepo.save(record);
    }

    public ParkingLog vehicleExit(Long id) {
        ParkingLog record = parkingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        record.setExitTime(LocalDateTime.now());

        long minutes = Duration.between(record.getEntryTime(), record.getExitTime()).toMinutes();
        double fee = Math.ceil(minutes / 60.0) * 5000; // contoh tarif

        record.setTotalFee(fee);

        Slot slot = record.getSlot();
        slot.setOccupied(false);
        slotRepo.save(slot);

        return parkingRepo.save(record);
    }
}
