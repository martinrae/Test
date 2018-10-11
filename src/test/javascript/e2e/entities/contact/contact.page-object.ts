import { element, by, ElementFinder } from 'protractor';

export class ContactComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-contact div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class ContactUpdatePage {
    pageTitle = element(by.id('jhi-contact-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    usernameInput = element(by.id('field_username'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    emailInput = element(by.id('field_email'));
    phoneInput = element(by.id('field_phone'));
    addressLine1Input = element(by.id('field_addressLine1'));
    addressLine2Input = element(by.id('field_addressLine2'));
    cityInput = element(by.id('field_city'));
    countryInput = element(by.id('field_country'));
    typeSelect = element(by.id('field_type'));
    profileImageInput = element(by.id('file_profileImage'));
    emailConsentInput = element(by.id('field_emailConsent'));
    userSelect = element(by.id('field_user'));
    merchantAccountSelect = element(by.id('field_merchantAccount'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setUsernameInput(username) {
        await this.usernameInput.sendKeys(username);
    }

    async getUsernameInput() {
        return this.usernameInput.getAttribute('value');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async setAddressLine1Input(addressLine1) {
        await this.addressLine1Input.sendKeys(addressLine1);
    }

    async getAddressLine1Input() {
        return this.addressLine1Input.getAttribute('value');
    }

    async setAddressLine2Input(addressLine2) {
        await this.addressLine2Input.sendKeys(addressLine2);
    }

    async getAddressLine2Input() {
        return this.addressLine2Input.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    async setTypeSelect(type) {
        await this.typeSelect.sendKeys(type);
    }

    async getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    async typeSelectLastOption() {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setProfileImageInput(profileImage) {
        await this.profileImageInput.sendKeys(profileImage);
    }

    async getProfileImageInput() {
        return this.profileImageInput.getAttribute('value');
    }

    getEmailConsentInput() {
        return this.emailConsentInput;
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
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
