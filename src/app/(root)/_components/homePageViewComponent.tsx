import AlertDialogHome from "./alertdialoghome";
import BillBookCard from "./billbookcard";
import { BillBookPreview } from "./models";


export function HomePageComponent({data}:{data : BillBookPreview[]}) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-semibold text-gray-900">Welcome to BillBook</h2>
              <AlertDialogHome /> 
            </div>
            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((book) => (
                  <BillBookCard key={book.billbookId} book={book}/>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-xl text-gray-500">Create a bill book now</p>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }
  