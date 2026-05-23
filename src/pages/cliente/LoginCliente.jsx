import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button, Input, Card } from '../../components/ui'
import { toast } from '../../components/ui'
import logo_cca from '../../assets/img/Logo-cca.png'
import { MainHeader } from '../../components/MainHeader'
export default function LoginCliente() {
  const { loginCliente } = useAuth()
  const navigate = useNavigate()
  const [documento, setDocumento] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!documento.trim()) errs.documento = 'Ingrese su DNI o RUC'
    if (!password) errs.password = 'Ingrese su contraseña'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await loginCliente(documento.trim(), password)
      navigate('/dashboard')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MainHeader />

    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      {/* Logo */}
    
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 92, height: 92, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          <img src={logo_cca} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>CEAR – APURÍMAC </h1>
        <h2 style={{ fontSize: 16, fontWeight: 500, marginTop: 4 }}>Para presentar solicitudes y/o realizar seguimiento de expediente.</h2>
        <p style={{ fontSize: 12, fontWeight: 'normal', marginTop: 4, color: 'blue' }}>
          <a style={{ textDecoration: 'none'}} href="https://www.camara-apurimac.com.pe" target="_blank" rel="noopener noreferrer">camara-apurimac.com.pe</a>
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Acceso para ciudadanos</p>
      </div>

      <Card style={{ width: '100%', maxWidth: 400, padding: '2rem' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Iniciar sesión</h2>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="DNI o RUC"
            placeholder="Ingrese su número de documento"
            value={documento}
            onChange={e => { setDocumento(e.target.value.replace(/\D/g, '')); setErrors(x => ({ ...x, documento: null })) }}
            maxLength={11}
            error={errors.documento}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(x => ({ ...x, password: null })) }}
            error={errors.password}
          />

          <Button type="submit" loading={loading} style={{ marginTop: 4, width: '100%', justifyContent: 'center', padding: '11px' }}>
            Ingresar
          </Button>
        </form>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <Link to="/olvide-password" style={{ fontSize: 13, color: 'var(--lblue)', textDecoration: 'none', fontWeight: 500 }}>
            ¿Olvidaste tu contraseña?
          </Link>
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/registro" style={{ color: 'var(--lblue)', fontWeight: 600, textDecoration: 'none' }}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>

      <div style={{ marginTop: 16 }}>
        <Link to="/admin/login" style={{ fontSize: 12, color: 'var(--text-3)', textDecoration: 'none' }}>
          Acceso administradores →
        </Link>
      </div>
    </div>
        </>
  )
}
