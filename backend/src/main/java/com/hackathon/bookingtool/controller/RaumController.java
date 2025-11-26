package com.hackathon.bookingtool.controller;

import com.hackathon.bookingtool.dto.RaumCreateUpdateDTO;
import com.hackathon.bookingtool.dto.RaumDTO;
import com.hackathon.bookingtool.model.Raum;
import com.hackathon.bookingtool.service.RaumService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/raeume")
public class RaumController {

    private final RaumService raumService;

    public RaumController(RaumService raumService) {
        this.raumService = raumService;
    }

    @GetMapping
    public List<RaumDTO> list() {
        return raumService.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RaumDTO> get(@PathVariable Long id) {
        return raumService.findById(id).map(r -> ResponseEntity.ok(toDto(r))).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RaumDTO create(@Valid @RequestBody RaumCreateUpdateDTO dto) {
        Raum entity = new Raum(null, dto.getName(), dto.getAnzahlPlaetze(), dto.getAusstattung());
        return toDto(raumService.create(entity));
    }

    @PutMapping("/{id}")
    public RaumDTO update(@PathVariable Long id, @Valid @RequestBody RaumCreateUpdateDTO dto) {
        Raum updated = new Raum(id, dto.getName(), dto.getAnzahlPlaetze(), dto.getAusstattung());
        return toDto(raumService.update(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        raumService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/verfuegbar")
    public List<RaumDTO> verfuegbar(@RequestParam("datum") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate datum) {
        return raumService.findVerfuegbarAm(datum).stream().map(this::toDto).collect(Collectors.toList());
    }

    private RaumDTO toDto(Raum r) {
        return new RaumDTO(r.getId(), r.getName(), r.getAnzahlPlaetze(), r.getAusstattung());
    }
}
