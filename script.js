const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const lengthDisplay = document.querySelector("[data-length]");

const inputSlider = document.querySelector("[data-lengthSlider]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbols");
const pronounceableCheck = document.querySelector("[data-pronounceableCheck]");

const indicator = document.querySelector("[data-strengthIndicator]");
const generateBtn = document.querySelector("[data-generateButton]");

const allcheckbox = document.querySelectorAll(".maincheck");

// feature 5: theme toggle
const themeToggleBtn = document.querySelector("[data-themeToggle]");

// feature 2 + 3: entropy and crack time
const entropyValue = document.querySelector("[data-entropyValue]");
const crackTimeValue = document.querySelector("[data-crackTimeValue]");

// feature 7: export current password
const exportTxtBtn = document.querySelector("[data-exportTxt]");


let password = "";
let passwordLength = 10;
let checkCount = 0;

const symbolsChars = '!@#$%^&*()_+{}[]:;<>,.?/~`-=|';

// feature 1: history is saved to localStorage so the History page can read it
let passwordHistory = JSON.parse(localStorage.getItem('pwdHistory')) || [];
const maxHistory = 5;

// feature 8: word list used to build pronounceable passwords
const pronounceableWords = ["Blue","Red","Green","Tiger","Eagle","River","Storm","Shadow","Cloud","Flame","Ocean","Moon","Star","Wolf","Falcon"];




handleslider();
setIndicator("#888");
// set password length
function handleslider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

// set indicator color
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// get random number
function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,10);
}   

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    return symbolsChars[getRndInteger(0, symbolsChars.length)];
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8)setIndicator("#0f0");
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6)setIndicator("#ff0");
    else setIndicator("#f00");

}


async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (err) {
        copyMsg.innerText = "Failed!";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}


// feature 2 + 3: get total character pool size based on checked options
function getPoolSize(){
    let pool = 0;
    if(uppercaseCheck.checked) pool += 26;
    if(lowercaseCheck.checked) pool += 26;
    if(numbersCheck.checked) pool += 10;
    if(symbolsCheck.checked) pool += symbolsChars.length;
    return pool;
}

// feature 2: entropy in bits = length * log2(pool size)
function calcEntropy(length, poolSize){
    if(poolSize === 0) return 0;
    return Math.round(length * Math.log2(poolSize));
}

function entropyLabel(entropyBits){
    if(entropyBits < 28) return "Weak";
    if(entropyBits < 36) return "Reasonable";
    if(entropyBits < 60) return "Strong";
    if(entropyBits < 128) return "Very Strong";
    return "Excellent";
}

// feature 3: turn entropy into a rough crack time estimate
function formatCrackTime(entropyBits){
    const guessesPerSecond = 1e9; //assume 1 billion guesses per second
    const totalGuesses = Math.pow(2, entropyBits);
    const seconds = totalGuesses / guessesPerSecond;

    const units = [
        {label: "seconds", secs: 1},
        {label: "minutes", secs: 60},
        {label: "hours", secs: 3600},
        {label: "days", secs: 86400},
        {label: "years", secs: 31536000},
        {label: "thousand years", secs: 31536000 * 1e3},
        {label: "million years", secs: 31536000 * 1e6},
        {label: "billion years", secs: 31536000 * 1e9},
    ];

    if(seconds < 1) return "Instantly";

    let chosen = units[0];
    for(const unit of units){
        if(seconds >= unit.secs) chosen = unit;
    }

    const value = seconds / chosen.secs;
    return `${value.toFixed(value < 10 ? 1 : 0)} ${chosen.label}`;
}

// feature 2 + 3: refresh entropy and crack time boxes for the current password
function updateEntropyInfo(){
    const poolSize = getPoolSize();
    const entropyBits = calcEntropy(passwordLength, poolSize);
    entropyValue.innerText = `${entropyBits} bits (${entropyLabel(entropyBits)})`;
    crackTimeValue.innerText = formatCrackTime(entropyBits);
}

// feature 1: keep last few generated passwords, saved so the History page can read them
function addToHistory(pwd){
    passwordHistory.unshift(pwd);
    if(passwordHistory.length > maxHistory) passwordHistory.pop();
    localStorage.setItem('pwdHistory', JSON.stringify(passwordHistory));
}

// feature 7: build and download a file from text content
function downloadFile(filename, content, type){
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

exportTxtBtn.addEventListener('click', () => {
    if(!passwordDisplay.value) return;
    downloadFile("password.txt", passwordDisplay.value, "text/plain");
});

// feature 5: dark / light mode toggle, saved so every page opens with the same theme
function initTheme(){
    if(localStorage.getItem('theme') === 'light'){
        document.body.classList.add('light-theme');
        themeToggleBtn.innerText = "☀️";
    }
}
initTheme();

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggleBtn.innerText = isLight ? "☀️" : "🌙";
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// feature 8: build a password out of two words, a symbol and a number
function generatePronounceablePassword(){
    const word1 = pronounceableWords[getRndInteger(0, pronounceableWords.length)];
    const word2 = pronounceableWords[getRndInteger(0, pronounceableWords.length)];
    const symbol = generateSymbol();
    const number = getRndInteger(10, 100);

    return `${word1}${symbol}${word2}${number}`;
}


function handlecheckboxChange(){
    checkCount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)checkCount++;
    });

    if(passwordLength < checkCount){   
        passwordLength = checkCount;
        handleslider();
    }

}
allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckboxChange);

});

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleslider();
});

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)copyContent();
});

function shufflePassword(array){
    for(let i=array.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click', () => {

    // feature 8: pronounceable password skips the normal random generation
    if(pronounceableCheck.checked){
        password = generatePronounceablePassword();
        passwordDisplay.value = password;
        setIndicator("#0f0");
        addToHistory(password);

        //mixed word/symbol/number pool used just for the entropy estimate
        const poolSize = 26 + 26 + 10 + symbolsChars.length;
        const entropyBits = calcEntropy(password.length, poolSize);
        entropyValue.innerText = `${entropyBits} bits (${entropyLabel(entropyBits)})`;
        crackTimeValue.innerText = formatCrackTime(entropyBits);
        return;
    }

    // none of the checkbox are selected
    console.log(checkCount);
    if(checkCount == 0)return;

    if(passwordLength < checkCount){  
        passwordLength = checkCount;
        handleslider();
    }

    console.log("Starting the journey");
    //remove old password
    password = "";


    let funcArr = [];
    if(uppercaseCheck.checked)funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked)funcArr.push(generateLowerCase);
    if(numbersCheck.checked)funcArr.push(generateRandomNumber);
    if(symbolsCheck.checked)funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    console.log("Compulsory addition done");

    //remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log("Remaining addition done");

    //shuffle the password
    password = shufflePassword(Array.from(password));

    console.log("Shuffling done");

    //show in UI
    passwordDisplay.value = password;

    //calculate strength    
    calcStrength();

    //feature 1: save to history
    addToHistory(password);

    //feature 2 + 3: refresh entropy and crack time
    updateEntropyInfo();

});
