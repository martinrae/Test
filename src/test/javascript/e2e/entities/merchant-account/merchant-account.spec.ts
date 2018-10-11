import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MerchantAccountComponentsPage, MerchantAccountUpdatePage } from './merchant-account.page-object';
import * as path from 'path';

describe('MerchantAccount e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let merchantAccountUpdatePage: MerchantAccountUpdatePage;
    let merchantAccountComponentsPage: MerchantAccountComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MerchantAccounts', async () => {
        await navBarPage.goToEntity('merchant-account');
        merchantAccountComponentsPage = new MerchantAccountComponentsPage();
        expect(await merchantAccountComponentsPage.getTitle()).toMatch(/Merchant Accounts/);
    });

    it('should load create MerchantAccount page', async () => {
        await merchantAccountComponentsPage.clickOnCreateButton();
        merchantAccountUpdatePage = new MerchantAccountUpdatePage();
        expect(await merchantAccountUpdatePage.getPageTitle()).toMatch(/Create or edit a Merchant Account/);
        await merchantAccountUpdatePage.cancel();
    });

    it('should create and save MerchantAccounts', async () => {
        await merchantAccountComponentsPage.clickOnCreateButton();
        await merchantAccountUpdatePage.setNameInput('name');
        expect(await merchantAccountUpdatePage.getNameInput()).toMatch('name');
        await merchantAccountUpdatePage.setDescriptionInput('description');
        expect(await merchantAccountUpdatePage.getDescriptionInput()).toMatch('description');
        await merchantAccountUpdatePage.setAddressLine1Input('addressLine1');
        expect(await merchantAccountUpdatePage.getAddressLine1Input()).toMatch('addressLine1');
        await merchantAccountUpdatePage.setAddressLine2Input('addressLine2');
        expect(await merchantAccountUpdatePage.getAddressLine2Input()).toMatch('addressLine2');
        await merchantAccountUpdatePage.setCityInput('city');
        expect(await merchantAccountUpdatePage.getCityInput()).toMatch('city');
        await merchantAccountUpdatePage.setCountryInput('country');
        expect(await merchantAccountUpdatePage.getCountryInput()).toMatch('country');
        await merchantAccountUpdatePage.setProfileImageInput(absolutePath);
        const selectedOpenMonday = merchantAccountUpdatePage.getOpenMondayInput();
        if (await selectedOpenMonday.isSelected()) {
            await merchantAccountUpdatePage.getOpenMondayInput().click();
            expect(await merchantAccountUpdatePage.getOpenMondayInput().isSelected()).toBeFalsy();
        } else {
            await merchantAccountUpdatePage.getOpenMondayInput().click();
            expect(await merchantAccountUpdatePage.getOpenMondayInput().isSelected()).toBeTruthy();
        }
        const selectedOpenTuesday = merchantAccountUpdatePage.getOpenTuesdayInput();
        if (await selectedOpenTuesday.isSelected()) {
            await merchantAccountUpdatePage.getOpenTuesdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenTuesdayInput().isSelected()).toBeFalsy();
        } else {
            await merchantAccountUpdatePage.getOpenTuesdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenTuesdayInput().isSelected()).toBeTruthy();
        }
        const selectedOpenWednesday = merchantAccountUpdatePage.getOpenWednesdayInput();
        if (await selectedOpenWednesday.isSelected()) {
            await merchantAccountUpdatePage.getOpenWednesdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenWednesdayInput().isSelected()).toBeFalsy();
        } else {
            await merchantAccountUpdatePage.getOpenWednesdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenWednesdayInput().isSelected()).toBeTruthy();
        }
        const selectedOpenThursday = merchantAccountUpdatePage.getOpenThursdayInput();
        if (await selectedOpenThursday.isSelected()) {
            await merchantAccountUpdatePage.getOpenThursdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenThursdayInput().isSelected()).toBeFalsy();
        } else {
            await merchantAccountUpdatePage.getOpenThursdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenThursdayInput().isSelected()).toBeTruthy();
        }
        const selectedOpenFriday = merchantAccountUpdatePage.getOpenFridayInput();
        if (await selectedOpenFriday.isSelected()) {
            await merchantAccountUpdatePage.getOpenFridayInput().click();
            expect(await merchantAccountUpdatePage.getOpenFridayInput().isSelected()).toBeFalsy();
        } else {
            await merchantAccountUpdatePage.getOpenFridayInput().click();
            expect(await merchantAccountUpdatePage.getOpenFridayInput().isSelected()).toBeTruthy();
        }
        const selectedOpenSaturday = merchantAccountUpdatePage.getOpenSaturdayInput();
        if (await selectedOpenSaturday.isSelected()) {
            await merchantAccountUpdatePage.getOpenSaturdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenSaturdayInput().isSelected()).toBeFalsy();
        } else {
            await merchantAccountUpdatePage.getOpenSaturdayInput().click();
            expect(await merchantAccountUpdatePage.getOpenSaturdayInput().isSelected()).toBeTruthy();
        }
        const selectedOpenSunday = merchantAccountUpdatePage.getOpenSundayInput();
        if (await selectedOpenSunday.isSelected()) {
            await merchantAccountUpdatePage.getOpenSundayInput().click();
            expect(await merchantAccountUpdatePage.getOpenSundayInput().isSelected()).toBeFalsy();
        } else {
            await merchantAccountUpdatePage.getOpenSundayInput().click();
            expect(await merchantAccountUpdatePage.getOpenSundayInput().isSelected()).toBeTruthy();
        }
        // merchantAccountUpdatePage.accountCategorySelectLastOption();
        await merchantAccountUpdatePage.save();
        expect(await merchantAccountUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
