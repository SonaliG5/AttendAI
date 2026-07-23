import { Trash2 } from 'lucide-react'

function SubjectRow({ subject, onUpdate, onRemove }) {
  return (
    <tr className="border-t border-gray-200">
      <td className="p-3">
        <input
          type="text"
          value={subject.name}
          onChange={(e) => onUpdate(subject.id, 'name', e.target.value)}
          placeholder="Enter Subject Name"
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </td>
      <td className="p-3">
        <input
  type="number"
  value={subject.attended === 0 ? '' : subject.attended}
  onChange={(e) => onUpdate(subject.id, 'attended', e.target.value === '' ? 0 : Number(e.target.value))}
  className="w-20 border border-gray-300 rounded px-2 py-1"
/>
      </td>
      <td className="p-3">
     <input
  type="number"
  value={subject.total === 0 ? '' : subject.total}
  onChange={(e) => onUpdate(subject.id, 'total', e.target.value === '' ? 0 : Number(e.target.value))}
  className="w-20 border border-gray-300 rounded px-2 py-1"
/>
      </td>

      <td className="p-3 text-center">
  <input
    type="checkbox"
    checked={subject.is_complete}
    onChange={(e) => onUpdate(subject.id, 'is_complete', e.target.checked)}
    className="w-4 h-4"
  />
</td>

      <td className="p-3">
        <button onClick={() => onRemove(subject.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  )
}

export default SubjectRow