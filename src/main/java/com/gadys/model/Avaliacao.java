package com.gadys.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "avaliacoes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"local_id", "usuario_id"})
})
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "local_id", nullable = false)
    private Local local;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @Column(nullable = false)
    private Integer nota;
    
    @Column(name = "data_avaliacao")
    private LocalDateTime dataAvaliacao = LocalDateTime.now();
    
    // Construtores
    public Avaliacao() {}
    
    public Avaliacao(Local local, Usuario usuario, Integer nota) {
        this.local = local;
        this.usuario = usuario;
        this.nota = nota;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Local getLocal() { return local; }
    public void setLocal(Local local) { this.local = local; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public Integer getNota() { return nota; }
    public void setNota(Integer nota) { this.nota = nota; }
    
    public LocalDateTime getDataAvaliacao() { return dataAvaliacao; }
    public void setDataAvaliacao(LocalDateTime dataAvaliacao) { this.dataAvaliacao = dataAvaliacao; }
    
    // Métodos de negócio
    public boolean validarNota(Integer nota) {
        return nota != null && nota >= 1 && nota <= 5;
    }
    
    public void atualizar(Integer novaNota) {
        if (validarNota(novaNota)) {
            this.nota = novaNota;
            this.dataAvaliacao = LocalDateTime.now();
        }
    }
}