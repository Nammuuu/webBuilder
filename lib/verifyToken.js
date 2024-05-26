
// // folder  lib/verifyToken.js
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export function verifyToken(req) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     throw new Error('No token provided');
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     throw new Error('Failed to authenticate token');
//   }
// }


// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export function verifyToken(req) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     throw new Error('No token provided');
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       throw new Error('Token expired');
//     }
//     throw new Error('Failed to authenticate token');
//   }
// }

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    throw new Error('Failed to authenticate token');
  }
}


// lib/verifyToken.js
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       throw new Error('Token expired');
//     }
//     throw new Error('Failed to authenticate token');
//   }
// }
