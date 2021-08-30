import '../styles/Dashboard.css'
import React, { useEffect } from 'react'
import ActivityForm from './ActivityForm'
//import userService from '../services/userService'
import Statistics from './Statistics'

const Dashboard = ({ getActivities, addActivity, activities }) => {
  useEffect(() => {
    getActivities('week')
  }, [])

  return (
    <div id="dashboard-container">
      <ActivityForm addActivity={addActivity} />
      <Statistics activities={activities} />
    </div>
  )
}

export default Dashboard
