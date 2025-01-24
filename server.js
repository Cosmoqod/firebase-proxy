require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

// تهيئة Firebase
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.DATABASE_URL,
});

const db = getDatabase();
const app = express();
app.use(cors());
app.use(express.json());

// نقطة نهاية لجلب بيانات المستخدم
app.get('/user/:id', async (req, res) => {
  try {
    const snapshot = await db.ref(`users/${req.params.id}`).get();
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
