package com.digitalbooking.demo.security.service;

import com.digitalbooking.demo.model.Product;
import com.digitalbooking.demo.model.Reservation;
import com.digitalbooking.demo.security.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import static java.lang.String.format;


@Service
public class EmailSenderService {
    private static final String WELCOME_SUBJECT = "Bienvenido/a %s";
    private static final String RESERVATION_SUBJECT = "Gracias por confiar en nosotros %s";
    private final static String VALIDATION_URL = "http://digitalbooking.ddns.net/validate?id=%s";

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;

    public EmailSenderService() {
    }

    public void sendConfirmationEmail(User user) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", " " + user.getName());
        context.setVariable("urlValidation", format(VALIDATION_URL, user.getId()));

        String content = templateEngine.process("validateEmail", context);
        sendMail(user.getEmail(), format(WELCOME_SUBJECT, user.getName()), content);
    }

    public void sendReservationEmail(User user, Reservation reservation, Product product) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", user.getName());
        context.setVariable("product", product.getTitle());
        context.setVariable("city", product.getCity().getName() + ", " + product.getCity().getCountry().getName());
        context.setVariable("address", product.getAddress() + ", " + product.getCity().getName() + ", " + product.getCity().getCountry().getName());
        context.setVariable("img", product.getImages().iterator().next().getName());
        context.setVariable("startDate", reservation.getStart_date());
        context.setVariable("endDate", reservation.getEnd_date());
        context.setVariable("checkin", reservation.getCheckIn());
        context.setVariable("checkout", product.getCheckOut());
        context.setVariable("location", "https://www.google.com.ar/maps/place/" + product.getLatitude() + "," + product.getLongitude());
        context.setVariable("rsv", "RSV" + reservation.getId());
        context.setVariable("productUrl", "http://digitalbooking.ddns.net/products/" + product.getId());

        String content = templateEngine.process("reservationDetails", context);
        sendMail(user.getEmail(), format(RESERVATION_SUBJECT, user.getName()), content);
    }

    private void sendMail(String email, String subject, String content) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject(subject);
        helper.setText(content, true);
        helper.setTo(email);
        mailSender.send(mimeMessage);
    }

}





