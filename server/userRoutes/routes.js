import express from 'express';
import { registerUser, updateUser,loginuser,deleteUser } from '../routerController/userRouter.js';
import { protect } from '../middleware/authmiddleware.js';


const route = express.Router()

route.post('/register',registerUser)
route.get('/', getUsers);

route.post('/auth', loginuser);
route.post('/logout', logoutUser);
route
  .route('/profile')
  .get(protect, updateUser)
  .put(protect, updateUser);



export default route;