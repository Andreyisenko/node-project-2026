import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const boodstrap = async () => {
  await initMongoDB();
  startServer();
};

boodstrap();
console.log('221');
