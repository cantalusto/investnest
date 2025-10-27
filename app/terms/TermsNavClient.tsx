'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TermsNavClient() {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <button
        onClick={() => router.back()}
        className="px-3 py-1 rounded bg-primary text-black text-sm"
      >
        Voltar
      </button>
      <Link
        href="/"
        className="px-3 py-1 rounded border border-primary text-sm text-gray-200 hover:bg-zinc-800"
      >
        Início
      </Link>
    </div>
  );
}
