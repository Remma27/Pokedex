/* eslint-disable prettier/prettier */
// styles.js o styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    generationSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
    },
    generationText: {
        fontSize: 18,
        color: 'black',
        padding: 10,
    },
    selectedGenerationText: {
        fontSize: 18,
        color: 'blue',
        fontWeight: 'bold',
        padding: 20,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', // Extend the card to the width of the screen
    },
    pokemonImage: {
        width: 90,
        height: 90,
        marginRight: 15,
    },
    pokemonName: {
        fontSize: 50,
        textAlign: 'center',
    },
});
