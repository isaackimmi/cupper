import { FormControl, Button, Box, HStack, Input } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useNavigate } from "react-router-dom";
import {
  DISTANCE_OPTIONS,
  RATING_OPTIONS,
  PRICE_OPTIONS,
  BUSYNESS_OPTIONS,
} from "./OptionTypes";

import { useEffect, useRef, useState } from "react";

import axios from "axios";

// const select_options = {
//   busyness: ["high", "normal", "low"],
//   price: ["$", "$$", "$$$"],
//   rating: ["*", "**", "***", "****", "*****"],
//   distance: ["1 mile", "5 miles", "10 miles", ">20 miles"],
// };

const SearchBar = () => {
  const [addressObject, setAddressObject] = useState({});
  const [service, setService] = useState();
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    setService(
      new window.google.maps.places.PlacesService(document.createElement("div"))
    );
  }, []);

  const handleSelectPlace = async (autocomplete) => {
    const address = autocomplete.getPlace();
    setAddressObject({ lat: address.geometry.location.lat() });
    setAddressObject((addressObject) => ({
      ...addressObject,
      long: address.geometry.location.lng(),
    }));
  };

  const loadAutocomplete = () => {
    var input = document.getElementById("location-name");
    var autocomplete = new window.google.maps.places.Autocomplete(input, {
      fields: ["address_components", "geometry"],
    });

    autocomplete.setFields(["address_components", "geometry"]);
    autocomplete.addListener("place_changed", () => {
      handleSelectPlace(autocomplete);
    });
  };

  const handleClick = () => {
    let userLocation = new window.google.maps.LatLng(
      addressObject.lat,
      addressObject.long
    );

    var request = {
      location: userLocation,
      type: ["restaurant"],
      radius: 500,
    };

    service.nearbySearch(request, callback);
  };

  const callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      results.forEach((element) => {
        cafes.push(element);
        console.log(element);
      });
    }
  };

  window.google.maps.event.addDomListener(window, "load", loadAutocomplete);

  return (
    <FormControl>
      <HStack spacing={3}>
        <Input flex={[0, 0, "200%"]} id="location-name" />
        <Box flex={[0, 0, "50%"]}>
          <Select
            placeholder="busyness"
            id="busyness"
            options={BUSYNESS_OPTIONS}
          />
        </Box>
        <Box flex={[0, 0, "45%"]}>
          <Select placeholder="rating" id="busyness" options={RATING_OPTIONS} />
        </Box>
        <Box flex={[0, 0, "45%"]}>
          <Select placeholder="price" id="busyness" options={PRICE_OPTIONS} />
        </Box>
        <Box flex={[0, 0, "45%"]}>
          <Select
            placeholder="distance"
            id="busyness"
            options={DISTANCE_OPTIONS}
          />
        </Box>
        <Button flex={[0, 0, "25%"]} onClick={handleClick}>
          Go!
        </Button>
      </HStack>
    </FormControl>
  );
};

export default SearchBar;
