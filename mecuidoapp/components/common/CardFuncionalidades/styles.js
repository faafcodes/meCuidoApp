import { StyleSheet, Dimensions } from 'react-native';

export default function getStyles(theme) {
  const { width, height } = Dimensions.get('window');
  const cardWidth = width * 0.85;
  const imageHeight = cardWidth * 0.75;
  const imageWidth = cardWidth * 0.4;
  return StyleSheet.create({
    container: {
      marginTop: 8,
    },
    card: {
      backgroundColor: theme.greetingCard,
      borderRadius: 12,
      padding: 20,
      width: cardWidth,
      height: cardWidth,
      marginHorizontal: (width * 0.05) / 2,
      marginTop: 25,
    },
    carouselTitleContainer: {
      width: cardWidth,
      paddingHorizontal: 20,
      marginHorizontal: (width * 0.05) / 2,
    },

    carouselTitlePrefix: {
      textAlign: 'left',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.subtitle,
    },
    carouselTitleHighlighted: {
      fontStyle: 'bold',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 10,
    },
    body: {
      flexDirection: 'row',

      alignItems: 'center',
    },
    infoSection: {
      flex: 1,
    },
    label: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.subtitle,
      marginBottom: 4,
    },
    value: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.brandMain,
    },
    description: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.buttonPlus,
      marginTop: 2,
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      marginLeft: 10,
    },
    paginationWrapper: {
      alignSelf: 'center', // impede o alignItems: 'center' do pai afetar
      marginTop: 20,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.brandSoft,
      marginHorizontal: 5,
      opacity: 0.5,
    },

    dotActive: {
      backgroundColor: theme.brandMain, 
      opacity: 1,
    },
    valueAguaNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.primary,
    },
    valueAguaUnit: {
      fontSize: 18,
      fontWeight: 'normal',
      color: theme.textSecondary,
    },
    valueImcNumber: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.brandMain,
    },
    valueImcUnit: {
      fontSize: 25,
      fontWeight: 'bold',
      color: theme.brandMain,
    },
    valueSonoNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.primary,
    },
    valueSonoUnit: {
      fontSize: 18,
      fontWeight: 'normal',
      color: theme.textSecondary,
    },
  });
}
