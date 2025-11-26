package com.hackathon.bookingtool.service;

import com.hackathon.bookingtool.model.Buchung;
import com.hackathon.bookingtool.model.Raum;
import com.hackathon.bookingtool.repository.BuchungRepository;
import com.hackathon.bookingtool.repository.RaumRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RaumService {
    private final RaumRepository raumRepository;
    private final BuchungRepository buchungRepository;

    public RaumService(RaumRepository raumRepository, BuchungRepository buchungRepository) {
        this.raumRepository = raumRepository;
        this.buchungRepository = buchungRepository;
    }

    public Raum create(Raum raum) {
        return raumRepository.save(raum);
    }

    public Raum update(Long id, Raum updated) {
        Raum existing = raumRepository.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setAnzahlPlaetze(updated.getAnzahlPlaetze());
        existing.setAusstattung(updated.getAusstattung());
        return raumRepository.save(existing);
    }

    public void delete(Long id) {
        raumRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Raum> findAll() {
        return raumRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Raum> findById(Long id) {
        return raumRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Raum> findVerfuegbarAm(LocalDate datum) {
        LocalDateTime startOfDay = datum.atTime(TimeSlotValidator.START);
        LocalDateTime endOfDay = datum.atTime(TimeSlotValidator.END);
        List<Raum> all = raumRepository.findAll();
        return all.stream().filter(r -> {
            List<Buchung> bs = buchungRepository.findForRoomAndDay(r, startOfDay, endOfDay);
            return bs.isEmpty();
        }).collect(Collectors.toList());
    }
}
