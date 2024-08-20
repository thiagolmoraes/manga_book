@echo off
setlocal

REM Verifica se foi fornecida uma mensagem de commit
if "%1"=="" (
    echo Por favor, forneça uma mensagem de commit.
    echo Uso: git_push.bat "Sua mensagem de commit"
    exit /b 1
)

REM Adiciona todos os arquivos ao staging
git add .

REM Faz o commit com a mensagem fornecida
git commit -m "%*"

REM Faz o push para a branch master
git push origin master

endlocal
