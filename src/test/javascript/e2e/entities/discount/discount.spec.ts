import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DiscountComponentsPage, DiscountUpdatePage } from './discount.page-object';

describe('Discount e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let discountUpdatePage: DiscountUpdatePage;
    let discountComponentsPage: DiscountComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Discounts', async () => {
        await navBarPage.goToEntity('discount');
        discountComponentsPage = new DiscountComponentsPage();
        expect(await discountComponentsPage.getTitle()).toMatch(/Discounts/);
    });

    it('should load create Discount page', async () => {
        await discountComponentsPage.clickOnCreateButton();
        discountUpdatePage = new DiscountUpdatePage();
        expect(await discountUpdatePage.getPageTitle()).toMatch(/Create or edit a Discount/);
        await discountUpdatePage.cancel();
    });

    it('should create and save Discounts', async () => {
        await discountComponentsPage.clickOnCreateButton();
        await discountUpdatePage.setNameInput('name');
        expect(await discountUpdatePage.getNameInput()).toMatch('name');
        await discountUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await discountUpdatePage.getDateCreatedInput()).toContain('2001-01-01T02:30');
        await discountUpdatePage.setPercentatgeInput('5');
        expect(await discountUpdatePage.getPercentatgeInput()).toMatch('5');
        await discountUpdatePage.setStartDateInput('2000-12-31');
        expect(await discountUpdatePage.getStartDateInput()).toMatch('2000-12-31');
        await discountUpdatePage.setEndDateInput('2000-12-31');
        expect(await discountUpdatePage.getEndDateInput()).toMatch('2000-12-31');
        await discountUpdatePage.save();
        expect(await discountUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
