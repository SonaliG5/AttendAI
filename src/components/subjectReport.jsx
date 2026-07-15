function SubjectReport({ subject }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{subject.name}</span>
        <span className={subject.status === 'Safe' ? 'text-green-600' : 'text-red-600'}>
          {subject.status === 'Safe' ? '✅ Safe' : '⚠️ Low'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{subject.recommendation}</p>
      <p className="text-xs text-gray-400 mt-1">Priority: {subject.priority}</p>
    </div>
  )
}

export default SubjectReport