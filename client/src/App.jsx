import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Profile from './Components/Profile/Profile';
import Centers from './Components/Center/Center';
import AddCenter from './Components/AddCenter/AddCenter';
import EditCenter from './Components/EditCenter/EditCenter';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Packages from './Components/Packages/Packages';
import AddPackage from './Components/AddPackage/AddPackage';
import EditPackage from './Components/EditPackage/EditPackage';
import Members from './Components/Members/Members';
import AddMember from './Components/AddMember/AddMember';
import MemberProfile from './Components/MemberProfile/MemberProfile';
import AddVisitors from './Components/AddVisitors/AddVisitors';
import Visitors from './Components/Visitors/Visitors';
import Transactions from './Components/Transactions/Transactions';
import Export from './Components/Export/Export';
import AddTransaction from './Components/AddTransaction/AddTransaction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/home',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/profile',
    element: <Layout><Profile /></Layout>
  },
  {
    path: '/centers',
    element: <Layout><Centers /></Layout>
  },
  {
    path: '/add_center',
    element: <Layout><AddCenter /></Layout>
  },
  {
    path: '/edit_center/:id',
    element: <Layout><EditCenter /></Layout>
  },
  {
    path: '/packages',
    element: <Layout><Packages /></Layout>
  },
  {
    path: '/add_package',
    element: <Layout><AddPackage /></Layout>
  },
  {
    path: '/edit_package/:id',
    element: <Layout><EditPackage /></Layout>
  },
  {
    path: '/members',
    element: <Layout><Members /></Layout>
  },
  {
    path: '/add_member',
    element: <Layout><AddMember /></Layout>
  },
  {
    path: '/member_profile/:id',
    element: <Layout><MemberProfile /></Layout>
  },
  {
    path: '/add_transaction/:id',
    element: <Layout><AddTransaction /></Layout>
  },
  
  {
    path: '/visitors',
    element: <Layout><Visitors /></Layout>
  },
  {
    path: '/add_visitors',
    element: <Layout><AddVisitors /></Layout>
  },
  {
    path: '/transactions',
    element: <Layout><Transactions /></Layout>
  },
  {
    path: '/export',
    element: <Layout><Export /></Layout>
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
