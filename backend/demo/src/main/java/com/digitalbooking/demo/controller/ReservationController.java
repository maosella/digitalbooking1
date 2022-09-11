package com.digitalbooking.demo.controller;


import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.Reservation;
import com.digitalbooking.demo.model.dto.MyReservations;
import com.digitalbooking.demo.model.dto.ReservationDTO;
import com.digitalbooking.demo.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;


@RestController
@RequestMapping("/reservations")
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    @PostMapping
    public ResponseEntity<String> addReservation(@RequestBody ReservationDTO reservation) throws BadRequestException, MessagingException {
        reservationService.addReservation(reservation);
        return ResponseEntity.ok("Reservation added successfully");
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> reservationList() {
        return ResponseEntity.ok(reservationService.reservationList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(reservationService.findReservationById(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<MyReservations>> getReservationsByUser(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(reservationService.findReservationsByUser(id));
    }
}
