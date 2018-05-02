import './test.ts';

let greeting: string;
greeting = 'Hello Webpack';

const greetingsElem = document.querySelector('.greetings');

greetingsElem ? greetingsElem.textContent = greeting : console.log('Greetings element not found!');