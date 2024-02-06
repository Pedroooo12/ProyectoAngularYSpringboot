package com.example.emsbackend.repository;

import com.example.emsbackend.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long>{
    @Query("SELECT r FROM Rutina r WHERE r.user.id = :userId")
    List<Rutina> findByUserId(@Param("userId") Long userId);

}
