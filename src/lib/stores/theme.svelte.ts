import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

function getInitialTheme(): Theme {
	if (!browser) return 'system';
	return (localStorage.getItem('theme') as Theme) || 'system';
}

function createThemeStore() {
	let theme = $state<Theme>(getInitialTheme());

	function resolvedTheme(): 'light' | 'dark' {
		if (theme === 'system') {
			if (!browser) return 'light';
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return theme;
	}

	function apply() {
		if (!browser) return;
		document.documentElement.setAttribute('data-theme', resolvedTheme());
	}

	function set(value: Theme) {
		theme = value;
		if (browser) {
			localStorage.setItem('theme', value);
		}
		apply();
	}

	function toggle() {
		const resolved = resolvedTheme();
		set(resolved === 'dark' ? 'light' : 'dark');
	}

	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			if (theme === 'system') apply();
		});
		apply();
	}

	return {
		get theme() { return theme; },
		get resolved() { return resolvedTheme(); },
		set,
		toggle
	};
}

export const themeStore = createThemeStore();
