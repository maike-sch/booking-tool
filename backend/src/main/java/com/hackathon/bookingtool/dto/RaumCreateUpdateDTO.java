package com.hackathon.bookingtool.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class RaumCreateUpdateDTO {
    @NotBlank
    private String name;
    @Min(1)
    private int anzahlPlaetze;
    private String ausstattung;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAnzahlPlaetze() { return anzahlPlaetze; }
    public void setAnzahlPlaetze(int anzahlPlaetze) { this.anzahlPlaetze = anzahlPlaetze; }
    public String getAusstattung() { return ausstattung; }
    public void setAusstattung(String ausstattung) { this.ausstattung = ausstattung; }
}
