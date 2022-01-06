import React, { useEffect, useState } from 'react'
import { VStack } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as Keychain from 'react-native-keychain'
import { Camera } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import {
  AlertPop,
  Flat
} from '../../components'
import { RootStackParamList } from '../../interfaces'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

function Home({ navigation }: Props) {
  const [isAlert, setIsAlert] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    const mount = setTimeout(() => {
      FingerprintScanner.release()
      FingerprintScanner.isSensorAvailable()
        .then((biometryType) => {
          console.log('biometric type => ', biometryType)
        })
        .catch((error) => console.log('isSensorAvailable error => ', error))
    }, 1000)
    return () => clearTimeout(mount)
  }, [])

  const authFinger = () => {
    setName('')
    FingerprintScanner
      .authenticate({
        title: 'Log in with Biometrics',
        cancelButton: 'Cancel',
        onAttempt: () => (console.log('did cancel'))
      })
      .then((res) => {
        FingerprintScanner.release()
        setIsAlert(true)
        setName('Success')
      }).catch((err) => {
        FingerprintScanner.release()
        setIsAlert(true)
        setName(err.name)
        console.log('err : ', err)
      })
  }

  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      flex={1}
      width="100%"
      space="5"
    >
      {isAlert ? (
        <VStack
          flex={1}
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          right={0}
          space={1}
          zIndex={1}
          alignItems="center"
          justifyContent="center"
          bg="rgba(0, 0, 0, 0.5)"
        >
          <AlertPop
            isShowModal={isAlert}
            onCloseModal={() => {
              setIsAlert(false)
              FingerprintScanner.release()
            }}
            name={name}
          />
        </VStack>
      ) : null}
      <Flat
        label="FINGERPRINT"
        onPress={authFinger}
      />
      <Flat
        label="FACE DETECTOR"
        onPress={() => console.log('did face it')}
      />
    </VStack>
  )
}

export default Home
