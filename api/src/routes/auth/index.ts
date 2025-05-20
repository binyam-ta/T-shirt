import e, { Router } from 'express';
import { createUserSchema, loginSchema , usersTable} from '../../db/usersSchema';
import { validateData } from '../../middlewares/validationMiddleware';
import bcrypt from 'bcryptjs';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
const router = Router();

router.post('/register',validateData(createUserSchema), async (req, res) => {
  try {
      const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);
   const [user] = await db.insert(usersTable).values(data).returning();
    // Handle registration logic here
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
      return  res.status(500).json({ message: 'Internal server error' });
    }

});

router.post('/login', validateData(loginSchema), async (req, res) => {
  try {
    if (!req.cleanBody || typeof req.cleanBody.email !== 'string' || typeof req.cleanBody.password !== 'string') {
      return res.status(400).json({ message: 'Invalid request body' });
    }
    const { email, password } = req.cleanBody;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    console.log(matched, password);
    if (!matched) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  
  const token = jwt.sign({ 
    id: user.id,
  role: user.role },
    
    'jwtSecretio',
    {expiresIn: '3h'}); 
  // @ts-ignore
  delete user.password;
  res.status(200).json({token, user });
  } catch (error) {
    console.error('Error loging user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
export default router;