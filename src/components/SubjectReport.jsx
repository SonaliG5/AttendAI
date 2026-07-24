function SubjectReport({ subject }) {
  if (subject.isComplete) {
    return (
      <div className="bg-white border border-[#E4DCC8] rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[#1C2541]">{subject.name}</span>
          <span className="text-sm font-medium text-[#085041] bg-[#E1F5EE] px-3 py-1 rounded-full">
            {subject.currentPercent.toFixed(1)}% final
          </span>
        </div>
        <p className="text-sm text-[#5A5F73] mt-2">Course complete — no further classes remaining</p>
      </div>
    )
  }

  const isSafe = subject.status === 'Safe'

  return (
    <div className="bg-white border border-[#E4DCC8] rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-[#1C2541]">{subject.name}</span>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            isSafe ? 'text-[#854F0B] bg-[#FAEEDA]' : 'text-[#791F1F] bg-[#FCEBEB]'
          }`}
        >
          {subject.currentPercent.toFixed(1)}% {isSafe ? 'safe' : 'low'}
        </span>
      </div>
      <p className="text-sm text-[#5A5F73] mt-2">{subject.recommendation}</p>
      <p className="text-xs text-[#8A8670] mt-1">Priority: {subject.priority}</p>
    </div>
  )
}

export default SubjectReport