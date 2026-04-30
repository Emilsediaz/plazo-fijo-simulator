/**
 * Reglas de validación para el formulario de simulación.
 */
export const VALIDATION = {
  CAPITAL_MIN: 1000,
  PLAZO_MIN: 30,
  TNA_MAX: 50,
  TNA_MIN: 0,
};

export const validateForm = ({ capital, plazo, tna }) => {
  const errors = {};

  const capitalNum = Number(capital);
  const plazoNum = Number(plazo);
  const tnaNum = Number(tna);

  if (!capital || Number.isNaN(capitalNum)) {
    errors.capital = 'Ingresá un monto válido';
  } else if (capitalNum < VALIDATION.CAPITAL_MIN) {
    errors.capital = `El monto mínimo es $${VALIDATION.CAPITAL_MIN.toLocaleString('es-AR')}`;
  }

  if (!plazo || Number.isNaN(plazoNum)) {
    errors.plazo = 'Ingresá un plazo válido';
  } else if (plazoNum < VALIDATION.PLAZO_MIN) {
    errors.plazo = `El plazo mínimo es ${VALIDATION.PLAZO_MIN} días`;
  } else if (!Number.isInteger(plazoNum)) {
    errors.plazo = 'El plazo debe ser un número entero';
  }

  if (tna === '' || tna === null || Number.isNaN(tnaNum)) {
    errors.tna = 'Ingresá una TNA válida';
  } else if (tnaNum < VALIDATION.TNA_MIN) {
    errors.tna = 'La TNA no puede ser negativa';
  } else if (tnaNum > VALIDATION.TNA_MAX) {
    errors.tna = `La TNA máxima es ${VALIDATION.TNA_MAX}%`;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
