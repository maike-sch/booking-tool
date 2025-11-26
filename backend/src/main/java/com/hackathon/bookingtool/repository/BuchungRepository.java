package com.hackathon.bookingtool.repository;

import com.hackathon.bookingtool.model.Buchung;
import com.hackathon.bookingtool.model.Raum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface BuchungRepository extends JpaRepository<Buchung, Long> {

    @Query("select b from Buchung b where b.raum = :raum and b.startZeit < :end and b.endZeit > :start")
    List<Buchung> findOverlapping(@Param("raum") Raum raum,
                                  @Param("start") LocalDateTime start,
                                  @Param("end") LocalDateTime end);

    @Query("select b from Buchung b where b.user = :user order by b.startZeit desc")
    List<Buchung> findByUser(@Param("user") String user);

    @Query("select b from Buchung b where b.raum = :raum and b.startZeit >= :startOfDay and b.startZeit < :endOfDay")
    List<Buchung> findForRoomAndDay(@Param("raum") Raum raum,
                                    @Param("startOfDay") LocalDateTime startOfDay,
                                    @Param("endOfDay") LocalDateTime endOfDay);
}
