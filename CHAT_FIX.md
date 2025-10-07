# 🐛 Correção: User ID não aparecendo

## Problema Identificado

O chat estava exibindo "User 1", "User 5" ao invés dos nomes reais e fotos dos usuários.

### Erro no Console

```
GET http://localhost:3000/api/user/5 500 (Internal Server Error)
❌ getUserById falhou: No static resource api/user/5.
```

## Causa Raiz

**URL incorreta no frontend!**

- ❌ **Errado (Frontend)**: `/api/user/{id}`
- ✅ **Correto (Backend)**: `/api/user/id/{id}`

### Backend (UserController.java)

```java
@GetMapping("/id/{id}")
public ResponseEntity<ResponseDTO<UserDTO>> getUserById(@PathVariable Long id) {
    ResponseDTO<UserDTO> userDTO = userService.getUser(id);
    return ResponseEntity.ok(userDTO);
}
```

## Solução Aplicada

### Arquivo: `userService.ts`

**ANTES:**

```typescript
export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get(`/user/${userId}`); // ❌ ERRADO
    // ...
  }
}
```

**DEPOIS:**

```typescript
export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get(`/user/id/${userId}`); // ✅ CORRETO
    // ...
  }
}
```

## Resultado

Agora o chat:

- ✅ Exibe nomes reais dos usuários
- ✅ Mostra fotos de perfil (quando disponíveis)
- ✅ Exibe iniciais coloridas (quando não há foto)
- ✅ Carrega informações corretamente do backend

## Teste

1. Abra o chat
2. Inicie uma nova conversa
3. Verifique se o nome e foto do usuário aparecem corretamente
4. O console não deve mais mostrar erro 500

---

**Data da correção:** 7 de outubro de 2025  
**Impacto:** Alto - Funcionalidade principal do chat  
**Status:** ✅ Resolvido
