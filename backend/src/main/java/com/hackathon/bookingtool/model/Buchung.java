package com.hackathon.bookingtool.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "buchungen")
public class Buchung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Raum raum;

    @NotBlank
    @Column(name = "username", nullable = false)
    private String user;

    @NotNull
    private LocalDateTime startZeit;

    @NotNull
    private LocalDateTime endZeit;

    public Buchung() {}

    public Buchung(Long id, Raum raum, String user, LocalDateTime startZeit, LocalDateTime endZeit) {
        this.id = id;
        this.raum = raum;
        this.user = user;
        this.startZeit = startZeit;
        this.endZeit = endZeit;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Raum getRaum() { return raum; }
    public void setRaum(Raum raum) { this.raum = raum; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    public LocalDateTime getStartZeit() { return startZeit; }
    public void setStartZeit(LocalDateTime startZeit) { this.startZeit = startZeit; }
    public LocalDateTime getEndZeit() { return endZeit; }
    public void setEndZeit(LocalDateTime endZeit) { this.endZeit = endZeit; }
}
