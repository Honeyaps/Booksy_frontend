import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import './dashboard.css';
import moment from 'moment';
import { LoadingSpinner } from '../../../../shared/helpers/helper';
import AdminAPIService from '../../../../services/admin_service';
import { toast } from 'sonner';
import { Alert } from 'react-bootstrap';
import { CiSearch } from 'react-icons/ci';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineRefresh } from "react-icons/hi";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([moment().subtract(30, 'days').toDate(), moment().toDate()]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    fetchDashboardData(dateRange);
  }, []);

  const fetchDashboardData = async (range) => {
    setLoading(true);

    const payload = {
      start_date_time: moment(range[0]).format('YYYY-MM-DD'),
      end_date_time: moment(range[1]).format('YYYY-MM-DD'),
    };

    try {
      const response = await AdminAPIService.getdashboardata(payload);
      setDashboardData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      toast.error('Error fetching dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboard = () => {
    const newDateRange = [moment().subtract(30, 'days').toDate(), moment().toDate()];
    setDateRange(newDateRange);
    fetchDashboardData(newDateRange);
  };

  const handleSearch = () => {
    fetchDashboardData(dateRange);
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Labels for each bar
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 8000, 7500, 9000, 10000], // Revenue values
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const mergeCategoryData = () => {
    const revenueByCategory = dashboardData?.revenueByCategory || [];
    const soldOutcategories = dashboardData?.soldOutcategories || [];
    const totalcategorieProducts = dashboardData?.totalcategorieProducts || [];

    // Create a map for each array by category name (_id)
    const revenueMap = revenueByCategory.reduce((acc, item) => {
      acc[item._id] = { totalRevenue: item.totalRevenue };
      return acc;
    }, {});

    const soldOutMap = soldOutcategories.reduce((acc, item) => {
      acc[item._id] = { soldOut: item.total };
      return acc;
    }, {});

    const totalProductsMap = totalcategorieProducts.reduce((acc, item) => {
      acc[item._id] = { totalProducts: item.count };
      return acc;
    }, {});

    // Merge all data by category (_id)
    const allCategories = new Set([
      ...revenueByCategory.map(item => item._id),
      ...soldOutcategories.map(item => item._id),
      ...totalcategorieProducts.map(item => item._id)
    ]);

    const mergedData = Array.from(allCategories).map(category => ({
      category,
      totalRevenue: revenueMap[category]?.totalRevenue || 0,
      soldOut: soldOutMap[category]?.soldOut || 0,
      totalProducts: totalProductsMap[category]?.totalProducts || 0
    }));

    return mergedData;
  };

  const mergedCategoryData = mergeCategoryData();

  return (
    <div className="container-fluid">
      {/* Row for the Dashboard title */}
      <div className="row">
        <div className="col-md-12 bg-white shadow p-3 d-flex justify-content-between">
          <div className="d-flex">
            <h3 className="dashboard-title">Dashboard</h3>
          </div>
          <div className='d-flex'>
            <DatePicker
              selected={startDate}
              onChange={(update) => setDateRange(update)}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              className="mx-2"
              placeholderText="Select Date Range"
              withPortal
            />
            <button className='form_btn mx-2 px-2' onClick={handleSearch}>
              <CiSearch className='nav-icon fs-3' />
            </button>
            <button className='mx-2 px-2 refresh' onClick={refreshDashboard}>
              <HiOutlineRefresh className='nav-icon fs-3' />
            </button>
          </div>
        </div>
      </div>

      {/* Row for dashboard cards */}
      {loading ? (
        <div className="spinner-container">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="row mt-2">
            <div className="col-md-3">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">Total Users</p>
                  <h5 className="card-text">
                    <CountUp start={0} end={dashboardData?.totalUsers || 0} duration={3} easing="easeOutQuint" />
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">Total Orders</p>
                  <h5 className="card-text">
                    <CountUp start={0} end={dashboardData?.totalOrders || 0} duration={3} easing="easeOutQuint" />
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">Average Order Quantity</p>
                  <h5 className="card-text">
                    <CountUp start={0} end={dashboardData?.averageOrderQuantity || 0} duration={3} easing="easeOutQuint" />
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">Total Revenue</p>
                  <h5 className="card-text">
                    <CountUp start={0} end={dashboardData?.totalRevenue || 0} duration={3} easing="easeOutQuint" prefix="Rs. " />
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-3">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">Total Products Sold</p>
                  <h5 className="card-text">
                    <CountUp start={0} end={dashboardData?.totalProductsSold || 0} duration={3} easing="easeOutQuint" separator="," />
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            {/* Table for Category Data */}
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body" style={{ height: 'auto' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Revenue</th>
                        <th scope="col">Sold Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mergedCategoryData.map((categoryData, index) => (
                        <tr key={index}>
                          <td>{categoryData.category}</td>
                          <td>Rs. {categoryData.totalRevenue}</td>
                          <td>{categoryData.soldOut}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* System alert */}
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-header">
                  <h5 className="card-title">System Alert</h5>
                </div>
                <div className="card-body">
                  <Alert variant="info">No System Alert</Alert>
                </div>
              </div>
            </div>

            {/* Graph for Total Revenue */}
            {/* <div className="col-md-12 mt-2">
              <div className="card shadow">
                <div className="card-header">
                  <h5 className="card-title">Total Revenue</h5>
                </div>
                <div className="card-body" style={{ height: '400px' }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div> */}

          </div>
        </>
      )}
    </div>
  );
};
