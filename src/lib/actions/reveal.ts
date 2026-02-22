import type { Action } from 'svelte/action';

const supportsScrollTimeline = typeof CSS !== 'undefined' && CSS.supports('animation-timeline', 'view()');

export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, params) => {
	if (supportsScrollTimeline) {
		node.classList.add('reveal');
		if (params?.delay) {
			node.style.animationDelay = `${params.delay}ms`;
		}
		return;
	}

	// JS fallback for browsers without scroll-driven animations
	node.classList.add('reveal-js');
	if (params?.delay) {
		node.style.transitionDelay = `${params.delay}ms`;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.1 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
