import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function App() {
  const [shown, setShown] = useState(false);
  const offset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated + Worklets Bundle Mode</Text>

      <Button title="Mount a view with entering={FadeIn}" onPress={() => setShown((s) => !s)} />
      {shown && <Animated.View entering={FadeIn} style={styles.box} />}

      <Button
        title="Animate a useAnimatedStyle"
        onPress={() => {
          offset.value = withTiming(offset.value === 0 ? 120 : 0);
        }}
      />
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { fontSize: 18, fontWeight: '600' },
  box: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#6c5ce7' },
});
