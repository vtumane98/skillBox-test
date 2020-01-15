document.addEventListener("DOMContentLoaded", function () {
    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var regTel = /^([+0-9()_-\s]{2,20})$/;
    var regName = /^([A-Za-zА-Яа-я()-\s]{2,50})$/;

    var allVald = false;


    function formValid(id, reg) {
        document.querySelector(id).oninput = function () {
            if (this.value != "") {
                this.classList.add("active");
                if (reg.test(this.value) == false) {
                    this.classList.remove("correct")
                    this.classList.add("incorrect");
                } else {
                    this.classList.remove("incorrect")
                    this.classList.add("correct")
                }
            } else {
                this.classList.remove("active");
                this.classList.remove("correct")
                this.classList.add("incorrect");
            }
        }
    }

    document.querySelector("#enter-form__agree").addEventListener('click',function(){
        this.classList.remove('notCheck')
    })

    document.querySelector("#send-button").addEventListener('click', function (event) {
        event.preventDefault();
        var inputArr = document.querySelectorAll(".enter-form__input");
        var checkBox = document.querySelector("#enter-form__agree");
        if(checkBox.checked == false){
            checkBox.classList.add('notCheck')
        }
        for (var i = 0; i < inputArr.length; i++) {
            if (inputArr[i].value != "" && inputArr[i].classList.contains('correct')) {
                allVald = true;
            } else {
                inputArr[i].classList.add("incorrect")
                allVald = false;
                break
            }
        }

        if(allVald && checkBox.checked == true){
            document.querySelector('.comp-send-popup').classList.add('open');
            document.querySelector('.enter-form').reset();
            setTimeout(function(){
                document.querySelector('.comp-send-popup').classList.remove('open');
            },2000)
        }
    })

    formValid('#enterFormEmail', regEmail);
    formValid('#enterFormTel', regTel);
    formValid('#enterFormName', regName);


    setTimeout(function(){
        document.querySelector(".price-card").classList.add('active')
    },1000)

})