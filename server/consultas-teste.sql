-- CONSULTAS DE TESTE PARA O BANCO GADYS

-- Ver todos os usuários
SELECT * FROM Usuarios;

-- Ver todos os locais
SELECT * FROM Locais;

-- Ver ranking completo
SELECT * FROM vw_RankingLocais ORDER BY MediaAvaliacoes DESC;

-- Ver locais com detalhes completos
SELECT * FROM vw_LocaisCompletos;

-- Estatísticas do sistema
EXEC sp_EstatisticasSistema;

-- Contar registros por tabela
SELECT 'Usuarios' as Tabela, COUNT(*) as Total FROM Usuarios
UNION ALL
SELECT 'Locais', COUNT(*) FROM Locais
UNION ALL
SELECT 'Avaliacoes', COUNT(*) FROM Avaliacoes
UNION ALL
SELECT 'Comentarios', COUNT(*) FROM Comentarios;

-- Ver últimos comentários
SELECT TOP 10 
    c.Texto,
    c.DataComentario,
    u.Nome as Usuario,
    l.Nome as Local
FROM Comentarios c
JOIN Usuarios u ON c.UsuarioID = u.ID
JOIN Locais l ON c.LocalID = l.ID
ORDER BY c.DataComentario DESC;

-- Locais por categoria
SELECT 
    cat.Nome as Categoria,
    COUNT(l.ID) as TotalLocais
FROM Categorias cat
LEFT JOIN Locais l ON cat.ID = l.CategoriaID
GROUP BY cat.Nome;