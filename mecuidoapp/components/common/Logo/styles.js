import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const logoWidth = width * 0.6;
logoHeight = width * 0.25;

export default StyleSheet.create({
  logo: {
    width: logoWidth,
    height: logoHeight,
    marginBottom: 25,
    alignSelf: 'center',
  },
});
