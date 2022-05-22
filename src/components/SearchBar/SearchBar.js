import {
  FormControl,
  Button,
  HStack,
  Input,
  FormLabel,
  useToast,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { colors } from "../../theme";
import conversions from "../../../node_modules/conversions/dist/conversions";
import { Search2Icon } from "@chakra-ui/icons";

import { DISTANCE_OPTIONS, RATING_OPTIONS, PRICE_OPTIONS } from "./OptionTypes";
import { filterCafe } from "./FilterCafe";

import { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const SearchBar = (props) => {
  const { onCafeChange } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const [addressObject, setAddressObject] = useState({});
  const [selectedRating, setSelectedRating] = useState(-1.0);
  const [selectedPrice, setSelectedPrice] = useState(-1);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [service, setService] = useState();
  const toast = useToast();

  console.log(service)
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

  const callback = async (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      const newResults = results.map((element) => {
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

        const cafeObject = {
          place_id: element.place_id,
          address_object: {
            vicinity: element.vicinity,
            // lat: element.geometry.location.lat(),
            // long: element.geometry.location.lng(),
          },
          name: element.name,
          rating: element.rating,
          price_level: element.price_level,
          distance: conversions(distanceBetween, "metres", "miles"),
        };

        return cafeObject;
      });

      const filteredCafes = filterCafe(
        newResults,
        Number(selectedRating.toFixed(1)),
        selectedPrice,
        selectedOrder
      );

      let cafes = [];

      for (const cafe of filteredCafes) {
        try {
          const res = await axios.get(`/api/restaurants/${cafe.place_id}`)
          cafes.push(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      onCafeChange(cafes);
      if (location.pathname === "/landing-page") {
        navigate("/main-page");
      }
    } else if (
      status === window.google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT
    ) {
      toast({
        title: "Hold on!",
        description: "You reached the query limit. Please wait, refresh the page, and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else if (
      status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
    ) {
      toast({
        title: "No cafes near you :(",
        description: "There are no cafes near you! Enter a new address and try again.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Unknown Error!",
        description: "An unknown error occurred. Please wait and try again.",
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

          <Select
            id="rating"
            options={RATING_OPTIONS}
            focusBorderColor={colors.secondary}
            selectedOptionStyle="check"
            onChange={(rating) => setSelectedRating(rating.value)}
          />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="rating-options">
          <FormLabel color={"primary"}>Price</FormLabel>
          <Select
            id="price"
            options={PRICE_OPTIONS}
            focusBorderColor={colors.secondary}
            selectedOptionStyle="check"
            onChange={(price) => setSelectedPrice(price.value)}
          />
        </FormControl>

        <FormControl flex={[0, 0, "45%"]} id="distance-options">
          <FormLabel color={"primary"}>Distance</FormLabel>
          <Select
            id="distance"
            options={DISTANCE_OPTIONS}
            focusBorderColor={colors.secondary}
            selectedOptionStyle="check"
            onChange={(order) => setSelectedOrder(order.value)}
          />
        </FormControl>

        <Button
          backgroundColor={"#DF2935"}
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
