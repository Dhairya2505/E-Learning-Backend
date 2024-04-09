# E-Learning-Backend

### This is an E-Learning App Backend in which user can SignUp, SingIn, Enroll in a course, See the enrolled courses and many things.

## Routes ->

# User Routes

### 1. /signup - This is a **POST** route, used for user signup.
#### Requires -> body { *name, *email, *password }

### 2. /signin - This is a **GET** route, used for user signin.
#### Requires -> headers { *email, *password} 

### 3. /profile - This is a **GET** route, used to get the signedIn user details.
#### Requires -> Nothing

### 4. /passwordReset - This is a **GET** route, used to reset the signedIn users password.
#### Requires -> headers { *password }

### 5. /edit - This is a **POST** route, used for editing signedIn users credentials.
#### Requires -> body { name, email, picture }

### 6. /enrolled - This is a **GET** route, used to get all the courses in which the signedIn user is enrolled.
#### Requires -> Nothing


### 7. /enroll - This is a **POST** route, used to enroll in a course.
#### Requires -> body -> { *id }  
#### Note -> id = courseID

# Admin Routes

### 1. /createcourse - This is a **POST** route, used to create a course.
#### Requires -> body -> { *name, description, *price, *level, category, language, creator }

### 2. /delete - This is a **POST** route, used to delete a course.
#### Requires -> body -> { id }
#### Note -> id = courseID

### 3. /editcourse - This is a **POST** route, used to edit a course.
#### Requires -> body -> { *id, name, description, price, *level, category, language, creator }

# Admin Routes

### 1. /courses - This is a **GET** route, used to get all the courses.
#### Requires -> params { page, level, language, price, category, popularity, rating }
#### Note -> In this route, you can filter the courses on the basis of your requirements like if you want a course with **level=Easy**, then after the url enter '?level=Easy' (pass level as parameter)

### NOTE -> For fast courses retrieval, pagination is implemented. Just pass the **page** as parameter.