import { useEffect } from 'react';
import { formatCurrency, formatPercent } from '../utils/format';
import ErrorState from './ErrorState';

export default function HistoryModal({ isOpen, onClose, history, isLoading, error, onRetry }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" />
      <div
        className="relative bg-ink-50 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-ink-200">
          <div>
            <h2 className="font-display text-2xl font-medium text-moss-900">
              Historial de simulaciones
            </h2>
            <p className="text-sm text-moss-700/70 mt-1">
              {history.length > 0
                ? `${history.length} registros sincronizados`
                : 'Consultando registros...'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-ink-200/60 flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto">
          {isLoading && <TableSkeleton />}
          {error && !isLoading && (
            <div className="p-8">
              <ErrorState
                title="No se pudo cargar el historial"
                message={error}
                onRetry={onRetry}
              />
            </div>
          )}
          {!isLoading && !error && history.length === 0 && (
            <div className="p-8 text-center text-moss-700/70">
              No hay registros en el historial.
            </div>
          )}
          {!isLoading && !error && history.length > 0 && <HistoryTable rows={history} />}
        </div>
      </div>
    </div>
  );
}

function HistoryTable({ rows }) {
  return (
    <table className="w-full text-sm">
      <thead className="sticky top-0 bg-ink-50 z-10">
        <tr className="border-b border-ink-200">
          <Th>#</Th>
          <Th>Capital</Th>
          <Th>Plazo</Th>
          <Th>TNA</Th>
          <Th>Intereses</Th>
          <Th align="right">Monto total</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr
            key={row.id ?? idx}
            className="border-b border-ink-200/40 hover:bg-moss-800/[0.02] transition-colors animate-row-in"
            style={{ animationDelay: `${Math.min(idx * 30, 600)}ms`, animationFillMode: 'backwards' }}
          >
            <Td className="text-moss-700/50 font-mono text-xs">
              {String(idx + 1).padStart(2, '0')}
            </Td>
            <Td className="font-mono">{formatCurrency(row.capital)}</Td>
            <Td className="font-mono">{row.plazoEnDias} días</Td>
            <Td className="font-mono text-moss-700">{formatPercent(row.tnaAplicada)}</Td>
            <Td className="font-mono text-gold-600">+{formatCurrency(row.interesesGanados)}</Td>
            <Td align="right" className="font-mono font-medium text-moss-900">
              {formatCurrency(row.montoTotal)}
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Th({ children, align = 'left' }) {
  return (
    <th
      className={`px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-moss-700/60 font-medium text-${align}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = '', align = 'left' }) {
  return <td className={`px-6 py-3.5 text-${align} ${className}`}>{children}</td>;
}

function TableSkeleton() {
  return (
    <div className="p-6 space-y-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-10 rounded shimmer" />
      ))}
    </div>
  );
}
