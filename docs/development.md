# Guia de Desenvolvimento - TD Snap Web

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Docker e Docker Compose (opcional)

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd td-snap-web
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie o banco de dados (Docker)**
```bash
docker-compose up postgres redis -d
```

5. **Execute as migrações**
```bash
cd backend
npm run migrate
```

6. **Inicie o desenvolvimento**
```bash
npm run dev
```

## 🏗️ Arquitetura

### Estrutura do Projeto
```
td-snap-web/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── contexts/      # Contextos React
│   │   ├── hooks/         # Hooks customizados
│   │   ├── services/      # Serviços de API
│   │   └── utils/         # Utilitários
├── backend/           # API Node.js
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── services/      # Serviços de negócio
│   │   ├── routes/        # Rotas da API
│   │   ├── middleware/    # Middlewares
│   │   └── utils/         # Utilitários
├── shared/            # Código compartilhado
│   └── types.ts       # Tipos TypeScript
└── docs/              # Documentação
```

### Stack Tecnológico

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS para estilização
- Framer Motion para animações
- React Router para navegação
- Context API para gerenciamento de estado

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis para cache

**Infraestrutura:**
- Docker para containerização
- Docker Compose para desenvolvimento local

## 🔧 Scripts Disponíveis

### Raiz do Projeto
- `npm run dev` - Inicia frontend e backend em modo desenvolvimento
- `npm run build` - Constrói ambos os projetos
- `npm start` - Inicia apenas o backend

### Frontend
- `npm run start` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói para produção
- `npm run test` - Executa os testes

### Backend
- `npm run dev` - Inicia em modo desenvolvimento com hot reload
- `npm run build` - Compila TypeScript
- `npm run migrate` - Executa migrações do banco
- `npm run generate` - Gera cliente Prisma

## 📊 Banco de Dados

### Modelos Principais

**User:** Usuários do sistema
**UserSettings:** Configurações personalizadas
**Category:** Categorias de pictogramas
**Pictogram:** Pictogramas da ARASAAC
**Phrase:** Frases personalizadas

### Migrações
```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações
npx prisma migrate deploy

# Reset do banco
npx prisma migrate reset
```

## 🔌 Integração com ARASAAC

### Serviço de Integração
O `ArasaacService` gerencia a comunicação com a API da ARASAAC:

```typescript
// Buscar pictogramas
const pictograms = await arasaacService.searchPictograms('casa');

// Buscar por categoria
const pictograms = await arasaacService.getPictogramsByCategory(1);

// Sincronizar dados
await arasaacService.syncPictograms();
```

### URLs da API ARASAAC
- Base: `https://api.arasaac.org`
- Pictogramas: `/pictograms/{language}`
- Categorias: `/categories/{language}`
- Busca: `/pictograms/{language}/search/{term}`

## 🎨 Desenvolvimento Frontend

### Componentes
Todos os componentes seguem o padrão de functional components com TypeScript:

```typescript
interface ComponentProps {
  // Props tipadas
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Lógica do componente
  return <div>JSX</div>;
};
```

### Contextos
Use os contextos para gerenciar estado global:
- `SettingsContext`: Configurações do usuário
- `SpeechContext`: Síntese de voz

### Estilização
Use Tailwind CSS com classes utilitárias:
```jsx
<div className="bg-primary-600 text-white p-4 rounded-lg">
  Conteúdo
</div>
```

## 🔧 Desenvolvimento Backend

### Estrutura de Rotas
```typescript
// routes/pictograms.ts
router.get('/', pictogramController.getAll);
router.get('/search', pictogramController.search);
router.get('/:id', pictogramController.getById);
```

### Controladores
```typescript
export const pictogramController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Lógica do controlador
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
};
```

### Middleware de Erro
Todos os erros são capturados pelo middleware centralizado:
```typescript
app.use(errorHandler);
```

## 🧪 Testes

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
npm test
```

## 🚀 Deploy

### Desenvolvimento
```bash
docker-compose up
```

### Produção
1. Configure variáveis de ambiente
2. Execute migrações
3. Construa os projetos
4. Inicie os serviços

## 📝 Convenções

### Commits
Use conventional commits:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes

### Nomenclatura
- Componentes: PascalCase (`UserSettings`)
- Funções: camelCase (`getUserSettings`)
- Constantes: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Arquivos: kebab-case (`user-settings.ts`)

## 🐛 Debugging

### Frontend
- Use React DevTools
- Console do navegador
- Network tab para requisições

### Backend
- Logs no console
- Debugger do VS Code
- Prisma Studio para banco

## 📚 Recursos Adicionais

- [Documentação React](https://react.dev/)
- [Documentação Tailwind](https://tailwindcss.com/)
- [Documentação Prisma](https://www.prisma.io/docs/)
- [API ARASAAC](https://api.arasaac.org/)
