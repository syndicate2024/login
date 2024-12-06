# Create directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/video"

# Create an info file about the video
$videoInfoContent = @"
# Video Content Information

The video file 'Untitled.mp4' has been moved to external storage due to size limitations.

## How to access the video:
1. Download the compressed version from: [Add your preferred storage link]
2. Contact the repository maintainer at: [Your contact info]

## Technical Details:
- Original file: Untitled.mp4
- Size: 113.79 MB
- Resolution: [Add resolution]
- Duration: [Add duration]

## Alternative Access Methods:
1. Request access to the Google Drive folder
2. Check the project documentation for streaming URLs
3. Contact the development team for direct access
"@

New-Item -Path "public/video/VIDEO_INFO.md" -Value $videoInfoContent -Force

# Add and commit the info file
git add public/video/VIDEO_INFO.md .gitignore
git commit -m "Add video information and update gitignore"
git push origin dashboard 