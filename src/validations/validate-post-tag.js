const { formatTag } = require('../text-utils');
const { validateModel } = require('../validation-utils');

export default (config, modelData) => {
  modelData.name = formatTag(modelData.name);
  const modelValidations = [
    {
      property: 'createdAt',
      type: 'number',
      rules: { required: true }
    },
    {
      property: 'icon',
      type: 'string',
      rules: { required: true }
    },
    {
      property: 'name',
      type: 'string',
      rules: { required: true }
    },
    {
      property: 'views',
      type: 'number',
      rules: { required: true }
    },
    {
      property: 'updatedAt',
      type: 'number'
    }
  ];
  const errors = validateModel(config, modelValidations, modelData);

  return errors;
};
