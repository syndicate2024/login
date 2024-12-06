# Remove the video file from git tracking
git rm --cached "public/video/Untitled.mp4"

# Add this file to .gitignore
echo "public/video/Untitled.mp4" >> .gitignore

# Commit these changes
git commit -m "Remove large video file and add to .gitignore" 