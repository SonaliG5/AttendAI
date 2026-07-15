import { analyzeSubject } from './lib/attendance'
import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'

function App() {
  const [subjects, setSubjects] = useState([])
  const [requirement, setRequirement] = useState(75)
  const [report, setReport] = useState(null)
  const [summary, setSummary] = useState(null)

  function addSubject() {
    setSubjects([
      ...subjects,
      { id: crypto.randomUUID(), name: '', attended: 0, total: 0 },
    ])
  }

  function removeSubject(id) {
    setSubjects(subjects.filter((s) => s.id !== id))
  }

  function updateSubject(id, field, value) {
    setSubjects(
      subjects.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    )
  }


function generateReport() {
  const results = subjects
    .filter((s) => s.name.trim() !== '' && s.total > 0)
    .map((s) => ({
      ...s,
      ...analyzeSubject(s.attended, s.total, requirement),
    }))
  setReport(results)
  setSummary(getSummary(results))
}


function getSummary(results) {
  const needsAttention = results.filter((s) => s.status === 'Low')
  const strongest = results.reduce(
    (best, s) => (!best || s.currentPercent > best.currentPercent ? s : best),
    null
  )
  return { needsAttention, strongest }
}


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">AttendAI</h1>

      <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 text-sm font-semibold text-gray-600">Subject</th>
            <th className="text-left p-3 text-sm font-semibold text-gray-600">Attended</th>
            <th className="text-left p-3 text-sm font-semibold text-gray-600">Total</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s.id} className="border-t border-gray-200">
              <td className="p-3">
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => updateSubject(s.id, 'name', e.target.value)}
                  placeholder="e.g. Data Structures"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </td>
              <td className="p-3">
                <input
                  type="number"
                  value={s.attended}
                  onChange={(e) => updateSubject(s.id, 'attended', Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded px-2 py-1"
                />
              </td>
              <td className="p-3">
                <input
                  type="number"
                  value={s.total}
                  onChange={(e) => updateSubject(s.id, 'total', Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded px-2 py-1"
                />
              </td>
              <td className="p-3">
                <button
                  onClick={() => removeSubject(s.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
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

    {summary && (
  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
    {summary.needsAttention.length > 0 ? (
      <p className="text-red-700">
        ⚠️ {summary.needsAttention.length} subject{summary.needsAttention.length === 1 ? '' : 's'} need attention: {' '}
        {summary.needsAttention.map((s) => s.name).join(', ')}
      </p>
    ) : (
      <p className="text-green-700">✅ All subjects are on track.</p>
    )}
    {summary.strongest && (
      <p className="text-gray-700 mt-1">
        💪 Strongest subject: <strong>{summary.strongest.name}</strong> at {summary.strongest.currentPercent.toFixed(1)}%
      </p>
    )}
  </div>
)}


    <div className="space-y-3">
      {report.map((s) => (
        <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{s.name}</span>
            <span className={s.status === 'Safe' ? 'text-green-600' : 'text-red-600'}>
              {s.status === 'Safe' ? '✅ Safe' : '⚠️ Low'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{s.recommendation}</p>
          <p className="text-xs text-gray-400 mt-1">Priority: {s.priority}</p>
        </div>
      ))}
    </div>
  </div>
  
)}

    </div>
  )
}

export default App