import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('usuario')
  const [isRegister, setIsRegister] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isRegister) {
      if (email && password && password === confirmPassword) {
        alert('Cadastro realizado com sucesso!')
        setIsRegister(false)
      } else if (password !== confirmPassword) {
        alert('Senhas não coincidem!')
      }
    } else {
      if (email && password && name) {
        onLogin(userType, name)
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/gadys-logo.svg" alt="GADYS" className="login-logo" />
        <h2>{isRegister ? 'Cadastrar' : 'Bem-vindo'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="user-type-select"
          >
            <option value="usuario">Usuário</option>
            <option value="adm">Administrador</option>
          </select>
          <button type="submit">{isRegister ? 'Cadastrar' : 'Entrar'}</button>
        </form>
        <p className="toggle-form">
          {isRegister ? 'Já tem conta?' : 'Não tem conta?'}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? ' Entrar' : ' Cadastrar-se'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login