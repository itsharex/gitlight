import type {
	Priority,
	SavedNotifications,
	Settings,
	User,
	WatchedPerson,
	WatchedRepo
} from '../types';

export type StorageMap = {
	'github-user': User;
	'github-access-token': string;
	'gitlab-user': User;
	'gitlab-access-token': string;
	'gitlab-refresh-token': string;
	'gitlab-expires-in': string;
	'gitlab-url': string;
	'gitlab-pat': string;
	settings: Settings;
	'github-notifications': SavedNotifications;
	'gitlab-notifications': SavedNotifications;
	'watched-repos': WatchedRepo[];
	'watched-persons': WatchedPerson[];
	'type-filters': boolean[];
	priorities: Priority[];
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
