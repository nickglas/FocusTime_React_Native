import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';

import { Timer } from './src/features/timer/Timer';
import { paddingSizes } from './src/utils/Sizes';
import { Countdown } from './src/components/Countdown.js';
import { colors } from './src/utils/Colors';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setfocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistoryWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory()
  },[])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusObject={focusSubject}
          onTimerEnd={() => {
            addFocusHistoryWithState(focusSubject, STATUSES.COMPLETE),
              setfocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithState(focusSubject, STATUSES.CANCELLED);
            setfocusSubject(null);
          }}
        />
      ) : (
        <Fragment>
          <Focus addSubject={setfocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
