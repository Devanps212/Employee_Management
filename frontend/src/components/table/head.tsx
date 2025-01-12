import { TableData } from "../../types/form";

const RenderHeader = ({type}: {type: TableData})=>{
    switch (type) {
      case "Employee":
        return (
            <thead>
                <tr>
                    <th className="px-4 py-2 border-b text-left">SI no</th>
                    <th className="px-4 py-2 border-b text-left">Name</th>
                    <th className="px-4 py-2 border-b text-left">Position</th>
                    <th className="px-4 py-2 border-b text-left">Department</th>
                    <th className="px-4 py-2 border-b text-left">Email</th>
                    <th className="px-4 py-2 border-b text-left">Salary</th>
                    <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
            </thead>
        )
      case "Department":
        return (
            <thead>
                <tr>
                    <th className="px-4 py-2 border-b text-left" >SI no</th>
                    <th className="px-4 py-2 border-b text-left">Department Name</th>
                    <th className="px-4 py-2 border-b text-left">Description</th>
                    <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
            </thead>
        )
      default:
        return null
    }
}
export default RenderHeader