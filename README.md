# 🎩 مستر منقوري | Mr. Mangory - مدرب الإنجليزية الفكاهي والتفاعلي

تطبيق ويب تفاعلي ذكي لتدريب وتطوير مهارات التحدث باللغة الإنجليزية في الزمن الحقيقي عبر شخصية أفاتار كرتونية ذات تعابير ومشاعر كوميدية (**مستر منقوري - Mr. Mangory**).

![Mr. Mangory Banner](https://img.shields.io/badge/English%20Coach-Mr.%20Mangory-amber?style=for-the-badge&logo=britishairways)
![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

---

## 🌟 مميزات التطبيق الرئيسية (Core Features)

- 🎭 **أفاتار كرتوني تفاعلي متقدم (SVG Rig):** شخصية مستر تشارلز المصممة بمتجهات SVG فائقة الخفة والسرعة (60+ FPS)، تدعم تعابير الوجه المتغيرة لحظياً (هدوء أرستقراطي، استماع، تفكير، غضب درامي مع بخار متصاعد من الأذنين، قهقهة وضحك، احتفال فخري، وحركة شفاه حية Lip-sync).
- 🎙️ **استماع وتحدث لحظي (Web Speech API):** التعرف الفوري على الصوت عبر الميكروفون باللغة الإنجليزية، مع نطق أرستقراطي بريطاني فصيح.
- ⚠️ **نظام رصد فخاخ النطق والحروف الصامتة (Pronunciation Traps):** رصد فوري للكلمات الصعبة مثل: `receipt`, `comfortable`, `dessert vs desert`, `subtle`, `Wednesday`, `clothes`, `island`, `salmon`, `chaos`, `stomach`, والتفريق بين `P` و `B`.
- 🛑 **قفل المحادثة في وضع التحدي (Challenge Mode):** عندما يقع المتعلم في خطأ نطقي، يوقف مستر تشارلز المحادثة بشكل درامي فكاهي، ولا يجيب عن السؤال إلا بعد تصحيح نطق الكلمة بنجاح مع احتفال كرتوني مبهج (Confetti) ونقاط Posh XP.
- 🔊 **مؤثرات صوتية اصطناعية 100% (Web Audio API):** صفير غلاية الشاي عند الغضب، ونغمات الفشل الكوميدي، ونغمات النصر الملكية دون الاعتماد على أي ملفات صوتية خارجية.
- 📚 **سيناريوهات محادثة متنوعة:** (محادثة حرة، حفلة الشاي الملكية والآداب، تحدي الكلمات القاتلة، مقابلة عمل مع اللورد، السياحة في قطارات لندن).
- 🤖 **دعم الذكاء الاصطناعي (Dual AI Engine):** يعمل التطبيق محلياً دون أي مفاتيح أو إنترنت، مع إمكانية إضافة مفتاح Google Gemini API اختيارياً من الإعدادات لمحادثات حرة غير محدودة.
- 📱 **متوافق بالكامل مع الجوال (Mobile-First):** تصميم متجاوب ابتداءً من شاشات 375px.

---

## 🚀 التشغيل المحلي (Local Setup)

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل السيرفر المحلي
npm run dev

# 3. بناء المشروع للإنتاج
npm run build
```

---

## 🛠️ الحزمة التقنية (Tech Stack)

- **Frontend:** React 19 + TypeScript + Vite.
- **Styling:** Tailwind CSS v4 + Keyframes Animation.
- **Speech & Audio:** Web Speech API (Recognition + Synthesis) + Web Audio API.
- **Effects:** Canvas-Confetti & Lucide Icons.
- **Deployment:** Cloudflare Pages & Workers / Vercel.

---

## 📜 رخصة المشروع (License)
هذا المشروع مرخص تحت رخصة **MIT**.
