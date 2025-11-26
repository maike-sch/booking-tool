package com.hackathon.bookingtool.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class BuchungCreateDTO {
    @NotNull
    private Long raumId;
    @NotNull
    private LocalDateTime startZeit;
    @NotNull
    private LocalDateTime endZeit;

    public Long getRaumId() { return raumId; }
    public void setRaumId(Long raumId) { this.raumId = raumId; }
    public LocalDateTime getStartZeit() { return startZeit; }
    public void setStartZeit(LocalDateTime startZeit) { this.startZeit = startZeit; }
    public LocalDateTime getEndZeit() { return endZeit; }
    public void setEndZeit(LocalDateTime endZeit) { this.endZeit = endZeit; }
}
