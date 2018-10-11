import { element, by, ElementFinder } from 'protractor';

export class BookingComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-booking div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class BookingUpdatePage {
    pageTitle = element(by.id('jhi-booking-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    placedDateInput = element(by.id('field_placedDate'));
    statusSelect = element(by.id('field_status'));
    codeInput = element(by.id('field_code'));
    startTimeInput = element(by.id('field_startTime'));
    endTimeInput = element(by.id('field_endTime'));
    quantityInput = element(by.id('field_quantity'));
    billSelect = element(by.id('field_bill'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setPlacedDateInput(placedDate) {
        await this.placedDateInput.sendKeys(placedDate);
    }

    async getPlacedDateInput() {
        return this.placedDateInput.getAttribute('value');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setStartTimeInput(startTime) {
        await this.startTimeInput.sendKeys(startTime);
    }

    async getStartTimeInput() {
        return this.startTimeInput.getAttribute('value');
    }

    async setEndTimeInput(endTime) {
        await this.endTimeInput.sendKeys(endTime);
    }

    async getEndTimeInput() {
        return this.endTimeInput.getAttribute('value');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    async billSelectLastOption() {
        await this.billSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async billSelectOption(option) {
        await this.billSelect.sendKeys(option);
    }

    getBillSelect(): ElementFinder {
        return this.billSelect;
    }

    async getBillSelectedOption() {
        return this.billSelect.element(by.css('option:checked')).getText();
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
