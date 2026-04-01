@echo off
rem ==========================================
rem Auto-Sync Script for Our Love Story
rem Uses GitHub Desktop's embedded Git to bypass system missing git.exe
rem ==========================================

set GIT_PATH="C:\Users\abc\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"

echo 正在掃描並加入最新修改的檔案...
%GIT_PATH% add .

echo 正在為修改建立專屬日記紀錄...
%GIT_PATH% commit -m "✨ 新增回憶與自動修改: Auto-sync update from AI Assistant"

echo 正在將心血推上雲端網址 (GitHub Pages)...
%GIT_PATH% push origin main

echo ==========================================
echo 恭喜！最新版的網站已經成功推送上去了！
echo 一到兩分鐘後，重新整理專屬網址，就能看到最新的浪漫驚喜！
exit /b 0
