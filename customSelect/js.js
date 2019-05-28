var selection = document.getElementsByClassName("selection");
var select;

var optionsWrapper,
    optionsItem,
    selectButton;

console.log(selection);

function createOptionsWrapper(){
    optionsWrapper = document.createElement("div");
    optionsWrapper.setAttribute("class", "options-wrapper hide");
    for(var i = 0; i < select[0].options.length; i++){
        optionsItem = document.createElement("div");
        optionsItem.setAttribute("class", "option");
        optionsItem.innerHTML = select[0].options[i].innerHTML;
        optionsWrapper.appendChild(optionsItem);

        optionsItem.addEventListener("click", function(e){
            e.stopPropagation();
            for(var i = 0; i < select[0].options.length; i++){
                if(select[0].options[i].innerHTML == this.innerHTML){
                    select[0].selectedIndex = i;
                    selectButton.innerHTML = this.innerHTML;
                    
                    selectedOption = this.parentNode.getElementsByClassName("selected-option");
                    for (j = 0; j < selectedOption.length; j++) {
                        selectedOption[j].classList.remove("selected-option");
                    }
                    this.classList.add("selected-option");
                    break;
                }
            }
            selectButton.click();
        });
    }

    return optionsWrapper;

}

function createSelectButton(){
    selectButton = document.createElement("div");
    selectButton.setAttribute("class", "select-button");
    selectButton.innerHTML = select[0].options[select[0].selectedIndex].innerHTML;

    selectButton.addEventListener("click", function(e){    
        e.stopPropagation();
        this.nextSibling.classList.toggle("hide");
    });

    return selectButton;
}

function createSelect(className){
    select = selection[0].getElementsByClassName("selects")[0].getElementsByClassName(className);
    console.log(select);

    var mainSelectWrapper;
    mainSelectWrapper = document.createElement("div");
    mainSelectWrapper.setAttribute("class", "main-select-wrapper");

    mainSelectWrapper.appendChild(createSelectButton());
    mainSelectWrapper.appendChild(createOptionsWrapper());

    selection[0].appendChild(mainSelectWrapper);

}

function Select(className){
    createSelect(className);
}


new Select("s");
new Select("s1");
new Select("s2");
