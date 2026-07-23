function SubjectReport({ subject }) {
  if (subject.isComplete) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{subject.name}</span>
          <span className="text-blue-600">
            ✅ {subject.currentPercent.toFixed(1)}% (Final)
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Course complete — no further classes remaining</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{subject.name}</span>
       <span className={subject.status === 'Safe' ? 'text-green-600' : 'text-red-600'}>
  {subject.status === 'Safe' ? '✅ Safe' : '⚠️ Low'} · {subject.currentPercent.toFixed(1)}%
</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{subject.recommendation}</p>
      <p className="text-xs text-gray-400 mt-1">Priority: {subject.priority}</p>
    </div>
  )
}

export default SubjectReport