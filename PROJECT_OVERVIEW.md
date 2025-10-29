# TD Snap Web - Documentação Completa

## 📋 Visão Geral

**TD Snap Web** é uma plataforma de comunicação alternativa baseada na web, inspirada no TD Snap da Tobii Dynavox. O projeto visa oferecer uma solução acessível e escalável para comunicação alternativa e aumentativa (CAA), utilizando pictogramas da base de dados ARASAAC.

### 🎯 Objetivos

- **Democratizar** o acesso à comunicação alternativa
- **Simplificar** a interface comparada ao TD Snap original
- **Escalar** para múltiplas plataformas (web, iOS, Android)
- **Colaborar** com profissionais de fonoaudiologia
- **Expandir** para outros grupos (cegos, mudos)

## 🏗️ Arquitetura

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **React Router** para navegação
- **Context API** para gerenciamento de estado
- **Lucide React** para ícones

### Backend
- **Node.js** com Express e TypeScript
- **Prisma ORM** para banco de dados
- **PostgreSQL** como banco principal
- **Redis** para cache
- **Joi** para validação de dados
- **Helmet** para segurança

### Infraestrutura
- **Docker** e Docker Compose
- **Nginx** (para produção)
- **PM2** para gerenciamento de processos

## 🚀 Funcionalidades Implementadas

### ✅ Funcionalidades Ativas

#### 1. **Interface Principal**
- **Navegação** com sidebar responsiva
- **Temas** (claro, escuro, alto contraste)
- **Tamanhos de fonte** ajustáveis
- **Layout responsivo** para diferentes dispositivos

#### 2. **Busca de Pictogramas**
- **Busca em tempo real** com filtros
- **Botão de limpeza** da busca
- **Integração** com API ARASAAC
- **Cache** de resultados

#### 3. **Gerenciamento de Categorias**
- **CRUD completo** (criar, editar, excluir, listar)
- **Interface visual** para seleção
- **Formulário** para adicionar novas categorias
- **Validação** de dados

#### 4. **Síntese de Voz**
- **Texto para fala** integrado
- **Configurações** de velocidade, tom e volume
- **Suporte** a múltiplos idiomas
- **Indicador visual** de fala ativa

#### 5. **Configurações de Acessibilidade**
- **Temas adaptativos**
- **Tamanhos de fonte** escaláveis
- **Alto contraste** para usuários com deficiência visual
- **Redução de movimento** para usuários sensíveis

### 🔒 Segurança Implementada

#### 1. **Validação de Dados**
- **Schemas Joi** para validação rigorosa
- **Sanitização** de inputs (proteção XSS)
- **Limites** de tamanho e formato
- **Content-Type** validation

#### 2. **Headers de Segurança**
- **Helmet** com CSP configurado
- **CORS** restritivo
- **X-Frame-Options**, **X-XSS-Protection**
- **Referrer-Policy** e **Permissions-Policy**

#### 3. **Rate Limiting**
- **Limite** de requisições por IP
- **Exceções** para health checks
- **Headers informativos**

#### 4. **Logging de Segurança**
- **Detecção** de atividades suspeitas
- **Monitoramento** de tentativas de ataque
- **Logs estruturados** em JSON
- **Padrões suspeitos** (XSS, SQL injection, etc.)

## 📁 Estrutura do Projeto

```
td-snap-web/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # Context API (Settings, Speech)
│   │   ├── pages/          # Páginas da aplicação
│   │   └── index.tsx       # Entry point
│   ├── public/             # Arquivos estáticos
│   └── package.json
├── backend/                 # API Express
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── middleware/     # Middlewares (auth, validation, etc.)
│   │   ├── routes/         # Definição de rotas
│   │   ├── services/       # Serviços externos (ARASAAC)
│   │   └── index.ts        # Entry point
│   ├── prisma/             # Schema do banco
│   └── package.json
├── shared/                  # Tipos compartilhados
├── docs/                   # Documentação
├── docker-compose.yml      # Orquestração de containers
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca principal
- **TypeScript 4.9.5** - Tipagem estática
- **Tailwind CSS 3.3.6** - Framework CSS
- **Framer Motion 10.16.16** - Animações
- **React Router DOM 6.20.1** - Roteamento
- **Lucide React 0.294.0** - Ícones
- **Axios 1.6.2** - Cliente HTTP

### Backend
- **Node.js 18.19.0** - Runtime
- **Express 4.18.2** - Framework web
- **TypeScript 5.3.2** - Tipagem estática
- **Prisma 5.7.0** - ORM
- **PostgreSQL** - Banco de dados
- **Redis 4.6.10** - Cache
- **Joi 17.11.0** - Validação
- **Helmet 7.1.0** - Segurança

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Nginx** - Proxy reverso (produção)
- **PM2** - Gerenciador de processos

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18.19.0 ou superior
- npm ou yarn
- Docker e Docker Compose (opcional)
- PostgreSQL (para produção)
- Redis (para cache)

### Instalação Rápida
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd td-snap-web

# Execute o script de instalação
.\instalar.ps1
```

