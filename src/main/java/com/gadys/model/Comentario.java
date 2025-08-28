package com.gadys.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comentarios")
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "local_id", nullable = false)
    private Local local;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @Lob
    @Column(nullable = false)
    private String texto;
    
    @Column(name = "data_comentario")
    private LocalDateTime dataComentario = LocalDateTime.now();
    
    // Construtores
    public Comentario() {}
    
    public Comentario(Local local, Usuario usuario, String texto) {
        this.local = local;
        this.usuario = usuario;
        this.texto = texto;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Local getLocal() { return local; }
    public void setLocal(Local local) { this.local = local; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
    
    public LocalDateTime getDataComentario() { return dataComentario; }
    public void setDataComentario(LocalDateTime dataComentario) { this.dataComentario = dataComentario; }
    
    // Métodos de negócio
    public void editar(String novoTexto) {
        this.texto = novoTexto;
        this.dataComentario = LocalDateTime.now();
    }
    
    public boolean podeEditar(Usuario usuario) {
        return this.usuario.getId().equals(usuario.getId()) || usuario.isAdmin();
    }
}