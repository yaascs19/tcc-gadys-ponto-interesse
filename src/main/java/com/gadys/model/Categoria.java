                               package com.gadys.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String nome;
    
    @Column(length = 10)
    private String icone;
    
    @Column(length = 7)
    private String cor;
    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    private List<Local> locais = new ArrayList<>();
    
    // Construtores
    public Categoria() {}
    
    public Categoria(String nome, String icone, String cor) {
        this.nome = nome;
        this.icone = icone;
        this.cor = cor;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getIcone() { return icone; }
    public void setIcone(String icone) { this.icone = icone; }
    
    public String getCor() { return cor; }
    public void setCor(String cor) { this.cor = cor; }
    
    public List<Local> getLocais() { return locais; }
    public void setLocais(List<Local> locais) { this.locais = locais; }
    
    // Métodos de negócio
    public int getQuantidadeLocais() {
        return locais.size();
    }
}