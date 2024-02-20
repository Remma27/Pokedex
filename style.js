/* eslint-disable prettier/prettier */
// styles.js o styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'right',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#fff',
    },
    generationSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
    },
    generationText: {
        fontSize: 18,
        color: 'black',
        padding: 10,
    },
    selectedGenerationText: {
        fontSize: 18,
        color: '#365DAA',
        fontWeight: 'bold',
        padding: 10,
    },
    cardContainer: {
        backgroundColor: '#DCDDEF',
        borderRadius: 30,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    pokemonImage: {
        width: 120,
        height: 120,
        marginRight: 15,
    },
    pokemonName: {
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#333',
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
    logoPokemon: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        marginTop: 20,
    },
});
