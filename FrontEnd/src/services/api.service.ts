import axios from 'axios';

export async function getHelloString() {
    const result = await axios.get('api/hello');
    return result.data as string;
}