import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run @new-portfolio/web:serve',
        production: 'npx nx run @new-portfolio/web:serve-static',
      },
      ciWebServerCommand: 'npx nx run @new-portfolio/web:serve-static',
      ciBaseUrl: 'http://localhost:4500',
    }),
    baseUrl: 'http://localhost:4500',
  },
});
