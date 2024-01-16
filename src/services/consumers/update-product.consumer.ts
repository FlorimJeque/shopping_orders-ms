import QUEUES from '../../config/constants';
import RabbitMQ from '../rabbitmq';
import prisma from '../prisma';

const run = async () => {
  try {
    const queue = QUEUES.PRODUCT_UPDATED;
    const conn = await new RabbitMQ().connection();

    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    console.log('Running: ' + queue + ' consumer');
    // Listener
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const { product } = JSON.parse(msg.content.toString());
        const updatedProduct = await prisma.product.update({
          where: { externalId: product.id },
          data: {
            name: product.name,
            price: product.price,
          },
        });
        await prisma.cartItem.updateMany({
          data: {
            originalPrice: product.price,
          },
          where: {
            cart: { isActive: true },
            productId: updatedProduct.id,
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
