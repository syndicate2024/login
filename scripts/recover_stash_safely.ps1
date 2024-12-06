# First, let's look at what's in the stash
git stash list

# View the contents of the stash
git stash show -p

# Option 1: If you want to apply the stash without the video files
git stash apply --index stash@{0} -- ":(exclude)*.mp4"

# Option 2: If you want to completely drop the stash without applying it
git stash drop stash@{0} 