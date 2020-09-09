import React from 'react';
import { Svg, Text } from 'react-native-svg';
import { Image, StyleSheet } from 'react-native';

const Logo = (props) => {
    return (
        <>
            <Image
                source={require('../../logo.png')}
                style={{
                    width: props.width || 100,
                    height: props.height || 100,
                }}
            />
        </>
    );
};

export default Logo;
