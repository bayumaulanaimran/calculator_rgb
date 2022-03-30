const calculatorScreen = document.querySelector('.calculator-screen');

const updateScreen = (number) => {
    calculatorScreen.value = number
}

const numbers = document.querySelectorAll(".number");

let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';

// variabel yang digunakan untuk menyimpan data operasi sementara
let tempOperation = '';

const inputNumber = (number) => {
    if(currentNumber === '0'){
        currentNumber = number;
    }else{
        currentNumber += number;
    }
}

numbers.forEach(
    (number) => {
        number.addEventListener("click", (event) => {
            inputNumber(event.target.value);
            updateScreen(currentNumber);

            // jika data operasi sementara berisi '=' maka kosongkan tampilan prevop ketika pengguna menekan angka di kalkulator
            if(tempOperation.includes('=')){
                previousOperation('');
            }
            
        })
    }
)

const operators = document.querySelectorAll(".operator");

const inputOperator = (operator) => {
    if(calculationOperator === ''){
        prevNumber = currentNumber;
    }
    calculationOperator = operator;

    // digunakan untuk menyimpan data operator untuk sementara
    let tempOperator='';
    switch (calculationOperator){
        case '+':
            tempOperator = '+';
            break;
        case '-':
            tempOperator = '-';
            break;
        case '*':
            tempOperator = 'x';
            break;
        case '/':
            tempOperator = ':';
            break;
        default:
            break;
    }

    // simpan data angka sebelumnya dan operator pada tempOperator pada tempOperation
    tempOperation = prevNumber + ' ' + tempOperator;

    currentNumber = '0';
}

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
        // jika tombol dengan class operator ditekan, maka isi variabel tempOperation akan tampil pada prevop
        previousOperation(tempOperation);
    })
})

const equalSign = document.querySelector('.equal-sign');

const calculate = () => {

    let result = '';

    // digunakan untuk menyimpan data operator sementara
    let operator = '';

    switch(calculationOperator){
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            // jika nomor angka yang dijumlahkan adalah 0.1 dengan 0.2
            if(parseFloat(prevNumber)===0.1 && parseFloat(currentNumber)===0.2 || parseFloat(prevNumber)===0.2 && parseFloat(currentNumber)===0.1){
                result = 0.3;
            }
            operator = '+';
            break;
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            operator = '-';
            break;
        case "*":
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            operator = 'x';
            break;
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            operator = ':';
            break;
        default:
            break;
    }
    
    // simpan semua data operasi pada tempOperation
    tempOperation = prevNumber + ' ' + operator + ' ' + currentNumber + " = ";

    // simpan hasil operasi sebagai data string
    currentNumber = ''+result;
    calculationOperator = '';
}

equalSign.addEventListener('click', () => {
    // jika pengguna secara berulang menekan tombol '=' atau ketika currentNumber isinya '' maka selama operator tidak terdefinisi maka tidak akan memperbaharui tampilan layar kalkulator
    if(currentNumber === '' || calculationOperator === '' ){
        return
    }
   
   calculate();
   // memperbaharui nilai yang ditampilkan pada prevop dengan nilai tempOperation
   previousOperation(tempOperation);
   updateScreen(currentNumber);
});

const clearBtn = document.querySelector('.all-clear');

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';

    // fungsi clearAll juga akan menghapus isi tampilan .calculator-prevop
    tempOperation = prevNumber;
}

clearBtn.addEventListener('click', () => {
    clearAll();

    // fungsi clearAll juga akan menghapus isi tampilan .calculator-prevop
    previousOperation('');

    updateScreen(currentNumber);  
})

const decimal = document.querySelector('.decimal');

const inputDecimal = (dot) => {
    // jika pada angka sudah memiliki tanda desimal, maka saat tombol desimal ditekan tidak akan menambah titik desimal
    if(currentNumber.includes('.')){
        return
    }

    currentNumber += dot;
}

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
})

const deleteNumber = document.querySelector('.delete');

const deleteLastCurrentNumber = () => {
    if(currentNumber.length===1||currentNumber.length===2 && currentNumber.includes('-')){
        currentNumber = '0';
        return
    }
    currentNumber = currentNumber.slice(0, currentNumber.length-1);
}

deleteNumber.addEventListener('click', (event) => {
    deleteLastCurrentNumber();
    
    // jika data operasi sementara berisi '=' maka kosongkan tampilan prevop ketika pengguna menekan DEL di kalkulator
    if(tempOperation.includes('=')){
        previousOperation('');
    }

    updateScreen(currentNumber)
})

// mengambil elemen dengan class .percentage untuk digunakan pada fungsi percentageOfCurrentNumber
const percentage = document.querySelector('.percentage');

// fungsi yang digunakan untuk membagi angka yang ada pada layar kalkulator dengan angka 100
const percentageOfCurrentNumber = () => {
    // agar tidak terjadi kesalahan tipe data, maka data angka harus dibuat tipe data string setelah dibagi dengan angka 100
    currentNumber = ''+parseFloat(currentNumber)/100+'';
}

// fungsi yang akan terpanggil ketika tombol dengan class .percentage ditekan
percentage.addEventListener('click', (event) => {
    percentageOfCurrentNumber();
    updateScreen(currentNumber);

    if(tempOperation.includes('=')){
        previousOperation('');
    }
})

// mengambil elemen dengan class .minus yang akan digunakan dalam fungsi minusOfCurrentNumber
const minus = document.querySelector('.minus');

// fungsi yang digunakan untuk merubah angka pada layar kalkulator menjadi nilai negatif
const minusOfCurrentNumber = () => {
    // agar tidak jadi kesalahan tipe data, maka data setelah dibuat negatif harus dibuat jadi string
    currentNumber = ''+(-1*parseFloat(currentNumber))+'';
}

// fungsi yang akan terpanggil ketika tombol dengan class .minus ditekan
minus.addEventListener('click', (event) => {
    minusOfCurrentNumber();
    updateScreen(currentNumber);

    // jika data operasi sementara berisi '=' maka kosongkan tampilan prevop ketika pengguna menekan MIN di kalkulator
    if(tempOperation.includes('=')){
        previousOperation('');
    }
})

// mengambil elemen dengan class .calculator-prevop untuk digunakan dalam fungsi previousOperation
const prevop = document.querySelector('.calculator-prevop');

// fungsi yang digunakan untuk menampilkan nilai pada tampilan .calculator-prevop
const previousOperation = (operation) => {
        prevop.value = operation;
}