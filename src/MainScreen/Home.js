import React, { useState, useEffect } from 'react';
import { redeemCoupon, getRedemptionStats } from '../services/authApi';

// Custom hook for animated number counting
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing for smoother feel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return count;
};

// Styles (unchanged from your original)
const containerStyle = { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f3fbf3', padding: '0 16px' };
const headingStyle = { color: 'green', fontWeight: 700, marginBottom: 22, marginTop: 30, marginLeft: 10, fontSize: 32 };
const contentContainerStyle = { display: 'flex', gap: '80px', width: '100%', maxWidth: '1200px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 30 };
const formWrapperStyle = { background: '#ffffff', borderRadius: '16px', padding: '32px 24px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '1', minWidth: '400px' };
const formTitleStyle = { fontSize: '24px', fontWeight: '700', color: '#222', margin: '0 0 24px 0', textAlign: 'center' };
const inputContainerStyle = { width: '100%', marginBottom: '20px' };
const inputLabelStyle = { display: 'block', fontSize: '14px', fontWeight: '500', color: '#222', marginBottom: '8px', textAlign: 'left', width: '100%' };
const inputStyle = { width: '100%', padding: '12px 16px', fontSize: '16px', borderRadius: '8px', border: '1px solid #e5eaf1', background: '#ffffff', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s ease' };
const buttonStyle = { background: '#6AB320', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 32px', fontSize: '16px', fontWeight: '500', cursor: 'pointer', marginTop: '8px', marginBottom: '16px', transition: 'background-color 0.2s ease' };
const descriptionStyle = { marginTop: 10, fontSize: 18, color: 'grey', textAlign: 'center', margin: '0', lineHeight: '1.4' };
const cardsContainerStyle = { display: 'flex', flexDirection: 'column', gap: '24px', flex: '0 0 auto', width: '300px' };
const cardStyle = { background: '#ffffff', borderRadius: '16px', padding: '32px 24px', width: '100%', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(0, 0, 0, 0.05)', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative', overflow: 'hidden' };
const cardHoverStyle = { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)', background: 'linear-gradient(135deg, #ffffff 0%, #f8fff8 100%)' };
const cardNumberStyle = { fontSize: '48px', fontWeight: '700', color: '#6AB320', margin: '0 0 12px 0', lineHeight: '1' };
const cardTitleStyle = { fontSize: '18px', fontWeight: '600', color: '#222', margin: '0 0 8px 0' };
const cardDescriptionStyle = { fontSize: '14px', color: '#666', margin: '0', lineHeight: '1.4' };

const Home = () => {
  const [coupon, setCoupon] = useState('');
  const [email, setEmail] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('info');

  const [stats, setStats] = useState({
    todayRedemptions: 0,
    monthRedemptions: 0
  });

  // Fetch redemption stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const todayData = await getRedemptionStats('today');
        const allTimeData = await getRedemptionStats('all');
        console.log("todayData",todayData,allTimeData);


        setStats({
          todayRedemptions: todayData?.statistics?.totalRedemptions || 0,
          monthRedemptions: allTimeData?.statistics?.totalRedemptions || 0
        });
      } catch (err) {
        console.error("Error fetching redemption stats:", err);
      }
    };

    fetchStats();
  }, []);

  // Animated numbers
  const todayCount = useCountUp(stats.todayRedemptions, 1500);
  const monthCount = useCountUp(stats.monthRedemptions, 2000);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Green Sip</h1>
      <hr style={{ width: '100%', maxWidth: '1200px', border: '1px solid #e5eaf1', margin: '0 0 32px 0' }} />

      <div style={contentContainerStyle}>
        {/* Stats Cards */}
        <div style={cardsContainerStyle}>
          <div
            style={{ ...cardStyle, ...(hoveredCard === 0 ? cardHoverStyle : {}) }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={cardNumberStyle}>{todayCount}</div>
            <div style={cardTitleStyle}>Total Redemptions</div>
            <div style={cardDescriptionStyle}>Today</div>
          </div>

          <div
            style={{ ...cardStyle, ...(hoveredCard === 1 ? cardHoverStyle : {}) }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={cardNumberStyle}>{monthCount}</div>
            <div style={cardTitleStyle}>Total Redemptions</div>
            <div style={cardDescriptionStyle}>All Time</div>
          </div>
        </div>

        {/* Redemption Form */}
        <div style={formWrapperStyle}>
          <h2 style={formTitleStyle}>Coupon Redemption</h2>

          <div style={inputContainerStyle}>
            <label style={inputLabelStyle}>Coupon code (e.g., GSIP-XXXX)</label>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={inputLabelStyle}>Customer email</label>
            <input
              type="email"
              placeholder="Enter customer email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button
            style={{
              ...buttonStyle,
              opacity: isSubmitting ? 0.7 : 1,
              pointerEvents: isSubmitting ? 'none' : 'auto',
            }}
            onClick={async () => {
              setMessage(null);
              if (!coupon || !email) {
                setMessageType('error');
                setMessage('Please enter both coupon code and customer email.');
                return;
              }
              try {
                setIsSubmitting(true);
                const res = await redeemCoupon(email, coupon);
                if (res?.success) {
                  setMessageType('success');
                  setMessage(res?.message || 'Coupon redeemed successfully.');
                  setCoupon('');
                  setEmail('');
                } else {
                  setMessageType('error');
                  setMessage(res?.message || 'Failed to redeem coupon.');
                }
              } catch (err) {
                setMessageType('error');
                setMessage(err?.message || 'Failed to redeem coupon.');
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? 'Redeeming...' : 'Redeem'}
          </button>

          {message && (
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color:
                  messageType === 'success'
                    ? '#2e7d32'
                    : messageType === 'error'
                    ? '#d32f2f'
                    : '#555',
                textAlign: 'center',
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      <div style={descriptionStyle}>
        Once redeemed, it will reflect in your Redemption History.
      </div>
    </div>
  );
};

export default Home;
