# Create or update .gitignore with comprehensive media file exclusions
$gitignoreContent = @"
# Video files
public/video/*.mp4
public/video/*.mov
public/video/*.avi
public/video/*.wmv
public/video/Untitled*.mp4
*.mp4
*.mov
*.avi
*.wmv

# LFS files
.git/lfs/

# Temporary files
*.tmp
*.temp

# System files
.DS_Store
Thumbs.db
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent 