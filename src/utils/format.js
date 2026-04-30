/**
 * Formatea un número como moneda en pesos argentinos con 2 decimales.
 */
export const formatCurrency = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return '—';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

/**
 * Formatea un número como porcentaje con 2 decimales.
 * Asume que el valor viene en formato porcentual (ej: 25 para 25%).
 */
export const formatPercent = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return '—';
  return `${num.toFixed(2)}%`;
};

/**
 * Redondea un número a 2 decimales.
 */
export const toTwoDecimals = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100) / 100;
};
