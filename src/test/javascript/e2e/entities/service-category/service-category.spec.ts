import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServiceCategoryComponentsPage, ServiceCategoryUpdatePage } from './service-category.page-object';
import * as path from 'path';

describe('ServiceCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let serviceCategoryUpdatePage: ServiceCategoryUpdatePage;
    let serviceCategoryComponentsPage: ServiceCategoryComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ServiceCategories', async () => {
        await navBarPage.goToEntity('service-category');
        serviceCategoryComponentsPage = new ServiceCategoryComponentsPage();
        expect(await serviceCategoryComponentsPage.getTitle()).toMatch(/Service Categories/);
    });

    it('should load create ServiceCategory page', async () => {
        await serviceCategoryComponentsPage.clickOnCreateButton();
        serviceCategoryUpdatePage = new ServiceCategoryUpdatePage();
        expect(await serviceCategoryUpdatePage.getPageTitle()).toMatch(/Create or edit a Service Category/);
        await serviceCategoryUpdatePage.cancel();
    });

    it('should create and save ServiceCategories', async () => {
        await serviceCategoryComponentsPage.clickOnCreateButton();
        await serviceCategoryUpdatePage.setNameInput('name');
        expect(await serviceCategoryUpdatePage.getNameInput()).toMatch('name');
        await serviceCategoryUpdatePage.setDescriptionInput('description');
        expect(await serviceCategoryUpdatePage.getDescriptionInput()).toMatch('description');
        await serviceCategoryUpdatePage.setProfileImageInput(absolutePath);
        await serviceCategoryUpdatePage.save();
        expect(await serviceCategoryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
