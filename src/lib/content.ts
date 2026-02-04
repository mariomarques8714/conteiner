/**
 * Content Inventory — Operação Copa Pre-Sale Landing Page
 * 
 * This file is the single source of truth for ALL frontend text.
 * This file is a CONTRACT.
 */

export const CONTENT = {
  // ============================================
  // 1. Global Elements
  // ============================================
  global: {
    appName: "Operação Copa",
    browserTitle: "Operação Copa | Pré-venda Camisas Brasil 2026",
    metaDescription: "Garanta sua grade de camisas da Seleção Brasileira Copa 2026 antes da chegada ao Brasil. Pré-venda limitada com pagamento via Pix.",
    footerLegalText: "Pré-venda exclusiva por grade. Quantidade limitada ao contêiner importado. Imagens ilustrativas.",
    footerCopyright: "© 2026 Operação Copa. Todos os direitos reservados.",
  },

  // ============================================
  // 2. Countdown Timer — PRE-SALE DEADLINE (Top Bar)
  // ============================================
  countdown: {
    label: "Fechamento do lote em",
    description: "Após o prazo, o contêiner é fechado e não aceita novos pedidos.",
    units: {
      days: "dias",
      hours: "horas",
      minutes: "minutos",
      seconds: "segundos",
    },
    expiredMessage: "Lote encerrado. O contêiner foi fechado.",
  },

  // ============================================
  // 3. Hero Section
  // ============================================
  hero: {
    headline: "Preço de contêiner aberto. Sem risco. Sem taxa. Sem dor de cabeça.",
    subheadline: "Estamos abrindo acesso antecipado a um contêiner fechado da Camisa do Brasil Copa 2026 — versão Player, titular amarela.",
    supportingText: "Você paga preço de importação agora, sem risco de Receita Federal, sem taxas surpresa e sem esperar meses para saber se a mercadoria passa.",
    ctaPrimary: "Garantir posição no contêiner",
    trustMicrocopy: "Reserva válida somente enquanto o contêiner estiver aberto.",
    videoCaption: "Modelo ilustrativo — versão Player Brasil Titular",
  },

  // ============================================
  // 4. Section — O que está sendo aberto aqui
  // ============================================
  opportunity: {
    sectionTitle: "O que é essa oportunidade",
    introText: "Este não é varejo. Não é drop. Não é compra unitária.",
    mainText: "Estamos abrindo, por tempo limitado, a possibilidade de você entrar em um contêiner já contratado, pagando o mesmo preço de quem importa em grande escala.",
    bullets: [
      "Produto já definido",
      "Quantidade fechada",
      "Importação centralizada",
      "Distribuição no Brasil",
    ],
    closingText: "Ou você entra agora no preço de origem, ou compra depois no preço inflado do mercado.",
  },

  // ============================================
  // 5. Section — Produto
  // ============================================
  product: {
    sectionTitle: "O produto mais fácil de vender da Copa",
    mainText: "Este contêiner virá exclusivamente com a Camisa do Brasil Titular — a amarelinha.",
    subText: "Exatamente o mesmo modelo que já apareceu em todos os vazamentos oficiais até aqui.",
    bullets: [
      "Versão Player",
      "Alta procura garantida",
      "Giro rápido",
      "Nenhuma aposta de modelo alternativo",
    ],
    closingText: "Na Copa, não existe dúvida. A amarelinha vende sozinha.",
  },

  // ============================================
  // 6. Section — Números
  // ============================================
  numbers: {
    sectionTitle: "A conta é simples",
    paymentLabel: "Você paga:",
    firstPayment: "R$ 400 por grade agora (10 camisas)",
    secondPayment: "R$ 400 por grade quando o contêiner chegar",
    totalCost: "Custo total: R$ 800 por grade (R$ 80 por camisa)",
    comparisonLabel: "Preço médio de venda da versão Player no varejo:",
    comparisonValue: "R$ 220 a R$ 250 por unidade",
    closingText: "Margem alta. Giro rápido. Sem risco operacional.",
    observation: "Os valores de venda variam conforme a estratégia do lojista.",
  },

  // ============================================
  // 7. Section — Por que isso existe
  // ============================================
  why: {
    sectionTitle: "Por que essa oportunidade existe",
    mainText: "Porque quem importa em volume paga menos. E quem compra depois paga mais.",
    subText: "Estamos apenas abrindo essa condição para quem entende o jogo e age no timing certo.",
    closingText: "Não haverá recompra nesse preço após o fechamento do lote.",
  },

  // ============================================
  // 8. Section — Como funciona
  // ============================================
  howItWorks: {
    sectionTitle: "Como funciona a reserva",
    steps: [
      "Você reserva sua quantidade em grades",
      "Paga R$ 400 por grade agora para travar posição",
      "O contêiner segue o fluxo normal de importação",
      "Próximo à distribuição, você paga o valor restante",
      "Retirada ou entrega no Brasil",
    ],
    closingText: "Sem surpresa. Sem improviso. Sem risco alfandegário para você.",
  },

  // ============================================
  // 9. Section — Prazo
  // ============================================
  deadline: {
    sectionTitle: "O prazo é real",
    mainText: "Esse acesso fica aberto apenas até o fechamento do contêiner. Depois disso, o lote segue viagem e não aceita novos pedidos.",
    subText: "O relógio no topo da página mostra exatamente quanto tempo ainda resta.",
  },

  // ============================================
  // 10. Final CTA
  // ============================================
  finalCta: {
    buttonText: "Entrar no contêiner agora",
    microcopy: "Quem deixa para depois, compra mais caro.",
  },

  // ============================================
  // 11. Purchase Modal
  // ============================================
  modal: {
    title: "Confirmar reserva do lote",
    description: "Os pedidos são aceitos somente enquanto o lote estiver aberto.",
    closeButtonAriaLabel: "Fechar",
    
    fields: {
      fullName: {
        label: "Nome completo",
        helper: "Utilizado para identificação do pedido",
      },
      cpf: {
        label: "CPF",
        helper: "Validação de formato e dígitos",
      },
      email: {
        label: "E-mail",
        helper: "Para confirmação do pedido",
      },
      phone: {
        label: "Telefone / WhatsApp",
        helper: "Contato para confirmação e logística",
      },
      gradeQuantity: {
        label: "Quantidade de grades",
        helper: "Venda mínima de 1 grade (10 camisas)",
      },
    },
    
    calculations: {
      totalJerseysLabel: "Quantidade total de camisas",
      firstPaymentLabel: "Valor da reserva",
      secondPaymentLabel: "Valor complementar (informativo)",
    },
    
    errors: {
      required: "Campo obrigatório",
      invalidName: "Nome inválido",
      invalidCpfFormat: "Formato de CPF incorreto",
      invalidCpfChecksum: "CPF inválido",
      invalidEmail: "E-mail inválido",
      invalidPhone: "Telefone inválido",
      invalidGradeQuantity: "Quantidade inválida",
      minimumGradeQuantity: "O pedido mínimo é 1 grade",
      generalSubmissionError: "Não foi possível concluir a reserva",
      networkError: "Falha de conexão. Tente novamente",
    },
    
    actions: {
      submitDefault: "Confirmar reserva",
      submitLoading: "Confirmando...",
      cancel: "Cancelar",
    },
  },

  // ============================================
  // 12. Pix Payment Screen
  // ============================================
  pix: {
    screenTitle: "Pagamento da reserva via Pix",
    mainInstruction: "Conclua o pagamento para validar sua reserva neste lote.",
    qrCodeInstruction: "Use o app do seu banco para escanear o QR Code",
    copyPasteLabel: "Código Pix",
    copyButtonLabel: "Copiar",
    copiedConfirmation: "Código copiado com sucesso",
    
    countdown: {
      label: "Prazo para pagamento",
      explanation: "Após este tempo, a reserva é automaticamente cancelada",
      minutesUnit: "min",
      secondsUnit: "seg",
      timingNote: "Pagamentos via Pix podem levar até alguns minutos para serem confirmados, mesmo após a conclusão no aplicativo do banco.",
    },
    
    status: {
      pending: "Aguardando pagamento",
      pendingDescription: "O pagamento ainda não foi identificado",
      verifying: "Confirmando pagamento",
    },
    
    orderSummary: {
      title: "Resumo da reserva",
      buyerNameLabel: "Comprador",
      gradeQuantityLabel: "Grades reservadas",
      totalJerseysLabel: "Total de camisas",
      amountLabel: "Valor da reserva",
    },
    
    // Info block below QR code
    waitForConfirmation: {
      title: "Após pagar o Pix, aguarde a confirmação",
      text: "Após o pagamento, a confirmação pode levar até alguns minutos. Não feche esta página imediatamente. Assim que o pagamento for identificado, você será redirecionado automaticamente.",
    },
    
    // Fallback block for users who closed the page
    closedPage: {
      title: "Pagou e a tela fechou?",
      text: "Não se preocupe. Seu pagamento não é perdido. Se você já concluiu o Pix e saiu da página, a confirmação será processada normalmente. Caso não veja a confirmação em alguns minutos, nossa equipe consegue localizar seu pedido pelo CPF.",
    },
    
    // What happens after payment
    afterPayment: {
      title: "O que acontece após o pagamento",
      bullets: [
        "Seu pagamento é identificado automaticamente",
        "Sua reserva é confirmada no lote",
        "Você será adicionado ao grupo oficial do contêiner",
        "Todas as atualizações serão enviadas por lá",
      ],
    },
    
    // WhatsApp group trust block
    whatsAppGroup: {
      title: "Grupo oficial do contêiner",
      mainText: "Após a confirmação do pagamento, você será adicionado ao grupo exclusivo deste contêiner.",
      bulletIntro: "Nesse grupo enviamos:",
      bullets: [
        "Atualizações da importação",
        "Avisos de prazos",
        "Informações sobre a segunda etapa do pagamento",
        "Status de chegada e distribuição",
      ],
      closingText: "Não é grupo de spam. É apenas informativo.",
    },
  },

  // ============================================
  // 13. Success Page
  // ============================================
  success: {
    headline: "Reserva confirmada neste lote",
    iconAriaLabel: "Reserva confirmada",
    confirmationMessage: "Sua reserva foi registrada dentro do prazo do lote.",
    orderNumberLabel: "Número do pedido",
    orderDetailsTitle: "Detalhes da reserva",
    buyerNameLabel: "Nome do comprador",
    gradeQuantityLabel: "Grades reservadas",
    totalJerseysLabel: "Total de camisas",
    amountPaidLabel: "Valor pago na reserva",
    remainingPaymentLabel: "Pagamento complementar",
    remainingPaymentExplanation: "O valor complementar será solicitado antes da distribuição do lote.",
    deliveryForecastLabel: "Previsão de chegada",
    deliveryForecastValue: "Meio de abril de 2026",
    
    // WhatsApp Group Card
    whatsAppGroup: {
      title: "Grupo exclusivo do contêiner",
      description: "Todas as atualizações deste lote serão feitas dentro do grupo oficial.",
      buttonText: "Entrar no grupo do WhatsApp",
      groupLink: "https://chat.whatsapp.com/JeDN91OrpKWIfGPv21TBe5",
    },
    
    // Second Payment Info Card
    secondPayment: {
      title: "Pagamento da segunda parte",
      mainText: "O aviso para pagamento da segunda parte será enviado com no mínimo 7 dias de antecedência.",
      channelsText: "A comunicação será feita pelo grupo do WhatsApp, mensagem direta e e-mail.",
    },
    
    returnHomeButton: "Voltar",
  },

  // ============================================
  // 14. Expired Page
  // ============================================
  expired: {
    headline: "Prazo encerrado",
    iconAriaLabel: "Prazo finalizado",
    explanationText: "Este lote não aceita mais reservas.",
    whatHappenedLabel: "O que ocorreu",
    whatHappenedDescription: "O prazo de reserva do lote foi atingido.",
    whatToDoLabel: "Próximo passo",
    whatToDoDescription: "Entre em contato para verificar disponibilidade de próximos lotes.",
    retryCta: "Verificar novos lotes",
    supportContactLabel: "Suporte",
    supportContactValue: "WhatsApp (11) 99999-9999",
  },

  // ============================================
  // 15. Common / Shared Elements
  // ============================================
  common: {
    currencySymbol: "R$",
    loadingSpinnerAriaLabel: "Carregando",
    genericErrorTitle: "Erro",
    genericErrorMessage: "Não foi possível concluir a ação.",
    tryAgainButton: "Tentar novamente",
    whatsAppLabel: "WhatsApp",
  },
} as const;

// Type exports for type-safe content access
export type Content = typeof CONTENT;
