# Remove the stash we just applied
git stash drop stash@{0}

# Verify everything is clean
git status 