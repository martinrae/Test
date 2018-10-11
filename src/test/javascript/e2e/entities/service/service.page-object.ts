import { element, by, ElementFinder } from 'protractor';

export class ServiceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-service div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class ServiceUpdatePage {
    pageTitle = element(by.id('jhi-service-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    priceInput = element(by.id('field_price'));
    profileImageInput = element(by.id('file_profileImage'));
    serviceCategorySelect = element(by.id('field_serviceCategory'));
    resourceSelect = element(by.id('field_resource'));
    merchantAccountSelect = element(by.id('field_merchantAccount'));
    discountSelect = element(by.id('field_discount'));

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

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async setProfileImageInput(profileImage) {
        await this.profileImageInput.sendKeys(profileImage);
    }

    async getProfileImageInput() {
        return this.profileImageInput.getAttribute('value');
    }

    async serviceCategorySelectLastOption() {
        await this.serviceCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async serviceCategorySelectOption(option) {
        await this.serviceCategorySelect.sendKeys(option);
    }

    getServiceCategorySelect(): ElementFinder {
        return this.serviceCategorySelect;
    }

    async getServiceCategorySelectedOption() {
        return this.serviceCategorySelect.element(by.css('option:checked')).getText();
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

    async discountSelectLastOption() {
        await this.discountSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async discountSelectOption(option) {
        await this.discountSelect.sendKeys(option);
    }

    getDiscountSelect(): ElementFinder {
        return this.discountSelect;
    }

    async getDiscountSelectedOption() {
        return this.discountSelect.element(by.css('option:checked')).getText();
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
