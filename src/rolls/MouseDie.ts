import './dice-template.css';

export class MouseDie extends Die {
	constructor(termData?: Partial<Die.TermData>) {
		if (termData) (termData as { faces: number }).faces = 6;
		super(termData);
	}

	/* -------------------------------------------- */

	/** @override */
	static DENOMINATION = 'm';

	/* -------------------------------------------- */

	/** @override */
	getResultLabel(result: DiceTerm.Result) {
		switch (result.result) {
			case 1:
			case 2:
			case 3:
				return '<img src="systems/mdekrey-mouseguard/assets/dice/snake.webp" />';
			case 4:
			case 5:
				return '<img src="systems/mdekrey-mouseguard/assets/dice/sword.webp" />';
			case 6:
				return '<img src="systems/mdekrey-mouseguard/assets/dice/axe.webp" />';
			default:
				throw new Error('Unsupported result');
		}
	}
}

type MouseRollChatOptions = {
	isPrivate?: boolean;
	user: string;
	flavor: string | null | undefined;
	template: string;
	blind: boolean;
};

const mouseChatData = async (
	roll: Evaluated<MouseRoll>,
	chatOptions: MouseRollChatOptions,
) => {
	const isPrivate = chatOptions.isPrivate;
	return {
		formula: isPrivate ? '???' : roll.formula,
		flavor: isPrivate ? null : chatOptions.flavor,
		user: chatOptions.user,
		tooltip: isPrivate ? '' : await roll.getTooltip(),
		result: isPrivate ? '?' : roll.result,
		dice_count: isPrivate ? '?' : (roll.terms[0] as NumericTerm).number,
		drop: false,
	};
};

export class MouseRoll extends Roll {
	async render(inputChatOptions: Partial<MouseRollChatOptions> = {}) {
		const chatOptions = foundry.utils.mergeObject(
			{
				user: game.user.id,
				flavor: null,
				template: MouseRoll.CHAT_TEMPLATE,
				blind: false,
			},
			inputChatOptions,
		);

		// Execute the roll, if needed
		const evaluated = this._evaluated
			? (this as Evaluated<this>)
			: await this.evaluate();

		// Define chat data
		const chatData = await mouseChatData(evaluated, chatOptions);

		// Render the roll display template
		return renderTemplate(chatOptions.template, chatData);
	}

	static CHAT_TEMPLATE = 'systems/mdekrey-mouseguard/templates/dice/roll.html';
}
