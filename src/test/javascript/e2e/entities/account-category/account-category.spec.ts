import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AccountCategoryComponentsPage, AccountCategoryUpdatePage } from './account-category.page-object';
import * as path from 'path';

describe('AccountCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let accountCategoryUpdatePage: AccountCategoryUpdatePage;
    let accountCategoryComponentsPage: AccountCategoryComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AccountCategories', async () => {
        await navBarPage.goToEntity('account-category');
        accountCategoryComponentsPage = new AccountCategoryComponentsPage();
        expect(await accountCategoryComponentsPage.getTitle()).toMatch(/Account Categories/);
    });

    it('should load create AccountCategory page', async () => {
        await accountCategoryComponentsPage.clickOnCreateButton();
        accountCategoryUpdatePage = new AccountCategoryUpdatePage();
        expect(await accountCategoryUpdatePage.getPageTitle()).toMatch(/Create or edit a Account Category/);
        await accountCategoryUpdatePage.cancel();
    });

    it('should create and save AccountCategories', async () => {
        await accountCategoryComponentsPage.clickOnCreateButton();
        await accountCategoryUpdatePage.setNameInput('name');
        expect(await accountCategoryUpdatePage.getNameInput()).toMatch('name');
        await accountCategoryUpdatePage.setDescriptionInput('description');
        expect(await accountCategoryUpdatePage.getDescriptionInput()).toMatch('description');
        await accountCategoryUpdatePage.setProfileImageInput(absolutePath);
        await accountCategoryUpdatePage.save();
        expect(await accountCategoryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
