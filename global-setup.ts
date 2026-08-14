import { checkApplicationHealth } from './utils/applicationHealth';

async function globalSetup() {
  await checkApplicationHealth();
}

export default globalSetup;