import { ImageResponse } from 'next/og';
import { findMuralInCollection } from '@/data/collections';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Mercedes Costal';

interface Props {
  params: { locale: string; collection: string; mural: string };
}

export default async function OpengraphImage({ params }: Props) {
  const { locale, collection, mural } = params;
  const { collection: foundCollection, mural: foundMural } = findMuralInCollection(collection, mural);

  const isEs = locale === 'es';
  const isPattern = foundMural?.keywords.some(k =>
    ['patrón', 'patron', 'pattern'].includes(k.toLowerCase())
  );
  const typeLabel = isPattern ? (isEs ? 'PATTERN' : 'PATTERN') : (isEs ? 'MURAL' : 'MURAL');
  const collectionLabel = isEs ? 'Colección' : 'Collection';
  const muralTitle = foundMural?.title ?? '';
  const collectionTitle = foundCollection?.title ?? '';

  // Layout textual on-brand: fondo crema/blanco, tipografía centrada,
  // pequeño "MC" arriba como sello. Pensado para WhatsApp / IG share —
  // se ve premium y editorial sin depender de fetching de assets.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#f5f1ea',
          color: '#0a0a0a',
          padding: '64px 80px',
          fontFamily: 'serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            letterSpacing: '0.5em',
            fontSize: 18,
            textTransform: 'uppercase',
          }}
        >
          <span>Mercedes Costal</span>
          <span style={{ opacity: 0.5 }}>{isEs ? 'Hecho en Argentina' : 'Made in Argentina'}</span>
        </div>

        {/* Center block */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 28,
            paddingBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 16,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#0a0a0a99',
            }}
          >
            {collectionLabel} {collectionTitle}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 24,
              fontSize: 92,
              fontWeight: 500,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            <span style={{ fontWeight: 300, opacity: 0.55, fontSize: 56 }}>{typeLabel}</span>
            <span>{muralTitle}</span>
          </div>
          <div style={{ width: 64, height: 1, background: '#0a0a0a', opacity: 0.4 }} />
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              opacity: 0.6,
              maxWidth: 760,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {isEs
              ? 'No diseñamos papeles. Creamos atmósferas.'
              : 'We don’t design papers. We create atmospheres.'}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            letterSpacing: '0.3em',
            fontSize: 16,
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          <span>mercedescostal.com.ar</span>
          <span>{isEs ? 'Wallpapers de autor' : 'Author wallpapers'}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
