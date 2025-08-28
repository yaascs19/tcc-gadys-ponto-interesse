# Como Executar o Projeto GADYS no IntelliJ

## Pré-requisitos
- Java 17 ou superior
- IntelliJ IDEA
- Maven (incluído no IntelliJ)

## Passos para Executar

### 1. Abrir o Projeto
1. Abra o IntelliJ IDEA
2. Clique em "Open" ou "File > Open"
3. Navegue até a pasta `tcc-gadys-ponto-interesse`
4. Selecione a pasta e clique em "OK"

### 2. Configurar o Projeto
1. O IntelliJ detectará automaticamente que é um projeto Maven
2. Aguarde o download das dependências (pode levar alguns minutos)
3. Certifique-se que o SDK está configurado para Java 17+

### 3. Executar a Aplicação
1. Navegue até `src/main/java/com/gadys/GadysApplication.java`
2. Clique com botão direito na classe
3. Selecione "Run 'GadysApplication'"
4. Ou use o atalho `Ctrl+Shift+F10`

### 4. Verificar se Funcionou
1. Aguarde a aplicação iniciar (veja o console)
2. Quando aparecer "Started GadysApplication", está pronto
3. Acesse: http://localhost:8080/h2-console
4. Use as configurações:
   - JDBC URL: `jdbc:h2:mem:gadys`
   - User Name: `sa`
   - Password: (deixe vazio)

## Estrutura do Projeto
```
src/main/java/com/gadys/
├── model/          # Entidades JPA
├── repository/     # Repositórios Spring Data
├── service/        # Lógica de negócio
└── GadysApplication.java  # Classe principal
```

## Testando as Classes
Você pode criar uma classe de teste para verificar se tudo funciona:

```java
@SpringBootTest
class GadysApplicationTests {
    @Autowired
    private LocalService localService;
    
    @Test
    void contextLoads() {
        // Teste básico
        assertNotNull(localService);
    }
}
```

## Próximos Passos
1. Adicionar controllers REST
2. Implementar autenticação
3. Criar frontend
4. Conectar com banco real (PostgreSQL/MySQL)