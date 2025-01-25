import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// تحميل متغيرات البيئة
const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // استخدام optional chaining
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// التحقق من عدم وجود تطبيقات مسبقة
const apps = getApps();

// تهيئة Firebase فقط إذا لم يتم التهيئة مسبقًا
const app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];
const database = getDatabase(app);

// (اختياري) نقل استدعاء fetchData إلى مكان مناسب حسب الحاجة
// مثال: داخل route handler إذا كنت تستخدم Express
const fetchData = async () => {
  try {
    const snapshot = await database.ref('path/to/data').once('value');
    const data = snapshot.val();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// تصدير الدوال اللازمة للاستخدام في routes
export { fetchData };