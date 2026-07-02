import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://mercedescostal.com.ar'),
  title: 'Términos y condiciones de compra | Mercedes Costal',
  description: 'Condiciones legales de compra en mercedescostal.com.ar: medidas, plazos, devoluciones, propiedad intelectual y datos personales.',
  alternates: { canonical: '/terminos' },
};

// Si actualizás este texto, también actualizá TERMS_VERSION en el backend (src/config/legal.ts)
// para invalidar las aceptaciones previas y mantener trazabilidad jurídica.
const TERMS_VERSION = '2026-06-v1';
const LAST_UPDATED = '23 de junio de 2026';

export default function TermsPage() {
  return (
    <main className="w-full grow flex flex-col items-center font-truetypewritter">
      <div className="max-w-3xl w-full px-6 md:px-12 py-24 lg:py-48 space-y-12">

        {/* Header */}
        <header className="space-y-3">
          <p className="font-trueTypewriter text-[11px] uppercase tracking-[0.18em] text-black/40">
            Términos y condiciones de compra
          </p>
          <h1 className="font-gillsans text-3xl md:text-4xl font-medium uppercase tracking-wider">
            Cómo funciona comprar en mercedescostal.com.ar
          </h1>
          <p className="text-sm text-black/50">
            Versión <strong>{TERMS_VERSION}</strong> · Última actualización: {LAST_UPDATED}
          </p>
        </header>

        {/* 1. Sobre tu pedido */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            1. Sobre tu pedido
          </h2>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">1.1 Producto a medida</h3>
            <p className="text-sm leading-relaxed text-black/70">
              Los empapelados de Mercedes Costal se producen <strong>a medida</strong> según las dimensiones
              que ingresás al momento de comprar. Tu pedido se fabrica exclusivamente para vos y no se vende a otro cliente.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">1.2 Las medidas son tu responsabilidad</h3>
            <p className="text-sm leading-relaxed text-black/70">
              Las medidas que cargás en el formulario son la base exacta del pedido. Revisalas con cuidado:
              una vez confirmado el pago, la producción arranca con esas medidas y
              <strong> no podemos hacer cambios ni emitir reembolsos por errores de medición</strong>.
            </p>
            <p className="text-sm leading-relaxed text-black/70">
              Para cada pared sumamos un excedente técnico de <strong>10 cm en alto</strong> y, cuando el ancho no es múltiplo de 50 cm,
              hasta <strong>50 cm de ancho</strong> adicional para cubrir paneles completos. Este excedente está incluido en el precio cotizado.
            </p>
          </div>
        </section>

        {/* 2. Precios y pago */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            2. Precios y pago
          </h2>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">2.1 Precios</h3>
            <p className="text-sm leading-relaxed text-black/70">
              Todos los precios están en pesos argentinos (ARS) e <strong>incluyen IVA 21%</strong>.
              El precio por m² es el vigente al momento de ingresar el pedido.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">2.2 Pago</h3>
            <p className="text-sm leading-relaxed text-black/70">
              El pago se procesa a través de Mercado Pago. Aceptamos tarjetas y medios disponibles en su plataforma.
              Mercedes Costal <strong>no almacena datos de tu tarjeta</strong> — eso lo maneja Mercado Pago bajo sus propias políticas.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">2.3 Envío</h3>
            <ul className="space-y-1.5 text-sm leading-relaxed text-black/70 pl-5 list-disc marker:text-black/30">
              <li>El costo del envío se cotiza al ingresar el código postal a través de Andreani.</li>
              <li>Pedidos de <strong>más de 20 m² tienen envío bonificado</strong> (no lo pagás).</li>
              <li>El servicio de transporte es responsabilidad del operador logístico contratado (Andreani).</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">2.4 Compra mínima</h3>
            <p className="text-sm leading-relaxed text-black/70">
              La compra mínima online es de <strong>4 m² de impresión total</strong>. Para pedidos menores,
              contactanos por WhatsApp para asesoramiento personalizado.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">2.5 Promociones</h3>
            <p className="text-sm leading-relaxed text-black/70">
              Las promociones de lanzamiento tienen una ventana temporal específica y se aplican
              automáticamente sobre el <strong>subtotal producto</strong> (no sobre envío).
              No son acumulables entre sí ni con otras ofertas. Se muestran claramente en el detalle
              del pedido antes de pagar. Cada orden guarda el snapshot del descuento aplicado como
              respaldo documental.
            </p>
          </div>
        </section>

        {/* 3. Producción y entrega */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            3. Producción y entrega
          </h2>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">3.1 Plazo</h3>
            <p className="text-sm leading-relaxed text-black/70">
              <strong>20 días hábiles</strong> desde la confirmación del pago, salvo acuerdos especiales que te informemos
              previamente.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">3.2 Despacho y seguimiento</h3>
            <p className="text-sm leading-relaxed text-black/70">
              Cuando el pedido sale del taller te enviamos un mail con el código de seguimiento de Andreani.
              También podés ver el estado en cualquier momento desde el link que te llega tras confirmar el pago.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">3.3 Recepción del paquete</h3>
            <p className="text-sm leading-relaxed text-black/70">Al recibir el paquete, te pedimos que:</p>
            <ol className="space-y-1.5 text-sm leading-relaxed text-black/70 pl-5 list-decimal marker:text-black/30">
              <li>Verifiques el estado físico (caja sin golpes, paneles sin daños).</li>
              <li>Revises el material <strong>antes de colocar</strong>.</li>
              <li>Si encontrás algo raro, nos avises por escrito <strong>antes de instalar el empapelado</strong>.</li>
            </ol>
          </div>
        </section>

        {/* 4. Devoluciones y reclamos */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            4. Devoluciones y reclamos
          </h2>

          <div className="space-y-2 border-l-2 border-black/20 pl-4">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">4.1 Derecho de revocación — excepción aplicable</h3>
            <p className="text-sm leading-relaxed text-black/70">
              La Ley 24.240 de Defensa del Consumidor (Artículo 34) reconoce un derecho de revocación de
              10 días corridos para contratos celebrados a distancia, contados desde la entrega del bien
              o la celebración del contrato (lo último que ocurra).
            </p>
            <p className="text-sm leading-relaxed text-black/70">
              Sin embargo, el <strong>Artículo 1116 inciso a) del Código Civil y Comercial de la Nación</strong>
              dispone que ese derecho <strong>NO aplica</strong> a los contratos referidos a
              <em> "productos confeccionados conforme a las especificaciones suministradas por el consumidor
              o claramente personalizados"</em>. Los empapelados de Mercedes Costal entran dentro de esta excepción
              por fabricarse a medida exclusivamente para tu pedido.
            </p>
            <p className="text-sm leading-relaxed text-black/70">
              En consecuencia, una vez confirmado el pago no podemos cancelar la producción ni emitir reembolsos
              por cambio de opinión sobre un producto a medida.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">4.2 Reclamos por defectos de fabricación</h3>
            <p className="text-sm leading-relaxed text-black/70">
              Tenés <strong>15 días desde la recepción</strong> del producto para reportar:
            </p>
            <ul className="space-y-1.5 text-sm leading-relaxed text-black/70 pl-5 list-disc marker:text-black/30">
              <li>Defectos de impresión (colores, definición)</li>
              <li>Problemas de unión entre paneles</li>
              <li>Daños del producto al recibirlo</li>
            </ul>
            <p className="text-sm leading-relaxed text-black/70">
              Para reclamar, escribinos a <a href="mailto:info@mercedescostal.com.ar" className="underline">info@mercedescostal.com.ar</a> con fotos del problema.
              <strong> Es indispensable hacer el reclamo antes de colocar el empapelado</strong> —
              una vez instalado, no podemos procesar reclamos.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/70">4.3 Si el reclamo se aprueba</h3>
            <ul className="space-y-1.5 text-sm leading-relaxed text-black/70 pl-5 list-disc marker:text-black/30">
              <li>Reproducimos los paneles afectados sin costo, o</li>
              <li>Te otorgamos un crédito en m² equivalente al daño, para usar en una compra futura.</li>
              <li><strong>No emitimos reembolsos en efectivo.</strong></li>
            </ul>
          </div>
        </section>

        {/* 5. Variaciones esperables */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            5. Variaciones esperables del producto
          </h2>
          <p className="text-sm leading-relaxed text-black/70">
            Mercedes Costal trabaja con impresión digital y refilado a mano. Por su naturaleza artesanal, pueden ocurrir:
          </p>
          <ul className="space-y-1.5 text-sm leading-relaxed text-black/70 pl-5 list-disc marker:text-black/30">
            <li>
              <strong>Variaciones de tono</strong> respecto a la muestra digital. Los colores en pantalla nunca coinciden
              100% con la impresión física por la naturaleza de los procesos.
            </li>
            <li>
              <strong>Mínimas variaciones de tamaño</strong> entre paneles. Cada pieza es refilada a mano con cuidado,
              pero hay tolerancias de milímetros propias de un producto artesanal.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-black/70">
            No trabajamos con referencias de tono de otros materiales (pintura, melamina, cerámicos). Si necesitás un match
            exacto con un color específico, contactanos antes de comprar.
          </p>
        </section>

        {/* 6. Instalación */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            6. Instalación
          </h2>
          <p className="text-sm leading-relaxed text-black/70">
            <strong>Mercedes Costal no ofrece servicio de instalación.</strong> Podemos sugerirte profesionales especializados,
            pero su contratación es ajena a nosotros y <strong>no nos hacemos responsables por problemas de colocación</strong>.
          </p>
        </section>

        {/* 7. Propiedad intelectual */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            7. Propiedad intelectual
          </h2>
          <p className="text-sm leading-relaxed text-black/70">
            Los diseños son propiedad exclusiva de Mercedes Costal y están destinados a uso decorativo.
            Queda prohibida su reproducción o utilización con otros fines sin autorización por escrito.
          </p>
        </section>

        {/* 8. Datos personales */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            8. Datos personales
          </h2>
          <p className="text-sm leading-relaxed text-black/70">
            Tratamos tus datos personales para procesar tu compra y enviarte el pedido, conforme a la
            Ley 25.326 de Protección de Datos Personales.
          </p>
          <ul className="space-y-1.5 text-sm leading-relaxed text-black/70 pl-5 list-disc marker:text-black/30">
            <li>No compartimos tus datos con terceros, salvo Mercado Pago (pago) y Andreani (envío).</li>
            <li>
              Podés solicitar baja, modificación o información sobre tus datos escribiendo a
              <a href="mailto:info@mercedescostal.com.ar" className="underline ml-1">info@mercedescostal.com.ar</a>.
            </li>
          </ul>
        </section>

        {/* 9. Contacto */}
        <section className="space-y-4">
          <h2 className="font-gillsans text-xl font-medium uppercase tracking-wider border-b border-black/15 pb-2">
            9. Contacto
          </h2>
          <ul className="space-y-1.5 text-sm leading-relaxed text-black/70">
            <li>Email: <a href="mailto:info@mercedescostal.com.ar" className="underline">info@mercedescostal.com.ar</a></li>
            <li>WhatsApp: <a href="https://wa.me/5491160208460" className="underline" target="_blank" rel="noopener noreferrer">+54 9 11 6020-8460</a></li>
            <li>Sitio: <a href="https://mercedescostal.com.ar" className="underline">mercedescostal.com.ar</a></li>
          </ul>
        </section>

        {/* Fuentes legales */}
        <section className="space-y-3 border-t border-black/10 pt-6">
          <h2 className="font-gillsans text-base font-medium uppercase tracking-wider text-black/60">
            Fuentes legales
          </h2>
          <p className="text-xs text-black/50 leading-relaxed">
            Las normas citadas en este documento provienen de fuentes oficiales del Estado argentino.
            Podés consultarlas directamente:
          </p>
          <ul className="space-y-1.5 text-xs leading-relaxed text-black/55 pl-5 list-disc marker:text-black/25">
            <li>
              <strong>Ley 24.240 — Defensa del Consumidor</strong> (Art. 34, derecho de revocación):{' '}
              <a href="https://www.argentina.gob.ar/normativa/nacional/ley-24240-638/actualizacion" target="_blank" rel="noopener noreferrer" className="underline">
                argentina.gob.ar
              </a>
            </li>
            <li>
              <strong>Código Civil y Comercial — Art. 1110</strong> (revocación en contratos a distancia):{' '}
              <a href="https://leyfacil.com.ar/codigo-civil-y-comercial/articulo-1110/" target="_blank" rel="noopener noreferrer" className="underline">
                leyfacil.com.ar
              </a>
            </li>
            <li>
              <strong>Código Civil y Comercial — Art. 1116 inc. a</strong> (excepción para productos a medida):{' '}
              <a href="https://leyfacil.com.ar/codigo-civil-y-comercial/articulo-1116/" target="_blank" rel="noopener noreferrer" className="underline">
                leyfacil.com.ar
              </a>
            </li>
            <li>
              <strong>Disposición 954/2025</strong> (botón de arrepentimiento — Subsec. Defensa del Consumidor):{' '}
              <a href="https://www.argentina.gob.ar/normativa/nacional/norma-417152" target="_blank" rel="noopener noreferrer" className="underline">
                argentina.gob.ar
              </a>{' '}
              · modificada por{' '}
              <a href="https://www.argentina.gob.ar/normativa/nacional/disposici%C3%B3n-3-2026-423007/texto" target="_blank" rel="noopener noreferrer" className="underline">
                Disposición 3/2026
              </a>
            </li>
            <li>
              <strong>Ley 25.326 — Protección de Datos Personales</strong>:{' '}
              <a href="https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/actualizacion" target="_blank" rel="noopener noreferrer" className="underline">
                argentina.gob.ar
              </a>
            </li>
            <li>
              <strong>Ley 23.349 — IVA (Art. 28, alícuota 21%)</strong>:{' '}
              <a href="https://www.argentina.gob.ar/normativa/nacional/decreto-280-1997-42701/texto" target="_blank" rel="noopener noreferrer" className="underline">
                argentina.gob.ar
              </a>
            </li>
            <li>
              <strong>Ley 11.723 — Propiedad Intelectual</strong>:{' '}
              <a href="https://www.argentina.gob.ar/normativa/nacional/ley-11723-42755/actualizacion" target="_blank" rel="noopener noreferrer" className="underline">
                argentina.gob.ar
              </a>
            </li>
          </ul>
        </section>

        <footer className="border-t border-black/10 pt-6">
          <p className="text-xs text-black/40">
            Esta es la versión <strong>{TERMS_VERSION}</strong> de los términos. Al confirmar una compra,
            queda registrado con timestamp y dirección IP la versión que aceptaste, como respaldo
            documental para ambas partes.
          </p>
        </footer>

      </div>
    </main>
  );
}
