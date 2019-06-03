var selection = document.getElementsByClassName("selection")[0];
console.log(selection);
var optionsWrapper,
    optionsItem,
    selectButton;

function Select(select){

    this.select = select;

    function createSelect(select){
        var mainSelectWrapper;
        mainSelectWrapper = document.createElement("div");
        mainSelectWrapper.setAttribute("class", "main-select-wrapper");

        mainSelectWrapper.appendChild(createSelectButton(select));
        mainSelectWrapper.appendChild(createOptionsWrapper(select));

        selection.appendChild(mainSelectWrapper);

    }

    function createSelectButton (select){
        selectButton = document.createElement("div");
        selectButton.setAttribute("class", "select-button");
        selectButton.innerHTML = select.options[select.selectedIndex].innerHTML;
        selectButton.addEventListener("click", function(e){
            e.stopPropagation();
            closeSelect(select);
            this.nextSibling.classList.toggle("hide");
        });

        return selectButton;
    }

    function createOptionsWrapper(select){
        console.log(select);
        optionsWrapper = document.createElement("div");
        optionsWrapper.setAttribute("class", "options-wrapper hide");
        for(var i = 0; i < select.options.length; i++){
            optionsItem = document.createElement("div");
            optionsItem.setAttribute("class", "option");
            optionsItem.innerHTML = select.options[i].innerHTML;
            optionsWrapper.appendChild(optionsItem);
            optionsItem.addEventListener("click", function(e){
                // e.stopPropagation();

                var sB = this.parentNode.parentNode.getElementsByClassName("select-button")[0];
                console.log(select);
                console.log(sB);
                for(var i = 0; i < select.options.length; i++){
                    if(select.options[i].innerHTML == this.innerHTML){
                        select.selectedIndex = i;
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
    
    function closeSelect(select) {
        document.addEventListener("click", function(){
            var dOptionWrapper = [];

            var mainSelectWrapperCount = selection.getElementsByClassName("main-select-wrapper").length;
            var mainSelectWrapperElement = selection.getElementsByClassName("main-select-wrapper");

            for(var i = 0; i < mainSelectWrapperCount; i++){
                dOptionWrapper.push(mainSelectWrapperElement[i].getElementsByClassName("options-wrapper")[0]);
            }
    
            for(var i = 0; i < dOptionWrapper.length; i++){
                if(!dOptionWrapper[i].classList.contains("hide")){
                    dOptionWrapper[i].classList.add("hide");
                }
            }
    
        });
    }

    createSelect(this.select);
}

var selectCount = document.getElementsByTagName("select").length;
var selectElement = document.getElementsByTagName("select");

for (var i = 0; i < selectCount; i++) {
    new Select(selectElement[i]);
}
