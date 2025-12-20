'use client';

import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
  event: string;
  date: string;
}

export function TestimonialCard({ name, rating, comment, event, date }: TestimonialProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic leading-relaxed">
        &quot;{comment}&quot;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{event}</p>
        </div>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
}
