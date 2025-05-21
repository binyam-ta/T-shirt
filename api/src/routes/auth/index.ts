import e, { Router } from 'express';
import { createUserSchema, loginSchema , usersTable} from '../../db/usersSchema.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
const router = Router();

router.post('/register',validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody as { email: string; password: string; name?: string; role?: string };
    data.password = await bcrypt.hash(data.password, 10);

    // Ensure required fields are not undefined
    const insertData = {
      ...data,
      name: data.name ?? '',
      role: data.role ?? 'user'
    };

    const [user] = await db.insert(usersTable).values(insertData).returning();
  // Handle registration logic here
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

router.post('/login', validateData(loginSchema), async (req, res) => {
  try {
    if (!req.cleanBody || typeof req.cleanBody.email !== 'string' || typeof req.cleanBody.password !== 'string') {
      res.status(400).json({ message: 'Invalid request body' });
      return;
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
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

  
  const token = jwt.sign({ 
    id: user.id,
  role: user.role },
    
    'jwtSecretio',
    {expiresIn: '3h'}); 
  // @ts-ignore
  res.status(200).json({token, user });
  } catch (error) {
    console.error('Error loging user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  }
);
export default router;