import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import {} from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing, fontSize } from '../../utils/sizes';

export const FocusHistory = ({ focusHistory, onClear }) => {
  function clearHistory() {
    onClear();
  }

  function HistoryItem({ item, index }) {
    return <Text>{JSON.stringify(item)}</Text>;
  }
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {focusHistory && focusHistory.length > 1 && (
          <>
            <Text style={styles.title}>Things we've focused on:</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={({ item, index }) =>
                item && (
                  <Text style={historyItem(item.status)}>{item.subject}</Text>
                )
              }
              keyExtractor={(item) => item}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const historyItem = (status) => ({
  color: status > 0 ? '#76ee00' : '#ff0000',
  fontSize: fontSize.lg,  
});

const styles = StyleSheet.create({
  clearContainer: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  title: {
    fontSize: fontSize.lg,
    color: 'white',
  },
});
