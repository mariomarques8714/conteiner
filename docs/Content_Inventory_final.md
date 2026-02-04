# Content Inventory — Brazil 2026 Jerseys Pre-Sale Landing Page

This document defines ALL text content required for the frontend.
Each placeholder represents a single piece of text that must be written by a copywriting AI.

This file is a CONTRACT.
Frontend must NOT invent, alter, or infer any text outside these placeholders.

---

## 1. Global Elements

| Location | Placeholder |
|----------|-------------|
| App / Page name | {{Pré-venda Brasil 2026}} |
| Browser title | {{Pré-venda Camisas Brasil 2026 | Lote Limitado}} |
| Meta description | {{Reserve grades da camisa Brasil 2026 antes do fechamento do lote. Quantidade limitada e prazo final definido.}} |
| Footer legal text | {{Pré-venda exclusiva por grade. Quantidades limitadas ao lote importado. Imagens ilustrativas.}} |
| Footer copyright | {{© 2026 Todos os direitos reservados.}} |

---

## 2. Countdown Timer — PRE-SALE DEADLINE (Top Bar)

| Location | Placeholder |
|----------|-------------|
| Timer label | {{Fechamento do lote em}} |
| Timer description | {{Após o prazo, não serão aceitos novos pedidos}} |
| Days unit label | {{dias}} |
| Hours unit label | {{horas}} |
| Minutes unit label | {{minutos}} |
| Seconds unit label | {{segundos}} |
| Expiration message (when timer reaches zero) | {{Lote encerrado. Novos pedidos indisponíveis}} |

---

## 3. Hero Section

| Location | Placeholder |
|----------|-------------|
| Main headline | {{Pré-venda Camisa Brasil Copa 2026}} |
| Subheadline | {{Garanta seu lote antes do fechamento da importação}} |
| Supporting text | {{Camisas versão Player, importadas, vendidas exclusivamente em grades. Reserva válida somente dentro do prazo.}} |
| Primary CTA button label | {{Reservar neste lote}} |
| Trust microcopy (near CTA) | {{Pedido confirmado apenas dentro do prazo do lote}} |

---

## 4. Offer Information Section

| Location | Placeholder |
|----------|-------------|
| Section title | {{Condições deste lote}} |
| Product description | {{Camisa oficial da Seleção Brasileira para a Copa do Mundo de 2026.}} |
| Product type | {{Versão Player tailandesa — importação direta}} |
| Grade explanation | {{Este lote é comercializado apenas em grades fechadas.}} |
| Grade unit label | {{Grade}} |
| Jerseys per grade | {{10 camisas por grade}} |
| Available sizes | {{Distribuição nos tamanhos P, M, G e GG}} |
| First payment label | {{Reserva do lote (agora)}} |
| First payment amount | {{R$ 380,00 por grade}} |
| Second payment label | {{Complemento antes da entrega}} |
| Second payment amount | {{R$ 400,00 por grade}} |
| Total per grade label | {{Valor total por grade}} |
| Delivery forecast label | {{Chegada estimada do lote}} |
| Delivery forecast value | {{Final de março / início de abril de 2026}} |
| Payment method label | {{Pagamento da reserva}} |
| Minimum order label | {{Quantidade mínima: 1 grade}} |

---

## 5. Purchase Modal

### Modal Header

| Location | Placeholder |
|----------|-------------|
| Modal title | {{Confirmar reserva do lote}} |
| Modal description | {{Os pedidos são aceitos somente enquanto o lote estiver aberto.}} |
| Modal close button aria-label | {{Fechar}} |

### Form Fields

| Field | Label Placeholder | Helper Text Placeholder |
|-------|-------------------|-------------------------|
| Full name | {{Nome completo}} | {{Utilizado para identificação do pedido}} |
| CPF | {{CPF}} | {{Validação de formato e dígitos}} |
| Email | {{E-mail}} | {{Para confirmação do pedido}} |
| Phone / WhatsApp | {{Telefone / WhatsApp}} | {{Contato para confirmação e logística}} |
| Grade quantity | {{Quantidade de grades}} | {{Venda mínima de 1 grade (10 camisas)}} |

### Dynamic Calculations Display

| Location | Placeholder |
|----------|-------------|
| Total jerseys label | {{Quantidade total de camisas}} |
| First payment label | {{Valor da reserva}} |
| Second payment label | {{Valor complementar (informativo)}} |

### Validation Errors

