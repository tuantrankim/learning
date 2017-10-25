# Git command 
https://www.youtube.com/watch?v=j1oFazXrzN4

    (1) working directory   |   (2) staging area    |   (3) local repo  |   (4) remote repo
    (1) git add             =>  (2) git commit      =>  (3) git push    =>  (4)
    (1)                     <=                          (3) git checkout<=  (4) git fetch
    (1)                     <=                          (3) git merge   <=  (4) git fetch

Initialize project

    mkdir project
    cd project
    $git init

add a file: homepage.html

    $git add homepage.html
    $git commit -m 'added homepage file'

add a file: contact.html

    $git add --all
    $git commit -m 'added contact page'