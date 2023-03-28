

class Calculator {
    previousValueTextElement: HTMLElement;
    currentValueTextElement: HTMLElement;
    value: string;

    constructor(previousValueTextElement: HTMLElement, currentValueTextElement: HTMLElement, value: string) {
        this.previousValueTextElement = previousValueTextElement;
        this.currentValueTextElement = currentValueTextElement;
        this.value = value;
    }

    appendNumber() {
        const isOperator = /[+*./,\-]/g;
        if (this.value.match(isOperator) && this.currentValueTextElement.innerText.length > 0) {
            this.previousValueTextElement.innerText = this.currentValueTextElement.innerText;
            this.currentValueTextElement.innerText = "";
            this.previousValueTextElement.classList.add('hidden');
        }
        const stringNumber = this.currentValueTextElement.innerText.toString().replace(/,/g, '') + this.value.toString();
        this.currentValueTextElement.innerText = this.displayNumber(stringNumber)
    }


    displayNumber(stringNumber: string) {
        const floatNumber = parseFloat(stringNumber);
        if (isNaN(floatNumber)) return "";
        return floatNumber.toLocaleString('en');
    }

    compute(operation: string) {
        let computation
        const prev = parseFloat(this.previousValueTextElement.innerText.replace(/,/g, ''))
        const current = parseFloat(this.currentValueTextElement.innerText.replace(/,/g, ''))
        if (isNaN(prev) || isNaN(current)) return
        switch (operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentValueTextElement.innerText = computation.toString();
    }

    delete() {
        this.currentValueTextElement.innerText = this.currentValueTextElement.innerText.toString().slice(0, -1)
    }

    remove() {
        this.currentValueTextElement.innerText = "";
    }
}


const btnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
const previousValue = document.querySelector('.previous-value') as HTMLElement;
const currentValue = document.querySelector('.current-value') as HTMLElement;
let operation: string;
let lastTarget: string;


btnList.forEach((btn) => {
    btn?.parentNode?.addEventListener('click', (e) => {
        const isOperator = /[+,*,.,/\-]/g;
        btnList.forEach((item) => item?.parentElement?.classList.remove("bg-slate-900", "text-white"))
        const calculator = new Calculator(previousValue, currentValue, btn.innerText);
        currentValue.innerText = currentValue.innerText.replace(/[+*./=\-]/g, "");
        if (btn.innerText.match(isOperator)) {
            btn.parentElement?.classList.add("bg-slate-900", "text-white");
            operation = btn.innerText;
        } else if (btn.innerText === "=") {
            btn.parentElement?.classList.add("bg-slate-900", "text-white");
            setTimeout(() => {
                btnList.forEach((item) => item?.parentElement?.classList.remove("bg-slate-900", "text-white"));
                currentValue.innerText = "";
            }, 2000);
            calculator.compute(operation);
        } else if (btn.innerText === "DEL") {
            btn.parentElement?.classList.add("bg-slate-900", "text-white");
            calculator.delete();
        }
        else if (btn.innerText === "AC") {
            btn.parentElement?.classList.add("bg-slate-900", "text-white");
            calculator.remove();
        }
        calculator.appendNumber();
    })
})


const div = document.querySelector(".container_section") as HTMLDivElement;
const img = document.createElement('img') as HTMLImageElement;
div.append(img);
img.classList.add('nav__logo', "mb-3", "ml-3")

const imgURL = new URL('./logo.5f25a564.svg', import.meta.url);


img.src = imgURL.toString();