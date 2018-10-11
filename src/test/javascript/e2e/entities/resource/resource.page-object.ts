import { element, by, ElementFinder } from 'protractor';

export class ResourceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-resource div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class ResourceUpdatePage {
    pageTitle = element(by.id('jhi-resource-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    quantityInput = element(by.id('field_quantity'));
    bookingSelect = element(by.id('field_booking'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    async bookingSelectLastOption() {
        await this.bookingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async bookingSelectOption(option) {
        await this.bookingSelect.sendKeys(option);
    }

    getBookingSelect(): ElementFinder {
        return this.bookingSelect;
    }

    async getBookingSelectedOption() {
        return this.bookingSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
