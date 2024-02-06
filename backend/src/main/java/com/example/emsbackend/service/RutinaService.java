package com.example.emsbackend.service;

import com.example.emsbackend.entity.Rutina;

import java.util.List;

public interface RutinaService {
    Rutina createRutina(Rutina rutina);
    Rutina getRutinaById(Long rutinaId);
    List<Rutina> getAllRutinas(Long user_id);
    Rutina updateRutina(Long rutinaId, Rutina updatedRutina);

    void deleteRutina(Long employeeId);
}
