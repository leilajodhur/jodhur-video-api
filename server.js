const express = require('express');
const { exec } = require('child_process');
const path = require('path'); // إضافة ضرورية للتعامل مع مسارات الملفات
const app = express();

app.use(express.json()); 

// 🌟 السطر السحري الجديد: السماح لـ n8n بتحميل الفيديوهات من مجلد out
app.use('/renders', express.static(path.join(__dirname, 'out')));

app.post('/render', (req, res) => {
    const props = req.body;
    
    const compositionId = props.composition || "U1-FlashHook";

    // تسمية الملف الجديد
    const videoName = props.semaine ? `video_${props.semaine}_${Date.now()}` : `video_${Date.now()}`;

    const command = `npx remotion render ${compositionId} out/${videoName}.mp4 --props='${JSON.stringify(props)}'`;

    console.log(`🚀 جاري البدء في صناعة فيديو: ${videoName}`);
    console.log(`🎬 القالب المستخدم: ${compositionId}`);

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error("❌ خطأ أثناء الرندرة:", stderr);
            return res.status(500).json({ error: "Render failed", details: stderr });
        }
        console.log(`✅ تم إنتاج الفيديو بنجاح: ${videoName}.mp4`);
        
        res.send({ 
            status: "success", 
            message: "Video rendered!", 
            video: videoName, // سنستخدم هذا الاسم في n8n
            url: `https://${req.get('host')}/renders/${videoName}.mp4` 
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 المصنع يعمل الآن على Railway بالمنفذ: ${PORT}`);
    // test new deploy

});
