# TD Snap Web - Plataforma de Comunicação Alternativa

Uma plataforma web moderna e acessível para comunicação alternativa, baseada no conceito do TD Snap e integrada com a base de dados ARASAAC.

## 🎯 Objetivos

- Criar uma interface web simples e intuitiva para comunicação alternativa
- Integrar com a base de dados ARASAAC de pictogramas
- Implementar síntese de voz para conversão de seleções em fala
- Permitir personalização de categorias e frases
- Focar em acessibilidade e usabilidade

## 🏗️ Arquitetura

### Frontend (React + TypeScript)
- Interface responsiva e acessível
- Gerenciamento de estado com Context API
- Integração com APIs de síntese de voz
- Suporte a diferentes temas e tamanhos de fonte

### Backend (Node.js + Express)
- API REST para gerenciamento de dados
- Integração com ARASAAC
- Sistema de cache com Redis
- Banco de dados PostgreSQL para configurações

## 🚀 Tecnologias

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL, Redis
- **Deploy**: Docker, Vercel (frontend), Railway (backend)

## 📁 Estrutura do Projeto

```
td-snap-web/
├── frontend/          # Aplicação React
├── backend/           # API Node.js
├── shared/            # Tipos e utilitários compartilhados
├── docs/              # Documentação
└── docker-compose.yml # Configuração Docker
```

## 🎨 Funcionalidades Principais

1. **Sistema de Categorias**
   - Organização hierárquica de pictogramas
   - Categorias personalizáveis
   - Busca e filtros

2. **Síntese de Voz**
   - Conversão de seleções em fala
   - Múltiplos idiomas
   - Velocidade e tom configuráveis

3. **Personalização**
   - Criação de frases personalizadas
   - Configuração de temas
   - Ajustes de acessibilidade

4. **Acessibilidade**
   - Suporte a leitores de tela
   - Navegação por teclado
   - Alto contraste
   - Tamanhos de fonte ajustáveis

## 🚀 Como Executar

1. Clone o repositório
2. Execute `npm install` na raiz
3. Configure as variáveis de ambiente
4. Execute `npm run dev` para desenvolvimento

## 📚 Documentação

- [Guia de Desenvolvimento](./docs/development.md)
- [API Reference](./docs/api.md)
- [Guia de Acessibilidade](./docs/accessibility.md)

## 🤝 Contribuição

Este projeto está em desenvolvimento ativo. Contribuições são bem-vindas!

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.