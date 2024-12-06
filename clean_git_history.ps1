# Create a backup branch just in case
git branch backup-dashboard dashboard

# Remove the file from Git history completely
git filter-branch --force --index-filter `
    'git rm --cached --ignore-unmatch public/video/Untitled.mp4' `
    --prune-empty --tag-name-filter cat -- --all

# Clean up the refs and garbage collect
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now 