# Gerenciador de Emails no Gmail usando App Script

🚀 Este repositório contém um script em Apps Script para automatizar o gerenciamento de emails na sua conta do Gmail. O script move para a lixeira todos os emails mais antigos que um determinado período de tempo, exceto aqueles que contêm marcadores específicos que você deseja proteger. 🌐

## Funcionalidades

🕹️ 1. **Identifica emails antigos:** Filtra emails mais antigos que um período definido (ex.: 7 dias). <br/>
🕹️ 2. **Proteção por marcadores:** Exclui apenas emails que não possuem os marcadores configurados na lista de proteção.<br/>
🕹️ 3. **Processamento em lotes:** Garante que o processamento seja eficiente e respeite os limites da API.<br/>
🕹️ 4. **Notificação por email:** Envia um email com o status do script após a execução, seja ela concluída com sucesso ou com erros. 📧

---

## Como o Código Funciona

🔧 1. **Configurações**:
   - **Período de retenção:** Defina a variável `retentionPeriod` para especificar o período de tempo para excluir emails (ex.: `7d` para 7 dias).
   - **Marcadores protegidos:** Configure a lista `labelsToProtect` com os nomes dos marcadores que você deseja proteger. ✨

🔧 2. **Busca e Filtragem**:
   - Usa `GmailApp.search` para encontrar emails mais antigos que o período configurado.
   - Filtra emails que possuem os marcadores da lista protegida e exclui os demais. 🔎

🔧 3. **Processamento em Lotes**:
   - Divide as threads em lotes de 100 para evitar atingir limites de execução do Apps Script. 📊

🔧 4. **Notificações**:
   - Envia um email ao administrador com um resumo da execução.
   - Informa detalhes sobre threads processadas e erros encontrados, caso ocorram. 📧

---

## Personalização do Código

### Ajustar o Período de Retenção
🔁 Altere a variável `retentionPeriod` para o intervalo desejado. Exemplos:
  - `7d`: 7 dias
  - `30d`: 30 dias
  - `1y`: 1 ano

### Configurar Marcadores Protegidos
🔍 Atualize a lista `labelsToProtect` com os nomes exatos dos marcadores do Gmail que você deseja proteger.
  ```javascript
  const labelsToProtect = [
    'Marcador1', 'Marcador2'
  ];
  ```

### Email de Notificação
📧 Configure o email do administrador na variável `adminEmail`:
  ```javascript
  const adminEmail = "seu_email@exemplo.com";
  ```

---

## Como Automatizar no Apps Script

🌐 1. **Criar o Script no Apps Script**:
   - Acesse [Google Apps Script](https://script.google.com).
   - Crie um novo projeto.
   - Cole o código no editor.

🌐 2. **Autorizar Permissões**:
   - Clique em **Executar > manageEmails** para rodar o script pela primeira vez.
   - Autorize o script a acessar sua conta do Gmail.

🌐 3. **Automatizar com Trigger**:
   - Clique em **Relógio (Triggers)** no menu lateral esquerdo.
   - Configure um novo trigger:
     - Escolha a função `manageEmails`.
     - Selecione o gatilho **Time-driven**.
     - Configure a frequência (ex.: diariamente). 🕒

---

## Exemplo de Resultado

- **Execução bem-sucedida:**
  ```plaintext
  Assunto: Script de Gerenciamento de Emails - Concluído com Sucesso

  Olá,

  O script de gerenciamento de emails foi executado com sucesso. Aqui estão os detalhes da operação:

  - Período analisado: E-mails mais antigos que 7 dias.
  - Total de threads encontradas: 500.
  - Total de threads movidas para a lixeira: 300.
  - Total de threads protegidas: 200.

  Caso tenha dúvidas ou precise ajustar os parâmetros do script, estou à disposição.

  Atenciosamente,  
  [Seu Nome/Automatização]
  ```

- **Execução com Erro:**
  ```plaintext
  Assunto: Erro no Script de Gerenciamento de Emails

  Olá,

  Ocorreu um erro durante a execução do script de gerenciamento de emails. Seguem os detalhes do problema:

  - Erro: Cannot move threads to trash.
  - Descrição técnica:
    Error at Line 35: Stack trace not available.

  Por favor, verifique o código ou os parâmetros do script para corrigir o problema. Caso precise de suporte, estou à disposição.

  Atenciosamente,  
  [Seu Nome/Automatização]
  ```

---

## Limitações

🚫 1. **Limite de Tempo**: Scripts no Apps Script possuem limite de execução de 6 minutos por execução.<br/>
🚫 2. **Chamadas à API**: Evite exceder o limite de chamadas à API do Gmail.<br/>
🚫 3. **Marcadores**: Certifique-se de que os nomes dos marcadores sejam exatos e estejam configurados no Gmail.

---

## Contribuições
🌟 Sugestões e melhorias são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request. 🌟

---

## Licença
📚 Este projeto está licenciado sob a [MIT License](LICENSE). 📚

