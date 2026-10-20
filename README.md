# Q365
365 questions in 365 Days ; 

(كل يوم سؤال، كل يوم فكرة) 
📌 نبذة عن Q365 :
تطبيق ويب تفاعلي متكامل مصمم لتقديم سؤال جديد ومتجدد يومياً على مدار 365 يوماً، بهدف نشر المعرفة وتحفيز تعلم المستخدمين بطريقة ممتعة وتنافسية تعتمد على تتبع الأيام المتتالية (Streaks) وتجميع النقاط، مع إمكانية الوصول إلى أرشيف الأسئلة واقتراح أسئلة جديدة من قِبل المستخدمين المتميزين. 
يتميز النظام بأتمتة خلفية كاملة عبر سكربت برمجي ذكي يولد الأسئلة يومياً بالاعتماد على الذكاء الاصطناعي ويخزنها مباشرة في قاعدة البيانات دون أي تدخل بشري. 
🚀 المميزات الرئيسية 
الأتمتة الخلفية الذكية (Automated Backend): سكربت بايثون يعمل بشكل دوري وتلقائي عبر نظام أتمتة متكامل لجلب وتوليد الأسئلة اليومية وفحص عدم التكرار. 

سؤال اليوم التفاعلي: عرض سؤال يومي متجدد تلقائياً بناءً على التاريخ الحالي، مع واجهة إدخال مرنة، مؤشر لعدد الحروف، وتقييم فوري للإجابة بالشرح والتوضيح باللغتين.

أرشيف الأسئلة السابقة: إمكانية تصفح ومراجعة جميع الأسئلة المطروحة مسبقاً مع إجاباتها الصحيحة والشروحات الخاصة بها.

نظام النقاط وسلسلة الأيام (Streaks & Points): احتساب النقاط وتتبع التفاعل اليومي للمستخدمين، مع فتح ميزة استثنائية عند بلوغ 100 نقطة تسمح للمستخدم باقتراح سؤاله الخاص ليتم عرضه على باقي المستخدمين.

دعم ثنائي اللغة كامل (عربي / إنجليزي): توليد الأسئلة، الإجابات، والشروحات بكلتا اللغتين تزامناً، مع إمكانية تبديل لغة التطبيق والواجهة برمجياً وتعديل اتجاه الصفحات تلقائياً بين (RTL و LTR).

الوضع الليلي والنهاري (Dark & Light Mode): مظهر مريح للعين يدعم التبديل السلس بين الوضعين مع حفظ تفضيلات المستخدم تلقائياً.

نظام المصادقة الآمنة (Google OAuth): تسجيل الدخول السلس بنقرة واحدة باستخدام حساب Google عبر Supabase لحفظ تقدم المستخدم ونقاطه وسجل إجاباته بشكل دائم. 
لوحة إعدادات شاملة: التحكم في تفضيلات المؤثرات الصوتية، التنبيهات، ومسح بيانات التخزين المؤقت (Local Storage & Cache). 
🛠️ التقنيات المستخدمة (Tech Stack)
تم بناء ونشر المشروع باستخدام أحدث التقنيات وأفضل الممارسات لضمان الاستقرار وسرعة الأداء: 
خدمات الذكاء الاصطناعي والأتمتة (AI & Automation): 
Python 3.10: لغة برمجة السكربت الخلفي المعالج لعملية التوليد. 
Groq API (llama-3.3-70b-versatile): محرك الذكاء الاصطناعي المسؤول عن ابتكار الأسئلة وتنسيقها لهيكل JSON دقيق. 
GitHub Actions (Cron Jobs): أتمتة تشغيل السكربت يومياً في وقته المحدد أو يدوياً عبر Workflow Dispatch. 
قاعدة البيانات والخدمات الخلفية (Backend & Database): 
Supabase (PostgreSQL): إدارة قاعدة البيانات العلائقية لتخزين الأسئلة والنتائج، وتطبيق سياسات الأمن والحماية على مستوى الصفوف (RLS Policies)، وتفعيل خدمة المصادقة (Google OAuth). 
واجهة المستخدم (Frontend): 
HTML5 & CSS3: هيكلة وتصميم الواجهات بتنسيقات عصرية متجاوبة تماماً مع مختلف الشاشات والهواتف، باستخدام خط Cairo العربي. 
Vanilla JavaScript: إدارة منطق التطبيق التفاعلي، استعلامات الـ API، والتحكم في حالة التطبيق دون استهلاك مكتبات ثقيلة. 
Font Awesome: للأيقونات التعبيرية والرمزية. 
الاستضافة والتكامل المباشر (Hosting & CI/CD): 
GitHub: إدارة النسخ والتعديلات (Version Control)، المستودع البرمجي، وحماية الأسرار والمتغيرات عبر (GitHub Secrets). 
Vercel: الاستضافة السحابية والربط المباشر مع GitHub للنشر التلقائي السريع (Auto-Deployment) مع دعم كامل للـ SSL والـ Redirection. 




