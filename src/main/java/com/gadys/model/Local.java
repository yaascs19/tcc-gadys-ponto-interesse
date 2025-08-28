package com.gadys.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "locais")
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String nome;
    
    @Lob
    private String descricao;
    
    @ManyToOne
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    
    @Lob
    private String endereco;
    
    @Column(length = 50)
    private String coordenadas;
    
    @Lob
    private String horarioFuncionamento;
    
    @Column(length = 100)
    private String preco;
    
    @Lob
    private String informacoesAdicionais;
    
    @Column(name = "imagem_url", length = 500)
    private String imagemUrl;
    
    @Enumerated(EnumType.STRING)
    private StatusLocal status = StatusLocal.ATIVO;
    
    @ManyToOne
    @JoinColumn(name = "criado_por")
    private Usuario criadoPor;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();
    
    @Column(name = "data_aprovacao")
    private LocalDateTime dataAprovacao;
    
    @ManyToOne
    @JoinColumn(name = "aprovado_por")
    private Usuario aprovadoPor;
    
    @OneToMany(mappedBy = "local", cascade = CascadeType.ALL)
    private List<Avaliacao> avaliacoes = new ArrayList<>();
    
    @OneToMany(mappedBy = "local", cascade = CascadeType.ALL)
    private List<Comentario> comentarios = new ArrayList<>();
    
    // Construtores
    public Local() {}
    
    public Local(String nome, String descricao, Cidade cidade, Categoria categoria, Usuario criadoPor) {
        this.nome = nome;
        this.descricao = descricao;
        this.cidade = cidade;
        this.categoria = categoria;
        this.criadoPor = criadoPor;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public Cidade getCidade() { return cidade; }
    public void setCidade(Cidade cidade) { this.cidade = cidade; }
    
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    
    public String getCoordenadas() { return coordenadas; }
    public void setCoordenadas(String coordenadas) { this.coordenadas = coordenadas; }
    
    public String getHorarioFuncionamento() { return horarioFuncionamento; }
    public void setHorarioFuncionamento(String horarioFuncionamento) { this.horarioFuncionamento = horarioFuncionamento; }
    
    public String getPreco() { return preco; }
    public void setPreco(String preco) { this.preco = preco; }
    
    public String getInformacoesAdicionais() { return informacoesAdicionais; }
    public void setInformacoesAdicionais(String informacoesAdicionais) { this.informacoesAdicionais = informacoesAdicionais; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
    
    public StatusLocal getStatus() { return status; }
    public void setStatus(StatusLocal status) { this.status = status; }
    
    public Usuario getCriadoPor() { return criadoPor; }
    public void setCriadoPor(Usuario criadoPor) { this.criadoPor = criadoPor; }
    
    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
    
    public LocalDateTime getDataAprovacao() { return dataAprovacao; }
    public void setDataAprovacao(LocalDateTime dataAprovacao) { this.dataAprovacao = dataAprovacao; }
    
    public Usuario getAprovadoPor() { return aprovadoPor; }
    public void setAprovadoPor(Usuario aprovadoPor) { this.aprovadoPor = aprovadoPor; }
    
    public List<Avaliacao> getAvaliacoes() { return avaliacoes; }
    public void setAvaliacoes(List<Avaliacao> avaliacoes) { this.avaliacoes = avaliacoes; }
    
    public List<Comentario> getComentarios() { return comentarios; }
    public void setComentarios(List<Comentario> comentarios) { this.comentarios = comentarios; }
    
    // Métodos de negócio
    public void aprovar(Usuario admin) {
        if (admin.isAdmin()) {
            this.status = StatusLocal.ATIVO;
            this.dataAprovacao = LocalDateTime.now();
            this.aprovadoPor = admin;
        }
    }
    
    public void rejeitar(Usuario admin) {
        if (admin.isAdmin()) {
            this.status = StatusLocal.INATIVO;
        }
    }
    
    public Double calcularMediaAvaliacoes() {
        return avaliacoes.stream()
            .mapToInt(Avaliacao::getNota)
            .average()
            .orElse(0.0);
    }
}