### Instalação Manual
```bash
# Instalar dependências do projeto principal
npm install

# Instalar dependências do frontend
cd frontend
npm install

# Instalar dependências do backend
cd ../backend
npm install
```

### Execução
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 🌐 URLs e Endpoints

### Frontend
- **Aplicação**: http://localhost:3000
- **Desenvolvimento**: Hot reload ativo

### Backend
- **API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Documentação**: http://localhost:3001/api-docs

### Endpoints Principais
- `GET /api/pictograms` - Listar pictogramas
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria
- `GET /api/phrases` - Listar frases
- `POST /api/phrases` - Criar frase
- `GET /api/settings` - Obter configurações
- `PUT /api/settings` - Atualizar configurações

## 🎨 Design e UX

### Princípios de Design
- **Simplicidade** - Interface limpa e intuitiva
- **Acessibilidade** - Conformidade WCAG 2.1 AA
- **Responsividade** - Funciona em todos os dispositivos
- **Consistência** - Padrões visuais uniformes

### Paleta de Cores
- **Primária**: Azul (#3B82F6)
- **Secundária**: Verde (#10B981)
- **Neutras**: Cinza (#6B7280)
- **Alto Contraste**: Preto/Branco

### Tipografia
- **Fonte Principal**: Inter
- **Tamanhos**: Small, Medium, Large, Extra Large
- **Peso**: Regular, Medium, Semibold, Bold

## 🔒 Segurança

### Medidas Implementadas
1. **Validação rigorosa** de todos os inputs
2. **Sanitização** de dados para prevenir XSS
3. **Rate limiting** para prevenir ataques de força bruta
4. **Headers de segurança** configurados
5. **CORS** restritivo
6. **Logging** de atividades suspeitas
7. **CSP** (Content Security Policy)

### Monitoramento
- **Logs de segurança** em `logs/security.log`
- **Detecção automática** de padrões suspeitos
- **Alertas** para tentativas de ataque
- **Métricas** de uso e performance

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] **CRUD de Frases** - Criar, editar, excluir frases
- [ ] **Integração ARASAAC** - Imagens reais dos pictogramas
- [ ] **Sistema de Usuários** - Login e autenticação
- [ ] **Persistência de Dados** - Banco de dados funcional
- [ ] **Exportação** - PDF, imagens das frases
- [ ] **Temas Personalizados** - Criação de temas customizados

### Versões Futuras
- **v0.2.0** - CRUD completo e integração ARASAAC
- **v0.3.0** - Sistema de usuários e autenticação
- **v1.0.0** - Versão estável para produção
- **v1.1.0** - Aplicativo mobile (React Native)

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **TypeScript** com tipagem rigorosa
- **ESLint** e **Prettier** configurados
- **Conventional Commits** para mensagens
- **Testes** obrigatórios para novas funcionalidades

### Áreas de Contribuição
- **Frontend** - Componentes React, UX/UI
- **Backend** - APIs, validação, segurança
- **Documentação** - Melhorias na documentação
- **Testes** - Cobertura de testes
- **Acessibilidade** - Melhorias de acessibilidade

## 📞 Suporte

### Documentação
- [Guia de Desenvolvimento](./docs/development.md)
- [API Reference](./docs/api.md)
- [Guia de Acessibilidade](./docs/accessibility.md)

### Issues
- Use o sistema de Issues do GitHub
- Inclua logs e screenshots quando possível
- Descreva o comportamento esperado vs atual

### Comunidade
- **Discord**: [Link do servidor]
- **Email**: contato@tdsnapweb.com
- **Twitter**: @tdsnapweb

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **ARASAAC** - Base de dados de pictogramas
- **Tobii Dynavox** - Inspiração do TD Snap original
- **Comunidade React** - Ferramentas e recursos
- **Profissionais de Fonoaudiologia** - Feedback e orientação

---

**TD Snap Web** - Democratizando a comunicação alternativa através da tecnologia web.
