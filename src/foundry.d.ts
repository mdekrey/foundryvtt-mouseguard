declare const jQuery: JQueryStatic;
declare const $: JQueryStatic;

declare const Hooks: {
	once(event: 'init', cb: () => void | Promise<void>): void;
	on(
		event: 'renderSidebarTab',
		cb: (app: unknown, html: JQuery) => void | Promise<void>,
	): void;
};

declare const CONFIG: {
	User: { documentClass: ConstructorOf<ConfiguredDocument<'user'>> };
	Dice: {
		rolls: ConstructorOf<Roll>[];
		terms: Record<string, ConstructorOf<DiceTerm>>;
	};
};

declare const game: FoundryGame;
declare interface FoundryGame {
	user: ConfiguredDocument<'user'>;

	i18n: {
		localize(key: string): string;
	};
}
declare const canvas: FoundryCanvas;

declare function renderTemplate(path: string, data?: object): Promise<string>;
declare function mergeObject<
	T extends Record<string, unknown>,
	U extends Record<string, unknown>,
>(a: T, b: U): T & U;

declare const foundry: {
	utils: {
		mergeObject: typeof mergeObject;
	};
};

declare const ui: {
	notifications: {
		warn(message: string);
	};
};
