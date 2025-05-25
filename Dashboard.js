import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/time-logs')
      .then(res => setLogs(res.data))
      .catch(err => alert('Failed to load logs'));
  }, []);

  return (
    <div>
      <h2>Your Time Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.start_time} - {log.end_time}: {log.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
