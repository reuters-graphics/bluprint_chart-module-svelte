import fakeDataStore from './fakeData';
import { writable } from 'svelte/store';

export const fakeData = fakeDataStore();
export const chartWidth = writable('');
export const Explorer = writable({});
