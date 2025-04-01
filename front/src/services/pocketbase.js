import PocketBase from 'pocketbase';
import config from '../../config';

const pocketbase = new PocketBase(config.BASE_URL);

export default pocketbase;