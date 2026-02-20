// src/components/Dashboard/CallTable.tsx
type Call = {
  _id: string;
  patientPhone: string;
  summary: string;
  status: 'booked' | 'inquiry';
  createdAt: string;
};

export default function CallTable({ calls }: { calls: Call[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
      <table className="min-w-full bg-white font-inter">
        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
          <tr>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Patient</th>
            <th className="px-6 py-4">AI Summary</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {calls.map((call) => (
            <tr key={call._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(call.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 font-medium">{call.patientPhone}</td>
              <td className="px-6 py-4 italic text-gray-600">&quot;{call.summary}&quot;</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  call.status === 'booked' ? 'bg-green-100 text-green-700' : 'bg-gold-100 text-gold-700'
                }`}>
                  {call.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