| Error Type | Placeholder |
|------------|-------------|
| Required field | {{Campo obrigatório}} |
| Invalid name | {{Nome inválido}} |
| Invalid CPF format | {{Formato de CPF incorreto}} |
| Invalid CPF checksum | {{CPF inválido}} |
| Invalid email | {{E-mail inválido}} |
| Invalid phone | {{Telefone inválido}} |
| Invalid grade quantity | {{Quantidade inválida}} |
| Minimum grade quantity | {{O pedido mínimo é 1 grade}} |
| General submission error | {{Não foi possível concluir a reserva}} |
| Network error | {{Falha de conexão. Tente novamente}} |

### Form Actions

| Location | Placeholder |
|----------|-------------|
| Submit button label (default) | {{Confirmar reserva}} |
| Submit button label (loading) | {{Confirmando...}} |
| Cancel button label | {{Cancelar}} |

---

## 6. Pix Payment Screen — PAYMENT EXPIRATION (30 MINUTES)

### Instructions

| Location | Placeholder |
|----------|-------------|
| Screen title | {{Pagamento da reserva via Pix}} |
| Main instruction text | {{Conclua o pagamento para validar sua reserva neste lote.}} |
| QR Code instruction | {{Use o app do seu banco para escanear o QR Code}} |
| Copy-paste Pix label | {{Código Pix}} |
| Copy button label | {{Copiar}} |
| Copied confirmation | {{Código copiado com sucesso}} |

### Countdown

| Location | Placeholder |
|----------|-------------|
| Payment countdown label | {{Prazo para pagamento}} |
| Payment countdown explanation | {{Após este tempo, a reserva é automaticamente cancelada}} |
| Minutes unit label | {{min}} |
| Seconds unit label | {{seg}} |

### Status Messages

| Location | Placeholder |
|----------|-------------|
| Payment pending status | {{Aguardando pagamento}} |
| Payment pending description | {{O pagamento ainda não foi identificado}} |
| Payment verifying status | {{Confirmando pagamento}} |

### Order Summary

| Location | Placeholder |
|----------|-------------|
| Order summary title | {{Resumo da reserva}} |
| Buyer name label | {{Comprador}} |
| Grade quantity label | {{Grades reservadas}} |
| Total jerseys label | {{Total de camisas}} |
| Amount label | {{Valor da reserva}} |

---

## 7. Success Page

| Location | Placeholder |
|----------|-------------|
| Success headline | {{Reserva confirmada neste lote}} |
| Success icon aria-label | {{Reserva confirmada}} |
| Confirmation message | {{Sua reserva foi registrada dentro do prazo do lote.}} |
| Order number label | {{Número do pedido}} |
| Order details title | {{Detalhes da reserva}} |
| Buyer name label | {{Nome do comprador}} |
| Grade quantity label | {{Grades reservadas}} |
| Total jerseys label | {{Total de camisas}} |
| Amount paid label | {{Valor pago na reserva}} |
| Remaining payment label | {{Pagamento complementar}} |
| Remaining payment explanation | {{O valor complementar será solicitado antes da distribuição do lote.}} |
| Delivery forecast label | {{Previsão de chegada}} |
| Delivery forecast value | {{Final de março / início de abril de 2026}} |
| Next steps title | {{Próximos passos}} |
| Next steps description | {{Nossa equipe entrará em contato para orientações finais e logística.}} |
| Support contact label | {{Suporte}} |
| Support contact value | {{WhatsApp (11) 99999-9999}} |
| Return to home button | {{Voltar}} |

---

## 8. Expired Page

| Location | Placeholder |
|----------|-------------|
| Expiration headline | {{Prazo encerrado}} |
| Expiration icon aria-label | {{Prazo finalizado}} |
| Explanation text | {{Este lote não aceita mais reservas.}} |
| What happened label | {{O que ocorreu}} |
| What happened description | {{O prazo de reserva do lote foi atingido.}} |
| What to do label | {{Próximo passo}} |
| What to do description | {{Entre em contato para verificar disponibilidade de próximos lotes.}} |
| Retry CTA button label | {{Verificar novos lotes}} |
| Support contact label | {{Suporte}} |
| Support contact value | {{WhatsApp (11) 99999-9999}} |

---

## 9. Common / Shared Elements

| Location | Placeholder |
|----------|-------------|
| Currency symbol | {{R$}} |
| Loading spinner aria-label | {{Carregando}} |
| Generic error title | {{Erro}} |
| Generic error message | {{Não foi possível concluir a ação.}} |
| Try again button | {{Tentar novamente}} |
| WhatsApp label | {{WhatsApp}} |

---
