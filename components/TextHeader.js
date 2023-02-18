import React from "react";
import {Text} from "native-base";

const TextHeader = (props) => {
    return (
        <Text
            fontSize='md'
            style={{
                backgroundColor: '#154897',
                color: 'white',
                paddingHorizontal:10,
                paddingVertical: 5,
            }}
        >
            {props.text}
        </Text>
    )
}
export default TextHeader;