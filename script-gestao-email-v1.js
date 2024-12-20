// Script de Gerenciamento de Emails no Gmail
function manageEmails() {
    Logger.log("Iniciando o script...");
    try {
      // Configurações iniciais
      const retentionPeriod = '7d'; // Período para excluir e-mails mais antigos
      const labelsToProtect = ['Marcador1', 'Marcador2']; // Marcadores protegidos
      const adminEmail = "seu_email@exemplo.com"; // Email para notificações
  
      // Busca todas as threads mais antigas que o período especificado
      const allThreads = GmailApp.search('older_than:' + retentionPeriod);
      Logger.log(`Total de threads encontradas: ${allThreads.length}`);
  
      // Processamento em lotes de 100 threads
      let threadsProcessed = 0;
      let threadsDeleted = 0;
      let threadsProtected = 0;
  
      while (threadsProcessed < allThreads.length) {
        const batch = allThreads.slice(threadsProcessed, threadsProcessed + 100);
  
        // Filtrar threads para proteger marcadores
        const threadsToDelete = batch.filter(thread => {
          const labels = thread.getLabels().map(label => label.getName());
          const isProtected = labels.some(label => labelsToProtect.includes(label));
          if (isProtected) {
            threadsProtected++;
          }
          return !isProtected;
        });
  
        // Mover threads para a lixeira
        threadsToDelete.forEach(thread => thread.moveToTrash());
        threadsDeleted += threadsToDelete.length;
        threadsProcessed += batch.length;
        Logger.log(`Processados: ${threadsProcessed}, Movidos para a lixeira: ${threadsDeleted}, Protegidos: ${threadsProtected}`);
      }
  
      // Notificação por email ao final da execução
      const successMessage = `Olá, <br/> O script de gerenciamento de emails foi executado com sucesso.\n\n- Período analisado: Emails mais antigos que ${retentionPeriod}.\n- Total de threads encontradas: ${allThreads.length}.\n- Total de threads movidas para a lixeira: ${threadsDeleted}.\n- Total de threads protegidas: ${threadsProtected}.\n\nAtenciosamente,\n[Automatização]`;
      MailApp.sendEmail(adminEmail, "Script de Gerenciamento de Emails - Concluído com Sucesso", successMessage);
    } catch (e) {
      // Notificação por email em caso de erro
      const errorMessage = `Olá, <br/> Ocorreu um erro durante a execução do script de gerenciamento de emails.\n\nErro: ${e.message}\nDescrição técnica: ${e.stack}\n\nPor favor, verifique o código ou os parâmetros do script para corrigir o problema.\n\nAtenciosamente,\n[Automatização]`;
      MailApp.sendEmail(adminEmail, "Erro no Script de Gerenciamento de Emails", errorMessage);
      Logger.log(`Erro: ${e.message}`);
    }
    Logger.log("Script concluído.");
  }