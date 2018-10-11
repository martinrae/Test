import { element, by, ElementFinder } from 'protractor';

export class DiscountComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-discount div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class DiscountUpdatePage {
    pageTitle = element(by.id('jhi-discount-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    dateCreatedInput = element(by.id('field_dateCreated'));
    percentatgeInput = element(by.id('field_percentatge'));
    startDateInput = element(by.id('field_startDate'));
    endDateInput = element(by.id('field_endDate'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDateCreatedInput(dateCreated) {
        await this.dateCreatedInput.sendKeys(dateCreated);
    }

    async getDateCreatedInput() {
        return this.dateCreatedInput.getAttribute('value');
    }

    async setPercentatgeInput(percentatge) {
        await this.percentatgeInput.sendKeys(percentatge);
    }

    async getPercentatgeInput() {
        return this.percentatgeInput.getAttribute('value');
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setEndDateInput(endDate) {
        await this.endDateInput.sendKeys(endDate);
    }

    async getEndDateInput() {
        return this.endDateInput.getAttribute('value');
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
