# Track MP4 files using Git LFS
git lfs track "*.mp4"

# Add the .gitattributes file
git add .gitattributes

# Remove the large file from git's history (if it was previously committed)
git rm --cached "public/video/Untitled.mp4"

# Add the file back
git add "public/video/Untitled.mp4"

# Commit the changes
git commit -m "Add large video file using Git LFS" 