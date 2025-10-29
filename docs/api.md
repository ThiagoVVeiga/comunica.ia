# API Reference - TD Snap Web

## Base URL
```
http://localhost:3001/api
```

## Autenticação
Atualmente não implementada. Será adicionada em versões futuras.

## Endpoints

### Pictogramas

#### GET /pictograms
Lista todos os pictogramas com paginação.

**Query Parameters:**
- `page` (number, optional): Página (padrão: 1)
- `limit` (number, optional): Itens por página (padrão: 50)
- `category` (number, optional): Filtrar por categoria
- `search` (string, optional): Termo de busca

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": 1,
      "keywords": [
        {
          "keyword": "casa",
          "meaning": "casa",
          "lse": false,
          "locImg": "casa.png"
        }
      ],
      "created": "2023-01-01T00:00:00.000Z",
      "lastUpdated": "2023-01-01T00:00:00.000Z",
      "downloads": 1000,
      "tags": ["casa", "moradia"],
      "sex": false,
      "violence": false,
      "aac": true,
      "aacColor": true,
      "skin": false,
      "hair": false,
      "categories": ["lugares"],
      "pictos": [
        {
          "_id": 1,
          "image": "https://api.arasaac.org/pictograms/1",
          "color": true,
          "b64": "base64string"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1000,
    "totalPages": 20
  }
}
```

#### GET /pictograms/search
Busca pictogramas por termo.

**Query Parameters:**
- `q` (string, required): Termo de busca
- `language` (string, optional): Idioma (padrão: 'pt')

**Response:**
```json
{
  "success": true,
  "data": [
    // Array de pictogramas encontrados
  ]
}
```

#### GET /pictograms/category/:categoryId
Lista pictogramas de uma categoria específica.

**Path Parameters:**
- `categoryId` (number): ID da categoria

**Query Parameters:**
- `language` (string, optional): Idioma (padrão: 'pt')

**Response:**
```json
{
  "success": true,
  "data": [
    // Array de pictogramas da categoria
  ]
}
```

#### GET /pictograms/:id
Obtém um pictograma específico.

**Path Parameters:**
- `id` (number): ID do pictograma

**Query Parameters:**
- `language` (string, optional): Idioma (padrão: 'pt')

**Response:**
```json
{
  "success": true,
  "data": {
    // Dados do pictograma
  }
}
```

#### POST /pictograms/sync
Sincroniza pictogramas com a ARASAAC.

**Request Body:**
```json
{
  "language": "pt"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sincronização iniciada com sucesso"
}
```

### Categorias

#### GET /categories
Lista todas as categorias.

**Query Parameters:**
- `language` (string, optional): Idioma (padrão: 'pt')

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pessoas",
      "description": "Pictogramas relacionados a pessoas",
      "pictograms": [1, 2, 3]
    }
  ]
}
```

#### GET /categories/:id
Obtém uma categoria específica.

**Path Parameters:**
- `id` (number): ID da categoria

**Query Parameters:**
- `language` (string, optional): Idioma (padrão: 'pt')

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Pessoas",
    "description": "Pictogramas relacionados a pessoas",
    "pictograms": [1, 2, 3]
  }
}
```

#### POST /categories/sync
Sincroniza categorias com a ARASAAC.

**Request Body:**
```json
{
  "language": "pt"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Categorias sincronizadas com sucesso",
  "data": {
    "count": 12
  }
}
```

### Frases

#### GET /phrases
Lista frases do usuário.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "phrase-1",
      "name": "Bom dia",
      "text": "Bom dia!",
      "pictograms": [
        {
          "id": 1,
          "name": "Bom",
          "imageUrl": "https://api.arasaac.org/pictograms/1"
        }
      ],
      "isCustom": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /phrases/:id
Obtém uma frase específica.

**Path Parameters:**
- `id` (string): ID da frase

**Response:**
```json
{
  "success": true,
  "data": {
    // Dados da frase
  }
}
```

#### POST /phrases
Cria uma nova frase.

**Request Body:**
```json
{
  "name": "Bom dia",
  "text": "Bom dia!",
  "pictograms": [1, 2, 3]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Frase criada com sucesso",
  "data": {
    "id": "phrase-1",
    "name": "Bom dia",
    "text": "Bom dia!"
  }
}
```

#### PUT /phrases/:id
Atualiza uma frase existente.

**Path Parameters:**
- `id` (string): ID da frase

**Request Body:**
```json
{
  "name": "Bom dia atualizado",
  "text": "Bom dia! Como você está?",
  "pictograms": [1, 2, 3, 4]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Frase atualizada com sucesso",
  "data": {
    // Dados atualizados da frase
  }
}
```

#### DELETE /phrases/:id
Exclui uma frase.

**Path Parameters:**
- `id` (string): ID da frase

**Response:**
```json
{
  "success": true,
  "message": "Frase excluída com sucesso"
}
```

### Configurações

#### GET /settings
Obtém configurações do usuário.

**Response:**
```json
{
  "success": true,
  "data": {
    "theme": "light",
    "fontSize": "medium",
    "speechRate": 1.0,
    "speechPitch": 1.0,
    "speechVolume": 1.0,
    "language": "pt-BR",
    "showText": true,
    "showImages": true,
    "gridSize": "medium",
    "autoSpeak": true
  }
}
```

#### PUT /settings
Atualiza configurações do usuário.

**Request Body:**
```json
{
  "theme": "dark",
  "fontSize": "large",
  "speechRate": 1.2,
  "speechPitch": 1.1,
  "speechVolume": 0.8,
  "language": "pt-BR",
  "showText": true,
  "showImages": true,
  "gridSize": "large",
  "autoSpeak": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Configurações atualizadas com sucesso",
  "data": {
    // Configurações atualizadas
  }
}
```

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## Formato de Erro

```json
{
  "success": false,
  "error": {
    "message": "Descrição do erro",
    "statusCode": 400,
    "path": "/api/pictograms"
  }
}
```

## Rate Limiting

- Limite: 100 requisições por IP a cada 15 minutos
- Headers de resposta:
  - `X-RateLimit-Limit`: Limite total
  - `X-RateLimit-Remaining`: Requisições restantes
  - `X-RateLimit-Reset`: Timestamp de reset

## CORS

A API aceita requisições de:
- `http://localhost:3000` (desenvolvimento)
- Configurável via `FRONTEND_URL`

## Headers Recomendados

```http
Content-Type: application/json
Accept: application/json
User-Agent: TD-Snap-Web/1.0.0
```