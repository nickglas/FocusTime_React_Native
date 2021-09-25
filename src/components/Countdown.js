import React ,{useState, useEffect} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { colors} from '../utils/Colors';
import { paddingSizes, fontSizes} from '../utils/Sizes';

const minutesToMillis = (min) => {
  return min * 1000 * 60
}

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time
}

export const Countdown =  ({
  minutes,
  isPaused = true,
  onProgress,
  onEnd
}) => {

  const interval = React.useRef(null)

  const countDown = () => {
    setMillies((time) => {
      if(time === 0){
        clearInterval(interval.current)
        onEnd()
        return time
      }
      const timeLeft = time - 1000

      onProgress(timeLeft/minutesToMillis(minutes))

      return timeLeft
    })
  }

  useEffect(() => {setMillies(minutesToMillis(minutes))} , [minutes])

  useEffect(() => {

    if(isPaused){
      if(interval.current) clearInterval(interval.current)
      return;
    }

    interval.current = setInterval(countDown, 1000)
    return () => clearInterval(interval.current)
  }, [isPaused])

  const[millis, setMillies] = useState(minutesToMillis(minutes))

  const minute = Math.floor(millis / 1000 / 60 ) % 60
  const seconds = Math.floor(millis / 1000) % 60

  return(
    <Text style={styles.text}>{(formatTime(minute))}:{(formatTime(seconds))}</Text>
  ) 
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    color: colors.white,
    padding: paddingSizes.lg,
    backgroundColor: 'rgba(94,132,226,0.3)'
  }
})