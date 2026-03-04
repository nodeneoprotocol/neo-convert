'use client';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="pt-BR">
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: '#0a0a0f',
            color: '#e8e8f0',
            fontFamily: 'system-ui, sans-serif',
            padding: '24px',
          }}
        >
          <div style={{ maxWidth: 560, textAlign: 'center' }}>
            <h1 style={{ color: '#00ff9d', marginBottom: 12 }}>Ocorreu um erro crítico</h1>
            <p style={{ color: '#9aa0aa', marginBottom: 16 }}>
              {error?.message || 'Erro interno do servidor'}
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: '#00ff9d',
                color: '#000',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
