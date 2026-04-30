import { useState } from 'react';
import { validateForm, VALIDATION } from '../utils/validate';

export default function SimulationForm({ onSubmit, isLoading }) {
  const [values, setValues] = useState({ capital: '', plazo: '', tna: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Limpiar el error del campo apenas el usuario empieza a corregir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field) => () => {
    // Solo validamos al perder foco si el usuario llegó a escribir algo.
    // Evita marcar "campo requerido" apenas el usuario tabula sin escribir.
    if (!values[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const { errors: newErrors } = validateForm(values);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: newErrors, isValid } = validateForm(values);
    setErrors(newErrors);
    setTouched({ capital: true, plazo: true, tna: true });
    if (isValid) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Field
        label="Monto a invertir"
        hint={`Mínimo $${VALIDATION.CAPITAL_MIN.toLocaleString('es-AR')}`}
        error={touched.capital ? errors.capital : undefined}
        prefix="$"
      >
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min={VALIDATION.CAPITAL_MIN}
          value={values.capital}
          onChange={handleChange('capital')}
          onBlur={handleBlur('capital')}
          placeholder="100.000"
          className="input-field"
          disabled={isLoading}
        />
      </Field>

      <Field
        label="Plazo en días"
        hint={`Mínimo ${VALIDATION.PLAZO_MIN} días`}
        error={touched.plazo ? errors.plazo : undefined}
      >
        <input
          type="number"
          inputMode="numeric"
          step="1"
          min={VALIDATION.PLAZO_MIN}
          value={values.plazo}
          onChange={handleChange('plazo')}
          onBlur={handleBlur('plazo')}
          placeholder="30"
          className="input-field"
          disabled={isLoading}
        />
      </Field>

      <Field
        label="TNA"
        hint={`Tasa Nominal Anual · Máximo ${VALIDATION.TNA_MAX}%`}
        error={touched.tna ? errors.tna : undefined}
        suffix="%"
      >
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min={VALIDATION.TNA_MIN}
          max={VALIDATION.TNA_MAX}
          value={values.tna}
          onChange={handleChange('tna')}
          onBlur={handleBlur('tna')}
          placeholder="35.50"
          className="input-field"
          disabled={isLoading}
        />
      </Field>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-moss-800 hover:bg-moss-900 disabled:bg-moss-800/50 disabled:cursor-not-allowed text-ink-50 font-medium py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Calculando…</span>
          </>
        ) : (
          <>
            <span>Calcular rendimiento</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, hint, error, children, prefix, suffix }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-medium text-moss-900">{label}</label>
        {hint && !error && (
          <span className="text-xs text-moss-700/60 font-mono">{hint}</span>
        )}
        {error && <span className="text-xs text-red-700 font-medium">{error}</span>}
      </div>
      <div className={`field-wrap ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}>
        {prefix && <span className="field-affix field-prefix">{prefix}</span>}
        {children}
        {suffix && <span className="field-affix field-suffix">{suffix}</span>}
      </div>
      <style>{`
        .field-wrap {
          position: relative;
        }
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgb(217 214 196 / 0.8);
          border-radius: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          color: rgb(15 26 22);
          transition: all 0.2s;
          outline: none;
          box-sizing: border-box;
        }
        .field-wrap.has-prefix .input-field {
          padding-left: 2.25rem;
        }
        .field-wrap.has-suffix .input-field {
          padding-right: 2.25rem;
        }
        .field-affix {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          color: rgba(45, 68, 39, 0.55);
          pointer-events: none;
          line-height: 1;
        }
        .field-prefix {
          left: 1rem;
        }
        .field-suffix {
          right: 1rem;
        }
        .input-field:focus {
          border-color: rgb(45 68 39);
          background: white;
          box-shadow: 0 0 0 3px rgba(45, 68, 39, 0.08);
        }
        .input-field:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
  );
}
