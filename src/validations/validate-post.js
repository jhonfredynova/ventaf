export default modelData => {
  const errors = {};

  if (!modelData.location?.description?.trim()) {
    errors.location = {
      ...errors.location,
      description: 'enterLocation'
    };
  }

  if (!modelData.location?.placeId?.trim()) {
    errors.location = {
      ...errors.location,
      placeId: 'selectLocation'
    };
  }

  if (!modelData.price?.currency?.trim()) {
    errors.price = {
      ...errors.price,
      currency: 'selectCurrency'
    };
  }

  if (!modelData.price?.value) {
    errors.price = {
      ...errors.price,
      value: 'enterPrice'
    };
  } else if (Number.isNaN(modelData.price?.value)) {
    errors.price = {
      ...errors.price,
      value: 'fieldNumberInvalid'
    };
  }

  if (!modelData.seller?.phone?.prefix?.trim()) {
    errors.seller = {
      ...errors.seller,
      phone: {
        ...errors.seller?.phone,
        prefix: 'selectPhonePrefix'
      }
    };
  }

  if (!modelData.seller?.phone?.number?.trim()) {
    errors.seller = {
      ...errors.seller,
      phone: {
        ...errors.seller?.phone,
        number: 'enterPhoneNumber'
      }
    };
  }

  if (!modelData.description?.trim()) {
    errors.description = 'enterDescription';
  }

  if (modelData.photos?.length === 0) {
    errors.photos = 'selectPhotos';
  }

  return errors;
};