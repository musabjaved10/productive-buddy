import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { fontSize, spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  function onProgress(progress) {
    setProgress(progress);
  }
  function changeTime(mins) {
    setMinutes(mins);
    setProgress(1);
    setIsStarted(false);
  }

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 2000);
    } else {
      Vibration.vibrate(2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown
          isPaused={!isStarted}
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>
      <ProgressBar progress={progress} style={{ height: 6 }} />
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}        
      </View>
      <View style={styles.clearSubject}>
          <RoundedButton title="X" size={50} onPress={() => clearSubject()} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize.lg,
  },
  task: {
    color: 'white',
    textAlign: 'center',
    fontSize: fontSize.md,
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject:{
    paddingBottom:25,
    paddingLeft:25
  }
});
