# Option 1: Stash the changes temporarily
git stash save "Temporary stash before cleaning history"

# OR Option 2: Commit the changes if they should be kept
git add .
git commit -m "Save changes before cleaning history" 