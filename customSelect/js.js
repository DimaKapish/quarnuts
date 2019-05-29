var selection = document.getElementsByClassName("selection");

var optionsWrapper,
    optionsItem,
    selectButton;

console.log(selection);


function createOptionsWrapper(select){
    optionsWrapper = document.createElement("div");
    optionsWrapper.setAttribute("class", "options-wrapper hide");
    for(var i = 0; i < select[0].options.length; i++){
        optionsItem = document.createElement("div");
        optionsItem.setAttribute("class", "option");
        optionsItem.innerHTML = select[0].options[i].innerHTML;
        optionsWrapper.appendChild(optionsItem);
        optionsItem.addEventListener("click", function(e){
            // e.stopPropagation();

            var s = this.parentNode.parentNode.parentNode.getElementsByClassName("selects")[0].getElementsByTagName("select")[0];
            var sB = this.parentNode.parentNode.getElementsByClassName("select-button")[0];

            for(var i = 0; i < s.length; i++){
                if(s.options[i].innerHTML == this.innerHTML){
                    s.selectedIndex = i;
                    sB.innerHTML = this.innerHTML;
                    
                    var selectedOption = this.parentNode.getElementsByClassName("selected-option");
                    for (j = 0; j < selectedOption.length; j++) {
                        selectedOption[j].classList.remove("selected-option");
                    }
                    this.classList.add("selected-option");
                    break;
                }
            }
            sB.click();
        });
    }

    return optionsWrapper;

}

function closeSelect(select){
    document.addEventListener("click", function(){
        var dOptionWrapper = [];
        
        for(var i = 0; i < select[0].parentNode.parentNode.getElementsByClassName("main-select-wrapper").length; i++){
            dOptionWrapper.push( select[0].parentNode.parentNode.getElementsByClassName("main-select-wrapper")[i].getElementsByClassName("options-wrapper")[0]);
        }
        console.log(dOptionWrapper);

        for(var i = 0; i < dOptionWrapper.length; i++){
            if(!dOptionWrapper[i].classList.contains("hide")){
                console.log("true");
                dOptionWrapper[i].classList.add("hide");
            }
        }

    });
}

function createSelectButton(select){
    selectButton = document.createElement("div");
    selectButton.setAttribute("class", "select-button");
    selectButton.innerHTML = select[0].options[select[0].selectedIndex].innerHTML;
    console.log(selectButton);
    selectButton.addEventListener("click", function(e){    
        e.stopPropagation();
        closeSelect(select);
        this.nextSibling.classList.toggle("hide");
    });

    return selectButton;
}

function createSelect(select){
    var mainSelectWrapper;
    mainSelectWrapper = document.createElement("div");
    mainSelectWrapper.setAttribute("class", "main-select-wrapper");

    mainSelectWrapper.appendChild(createSelectButton(select));
    mainSelectWrapper.appendChild(createOptionsWrapper(select));

    selection[0].appendChild(mainSelectWrapper);

}

function Select(select){

    this.select = select;
    console.log(this.select);
    this.constrCreateSelect = function(){
        createSelect(this.select);
    }
    
}


var select1 = new Select(selection[0].children[0].getElementsByClassName("s1")).constrCreateSelect();
var select2 = new Select(selection[0].children[0].getElementsByClassName("s2")).constrCreateSelect();
var select3 = new Select(selection[0].children[0].getElementsByClassName("s")).constrCreateSelect();
var select4 = new Select(selection[0].children[0].getElementsByClassName("s3")).constrCreateSelect();
