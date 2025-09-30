# Victor Oliveira - Portfolio

Um site de portfólio profissional para videomaker e mentor audiovisual, construído com Next.js e PostgreSQL.

## Funcionalidades

- 🎥 Portfolio de projetos audiovisuais
- 📝 Sistema de administração para gerenciar projetos e textos
- 📱 Design responsivo e moderno
- 🎨 Interface elegante com gradientes e animações
- 📊 Banco de dados PostgreSQL via Vercel
- ⚡ Deploy otimizado para Vercel

## Tecnologias

- **Framework:** Next.js 14
- **Banco de dados:** PostgreSQL (Vercel Postgres)
- **Estilização:** Tailwind CSS
- **Ícones:** Lucide React
- **Tipagem:** TypeScript
- **Validação:** Zod
- **Deploy:** Vercel

## Estrutura do Projeto

```
├── components/          # Componentes React
├── hooks/              # Custom hooks
├── lib/                # Utilitários e configurações
├── pages/              # Páginas Next.js
│   ├── api/           # API Routes
│   ├── admin.tsx      # Painel administrativo
│   └── index.tsx      # Página principal
├── shared/             # Tipos e esquemas compartilhados
└── styles/             # Estilos globais
```

## Configuração Local

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente do PostgreSQL (veja seção abaixo)
4. Execute o desenvolvimento: `npm run dev`
5. Acesse `http://localhost:3000`

## Deploy no Vercel

### Passo a Passo Completo:

1. **Preparar Repositório**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [seu-repositorio-git]
   git push -u origin main
   ```

2. **Conectar ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte seu repositório GitHub/GitLab
   - Importe o projeto

3. **Configurar Banco PostgreSQL**
   - No painel do Vercel, vá em "Storage" → "Create Database" → "Postgres"
   - Após criar, as variáveis de ambiente serão configuradas automaticamente

4. **Deploy**
   - O deploy será automático após conectar o repositório
   - Acesse `/api/init-db` uma vez para inicializar as tabelas

### Variáveis de Ambiente (configuradas automaticamente pelo Vercel Postgres):
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` 
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Administração

Acesse `/admin` para gerenciar:
- Projetos (adicionar, editar, excluir)
- Textos do site (títulos, descrições, contatos)

## Variáveis de Ambiente

```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```
