import { useState } from 'react'
import './Login.css'

function Login({ onLogin, isAdminAccess = false }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState(isAdminAccess ? 'adm' : 'usuario')
  const [isRegister, setIsRegister] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isRegister) {
      if (email && password && password === confirmPassword && name) {
        alert('Cadastro realizado com sucesso!')
        setIsRegister(false)
      } else if (password !== confirmPassword) {
        alert('Senhas não coincidem!')
      } else {
        alert('Preencha todos os campos!')
      }
    } else {
      if (email && password) {
        if (email === 'admin@gadys.com' && password === '123' && userType === 'adm') {
          onLogin('adm', 'Admin')
        } else if (email === 'user@gadys.com' && password === '123') {
          onLogin('usuario', 'Usuário')
        } else {
          alert('Credenciais inválidas!')
        }
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/logo.png" alt="GADYS" className="login-logo" />
        <h2>{isRegister ? 'Cadastrar' : 'Bem-vindo'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          {!isRegister && (
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="user-type-select"
            >
              {!isAdminAccess && <option value="usuario">Usuário</option>}
              <option value="adm">Administrador</option>
            </select>
          )}
          <button type="submit">{isRegister ? 'Cadastrar' : 'Entrar'}</button>
        </form>
        {!isAdminAccess && (
          <p className="toggle-form">
            {isRegister ? 'Já tem conta?' : 'Não tem conta?'}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? ' Entrar' : ' Cadastrar-se'}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login