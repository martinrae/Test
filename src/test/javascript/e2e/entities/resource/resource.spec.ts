import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ResourceComponentsPage, ResourceUpdatePage } from './resource.page-object';

describe('Resource e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let resourceUpdatePage: ResourceUpdatePage;
    let resourceComponentsPage: ResourceComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Resources', async () => {
        await navBarPage.goToEntity('resource');
        resourceComponentsPage = new ResourceComponentsPage();
        expect(await resourceComponentsPage.getTitle()).toMatch(/Resources/);
    });

    it('should load create Resource page', async () => {
        await resourceComponentsPage.clickOnCreateButton();
        resourceUpdatePage = new ResourceUpdatePage();
        expect(await resourceUpdatePage.getPageTitle()).toMatch(/Create or edit a Resource/);
        await resourceUpdatePage.cancel();
    });

    it('should create and save Resources', async () => {
        await resourceComponentsPage.clickOnCreateButton();
        await resourceUpdatePage.setNameInput('name');
        expect(await resourceUpdatePage.getNameInput()).toMatch('name');
        await resourceUpdatePage.setDescriptionInput('description');
        expect(await resourceUpdatePage.getDescriptionInput()).toMatch('description');
        await resourceUpdatePage.setQuantityInput('5');
        expect(await resourceUpdatePage.getQuantityInput()).toMatch('5');
        // resourceUpdatePage.bookingSelectLastOption();
        await resourceUpdatePage.save();
        expect(await resourceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
