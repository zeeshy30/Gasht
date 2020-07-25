import React from 'react';
import { Svg, Text } from 'react-native-svg';
import { Image, StyleSheet } from 'react-native';

const Logo = (props) => {
    return (
        <>
            <Image
                source={require('../../gasht.jpeg')}
                style={{ width: props.width || 70, height: props.height || 70 }}
            />
            <Svg height={props.height || '70'} width={props.width || '70'}>
                <Text
                    fill="none"
                    stroke="black"
                    fontSize="18"
                    fontWeight="bold"
                    x={props.height ? '90' : '40'}
                    y="20"
                    textAnchor="middle">
                    GASHT
                </Text>
            </Svg>
        </>
    );
};

export default Logo;
