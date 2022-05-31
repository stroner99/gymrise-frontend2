import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}
  
    setupSocketConnection() {
      // this.socket = io('http://localhost:3000');
      // const now = new Date();
      // const data = {
      //   dni_client: '11111111D',
      //   dni_trainer: '11111111B',
      //   text: 'prueba',
      //   date_time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()),
      // };
      // this.socket.emit('chat-server', data);
      // this.socket.on('chat-client', (data) => {
      //   return data;
      // });
    }

    disconnect() {
      if (this.socket) {
          this.socket.disconnect();
      }
  }
  }
  
  export default new SocketioService();