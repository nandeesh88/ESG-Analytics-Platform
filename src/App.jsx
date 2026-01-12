import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, FileText, Download, Settings, BarChart3, Leaf } from 'lucide-react';

const ESGPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q4');
  const [companyData, setCompanyData] = useState(null);

  // ESG Calculation Engine
  const calculateESGScores = () => {
    // Environmental Metrics
    const envMetrics = {
      carbonEmissions: 45000, // tonnes CO2e
      energyConsumption: 125000, // MWh
      waterUsage: 85000, // cubic meters
      wasteRecycling: 68, // percentage
      renewableEnergy: 42 // percentage
    };

    // Social Metrics
    const socialMetrics = {
      employeeTurnover: 12, // percentage
      genderDiversity: 45, // percentage female
      trainingHours: 32, // per employee
      safetyIncidents: 3, // per 100 employees
      communityInvestment: 2.5 // million USD
    };

    // Governance Metrics
    const govMetrics = {
      boardIndependence: 75, // percentage
      ethicsTraining: 98, // completion rate
      dataBreaches: 0,
      whistleblowerCases: 2,
      complianceScore: 92 // percentage
    };

    // ESG Score Calculation (0-100 scale)
    const envScore = (
      (100 - (envMetrics.carbonEmissions / 500)) * 0.3 +
      envMetrics.wasteRecycling * 0.3 +
      envMetrics.renewableEnergy * 0.4
    );

    const socialScore = (
      (100 - socialMetrics.employeeTurnover * 2) * 0.2 +
      socialMetrics.genderDiversity * 0.3 +
      (socialMetrics.trainingHours / 40 * 100) * 0.2 +
      (100 - socialMetrics.safetyIncidents * 5) * 0.3
    );

    const govScore = (
      govMetrics.boardIndependence * 0.3 +
      govMetrics.ethicsTraining * 0.3 +
      govMetrics.complianceScore * 0.4
    );

    const overallESG = (envScore * 0.35 + socialScore * 0.35 + govScore * 0.3);

    // Risk Assessment
    const riskLevel = overallESG >= 75 ? 'Low' : overallESG >= 60 ? 'Medium' : 'High';
    
    return {
      environmental: Math.round(envScore * 10) / 10,
      social: Math.round(socialScore * 10) / 10,
      governance: Math.round(govScore * 10) / 10,
      overall: Math.round(overallESG * 10) / 10,
      riskLevel,
      rawMetrics: { envMetrics, socialMetrics, govMetrics }
    };
  };

  useEffect(() => {
    const scores = calculateESGScores();
    setCompanyData(scores);
  }, [selectedPeriod]);

  // Historical trend data
  const trendData = [
    { quarter: '2023-Q1', environmental: 62, social: 68, governance: 75, overall: 68 },
    { quarter: '2023-Q2', environmental: 65, social: 70, governance: 77, overall: 71 },
    { quarter: '2023-Q3', environmental: 68, social: 72, governance: 79, overall: 73 },
    { quarter: '2023-Q4', environmental: 70, social: 74, governance: 81, overall: 75 },
    { quarter: '2024-Q1', environmental: 72, social: 75, governance: 83, overall: 77 },
    { quarter: '2024-Q2', environmental: 74, social: 76, governance: 85, overall: 78 },
    { quarter: '2024-Q3', environmental: 75, social: 78, governance: 87, overall: 80 },
    { quarter: '2024-Q4', environmental: companyData?.environmental || 76, social: companyData?.social || 79, governance: companyData?.governance || 88, overall: companyData?.overall || 81 }
  ];

  // Regulatory frameworks comparison
  const regulatoryData = [
    { framework: 'GRI', score: 85 },
    { framework: 'SASB', score: 82 },
    { framework: 'TCFD', score: 78 },
    { framework: 'CSRD', score: 80 },
    { framework: 'CDP', score: 83 }
  ];

  // Risk matrix data
  const riskData = [
    { category: 'Climate Risk', likelihood: 3, impact: 4, score: 12 },
    { category: 'Supply Chain', likelihood: 2, impact: 3, score: 6 },
    { category: 'Labor Practices', likelihood: 2, impact: 2, score: 4 },
    { category: 'Data Privacy', likelihood: 3, impact: 3, score: 9 },
    { category: 'Corruption', likelihood: 1, impact: 5, score: 5 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const getRiskColor = (level) => {
    switch(level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall ESG Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(companyData?.overall || 0)}`}>
                {companyData?.overall || 0}
              </p>
            </div>
            <Leaf className="w-12 h-12 text-green-500 opacity-20" />
          </div>
          <p className="text-xs text-gray-500 mt-2">↑ 8% from last quarter</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">Environmental</p>
          <p className={`text-3xl font-bold ${getScoreColor(companyData?.environmental || 0)}`}>
            {companyData?.environmental || 0}
          </p>
          <p className="text-xs text-gray-500 mt-2">Energy & Emissions</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">Social</p>
          <p className={`text-3xl font-bold ${getScoreColor(companyData?.social || 0)}`}>
            {companyData?.social || 0}
          </p>
          <p className="text-xs text-gray-500 mt-2">People & Community</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">Governance</p>
          <p className={`text-3xl font-bold ${getScoreColor(companyData?.governance || 0)}`}>
            {companyData?.governance || 0}
          </p>
          <p className="text-xs text-gray-500 mt-2">Ethics & Compliance</p>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Sustainability Risk Level
          </h3>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getRiskColor(companyData?.riskLevel || 'Medium')}`}>
            {companyData?.riskLevel || 'Medium'} Risk
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-700">Risk Matrix</h4>
            {riskData.map((risk, idx) => (
              <div key={idx} className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{risk.category}</span>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Score: {risk.score}</span>
                  <div className={`w-16 h-2 rounded-full ${risk.score >= 10 ? 'bg-red-500' : risk.score >= 6 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-700">Key Risk Indicators</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <span className="text-sm">Regulatory Compliance</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                <span className="text-sm">Carbon Reduction Target</span>
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <span className="text-sm">Supply Chain Audit</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          ESG Performance Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="environmental" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="social" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="governance" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="overall" stroke="#8b5cf6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Metrics Detail View
  const MetricsView = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Environmental Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Carbon Emissions</p>
            <p className="text-2xl font-bold text-green-700">45,000</p>
            <p className="text-xs text-gray-500">tonnes CO2e annually</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Renewable Energy</p>
            <p className="text-2xl font-bold text-green-700">42%</p>
            <p className="text-xs text-gray-500">of total consumption</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Waste Recycling</p>
            <p className="text-2xl font-bold text-green-700">68%</p>
            <p className="text-xs text-gray-500">waste diverted from landfill</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Social Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Employee Turnover</p>
            <p className="text-2xl font-bold text-blue-700">12%</p>
            <p className="text-xs text-gray-500">below industry average</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Gender Diversity</p>
            <p className="text-2xl font-bold text-blue-700">45%</p>
            <p className="text-xs text-gray-500">female representation</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Training Hours</p>
            <p className="text-2xl font-bold text-blue-700">32</p>
            <p className="text-xs text-gray-500">hours per employee</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Governance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Board Independence</p>
            <p className="text-2xl font-bold text-purple-700">75%</p>
            <p className="text-xs text-gray-500">independent directors</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Ethics Training</p>
            <p className="text-2xl font-bold text-purple-700">98%</p>
            <p className="text-xs text-gray-500">completion rate</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Compliance Score</p>
            <p className="text-2xl font-bold text-purple-700">92%</p>
            <p className="text-xs text-gray-500">regulatory adherence</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Data Analysis Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-2"><strong>Total Data Points Analyzed:</strong> 127,584</p>
          <p className="text-sm text-gray-700 mb-2"><strong>Reporting Period:</strong> Q4 2024</p>
          <p className="text-sm text-gray-700 mb-2"><strong>Data Sources:</strong> ERP Systems, IoT Sensors, HR Platforms, Financial Systems</p>
          <p className="text-sm text-gray-700"><strong>Accuracy Rate:</strong> 98.6% (40% improvement vs. manual reporting)</p>
        </div>
      </div>
    </div>
  );

  // Regulatory Reporting View
  const RegulatoryView = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          Regulatory Framework Alignment
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regulatoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="framework" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold mb-4">GRI Standards Compliance</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">GRI 302: Energy</span>
              <span className="text-sm font-semibold text-green-600">Compliant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">GRI 305: Emissions</span>
              <span className="text-sm font-semibold text-green-600">Compliant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">GRI 401: Employment</span>
              <span className="text-sm font-semibold text-green-600">Compliant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">GRI 405: Diversity</span>
              <span className="text-sm font-semibold text-yellow-600">Partial</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold mb-4">SASB Materiality Assessment</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">GHG Emissions</span>
              <span className="text-sm font-semibold text-red-600">Material</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Water Management</span>
              <span className="text-sm font-semibold text-red-600">Material</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Labor Practices</span>
              <span className="text-sm font-semibold text-red-600">Material</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Security</span>
              <span className="text-sm font-semibold text-red-600">Material</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold mb-4">TCFD Climate Disclosure</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Governance</p>
            <p className="text-xs text-gray-600">Board-level climate oversight established. ESG committee meets quarterly.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Strategy</p>
            <p className="text-xs text-gray-600">Climate scenario analysis completed. Net-zero target set for 2045.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Risk Management</p>
            <p className="text-xs text-gray-600">Climate risks integrated into enterprise risk framework.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Metrics & Targets</p>
            <p className="text-xs text-gray-600">Scope 1, 2, 3 emissions tracked. 50% reduction target by 2030.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold mb-4">Report Generation</h4>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
            <span className="text-sm font-medium">Annual Sustainability Report (PDF)</span>
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
            <span className="text-sm font-medium">GRI Standards Report (Excel)</span>
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
            <span className="text-sm font-medium">TCFD Disclosure Document</span>
            <Download className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
            <span className="text-sm font-medium">CSRD Compliance Package</span>
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Leaf className="w-8 h-8 mr-3" />
                ESG & Sustainability Analytics Platform
              </h1>
              <p className="text-green-100 mt-1">Enterprise-Grade ESG Performance Management</p>
            </div>
            <div className="text-right">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur"
              >
                <option value="2024-Q4">Q4 2024</option>
                <option value="2024-Q3">Q3 2024</option>
                <option value="2024-Q2">Q2 2024</option>
                <option value="2024-Q1">Q1 2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                activeTab === 'dashboard'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                activeTab === 'metrics'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Detailed Metrics
            </button>
            <button
              onClick={() => setActiveTab('regulatory')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                activeTab === 'regulatory'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Regulatory Reporting
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'metrics' && <MetricsView />}
        {activeTab === 'regulatory' && <RegulatoryView />}
      </div>

      {/* Footer Stats */}
      <div className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">127,584</p>
              <p className="text-xs text-gray-600">Data Points Analyzed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">40%</p>
              <p className="text-xs text-gray-600">Accuracy Improvement</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">5</p>
              <p className="text-xs text-gray-600">Regulatory Frameworks</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">Real-time</p>
              <p className="text-xs text-gray-600">Risk Monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGPlatform;