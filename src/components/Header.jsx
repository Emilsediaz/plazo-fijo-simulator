export default function Header() {
  return (
    <header className="border-b border-ink-200/60 bg-ink-50/95 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-moss-800 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-gold-400"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                d="M3 17l6-6 4 4 8-8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-moss-900 leading-none">
              Capital
              <span className="text-gold-600">.</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-moss-700/70 mt-0.5">
              Simulador de inversiones
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-moss-700/60 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-moss-500 animate-pulse" />
          Sistema operativo
        </div>
      </div>
    </header>
  );
}
