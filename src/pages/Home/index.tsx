import React from 'react'
import { VStack } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Flat } from '../../components'
import { RootStackParamList } from '../../interfaces'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

function Home({ navigation }: Props) {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      flex={1}
      px="5"
    >
      <Flat
        label="Fingerprint"
        onPress={() => navigation.push('Landing')}
      />
    </VStack>
  )
}

export default Home
