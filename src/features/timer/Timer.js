import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { Countdown } from '../../components/Countdown';
import { colors } from '../../utils/Colors';
import { paddingSizes } from '../../utils/Sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper'
import {Timing} from './Timing'
import {useKeepAwake} from 'expo-keep-awake'

const DEFAULT_TIME = 0.1
export const Timer = ({ focusObject, onTimerEnd, clearSubject }) => {
  useKeepAwake()
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME)
  const [progress, setProgress] = useState(1)

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const changeTime = (min) => {
    setMinutes(min)
    setProgress(1)
    setIsStarted(false)
  }

  const onEnd = () => {
    vibrate()
    setMinutes(DEFAULT_TIME)
    setProgress(1)
    setIsStarted(false)
    onTimerEnd()
  }


  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=> Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval),1000)
    }else{
      Vibration.vibrate(2000)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>

      <View style={styles.taskContainer}>
        <Text style={styles.title}>focussing on:</Text>
        <Text style={styles.task}>{focusObject}</Text>
      </View>

      <View style={styles.ProgressBar}>
            <ProgressBar color='#5e84e2' style={{height:10}} progress={progress}/>
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime}/>
      </View>

      <View style={styles.buttonWrapper} >

        {isStarted ? (
        <RoundedButton
          title="Pause"
          onPress={() => {
            setIsStarted(false);
          }}
        />
      ) : (
        <RoundedButton
          title="Start"
          onPress={() => {
            setIsStarted(true);
          }}
        />
      )}
      </View>
      <RoundedButton
          style={styles.exit}
          title="Exit"
          size={50}
          onPress={() => {
            clearSubject();
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskContainer: {
    paddingTop: paddingSizes.xxl,
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper:{
    flex: 0.3,
    padding: 15,
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row"
  },
  ProgressBar:{
    marginTop: paddingSizes.sm
  },
  exit:{
    marginBottom:20,
    marginLeft:20
  }
});
