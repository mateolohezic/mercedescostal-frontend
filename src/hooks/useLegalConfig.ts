'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/helpers/api';

interface LegalConfig {
  termsVersion: string;
}

// Trae la versión vigente de los términos desde el backend. Si /terminos cambia,
// el back invalida las aceptaciones viejas comparando con esta versión y obliga
// al usuario a refrescar y re-aceptar.
export function useLegalConfig() {
  const [data, setData] = useState<LegalConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<LegalConfig>('/api/config/legal')
      .then(setData)
      .catch(err => setError(err instanceof Error ? err.message : 'No se pudo cargar la configuración legal'));
  }, []);

  return { data, error };
}
