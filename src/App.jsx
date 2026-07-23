
import { useState, useEffect } from 'react'
import { analyzeSubject } from './lib/attendance'
import { Trash2, Plus } from 'lucide-react'
import SubjectRow from './components/SubjectRow'
import SummaryCard from './components/SummaryCard'
import SubjectReport from './components/SubjectReport'



function App() {
  const [subjects, setSubjects] = useState([])
  const [requirement, setRequirement] = useState(75)
  const [report, setReport] = useState(null)
  const [summary, setSummary] = useState(null)

  useEffect(() => {
  fetch('http://localhost:3001/api/subjects')
    .then((res) => res.json())
    .then((data) => setSubjects(data))
    .catch((err) => console.error('Failed to load subjects:', err))
}, [])

async function addSubject() {
  try {
    const res = await fetch('http://localhost:3001/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', attended: 0, total: 0 }),
    })
    const newSubject = await res.json()
    setSubjects([...subjects, newSubject])
  } catch (err) {
    console.error('Failed to add subject:', err)
  }
}



async function updateSubject(id, field, value) {
  const subject = subjects.find((s) => s.id === id)
  const updated = { ...subject, [field]: value }
  setSubjects(subjects.map((s) => (s.id === id ? updated : s)))

  try {
    await fetch(`http://localhost:3001/api/subjects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: updated.name,
        attended: updated.attended,
        total: updated.total,
        is_complete: updated.is_complete ?? false,
      }),
    })
  } catch (err) {
    console.error('Failed to update subject:', err)
  }
}


async function removeSubject(id) {
  setSubjects(subjects.filter((s) => s.id !== id))
  try {
    await fetch(`http://localhost:3001/api/subjects/${id}`, { method: 'DELETE' })
  } catch (err) {
    console.error('Failed to delete subject:', err)
  }
}

function getSummary(results) {
  const needsAttention = results.filter((s) => s.status === 'Low' && !s.isComplete)
  const strongest = results.reduce(
    (best, s) => (!best || s.currentPercent > best.currentPercent ? s : best),
    null
  )
  return { needsAttention, strongest }
}


 function generateReport() {
  const results = subjects
    .filter((s) => s.name.trim() !== '' && s.total > 0)
    .map((s) => ({
      ...s,
      ...analyzeSubject(s.attended, s.total, requirement, s.is_complete),
    }))
  setReport(results)
  setSummary(getSummary(results))
}


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">AttendTrack</h1>

      <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 text-sm font-semibold text-gray-600">Subject</th>
            <th className="text-left p-3 text-sm font-semibold text-gray-600">Attended</th>
            <th className="text-left p-3 text-sm font-semibold text-gray-600">Total</th>
            <th className="text-center p-3 text-sm font-semibold text-gray-600">Complete</th>
            <th className="p-3"></th>
          </tr>
        </thead>
     <tbody>
      {subjects.map((s) => (
        <SubjectRow
        key={s.id}
        subject={s}
        onUpdate={updateSubject}
        onRemove={removeSubject}
    />
  ))}
</tbody>
</table>


<div className="mt-6 flex items-center gap-4">
  <label className="text-sm font-medium text-gray-700">
    Requirement:
    <select
      value={requirement}
      onChange={(e) => setRequirement(Number(e.target.value))}
      className="ml-2 border border-gray-300 rounded px-2 py-1"
    >
      {[65, 70, 75, 80, 85, 90].map((pct) => (
        <option key={pct} value={pct}>{pct}%</option>
      ))}
    </select>
  </label>

  <button
    onClick={generateReport}
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  >
    Generate Report
  </button>
</div>

<button
  onClick={addSubject}
  className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
  <Plus size={18} /> Add Subject
</button>


{report && (
  <div className="mt-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Report</h2>
    <SummaryCard summary={summary} />
   <div className="space-y-3">
  {report.map((s) => (
    <SubjectReport key={s.id} subject={s} />
  ))}
</div>
</div>
)}
</div>
  )
}

export default App