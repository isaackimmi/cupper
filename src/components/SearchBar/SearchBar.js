import {
  FormControl,
  Button,
  HStack,
  Input,
  FormLabel,
  useToast,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Select } from "chakra-react-select";
import { DISTANCE_OPTIONS, RATING_OPTIONS, PRICE_OPTIONS } from "./OptionTypes";

import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { colors } from "../../theme";
import { isDisabled } from "@testing-library/user-event/dist/utils";

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
          people_checked_in: 0,
        });
      });
    }
  };

  window.google.maps.event.addDomListener(window, "load", loadAutocomplete);

  return (
    <FormControl>
      <HStack spacing={3} alignItems={"end"}>
        <FormControl id="location">
          <FormLabel color={"primary"}>Location</FormLabel>
          <Input flex={[0, 0, "200%"]} id="location-name" />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="rating-options">
          <FormLabel color={"primary"}>Rating</FormLabel>
          <Select id="rating" options={RATING_OPTIONS} />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="rating-options">
          <FormLabel color={"primary"}>Price</FormLabel>
          <Select id="price" options={PRICE_OPTIONS} />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="distance-options">
          <FormLabel color={"primary"}>Distance</FormLabel>
          <Select id="distance" options={DISTANCE_OPTIONS} />
        </FormControl>

        <Button
          backgroundColor={colors.secondary}
          flex={[0, 0, "25%"]}
          onClick={handleClick}
          fontWeight={800}
          fontSize={18}
          alignItems={"center"}
        >
          <Text color={colors.white}>Go</Text>
          {""}
          <ChevronRightIcon color={colors.white} boxSize={6} />
        </Button>
      </HStack>
    </FormControl>
  );
};

export default SearchBar;
