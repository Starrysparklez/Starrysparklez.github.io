const text = document.getElementById("text");
const main = document.getElementById("main");

const audio = new Audio("keyboard1.mp3");
const audioBackspace = new Audio("key2.mp3");

const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Реализация повтора звукового сопровождения набора текста на клавиатуре.
 */
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

/**
 * Выводит текст на экран по одному символу каждые 90мс. Затем также посимвольно стирает набранный ранее текст.
 * @param {*} content Это текст, который необходимо вывести на экран.
 */
async function writeText(content) {
   const letters = new Array();
   audio.play();
   for (let c = 0; c < content.length; c++) {
        const letter = content[c];
        if (letter === '^') {
            audio.pause();
            await sleep(1000);
            audio.play();
        } else {
            letters.push(letter);
            text.innerHTML = letters.join("");
            await sleep(90);
        }
    }
    audio.pause();
    await sleep(1600);
    audioBackspace.play();
    await sleep(150);
    while (letters.pop()) {
        text.innerHTML = letters.join("");
        await sleep(20);
    }
    await sleep(150);
}

/**
 * Эта функция отвечает за реверс цветов. Если текст был белым, а фон темным - то после вызова этой функции текст станет черным, а фон белым.
 * @returns Promise, который завершается спустя 650мс (0.65с) после вызова.
 */
async function reverse() {
    return new Promise(res => {
        main.style.backgroundColor == "rgb(25, 25, 25)" ? main.style.backgroundColor = "white" : main.style.backgroundColor = "rgb(25, 25, 25)";
        console.log("bg color is " + main.style.backgroundColor);
        text.style.color == "white" ? text.style.color = "black" : text.style.color = "white";
        setTimeout(res, 650);
    });
}

const startButton = document.getElementById("start");
const panelTop = document.getElementById("overlay-top");
const panelBottom = document.getElementById("overlay-bottom");

/**
 * Здесь начинается чудо...
 */
 async function startExecution() {
    startButton.style.opacity = "0";
    await sleep(1200);
    startButton.style.display = "none";
    panelTop.style.height = "0px";
    panelBottom.style.height = "0px";
    await sleep(1200);
    startTextWriter().then(async () => {
        await sleep(1200);
        panelTop.style.height = "50%";
        panelBottom.style.height = "50%";
    })
}

/**
 * А здесь чудо происходит.
 */
async function startTextWriter() {
    await writeText("Привет.");
    await writeText("И-и-и... Что же написать?^ У меня нет идей...");
    await writeText("Может быть, рассказать про мое настроение?");
    await reverse();
    await writeText("Не знаю...^ Я не в курсе на счет того, банит ли GitHub странички на Pages, которые имеют в себе \"неприятное\" содержимое, аля мысли о суициде и прочее...^ Ну, я думаю вы уже догадались, какое у меня настроение...");
    await writeText("Прошу прощения.");
    await reverse();
    await writeText("Возможно, стоит обсудить проекты, над которыми я работаю?^ Discord бот Naomi...^ Эта страничка...^ Нет, явно нет. Обсуждать нечего, просто потому, что ничего нет.");
    await writeText("Знаете, наверное, я лучше пойду...^ Ну, то есть, закончу это послание. Я не уверена, что кому-то есть дело до моих размышлений.^ Простите за лишнюю трату вашего времени...")
    await reverse();
}

//document.addEventListener("DOMContentLoaded", startExecution);