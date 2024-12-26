import { Watch } from './Watch.ts';

export interface CartItem extends Watch {
  quantity: number;
}