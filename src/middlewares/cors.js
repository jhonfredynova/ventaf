import Cors from 'cors';

export default Cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});
