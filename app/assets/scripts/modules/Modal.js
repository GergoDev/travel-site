import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }
    
    events() {
        // clicking the open modal button
        // bind() funkciót kell használnunk, mert a kattintás után a "this" szó az éppen kattintott elemre fog mutatni a fő objektum helyett.
        this.openModalButton.click(this.openModal.bind(this));
        
        // clicking the close modal button
        this.closeModalButton.click(this.closeModal.bind(this));
        
        //pressing any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }
    
    keyPressHandler(e) {
        if(e.keyCode == 27) {
            this.closeModal();
        }
    }
    
    openModal() {
        this.modal.addClass("modal--is-visible");
        // Return False, hogy ne ugorjon vissza az oldal fejlécére a link href részében lévő kettőskereszt miatt
        return false;
    }
    
    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }
}

export default Modal;