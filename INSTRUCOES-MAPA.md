# 🗺️ Sistema de Marcadores no Mapa - GADYS

## ✅ O que foi implementado:

### **1. Sistema Completo de Marcadores**
- **18 locais** do seu site com coordenadas reais
- Marcadores personalizados por categoria (🏛️ Monumentos, 🌳 Natureza)
- InfoWindows com detalhes completos de cada local

### **2. Funcionalidades Implementadas**
- ✅ **Filtros funcionais**: Categoria, preço, distância
- ✅ **Marcadores no mapa**: Aparecem/desaparecem conforme filtros
- ✅ **InfoWindows interativas**: Imagem, descrição, preço, horário
- ✅ **Links para detalhes**: Botão "Ver Detalhes" leva para página do local
- ✅ **Botão "Como Chegar"**: Abre Google Maps com rota
- ✅ **Geolocalização**: Usa localização real do usuário
- ✅ **Ranking de proximidade**: Lista ordenada por distância

### **3. Locais Incluídos**

#### **🏛️ Amazonas - Monumentos:**
- Teatro Amazonas
- Forte de São José  
- Mercado Municipal
- Palácio da Justiça
- Igreja de São Sebastião
- Palácio Rio Negro

#### **🌳 Amazonas - Natureza:**
- Floresta Amazônica
- Encontro das Águas
- Parque Nacional de Anavilhanas
- Reserva Mamirauá
- Parque Nacional do Jaú
- Rio Amazonas

#### **🏛️ Brasil - Monumentos:**
- Cristo Redentor (RJ)
- Pão de Açúcar (RJ)
- Pelourinho (BA)

#### **🌳 Brasil - Natureza:**
- Cataratas do Iguaçu (PR)
- Fernando de Noronha (PE)
- Pantanal (MT)

## 🚀 Como usar:

### **1. Para ativar o Google Maps:**
No arquivo `mapa.html`, linha com `YOUR_API_KEY`, substitua por sua chave:
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&callback=initMap"></script>
```

### **2. Para obter chave do Google Maps:**
1. Acesse: https://console.cloud.google.com/
2. Crie um projeto
3. Ative "Maps JavaScript API"
4. Crie uma chave API
5. Substitua `YOUR_API_KEY` pela sua chave

### **3. Testando sem chave (modo desenvolvimento):**
O sistema funciona mesmo sem chave, mas com limitações do Google Maps.

## 🎯 Funcionalidades do usuário:

### **Filtrar Locais:**
1. Selecione categoria (Monumentos/Natureza)
2. Escolha preço (Gratuito/Pago)  
3. Ajuste distância máxima
4. Clique "🔍 Filtrar Locais"
5. **Resultado**: Marcadores aparecem no mapa + ranking de proximidade

### **Usar Localização:**
1. Clique "📍 Minha Localização"
2. Permita acesso à localização
3. **Resultado**: Mapa centraliza na sua posição + cálculos de distância atualizados

### **Simular Localização:**
1. Clique "🎭 Simular Local"
2. Digite cidade (ex: "São Paulo", "Rio de Janeiro")
3. **Resultado**: Mapa vai para a cidade + recalcula distâncias

### **Ver Detalhes do Local:**
1. Clique em qualquer marcador no mapa
2. **Resultado**: InfoWindow com foto, descrição, preço, horário
3. Clique "📖 Ver Detalhes" → Vai para página específica do local
4. Clique "🗺️ Como Chegar" → Abre Google Maps com rota

## 📱 Responsivo:
- Funciona em desktop, tablet e mobile
- Filtros se adaptam ao tamanho da tela
- Mapa responsivo

## 🎨 Visual:
- Marcadores personalizados por categoria
- InfoWindows com design moderno
- Ranking visual com posições
- Integração com tema escuro/claro do site

## 🔧 Arquivos criados/modificados:
- ✅ `mapa-marcadores.js` - Sistema completo de marcadores
- ✅ `mapa.html` - Página atualizada com integração
- ✅ Todos os locais do seu site incluídos com coordenadas reais

**Agora quando o usuário filtrar "Monumentos", aparecerão marcadores no mapa de todos os monumentos cadastrados no seu site!** 🎉