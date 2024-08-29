import figlet from 'figlet';

export default async function asciiName(name) {
    return new Promise((resolve, reject) => {
        figlet.text(name + "'s Tasks!", { horizontalLayout: 'default' }, (err, asciiArt) => {
            if (err) {
                reject(err);
            } else {
                resolve(asciiArt);
            }
        });
    });
}
