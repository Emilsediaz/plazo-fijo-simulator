/**
 * Estado de error con botón de reintento.
 * Se usa tanto en el cálculo como en el historial.
 */
export default function ErrorState({ title, message, onRetry, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-start gap-3 p-3 bg-red-50/80 border border-red-200 rounded-lg animate-fade-in">
        <ErrorIcon className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-900">{title}</p>
          {message && <p className="text-xs text-red-700/80 mt-0.5">{message}</p>}
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-xs font-medium text-red-800 hover:text-red-900 mt-2 inline-flex items-center gap-1 group"
            >
              <RetryIcon className="w-3 h-3 transition-transform group-hover:-rotate-90" />
              Reintentar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-red-200 bg-red-50/40 rounded-2xl min-h-[400px] animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <ErrorIcon className="w-6 h-6 text-red-700" />
      </div>
      <p className="font-display text-lg text-red-900 mb-1">{title}</p>
      {message && <p className="text-sm text-red-800/70 max-w-xs mb-5">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-sm font-medium transition-all duration-200 group"
        >
          <RetryIcon className="w-4 h-4 transition-transform group-hover:-rotate-180 duration-500" />
          Reintentar
        </button>
      )}
    </div>
  );
}

function ErrorIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}

function RetryIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
      <path
        d="M3 12a9 9 0 0115.5-6.4L21 8M21 3v5h-5M21 12a9 9 0 01-15.5 6.4L3 16M3 21v-5h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
