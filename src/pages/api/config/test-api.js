export default async function testApi(req, res) {
	try {
		res.json({ message: 'It is working' });
	} catch (error) {
		res.status(500).json(error);
	}
}
