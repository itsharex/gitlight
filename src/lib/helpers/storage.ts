import type { Settings, User } from '../types';

type StorageMap = {
	user: User;
	'access-token': string;
	settings: Settings;
	'github-notifications': { pinned: string[]; unread: string[] };
	'github-watched-repos': { id: string; active: boolean }[];
	'github-notification-dates': Record<string, string>;
	'type-filters': boolean[];
};

export const storage = {
	get<T extends keyof StorageMap>(key: T): StorageMap[T] | null {
		if (storage.has(key)) {
			const value = localStorage.getItem(key) as string;
			try {
				return JSON.parse(value);
			} catch {
				return value as StorageMap[T];
			}
		}
		return null;
	},
	set<T extends keyof StorageMap>(key: T, value: StorageMap[T]) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	has(key: keyof StorageMap): boolean {
		return !!localStorage.getItem(key);
	},
	remove(key: keyof StorageMap) {
		localStorage.removeItem(key);
	}
};