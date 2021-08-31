import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import InputPlacesAutocomplete from './components/input-places-autocomplete';

export default function InputLocation(props) {
  const { id, className, translations, placeholder, searchOptions, value, onChange } = props;
  const [searchValue, setSearch] = useState(value.description || '');
  const [locationId, setLocationId] = useState(value.placeId || '');

  const onBlur = () => {
    if (!locationId && searchValue) {
      setSearch('');
      onChange(locationId);
    }
  };

  const onChangePlace = value => {
    setSearch(value);
    setLocationId('');
  };

  const onClear = () => {
    setSearch('');
    setLocationId('');
    onChange(null);
  };

  const onSelect = (locationName, locationId, locationInfo) => {
    setSearch(locationName);
    setLocationId(locationId);
    onChange(locationInfo);
  };

  return (
    <PlacesAutocomplete
      searchOptions={searchOptions}
      value={searchValue}
      onChange={onChangePlace}
      onSelect={onSelect}
      googleCallbackName="googlePlacesCb">
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <InputPlacesAutocomplete 
          id={id}
          autofocus
          className={className}
          placeholder={placeholder}
          searchValue={searchValue}
          getInputProps={getInputProps}
          getSuggestionItemProps={getSuggestionItemProps}
          suggestions={suggestions}
          translations={translations}
          onBlur={onBlur}
          onClear={onClear}>
        </InputPlacesAutocomplete>
      )}
    </PlacesAutocomplete>
  );
}