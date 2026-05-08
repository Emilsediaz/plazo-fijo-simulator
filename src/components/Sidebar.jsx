// src/components/Sidebar.jsx
export default function Sidebar() {
  return ( 
    <aside className="w-52 bg-moss-900 text-ink-50 min-h-screen p-6"> 
    <div> 
      <h1 className="font-display text-xl font-semibold">
        Capital 
        <span className="text-gold-400">.</span>
        </h1><p clasName="text-[10px] uppercase tracking-[0.2em] text-ink-200/70 mt-1">
        Simulador 
        </p>
        </div>
        <nav className="mt-10 flex flex-col gap-1"> 
          <button>Dashboard</button>
          <button>Simulador</button>
          <button>Reportes</button>
        </nav>
    </aside>
  );
}

