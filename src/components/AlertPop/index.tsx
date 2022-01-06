import React from 'react'
import {
  Modal,
  Pressable,
  Box,
  VStack,
  Text
} from 'native-base'
import { AlertProps } from '../../interfaces'

function AlertPop(props: AlertProps) {
  const getMessage = () => {
    switch (props.name) {
      case 'UserCancel':
        return 'Canceled fingerprint scanning'
      case 'UserFallback':
        return 'On Close fingerprint scanning'
      case 'DeviceLocked':
        return 'Time out, please wait for 30 seconds'
      case 'Success':
        return 'Authentification Successfull'
      case 'FingerprintScannerNotEnrolled':
        return 'Fingerprint Scanner has no enrolled fingers'
      default:
        break
    }
  }

  return (
    <Modal
      isOpen={props.isShowModal}
      onClose={props.onCloseModal}
    >
      <Modal.Content
        maxWidth="100%"
        width="80%"
      >
        <Modal.Body>
          <VStack
            flex={1}
            alignItems="center"
            justifyContent="space-around"
            py="50"
            px="5"
            bg="white"
            space="5"
          >

            <Box>
              <Text
                fontSize="16"
                color={props.name === 'Success' ? 'black' : 'red.500'}
                textAlign="center"
                letterSpacing="sm"
              >
                {getMessage()}
              </Text>
            </Box>
            <Pressable
              onPress={props.onCloseModal}
            >
              {({ isHovered, isFocused, isPressed }) => (
                <VStack
                  bg="gray.500"
                  height="9"
                  px="6"
                  borderRadius="5"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.98 : 1,
                      },
                    ],
                  }}
                >
                  <Text
                    fontSize="16"
                    color="white"
                    textAlign="center"
                    letterSpacing="sm"
                  >
                      OK
                  </Text>
                </VStack>
              )}
            </Pressable>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default AlertPop
