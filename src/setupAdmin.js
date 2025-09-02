// Script para cadastrar administrador
const adminUser = {
  email: "yasmincunegundes25@gmail.com",
  password: "Cun*1925",
  userType: "adm",
  userName: "Yasmin Admin"
}

// Adicionar ao localStorage
let users = JSON.parse(localStorage.getItem('users')) || []
users.push(adminUser)
localStorage.setItem('users', JSON.stringify(users))

console.log('Administrador cadastrado com sucesso!')
console.log('Email:', adminUser.email)
console.log('Senha:', adminUser.password)
console.log('Tipo:', adminUser.userType)