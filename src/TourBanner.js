import React, { useState, useRef } from 'react';

export default function TourBanner() {
  const bannerRef = useRef(null);
  const downloadBannerRef = useRef(null);
  
  const [tempConfig, setTempConfig] = useState({
    title: "东非坦桑尼亚狂野之旅",
    subtitle: "动物大迁徙10日豪华游",
    tagline: "见证地球上最壮观的自然奇迹",
    ctaText: "点击查看详情",
    brandName: "星星假期 Polaris Voyages",
    brandInfo: "加拿大专业旅游服务 | OPC #703480",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    accentColor: "#D4AF37",
    gradientStart: "#1a472a",
    gradientEnd: "#2d5a3d"
  });

  const [displayConfig, setDisplayConfig] = useState({...tempConfig});

  const handleUpdate = () => {
    setDisplayConfig({...tempConfig});
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      if (!window.domtoimage) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      const banner = bannerRef.current;
      const originalTransform = banner.style.transform;
      const originalMargin = banner.style.marginBottom;
      
      banner.style.transform = 'scale(1)';
      banner.style.marginBottom = '0';
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      try {
        const dataUrl = await window.domtoimage.toPng(banner, {
          width: 2200,
          height: 500,
          quality: 1.0
        });
        
        banner.style.transform = originalTransform;
        banner.style.marginBottom = originalMargin;
        
        const link = document.createElement('a');
        link.download = `tour-banner-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        
        alert('✅ Banner图片已下载！');
        
      } catch (err) {
        banner.style.transform = originalTransform;
        banner.style.marginBottom = originalMargin;
        throw err;
      }
      
    } catch (error) {
      console.error('下载错误：', error);
      alert('❌ 自动下载失败。\n\n最可靠的方法：\n右键点击上方预览图 → "图片另存为"\n这样保存的图片和预览100%一致！');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#fafafa', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px'
    }}>
      
      <div 
        ref={downloadBannerRef}
        style={{
          width: '2200px',
          height: '500px',
          background: `linear-gradient(135deg, ${displayConfig.gradientStart} 0%, ${displayConfig.gradientEnd} 100%)`,
          overflow: 'hidden',
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          display: 'none',
          flexDirection: 'row'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '20%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }}></div>

        <div style={{
          flex: '0 0 32%',
          padding: '50px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            width: '120px',
            height: '5px',
            background: displayConfig.accentColor,
            marginBottom: '30px',
            borderRadius: '2px'
          }}></div>

          <h1 style={{
            margin: '0 0 18px 0',
            fontSize: '62px',
            fontWeight: '900',
            color: 'white',
            lineHeight: '1.1',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '2px'
          }}>
            {displayConfig.title}
          </h1>

          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '42px',
            fontWeight: '600',
            color: displayConfig.accentColor,
            lineHeight: '1.2',
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)'
          }}>
            {displayConfig.subtitle}
          </h2>

          <p style={{
            margin: '15px 0 35px 0',
            fontSize: '24px',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.4',
            fontWeight: '300',
            letterSpacing: '0.5px'
          }}>
            {displayConfig.tagline}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 45px',
              background: displayConfig.accentColor,
              color: displayConfig.gradientStart,
              fontSize: '24px',
              fontWeight: '700',
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(212,175,55,0.4)',
            }}>
              <span>{displayConfig.ctaText}</span>
              <span style={{ fontSize: '28px' }}>→</span>
            </div>

            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '5px',
              }}>
                {displayConfig.brandName}
              </div>
              <div style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.5px'
              }}>
                {displayConfig.brandInfo}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          width: '1496px',
          height: '500px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-10px',
            bottom: 0,
            width: '100px',
            background: `linear-gradient(to right, ${displayConfig.gradientEnd}, transparent)`,
            zIndex: 1
          }}></div>

          <img 
            src={displayConfig.image}
            alt="Tour destination"
            crossOrigin="anonymous"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center center',
              display: 'block',
              backgroundColor: displayConfig.gradientEnd
            }}
          />
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '8px',
        border: '1px solid #e5e5e5'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>
          预览效果
        </h2>
        
        <div 
          ref={bannerRef}
          style={{
            width: '2200px',
            height: '500px',
            transform: 'scale(0.48)',
            transformOrigin: 'top center',
            background: `linear-gradient(135deg, ${displayConfig.gradientStart} 0%, ${displayConfig.gradientEnd} 100%)`,
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '-260px'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '20%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '5%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}></div>

          <div style={{
            flex: '0 0 32%',
            padding: '50px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              width: '120px',
              height: '5px',
              background: displayConfig.accentColor,
              marginBottom: '30px',
              borderRadius: '2px'
            }}></div>

            <h1 style={{
              margin: '0 0 18px 0',
              fontSize: '62px',
              fontWeight: '900',
              color: 'white',
              lineHeight: '1.1',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '2px'
            }}>
              {displayConfig.title}
            </h1>

            <h2 style={{
              margin: '0 0 20px 0',
              fontSize: '42px',
              fontWeight: '600',
              color: displayConfig.accentColor,
              lineHeight: '1.2',
              textShadow: '1px 1px 3px rgba(0,0,0,0.2)'
            }}>
              {displayConfig.subtitle}
            </h2>

            <p style={{
              margin: '15px 0 35px 0',
              fontSize: '24px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: '1.4',
              fontWeight: '300',
              letterSpacing: '0.5px'
            }}>
              {displayConfig.tagline}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 45px',
                background: displayConfig.accentColor,
                color: displayConfig.gradientStart,
                fontSize: '24px',
                fontWeight: '700',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(212,175,55,0.4)'
              }}>
                <span>{displayConfig.ctaText}</span>
                <span style={{ fontSize: '28px' }}>→</span>
              </div>

              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '5px'
                }}>
                  {displayConfig.brandName}
                </div>
                <div style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.5px'
                }}>
                  {displayConfig.brandInfo}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            flex: '1',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-10px',
              bottom: 0,
              width: '100px',
              background: `linear-gradient(to right, ${displayConfig.gradientEnd}, transparent)`,
              zIndex: 1
            }}></div>

            <img 
              src={displayConfig.image}
              alt="Tour destination"
              crossOrigin="anonymous"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: 'white',
        padding: '35px',
        borderRadius: '8px',
        border: '1px solid #e5e5e5'
      }}>
        <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>
          编辑内容
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
              主标题
            </label>
            <input 
              type="text"
              value={tempConfig.title}
              onChange={(e) => setTempConfig({...tempConfig, title: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                marginBottom: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />

            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
              副标题
            </label>
            <input 
              type="text"
              value={tempConfig.subtitle}
              onChange={(e) => setTempConfig({...tempConfig, subtitle: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                marginBottom: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />

            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
              宣传语
            </label>
            <input 
              type="text"
              value={tempConfig.tagline}
              onChange={(e) => setTempConfig({...tempConfig, tagline: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                marginBottom: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />

            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
              按钮文字
            </label>
            <input 
              type="text"
              value={tempConfig.ctaText}
              onChange={(e) => setTempConfig({...tempConfig, ctaText: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                marginBottom: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
              品牌名称
            </label>
            <input 
              type="text"
              value={tempConfig.brandName}
              onChange={(e) => setTempConfig({...tempConfig, brandName: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                marginBottom: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />

            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
              品牌信息
            </label>
            <input 
              type="text"
              value={tempConfig.brandInfo}
              onChange={(e) => setTempConfig({...tempConfig, brandInfo: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                marginBottom: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />

            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
              图片链接
            </label>
            <input 
              type="text"
              value={tempConfig.image}
              onChange={(e) => setTempConfig({...tempConfig, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                marginBottom: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e5e5' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>颜色设置</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
                强调色
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  type="color"
                  value={tempConfig.accentColor}
                  onChange={(e) => setTempConfig({...tempConfig, accentColor: e.target.value})}
                  style={{ width: '50px', height: '36px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                />
                <input 
                  type="text"
                  value={tempConfig.accentColor}
                  onChange={(e) => setTempConfig({...tempConfig, accentColor: e.target.value})}
                  style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
                渐变起始色
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  type="color"
                  value={tempConfig.gradientStart}
                  onChange={(e) => setTempConfig({...tempConfig, gradientStart: e.target.value})}
                  style={{ width: '50px', height: '36px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                />
                <input 
                  type="text"
                  value={tempConfig.gradientStart}
                  onChange={(e) => setTempConfig({...tempConfig, gradientStart: e.target.value})}
                  style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#555' }}>
                渐变结束色
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  type="color"
                  value={tempConfig.gradientEnd}
                  onChange={(e) => setTempConfig({...tempConfig, gradientEnd: e.target.value})}
                  style={{ width: '50px', height: '36px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                />
                <input 
                  type="text"
                  value={tempConfig.gradientEnd}
                  onChange={(e) => setTempConfig({...tempConfig, gradientEnd: e.target.value})}
                  style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '500', color: '#555' }}>
            配色方案
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#D4AF37', gradientStart: '#1a472a', gradientEnd: '#2d5a3d'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #1a472a, #2d5a3d)', color: '#D4AF37', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>绿金</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFD700', gradientStart: '#C79A5B', gradientEnd: '#E8C68A'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #C79A5B, #E8C68A)', color: '#8B6914', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>沙漠</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFE66D', gradientStart: '#FF6B6B', gradientEnd: '#FFA07A'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #FF6B6B, #FFA07A)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>夕阳</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFFFFF', gradientStart: '#4A90E2', gradientEnd: '#87CEEB'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #4A90E2, #87CEEB)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>蓝天</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFD700', gradientStart: '#1e3c72', gradientEnd: '#2a5298'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: '#FFD700', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>深海</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFA500', gradientStart: '#8B4513', gradientEnd: '#A0522D'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #8B4513, #A0522D)', color: '#FFA500', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>大地</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFE4B5', gradientStart: '#8B008B', gradientEnd: '#9370DB'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #8B008B, #9370DB)', color: '#FFE4B5', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>薰衣草</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFDAB9', gradientStart: '#DC143C', gradientEnd: '#FF6347'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #DC143C, #FF6347)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>热情</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#00CED1', gradientStart: '#0F2027', gradientEnd: '#203A43'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #0F2027, #203A43)', color: '#00CED1', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>午夜</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFD700', gradientStart: '#2C5F2D', gradientEnd: '#97BC62'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #2C5F2D, #97BC62)', color: '#FFD700', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>森林</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFFFFF', gradientStart: '#00B4DB', gradientEnd: '#0083B0'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #00B4DB, #0083B0)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>海洋</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFE4E1', gradientStart: '#FF69B4', gradientEnd: '#FFB6C1'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>樱花</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#F0E68C', gradientStart: '#4B0082', gradientEnd: '#8A2BE2'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #4B0082, #8A2BE2)', color: '#F0E68C', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>紫金</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFE4C4', gradientStart: '#CD853F', gradientEnd: '#DEB887'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #CD853F, #DEB887)', color: '#8B4513', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>秋日</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFFACD', gradientStart: '#FF8C00', gradientEnd: '#FFA500'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #FF8C00, #FFA500)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>日出</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#E0FFFF', gradientStart: '#2F4F4F', gradientEnd: '#708090'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #2F4F4F, #708090)', color: '#E0FFFF', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>雾灰</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FAFAD2', gradientStart: '#556B2F', gradientEnd: '#6B8E23'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #556B2F, #6B8E23)', color: '#FAFAD2', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>橄榄</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFF8DC', gradientStart: '#B8860B', gradientEnd: '#DAA520'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #B8860B, #DAA520)', color: '#8B6914', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>黄金</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#F5F5DC', gradientStart: '#8B0000', gradientEnd: '#B22222'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #8B0000, #B22222)', color: '#F5F5DC', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>酒红</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFFFFF', gradientStart: '#000000', gradientEnd: '#434343'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #000000, #434343)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>黑白</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFE4E1', gradientStart: '#2E8B57', gradientEnd: '#3CB371'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #2E8B57, #3CB371)', color: '#FFE4E1', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>翡翠</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFF5EE', gradientStart: '#FF4500', gradientEnd: '#FF6347'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #FF4500, #FF6347)', color: '#FFF5EE', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>火焰</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFFACD', gradientStart: '#20B2AA', gradientEnd: '#48D1CC'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #20B2AA, #48D1CC)', color: '#fff', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>青绿</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFE4B5', gradientStart: '#483D8B', gradientEnd: '#6A5ACD'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #483D8B, #6A5ACD)', color: '#FFE4B5', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>深紫</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#F0FFF0', gradientStart: '#228B22', gradientEnd: '#32CD32'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #228B22, #32CD32)', color: '#F0FFF0', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>草绿</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFF0F5', gradientStart: '#C71585', gradientEnd: '#DB7093'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #C71585, #DB7093)', color: '#FFF0F5', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>玫瑰</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#F5FFFA', gradientStart: '#008B8B', gradientEnd: '#20B2AA'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #008B8B, #20B2AA)', color: '#F5FFFA', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>碧海</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFEFD5', gradientStart: '#D2691E', gradientEnd: '#CD853F'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #D2691E, #CD853F)', color: '#FFEFD5', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>巧克力</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#F0E68C', gradientStart: '#191970', gradientEnd: '#4169E1'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #191970, #4169E1)', color: '#F0E68C', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>皇家蓝</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFF8DC', gradientStart: '#8B4789', gradientEnd: '#9966CC'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #8B4789, #9966CC)', color: '#FFF8DC', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>紫罗兰</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFFACD', gradientStart: '#006400', gradientEnd: '#228B22'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #006400, #228B22)', color: '#FFFACD', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>深绿</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFF5EE', gradientStart: '#8B4513', gradientEnd: '#D2691E'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #8B4513, #D2691E)', color: '#FFF5EE', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>咖啡</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#E0FFFF', gradientStart: '#4682B4', gradientEnd: '#5F9EA0'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #4682B4, #5F9EA0)', color: '#E0FFFF', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>钢蓝</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#FFDAB9', gradientStart: '#8B008B', gradientEnd: '#BA55D3'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #8B008B, #BA55D3)', color: '#FFDAB9', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>兰花紫</button>
            <button onClick={() => setTempConfig({...tempConfig, accentColor: '#F5F5DC', gradientStart: '#2F4F4F', gradientEnd: '#696969'})} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'linear-gradient(135deg, #2F4F4F, #696969)', color: '#F5F5DC', cursor: 'pointer', fontWeight: '500', fontSize: '12px'}}>石板灰</button>
          </div>
        </div>

        <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #e5e5e5', display: 'flex', gap: '12px', justifyContent: 'center'}}>
          <button onClick={handleUpdate} style={{padding: '12px 32px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer'}}>更新预览</button>
          <button onClick={handleDownloadImage} disabled={isDownloading} style={{padding: '12px 32px', background: isDownloading ? '#999' : '#0066cc', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: isDownloading ? 'not-allowed' : 'pointer', opacity: isDownloading ? 0.6 : 1}}>{isDownloading ? '生成中...' : '下载图片'}</button>
        </div>
      </div>
    </div>
  );
}
