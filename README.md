# Task Management Platform
Project developed with Java (Backend), Angular (Frontend) and MySQL (Database)

## Content

* After a person has created an account or logged into an existing one, a project or workspace can be created.
* A project can be created either from scratch or by using an already defined template.
* Tasks characterized by title, description, label, start date or end date can be added to a project.
* A project can contain several collaborators who can be assigned to solve tasks. Communication between team members can take place via chat accessible to all collaborators.
* Tasks can be sorted by start date, end date or so that the delay in project completion is minimal.
* A user can view his assigned tasks within a calendar.
* Projects in a workspace can only be accessed by all team members if they are public. If the project is private, it can only be seen by those contributors who were subsequently added to the project as well.
* The user can notice in the inbox notifications related to the changes that take place on the projects and tasks in which he is added, information also sent to the e-mail address.

## How to Run the Project
* Open and run database with MySql
* For the backend part run next line in backend folder: 
```
mvn spring-boot:run
```
* For the frontend part run next lines in frontend folder:
```
npm install
ng serve
```

