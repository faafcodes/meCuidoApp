import { Dimensions } from 'react-native';

export default function getStyles(theme) {
  const { width, height } = Dimensions.get('window');
  const cardWidth = width * 0.8;
  const cardHeight = width * 0.8;
  return {
    container: {
      alignItems: 'center',
    },
    image: {
      width: cardWidth,
      height: cardHeight,
      borderRadius: 10,
    },
    dotsContainer: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20,
      justifyContent: 'center',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.subtitle,
      margin: 5,
    },
    dotAtivo: {
      backgroundColor: theme.brandMain,
    },
  };
}
