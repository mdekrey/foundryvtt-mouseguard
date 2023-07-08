declare type FoundryChatMessageData = {
	user: string;
	flavor: string;
	speaker: SpeakerSource;
};

declare const ChatMessage: {
	getSpeaker(args?: ChateMessageGetSpeakerOptions): SpeakerSource;
};

declare type ChateMessageGetSpeakerOptions = {
	/** The Scene in which the speaker resides */
	scene?: InstanceType<ConfiguredDocumentClass<typeof Scene>> | undefined;

	/** The Actor whom is speaking */
	actor?: InstanceType<ConfiguredDocumentClass<typeof Actor>> | undefined;

	/** The Token whom is speaking */
	token?:
		| InstanceType<ConfiguredDocumentClass<typeof TokenDocument>>
		| undefined;

	/** The name of the speaker to display */
	alias?: string | undefined;
};

declare type SpeakerSource = {
	/** ID of a scene */
	scene: null | string;
	/** ID of an actor */
	actor: null | string;
	/** ID of a token */
	token: null | string;
	alias: string;
};
