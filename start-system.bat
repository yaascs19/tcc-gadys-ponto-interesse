@echo off
echo Iniciando sistema GADYS...
echo.

echo 1. Instalando dependencias do servidor...
cd server
call npm install
echo.

echo 2. Iniciando servidor backend...
start "GADYS Backend" cmd /k "npm start"
echo.

echo 3. Aguardando 3 segundos...
timeout /t 3 /nobreak > nul
echo.

echo 4. Iniciando frontend...
cd ..
start "GADYS Frontend" cmd /k "npm run dev"
echo.

echo Sistema GADYS iniciado!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
pause