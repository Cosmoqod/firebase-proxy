import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// تحميل متغيرات البيئة
const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // استبدال \\n بـ \n
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// مثال: جلب بيانات من Firebase
const fetchData = async () => {
  try {
    const snapshot = await database.ref('path/to/data').once('value');
    const data = snapshot.val();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();