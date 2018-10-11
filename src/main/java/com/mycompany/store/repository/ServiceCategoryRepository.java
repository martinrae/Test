package com.mycompany.store.repository;

import com.mycompany.store.domain.ServiceCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ServiceCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {

}
