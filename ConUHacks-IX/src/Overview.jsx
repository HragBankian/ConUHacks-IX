import React from 'react';
import Header from './Header';
import './Overview.css'; 
import piechart from './assets/piechart.png';
import tfsa_chart from './assets/tfsa_chart.png';

const Overview = () => {
    
    const portfolio = {
        tfsa: { value: 15000, percentage: 25 },
        rrsp: { value: 25000, percentage: 40 },
        fhsa: { value: 10000, percentage: 15 },
        unregistered: { value: 15000, percentage: 20 },
    };

    return (
        <>
        <Header />
        <div className="overview-container">
            <h1>Overview of Your Investment Portfolio</h1>
            <p>Welcome to the overview page. Here you will find a summary of your key information.</p>

            <div className="portfolio-summary">
                <h2>Portfolio Distribution<br />
                <img
                                    src={piechart}
                                    alt="Piechart"
                                    style={{ maxWidth: '70%', height: 'auto', marginTop: '15px' }}
                                /></h2>
                <div className="account-card">
                    <h3>TFSA (Tax-Free Savings Account)</h3>
                    <p>Value: ${portfolio.tfsa.value}</p>
                    <p>Percentage of Portfolio: {portfolio.tfsa.percentage}%</p>
                    <p>Advice: The TFSA is great for tax-free growth. <br />Consider allocating higher-risk investments for long-term growth.<br /></p>
                    <img
                                    src={tfsa_chart}
                                    alt="TFSA Chart"
                                    style={{ maxWidth: '70%', height: 'auto', marginTop: '15px' }}
                                />
                </div>

                <div className="account-card">
                    <h3>RRSP (Registered Retirement Savings Plan)</h3>
                    <p>Value: ${portfolio.rrsp.value}</p>
                    <p>Percentage of Portfolio: {portfolio.rrsp.percentage}%</p>
                    <p>Advice: Your RRSP offers tax deductions now, and taxes will be paid when you withdraw funds in retirement. Diversify between bonds and equities based on your risk tolerance.</p>
                </div>

                <div className="account-card">
                    <h3>FHSA (First Home Savings Account)</h3>
                    <p>Value: ${portfolio.fhsa.value}</p>
                    <p>Percentage of Portfolio: {portfolio.fhsa.percentage}%</p>
                    <p>Advice: Use your FHSA for your first home purchase. It combines the features of an RRSP and TFSA, offering tax-free growth and deductions for contributions.</p>
                </div>

                <div className="unr_account-card">
                    <h3>Unregistered Account</h3>
                    <p>Value: ${portfolio.unregistered.value}</p>
                    <p>Percentage of Portfolio: {portfolio.unregistered.percentage}%</p>
                    <p>Advice: This account has no tax benefits, but you have full access to your funds. Invest in lower-taxed assets, such as dividend-paying stocks, to minimize tax impact.</p>
                </div>
            </div>

            <div className="investment-chart">
                <h2>Investment Distribution Chart (Mockup)</h2>
                {/* You can later replace this with a chart library like Chart.js or Recharts */}
                <div className="chart">
                    <div className="chart-bar" style={{ width: `${portfolio.tfsa.percentage}%`, backgroundColor: '#f50b75' }}>TFSA</div>
                    <div className="chart-bar" style={{ width: `${portfolio.rrsp.percentage}%`, backgroundColor: '#0f6f99' }}>RRSP</div>
                    <div className="chart-bar" style={{ width: `${portfolio.fhsa.percentage}%`, backgroundColor: '#28a745' }}>FHSA</div>
                    <div className="chart-bar" style={{ width: `${portfolio.unregistered.percentage}%`, backgroundColor: '#ffc107' }}>Unregistered</div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Overview;
