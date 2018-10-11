import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactComponentsPage, ContactUpdatePage } from './contact.page-object';
import * as path from 'path';

describe('Contact e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let contactUpdatePage: ContactUpdatePage;
    let contactComponentsPage: ContactComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Contacts', async () => {
        await navBarPage.goToEntity('contact');
        contactComponentsPage = new ContactComponentsPage();
        expect(await contactComponentsPage.getTitle()).toMatch(/Contacts/);
    });

    it('should load create Contact page', async () => {
        await contactComponentsPage.clickOnCreateButton();
        contactUpdatePage = new ContactUpdatePage();
        expect(await contactUpdatePage.getPageTitle()).toMatch(/Create or edit a Contact/);
        await contactUpdatePage.cancel();
    });

    /* it('should create and save Contacts', async () => {
        await contactComponentsPage.clickOnCreateButton();
        await contactUpdatePage.setUsernameInput('username');
        expect(await contactUpdatePage.getUsernameInput()).toMatch('username');
        await contactUpdatePage.setFirstNameInput('firstName');
        expect(await contactUpdatePage.getFirstNameInput()).toMatch('firstName');
        await contactUpdatePage.setLastNameInput('lastName');
        expect(await contactUpdatePage.getLastNameInput()).toMatch('lastName');
        await contactUpdatePage.setEmailInput('email');
        expect(await contactUpdatePage.getEmailInput()).toMatch('email');
        await contactUpdatePage.setPhoneInput('phone');
        expect(await contactUpdatePage.getPhoneInput()).toMatch('phone');
        await contactUpdatePage.setAddressLine1Input('addressLine1');
        expect(await contactUpdatePage.getAddressLine1Input()).toMatch('addressLine1');
        await contactUpdatePage.setAddressLine2Input('addressLine2');
        expect(await contactUpdatePage.getAddressLine2Input()).toMatch('addressLine2');
        await contactUpdatePage.setCityInput('city');
        expect(await contactUpdatePage.getCityInput()).toMatch('city');
        await contactUpdatePage.setCountryInput('country');
        expect(await contactUpdatePage.getCountryInput()).toMatch('country');
        await contactUpdatePage.typeSelectLastOption();
        await contactUpdatePage.setProfileImageInput(absolutePath);
        const selectedEmailConsent = contactUpdatePage.getEmailConsentInput();
        if (await selectedEmailConsent.isSelected()) {
            await contactUpdatePage.getEmailConsentInput().click();
            expect(await contactUpdatePage.getEmailConsentInput().isSelected()).toBeFalsy();
        } else {
            await contactUpdatePage.getEmailConsentInput().click();
            expect(await contactUpdatePage.getEmailConsentInput().isSelected()).toBeTruthy();
        }
        await contactUpdatePage.userSelectLastOption();
        // contactUpdatePage.merchantAccountSelectLastOption();
        await contactUpdatePage.save();
        expect(await contactUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
