/* eslint-disable prettier/prettier */
// Importa las bibliotecas necesarias
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const DetailsScreen = ({route}: {route: any}) => {
  const {pokemon} = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
        }}
        style={styles.pokemonImage}
      />
      <Text>{`Número: ${pokemon.id}`}</Text>
      <Text>{`Nombre: ${pokemon.name}`}</Text>
      <Text>{`Altura: ${pokemon.height}`}</Text>
      <Text>{`Peso: ${pokemon.weight}`}</Text>
      <Text>{`Tipo: ${pokemon.types
        .map((type: any) => type.type.name)
        .join(', ')}`}</Text>
      <Text>{`Movimientos: ${pokemon.moves
        .map((move: any) => move.move.name)
        .join(', ')}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
});

export default DetailsScreen;
