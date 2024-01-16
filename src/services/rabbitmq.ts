import amqplib from 'amqplib';

export default class RabbitMQ {
  async connection() {
    return await amqplib.connect('amqp://localhost');
  }

  async publish(queue: any, data: any) {
    try {
      const connection = await this.connection();
      const channel = await connection.createChannel();
      channel.sendToQueue(queue, Buffer.from(data));
      channel.close();
      connection.close;
    } catch (error) {
      console.log(error);
    }
  }
}
