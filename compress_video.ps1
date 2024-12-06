# Install FFmpeg if you haven't (requires winget)
winget install Gyan.FFmpeg

# Compress the video (example command)
ffmpeg -i "public/video/Untitled.mp4" -vcodec h264 -acodec aac -strict -2 -vf "scale=1280:-1" "public/video/Untitled_compressed.mp4" 