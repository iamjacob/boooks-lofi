'use client';

import { useEffect } from 'react';
import { IndexedDBAdapter } from '@/storage/idb';
import { bootstrapUser } from '@/core/bootstrap/bootstrapUser';
import ClientApp from './ClientApp';

export default function Page() {
  useEffect(() => {
    const adapter = new IndexedDBAdapter();

    bootstrapUser(adapter).then((userId) => {
      console.log('Boooks user:', userId);
    });
  }, []);


return <ClientApp />;
}
