package com.mycompany.store.repository;

import com.mycompany.store.domain.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Contact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query(value = "select distinct contact from Contact contact left join fetch contact.merchantAccounts",
        countQuery = "select count(distinct contact) from Contact contact")
    Page<Contact> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct contact from Contact contact left join fetch contact.merchantAccounts")
    List<Contact> findAllWithEagerRelationships();

    @Query("select contact from Contact contact left join fetch contact.merchantAccounts where contact.id =:id")
    Optional<Contact> findOneWithEagerRelationships(@Param("id") Long id);

}
