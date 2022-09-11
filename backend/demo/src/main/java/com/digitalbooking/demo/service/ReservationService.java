package com.digitalbooking.demo.service;


import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.Product;
import com.digitalbooking.demo.model.Reservation;
import com.digitalbooking.demo.model.dto.MyReservations;
import com.digitalbooking.demo.model.dto.ReservationDTO;
import com.digitalbooking.demo.repository.ProductRepository;
import com.digitalbooking.demo.repository.ReservationRepository;
import com.digitalbooking.demo.security.model.User;
import com.digitalbooking.demo.security.repository.UserRepository;
import com.digitalbooking.demo.security.service.EmailSenderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    EmailSenderService emailSenderService;
    @Autowired
    ObjectMapper mapper;

    public void addReservation(ReservationDTO reservation) throws BadRequestException, MessagingException {
        if (reservation == null)
            throw new BadRequestException("Didn't get a reservation to save");
        User user = userRepository.findById(reservation.getUser()).get();
        Product product = productRepository.findById(reservation.getProduct()).get();
        userRepository.updateCity(reservation.getCity(), reservation.getUser());
        Reservation res = reservationRepository.save(mapper.convertValue(reservation, Reservation.class));
        emailSenderService.sendReservationEmail(user, res, product);
    }

    public List<ReservationDTO> reservationList() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDTO> reservationsDTOS = new ArrayList<>();
        for (Reservation c :
                reservations) {
            ReservationDTO cdto = mapper.convertValue(c, ReservationDTO.class);
            reservationsDTOS.add(cdto);
        }
        return reservationsDTOS;
    }

    public ReservationDTO findReservationById(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isEmpty())
            throw new ResourceNotFoundException("Can't find reservation with id: " + id);
        return mapper.convertValue(reservation, ReservationDTO.class);
    }

    public List<MyReservations> findReservationsByUser(Long id) throws BadRequestException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        List<Reservation> reservations = reservationRepository.findReservationByUserId(id);
        List<MyReservations> myReservations = new ArrayList<>();
        for (Reservation c :
                reservations) {
            MyReservations cdto = mapper.convertValue(c, MyReservations.class);
            myReservations.add(cdto);
        }
        return myReservations;
    }
}