👨‍💻 حقوق التطوير والإصدار 
المطور: مصطفى اعبار
الإصدار: 2026 
رابط الاستضافة المباشر: https://q365.vercel.app
___________________________________________________________________________


(A Question a Day, an Idea a Day)
📌 About Q365:
A comprehensive, interactive web application designed to present a fresh, new question every single day for 365 days. Its goal is to spread knowledge and encourage user learning through an engaging, competitive experience—featuring daily streaks and a points-based system. Users can access an archive of past questions, and top-performing users are granted the ability to suggest new questions. The system is fully automated via an intelligent backend script that leverages artificial intelligence to generate daily questions and store them directly in the database, requiring no human intervention.
🚀 Key Features:
Intelligent Backend Automation: A Python script runs periodically and automatically, handling the generation of daily questions while ensuring no duplicates occur.
Interactive "Question of the Day": A new question is presented daily based on the current date. The interface includes a flexible input field, a character counter, and instant feedback—providing both the answer and a detailed explanation in two languages.
Question Archive: Users can browse and review all previously featured questions, along with their correct answers and accompanying explanations.
Points and Streaks System: The platform tracks daily user engagement and awards points. Upon reaching 100 points, users unlock an exclusive feature that allows them to submit their own questions to be shared with the rest of the community. Full Bilingual Support (Arabic/English): Questions, answers, and explanations are generated in both languages ​​simultaneously. The application interface language can be switched programmatically, with automatic adjustment of page direction (RTL/LTR).
Dark & ​​Light Mode: An eye-friendly interface that allows for seamless switching between modes, with automatic saving of user preferences.
Secure Authentication System (Google OAuth): One-click, seamless login via Google accounts—powered by Supabase—to permanently store user progress, scores, and answer history.
Comprehensive Settings Panel: Manage preferences for sound effects and notifications, or clear local storage and cache data.
🛠️ Tech Stack
The project was built and deployed using cutting-edge technologies and industry best practices to ensure stability and high performance:
AI & Automation Services:
Python 3.10: The scripting language used for backend processing and generation.
Groq API (llama-3.3-70b-versatile): The AI ​​engine responsible for creating questions and formatting them into precise JSON structures.
GitHub Actions (Cron Jobs): Automates daily script execution at scheduled times, with an option for manual triggering via Workflow Dispatch.
Backend & Database:
Supabase (PostgreSQL): A relational database used to store questions and results, implement Row-Level Security (RLS) policies, and manage user authentication (Google OAuth). Frontend:
HTML5 & CSS3: Structuring and designing interfaces with a modern, fully responsive layout that adapts to various screens and mobile devices, utilizing the "Cairo" Arabic font.
Vanilla JavaScript: Managing interactive application logic, API requests, and application state without the overhead of heavy external libraries.
Font Awesome: For expressive icons and symbols.
Hosting & CI/CD:
GitHub: Version control and repository management, with sensitive data and variables secured via "GitHub Secrets."
Vercel: Cloud hosting with direct integration to GitHub for rapid, automated deployment (Auto-Deployment), including full support for SSL and URL redirection.




👨‍💻 Development & Release Credits
Developer: Mustafa Abar
Version: 2026
Live Hosting Link: https://q365.vercel.app
