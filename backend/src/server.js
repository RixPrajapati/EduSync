import app from './app.js';
import config from './config/config.js';
import { logger } from './utils/logger.js';

app.listen(config.port, () => {
  console.log(`Server started at ${config.port}`);
  logger.info(`Server started at ${config.port}`);
});
