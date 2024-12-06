# Create or append to .gitignore
$gitignoreContent = @"
# Large media files
public/video/*.mp4
public/video/*.mov
public/video/*.avi
public/video/*.wmv
*.mp4
*.mov
*.avi
*.wmv

# LFS files
.git/lfs/
"@

Add-Content -Path ".gitignore" -Value $gitignoreContent 