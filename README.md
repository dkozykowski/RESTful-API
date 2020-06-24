# RESTfull-Api
It is a simple RESTful API webservice responsible for managing and storing notes as records in a database. The database used is MongoDB.

## Features
- CRUD service - create, read, update and delete notes
- each note consist of title, content, creation and last modification date
- title and content are required, there is a validation method that returns error when one of them is missing
- creation and modification date is filled in automaticly
- history of updates of a single note is stored
- delated versions are hidden when showing all notes, but it is possible to read them when showing a particular note history
- while showing all notes, only newest version of each note is shown
- while showing a particular note, all previous versions are shown 
- deleted notes are hidden, 


