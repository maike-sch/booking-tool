package com.hackathon.bookingtool.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public final class TimeSlotValidator {
    public static final LocalTime START = LocalTime.of(8, 0);
    public static final LocalTime END = LocalTime.of(18, 0);
    public static final int STEP_MINUTES = 15;

    private TimeSlotValidator() {}

    public static void validateWithinBounds(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null || !end.isAfter(start)) {
            throw new IllegalArgumentException("Ungültiger Zeitraum");
        }
        LocalDate date = start.toLocalDate();
        if (!date.equals(end.toLocalDate())) {
            throw new IllegalArgumentException("Buchung muss an einem Tag liegen");
        }
        LocalTime s = start.toLocalTime();
        LocalTime e = end.toLocalTime();
        if (s.isBefore(START) || e.isAfter(END)) {
            throw new IllegalArgumentException("Buchbare Zeiten sind 08:00–18:00");
        }
        if (!isOnStep(s) || !isOnStep(e)) {
            throw new IllegalArgumentException("Zeiten müssen im 15-Minuten-Raster liegen");
        }
    }

    private static boolean isOnStep(LocalTime t) {
        return t.getMinute() % STEP_MINUTES == 0 && t.getSecond() == 0 && t.getNano() == 0;
    }
}
