class Toolbox {
    static formHandler (selector, fun) {
        const formElement = document.querySelector(selector);
        formElement.addEventListener('submit', e => {
            e.preventDefault();
            const obj = {};
            //console.log(formElement.elements);
            const data = Array.from(formElement.elements)
                .filter(item => item.name)
                .map(element => {
                    const{name, value} = element;
                    obj[name] = value || 'No information';
                    //return{name, value};
                });
            console.log(obj);
            fun(obj);
        })
    }

    static addItemToList(selector, string) {
        const listElements = document.querySelector(selector);
        const element = document.createElement('li');
        element.textContent = string;
        listElements.append(element);
    }

    static clearElement(selector) {
        const listElements = document.querySelector(selector);
        listElements.innerHTML = '';
    }

    static addNavButtonControl(button_selector, element_selectors) {
        const navBtn = document.querySelector(button_selector);
        navBtn.addEventListener('click', e => {
            e.preventDefault();
            for (let node of navBtn.parentElement.children) {
                node.classList.remove('active');
            }
            navBtn.classList.add('active');
            element_selectors.forEach((selector, index) => {
                if (index === 0) {
                    document.querySelector(selector).classList.toggle('hidden', false);
                } else {
                    document.querySelector(selector).classList.toggle('hidden', true);
                }
            });
        });
    }
}