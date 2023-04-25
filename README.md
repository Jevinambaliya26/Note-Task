# note-backend

# install mongodb in local

# install node-modules
npm i

# Run 

npm start

# sign up user
POST: localhost:8080/api/v1/user/signup
Body: {
    "email":"ABC@gmail.com",
    "firstName":"ABC",
    "lastName":"ABC",
    "birthDate":"Any date",
    "mobileNumber":"Any number",
    "password":"anything"
}

# login user
POST: localhost:8080/api/v1/user/login
Body: {
    "email":"ABC@gmail.com",
    "password":"Anything"
}

# Create Note
POST: localhost:8080/api/v1/note/create
Headers: Authorization token
Body: {
    "title":"ABC task2",
    "content":"its my first task bcbcbc"
}

# Get note by id
GET: localhost:8080/api/v1/note/:id
Headers: Authorization token

# Get All Notes Od authenticated User
GET: localhost:8080/api/v1/note/
query: page, limit
Headers: Authorization token

# Update Note By Id
PUT: localhost:8080/api/v1/note/update
Headers: Authorization token
Body: {
    "_id":"6447d88b28c136fe256ba76a",
    "title":"first task12",
    "content":"its my first task"
}

# Delete Note By Id
Delete: localhost:8080/api/v1/note/:id
Headers: Authorization token


# find postman collection in root path. (Name: Note.postman_collection.json)
