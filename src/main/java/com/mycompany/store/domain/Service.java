package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Service.
 */
@Entity
@Table(name = "service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "service")
public class Service implements Serializable {

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
    @DecimalMin(value = "0")
    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Lob
    @Column(name = "profile_image")
    private byte[] profileImage;

    @Column(name = "profile_image_content_type")
    private String profileImageContentType;

    @OneToMany(mappedBy = "service")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "service_service_category",
               joinColumns = @JoinColumn(name = "services_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "service_categories_id", referencedColumnName = "id"))
    private Set<ServiceCategory> serviceCategories = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "service_resource",
               joinColumns = @JoinColumn(name = "services_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "resources_id", referencedColumnName = "id"))
    private Set<Resource> resources = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("services")
    private MerchantAccount merchantAccount;

    @ManyToOne
    @JsonIgnoreProperties("services")
    private Discount discount;

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

    public Service name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Service description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Service price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public Service profileImage(byte[] profileImage) {
        this.profileImage = profileImage;
        return this;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public String getProfileImageContentType() {
        return profileImageContentType;
    }

    public Service profileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
        return this;
    }

    public void setProfileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Service images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Service addImage(Image image) {
        this.images.add(image);
        image.setService(this);
        return this;
    }

    public Service removeImage(Image image) {
        this.images.remove(image);
        image.setService(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<ServiceCategory> getServiceCategories() {
        return serviceCategories;
    }

    public Service serviceCategories(Set<ServiceCategory> serviceCategories) {
        this.serviceCategories = serviceCategories;
        return this;
    }

    public Service addServiceCategory(ServiceCategory serviceCategory) {
        this.serviceCategories.add(serviceCategory);
        serviceCategory.getServices().add(this);
        return this;
    }

    public Service removeServiceCategory(ServiceCategory serviceCategory) {
        this.serviceCategories.remove(serviceCategory);
        serviceCategory.getServices().remove(this);
        return this;
    }

    public void setServiceCategories(Set<ServiceCategory> serviceCategories) {
        this.serviceCategories = serviceCategories;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public Service resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public Service addResource(Resource resource) {
        this.resources.add(resource);
        resource.getServices().add(this);
        return this;
    }

    public Service removeResource(Resource resource) {
        this.resources.remove(resource);
        resource.getServices().remove(this);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }

    public MerchantAccount getMerchantAccount() {
        return merchantAccount;
    }

    public Service merchantAccount(MerchantAccount merchantAccount) {
        this.merchantAccount = merchantAccount;
        return this;
    }

    public void setMerchantAccount(MerchantAccount merchantAccount) {
        this.merchantAccount = merchantAccount;
    }

    public Discount getDiscount() {
        return discount;
    }

    public Service discount(Discount discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
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
        Service service = (Service) o;
        if (service.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), service.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Service{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", profileImage='" + getProfileImage() + "'" +
            ", profileImageContentType='" + getProfileImageContentType() + "'" +
            "}";
    }
}
