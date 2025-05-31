import { StyleSheet, Dimensions } from 'react-native';

export default function getStyles(theme) {
  const { width, height } = Dimensions.get('window');

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
      paddingTop: 50,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.subtitle,
    },
    greetingCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width * 0.85,
      alignItems: 'center',
      backgroundColor: theme.greetingCard,
      borderRadius: 12,
      padding: 20,
      marginTop: 24,
      marginHorizontal: (width * 0.05) / 2,
    },
    greetingText: {
      fontSize: 18,
      color: theme.subtitle,
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.brandMain,
    },
    leafImage: {
      width: 60,
      height: 60,
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
