const analyzerInput = document.querySelector("[data-analyzerInput]");
const analyzerLabel = document.querySelector("[data-analyzerLabel]");
const reasonList = document.querySelector("[data-reasonList]");
const themeToggleBtn = document.querySelector("[data-themeToggle]");

// feature 4: check a typed password and list what's missing
function analyzePassword(pwd){
    let reasons = [];

    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNum = /[0-9]/.test(pwd);
    const hasSym = /[^A-Za-z0-9]/.test(pwd);

    if(!hasUpper) reasons.push("No uppercase letters");
    if(!hasLower) reasons.push("No lowercase letters");
    if(!hasNum) reasons.push("No numbers");
    if(!hasSym) reasons.push("No symbols");
    if(pwd.length < 8) reasons.push("Too short");

    let score = 0;
    if(hasUpper) score++;
    if(hasLower) score++;
    if(hasNum) score++;
    if(hasSym) score++;
    if(pwd.length >= 8) score++;

    let label = "Weak";
    let color = "#f00";

    if(score >= 5){
        label = "Very Strong";
        color = "#0f0";
    } else if(score >= 3){
        label = "Reasonable";
        color = "#ff0";
    }

    return {reasons, label, color};
}

analyzerInput.addEventListener('input', (e) => {
    const pwd = e.target.value;

    if(!pwd){
        analyzerLabel.innerText = "--";
        analyzerLabel.style.color = "var(--pl-white)";
        reasonList.innerHTML = "";
        return;
    }

    const result = analyzePassword(pwd);

    analyzerLabel.innerText = result.label;
    analyzerLabel.style.color = result.color;

    reasonList.innerHTML = "";

    if(result.reasons.length === 0){
        const li = document.createElement("li");
        li.innerText = "Looks good!";
        reasonList.appendChild(li);
    } else {
        result.reasons.forEach((reason) => {
            const li = document.createElement("li");
            li.innerText = reason;
            reasonList.appendChild(li);
        });
    }
});

// feature 5: dark / light mode toggle, kept in sync with the other pages
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
