/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {styles} from './style';
import {styles2} from './style2';

interface Pokemon {
  name: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {type: {name: string}}[];
  moves: {move: {name: string}}[];
}

function Home() {
  const navigation = useNavigation();
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
      .catch(error => {
        console.error('Error fetching Pokemon:', error);
      });
  }, [generation]);

  const handleGenerationChange = (gen: number) => {
    setGeneration(gen);
  };

  const handlePokemonPress = (pokemonName: string) => {
    console.log('Navigation prop:', navigation);
    if (navigation) {
      const goDetails = () => {
        console.log('Navigating to Details screen');
        navigation.navigate('Details', {pokemonName: pokemonName} as never);
      };
      goDetails();
    }
  };

  const memoizedPokemonList = React.useMemo(() => pokemonList, [pokemonList]);

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
          <TouchableOpacity onPress={() => handlePokemonPress(item.name)}>
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
}

function Details({route, navigation}: {route: any; navigation: any}) {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (route.params?.pokemonName) {
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
  }, [route.params?.pokemonName]);

  return (
    <View style={styles2.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : pokemonDetails ? (
        <View style={styles2.detailsContainer}>
          <Text>Pokemon Information</Text>
          <View style={styles2.cardDetails}>
            <Image
              source={{
                uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemonDetails.name}.png`,
              }}
              style={styles2.pokemonImage2}
            />
            <Text style={styles2.sectionTitle}>{` ${
              pokemonDetails.name || 'Not available'
            }`}</Text>
            <Text>Features:</Text>
            <Text style={styles2.detailsText}>{`Code: ${
              pokemonDetails.id || 'Not available'
            }`}</Text>
            <Text style={styles2.detailsText}>{`Height: ${
              pokemonDetails.height || 'Not available'
            }`}</Text>
            <Text style={styles2.detailsText}>{`Weight: ${
              pokemonDetails.weight || 'Not available'
            }`}</Text>
          </View>

          <View>
            <View style={styles2.types}>
              <Text style={styles2.sectionTitle}>Types to Belong</Text>
            </View>
            <Text style={styles2.detailsText}>{`Type: ${
              pokemonDetails.types
                ? pokemonDetails.types.map(type => type.type.name).join(', ')
                : 'Not available'
            }`}</Text>
          </View>
          <View>
            <View style={styles2.moves}>
              <Text style={styles2.sectionTitle}>Moves</Text>
            </View>
            <Text style={styles2.detailsText}>{`Moves: ${
              pokemonDetails.moves
                ? pokemonDetails.moves.map(move => move.move.name).join(', ')
                : 'Not available'
            }`}</Text>
          </View>
        </View>
      ) : (
        <Text>No details found for the selected Pokémon.</Text>
      )}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: '#000000', // Modified color to black
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home Screen'}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{title: 'Details Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
