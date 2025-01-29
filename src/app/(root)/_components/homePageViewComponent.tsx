import AlertDialogHome from "./alertdialoghome";
import BillBookCard from "./billbookcard";
import { BillBookPreview } from "./models";
import { Plus } from "lucide-react"; // Import Lucide icons

export function HomePageComponent({data}:{data : BillBookPreview[]}) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Your BillBooks</h1>
                <p className="mt-1 text-gray-500">Manage and track your shared expenses</p>
              </div>
              <AlertDialogHome />
            </div>

            {/* BillBooks Grid */}
            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Create New BillBook Card */}
                {/* <div className="group relative bg-white rounded-xl border border-dashed border-gray-300 p-6 hover:border-gray-400 transition-all duration-200 cursor-pointer">
                  <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-400 group-hover:text-gray-600">
                    <Plus className="w-12 h-12 mb-4" />
                    <span className="text-sm font-medium">Create New BillBook</span>
                  </div>
                </div> */}

                {/* Existing BillBooks */}
                {data.map((book) => (
                  <div key={book.billbookId} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <BillBookCard book={book}/>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">No BillBooks Yet</h3>
                    <p className="text-gray-500 max-w-sm">
                      Create your first BillBook to start tracking shared expenses with friends and family
                    </p>
                  </div>
                  <AlertDialogHome />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
  