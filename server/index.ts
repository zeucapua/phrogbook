export default {
  onConnect(websocket, room) {
    console.log(room);
  },
  onMessage(message, websocket, room) {
    const { src } = JSON.parse(message as string);
    room.broadcast(
      JSON.stringify({
        src,
        room: {
          id: room.id,
          connections: room.connections.size
        }
      })
    );
  }
}
