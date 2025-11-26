package com.hackathon.bookingtool.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "raeume")
public class Raum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank
    private String name;

    @Min(1)
    private int anzahlPlaetze;

    private String ausstattung;

    public Raum() {}

    public Raum(Long id, String name, int anzahlPlaetze, String ausstattung) {
        this.id = id;
        this.name = name;
        this.anzahlPlaetze = anzahlPlaetze;
        this.ausstattung = ausstattung;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAnzahlPlaetze() { return anzahlPlaetze; }
    public void setAnzahlPlaetze(int anzahlPlaetze) { this.anzahlPlaetze = anzahlPlaetze; }
    public String getAusstattung() { return ausstattung; }
    public void setAusstattung(String ausstattung) { this.ausstattung = ausstattung; }
}
