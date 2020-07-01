# RESTfull-Api
It is a simple RESTful API webservice responsible for managing and storing notes as records in a database. The database used is MongoDB.

## Features
- CRUD service - create, read, update and delete notes
- each note consist of title, content, priority, creation and last modification date
- creation and modification dates are filled in automaticly
- history of updates of a single note is stored
- while showing all notes, only newest version of each note is shown
- while showing a particular note filtered by note's ID, all stored previous versions are shown 

## Usage
Please notice, that notes' ID are stored in noteID field, the \_id  field stores ID of a single edition of a note and is never used for any call
#### Filtering:
- ```GET /``` - returns all active posts from the database
- ```GET /all``` - returns all posts from the database (their active and outdated versions)
- ```GET /noteID``` - returns all versions of a specified note with ID = noteID
- ```GET /p``` - returns all posts from the database that fulfills the given conditions as follows:
     * ```GET /p?dateGT=date1``` - filters only posts modified later than date1
     * ```GET /p?dateLT=date2``` - filters only posts modified earlier than date2
     * ```GET /p?priorityGT=p1``` - filters only posts with priority greather than p1
     * ```GET /p?priorityLT=p2``` - filters only posts with priority lower than p1
     * ```GET /p?noteID=p3``` - filters only posts with noteID equal to p3
     * ```GET /p?title=p4``` - filters only posts with title equal to p4
     * ```GET /p?version=p5``` - filters only posts with version equal to p5
     * ```GET /p?description=p6``` - filters only posts with description equal to p6
     * ```GET /p?status=p7``` - filters only posts with status equal to p7
     
 example call: ```GET /p?dateGT="2019-01-01"&dateLT="2020-01-01"&priorityGT=3&status="Active"``` - this call will return all active posts modifed in 2020 year which priority is greater than 3
     
     
     
     
     


#### Deleting: 
to delete all notes with ID = noteID use: ```DELETE /noteID```

#### Patching: 
to patch a single note with ID = noteID use: ```PATCH /noteID```, the note's status is marked 'Outdated' and new one with patched informations, 'Active' status, increased version number and updated modification date is created


