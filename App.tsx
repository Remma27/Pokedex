import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {styles} from './style'; // Ajusta la ruta según la ubicación de tu archivo de estilos

const HomeScreen = ({navigation}: any) => {
  const [generation, setGeneration] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<any[]>([]);

  useEffect(() => {
    let offset = 0;
    let limit = 151;

    if (generation === 2) {
      offset = 151;
      limit = 100;
    } else if (generation === 3) {
      offset = 251;
      limit = 135;
    } else if (generation === 4) {
      offset = 386;
      limit = 107;
    } else if (generation === 5) {
      offset = 493;
      limit = 156;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(data => setPokemonList(data.results))
      .catch(error => console.log(error));
  }, [generation]);

  const handleGenerationChange = (gen: number) => {
    setGeneration(gen);
  };

  const handlePokemonPress = (pokemon: any) => {
    // Navega a la vista de detalles del Pokémon
    navigation.navigate('PokemonsDetails', {pokemon});
  };

  return (
    <View style={styles.container}>
      <View style={styles.generationSelector}>
        <TouchableOpacity onPress={() => handleGenerationChange(1)}>
          <Text
            style={
              generation === 1
                ? styles.selectedGenerationText
                : styles.generationText
            }>
            Gen 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGenerationChange(2)}>
          <Text
            style={
              generation === 2
                ? styles.selectedGenerationText
                : styles.generationText
            }>
            Gen 2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGenerationChange(3)}>
          <Text
            style={
              generation === 3
                ? styles.selectedGenerationText
                : styles.generationText
            }>
            Gen 3
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGenerationChange(4)}>
          <Text
            style={
              generation === 4
                ? styles.selectedGenerationText
                : styles.generationText
            }>
            Gen 4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGenerationChange(5)}>
          <Text
            style={
              generation === 5
                ? styles.selectedGenerationText
                : styles.generationText
            }>
            Gen 5
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={pokemonList}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePokemonPress(item)}>
            <View style={styles.cardContainer}>
              <Image
                source={{
                  uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
                }}
                style={styles.pokemonImage}
              />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
