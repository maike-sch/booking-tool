package com.hackathon.bookingtool.dto;

import java.time.LocalDateTime;

public class BuchungDTO {
    private Long id;
    private Long raumId;
    private String raumName;
    private String user;
    private LocalDateTime startZeit;
    private LocalDateTime endZeit;

    public BuchungDTO() {}

    public BuchungDTO(Long id, Long raumId, String raumName, String user, LocalDateTime startZeit, LocalDateTime endZeit) {
        this.id = id;
        this.raumId = raumId;
        this.raumName = raumName;
        this.user = user;
        this.startZeit = startZeit;
        this.endZeit = endZeit;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getRaumId() { return raumId; }
    public void setRaumId(Long raumId) { this.raumId = raumId; }
    public String getRaumName() { return raumName; }
    public void setRaumName(String raumName) { this.raumName = raumName; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
    public LocalDateTime getStartZeit() { return startZeit; }
    public void setStartZeit(LocalDateTime startZeit) { this.startZeit = startZeit; }
    public LocalDateTime getEndZeit() { return endZeit; }
    public void setEndZeit(LocalDateTime endZeit) { this.endZeit = endZeit; }
}
