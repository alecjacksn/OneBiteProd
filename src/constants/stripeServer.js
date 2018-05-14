const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://onebite.com/'
  : 'http://localhost:3232/';

export default PAYMENT_SERVER_URL;