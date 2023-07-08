// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface DocumentClassConfig {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface DocumentDataConfig {}

declare type DefaultClassConfig = {
	user: FoundryUser;
	actor: FoundryActor;
	token: FoundryToken;
	chat: FoundryChatMessage;
};
declare type DefaultDataConfig = {
	chat: FoundryChatMessageData;
};

declare type ConfiguredDocument<
	K extends keyof DocumentClassConfig | keyof DefaultClassConfig,
> = (K extends keyof DocumentClassConfig
	? DocumentClassConfig[K]
	: DefaultClassConfig[K]) &
	FoundryDocument & { readonly data: Readonly<ConfiguredDocumentData<K>> };

declare type ConfiguredDocumentData<
	K extends keyof DocumentDataConfig | keyof DefaultDataConfig,
> = K extends keyof DocumentClassConfig
	? DocumentDataConfig[K]
	: DefaultDataConfig[K];

declare type FoundryDocument = {
	id: string;
};

declare type FoundryUser = FoundryDocument & {
	id: string;
	active: boolean;
	get character(): ConfiguredDocument<'actor'>;
};

declare type FoundryActor = FoundryDocument & {
	id: string;
};

declare type FoundryToken = FoundryDocument & {
	id: string;
	actor: ConfiguredDocument<'actor'>;
};

declare type FoundryChatMessage = FoundryDocument;
