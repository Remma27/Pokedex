import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
//import {useNavigation} from '@react-navigation/native';
import {styles} from './style';

interface Pokemon {
  name: string;
}

const HomeScreen = () => {
  //const navigation = useNavigation();
  const [generation, setGeneration] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

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
      .catch(error => console.error('Error fetching Pokemon:', error));
  }, [generation]);

  const handleGenerationChange = (gen: number) => {
    setGeneration(gen);
  };

  const handlePokemonPress = () => {
    //navigation.navigate('PokemonsDetails', {pokemonName: pokemon.name} as never);
  };

  // Memoize pokemonList for efficiency
  const memoizedPokemonList = useMemo(() => pokemonList, [pokemonList]);

  return (
    <View style={styles.container}>
      <View style={styles.generationSelector}>
        {[1, 2, 3, 4, 5].map(gen => (
          <TouchableOpacity
            key={gen}
            onPress={() => handleGenerationChange(gen)}>
            <Text
              style={
                generation === gen
                  ? styles.selectedGenerationText
                  : styles.generationText
              }>
              Gen {gen}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={memoizedPokemonList}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePokemonPress()}>
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
