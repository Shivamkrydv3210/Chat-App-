import React from 'react'
import { HStack, Avatar, Text, VStack } from '@chakra-ui/react';

const Message = ({text, uri, user = "other"}) => {
  return (

    <HStack bg="gray.300" padding = {"4"} borderRadius={"base"} paddingX={"4"} paddingY={"2"} alignSelf={ user==="me"?"flex-start": "flex-end"} >
      {user === "me" && <Avatar/>}
      <Text>{text} </Text>
      {user === "other" && <Avatar/>}
    </HStack>

   
  )
}

export default Message;