package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A MerchantAccount.
 */
@Entity
@Table(name = "merchant_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "merchantaccount")
public class MerchantAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "address_line_1", nullable = false)
    private String addressLine1;

    @Column(name = "address_line_2")
    private String addressLine2;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Column(name = "country", nullable = false)
    private String country;

    @Lob
    @Column(name = "profile_image")
    private byte[] profileImage;

    @Column(name = "profile_image_content_type")
    private String profileImageContentType;

    @NotNull
    @Column(name = "open_monday", nullable = false)
    private Boolean openMonday;

    @NotNull
    @Column(name = "open_tuesday", nullable = false)
    private Boolean openTuesday;

    @NotNull
    @Column(name = "open_wednesday", nullable = false)
    private Boolean openWednesday;

    @NotNull
    @Column(name = "open_thursday", nullable = false)
    private Boolean openThursday;

    @NotNull
    @Column(name = "open_friday", nullable = false)
    private Boolean openFriday;

    @NotNull
    @Column(name = "open_saturday", nullable = false)
    private Boolean openSaturday;

    @NotNull
    @Column(name = "open_sunday", nullable = false)
    private Boolean openSunday;

    @OneToMany(mappedBy = "merchantAccount")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Service> services = new HashSet<>();

    @OneToMany(mappedBy = "merchantAccount")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "merchant_account_account_category",
               joinColumns = @JoinColumn(name = "merchant_accounts_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "account_categories_id", referencedColumnName = "id"))
    private Set<AccountCategory> accountCategories = new HashSet<>();

    @ManyToMany(mappedBy = "merchantAccounts")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contact> contacts = new HashSet<>();

    @ManyToMany(mappedBy = "merchantAccounts")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Review> reviews = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public MerchantAccount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public MerchantAccount description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public MerchantAccount addressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
        return this;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public MerchantAccount addressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
        return this;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getCity() {
        return city;
    }

    public MerchantAccount city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public MerchantAccount country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public MerchantAccount profileImage(byte[] profileImage) {
        this.profileImage = profileImage;
        return this;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public String getProfileImageContentType() {
        return profileImageContentType;
    }

    public MerchantAccount profileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
        return this;
    }

    public void setProfileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
    }

    public Boolean isOpenMonday() {
        return openMonday;
    }

    public MerchantAccount openMonday(Boolean openMonday) {
        this.openMonday = openMonday;
        return this;
    }

    public void setOpenMonday(Boolean openMonday) {
        this.openMonday = openMonday;
    }

    public Boolean isOpenTuesday() {
        return openTuesday;
    }

    public MerchantAccount openTuesday(Boolean openTuesday) {
        this.openTuesday = openTuesday;
        return this;
    }

    public void setOpenTuesday(Boolean openTuesday) {
        this.openTuesday = openTuesday;
    }

    public Boolean isOpenWednesday() {
        return openWednesday;
    }

    public MerchantAccount openWednesday(Boolean openWednesday) {
        this.openWednesday = openWednesday;
        return this;
    }

    public void setOpenWednesday(Boolean openWednesday) {
        this.openWednesday = openWednesday;
    }

    public Boolean isOpenThursday() {
        return openThursday;
    }

    public MerchantAccount openThursday(Boolean openThursday) {
        this.openThursday = openThursday;
        return this;
    }

    public void setOpenThursday(Boolean openThursday) {
        this.openThursday = openThursday;
    }

    public Boolean isOpenFriday() {
        return openFriday;
    }

    public MerchantAccount openFriday(Boolean openFriday) {
        this.openFriday = openFriday;
        return this;
    }

    public void setOpenFriday(Boolean openFriday) {
        this.openFriday = openFriday;
    }

    public Boolean isOpenSaturday() {
        return openSaturday;
    }

    public MerchantAccount openSaturday(Boolean openSaturday) {
        this.openSaturday = openSaturday;
        return this;
    }

    public void setOpenSaturday(Boolean openSaturday) {
        this.openSaturday = openSaturday;
    }

    public Boolean isOpenSunday() {
        return openSunday;
    }

    public MerchantAccount openSunday(Boolean openSunday) {
        this.openSunday = openSunday;
        return this;
    }

    public void setOpenSunday(Boolean openSunday) {
        this.openSunday = openSunday;
    }

    public Set<Service> getServices() {
        return services;
    }

    public MerchantAccount services(Set<Service> services) {
        this.services = services;
        return this;
    }

    public MerchantAccount addService(Service service) {
        this.services.add(service);
        service.setMerchantAccount(this);
        return this;
    }

    public MerchantAccount removeService(Service service) {
        this.services.remove(service);
        service.setMerchantAccount(null);
        return this;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }

    public Set<Image> getImages() {
        return images;
    }

    public MerchantAccount images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public MerchantAccount addImage(Image image) {
        this.images.add(image);
        image.setMerchantAccount(this);
        return this;
    }

    public MerchantAccount removeImage(Image image) {
        this.images.remove(image);
        image.setMerchantAccount(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<AccountCategory> getAccountCategories() {
        return accountCategories;
    }

    public MerchantAccount accountCategories(Set<AccountCategory> accountCategories) {
        this.accountCategories = accountCategories;
        return this;
    }

    public MerchantAccount addAccountCategory(AccountCategory accountCategory) {
        this.accountCategories.add(accountCategory);
        accountCategory.getMerchantAccounts().add(this);
        return this;
    }

    public MerchantAccount removeAccountCategory(AccountCategory accountCategory) {
        this.accountCategories.remove(accountCategory);
        accountCategory.getMerchantAccounts().remove(this);
        return this;
    }

    public void setAccountCategories(Set<AccountCategory> accountCategories) {
        this.accountCategories = accountCategories;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public MerchantAccount contacts(Set<Contact> contacts) {
        this.contacts = contacts;
        return this;
    }

    public MerchantAccount addContact(Contact contact) {
        this.contacts.add(contact);
        contact.getMerchantAccounts().add(this);
        return this;
    }

    public MerchantAccount removeContact(Contact contact) {
        this.contacts.remove(contact);
        contact.getMerchantAccounts().remove(this);
        return this;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public MerchantAccount reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public MerchantAccount addReview(Review review) {
        this.reviews.add(review);
        review.getMerchantAccounts().add(this);
        return this;
    }

    public MerchantAccount removeReview(Review review) {
        this.reviews.remove(review);
        review.getMerchantAccounts().remove(this);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MerchantAccount merchantAccount = (MerchantAccount) o;
        if (merchantAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), merchantAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MerchantAccount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", addressLine1='" + getAddressLine1() + "'" +
            ", addressLine2='" + getAddressLine2() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            ", profileImage='" + getProfileImage() + "'" +
            ", profileImageContentType='" + getProfileImageContentType() + "'" +
            ", openMonday='" + isOpenMonday() + "'" +
            ", openTuesday='" + isOpenTuesday() + "'" +
            ", openWednesday='" + isOpenWednesday() + "'" +
            ", openThursday='" + isOpenThursday() + "'" +
            ", openFriday='" + isOpenFriday() + "'" +
            ", openSaturday='" + isOpenSaturday() + "'" +
            ", openSunday='" + isOpenSunday() + "'" +
            "}";
    }
}
