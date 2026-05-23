import logo_cca from '../assets/img/Logo-cca.png'
export function MainHeader() {
    return (
        <div style={{ background: 'var(--blue-dark)' }}>
            <div style={{ minHeight: 70, display: 'grid', alignContent: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '0 1.5rem', gap: 20, color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifySelf: 'start' }}>
                        <div>
                            <img src={logo_cca} alt="Logo CCA" style={{ height: 70 }} />
                        </div>
                        <div>
                            <div className="logo-brand">
                                <h3 style={{ fontSize: 16, fontWeight: 'bold' }}>CENTRO DE ARBITRAJE Y JPRD</h3>
                                <div className="logo-pipe"></div>
                                <span className="logo-subtitle">Cámara de Comercio Apurímac</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                        <h3 style={{ textTransform: 'uppercase' }} className="center-label">Mesa de Partes Virtual</h3>
                        <span className="center-tagline">Trazabilidad Documental</span>
                    </div>
                    <div className="col-social">
                        <a className="social-icon" href="#" aria-label="YouTube">
                            <i className="ti ti-brand-youtube"></i>
                        </a>
                        <a className="social-icon" href="#" aria-label="LinkedIn">
                            <i className="ti ti-brand-linkedin"></i>
                        </a>
                        <a className="social-icon" href="#" aria-label="Facebook">
                            <i className="ti ti-brand-facebook"></i>
                        </a>
                        <a className="social-icon" href="#" aria-label="WhatsApp">
                            <i className="ti ti-brand-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}