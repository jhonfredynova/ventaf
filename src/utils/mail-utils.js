// eslint-disable-next-line import/prefer-default-export
export const sendNotification = async (config, emailLibrary, emailData) => {
	try {
		emailLibrary.setApiKey(config.key);

		await emailLibrary.send({
			from: 'noreply@ventaf.com',
			to: emailData.to,
			templateId: config.template,
			dynamic_template_data: {
				slogan: `Ventaf - ${process.env.NEXT_PUBLIC_SERVER_URL}`,
				subject: emailData.subject,
				message: emailData.message,
			},
		});
	} catch (error) {
		console.error('Error sending subscription notification', emailData, error);
	}
};
