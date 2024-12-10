
const peers = new Set();
export default defineWebSocketHandler({
    open(peer) {
        peers.add(peer);
        peer.send("hallo");
        broadcast(`${peer} has joined the chat.`);
    },
    message(peer, message) {
        console.log(message.text())
        broadcast(message.text())
    },
    close(peer) {
        peers.delete(peer);
        broadcast(`${peer} has left the chat.`);    },
});

function broadcast(message) {
    for (const peer of peers) {
      try {
        peer.send(message);
      } catch (err) {
        console.error(`Failed to send message to peer: ${err.message}`);
      }
    }
  }