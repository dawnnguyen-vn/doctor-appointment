/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { PATHS } from "../constants/path";

const FETCH_TYPES = {
  CITIES: "FETCH_CITIES",
  DISTRICTS: "FETCH_DISTRICTS",
  WARDS: "FETCH_WARDS"
};

async function fetchLocationOptions(fetchType, locationId) {
  let url;
  switch (fetchType) {
    case FETCH_TYPES.CITIES: {
      url = "https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/cities.json";
      break;
    }
    case FETCH_TYPES.DISTRICTS: {
      url = `https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/districts/${locationId}.json`;
      break;
    }
    case FETCH_TYPES.WARDS: {
      url = `https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/wards/${locationId}.json`;
      break;
    }
    default: {
      return [];
    }
  }
  const locations = (await axios.get(url)).data["data"];
  return locations.map(({ id, name }) => ({ value: id, label: name }));
}

async function fetchInitialData() {
  const { cityId, districtId, wardId } = (await axios.get("https://raw.githubusercontent.com/nhidh99/codergamo/master/004-location-selects/locations/location.json")).data;
  const [cities, districts, wards] = await Promise.all([
    fetchLocationOptions(FETCH_TYPES.CITIES),
    fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityId),
    fetchLocationOptions(FETCH_TYPES.WARDS, districtId)
  ]);
  return {
    cityOptions: cities,
    districtOptions: districts,
    wardOptions: wards,
    selectedCity: cities.find((c) => c.value === cityId),
    selectedDistrict: districts.find((d) => d.value === districtId),
    selectedWard: wards.find((w) => w.value === wardId)
  };
}

function useLocationForm(shouldFetchInitialLocation) {
  const [stateLocation, setStateLocation] = useState({
    cityOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedCity: null,
    selectedDistrict: null,
    selectedWard: null
  });

  const { selectedCity, selectedDistrict } = stateLocation;

  useEffect(() => {
    (async function () {
      if (shouldFetchInitialLocation) {
        const initialData = await fetchInitialData();
        setStateLocation(initialData);
      } else {
        const options = await fetchLocationOptions(FETCH_TYPES.CITIES);
        setStateLocation({ ...stateLocation, cityOptions: options });
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (!selectedCity) return;
      const options = await fetchLocationOptions(
        FETCH_TYPES.DISTRICTS,
        selectedCity.value
      );
      setStateLocation({ ...stateLocation, districtOptions: options });
    })();
  }, [selectedCity]);

  useEffect(() => {
    (async function () {
      if (!selectedDistrict) return;
      const options = await fetchLocationOptions(
        FETCH_TYPES.WARDS,
        selectedDistrict.value
      );
      setStateLocation({ ...stateLocation, wardOptions: options });
    })();
  }, [selectedDistrict]);

  function onCitySelect(option) {
    if (option !== selectedCity) {
        setStateLocation({
        ...stateLocation,
        districtOptions: [],
        wardOptions: [],
        selectedCity: option,
        selectedDistrict: null,
        selectedWard: null
      });
    }
  }

  function onDistrictSelect(option) {
    if (option !== selectedDistrict) {
        setStateLocation({
        ...stateLocation,
        wardOptions: [],
        selectedDistrict: option,
        selectedWard: null
      });
    }
  }

  function onWardSelect(option) {
    setStateLocation({ ...stateLocation, selectedWard: option });
  }

  function onSubmit(e) {
    e.preventDefault();
    window.location.reload();
  }

  return { stateLocation, onCitySelect, onDistrictSelect, onWardSelect, onSubmit };
}

export default useLocationForm;
