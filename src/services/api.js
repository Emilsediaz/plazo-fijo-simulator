/**
 * Servicio para consumir las APIs de Daira.
 *
 * Endpoints:
 *   - POST /webhook/67479a90-... → cálculo de intereses
 *   - GET  /webhook/7c682683-... → historial de simulaciones
 */

const API_ENDPOINTS = {
  CALCULATE: 'https://auto.dairaitgroup.com.ar/webhook/67479a90-b220-4b6a-b082-54ae3de35fe4',
  HISTORY: 'https://auto.dairaitgroup.com.ar/webhook/7c682683-153c-4543-87ef-bdf7b52745ee',
};

const HISTORY_LIMIT = 20;

/**
 * Redondea a dos decimales (centavos), evitando artefactos de coma flotante.
 */
const round2 = (value) => Math.round(Number(value) * 100) / 100;

/**
 * Normaliza la respuesta del cálculo a un formato consistente para la UI.
 *
 * La API responde con:
 *   {
 *     capital_invertido: number,
 *     plazo_en_dias: number,
 *     tna: number,
 *     interes_ganado: number,
 *     tasa_efectiva_periodo: number
 *   }
 *
 * Nota: la API no devuelve `monto_total` explícito, lo calculamos
 * como capital + interés.
 */
const normalizeSimulationResponse = (raw) => {
  // Tolerancia: la API podría envolver la respuesta en un array o en una clave "data".
  const data = Array.isArray(raw) ? raw[0] : raw?.data ?? raw;

  const capital = Number(data.capital_invertido);
  const interes = Number(data.interes_ganado);

  return {
    capitalInvertido: round2(capital),
    plazoEnDias: Number(data.plazo_en_dias),
    tnaAplicada: Number(data.tna),
    interesesGanados: round2(interes),
    montoTotal: round2(capital + interes),
    tasaEfectivaPeriodo: Number(data.tasa_efectiva_periodo),
  };
};

/**
 * Normaliza una fila del historial.
 *
 * La API devuelve filas con claves que tienen espacios y mayúsculas:
 *   {
 *     "Capital": number,
 *     "Plazo en días": number,
 *     "TNA aplicada": number,
 *     "Intereses ganados": number,
 *     "Monto total": number
 *   }
 */
const normalizeHistoryRow = (row, index) => ({
  id: index,
  capital: round2(row['Capital']),
  plazoEnDias: Number(row['Plazo en días']),
  tnaAplicada: Number(row['TNA aplicada']),
  interesesGanados: round2(row['Intereses ganados']),
  montoTotal: round2(row['Monto total']),
});

/**
 * POST: Calcula los intereses ganados de un plazo fijo.
 */
export const calcularIntereses = async ({ capital, plazo, tna }) => {
  const payload = {
    capital_invertido: Number(capital),
    plazo_en_dias: Number(plazo),
    tna: Number(tna),
  };

  const response = await fetch(API_ENDPOINTS.CALCULATE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error al calcular intereses (${response.status})`);
  }

  const data = await response.json();
  return normalizeSimulationResponse(data);
};

/**
 * GET: Obtiene el historial de simulaciones (limitado a los primeros 20 registros).
 */
export const obtenerHistorial = async () => {
  const response = await fetch(API_ENDPOINTS.HISTORY, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`Error al obtener el historial (${response.status})`);
  }

  const json = await response.json();
  const rows = Array.isArray(json) ? json : json?.data ?? [];

  return rows.slice(0, HISTORY_LIMIT).map(normalizeHistoryRow);
};
