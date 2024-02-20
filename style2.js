/* eslint-disable prettier/prettier */
// styles.js o styles.ts
import { StyleSheet } from 'react-native';

export const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },

    logoPokemon: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        width: '100%',
        marginTop: 20,
    },

    cardDetails: {
        borderRadius: 10,
        backgroundColor: '#F4CC1C',
        height: 200,
        flexDirection: 'row', // O 'column' según tus necesidades
        justifyContent: 'space-around', // Ajusta según tus necesidades
        alignItems: 'center',
        borderWidth: 1, // Añade un borde de 1 píxel
        borderColor: '#365DAA', // Color del borde
    },

    pokemonImage2: {
        width: 150,
        height: 150,
    },

    texts: {
        flex: 1,
        marginLeft: 10,
    },



    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    detailsText: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },

    types: {
        borderRadius: 10,
        backgroundColor: '#F4CC1C',
        height: 50,
        flexDirection: 'row', // O 'column' según tus necesidades
        justifyContent: 'space-around', // Ajusta según tus necesidades
        alignItems: 'center',
        borderWidth: 1, // Añade un borde de 1 píxel
        borderColor: '#365DAA',
        marginTop: 20,
        marginBottom: 20,
    },

    moves: {
        borderRadius: 10,
        backgroundColor: '#F4CC1C',
        height: 50,
        flexDirection: 'row', // O 'column' según tus necesidades
        justifyContent: 'space-around', // Ajusta según tus necesidades
        alignItems: 'center',
        borderWidth: 1, // Añade un borde de 1 píxel
        borderColor: '#365DAA',
        marginTop: 20,
        marginBottom: 20,
    },

    Title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    TitleCard: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
