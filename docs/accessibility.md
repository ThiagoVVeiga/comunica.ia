# Guia de Acessibilidade - TD Snap Web

## 🎯 Princípios de Acessibilidade

O TD Snap Web foi desenvolvido seguindo as diretrizes WCAG 2.1 AA para garantir que seja acessível para todos os usuários, especialmente aqueles com necessidades especiais de comunicação.

## ♿ Recursos de Acessibilidade Implementados

### 1. Navegação por Teclado
- **Tab Navigation**: Todos os elementos interativos são acessíveis via teclado
- **Skip Links**: Links para pular para o conteúdo principal
- **Focus Indicators**: Indicadores visuais claros para elementos em foco

```jsx
// Exemplo de botão acessível
<button
  className="pictogram-button focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Conteúdo do botão
</button>
```

### 2. Leitores de Tela
- **ARIA Labels**: Rótulos descritivos para elementos
- **Semantic HTML**: Uso correto de elementos semânticos
- **Live Regions**: Anúncios de mudanças dinâmicas

```jsx
// Exemplo com ARIA
<div
  role="button"
  aria-label="Pictograma: Casa"
  aria-describedby="pictogram-description"
  tabIndex={0}
>
  <img src="casa.png" alt="Pictograma representando uma casa" />
  <span id="pictogram-description">Clique para falar 'Casa'</span>
</div>
```

### 3. Alto Contraste
- **Tema de Alto Contraste**: Modo especial para melhor visibilidade
- **Cores Contrastantes**: Mínimo de 4.5:1 para texto normal
- **Bordas Definidas**: Elementos com bordas claras

```css
/* Exemplo de alto contraste */
@media (prefers-contrast: high) {
  .pictogram-button {
    @apply border-gray-800;
  }
  
  .pictogram-button:hover {
    @apply border-gray-900 bg-gray-100;
  }
}
```

### 4. Tamanhos de Fonte Ajustáveis
- **4 Níveis**: Pequeno, Médio, Grande, Extra Grande
- **Escalabilidade**: Interface se adapta ao tamanho escolhido
- **Proporcional**: Todos os elementos crescem proporcionalmente

### 5. Redução de Movimento
- **Respeita Preferências**: Detecta `prefers-reduced-motion`
- **Animações Opcionais**: Animações podem ser desabilitadas
- **Transições Suaves**: Transições mais sutis quando necessário

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎨 Temas de Acessibilidade

### Tema Claro
- Fundo branco com texto escuro
- Contraste adequado para leitura
- Cores suaves e profissionais

### Tema Escuro
- Fundo escuro com texto claro
- Reduz fadiga visual em ambientes escuros
- Mantém contraste adequado

### Tema Alto Contraste
- Máximo contraste entre elementos
- Bordas bem definidas
- Cores contrastantes para melhor visibilidade

## 🔊 Síntese de Voz

### Configurações Disponíveis
- **Velocidade**: 0.5x a 2.0x
- **Tom**: 0.5x a 2.0x
- **Volume**: 0% a 100%
- **Idioma**: Português brasileiro (padrão)

### Implementação
```typescript
const speak = async (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.volume = settings.volume;
  utterance.lang = settings.language;
  
  speechSynthesis.speak(utterance);
};
```

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações
- **Grid Responsivo**: Ajusta número de colunas
- **Botões Maiores**: Em dispositivos móveis
- **Navegação Simplificada**: Menu adaptado para touch

## 🎯 Pictogramas Acessíveis

### Características
- **Alto Contraste**: Imagens com contraste adequado
- **Tamanho Mínimo**: 48x48px para touch
- **Textos Alternativos**: Descrições claras
- **Fallbacks**: Imagens de fallback para carregamento

### Implementação
```jsx
<img
  src={pictogram.imageUrl}
  alt={`Pictograma: ${pictogram.name}`}
  className="w-full h-full object-contain"
  onError={(e) => {
    e.currentTarget.src = fallbackImage;
  }}
/>
```

## ⌨️ Atalhos de Teclado

### Navegação
- **Tab**: Próximo elemento
- **Shift + Tab**: Elemento anterior
- **Enter/Space**: Ativar elemento
- **Escape**: Fechar modais/menus

### Funcionalidades
- **Ctrl + S**: Salvar configurações
- **Ctrl + F**: Buscar pictogramas
- **Space**: Falar pictograma selecionado

## 🧪 Testes de Acessibilidade

### Ferramentas Recomendadas
- **axe-core**: Testes automatizados
- **WAVE**: Avaliação visual
- **NVDA/JAWS**: Testes com leitores de tela
- **Lighthouse**: Auditoria de acessibilidade

### Checklist de Testes
- [ ] Navegação completa por teclado
- [ ] Leitores de tela funcionam corretamente
- [ ] Contraste adequado em todos os temas
- [ ] Tamanhos de fonte funcionam
- [ ] Animações respeitam preferências
- [ ] Imagens têm textos alternativos
- [ ] Formulários são acessíveis
- [ ] Foco é visível e lógico

## 📋 Diretrizes de Desenvolvimento

### HTML Semântico
```jsx
// ✅ Bom
<main>
  <section aria-labelledby="categories-heading">
    <h2 id="categories-heading">Categorias</h2>
    <ul role="list">
      <li role="listitem">Categoria 1</li>
    </ul>
  </section>
</main>

// ❌ Evitar
<div>
  <div>
    <div>Categorias</div>
    <div>Categoria 1</div>
  </div>
</div>
```

### ARIA Labels
```jsx
// ✅ Bom
<button
  aria-label="Falar frase: Bom dia"
  aria-describedby="phrase-description"
>
  <Volume2 />
  <span id="phrase-description">Clique para falar esta frase</span>
</button>
```

### Estados de Foco
```jsx
// ✅ Bom
<button className="focus:ring-2 focus:ring-primary-500 focus:outline-none">
  Botão
</button>
```

## 🔧 Configurações de Acessibilidade

### No Frontend
```typescript
interface UserSettings {
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  showText: boolean;
  showImages: boolean;
  autoSpeak: boolean;
}
```

### No Backend
```typescript
// Validação de configurações
if (settings.fontSize && !['small', 'medium', 'large', 'extra-large'].includes(settings.fontSize)) {
  throw createError('Tamanho de fonte inválido', 400);
}
```

## 📚 Recursos Adicionais

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## 🐛 Reportar Problemas

Se encontrar problemas de acessibilidade:
1. Documente o problema detalhadamente
2. Inclua screenshots se aplicável
3. Especifique o dispositivo/navegador
4. Mencione se usa tecnologias assistivas