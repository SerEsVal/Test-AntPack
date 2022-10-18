import { Router } from 'express';
const router = Router();

import { NewUser, ReadUsers, UpdateUser, DeleteUser } from '../controllers/c.users';

router
    //C CREATE USER
    .post('/newuser', NewUser)
    //R READ USERS
    .get('/getusers', ReadUsers)
    //U UPDATE USER
    .post('/updateuser', UpdateUser)
    //D DELETE USER
    .post('/deleteusers', DeleteUser)

export default router;