import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar, Pie } from 'react-chartjs-2';
  import { LoadingSpinner } from './loading.js';
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  
  export const BarChart = ({ data, labels, loading = false, error = null }) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">{error}</div>;
    
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Action Count',
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  
    return <Bar data={chartData} options={chartOptions} />;
  };
  
  export const PieChart = ({ data, labels, loading = false, error = null }) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">{error}</div>;
    
    const chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', 
                    '#3357FF', '#FF33A1', '#A1FF33', '#F0A1FF', '#FF9633'],
        },
      ],
    };
  
    return <Pie data={chartData} options={chartOptions} />;
  };
  
  export const ConversionRateChart = ({ data, loading = false, error = null }) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">{error}</div>;
  
    const chartData = {
      labels: data.map((item) => `User ${item.UserID}`),
      datasets: [
        {
          label: 'View Count',
          data: data.map((item) => item.ViewCount),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Add to Cart Count',
          data: data.map((item) => item.AddToCartCount),
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
        {
          label: 'Purchase Count',
          data: data.map((item) => item.PurchaseCount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    return <Bar data={chartData} options={chartOptions} />;
  };
  