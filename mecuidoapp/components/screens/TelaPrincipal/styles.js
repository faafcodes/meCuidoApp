import { StyleSheet, Dimensions } from 'react-native';

export default function getStyles(theme) {
  const { width, height } = Dimensions.get('window');
  const headerWidth = width * 0.85;
  const greetingCardWidth = width * 0.85;
  const greetingCardHeight = width * 0.3;
  const leafWidth = greetingCardWidth * 0.45;
  const leafHeight = greetingCardHeight * 0.9;
  const dividerHeight = height * 0.04;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
      paddingTop: 70,
    },
    header: {
      width: headerWidth,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: theme.subtitle,
    },
    greetingCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: greetingCardWidth,
      height: greetingCardHeight,
      alignItems: 'center',
      backgroundColor: theme.greetingCard,
      borderRadius: 12,
      padding: 20,
      marginTop: 50,
      marginHorizontal: (width * 0.05) / 2,
    },
    greetingText: {
      fontSize: 20,
      color: theme.subtitle,
    },
    userName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.brandMain,
    },
    leafImage: {
      width: leafWidth,
      height: leafHeight,
    },
    imageDivider: {
      width: '90%',
      height: 12, // ajuste conforme a altura real da imagem
      alignSelf: 'center',
      marginVertical: dividerHeight,
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 30,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.subtitle,
    },
    waterText: {
      color: theme.water,
    },
    card: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 16,
      padding: 20,
      marginTop: 20,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    tagHoje: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.buttonPlus,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    tagHojeText: {
      color: theme.white,
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 4,
    },
    cardBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      fontSize: 12,
      color: theme.subtitle,
      marginBottom: 4,
    },
    cardText: {
      fontSize: 16,
      color: theme.brandMain,
      fontWeight: 'bold',
    },
    dropImage: {
      width: 60,
      height: 100,
    },
  });
}