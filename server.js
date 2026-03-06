const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json()); 

app.post('/render', (req, res) => {
    // 1. استخراج كافة المتغيرات القادمة من n8n
    const props = req.body;

    // 2. تعديل ذكي: قراءة اسم القالب من n8n أو استخدام التلقائي
    // هذا السطر سيجعل السيرفر يرى U1-FlashHook أو U2-TutoPunch حسب طلبك
    const compositionId = props.composition || "U1-FlashHook";

    // 3. تسمية الملف بناءً على الأسبوع والمنتج
    const videoName = props.semaine ? `video_${props.semaine}_${Date.now()}` : `video_${Date.now()}`;

    // 4. بناء الأمر البرمجي بشكل ديناميكي (استخدام ${compositionId} بدلاً من الاسم الثابت)
    const command = `npx remotion render ${compositionId} out/${videoName}.mp4 --props='${JSON.stringify(props)}'`;

    console.log(`🚀 جاري البدء في صناعة فيديو: ${videoName}`);
    console.log(`🎬 القالب المستخدم: ${compositionId}`);
    console.log(`📦 المنتَج: ${props.productName || 'غير محدد'}`);

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error("❌ خطأ أثناء الرندرة:", stderr);
            return res.status(500).json({ error: "Render failed", details: stderr });
        }
        console.log(`✅ تم إنتاج الفيديو بنجاح: ${videoName}.mp4`);
        // إرسال رابط الفيديو الصحيح في الرد
        res.send({ 
            status: "success", 
            message: "Video rendered!", 
            video: videoName,
            url: `https://${req.get('host')}/renders/${videoName}.mp4` 
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 المصنع يعمل الآن على Railway بالمنفذ: ${PORT}`);
});