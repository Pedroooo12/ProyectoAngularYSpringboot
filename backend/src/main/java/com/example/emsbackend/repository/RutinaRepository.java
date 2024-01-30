package com.example.emsbackend.repository;

import com.example.emsbackend.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long>{

}
