# Git command 
https://www.youtube.com/watch?v=j1oFazXrzN4

    (1) working directory   |   (2) staging area    |   (3) local repo  |   (4) remote repo
    (1) git add             =>  (2) git commit      =>  (3) git push    =>  (4)
    (1)                     <=                          (3) git checkout<=  (4) git fetch
    (1)                     <=                          (3) git merge   <=  (4) git fetch

    $git help

## Initialize project

    mkdir project
    cd project
    $git init

Add a file: homepage.html

    $git add homepage.html
    $git commit -m 'added homepage file'

Add a file: contact.html

    $git add --all
    $git commit -m 'added contact page'

Push to remote server

    $git remote add origin https://github.com/tuantrankim/learning.git
	$git push -u origin master

## View history

    $git log

## Clone a project

    $git clone https://github.com/tuantrankim/Pluralsight.git
    
    or clone to a different folder name
    $git clone <url> <alias folder>

## Undo an add command

    $git reset <files>
    same with old version command
    $git reset HEAD <files>
    $git reset

## Using remote

    $git remote add origin https://github.com/tuantrankim/learning

View current remote
    $git remote

Push master branch in current remote which is origin

    $git push origin master

Delete a remote

    $git remote add learning https://github.com/tuantrankim/learning
    $git remote
    $git remote remove learning
    $git remote

## Branching and Merge

Create new branch

    $git branch contact-changes

Switch branch

    $git checkout contact-changes

Edit some files then

    $git add --all
    $git commit -m 'contact changes'

Switch back to master branch and view the files

    $git checkout master
    $git branch

Switch to contact-changes branch and view the files

    $git checkout contact-changes
    $git branch

Need to switch to master branch in order to merge into the master

    $git checkout master
    $git merge contact-changes

Delete a branch

    $git branch
    $git branch -D contact-changes

## Branch contact-change merge to Master from remote

    $git checkout contact-changes

Edit some files then

    $git add .
    $git commit -m 'Edit contact-changes'
    $git push origin contact-changes

Switch to master branch

    $git checkout master
    $git merge contact-changes
    $git push origin master

Delete remote branch

    $git push -d origin contact-changes

## Git pull from remote

Fetch from remote Master branch to home-changes branch

    $git fetch origin master:home-changes

Delete remote branch (or push empty to home-changes)

    $git push origin :home-changes

View remote branch

    $git branch -r

In the simplest terms, git pull does a git fetch followed by a git merge. Git pull is what you would do to bring a local branch up-to-date with remote version

    $git pull

## Git ignore files

create a file name .gitignore
add ignore files like

    *.iml
    out/*
    bin/*
    .idea/*
