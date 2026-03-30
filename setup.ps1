# VizaBot KE Environment Setup Script
Write-Host "--- Initializing VizaBot KE ---" -ForegroundColor Cyan

# 1. Create Virtual Environment
if (!(Test-Path "venv")) {
    Write-Host "[1/3] Creating virtual environment..."
    python -m venv venv
} else {
    Write-Host "[1/3] Virtual environment already exists."
}

# 2. Install Dependencies (Simulation)
Write-Host "[2/3] Installing dependencies..."
# ./venv/Scripts/pip install requests python-dotenv
Write-Host "Note: Simulation mode. Ensure Python 3.10+ is installed."

# 3. Verify Folder Structure
$dirs = @(".agents/skills", "data/permits", "data/strategy", "src/logic", "src/vision", "public/assets")
foreach ($dir in $dirs) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created $dir"
    }
}

Write-Host "[3/3] Setup Complete. Run 'python src/orchestrator.py' to start." -ForegroundColor Green
