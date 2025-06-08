import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'city-corner',
  webDir: 'dist/city-corner',
  bundledWebRuntime: false,
    plugins: {
    BluetoothPrinter: {
      android: {
        requestBluetoothPermission: true,
      },
    },
  }
};

export default config;
