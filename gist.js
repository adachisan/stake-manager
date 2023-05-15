class Gist {
    constructor(id, key) {
        this.id = id;
        this.key = key;
    }

    #request = async (data = "") => {
        const param = this.id != "" ? '/' + this.id : '';
        const uri = `https://api.github.com/gists${param}`;
        const headers = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.key}`
            },
            body: JSON.stringify(data)
        }
        const response = await (await fetch(uri, data != "" ? headers : {})).json();
        this.id = response.id;
        return response;
    }

    read = async (file = "") => {
        const data = await this.#request();
        const files = data.files;
        const keys = Object.keys(files);
        const build = (key) => ({ [key]: files[key].content });
        return file == "" ? keys.map(build) : files[file].content;
    }

    edit = async (file, content) => {
        const data = {
            public: true,
            description: this.description,
            files: { [file]: { content: content } }
        };
        return await this.#request(data);
    }
}

module.exports = { Gist };