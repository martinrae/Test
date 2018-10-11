import { element, by, ElementFinder } from 'protractor';

export class ImageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-image div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class ImageUpdatePage {
    pageTitle = element(by.id('jhi-image-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateCreatedInput = element(by.id('field_dateCreated'));
    descriptionInput = element(by.id('field_description'));
    tagInput = element(by.id('field_tag'));
    imageInput = element(by.id('file_image'));
    contactSelect = element(by.id('field_contact'));
    reviewSelect = element(by.id('field_review'));
    serviceSelect = element(by.id('field_service'));
    merchantAccountSelect = element(by.id('field_merchantAccount'));
    resourceSelect = element(by.id('field_resource'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateCreatedInput(dateCreated) {
        await this.dateCreatedInput.sendKeys(dateCreated);
    }

    async getDateCreatedInput() {
        return this.dateCreatedInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setTagInput(tag) {
        await this.tagInput.sendKeys(tag);
    }

    async getTagInput() {
        return this.tagInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async contactSelectLastOption() {
        await this.contactSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async contactSelectOption(option) {
        await this.contactSelect.sendKeys(option);
    }

    getContactSelect(): ElementFinder {
        return this.contactSelect;
    }

    async getContactSelectedOption() {
        return this.contactSelect.element(by.css('option:checked')).getText();
    }

    async reviewSelectLastOption() {
        await this.reviewSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async reviewSelectOption(option) {
        await this.reviewSelect.sendKeys(option);
    }

    getReviewSelect(): ElementFinder {
        return this.reviewSelect;
    }

    async getReviewSelectedOption() {
        return this.reviewSelect.element(by.css('option:checked')).getText();
    }

    async serviceSelectLastOption() {
        await this.serviceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async serviceSelectOption(option) {
        await this.serviceSelect.sendKeys(option);
    }

    getServiceSelect(): ElementFinder {
        return this.serviceSelect;
    }

    async getServiceSelectedOption() {
        return this.serviceSelect.element(by.css('option:checked')).getText();
    }

    async merchantAccountSelectLastOption() {
        await this.merchantAccountSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async merchantAccountSelectOption(option) {
        await this.merchantAccountSelect.sendKeys(option);
    }

    getMerchantAccountSelect(): ElementFinder {
        return this.merchantAccountSelect;
    }

    async getMerchantAccountSelectedOption() {
        return this.merchantAccountSelect.element(by.css('option:checked')).getText();
    }

    async resourceSelectLastOption() {
        await this.resourceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async resourceSelectOption(option) {
        await this.resourceSelect.sendKeys(option);
    }

    getResourceSelect(): ElementFinder {
        return this.resourceSelect;
    }

    async getResourceSelectedOption() {
        return this.resourceSelect.element(by.css('option:checked')).getText();
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
