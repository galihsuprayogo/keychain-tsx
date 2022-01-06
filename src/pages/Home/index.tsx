import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
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
  const [isFace, setIsFace] = useState(false)
  const [name, setName] = useState('')
  const [hasPermission, setHasPermission] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.front)
  const [faceData, setFaceData] = useState([])

  useEffect(() => {
    const mount = setTimeout(async () => {
      FingerprintScanner.release()
      checkCameraPermission()
    }, 500)
    return () => clearTimeout(mount)
  }, [])

  const checkCameraPermission = async () => {
    const status = await Camera.requestCameraPermissionsAsync()
    if (status.status === 'granted') {
      setHasPermission(true)
    } else {
      setHasPermission(false)
    }
  }

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

  // function getFaceDataView() {
  //   if (faceData.length === 0) {
  //     return (
  //       <View style={styles.faces}>
  //         <Text style={styles.faceDesc}>No faces :(</Text>
  //       </View>
  //     )
  //   }
  //   return faceData.map((face, index) => {
  //     const eyesShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4
  //     const winking = !eyesShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4)
  //     const smiling = face.smilingProbability > 0.7
  //     return (
  //       <View style={styles.faces} key={index}>
  //         <Text style={styles.faceDesc}>
  //              Eyes Shut:
  //           {eyesShut.toString()}
  //         </Text>
  //         <Text style={styles.faceDesc}>
  //            Winking:
  //           {winking.toString()}
  //         </Text>
  //         <Text style={styles.faceDesc}>
  //           Smiling:
  //           {smiling.toString()}
  //         </Text>
  //       </View>
  //     )
  //   })
  // }

  const handleFacesDetected = (faces : any) => {
    setFaceData(faces)
    console.log(faces)
  }

  const authFace = () => {
    if (hasPermission) {
      setIsFace(true)
    } else {
      setIsFace(false)
      setName('NoCamera')
      setIsAlert(true)
    }
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
      {isFace ? (
        <Camera
          type={Camera.Constants.Type.front}
          style={styles.camera}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: true
          }}
        />
      ) : null}
      <Flat
        label="FINGERPRINT"
        onPress={authFinger}
      />
      <Flat
        label="FACE DETECTOR"
        onPress={authFace}
      />
    </VStack>
  )
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faces: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  faceDesc: {
    fontSize: 20
  }
})

export default Home
