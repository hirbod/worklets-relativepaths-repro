# Worklets `relativePaths` repro

Blank Expo SDK 58 app with Worklets Bundle Mode. One line in `babel.config.js` breaks it:

```js
importForwarding: { relativePaths: ['src'] },
```

`'src'` is meant for the app's own `src/` folder, but it also matches `node_modules/react-native-reanimated/src/...`. Reanimated's own worklets then get their relative imports forwarded, Reanimated modules load on the UI runtime, and they reach for Turbo Modules there.

## Run

```sh
npm install
npx expo run:ios
```

The first bundle may fail with "Failed to get the SHA-1 for …" (the known Bundle Mode Metro issue); reload once.

## What happens

On launch: `Uncaught Error: [Worklets] Accessing __fbBatchedBridgeConfig is not allowed on Worklet Runtimes. Perhaps you tried to access a Turbo Module?`, from `react-native-reanimated/src/common/constants/platform.ts` → `Platform` → `NativePlatformConstantsIOS` → `TurboModuleRegistry.getEnforcing`.

Remove the `importForwarding` line (and clear the Metro cache) and it works.

## Versions

Expo SDK 58, React Native 0.88.0, Reanimated 4.7.1, Worklets 0.13.0, iOS 27 simulator.
