import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BookingComponentsPage, BookingUpdatePage } from './booking.page-object';

describe('Booking e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let bookingUpdatePage: BookingUpdatePage;
    let bookingComponentsPage: BookingComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Bookings', async () => {
        await navBarPage.goToEntity('booking');
        bookingComponentsPage = new BookingComponentsPage();
        expect(await bookingComponentsPage.getTitle()).toMatch(/Bookings/);
    });

    it('should load create Booking page', async () => {
        await bookingComponentsPage.clickOnCreateButton();
        bookingUpdatePage = new BookingUpdatePage();
        expect(await bookingUpdatePage.getPageTitle()).toMatch(/Create or edit a Booking/);
        await bookingUpdatePage.cancel();
    });

    it('should create and save Bookings', async () => {
        await bookingComponentsPage.clickOnCreateButton();
        await bookingUpdatePage.setPlacedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await bookingUpdatePage.getPlacedDateInput()).toContain('2001-01-01T02:30');
        await bookingUpdatePage.statusSelectLastOption();
        await bookingUpdatePage.setCodeInput('code');
        expect(await bookingUpdatePage.getCodeInput()).toMatch('code');
        await bookingUpdatePage.setStartTimeInput('2000-12-31');
        expect(await bookingUpdatePage.getStartTimeInput()).toMatch('2000-12-31');
        await bookingUpdatePage.setEndTimeInput('2000-12-31');
        expect(await bookingUpdatePage.getEndTimeInput()).toMatch('2000-12-31');
        await bookingUpdatePage.setQuantityInput('5');
        expect(await bookingUpdatePage.getQuantityInput()).toMatch('5');
        await bookingUpdatePage.billSelectLastOption();
        await bookingUpdatePage.save();
        expect(await bookingUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
