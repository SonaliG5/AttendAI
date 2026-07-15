function SummaryCard({ summary }) {
  if (!summary) return null

  return (
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
  )
}

export default SummaryCard