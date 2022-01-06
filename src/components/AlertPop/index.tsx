import React from 'react'
import {
  Modal,
  Pressable,
  Box,
  VStack,
  HStack,
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
      case 'NoCamera':
        return 'No access to camera'
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
            py="39"
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
          </VStack>
        </Modal.Body>
        <Modal.Footer
          backgroundColor="gray.200"
        >
          <Pressable
            onPress={props.onCloseModal}
            flex={1}
            width="full"
          >
            {({ isHovered, isFocused, isPressed }) => (
              <VStack
                bg="transparent"
                height="5"
                alignItems="center"
                justifyContent="center"

              >
                <Box
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.9 : 1,
                      },
                    ],
                  }}
                >
                  <Text
                    fontSize="16"
                    color="black"
                    textAlign="center"
                    letterSpacing="sm"
                  >
                      OK
                  </Text>
                </Box>
              </VStack>
            )}
          </Pressable>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default AlertPop
