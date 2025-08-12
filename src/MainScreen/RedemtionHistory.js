import React, { useEffect, useState } from 'react';
import { MdRedeem } from "react-icons/md";
import { getRedemptionHistory } from '../services/authApi';


// ==== Styles ====
const containerStyle = {
  padding: '16px',
  background: '#f3fbf3',
};

const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
};

const titleStyle = {
  color: "green",
  fontWeight: 700,
  fontSize: "2rem",
  margin: 0,
  letterSpacing: "-1px",
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  marginTop: '16px',
  background: '#f3fbf3',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const thStyle = {
  padding: '18px 8px',
  background: '#b7e3bc',
  color: '#111',
  fontWeight: 700,
  fontSize: '18px',
  border: 'none',
  textAlign: 'center',
};

const tdStyle = {
  padding: '16px 8px',
  background: '#f3fbf3',
  color: '#111',
  fontWeight: 400,
  fontSize: '16px',
  border: 'none',
  borderBottom: '1px solid #b7e3bc',
  textAlign: 'center',
};

const emptyContainerStyle = {
  height: '50vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 16px',
  gap: '12px',
  textAlign: 'center',
};

const emptyIconStyle = {
  animation: 'bounce 2s infinite',
  fontSize: '4rem',
  marginBottom: '12px',
};

const bounceKeyframes = `
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-12px); }
  60% { transform: translateY(-6px); }
}
`;

const emptyTitleStyle = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 600,
  color: '#2c662d',
};

const emptyTextStyle = {
  margin: 0,
  fontSize: '14px',
  color: 'grey',
};

// ==== Component ====
const RedemptionHistory = () => {
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getRedemptionHistory(page, 10);
        setRedemptions(data.redemptions || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <h3 style={titleStyle}>Redemption History</h3>
      </div>
      <hr />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : redemptions.length === 0 ? (
        <div style={emptyContainerStyle}>
          <style>{bounceKeyframes}</style>
          <MdRedeem style={emptyIconStyle} />
          <h4 style={emptyTitleStyle}>No redemptions yet</h4>
          <p style={emptyTextStyle}>When you redeem a coupon, it will appear here.</p>
        </div>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Coupon Code</th>
                <th style={thStyle}>Redemption Date</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Carbon Credits</th>
                <th style={thStyle}>Email ID</th>
              </tr>
            </thead>
            <tbody>
              {redemptions.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.userCoupon?.coupon?.code}</td>
                  <td style={tdStyle}>{new Date(item.redemptionTime).toLocaleDateString()}</td>
                  <td style={tdStyle}>{item.userCoupon?.coupon?.description}</td>
                  <td style={tdStyle}>{item.userCoupon?.coupon?.pointsRequired}</td>
                  <td style={tdStyle}>{item.userCoupon?.user?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RedemptionHistory;
