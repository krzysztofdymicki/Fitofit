import '../styles/Statistics.css'
import React, { useState } from 'react'
import { Table } from 'reactstrap'

const Statistics = ({ activities }) => {
  if (!activities || !activities.length) return null

  const transformDate = (date) => {
    date = new Date(date)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  const totalOfWeek = () => {
    return `${Math.round(activities.reduce((a, b) => a + b.distance, 0))} km`
  }
  return (
    <div id="statistics-container">
      <h3>This week</h3>
      <h4>Total: {totalOfWeek()}</h4>
      <Table bordered id="statistics-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {activities
            .sort((a, b) => a.date)
            .map((a, i) => (
              <tr key={i}>
                <td>{transformDate(a.date)}</td>
                <td>{a.start}</td>
                <td>{a.end}</td>
                <td>{a.distance} km</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Statistics
