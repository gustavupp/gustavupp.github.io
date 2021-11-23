
const text = [
"The greatest glory in living lies not in never falling, but in rising every time we fall. The way to get started is to quit talking and begin doing. Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. If life were predictable it would cease to be life, and be without flavor. If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. Life is what happens when you're busy making other plans. Spread love everywhere you go. Let no one ever come to you without leaving happier. When you reach the end of your rope, tie a knot in it and hang on. Always remember that you are absolutely unique. Just like everyone else. Don't judge each day by the harvest you reap but by the seeds that you plant. The future belongs to those who believe in the beauty of their dreams.",
"Tell me and I forget. Teach me and I remember. Involve me and I learn. The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart. It is during our darkest moments that we must focus to see the light. Whoever is happy will make others happy too. Do not go where the path may lead, go instead where there is no path and leave a trail. Spread love everywhere you go. Let no one ever come to you without leaving happier. When you reach the end of your rope, tie a knot in it and hang on.",
"Always remember that you are absolutely unique. Just like everyone else. Don't judge each day by the harvest you reap but by the seeds that you plant. The future belongs to those who believe in the beauty of their dreams. Tell me and I forget. Teach me and I remember. Involve me and I learn. The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart. You will face many defeats in life, but never let yourself be defeated.",
"The purpose of our lives is to be happy. Get busy living or get busy dying. Many of life’s failures are people who did not realize how close they were to success when they gave up. If you want to live a happy life, tie it to a goal, not to people or things. Never let the fear of striking out keep you from playing the game. Money and success don’t change people; they merely amplify what is already there. Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.",
"Not how long, but how well you have lived is the main thing. If life were predictable it would cease to be life, and be without flavor. The whole secret of a successful life is to find out what is one’s destiny to do, and then do it. In order to write about life first you must live it. The big lesson in life, baby, is never be scared of anyone or anything. Sing like no one’s listening, love like you’ve never been hurt, dance like nobody’s watching, and live like it’s heaven on earth. Curiosity about life in all of its aspects, I think, is still the secret of great creative people. Life is not a problem to be solved, but a reality to be experienced."
];

const loremArticle = document.querySelector(".lorem-text");
const form = document.querySelector(".lorem-form");
const formInput = document.getElementById("number");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formValue = parseInt(formInput.value);
    const random = Math.floor(Math.random() * text.length);

    if (isNaN(formValue) || formValue < 0 || formValue > 8){
        loremArticle.innerHTML = `${text[random]}`;
    } else {
        let tempText = text.slice(0, formValue);
        tempText = tempText.map((item) => {
            return `<p class="lorem-text">${item}</p>`;
        }).join("");
        loremArticle.innerHTML = `${tempText}`;
    }
});
