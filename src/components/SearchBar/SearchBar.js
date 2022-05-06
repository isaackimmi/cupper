import {
  FormControl,
  Button,
  HStack,
  Input,
  FormLabel,
  useToast,
  Text,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { colors } from "../../theme";
import conversions from "../../../node_modules/conversions/dist/conversions";
import { Search2Icon } from "@chakra-ui/icons";
import "./SearchBar.css";

import { DISTANCE_OPTIONS, RATING_OPTIONS, PRICE_OPTIONS } from "./OptionTypes";
import { filterCafe } from "./FilterCafe";

import { useEffect, useState } from "react";

const SearchBar = () => {
  const [addressObject, setAddressObject] = useState({});
  const [selectedRating, setSelectedRating] = useState(-1.0);
  const [selectedPrice, setSelectedPrice] = useState(-1);
  const [selectedOrder, setSelectedOrder] = useState("Ascending");
  const [service, setService] = useState();
  const [cafes, setCafes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    setService(
      new window.google.maps.places.PlacesService(document.createElement("div"))
    );
  }, []);

  const handleSelectPlace = (autocomplete) => {
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
      type: ["cafe"],
      radius: 50000,
    };

    service.nearbySearch(request, callback);
  };

  const callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      results.forEach((element) => {
        const userLatLng = new window.google.maps.LatLng(
          addressObject.lat,
          addressObject.long
        );

        const cafeLocation = new window.google.maps.LatLng(
          element.geometry.location.lat(),
          element.geometry.location.lng()
        );

        const distanceBetween =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            userLatLng,
            cafeLocation
          );

        console.log(conversions(distanceBetween, "metres", "miles"));

        cafes.push({
          address_object: {
            vicinity: element.vicinity,
            lat: element.geometry.location.lat(),
            long: element.geometry.location.lng(),
          },
          name: element.name,
          place_id: element.place_id,
          people_checked_in: 0,
          rating: element.rating,
          price_level: element.price_level,
          distance: conversions(distanceBetween, "metres", "miles"),
        });
      });

      filterCafe(
        cafes,
        Number(selectedRating.toFixed(1)),
        selectedPrice,
        selectedOrder,
        setCafes
      );
    } else {
      console.log(window.google.maps.places.PlacesServiceStatus);
      toast({
        title: "No cafes near you :(",
        description:
          "There are no cafes near you! Enter a new address and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  window.google.maps.event.addDomListener(window, "load", loadAutocomplete);

  return (
    <FormControl>
      <HStack spacing={3} alignItems={"end"}>
        <FormControl id="location">
          <FormLabel color={"primary"}>Location</FormLabel>
          <InputGroup size={"md"}>
            <InputLeftElement
              pointerEvents={"none"}
              children={<Search2Icon />}
              p={2}
            />
            <Input
              borderWidth={4}
              borderRadius={50}
              flex={[0, 0, "200%"]}
              id="location-name"
            />
          </InputGroup>
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="rating-options">
          <FormLabel color={"primary"}>Rating</FormLabel>
          {/* <Box
            as={Select}
            id="rating"
            options={RATING_OPTIONS}
            focusBorderColor={colors.secondary}
            selectedOptionStyle="check"
            onChange={(rating) => {
              setSelectedRating(rating.value);
            }}
          /> */}
          <Select
            id="rating"
            options={RATING_OPTIONS}
            focusBorderColor={colors.secondary}
            selectedOptionStyle="check"
            onChange={(rating) => {
              setSelectedPrice(rating.value);
            }}
          />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="rating-options">
          <FormLabel color={"primary"}>Price</FormLabel>
          <Select
            id="price"
            options={PRICE_OPTIONS}
            focusBorderColor={colors.secondary}
            selectedOptionStyle="check"
            onChange={(price) => {
              setSelectedPrice(price.value);
            }}
          />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="distance-options">
          <FormLabel color={"primary"}>Distance</FormLabel>
          <Select
            id="distance"
            options={DISTANCE_OPTIONS}
            focusBorderColor={colors.secondary}
            selectedOptionStyle="check"
            onChange={(order) => {
              setSelectedOrder(order.value);
            }}
          />
        </FormControl>

        <Button
          backgroundColor={colors.accent}
          flex={[0, 0, "25%"]}
          onClick={handleClick}
          fontWeight={800}
          fontSize={18}
          alignItems={"center"}
        >
          <Text color={colors.white}>Go</Text>
          {""}
        </Button>
      </HStack>
    </FormControl>
  );
};

export default SearchBar;
