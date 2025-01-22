# Servidor de Sinalização com Express e Socket.IO

Este repositório contém a implementação de um servidor de sinalização WebRTC desenvolvido em Node.js utilizando as bibliotecas Express e Socket.IO. Este servidor é responsável por gerenciar a comunicação inicial entre clientes para facilitar a transmissão de vídeo ou áudio em tempo real.

## Recursos
- Conexões WebSocket usando Socket.IO.
- Suporte a troca de mensagens de sinalização: ofertas, respostas e candidatos ICE.
- Suporte para multiplos clientes e câmeras.
- Cross-Origin Resource Sharing (CORS) configurado para permitir conexões de qualquer origem.

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/AdrianoSenaS/ServidorSimplesSinalizacaoNodejs.git
   ServidorSimplesSinalizacaoNodejs
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   node index.js
   ```

4. O servidor estará disponível em `http://localhost:3000`.

## Como Funciona

### Estrutura do Código
- **`connection`**: Gerencia a conexão de novos clientes.
- **`request-camera`**: Um cliente solicita acesso a uma câmera.
- **`offer`**: Um transmissor envia uma oferta para um receptor.
- **`answer`**: Um receptor responde à oferta do transmissor.
- **`ice-candidate`**: Reencaminha candidatos ICE entre transmissor e receptor.
- **`disconnect`**: Remove clientes desconectados e notifica outros clientes.

### Fluxo de Trabalho
1. Um receptor solicita acesso a uma câmera enviando um evento `request-camera`.
2. O transmissor é notificado do novo cliente e inicia a transmissão.
3. Transmissor e receptor trocam ofertas e respostas usando os eventos `offer` e `answer`.
4. Candidatos ICE são trocados para estabelecer a comunicação peer-to-peer.
5. Quando um cliente se desconecta, os demais clientes são notificados.

## Configuração Personalizada
### Porta do Servidor
Para alterar a porta do servidor, modifique a constante `port` no arquivo `index.js`:
```javascript
const port = 3000;
```

### Configurações de CORS
A configuração de CORS pode ser ajustada na inicialização do `Socket.IO`:
```javascript
const io = new Server(server, {
    cors: {
        origin: "*", // Altere conforme necessário.
        methods: ["GET", "POST"],
    },
});
```

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou reportar problemas.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

