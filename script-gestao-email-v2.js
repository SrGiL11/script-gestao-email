function manageEmails() {
    Logger.log("Iniciando o script...");
    const adminEmail = "seuemail@dominio.com"; //Insira o seu e-mail aqui
    const retentionPeriod = '7d'; //Período para ele ser excluído
    const labelsToProtect = ['Marcador1', 'Marcador2']; //Marcadores que deseja salvar
    const protectLabelQuery = labelsToProtect.map(label => `label:${label}`).join(' OR ');
    const batchSize = 100; //Cadeia de execução em blocos. Suporte máximo pelo GMAIL (NÃO ALTERAR)
    let emailSubject = "Status do Script - Gerenciar Emails";
    let emailBody = "";
  
    try {
      const allThreads = GmailApp.search(`older_than:${retentionPeriod} -(${protectLabelQuery})`);
      Logger.log(`Total de threads encontradas: ${allThreads.length}`);
  
      const threadsToProcess = allThreads.slice(0, Math.min(allThreads.length, 100)); // Threads (E-maisl) suportado pelo App Script, Limite Opicional - Alterar apenas o número 100
      for (let i = 0; i < threadsToProcess.length; i += batchSize) {
        const batch = threadsToProcess.slice(i, i + batchSize);
        GmailApp.moveThreadsToTrash(batch);
      }
  
      emailBody = `Olá! O script de gerenciamento de emails foi executado com sucesso. Total processado: ${threadsToProcess.length}.`;
    } catch (e) {
      emailSubject = "Erro no Script - Gerenciar Emails";
      emailBody = `Erro durante a execução do script: ${e.message}`;
    } finally {
      MailApp.sendEmail(adminEmail, emailSubject, emailBody);
      Logger.log("Notificação enviada.");
    }
  }
  