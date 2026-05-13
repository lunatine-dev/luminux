class Metadata {
    title = $state("");

    constructor() {}

    setTitle(text: string) {
        this.title = text;
    }
}

export const metadata = new Metadata();
