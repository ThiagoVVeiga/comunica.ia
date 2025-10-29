# Script Ultra Simples - TD Snap Web
# Execute este script na raiz do projeto

Write-Host "🚀 TD Snap Web - Setup Simples" -ForegroundColor Green

# Frontend
Write-Host "📦 Frontend..." -ForegroundColor Blue
cd frontend
if (Test-Path "node_modules") { Remove-Item -Recurse -Force node_modules }
if (Test-Path "package-lock.json") { Remove-Item package-lock.json }
npm install --legacy-peer-deps
Write-Host "✅ Frontend OK" -ForegroundColor Green

# Backend
cd ..
Write-Host "📦 Backend..." -ForegroundColor Blue
cd backend
if (Test-Path "node_modules") { Remove-Item -Recurse -Force node_modules }
if (Test-Path "package-lock.json") { Remove-Item package-lock.json }
npm install
Write-Host "✅ Backend OK" -ForegroundColor Green

# Voltar
cd ..

Write-Host ""
Write-Host "🎉 Pronto!" -ForegroundColor Green
Write-Host "Para executar:" -ForegroundColor Blue
Write-Host "  Frontend: cd frontend; npm start" -ForegroundColor White
Write-Host "  Backend:  cd backend; npm run dev" -ForegroundColor White
