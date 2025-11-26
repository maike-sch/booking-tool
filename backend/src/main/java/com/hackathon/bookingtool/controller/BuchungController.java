package com.hackathon.bookingtool.controller;

import com.hackathon.bookingtool.dto.BuchungCreateDTO;
import com.hackathon.bookingtool.dto.BuchungDTO;
import com.hackathon.bookingtool.model.Buchung;
import com.hackathon.bookingtool.service.BuchungService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/buchungen")
public class BuchungController {
    private final BuchungService buchungService;

    public BuchungController(BuchungService buchungService) {
        this.buchungService = buchungService;
    }

    @PostMapping
    public ResponseEntity<BuchungDTO> create(@AuthenticationPrincipal UserDetails user,
                                             @Valid @RequestBody BuchungCreateDTO dto) {
        Buchung b = buchungService.create(user.getUsername(), dto.getRaumId(), dto.getStartZeit(), dto.getEndZeit());
        return ResponseEntity.ok(toDto(b));
    }

    @GetMapping("/user")
    public List<BuchungDTO> myBookings(@AuthenticationPrincipal UserDetails user) {
        return buchungService.findByUser(user.getUsername()).stream().map(this::toDto).collect(Collectors.toList());
    }

    private BuchungDTO toDto(Buchung b) {
        return new BuchungDTO(
                b.getId(),
                b.getRaum().getId(),
                b.getRaum().getName(),
                b.getUser(),
                b.getStartZeit(),
                b.getEndZeit()
        );
    }
}
