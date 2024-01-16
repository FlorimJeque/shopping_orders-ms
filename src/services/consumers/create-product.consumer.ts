import QUEUES from '../../config/constants';
import RabbitMQ from '../rabbitmq';
import prisma from '../prisma';

const run = async () => {
  try {
    const queue = QUEUES.PRODUCT_CREATED;
    const conn = await new RabbitMQ().connection();

    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    console.log('Running: ' + queue + ' consumer');
    // Listener
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const { product } = JSON.parse(msg.content.toString());
        await prisma.product.create({
          data: {
            externalId: product.id,
            name: product.name,
            price: product.price,
          },
        });
        channel.ack(msg);
        console.log('Message received: ', product);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  } catch (error) {
    console.log(error);
  }
};
run();
