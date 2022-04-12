import EventEnum from "@/Controller/EventEnums";
import EventBus from "@/Controller/EventBus";

class Connection {

  connection: WebSocket

  ip: string = "localhost"
  port: string = "5555"

  constructor() {
    console.log('establish connection', this.ip, this.port)
    // this.connection = new WebSocket('ws://' + this.ip+ ':' + this.port + '/token=a1');
    this.connection = new WebSocket('ws://' + this.ip+ ':' + this.port);

    this.connection.onopen = function (e) {
      console.log("Connection established!");
    };

    // callback messages
    this.connection.onmessage = function (e) {
      EventBus.emit('DATA_UPDATED', {})
    };

    // Closed window
    this.connection.onclose = function (e) {
      console.log("Connection closed!");
    };

    // Error window
    this.connection.onerror = function (e) {
      console.log("Connection error!");
    };

  }

  sendMessage(json) {
    const data = JSON.stringify(json);
    this.connection.send(data);
  }
}

export default Connection
