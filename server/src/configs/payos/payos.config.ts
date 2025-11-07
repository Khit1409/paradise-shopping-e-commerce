import { Provider } from '@nestjs/common';
import { PayOS } from '@payos/node';

export const PayOsProvider: Provider = {
  provide: 'PAYOS_CLIENT',
  inject: [],
  useFactory: () => {
    return new PayOS({
      clientId: process.env.PAYOS_CLIENT_ID,
      apiKey: process.env.PAYOS_API_KEY,
      checksumKey: process.env.PAYOS_CHECKSUM_KEY,
    });
  },
};
