package com.example.emsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="rutina")
public class Rutina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="rutina", nullable = false, unique = true)
    private String rutina;

    @Column(name="ejercicios")
    @OneToMany(mappedBy = "ejercicios", cascade = CascadeType.REMOVE)
    private List<Ejercicios> ejercicios;

}
