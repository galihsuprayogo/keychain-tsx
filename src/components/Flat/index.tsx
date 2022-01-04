import React from 'react';
import {
  VStack,
  Pressable,
  Text,
  Box
} from 'native-base';
import { FlatProps } from '../../interfaces'

function Flat(props: FlatProps) {
  const { label, onPress } = props;
  return (
 <Pressable
   onPress={onPress}
   width="100%"
 >
{({ isHovered, isFocused, isPressed }) => (
    <VStack
      py="3"
      alignItems="center"
      justifyContent="center"
      bg="gray.500"
      width="100%"
      borderRadius="5"
      style={{
        transform: [
          {
            scale: isPressed ? 0.98 : 1,
          },
        ],
      }}
    >

       <Box>
         <Text
           color="white"
         >
           {label}
         </Text>
       </Box>

    </VStack>
)}
 </Pressable>
  );
}

export default Flat;
