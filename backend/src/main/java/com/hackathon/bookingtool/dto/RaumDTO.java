package com.hackathon.bookingtool.dto;

public class RaumDTO {
    private Long id;
    private String name;
    private int anzahlPlaetze;
    private String ausstattung;

    public RaumDTO() {}

    public RaumDTO(Long id, String name, int anzahlPlaetze, String ausstattung) {
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
