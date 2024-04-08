import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { SignUpRoute } from './Routes/Users/SignUp.js';
import { VerifyRoute } from './Routes/Users/Verify.js';
import { SignInRoute } from './Routes/Users/SignIn.js';
import { ProfileRoute } from './Routes/Users/Profile.js';
import { PasswordReset } from './Routes/Users/PasswordReset.js';
import { EditCredentials } from './Routes/Users/CredentialsEdit.js';
import { CreateCourseRoute } from './Routes/SuperAdmin/CreateCourse.js';
import { EnrolledRoute } from './Routes/Users/Enrolled.js';
import { EnrollmentRoute } from './Routes/Users/Enrollment.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/signup',SignUpRoute);
app.use('/verify',VerifyRoute);
app.use('/signin',SignInRoute);
app.use('/profile',ProfileRoute);
app.use('/passwordReset',PasswordReset);
app.use('/edit',EditCredentials);
app.use('/createcourse',CreateCourseRoute);
app.use('/enrolled',EnrolledRoute);
app.use('/enroll',EnrollmentRoute);

const PORT = process.env.PROT || 7001;
app.listen(PORT,() => {
    console.log(`Server is running on PORT : ${PORT}`);
})