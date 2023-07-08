declare interface FoundryCanvas {
	readonly tokens: TokenLayer;
}

declare interface TokenLayer {
	get controlled(): ConfiguredDocument<'token'>[];
}
