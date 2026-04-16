import {createApp} from './app.js';
import {env} from './config/env.js';
import {prisma} from './lib/prisma.js';


const app = createApp();

const server = app.listen(env.apiPort, () => {
    console.log(`API listenning on http://localhost:${env.apiPort}`);
});

async function shutdown(signal) {
    console.log(`Received ${signal}. Shutting down gracedfully...`);

    server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });
}


process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));