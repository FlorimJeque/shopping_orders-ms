import QUEUES from '../../config/constants';
import RabbitMQ from '../rabbitmq';
import prisma from '../prisma';

const run = async () => {
  try {
    const queue = QUEUES.CUSTOMER_UPDATED;
    const conn = await new RabbitMQ().connection();

    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    console.log('Running: ' + queue + ' consumer');
    // Listener
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const { customer } = JSON.parse(msg.content.toString());
        await prisma.customer.update({
          where: {
            externalId: customer.id,
          },
          data: { name: customer.name },
        });
        channel.ack(msg);
        console.log('Message received: ', customer);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  } catch (error) {
    console.log(error);
  }
};
run();
