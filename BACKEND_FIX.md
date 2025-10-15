# 🔧 Correção do ChatController

## Problema: "No static resource api/messages/upload"

### ✅ Solução:

Substitua seu `ChatController.java` por esta versão corrigida:

```java
package com.example.weuniteauth.controller;

import com.example.weuniteauth.dto.chat.MessageDTO;
import com.example.weuniteauth.dto.chat.SendMessageRequestDTO;
import com.example.weuniteauth.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")  // ← ADICIONE ISTO (seu frontend usa /api)
public class ChatController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload @Valid SendMessageRequestDTO request) {
        MessageDTO messageDTO = messageService.sendMessage(request);

        messagingTemplate.convertAndSend(
                "/topic/conversation/" + request.conversationId(),
                messageDTO
        );
    }

    @MessageMapping("/chat.markAsRead")
    public void markAsRead(@Payload Long conversationId, @Payload Long userId) {
        messageService.markMessagesAsRead(conversationId, userId);

        messagingTemplate.convertAndSend(
                "/topic/conversation/" + conversationId + "/read",
                userId
        );
    }

    @PostMapping("/messages/upload")  // ← Agora será /api/messages/upload
    @ResponseBody
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("conversationId") Long conversationId,
            @RequestParam("senderId") Long senderId
    ) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Arquivo vazio"));
            }

            if (file.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.badRequest().body(Map.of("error", "Arquivo muito grande"));
            }

            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = UUID.randomUUID().toString() + extension;

            Path uploadPath = Paths.get("uploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath);

            String fileUrl = "/uploads/" + filename;
            String fileType = file.getContentType().startsWith("image/") ? "IMAGE" : "FILE";

            return ResponseEntity.ok(Map.of(
                    "fileUrl", fileUrl,
                    "fileType", fileType
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
```

### 🔑 Mudanças Principais:

1. **Adicionado `@RequestMapping("/api")`** → Para mapear `/api/messages/upload`
2. **Mantido `@Controller`** → Necessário para `@MessageMapping` funcionar
3. **Adicionado `@ResponseBody`** no método → Para retornar JSON
4. **Adicionado `e.printStackTrace()`** → Para debug

---

## 🧪 Teste:

Depois de atualizar:

1. **Reinicie o backend**
2. **Teste no Postman ou navegador:**

   ```
   POST http://localhost:8080/api/messages/upload
   ```

3. **Veja os logs do Spring Boot** - deve aparecer o endpoint registrado:
   ```
   Mapped POST /api/messages/upload
   ```

---

## 🔍 Se ainda não funcionar:

### Verifique se o `axios.ts` está usando `/api`:

```typescript
// src/api/axios.ts
export const instance = axios.create({
  baseURL: "http://localhost:8080/api", // ← Deve ter /api
  // ...
});
```

### Verifique o CORS:

Se aparecer erro de CORS, adicione isto no backend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:3001")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

## ✅ Checklist Final:

- [ ] `@RequestMapping("/api")` adicionado na classe
- [ ] `@ResponseBody` adicionado no método
- [ ] Backend reiniciado
- [ ] Log mostra "Mapped POST /api/messages/upload"
- [ ] Frontend usa `baseURL: "http://localhost:8080/api"`
