/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{type: {name: string}}>;
  moves: Array<{move: {name: string}}>;
}

interface RouteParams {
  pokemonName: string | undefined;
}

interface Props {
  route: {params: RouteParams};
}

const DetailsScreen: React.FC<Props> = ({route}) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (route.params.pokemonName) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${route.params.pokemonName}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setPokemonDetails({
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types,
            moves: data.moves,
          });
        }
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [route.params.pokemonName]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : pokemonDetails ? (
        <>
          <Image
            source={{
              uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemonDetails.name}.png`,
            }}
            style={styles.pokemonImage}
          />
          <Text>{`Número: ${pokemonDetails.id || 'No disponible'}`}</Text>
          <Text>{`Nombre: ${pokemonDetails.name || 'No disponible'}`}</Text>
          <Text>{`Altura: ${pokemonDetails.height || 'No disponible'}`}</Text>
          <Text>{`Peso: ${pokemonDetails.weight || 'No disponible'}`}</Text>
          <Text>{`Tipo: ${
            pokemonDetails.types
              ? pokemonDetails.types
                  .map((type: any) => type.type.name)
                  .join(', ')
              : 'No disponible'
          }`}</Text>
          <Text>{`Movimientos: ${
            pokemonDetails.moves
              ? pokemonDetails.moves
                  .map((move: any) => move.move.name)
                  .join(', ')
              : 'No disponible'
          }`}</Text>
        </>
      ) : (
        <Text>No se encontraron detalles para el Pokémon seleccionado.</Text>
      )}
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
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default DetailsScreen;
