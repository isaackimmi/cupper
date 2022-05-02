import {
  FormControl,
  Button,
  HStack,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useNavigate } from "react-router-dom";
import { DISTANCE_OPTIONS, RATING_OPTIONS, PRICE_OPTIONS } from "./OptionTypes";

import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { StarIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [addressObject, setAddressObject] = useState({});
  const [service, setService] = useState();
  const [cafes, setCafes] = useState([]);
  const toast = useToast();

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
        cafes.push({
          address_object: {
            vicinity: element.vicinity,
            lat: element.geometry.location.lat(),
            long: element.geometry.location.lng(),
          },
          name: element.name,
          place_id: element.place_id,
        });
      });
    }
  };

  window.google.maps.event.addDomListener(window, "load", loadAutocomplete);

  return (
    <FormControl>
      <HStack spacing={3} alignItems={"end"}>
        <FormControl id="location">
          <FormLabel>Location</FormLabel>
          <Input flex={[0, 0, "200%"]} id="location-name" />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="rating-options">
          <FormLabel>Rating</FormLabel>
          <Select id="rating" options={RATING_OPTIONS} />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="rating-options">
          <FormLabel>Price</FormLabel>
          <Select id="price" options={PRICE_OPTIONS} />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="distance-options">
          <FormLabel>Distance</FormLabel>
          <Select id="distance" options={DISTANCE_OPTIONS} />
        </FormControl>

        <Button flex={[0, 0, "25%"]} onClick={handleClick}>
          Go!
        </Button>
      </HStack>
    </FormControl>
  );
};

export default SearchBar;
