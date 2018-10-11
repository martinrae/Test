import { element, by, ElementFinder } from 'protractor';

export class BillComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-bill div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class BillUpdatePage {
    pageTitle = element(by.id('jhi-bill-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    detailsInput = element(by.id('field_details'));
    codeInput = element(by.id('field_code'));
    billStatusSelect = element(by.id('field_billStatus'));
    paymentMethodSelect = element(by.id('field_paymentMethod'));
    paymentAmountInput = element(by.id('field_paymentAmount'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setDetailsInput(details) {
        await this.detailsInput.sendKeys(details);
    }

    async getDetailsInput() {
        return this.detailsInput.getAttribute('value');
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setBillStatusSelect(billStatus) {
        await this.billStatusSelect.sendKeys(billStatus);
    }

    async getBillStatusSelect() {
        return this.billStatusSelect.element(by.css('option:checked')).getText();
    }

    async billStatusSelectLastOption() {
        await this.billStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setPaymentMethodSelect(paymentMethod) {
        await this.paymentMethodSelect.sendKeys(paymentMethod);
    }

    async getPaymentMethodSelect() {
        return this.paymentMethodSelect.element(by.css('option:checked')).getText();
    }

    async paymentMethodSelectLastOption() {
        await this.paymentMethodSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setPaymentAmountInput(paymentAmount) {
        await this.paymentAmountInput.sendKeys(paymentAmount);
    }

    async getPaymentAmountInput() {
        return this.paymentAmountInput.getAttribute('value');
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
