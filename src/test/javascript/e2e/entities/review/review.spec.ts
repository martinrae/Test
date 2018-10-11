import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReviewComponentsPage, ReviewUpdatePage } from './review.page-object';
import * as path from 'path';

describe('Review e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let reviewUpdatePage: ReviewUpdatePage;
    let reviewComponentsPage: ReviewComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Reviews', async () => {
        await navBarPage.goToEntity('review');
        reviewComponentsPage = new ReviewComponentsPage();
        expect(await reviewComponentsPage.getTitle()).toMatch(/Reviews/);
    });

    it('should load create Review page', async () => {
        await reviewComponentsPage.clickOnCreateButton();
        reviewUpdatePage = new ReviewUpdatePage();
        expect(await reviewUpdatePage.getPageTitle()).toMatch(/Create or edit a Review/);
        await reviewUpdatePage.cancel();
    });

    it('should create and save Reviews', async () => {
        await reviewComponentsPage.clickOnCreateButton();
        await reviewUpdatePage.setNameInput('name');
        expect(await reviewUpdatePage.getNameInput()).toMatch('name');
        await reviewUpdatePage.setRatingInput('5');
        expect(await reviewUpdatePage.getRatingInput()).toMatch('5');
        await reviewUpdatePage.setDescriptionInput('description');
        expect(await reviewUpdatePage.getDescriptionInput()).toMatch('description');
        await reviewUpdatePage.setReviewDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await reviewUpdatePage.getReviewDateInput()).toContain('2001-01-01T02:30');
        await reviewUpdatePage.setProfileImageInput(absolutePath);
        // reviewUpdatePage.contactSelectLastOption();
        // reviewUpdatePage.merchantAccountSelectLastOption();
        await reviewUpdatePage.save();
        expect(await reviewUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
