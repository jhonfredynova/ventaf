export const sendNotification = async (config, emailLibrary, emailData) => {
  try {
    emailLibrary.setApiKey(config.key);

    await emailLibrary.send({
      from: 'noreply@construccionytecnologiasas.com',
      to: emailData.to,
      templateId: config.template,
      'dynamic_template_data': {
        slogan: 'Construccion y Tecnologia SAS - https://construccionytecnologiasas.com',
        subject: emailData.subject,
        message: emailData.message
      }
    });
  } catch (error) {
    console.error('Error sending subscription notification', emailData, error);
  }
};