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
        width: '100%',
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
    detailsContainer: {
        alignItems: 'center',
    },
    detailsText: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
    },
    pokemonImage2: {
        width: 90,
        height: 90,
        paddingTop: 50,
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'yellow',
    },
});
