import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SimulationForm from './components/SimulationForm';
import ResultsCard from './components/ResultsCard';
import HistoryModal from './components/HistoryModal';
import ErrorState from './components/ErrorState';
import { calcularIntereses, obtenerHistorial } from './services/api';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcError, setCalcError] = useState(null);
  const [lastValues, setLastValues] = useState(null);

  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  const handleCalculate = async (values) => {
    setIsCalculating(true);
    setCalcError(null);
    setLastValues(values);
    try {
      const data = await calcularIntereses(values);
      setResult(data);
    } catch (err) {
      setCalcError(err.message || 'Error al calcular. Intentá de nuevo.');
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleRetryCalc = () => {
    if (lastValues) handleCalculate(lastValues);
  };

  const handleOpenHistory = async () => {
    setIsHistoryOpen(true);
    setIsLoadingHistory(true);
    setHistoryError(null);
    try {
      const data = await obtenerHistorial();
      setHistory(data);
    } catch (err) {
      setHistoryError(err.message || 'No se pudo cargar el historial.');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleRetryHistory = () => {
    handleOpenHistory();
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className='flex-1 flex flex-col'>
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 lg:py-16">
        {/* Hero */}
        <div className="max-w-2xl mb-12 lg:mb-16 animate-fade-in">
          <p className="text-xs uppercase tracking-[0.25em] text-moss-700/70 font-mono mb-4">
            ◆ Proyección de rendimiento
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-moss-900 leading-[1.05] tracking-tight text-balance">
            Calculá lo que tu dinero
            <br />
            <span className="italic text-moss-700">puede generar.</span>
          </h2>
          <p className="text-moss-700/80 mt-5 text-lg leading-relaxed max-w-xl">
            Simulá tu plazo fijo con tasas reales de mercado. Resultados precisos,
            comparables y al alcance de un clic.
          </p>
        </div>

        {/* Layout principal: formulario + resultados */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
          {/* Columna izquierda: formulario */}
          <div className="bg-white/50 backdrop-blur-sm border border-ink-200/60 rounded-2xl p-7 h-fit lg:sticky lg:top-24">
            <div className="mb-6">
              <h3 className="font-display text-xl font-medium text-moss-900">
                Datos de la inversión
              </h3>
              <p className="text-sm text-moss-700/70 mt-1">
                Completá los tres campos para iniciar.
              </p>
            </div>
            <SimulationForm onSubmit={handleCalculate} isLoading={isCalculating} />

            {calcError && (
              <div className="mt-4">
                <ErrorState
                  compact
                  title="No se pudo calcular"
                  message={calcError}
                  onRetry={handleRetryCalc}
                />
              </div>
            )}
          </div>

          {/* Columna derecha: resultados */}
          <div>
            <ResultsCard
              result={result}
              isLoading={isCalculating}
              error={calcError}
              onRetry={handleRetryCalc}
            />
          </div>
        </div>

        {/* Sección historial */}
        <div className="mt-16 pt-10 border-t border-ink-200/60">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-medium text-moss-900">
                Historial de simulaciones
              </h3>
              <p className="text-moss-700/70 mt-1 text-sm max-w-md">
                Accedé a las últimas 20 simulaciones registradas en el sistema.
              </p>
            </div>
            <button
              onClick={handleOpenHistory}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-moss-800/30 bg-white/50 hover:bg-moss-800 hover:text-ink-50 hover:border-moss-800 text-moss-900 font-medium text-sm transition-all duration-200 group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  strokeLinecap="round"
                />
              </svg>
              Ver historial
              <span className="text-xs font-mono opacity-60 group-hover:opacity-100">→</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-ink-200/60 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-moss-700/60 font-mono">
          <span>© 2026 Capital. Simulador de plazo fijo.</span>
          <span>Datos provistos por Daira</span>
        </div>
      </footer>

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        isLoading={isLoadingHistory}
        error={historyError}
        onRetry={handleRetryHistory}
      />
    </div>
    </div>
  );
}