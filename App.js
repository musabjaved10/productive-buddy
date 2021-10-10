import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';

import { Timer } from './src/features/timer/Timer';
import { spacing } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  console.log(focusHistory)

  useEffect(() => {
    focusHistory && setFocusHistory([...focusHistory, focusSubject]);
  }, [focusSubject]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  function onClear() {
    setFocusHistory([]);
  }

  async function saveFocusHistory() {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  }
  async function loadFocusHistory() {
    try {
      const history = await AsyncStorage.getItem(
        'focusHistory',
        JSON.parse(focusHistory)
      );
      if (history && history.length) {
        setFocusHistory(history);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistoryWithStatus(focusSubject, 1);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithStatus(focusSubject, 0);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E9F85',
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
