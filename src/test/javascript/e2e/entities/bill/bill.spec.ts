import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BillComponentsPage, BillUpdatePage } from './bill.page-object';

describe('Bill e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let billUpdatePage: BillUpdatePage;
    let billComponentsPage: BillComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Bills', async () => {
        await navBarPage.goToEntity('bill');
        billComponentsPage = new BillComponentsPage();
        expect(await billComponentsPage.getTitle()).toMatch(/Bills/);
    });

    it('should load create Bill page', async () => {
        await billComponentsPage.clickOnCreateButton();
        billUpdatePage = new BillUpdatePage();
        expect(await billUpdatePage.getPageTitle()).toMatch(/Create or edit a Bill/);
        await billUpdatePage.cancel();
    });

    it('should create and save Bills', async () => {
        await billComponentsPage.clickOnCreateButton();
        await billUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await billUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        await billUpdatePage.setDetailsInput('details');
        expect(await billUpdatePage.getDetailsInput()).toMatch('details');
        await billUpdatePage.setCodeInput('code');
        expect(await billUpdatePage.getCodeInput()).toMatch('code');
        await billUpdatePage.billStatusSelectLastOption();
        await billUpdatePage.paymentMethodSelectLastOption();
        await billUpdatePage.setPaymentAmountInput('5');
        expect(await billUpdatePage.getPaymentAmountInput()).toMatch('5');
        await billUpdatePage.save();
        expect(await billUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
