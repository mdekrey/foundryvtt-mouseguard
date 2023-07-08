declare class DiceTerm {
	getResultLabel(result: DiceTerm.Result): string;
}

declare namespace DiceTerm {
	interface Data extends Partial<TermData> {
		class?: string;
		results: DiceTerm.Result[];
	}

	interface TermData {
		number: number;
		faces: number;
		modifiers: string[];
		results: Result[];
		options: DiceTerm.Options;
	}

	type Options = RollTerm.Options;

	interface Result {
		result: number;
		active?: boolean;
		count?: number;
		success?: boolean;
		failure?: boolean;
		discarded?: boolean;
		rerolled?: boolean;
		exploded?: boolean;
	}

	interface ToolTipData {
		formula: string;
		total: number;
		faces: number;
		flavor: string;
		rolls: { result: string; classes: string }[];
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Modifiers {}
}

declare class Die extends DiceTerm {
	constructor(termData?: Partial<Die.TermData>);
}

declare namespace Die {
	interface TermData extends DiceTerm.TermData {
		modifiers: Array<keyof (typeof Die)['MODIFIERS']>;
	}

	interface Modifiers {
		r: 'reroll';
		rr: 'rerollRecursive';
		x: 'explode';
		xo: 'explodeOnce';
		k: 'keep';
		kh: 'keep';
		kl: 'keep';
		d: 'drop';
		dh: 'drop';
		dl: 'drop';
		min: 'minimum';
		max: 'maximum';
		even: 'countEven';
		odd: 'countOdd';
		cs: 'countSuccess';
		cf: 'countFailures';
		df: 'deductFailures';
		sf: 'subtractFailures';
		ms: 'marginSuccess';
	}
}

declare type Evaluated<T extends Roll> = T & {
	_evaluated: true;
	_total: number;
	get total(): number;
};

declare class Roll<D extends object = unknown> {
	/**
	 * @param formula - The string formula to parse
	 * @param data    - The data object against which to parse attributes within the formula
	 *                  (default: `{}`)
	 * @param options - (default: `{}`)
	 */
	constructor(formula: string, data?: D, options?: Roll['options']);

	/**
	 * The original provided data object which substitutes into attributes of the roll formula
	 */
	data: D;

	/**
	 * Options which modify or describe the Roll
	 */
	options: InexactPartial<Options>;

	terms: RollTerm[];

	_evaluated: boolean;

	get formula(): string;
	get result(): string;

	evaluate(): Promise<Evaluated<this>>;
	getTooltip(): Promise<string>;
	toMessage(messageData?: DeepPartial<ConfiguredDocumentData<'chat'>>);
}

declare abstract class RollTerm {}

declare class NumericTerm extends RollTerm {
	number: number;
}
