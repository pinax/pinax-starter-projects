(
 git checkout zero && git merge master --no-edit
 git checkout account && git merge zero --no-edit
 git checkout blog && git merge zero --no-edit
 git checkout static && git merge zero --no-edit
 git checkout documents && git merge account --no-edit
 git checkout wiki && git merge account --no-edit
 git checkout team-wiki && git merge wiki --no-edit
 git checkout waitinglist && git merge zero --no-edit
)
