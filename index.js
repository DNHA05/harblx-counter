const nodeHtmlToImage = require('node-html-to-image');
const axios = require('axios');

async function generateFFImage(uid, region = 'INDONESIA') {
    try {
        const apiUrl = `https://freefireinfo-zy9l.onrender.com/api/v1/player-profile?uid=${uid}&region=${region}`;
        const response = await axios.get(apiUrl);
        const apiData = response.data;

        if (!apiData.basicInfo) throw new Error("Account not found");

        const info = apiData.basicInfo;
        const clan = apiData.clanInfo || { clanName: "No Guild" };

        // Format dữ liệu
        const formatDS = (ts) => new Date(ts * 1000).toLocaleString('vi-VN', { 
            hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '4-digit' 
        });

        const data = {
            nickname: info.nickname || "Unknown",
            level: info.level || 0,
            exp: parseInt(info.exp).toLocaleString('vi-VN'),
            likes: parseInt(info.liked).toLocaleString('vi-VN'),
            createDate: formatDS(info.createTime),
            lastLogin: formatDS(info.lastLogin),
            clanName: clan.clanName,
            region: region === 'INDONESIA' ? 'ID' : 'VN',
            uid: uid
        };

        await nodeHtmlToImage({
            output: './ff_card.png',
            html: `
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Plus+Jakarta+Sans:wght@400;700&display=swap');
                    body {
                        width: 750px; height: 950px;
                        background: #020609;
                        display: flex; justify-content: center; align-items: center;
                        font-family: 'Plus Jakarta Sans', sans-serif;
                    }
                    .container {
                        width: 650px; height: 850px;
                        background: linear-gradient(135deg, rgba(15,25,35,0.9) 0%, rgba(5,10,15,0.95) 100%);
                        border: 1px solid rgba(0, 255, 180, 0.2);
                        border-radius: 40px; padding: 40px;
                        color: white; box-shadow: 0 25px 50px rgba(0,0,0,0.5);
                        position: relative; overflow: hidden;
                    }
                    .container::before {
                        content: ""; position: absolute; top: -50px; right: -50px;
                        width: 200px; height: 200px; background: rgba(0, 255, 180, 0.1);
                        filter: blur(80px); border-radius: 50%;
                    }
                    .header { display: flex; gap: 25px; align-items: center; margin-bottom: 30px; }
                    .avatar {
                        width: 150px; height: 150px; border-radius: 20px;
                        border: 2px solid rgba(255,255,255,0.5); object-fit: cover;
                    }
                    .name-box h1 {
                        font-family: 'JetBrains Mono', monospace; font-size: 42px; margin: 0;
                        text-shadow: 0 0 15px rgba(255,255,255,0.3);
                    }
                    .tags { display: flex; gap: 12px; margin-top: 15px; }
                    .tag { padding: 6px 18px; border-radius: 10px; font-weight: bold; font-size: 14px; text-transform: uppercase; }
                    .heroic { background: rgba(0, 255, 136, 0.15); color: #00ff88; border: 1px solid rgba(0, 255, 136, 0.4); }
                    .lv { background: rgba(187, 0, 255, 0.15); color: #bb00ff; border: 1px solid rgba(187, 0, 255, 0.4); }
                    
                    .uid-text { color: #667788; font-family: 'JetBrains Mono'; margin: 15px 0; font-size: 18px; }
                    .info-bar { color: #94a3b8; font-size: 17px; margin-bottom: 40px; display: flex; align-items: center; gap: 10px; }

                    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
                    .stat-card {
                        background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
                        border-radius: 25px; padding: 30px; text-align: center;
                        backdrop-filter: blur(10px);
                    }
                    .stat-val { font-size: 32px; font-weight: 800; display: block; margin-bottom: 5px; }
                    .exp { color: #00ffcc; } .likes { color: #fbbf24; }
                    .stat-label { font-size: 14px; color: #64748b; letter-spacing: 2px; font-weight: bold; }

                    .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 60px; }
                    .heart-section {
                        border: 2px ridge #fda4af; background: rgba(253, 164, 175, 0.05);
                        padding: 25px; border-radius: 40% 40% 50% 50%;
                        text-align: center; width: 220px;
                    }
                    .login-status { text-align: right; }
                    .login-time { color: #22d3ee; font-size: 20px; font-weight: bold; display: block; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://api.harblx.online/assets/avatar_default.png" class="avatar">
                        <div class="name-box">
                            <h1>${data.nickname}</h1>
                            <div class="tags">
                                <span class="tag heroic">Heroic</span>
                                <span class="tag lv">LV.${data.level}</span>
                            </div>
                        </div>
                    </div>

                    <div class="uid-text">UID: ${data.uid}</div>
                    <div class="info-bar">🌐 Khu vực: ${data.region} &nbsp; # &nbsp; Guild: ${data.clanName}</div>

                    <div class="stats-grid">
                        <div class="stat-card">
                            <span class="stat-val exp">${data.exp}</span>
                            <span class="stat-label">EXP</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-val likes">${data.likes}</span>
                            <span class="stat-label">LIKE</span>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="heart-section">
                            <div style="color: #f43f5e; font-size: 16px; font-weight: bold; margin-bottom: 5px;">${data.createDate}</div>
                            <div class="stat-label" style="color: #fda4af;">TẠO ACC</div>
                        </div>
                        <div class="login-status">
                            <span class="login-time">${data.lastLogin}</span>
                            <span class="stat-label" style="color: #22d3ee;">ĐĂNG NHẬP CUỐI</span>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `
        });
        console.log("✅ Đã tạo ảnh ff_card.png!");
    } catch (err) {
        console.error("❌ Lỗi:", err.message);
    }
}

// Thay UID và Region tại đây để test
generateFFImage('5849768691', 'INDONESIA');
