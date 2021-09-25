import React, { Fragment } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, paddingSizes } from '../../utils/Sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  if (item.status > 1) {
    return (
      <Text style={{ color: 'red', fontSize: fontSizes.md }}>
        {item.subject}
      </Text>
    );
  } else {
    return (
      <Text style={{ color: 'green', fontSize: fontSizes.md }}>
        {item.subject}
      </Text>
    );
  }
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <Fragment style={{flex: 1}} >
            <Text style={styles.title}> Things we've focused on </Text>
            <FlatList
              contentContainerStyle={{alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </Fragment>
        )}
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: paddingSizes.xl,
  },
});
