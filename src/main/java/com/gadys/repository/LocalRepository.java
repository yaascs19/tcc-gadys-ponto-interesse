package com.gadys.repository;

import com.gadys.model.Local;
import com.gadys.model.StatusLocal;
import com.gadys.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
    List<Local> findByStatus(StatusLocal status);
    List<Local> findByCategoria(Categoria categoria);
    List<Local> findByCidadeId(Long cidadeId);
    
    @Query("SELECT l FROM Local l WHERE l.nome LIKE %?1%")
    List<Local> findByNomeContaining(String nome);
}