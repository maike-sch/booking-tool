package com.hackathon.bookingtool.service;

import com.hackathon.bookingtool.exception.ConflictException;
import com.hackathon.bookingtool.model.Buchung;
import com.hackathon.bookingtool.model.Raum;
import com.hackathon.bookingtool.repository.BuchungRepository;
import com.hackathon.bookingtool.repository.RaumRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class BuchungService {
    private final BuchungRepository buchungRepository;
    private final RaumRepository raumRepository;

    public BuchungService(BuchungRepository buchungRepository, RaumRepository raumRepository) {
        this.buchungRepository = buchungRepository;
        this.raumRepository = raumRepository;
    }

    public Buchung create(String username, Long raumId, LocalDateTime start, LocalDateTime end) {
        TimeSlotValidator.validateWithinBounds(start, end);
        Raum raum = raumRepository.findById(raumId).orElseThrow();
        List<Buchung> overlapping = buchungRepository.findOverlapping(raum, start, end);
        if (!overlapping.isEmpty()) {
            throw new ConflictException("Timeslot überschneidet sich mit bestehender Buchung");
        }
        Buchung b = new Buchung();
        b.setRaum(raum);
        b.setUser(username);
        b.setStartZeit(start);
        b.setEndZeit(end);
        return buchungRepository.save(b);
    }

    @Transactional(readOnly = true)
    public List<Buchung> findByUser(String username) {
        return buchungRepository.findByUser(username);
    }
}
