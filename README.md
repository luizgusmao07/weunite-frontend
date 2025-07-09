# WeUnite - Frontend

## Sobre o Projeto
WeUnite é uma rede social que conecta pessoas e oportunidades. Este é o frontend da aplicação, desenvolvido em React com TypeScript e Vite.

## Tecnologias Utilizadas
- **React 18+**
- **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** (Estilização)
- **Shadcn/UI** (Componentes UI)
- **React Hook Form** (Formulários)
- **Zod** (Validação de schemas)
- **Tanstack Query** (Gerenciamento de estado de servidor)
- **Zustand** (Gerenciamento de estado global)
- **Axios** (Cliente HTTP)
- **React Router DOM** (Roteamento)

## Funcionalidades
- ✅ Autenticação de usuários (Login/Registro)
- ✅ Verificação de email
- ✅ Reset de senha
- ✅ Feed de posts
- ✅ Criação de posts com texto e imagens
- ✅ Sistema de likes e comentários
- ✅ Sidebar com navegação
- ✅ Busca de usuários
- ✅ Perfil de usuário
- ✅ Design responsivo

## Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Backend WeUnite rodando na porta 8080

### Passos para execução

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd weunite-frontend
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
O projeto está configurado para usar proxy para o backend:
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:3000`

4. **Execute a aplicação**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
- Frontend: `http://localhost:3000`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto
```
src/
├── @types/              # Tipos TypeScript
├── api/                 # Configuração do Axios e services
├── assets/              # Imagens e recursos estáticos
├── components/          # Componentes React
│   ├── auth/           # Componentes de autenticação
│   ├── home/           # Componentes da home
│   ├── shared/         # Componentes compartilhados
│   └── ui/             # Componentes UI base (Shadcn)
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e helpers
├── pages/              # Páginas da aplicação
├── routes/             # Configuração de rotas
├── schemas/            # Schemas de validação (Zod)
├── stores/             # Stores do Zustand
└── validators/         # Validadores customizados
```

## Componentes Principais

### Autenticação
- `Login.tsx` - Tela de login
- `SignUp.tsx` - Cadastro de usuário
- `SignUpCompany.tsx` - Cadastro de empresa
- `VerifyEmail.tsx` - Verificação de email
- `ResetPassword.tsx` - Reset de senha

### Home/Feed
- `FeedHome.tsx` - Feed principal
- `CreatePost.tsx` - Criação de posts
- `Post.tsx` - Componente de post
- `LeftSidebar.tsx` - Sidebar de navegação

### UI Components
Utiliza componentes do Shadcn/UI customizados:
- `Button`, `Input`, `Card`, `Dialog`
- `Form`, `Avatar`, `Badge`, `Skeleton`
- `Sidebar`, `Tabs`, `Tooltip`

## Gerenciamento de Estado

### Zustand Stores
- `useAuthStore` - Estado de autenticação do usuário

### Tanstack Query
- `usePosts` - Gerenciamento de posts
- `useCreatePost` - Criação de posts
- Cache automático e sincronização com servidor

## Roteamento

### Rotas Públicas
- `/` - Login
- `/signup` - Cadastro
- `/verify-email` - Verificação de email
- `/reset-password` - Reset de senha

### Rotas Privadas (Autenticadas)
- `/home` - Feed principal
- `/profile` - Perfil do usuário

## Estilização

### Tailwind CSS
- Utility-first CSS framework
- Design system consistente
- Responsividade built-in

### Tema
- Dark/Light mode support
- Cores personalizadas
- Componentes com variantes

## Validação

### Zod Schemas
- `createPostSchema` - Validação de criação de posts
- `authSchemas` - Validação de formulários de auth
- Validação client-side com React Hook Form

## Configuração do Vite

### Proxy
```typescript
server: {
  port: 3000,
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## Build e Deploy

### Build de Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## Contribuição
1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato
- Email: [seu-email@exemplo.com]
- GitHub: [seu-usuario]
