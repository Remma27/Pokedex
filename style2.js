/* eslint-disable prettier/prettier */
// styles.js o styles.ts
import { StyleSheet } from 'react-native';

export const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },

    cardDetails: {
        alignItems: 'center',
    },

    pokemonImage2: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 50,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    detailsText: {
        fontSize: 16,
        marginBottom: 5,
    },

    types: {
        marginTop: 20,
    },

    moves: {
        marginTop: 20,
    },
});
