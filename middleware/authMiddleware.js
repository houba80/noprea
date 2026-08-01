import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token = req.headers.authorization;
  
  if (token && token.startsWith('Bearer')) {
    try {
      // فصل كلمة Bearer عن التوكن الفعلي
      token = token.split(' ')[1];
      
      // فك التشفير والتأكد من صحة التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // حفظ بيانات اليوزر في الـ Request عشان نستخدمها بعدين
      req.user = decoded; 
      next(); // التوكن سليم، عدي يا باشا!
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};