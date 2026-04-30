import { formatCurrency, formatPercent } from '../utils/format';
import ErrorState from './ErrorState';

export default function ResultsCard({ result, isLoading, error, onRetry }) {
  if (isLoading) {
    return <ResultsSkeleton />;
  }

  if (error && !result) {
    return (
      <ErrorState
        title="No se pudo calcular tu inversión"
        message="Hubo un problema al consultar la API. Intentá de nuevo en unos segundos."
        onRetry={onRetry}
      />
    );
  }

  if (!result) {
    return <EmptyState />;
  }

  return (
    <div className="animate-results-in">
      {/* Encabezado destacado: monto total */}
      <div className="bg-moss-900 rounded-2xl p-8 text-ink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400/80 mb-3 animate-stagger-1">
            Monto total al vencimiento
          </p>
          <p className="font-display text-5xl font-medium tracking-tight animate-stagger-2">
            {formatCurrency(result.montoTotal)}
          </p>
          <div className="flex items-center gap-2 mt-3 text-sm text-ink-200/80 animate-stagger-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gold-400">
              <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-mono">+{formatCurrency(result.interesesGanados)} en intereses</span>
          </div>
        </div>
      </div>

      {/* Desglose en grid */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <DetailCell label="Capital invertido" value={formatCurrency(result.capitalInvertido)} delay={4} />
        <DetailCell label="Plazo" value={`${result.plazoEnDias} días`} delay={5} />
        <DetailCell label="TNA aplicada" value={formatPercent(result.tnaAplicada)} accent delay={6} />
        <DetailCell label="Intereses ganados" value={formatCurrency(result.interesesGanados)} accent delay={7} />
      </div>
    </div>
  );
}

function DetailCell({ label, value, accent = false, delay = 0 }) {
  return (
    <div
      className={`p-4 rounded-xl border animate-stagger-${delay} ${
        accent
          ? 'bg-moss-800/5 border-moss-800/20'
          : 'bg-white/60 border-ink-200/60'
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.15em] text-moss-700/60 mb-1.5">{label}</p>
      <p className="font-mono text-base text-moss-900 font-medium">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-ink-200 rounded-2xl bg-white/30 min-h-[400px]">
      <div className="w-14 h-14 rounded-full bg-moss-800/5 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-moss-700/50">
          <path
            d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="font-display text-lg text-moss-900 mb-1">Tu simulación aparecerá acá</p>
      <p className="text-sm text-moss-700/70 max-w-xs">
        Completá los datos del formulario y obtené una proyección detallada de tu inversión.
      </p>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="bg-moss-900 rounded-2xl p-8 h-44 shimmer" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 rounded-xl shimmer" />
        ))}
      </div>
    </div>
  );
}
