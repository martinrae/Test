import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServiceComponentsPage, ServiceUpdatePage } from './service.page-object';
import * as path from 'path';

describe('Service e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let serviceUpdatePage: ServiceUpdatePage;
    let serviceComponentsPage: ServiceComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Services', async () => {
        await navBarPage.goToEntity('service');
        serviceComponentsPage = new ServiceComponentsPage();
        expect(await serviceComponentsPage.getTitle()).toMatch(/Services/);
    });

    it('should load create Service page', async () => {
        await serviceComponentsPage.clickOnCreateButton();
        serviceUpdatePage = new ServiceUpdatePage();
        expect(await serviceUpdatePage.getPageTitle()).toMatch(/Create or edit a Service/);
        await serviceUpdatePage.cancel();
    });

    it('should create and save Services', async () => {
        await serviceComponentsPage.clickOnCreateButton();
        await serviceUpdatePage.setNameInput('name');
        expect(await serviceUpdatePage.getNameInput()).toMatch('name');
        await serviceUpdatePage.setDescriptionInput('description');
        expect(await serviceUpdatePage.getDescriptionInput()).toMatch('description');
        await serviceUpdatePage.setPriceInput('5');
        expect(await serviceUpdatePage.getPriceInput()).toMatch('5');
        await serviceUpdatePage.setProfileImageInput(absolutePath);
        // serviceUpdatePage.serviceCategorySelectLastOption();
        // serviceUpdatePage.resourceSelectLastOption();
        await serviceUpdatePage.merchantAccountSelectLastOption();
        await serviceUpdatePage.discountSelectLastOption();
        await serviceUpdatePage.save();
        expect(await serviceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
