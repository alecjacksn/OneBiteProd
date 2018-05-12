const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_YB6wHmSddKhTU9pWhBAypbZ8'
  : 'pk_test_KdcdiZKQFCWDAMl7OU0rg5Uz';

export default STRIPE_PUBLISHABLE;