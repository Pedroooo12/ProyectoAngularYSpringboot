package com.example.emsbackend.controller;

import com.example.emsbackend.entity.Rutina;
import com.example.emsbackend.service.RutinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/rutina")
public class RutinaController {
    @Autowired
    private RutinaService rutinaService;

    //Para añadir nuevos empleados
    @PostMapping
    public ResponseEntity<Rutina> createRutina(@RequestBody Rutina rutina){
        Rutina savedRutina = rutinaService.createRutina(rutina);
        return new ResponseEntity<>(savedRutina, HttpStatus.CREATED);
    }

    //Para leer los datos de un empleado a partir del id
    @GetMapping("{id}")
    public ResponseEntity<Rutina> getRutinaById(@PathVariable("id") Long rutinaId){
        Rutina rutina = rutinaService.getRutinaById(rutinaId);
        if (rutina != null) {
            return ResponseEntity.ok(rutina);
        } else {
            // Si no se encuentra el empleado, devolver un error 404
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Leemos la lista de todos los empleados
    @GetMapping
    public ResponseEntity<List<Rutina>> getAllRutinas(){
        List<Rutina> rutinas = rutinaService.getAllRutinas();
        return ResponseEntity.ok(rutinas);
    }

    //Para modificar los datos de un empleado
    @PutMapping("{id}")
    public ResponseEntity<Rutina> updateRutina(@PathVariable("id") Long rutinaId, @RequestBody Rutina updatedRutina){
        Rutina rutina = rutinaService.updateRutina(rutinaId, updatedRutina);
        return ResponseEntity.ok(rutina);
    }

    //Para eliminar un empleado
    @DeleteMapping("{id}")
    public void  deleteRutina(@PathVariable("id") Long rutinaId){

        rutinaService.deleteRutina(rutinaId);
    }
}
