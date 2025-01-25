import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// تحقق من وجود المتغيرات المطلوبة
if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_PRIVATE_KEY ||
  !process.env.FIREBASE_DATABASE_URL
) {
  throw new Error('One or more Firebase environment variables are missing!');
}

const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // تأكد من وجود هذا الحقل
};

// تهيئة التطبيق مرة واحدة فقط
const apps = getApps();
const app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];

// الحصول على مرجع لقاعدة البيانات
const database = getDatabase(app);

// (اختياري) تسجيل معلومات التهيئة للتأكد
console.log('Firebase App Name:', app.name);
console.log('Database URL:', process.env.FIREBASE_DATABASE_URL);