var selection = document.getElementsByClassName("selection");
var select;
var selectButton;
var optionsWrapper;
var option;
var arrow;
console.log(selection);

for(var i = 0; i < selection.length; i++){
    select = document.getElementsByTagName("select")[0];
    console.log(select);
    
    arrow = document.createElement("span");
    arrow.setAttribute("class", "arrow");

    selectButton = document.createElement("div");
    selectButton.setAttribute("class", "select-button");
    selectButton.innerHTML = select.options[select.selectedIndex].innerHTML;
    selectButton.appendChild(arrow);

    selection[i].appendChild(selectButton);

    optionsWrapper = document.createElement("div");
    optionsWrapper.setAttribute("class", "options-wrapper hide");

    for(var j = 0; j < select.length; j++){
        option = document.createElement("div");
        option.setAttribute("class", "option");
        option.innerHTML = select.options[j].innerHTML;
        
        option.addEventListener("click", function(e){
            var selectClick = this.parentNode.parentNode.getElementsByTagName("select")[0];
            var selectButtonClick = this.parentNode.previousSibling;

            for(var i = 0; i < selectClick.length; i++){
                if(selectClick.options[i].innerHTML == this.innerHTML){
                    selectClick.selectedIndex = i;
                    selectButtonClick.innerHTML = this.innerHTML;
                    selectButton.appendChild(arrow);
                    
                    selectedOption = this.parentNode.getElementsByClassName("selected-option");
                    for (k = 0; k < selectedOption.length; k++) {
                        selectedOption[k].classList.remove("selected-option");
                    }
                    this.classList.add("selected-option");
                    break;
                }
            }
            selectButtonClick.click();
        });
        
        optionsWrapper.appendChild(option);

    }

    selectButton.addEventListener("click", function(e){
        // closeSelect(this);
        this.nextSibling.classList.toggle("hide");
        arrow.classList.toggle("arrow-active");
    })
    
    selection[i].appendChild(optionsWrapper);
    console.log(optionsWrapper);
}


