# KaizenKlass-V2
This is a new and improved of the old kaizenklass, its still under development but brings with it a new take on the ui and a shift in frameworks. This web app will utilze remix to optimize load times and make for an overall better experience, the goal of this project is to store and document assignments allowing students an easier way to look at old assignments and at the same time storing multiple solutions to those assignmnets.
As development continues, i will integrate other featured to make life easier for everyone using the site, some of which include links to other projects, notes, test paper and more. any feedback is welcome and will also be accepted through a feedback section on the website itself.

![image](https://github.com/ik04/KaizenKlass-V2/assets/63468587/73fd6124-4fe0-475d-becb-bd9afee06ac7)

![image](https://github.com/ik04/KaizenKlass-V2/assets/63468587/fa447f15-5fc7-4c3a-b9fd-2a67744f2b94)

![image](https://github.com/ik04/KaizenKlass-V2/assets/63468587/995ccf71-8209-4653-9098-22f858938c89)



## Tech stack 
- ![Nextjs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
- ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
- ![Mysql](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)


## For Contributions:
this is a script to install the necessary dependecies to run this project 
- [This is for laravel](https://gist.github.com/ik04/79fb2921145d8fee7302b4f7fddd7c2a)
if you're using windows:
- Install Php and xampp for windows [here](https://www.apachefriends.org/)
- Install Composer for windows [here](https://getcomposer.org/)

- [This is to install nvm](https://gist.github.com/ik04/b94423df79ed7f777b2c359c2f669b1b)
- after nvm is setup just run
  
```bash
nvm install node
```
make sure to run this in a new terminal instance

## To Setup the project:
### Laravel:
after installing the dependencies
- make sure you have a mysql server running
- if not you can use sqlite instead
- simply copy the .example.env file into a .env file
- and follow these configurations
For Mysql:
![image](https://github.com/ik04/KaizenKlass-V2/assets/63468587/0c19d07a-6913-4394-85a3-6921a99584e2)

For Sqlite:
![image](https://github.com/ik04/KaizenKlass-V2/assets/63468587/b930d3bb-b004-49c1-b29a-14854e53f045)

after setting up the .env file run these commands in the server/rest directory:
```bash
composer install
php artisan migrate
php artisan db:seed
php artisan serve
```
with this the dependencies will be install, the tables will be setup and the server will be started.
once this is done to hydrate the subjects table make an admin acc using the /api/v1/register-admin route, there's no regex at the moment so any email will do. this route will be disabled in production.
after making the account on postman using the endpoint, login using the /api/v1/login route and get the access token. Using the access token hydrate the subjects table using api/v1/_dbinit route.
you can modify the subjects being added by modifying routes/init/subjects.json.

### Remix:
to initialize the client side, run these commands in the client/web directory:
```bash
npm i
npm run dev
```
with this you should be set to contribute and help with development, please do mind that this project is currently in infancy and is still undergoing development. Any feedback would be greatly appreciated.
