export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatPriceShort = (price) => {
  return `$${price.toFixed(2)}`;
};
