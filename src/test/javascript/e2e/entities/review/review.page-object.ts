import { element, by, ElementFinder } from 'protractor';

export class ReviewComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-review div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class ReviewUpdatePage {
    pageTitle = element(by.id('jhi-review-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    ratingInput = element(by.id('field_rating'));
    descriptionInput = element(by.id('field_description'));
    reviewDateInput = element(by.id('field_reviewDate'));
    profileImageInput = element(by.id('file_profileImage'));
    contactSelect = element(by.id('field_contact'));
    merchantAccountSelect = element(by.id('field_merchantAccount'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setRatingInput(rating) {
        await this.ratingInput.sendKeys(rating);
    }

    async getRatingInput() {
        return this.ratingInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setReviewDateInput(reviewDate) {
        await this.reviewDateInput.sendKeys(reviewDate);
    }

    async getReviewDateInput() {
        return this.reviewDateInput.getAttribute('value');
    }

    async setProfileImageInput(profileImage) {
        await this.profileImageInput.sendKeys(profileImage);
    }

    async getProfileImageInput() {
        return this.profileImageInput.getAttribute('value');
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
