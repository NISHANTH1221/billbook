"use client"

import { BillBookPreview } from "./models";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function BillBookCard({ book }: { book: BillBookPreview }) {
  const formatDate = (date: string | Date) => {
    return format(new Date(date), 'MM/dd/yyyy');
  };

  return (
    <Link href={`/billbooks/${book.billbookId}`}>
      <div className="p-6 h-full flex flex-col space-y-4">
        {/* Card Header */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {book.description || "No description provided"}
          </p>
        </div>

        {/* Card Stats */}
        <div className="flex-grow">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Updated {formatDate(book.lastUpdated)}</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </Link>
  );
}