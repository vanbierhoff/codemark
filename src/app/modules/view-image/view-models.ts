export interface TagsCollection {
	[key: string]: Gifs[];
}

export interface Gifs {
	isComposite: boolean;
	img: string[];
	tagName: string;
	error: boolean;
}

export interface ErrorNoGifs {
	error: boolean;
}

export interface ResponseServer {
	data: {
		image_url: string;
	};
}
