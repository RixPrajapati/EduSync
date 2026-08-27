import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const { default: app } = await import('./app.js');
const { default: config } = await import('./config/config.js');
const { logger } = await import('./utils/logger.js');

app.listen(config.port, () => {
  console.log(`Server started at ${config.port}`);
  logger.info(`Server started at ${config.port}`);
});