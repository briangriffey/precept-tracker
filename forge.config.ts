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
import { rebuild } from '@electron/rebuild';

function runShell(cmd: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { cwd, stdio: 'inherit', shell: true });
    proc.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}`)),
    );
    proc.on('error', reject);
  });
}

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: 'Precept Tracker',
    appBundleId: 'com.precepttracker.app',
    executableName: 'precept-tracker',
    icon: './assets/icon',
  },
  rebuildConfig: {},
  hooks: {
    packageAfterPrune: async (_config, buildPath) => {
      // Workaround: Electron Forge's Vite plugin doesn't copy externalized
      // native modules into the packaged output. Install and rebuild them
      // against Electron's Node headers.
      await runShell('npm', ['install', '--no-save', 'better-sqlite3'], buildPath);
      await rebuild({ buildPath, electronVersion: '40.4.1' });
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
