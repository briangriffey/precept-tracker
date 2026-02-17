import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { spawn } from 'child_process';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: 'Precept Tracker',
    appBundleId: 'com.precepttracker.app',
    executableName: 'precept-tracker',
  },
  rebuildConfig: {},
  hooks: {
    packageAfterPrune: async (_config, buildPath) => {
      // Workaround: Electron Forge's Vite plugin doesn't copy externalized
      // native modules into the packaged output. Install them explicitly.
      return new Promise<void>((resolve, reject) => {
        const npmInstall = spawn('npm', ['install', '--no-save', 'better-sqlite3'], {
          cwd: buildPath,
          stdio: 'inherit',
          shell: true,
        });
        npmInstall.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`npm install of native modules failed with code ${code}`));
        });
        npmInstall.on('error', reject);
      });
    },
  },
  makers: [
    new MakerSquirrel({
      name: 'PreceptTracker',
      setupExe: 'PreceptTrackerSetup.exe',
    }),
    new MakerDMG({
      name: 'Precept Tracker',
      format: 'ULFO',
    }),
    new MakerZIP({}, ['darwin']),
    new MakerDeb({
      options: {
        name: 'precept-tracker',
        productName: 'Precept Tracker',
        genericName: 'Journal',
        description: 'Daily Zen journal for reflecting on the 16 Precepts of Soto Zen Buddhism',
        categories: ['Utility'],
      },
    }),
    new MakerRpm({
      options: {
        name: 'precept-tracker',
        productName: 'Precept Tracker',
        description: 'Daily Zen journal for reflecting on the 16 Precepts of Soto Zen Buddhism',
        categories: ['Utility'],
      },
    }),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      build: [
        {
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
