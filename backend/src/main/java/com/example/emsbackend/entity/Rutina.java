package com.example.emsbackend.entity;

import com.example.emsbackend.dto.UserDto;
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
