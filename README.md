# Simulador de Plazo Fijo

Aplicación web que permite proyectar las ganancias de un plazo fijo en pesos argentinos. Construida como reto técnico para Daira.

## Stack

- **React 18** + **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **Fetch API** (consumo de servicios)

## Funcionalidades

- Formulario validado con tres campos: monto, plazo y TNA.
- Cálculo de intereses vía API (POST).
- Visualización de resultados con monto total, intereses, capital, plazo y TNA aplicada.
- Historial de las últimas 20 simulaciones (GET) en una tabla modal.
- Estados de carga (loading) en ambas operaciones asincrónicas.
- Manejo de errores con feedback al usuario.
- Diseño responsive (mobile-first) con estética financiera moderna.
- Formateo monetario en pesos argentinos con dos decimales.

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx          # Encabezado de la app
│   ├── SimulationForm.jsx  # Formulario de simulación
│   ├── ResultsCard.jsx     # Tarjeta de resultados
│   └── HistoryModal.jsx    # Modal con tabla de historial
├── services/
│   └── api.js              # Capa de consumo de la API de Daira
├── utils/
│   ├── format.js           # Formateadores (moneda, porcentaje)
│   └── validate.js         # Validación del formulario
├── App.jsx                 # Componente raíz
├── main.jsx                # Punto de entrada
└── index.css               # Estilos base + Tailwind
```

## Validaciones del formulario

| Campo  | Regla                              |
| ------ | ---------------------------------- |
| Monto  | Mínimo $1.000                      |
| Plazo  | Mínimo 30 días, número entero      |
| TNA    | Entre 0% y 50%                     |

## API

El servicio `src/services/api.js` consume dos endpoints de Daira:

- **POST** `/webhook/67479a90-...` → cálculo de intereses
- **GET** `/webhook/7c682683-...` → historial de simulaciones

La capa de servicio incluye un **normalizador tolerante** que mapea distintos
nombres de campos posibles (`capital`, `capital_invertido`, `capitalInvertido`, etc.)
a un formato consistente. Esto permite que la app funcione aunque la API
devuelva los datos en distintos formatos.

## Notas de diseño

La paleta toma referencias de la fintech premium:

- Verde musgo profundo como color principal (`moss-900`)
- Crema cálido como fondo (`ink-50`)
- Dorado como acento (`gold-500`)
- Tipografía Fraunces (display) + Outfit (texto) + JetBrains Mono (números)

Todos los valores monetarios usan tipografía monoespaciada para alinear cifras
verticalmente, una convención común en herramientas financieras.
