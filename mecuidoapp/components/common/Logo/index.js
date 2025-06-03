import React from 'react';
import { Image } from 'react-native';
import styles from './styles';

export default function Logo() {
  return (
    <Image
      source={require('../../../assets/logo.png')}
      style={styles.logo}
      resizeMode="contain" 
    />
  );
}
