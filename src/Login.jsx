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
      if (email && password && password === confirmPassword && name) {
        // Armazena os dados do usuário cadastrado
        let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
        
        // Verifica se o email já existe
        if (registeredUsers.find(user => user.email === email)) {
          alert('Este email já está cadastrado!')
          return
        }
        
        const newUser = {
          name: name,
          email: email,
          password: password,
          userType: userType
        }
        
        registeredUsers.push(newUser)
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
        
        alert('Cadastro realizado com sucesso!')
        setIsRegister(false)
      } else if (password !== confirmPassword) {
        alert('Senhas não coincidem!')
      } else {
        alert('Preencha todos os campos!')
      }
    } else {
      if (email && password) {
        // Validação específica para administrador
        if (userType === 'adm') {
          // Verifica se é a Yasmin (administradora principal)
          if (email === 'yasmincunegundes25@gmail.com' && password === 'Cun*1925') {
            onLogin(userType, 'Yasmin')
          } else {
            // Verifica se é um administrador cadastrado no sistema
            const userAccess = JSON.parse(localStorage.getItem('userAccess')) || []
            const adminUser = userAccess.find(user => user.email === email && user.userType === 'adm')
            
            if (adminUser) {
              onLogin(userType, adminUser.userName)
            } else {
              alert('Credenciais de administrador inválidas!')
              return
            }
          }
        } else {
          // Verifica se é um usuário cadastrado
          const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
          const user = registeredUsers.find(user => user.email === email && user.password === password)
          
          if (user) {
            onLogin(user.userType, user.name)
          } else {
            alert('Email ou senha incorretos!')
            return
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