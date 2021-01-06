import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS as ANIMALS_TYPE, Animal } from "@frontendmasters/pet";
import ThemeContext from "./ThemeContext";
import useDropdown from "./useDropdown";
import { RouteComponentProps } from "@reach/router";

import Results from "./Results";

function SearchParams(props: RouteComponentProps) {
  const [pets, setPets] = useState([] as Animal[]);
  const [location, setLocation] = useState("Seattle, WA");
  const [breedsAPIList, updateBreedsAPIList] = useState([] as string[]);
  const [theme, setTheme] = useContext(ThemeContext);
  const [animalType, AnimalDropdown] = useDropdown(
    "Animal",
    "dog",
    ANIMALS_TYPE
  );

  const [breed, BreedDropdown, updateBreed] = useDropdown(
    "Breed",
    "",
    breedsAPIList
  );

  useEffect(() => {
    updateBreedsAPIList([]);
    updateBreed("");

    pet.breeds(animalType).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      updateBreedsAPIList(breedStrings);
    }, console.error);
  }, [animalType, updateBreed]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animalType,
    });

    setPets(animals || []);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />

        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            id="theme"
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option key="darkgreen" value="darkgreen">
              Dark Green
            </option>
            <option key="pink" value="pink">
              Pink
            </option>
            <option key="peru" value="peru">
              Peru
            </option>
            <option key="darkblue" value="darkblue">
              Dark Blue
            </option>
            <option key="green" value="green">
              Green
            </option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
