package com.example.emsbackend.service.impl;


import com.example.emsbackend.entity.Ejercicios;
import com.example.emsbackend.entity.Rutina;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.repository.EjerciciosRepository;
import com.example.emsbackend.repository.RutinaRepository;
import com.example.emsbackend.service.RutinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RutinaServiceImpl implements RutinaService {
    @Autowired
    private RutinaRepository rutinaRepository;
    @Autowired
    private EjerciciosRepository ejerciciosRepository;
    @Override
    public Rutina createRutina(Rutina rutina) {
        Rutina rutinaSaved = rutinaRepository.save(rutina);
        return rutinaSaved;
    }

    @Override
    public Rutina getRutinaById(Long rutinaId) {
        Rutina rutina = rutinaRepository.findById(rutinaId)
                .orElseThrow(() -> new ResourceNotFoundException("No existe una rutina con el id: " + rutinaId));
        return rutina;
    }

    @Override
    public List<Rutina> getAllRutinas(Long id) {
        List<Rutina> rutinas = rutinaRepository.findByUserId(id);
        return rutinas;
    }

    @Override
    public Rutina updateRutina(Long rutinaId, Rutina updatedRutina) {
        Rutina rutina = rutinaRepository.findById(rutinaId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un empleado con el id: " + rutinaId)
        );
        rutina.setRutina(updatedRutina.getRutina());
        Rutina updatedRutinaObj =  rutinaRepository.save(rutina);

        return rutina;
    }

    @Override
    public void deleteRutina(Long rutinaId) {
        Rutina rutina = rutinaRepository.findById(rutinaId).orElseThrow(
                () -> new ResourceNotFoundException("No existe una rutina con el id: " + rutinaId)
        );

        // Obtener ejercicios asociados a la rutina
        List<Ejercicios> ejerciciosAsociados = ejerciciosRepository.findByRutina(rutina);
            // Eliminar cada ejercicio asociado
        ejerciciosAsociados.forEach(ejercicio -> ejerciciosRepository.delete(ejercicio));
        // Eliminar la rutina
        rutinaRepository.deleteById(rutinaId);

    }


}
