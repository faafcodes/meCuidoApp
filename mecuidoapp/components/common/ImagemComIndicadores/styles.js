import { Dimensions } from 'react-native';

export default function getStyles(theme) {
  return {
    container: {
      alignItems: 'center',
    },
    image: {
      width: 300,
      height: 290,
    },
    dotsContainer: {
      flexDirection: 'row',
      marginTop: 10,
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
