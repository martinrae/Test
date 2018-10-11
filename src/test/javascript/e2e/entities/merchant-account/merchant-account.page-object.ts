import { element, by, ElementFinder } from 'protractor';

export class MerchantAccountComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-merchant-account div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class MerchantAccountUpdatePage {
    pageTitle = element(by.id('jhi-merchant-account-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    addressLine1Input = element(by.id('field_addressLine1'));
    addressLine2Input = element(by.id('field_addressLine2'));
    cityInput = element(by.id('field_city'));
    countryInput = element(by.id('field_country'));
    profileImageInput = element(by.id('file_profileImage'));
    openMondayInput = element(by.id('field_openMonday'));
    openTuesdayInput = element(by.id('field_openTuesday'));
    openWednesdayInput = element(by.id('field_openWednesday'));
    openThursdayInput = element(by.id('field_openThursday'));
    openFridayInput = element(by.id('field_openFriday'));
    openSaturdayInput = element(by.id('field_openSaturday'));
    openSundayInput = element(by.id('field_openSunday'));
    accountCategorySelect = element(by.id('field_accountCategory'));

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

    async setProfileImageInput(profileImage) {
        await this.profileImageInput.sendKeys(profileImage);
    }

    async getProfileImageInput() {
        return this.profileImageInput.getAttribute('value');
    }

    getOpenMondayInput() {
        return this.openMondayInput;
    }
    getOpenTuesdayInput() {
        return this.openTuesdayInput;
    }
    getOpenWednesdayInput() {
        return this.openWednesdayInput;
    }
    getOpenThursdayInput() {
        return this.openThursdayInput;
    }
    getOpenFridayInput() {
        return this.openFridayInput;
    }
    getOpenSaturdayInput() {
        return this.openSaturdayInput;
    }
    getOpenSundayInput() {
        return this.openSundayInput;
    }

    async accountCategorySelectLastOption() {
        await this.accountCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async accountCategorySelectOption(option) {
        await this.accountCategorySelect.sendKeys(option);
    }

    getAccountCategorySelect(): ElementFinder {
        return this.accountCategorySelect;
    }

    async getAccountCategorySelectedOption() {
        return this.accountCategorySelect.element(by.css('option:checked')).getText();
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
