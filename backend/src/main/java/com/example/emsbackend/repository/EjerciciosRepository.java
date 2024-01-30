package com.example.emsbackend.repository;

import com.example.emsbackend.entity.Ejercicios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EjerciciosRepository extends JpaRepository<Ejercicios, Long>{

}
