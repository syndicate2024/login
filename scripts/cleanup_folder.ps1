# Create a backup directory for scripts we want to keep
New-Item -ItemType Directory -Force -Path "./scripts"

# Move important scripts to scripts folder
Get-ChildItem -Path . -Filter "*.ps1" | ForEach-Object {
    Move-Item $_.FullName -Destination "./scripts" -Force
}

# Clean up backup files and temporary files
Get-ChildItem -Path . -Recurse -File | 
    Where-Object { 
        $_.Name -like "*backup*" -or 
        $_.Name -like "*.bak" -or 
        $_.Name -like "*.tmp" -or 
        $_.Name -like "*copy*"
    } | 
    Remove-Item -Force

# Organize video files
New-Item -ItemType Directory -Force -Path "./assets/videos"
Move-Item -Path "./public/video/*.mp4" -Destination "./assets/videos" -Force 