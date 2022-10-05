(function () {
    let allInput = document.querySelectorAll('input[type="number"]');
    let billInput = document.getElementById("bill");
    let selectTip = document.querySelectorAll(".btn_tip");
    let tipInput = document.getElementById("tip");
    let numOfPeople = document.getElementById("numOfPeople");
    let errorMsg = document.getElementById("error_msg");
    let screen = document.querySelectorAll('.screen');
    let amountScreen = document.getElementById("screen_amount");
    let totalScreen = document.getElementById("screen_total");
    let resetBtn = document.getElementById("reset_btn");
    let billInputValue = 0;
    let numOfPeopleValue = 0;
    let tipInputValue = 0;
    let tipValue = 0;

    billInput.addEventListener('input', setBillInputValue);

    selectTip.forEach(button => {
        button.addEventListener('click', handleClick);
    });

    tipInput.addEventListener('input', setTipInputValue);

    numOfPeople.addEventListener('input', setNumOfPeopleValue);

    resetBtn.addEventListener('click', resetAll);

    let invalid = /[-_!"`',:;<>={}@#%&\$\(\)\*\+\/\\\?\[\]\^|]+/;
    let invalid2 = /[-._!"`',:;<>={}@#%&\$\(\)\*\+\/\\\?\[\]\^|]+/;

    allInput.forEach(input => {
        input.addEventListener('keydown', event => {
            if (invalid.test(event.key)) {
                event.preventDefault();
            }
        })
    });

    numOfPeople.addEventListener('keydown', event => {
        if (invalid2.test(event.key)) {
            event.preventDefault();
        }
    });

    //Check number of character entered in bill input field
    billInput.onkeydown = function limit() {
        let maxChars = 10;
        if (billInput.value.length > maxChars) {
            billInput.value = billInput.value.substr(0, maxChars);
        }
    }

    function checkLength() {

        screen.forEach(display => {
            let charLength = amountScreen.innerText.length;

            if (window.innerWidth > 375) {
                if (charLength > 7 && tipValue != 0 && numOfPeopleValue != 0) {
                    display.style.fontSize = "calc(" + (7 / charLength) * 48 + "px" + ")";
                }

                else {
                    display.style.fontSize = "46px";
                }

            }

            else {
                if (charLength > 6 && tipValue != 0 && numOfPeopleValue != 0) {
                    display.style.fontSize = "calc(" + (6 / charLength) * 36 + "px" + ")";
                }

                else {
                    display.style.fontSize = "32px";
                }
            }
        });
    }


    function setBillInputValue() {
        billInputValue = parseFloat(billInput.value);

        if (isNaN(billInputValue) == true) {
            amountScreen.innerHTML = "0.00";
            totalScreen.innerHTML = "0.00";
        }

        else {
            calculateTip();
        }
        makeActive();
        checkLength();
        //console.log(billInputValue);
    }

    function handleClick(event) {
        selectTip.forEach(button => {
            button.classList.remove('btn_active');
            tipValue = event.target.dataset.num / 100;
        });

        this.classList.add('btn_active');

        tipInput.value = '';
        calculateTip();
        makeActive();
        checkLength();
        //console.log(tipValue);
    }

    function setTipInputValue() {
        selectTip.forEach(button => {
            button.classList.remove('btn_active');
        });
        tipInputValue = parseFloat(tipInput.value);
        tipValue = tipInputValue / 100;
        if (isNaN(tipValue) == true) {
            amountScreen.innerHTML = "0.00";
            totalScreen.innerHTML = "0.00";
        }

        else {
            calculateTip();
        }
        makeActive();
        checkLength();
        //console.log(tipValue);
    }

    function setNumOfPeopleValue() {
        numOfPeopleValue = parseFloat(numOfPeople.value);
        if (numOfPeopleValue == 0) {
            errorMsg.style.display = 'block';
            numOfPeople.style.borderColor = 'red';
        }

        else if (isNaN(numOfPeopleValue) == true) {
            amountScreen.innerHTML = "0.00";
            totalScreen.innerHTML = "0.00";
        }

        else {
            errorMsg.style.display = 'none';
            numOfPeople.style.borderColor = 'var(--Light-cyan)';
            calculateTip();
        }
        makeActive();
        checkLength();
        //alert(numOfPeopleValue);
    }

    function calculateTip() {
        let amount = (tipValue * billInputValue) / numOfPeopleValue;
        let total = amount + (billInputValue / numOfPeopleValue);

        if (isFinite(amount) == false || isFinite(total) == false) {
            amountScreen.innerHTML = "0.00";
            totalScreen.innerHTML = "0.00";
        }

        else {
            amountScreen.innerHTML = amount.toFixed(2);
            totalScreen.innerHTML = total.toFixed(2);
        }

        //console.log(amount);
        //console.log(total);
    }

    function makeActive() {
        if (billInputValue != 0 && tipValue != 0 && numOfPeopleValue != 0) {
            resetBtn.disabled = false;

            //alert(numOfPeopleValue);
        }
    }


    function resetAll() {
        billInput.value = "";
        selectTip.value = "";
        tipInput.value = "";
        numOfPeople.value = "";
        billInputValue = 0;
        tipValue = 0;
        tipInputValue = 0;
        numOfPeopleValue = 0;
        amountScreen.innerHTML = "0.00";
        totalScreen.innerHTML = "0.00";

        selectTip.forEach(button => {
            button.classList.remove('btn_active');
        });

        resetBtn.disabled = true;
        screen.forEach(display => {
            if (window.innerWidth > 375) {
                display.style.fontSize = "46px";
            }

            else {
                display.style.fontSize = "32px";
            }
        });

    }

})();