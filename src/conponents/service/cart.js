import Cookies from 'universal-cookie';

const keyStorageCart = 'cartStorageCookies';
const cookies = new Cookies();

export const cartService = {
    get() {
        return cookies.get(keyStorageCart);
    },
    set(cart) {
        cookies.set(keyStorageCart, cart, { path: '/' })
    },
    clear() {
        cookies.remove(keyStorageCart, { path: '/' })
    }
}