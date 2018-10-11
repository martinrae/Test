package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Review.
 */
@Entity
@Table(name = "review")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "review")
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "review_date", nullable = false)
    private Instant reviewDate;

    @Lob
    @Column(name = "profile_image")
    private byte[] profileImage;

    @Column(name = "profile_image_content_type")
    private String profileImageContentType;

    @OneToMany(mappedBy = "review")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "review_contact",
               joinColumns = @JoinColumn(name = "reviews_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "contacts_id", referencedColumnName = "id"))
    private Set<Contact> contacts = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "review_merchant_account",
               joinColumns = @JoinColumn(name = "reviews_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "merchant_accounts_id", referencedColumnName = "id"))
    private Set<MerchantAccount> merchantAccounts = new HashSet<>();

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

    public Review name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRating() {
        return rating;
    }

    public Review rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public Review description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getReviewDate() {
        return reviewDate;
    }

    public Review reviewDate(Instant reviewDate) {
        this.reviewDate = reviewDate;
        return this;
    }

    public void setReviewDate(Instant reviewDate) {
        this.reviewDate = reviewDate;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public Review profileImage(byte[] profileImage) {
        this.profileImage = profileImage;
        return this;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public String getProfileImageContentType() {
        return profileImageContentType;
    }

    public Review profileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
        return this;
    }

    public void setProfileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Review images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Review addImage(Image image) {
        this.images.add(image);
        image.setReview(this);
        return this;
    }

    public Review removeImage(Image image) {
        this.images.remove(image);
        image.setReview(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public Review contacts(Set<Contact> contacts) {
        this.contacts = contacts;
        return this;
    }

    public Review addContact(Contact contact) {
        this.contacts.add(contact);
        contact.getReviews().add(this);
        return this;
    }

    public Review removeContact(Contact contact) {
        this.contacts.remove(contact);
        contact.getReviews().remove(this);
        return this;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public Set<MerchantAccount> getMerchantAccounts() {
        return merchantAccounts;
    }

    public Review merchantAccounts(Set<MerchantAccount> merchantAccounts) {
        this.merchantAccounts = merchantAccounts;
        return this;
    }

    public Review addMerchantAccount(MerchantAccount merchantAccount) {
        this.merchantAccounts.add(merchantAccount);
        merchantAccount.getReviews().add(this);
        return this;
    }

    public Review removeMerchantAccount(MerchantAccount merchantAccount) {
        this.merchantAccounts.remove(merchantAccount);
        merchantAccount.getReviews().remove(this);
        return this;
    }

    public void setMerchantAccounts(Set<MerchantAccount> merchantAccounts) {
        this.merchantAccounts = merchantAccounts;
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
        Review review = (Review) o;
        if (review.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), review.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Review{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", rating=" + getRating() +
            ", description='" + getDescription() + "'" +
            ", reviewDate='" + getReviewDate() + "'" +
            ", profileImage='" + getProfileImage() + "'" +
            ", profileImageContentType='" + getProfileImageContentType() + "'" +
            "}";
    }
}
