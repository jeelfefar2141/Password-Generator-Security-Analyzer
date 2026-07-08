const historyList = document.querySelector("[data-historyList]");
const exportCsvBtn = document.querySelector("[data-exportCsv]");
const themeToggleBtn = document.querySelector("[data-themeToggle]");

// feature 1: read the history saved by the generator page
let passwordHistory = JSON.parse(localStorage.getItem('pwdHistory')) || [];

function renderHistory(){
    historyList.innerHTML = "";

    if(passwordHistory.length === 0){
        const li = document.createElement("li");
        li.innerText = "No passwords generated yet";
        historyList.appendChild(li);
        return;
    }

    passwordHistory.forEach((pwd) => {
        const li = document.createElement("li");
        li.innerText = pwd;
        li.addEventListener('click', () => {
            navigator.clipboard.writeText(pwd);
        });
        historyList.appendChild(li);
    });
}
renderHistory();

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

exportCsvBtn.addEventListener('click', () => {
    if(passwordHistory.length === 0) return;

    let csv = "Password\n";
    passwordHistory.forEach((pwd) => (csv += pwd + "\n"));

    downloadFile("passwords.csv", csv, "text/csv");
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
