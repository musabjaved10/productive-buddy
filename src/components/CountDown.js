import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { fontSize, spacing } from '../utils/sizes';

const minutesToMillis = (mins) => mins * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 0.2, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const interval = React.useRef(null);

  const countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      } else {
        const timeleft = time - 1000;
        onProgress(timeleft / minutesToMillis(minutes));
        return timeleft;
      }
    });
  };

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  const minsRem = Math.floor(millis / 1000 / 60) % 60;
  const secondsRem = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minsRem)} : {formatTime(secondsRem)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxl,
    color: 'white',
    padding: spacing.lg,
    backgroundColor: 'rgba(92,132,226,0.3)',
  },
});
