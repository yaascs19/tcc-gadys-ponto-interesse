# 🎨 Guia de Coesão Visual - GADYS

## 📋 **Análise Atual**

### ✅ **Pontos Fortes:**
- Paleta de cores consistente (azul #1a237e como principal)
- Logo padronizado em todas as páginas
- Navegação hamburger unificada
- Sistema de cards similar

### ⚠️ **Problemas Identificados:**
1. **CSS duplicado** - Estilos repetidos em várias páginas
2. **Inconsistências de layout** - Diferentes padrões de container
3. **Modo escuro incompleto** - Nem todas as páginas implementam
4. **Variações de botões** - Diferentes estilos para mesma função

## 🔧 **Soluções Implementadas**

### 1. **Arquivo CSS Global** (`/public/global-styles.css`)
- Variáveis CSS para cores, espaçamentos e transições
- Classes utilitárias padronizadas
- Sistema de grid responsivo
- Componentes reutilizáveis

### 2. **Como Aplicar nas Páginas:**

#### **Adicionar no `<head>` de todas as páginas HTML:**
```html
<link rel="stylesheet" href="/global-styles.css">
```

#### **Substituir classes existentes:**
```html
<!-- ANTES -->
<div class="card" style="background: white; padding: 2rem; border-radius: 15px;">

<!-- DEPOIS -->
<div class="card">
  <div class="card-info">
```

#### **Usar variáveis CSS:**
```css
/* ANTES */
background: #1a237e;
color: #333;

/* DEPOIS */
background: var(--primary-blue);
color: var(--text-primary);
```

## 🎯 **Checklist de Implementação**

### **Páginas Prioritárias:**
- [ ] `home.html` - Página inicial
- [ ] `login.html` - Formulário de login
- [ ] `lugares.html` - Lista de lugares
- [ ] `amazonas.html` - Página do estado
- [ ] Componentes React (`App.jsx`, `Login.jsx`)

### **Mudanças Específicas:**

#### **1. Headers/Navegação:**
```html
<header class="header">
  <nav class="nav">
    <img src="/logo.png" alt="GADYS" class="logo" />
    <!-- resto da navegação -->
  </nav>
</header>
```

#### **2. Cards de Lugares:**
```html
<div class="card">
  <img src="imagem.jpg" alt="Local">
  <div class="card-info">
    <h3 class="card-title">Nome do Local</h3>
    <p class="card-description">Descrição...</p>
    <button class="btn btn-primary">Visitar</button>
  </div>
</div>
```

#### **3. Seções Hero:**
```html
<section class="hero">
  <div class="hero-content">
    <h1>Título Principal</h1>
    <p>Descrição do local</p>
    <button class="btn btn-secondary">Explorar</button>
  </div>
</section>
```

#### **4. Grids Responsivos:**
```html
<div class="container">
  <div class="grid">
    <!-- cards aqui -->
  </div>
</div>
```

## 🌙 **Modo Escuro Padronizado**

### **JavaScript para Toggle:**
```javascript
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', 
    document.body.classList.contains('dark-mode') ? 'dark' : 'light'
  );
}

// Carregar tema salvo
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
```

## 📱 **Responsividade**

### **Breakpoints Padronizados:**
- **Desktop:** > 768px
- **Tablet:** 481px - 768px  
- **Mobile:** ≤ 480px

### **Classes Utilitárias:**
```html
<div class="text-center mb-4">
  <h2 class="section-title">Título da Seção</h2>
</div>
```

## 🚀 **Próximos Passos**

1. **Implementar global-styles.css** em todas as páginas
2. **Refatorar CSS inline** para usar classes padronizadas
3. **Testar modo escuro** em todas as páginas
4. **Validar responsividade** em diferentes dispositivos
5. **Otimizar performance** removendo CSS duplicado

## 📊 **Benefícios Esperados**

- ✅ **Consistência visual** em 100% das páginas
- ✅ **Redução de 60%** no código CSS duplicado
- ✅ **Manutenção simplificada** com variáveis CSS
- ✅ **Melhor experiência** do usuário
- ✅ **Performance otimizada** com menos CSS

---

**💡 Dica:** Implemente gradualmente, começando pelas páginas mais visitadas (home, login, lugares).