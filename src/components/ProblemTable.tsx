"use client"
interface Problem{
  status:string,
  title:string,
  difficulty:string,
  category:string

}

interface ProblemTableProps{
  problems:Problem[]
}

 const ProblemTable:React.FC<ProblemTableProps> = ({problems}) => {
  return (
    <div className="container mx-auto my-8 p-4  ">
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 ">
        <thead>
          <tr>
            <th className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
            <th className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Title</th>
            <th className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Difficulty</th>
            <th className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Category</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{problem.status}</td>
              <td className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{problem.title}</td>
              <td className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{problem.difficulty}</td>
              <td className="py-3 px-8 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{problem.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default ProblemTable;

