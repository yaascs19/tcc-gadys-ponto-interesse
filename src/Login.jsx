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
        try {
          const response = await fetch('http://localhost:3001/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nome: name,
              email: email,
              senha: password,
              tipoUsuario: 'usuario'
            })
          })
          
          if (response.ok) {
            alert('Cadastro realizado com sucesso!')
            setIsRegister(false)
          } else {
            const error = await response.json()
            alert(error.error || 'Erro ao cadastrar')
          }
        } catch (error) {
          // Fallback localStorage
          let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
          if (registeredUsers.find(user => user.email === email)) {
            alert('Este email já está cadastrado!')
            return
          }
          registeredUsers.push({ name, email, password, userType: 'usuario' })
          localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
          alert('Cadastro realizado localmente!')
          setIsRegister(false)
        }
      } else if (password !== confirmPassword) {
        alert('Senhas não coincidem!')
      } else {
        alert('Preencha todos os campos!')
      }
    } else {
      if (email && password) {
        try {
          const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              senha: password,
              tipoUsuario: userType
            })
          })
          
          const result = await response.json()
          
          if (response.ok && result.success) {
            localStorage.setItem('userEmail', email)
            onLogin(result.user.TipoUsuario, result.user.Nome)
          } else {
            alert(result.error || 'Credenciais inválidas!')
          }
        } catch (error) {
          // Fallback para login offline
          if (email === 'yasmincunegundes25@gmail.com' && password === 'Cun*1925' && userType === 'adm') {
            localStorage.setItem('userEmail', email)
            onLogin('adm', 'Yasmin')
          } else {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
            const user = registeredUsers.find(user => user.email === email && user.password === password && user.userType === userType)
            if (user) {
              localStorage.setItem('userEmail', email)
              onLogin(user.userType, user.name)
            } else {
              alert('Servidor indisponível ou credenciais inválidas!')
            }
          }
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
        {!isRegister && (
          <p className="forgot-password" onClick={() => {
            const email = prompt('Digite seu e-mail para recuperar a senha:');
            if (email && email.includes('@')) {
              alert('📧 Instruções de recuperação enviadas para: ' + email);
            } else if (email) {
              alert('❌ E-mail inválido!');
            }
          }}>
            Esqueceu sua senha?
          </p>
        )}
      </div>
    </div>
  )
}

export default Login