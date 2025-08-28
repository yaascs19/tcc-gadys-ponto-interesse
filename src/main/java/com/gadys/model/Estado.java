package com.gadys.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "estados")
public class Estado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String nome;
    
    @Column(nullable = false, unique = true, length = 2)
    private String sigla;
    
    @OneToMany(mappedBy = "estado", cascade = CascadeType.ALL)
    private List<Cidade> cidades = new ArrayList<>();
    
    // Construtores
    public Estado() {}
    
    public Estado(String nome, String sigla) {
        this.nome = nome;
        this.sigla = sigla;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getSigla() { return sigla; }
    public void setSigla(String sigla) { this.sigla = sigla; }
    
    public List<Cidade> getCidades() { return cidades; }
    public void setCidades(List<Cidade> cidades) { this.cidades = cidades; }
}