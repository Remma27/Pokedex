/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

// Import React and necessary components from 'react-native'
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleProp,
  ImageStyle,
} from 'react-native';

// Import navigation-related components from 'react-navigation'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

// Import styles from external files
import {styles} from './style';
import {styles2} from './style2';
import {ScrollView} from 'react-native';

// Define interfaces for Pokemon and PokemonDetails
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

// Define the Home component
function Home() {
  // Use navigation hook to get navigation prop
  const navigation = useNavigation();
  // State to store the current generation and Pokemon list
  const [generation, setGeneration] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  // Fetch Pokemon data based on the selected generation
  useEffect(() => {
    let offset = 0;
    let limit = 151;

    // Adjust offset and limit based on the selected generation
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

    // Fetch Pokemon data from the PokeAPI
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(data => setPokemonList(data.results))
      .catch(error => {
        console.error('Error fetching Pokemon:', error);
      });
  }, [generation]);

  // Handle generation change
  const handleGenerationChange = (gen: number) => {
    setGeneration(gen);
  };

  // Handle Pokemon press to navigate to Details screen
  const handlePokemonPress = (pokemonName: string) => {
    if (navigation) {
      const goDetails = () => {
        navigation.navigate('Details', {pokemonName: pokemonName} as never);
      };
      goDetails();
    }
  };

  // Memoized Pokemon list for optimization
  const memoizedPokemonList = React.useMemo(() => pokemonList, [pokemonList]);

  // Render the Home component
  return (
    <View style={styles.container}>
      {/* Logo for Pokemon */}
      <View style={styles.logoPokemon}>
        <Image source={require('./img/logoPM.png')} />
      </View>

      {/* Generation selector buttons */}
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

      {/* FlatList to display Pokemon cards */}
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
                style={styles.pokemonImage as StyleProp<ImageStyle>}
              />
              <Text style={styles.pokemonName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Define the Details component
function Details({route, navigation}: {route: any; navigation: any}) {
  // State to store Pokemon details and loading status
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Pokemon details based on the selected Pokemon name
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

  // Render the Details component
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles2.container}>
        {/* Logo for Pokemon */}
        <View style={styles2.logoPokemon}>
          <Image source={require('./img/logoPM.png')} />
        </View>

        {/* Loading indicator or Pokemon details */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : pokemonDetails ? (
          <View style={styles2.detailsContainer}>
            {/* Title for Pokemon information */}
            <View style={styles2.TitleCard}>
              <Text style={styles2.Title}>Pokemon Information</Text>
            </View>

            {/* Pokemon details container */}
            <View style={styles2.cardDetails}>
              {/* Pokemon image */}
              <Image
                source={{
                  uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemonDetails.name}.png`,
                }}
                style={styles2.pokemonImage2 as StyleProp<ImageStyle>}
              />

              {/* Texts container for other details */}
              <View style={styles2.texts}>
                <Text style={styles2.sectionTitle}>{` ${
                  pokemonDetails.name || 'Not available'
                }`}</Text>
                <Text style={styles2.detailsText}>Features:</Text>
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
            </View>

            {/* Types information */}
            <View style={styles2.types}>
              <Text style={styles2.sectionTitle}>Types to Belong</Text>
            </View>
            <Text style={styles2.detailsText}>{`${
              pokemonDetails.types
                ? pokemonDetails.types.map(type => type.type.name).join(', ')
                : 'Not available'
            }`}</Text>

            {/* Moves information */}
            <View style={styles2.moves}>
              <Text style={styles2.sectionTitle}>Moves</Text>
            </View>
            <Text style={styles2.detailsText}>{`${
              pokemonDetails.moves
                ? pokemonDetails.moves.map(move => move.move.name).join(', ')
                : 'Not available'
            }`}</Text>
          </View>
        ) : (
          // Displayed if no details are found
          <Text>No details found for the selected Pokémon.</Text>
        )}
      </View>
    </ScrollView>
  );
}

// Create a native stack navigator
const Stack = createNativeStackNavigator();

// Define the main App component
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // Styling options for the header
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: '#000000',
        }}>
        {/* Home screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home Screen'}}
        />
        {/* Details screen */}
        <Stack.Screen
          name="Details"
          component={Details}
          options={{title: 'Details Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Export the main App component
export default App;
