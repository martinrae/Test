import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ImageComponentsPage, ImageUpdatePage } from './image.page-object';
import * as path from 'path';

describe('Image e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let imageUpdatePage: ImageUpdatePage;
    let imageComponentsPage: ImageComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Images', async () => {
        await navBarPage.goToEntity('image');
        imageComponentsPage = new ImageComponentsPage();
        expect(await imageComponentsPage.getTitle()).toMatch(/Images/);
    });

    it('should load create Image page', async () => {
        await imageComponentsPage.clickOnCreateButton();
        imageUpdatePage = new ImageUpdatePage();
        expect(await imageUpdatePage.getPageTitle()).toMatch(/Create or edit a Image/);
        await imageUpdatePage.cancel();
    });

    it('should create and save Images', async () => {
        await imageComponentsPage.clickOnCreateButton();
        await imageUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await imageUpdatePage.getDateCreatedInput()).toContain('2001-01-01T02:30');
        await imageUpdatePage.setDescriptionInput('description');
        expect(await imageUpdatePage.getDescriptionInput()).toMatch('description');
        await imageUpdatePage.setTagInput('tag');
        expect(await imageUpdatePage.getTagInput()).toMatch('tag');
        await imageUpdatePage.setImageInput(absolutePath);
        await imageUpdatePage.contactSelectLastOption();
        await imageUpdatePage.reviewSelectLastOption();
        await imageUpdatePage.serviceSelectLastOption();
        await imageUpdatePage.merchantAccountSelectLastOption();
        await imageUpdatePage.resourceSelectLastOption();
        await imageUpdatePage.save();
        expect(await imageUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
