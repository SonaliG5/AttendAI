function SummaryCard({ summary }) {
  if (!summary) return null

  if (summary.needsAttention.length === 0 && !summary.strongest) {
    return (
      <div className="mb-4 p-4 bg-[#F0EBDC] border border-[#E4DCC8] rounded-lg text-sm text-[#5A5F73]">
        No subjects added yet — add a subject above and fill in your attended/total classes to generate a report.
      </div>
    )
  }

  return (
    <div className="mb-4 p-4 bg-[#FAEEDA] border border-[#F0DBAF] rounded-lg text-sm">
      {summary.needsAttention.length > 0 ? (
        <p className="text-[#791F1F]">
          {summary.needsAttention.length} subject{summary.needsAttention.length === 1 ? '' : 's'} need attention: {' '}
          {summary.needsAttention.map((s) => s.name).join(', ')}
        </p>
      ) : (
        <p className="text-[#085041]">All subjects are on track.</p>
      )}
      {summary.strongest && (
        <p className="text-[#5A5F73] mt-1">
          Strongest subject: <strong className="text-[#1C2541]">{summary.strongest.name}</strong> at {summary.strongest.currentPercent.toFixed(1)}%
        </p>
      )}
    </div>
  )
}

export default SummaryCard