Projeto de site para remoção de escolas da prefeitura de são paulo

inserir endereço
selecionar modo de transporte
filtros
proximo ao metro
tempo andando 
proximo de comercio
avaliação
por tempo
menos transporte
indice de violencia

listar escolas por localidade
exibir perfilda escola

## Configuração do Backend

1. Instale as dependências:
   ```
   npm install express mysql cors axios
   ```

2. Configure o banco de dados MySQL com as seguintes credenciais:
   - Host: localhost
   - Usuário: root
   - Senha: 123456
   - Banco de dados: escolas

3. Crie a tabela `schools` no banco de dados com as colunas `name`, `address`, `lat`, `lon`.

4. Inicie o servidor backend:
   ```
   node backend/server.js
   ```

5. Acesse o site e insira o endereço para buscar as escolas mais próximas.