
# MultiApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

Using [GitFlow](https://danielkummer.github.io/git-flow-cheatsheet/index.fr_FR.html) guide lines.
![gitflow](https://danielkummer.github.io/git-flow-cheatsheet/img/lines-big.png)


# Add a new App

1. `ng generate component apps/my-app --module=app.module` generate component basics
2. add component to router in [src/app/apps/app-list.ts] :
```
{
    name: 'My App',
    description: 'App description',
    path: 'my-app'
},
```
3. add route for component in [src/app/app.routes.module.ts] :
```
{ path: 'my-app', component: MyAppComponent },
```
4. :tada: edit your component

# Git convention

### Commit message

> :emoji: commit message [issue #]

### Emoji list

|Emoji|Meaning|
|:-|:-|
|:tada:|Initalisation|
|:sparkles:|New feature|
|:books:|Documentation|
|:art:|Styling|
|:hammer:|Refactoring|
|:construction:|Work in progress|
|:wrench:|Configuration|
|:ok_hand:|Validation (Merge)|
|:on:|Api|
|:bug:|Bugfix|
|:lock:|Security|
|:heavy_check_mark:|Tests|
|:fire:|FireBase|

